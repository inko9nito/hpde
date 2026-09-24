import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useEvents, EVENTS_URL } from '../data/EventsContext'
import { ADMIN_ROLE } from './NewEventPage'
import { SignInPrompt } from './SignInPrompt'
import { Timeline } from './Timeline'
import { Legend } from './Legend'
import { scheduleToMarkdown, parseScheduleEdit } from '../utils/scheduleEditor'
import type { ScheduleProblem } from '../utils/scheduleEditor'
import { RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from '../theme/runGroupColors'
import type { EventConfig } from '../types'

export const EDIT_SCHEDULE_HASH_PREFIX = '#/edit-schedule/'

export function editScheduleHash(eventId: string): string {
  return `${EDIT_SCHEDULE_HASH_PREFIX}${encodeURIComponent(eventId)}`
}

export function eventIdFromEditScheduleHash(hash: string): string | null {
  if (!hash.startsWith(EDIT_SCHEDULE_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(EDIT_SCHEDULE_HASH_PREFIX.length))
}

// Unsaved text, per event, so leaving the page (or the phone killing the
// tab) doesn't lose a long paste. `base` is the saved schedule it started
// from, to tell whether that changed since.
const DRAFT_KEY_PREFIX = 'hpde:scheduleDraft:'

interface Draft {
  text: string
  base: string
}

function readDraft(eventId: string): Draft | null {
  try {
    const saved = localStorage.getItem(DRAFT_KEY_PREFIX + eventId)
    const draft = saved ? JSON.parse(saved) : null
    return draft && typeof draft.text === 'string' && typeof draft.base === 'string' ? draft : null
  } catch {
    return null
  }
}

function writeDraft(eventId: string, draft: Draft | null) {
  try {
    if (draft) localStorage.setItem(DRAFT_KEY_PREFIX + eventId, JSON.stringify(draft))
    else localStorage.removeItem(DRAFT_KEY_PREFIX + eventId)
  } catch {
    // Storage full or blocked — the text is still on screen.
  }
}

function formatDay(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC', weekday: 'long', month: 'short', day: 'numeric',
  })
}

interface Props {
  eventId: string
  onClose: () => void
  onSaved: (event: EventConfig) => void
}

/**
 * Schedule editor (#232): an event's run groups and day-by-day schedule as
 * markdown, with a live preview. Admins only; the events function checks
 * that, and parses the markdown again itself before saving. The event's
 * details — dates included — aren't edited here.
 */
export function ScheduleEditorPage({ eventId, onClose, onSaved }: Props) {
  const { status, user } = useAuth()
  const { allEvents, isStored, loaded } = useEvents()
  const event = allEvents.find(e => e.id === eventId)

  let content: React.ReactNode
  if (status === 'loading' || (!loaded && (!event || isStored(eventId)))) {
    // Wait for the fresh list, so the editor never starts from a stale copy.
    content = <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading" />
  } else if (status !== 'signed-in') {
    content = <SignInPrompt reason="edit schedules" />
  } else if (!user?.roles.includes(ADMIN_ROLE)) {
    content = <Notice title="Only admins can edit schedules." detail={`Signed in as ${user?.email}`} />
  } else if (!event) {
    content = <Notice title="This event doesn’t exist" detail="It may have been deleted." />
  } else if (!isStored(event.id)) {
    content = <Notice title="Test events can’t be edited." detail="They ship with the app." />
  } else {
    content = <Editor key={event.id} event={event} onSaved={onSaved} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 pt-4 sm:px-4 sm:pt-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-gray-900">Edit schedule</h1>
            {event && <p className="truncate text-sm text-gray-500">{event.name}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <X size={18} />
          </button>
        </div>
        {content}
      </div>
    </div>
  )
}

function Notice({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="mt-1 text-xs text-gray-400">{detail}</p>
    </div>
  )
}

type Tab = 'edit' | 'preview'

function Editor({ event, onSaved }: { event: EventConfig; onSaved: (event: EventConfig) => void }) {
  const { authedFetch } = useAuth()
  const { addEvent } = useEvents()
  // The saved schedule as markdown, as of opening the page.
  const [saved] = useState(() => scheduleToMarkdown(event))
  const [restored, setRestored] = useState(() => {
    const draft = readDraft(event.id)
    return draft && draft.text !== saved ? draft : null
  })
  const [text, setText] = useState(restored?.text ?? saved)
  const [tab, setTab] = useState<Tab>('edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)

  const edit = useMemo(() => parseScheduleEdit(event, text), [event, text])
  const blocking = edit.problems.filter(p => p.blocking)
  const changed = text !== saved

  useEffect(() => {
    writeDraft(event.id, changed ? { text, base: restored?.base ?? saved } : null)
  }, [event.id, text, changed, saved, restored])

  // Tall enough for every line, wrapped ones included, so the page scrolls
  // rather than a box inside it — easier on a phone.
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight + 2}px`
  }, [text, tab])

  // The save bar is fixed to the bottom of the screen (html and body clip
  // overflow-x, which stops `sticky` from working), so the page gets room
  // for it underneath, however tall the problem list makes it.
  useEffect(() => {
    const el = barRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => setBarHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function discardDraft() {
    setText(saved)
    setRestored(null)
    setError(null)
  }

  // Tapping a problem puts the cursor at the start of its line.
  function goToLine(line: number) {
    setTab('edit')
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (!el) return
      const start = text.split('\n').slice(0, line - 1).reduce((n, l) => n + l.length + 1, 0)
      el.focus()
      el.setSelectionRange(start, start)
    })
  }

  async function handleSave() {
    setError(null)
    setSaving(true)
    try {
      const res = await authedFetch(`${EVENTS_URL}?id=${encodeURIComponent(event.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schedule: text }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.event) {
        setError(body.error ?? 'Couldn’t save the schedule. Try again.')
        return
      }
      writeDraft(event.id, null)
      addEvent(body.event)
      onSaved(body.event)
    } catch {
      setError('Couldn’t reach the server. Check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  const tabClass = (t: Tab) =>
    `flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
      tab === t ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-800'
    }`

  return (
    <div style={{ paddingBottom: barHeight + 16 }}>
      {restored && changed && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span>
            Your unsaved changes are back.
            {restored.base !== saved && ' The saved schedule has changed since you started them.'}
          </span>
          <button onClick={discardDraft} className="shrink-0 font-medium underline">Discard</button>
        </div>
      )}

      <div role="tablist" aria-label="Editor view" className="mb-3 flex gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
        <button role="tab" aria-selected={tab === 'edit'} onClick={() => setTab('edit')} className={tabClass('edit')}>
          Edit
        </button>
        <button role="tab" aria-selected={tab === 'preview'} onClick={() => setTab('preview')} className={tabClass('preview')}>
          Preview
        </button>
      </div>

      {tab === 'edit' ? (
        <>
          <textarea
            ref={textareaRef}
            aria-label="Schedule"
            value={text}
            onChange={e => setText(e.target.value)}
            rows={16}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            // 16px on phones: iOS zooms into anything smaller on focus.
            className="block w-full resize-none overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 font-mono text-base leading-6 text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none sm:text-[13px] sm:leading-5"
          />
          <FormatHelp />
        </>
      ) : (
        <Preview event={{ ...event, runGroups: edit.runGroups, days: edit.days }} />
      )}

      <div ref={barRef} className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-gray-50/95 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur">
        <div className="mx-auto max-w-lg px-3 sm:px-4">
        <Problems problems={edit.problems} onGoToLine={goToLine} />
        {error && (
          <p role="alert" className="mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}
        <button
          onClick={handleSave}
          disabled={saving || !changed || blocking.length > 0}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save schedule'}
        </button>
        </div>
      </div>
    </div>
  )
}

function Problems({ problems, onGoToLine }: { problems: ScheduleProblem[]; onGoToLine: (line: number) => void }) {
  if (problems.length === 0) return null
  const blocking = problems.filter(p => p.blocking).length
  return (
    <div className="mb-2">
      <p className="mb-1 text-xs font-medium text-gray-500">
        {blocking > 0
          ? `Fix ${blocking === 1 ? 'this' : `these ${blocking}`} to save:`
          : 'Worth a look (you can still save):'}
      </p>
      <ul aria-label="Problems" className="max-h-36 space-y-1 overflow-y-auto">
        {problems.map((p, i) => (
          <li key={i}>
            <button
              onClick={() => p.line && onGoToLine(p.line)}
              disabled={!p.line}
              className={`w-full rounded-md px-2 py-1 text-left text-xs ${
                p.blocking ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'
              }`}
            >
              {p.line && <span className="font-semibold">Line {p.line}: </span>}
              {p.message}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Preview({ event }: { event: EventConfig }) {
  const multiDay = event.days.length > 1
  return (
    <div className="space-y-4">
      {event.days.map(day => (
        <section key={day.id} aria-label={formatDay(day.date)}>
          {multiDay && <h2 className="mb-2 text-sm font-semibold text-gray-700">{formatDay(day.date)}</h2>}
          {day.activities.length > 0 ? (
            <Timeline activities={day.activities} runGroups={event.runGroups} isToday={false} selectedGroups={[]} hidePast={false} />
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-500">
              Nothing scheduled{multiDay ? ' this day' : ''} yet.
            </p>
          )}
        </section>
      ))}
      <Legend groups={event.runGroups} />
    </div>
  )
}

function FormatHelp() {
  const code = 'rounded bg-gray-100 px-1 font-mono text-[12px] text-gray-800'
  return (
    <details className="mt-3 rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
      <summary className="cursor-pointer font-medium text-gray-900">Format help</summary>
      <div className="mt-3 space-y-3">
        <p>
          A line starting with <code className={code}>//</code> is an example or note and isn’t saved. Remove the{' '}
          <code className={code}>//</code> to use it.
        </p>
        <div>
          <p className="font-medium text-gray-900">Groups, under <code className={code}>## groups</code></p>
          <p className="mt-1"><code className={code}>id | Label | color | text color | description</code></p>
          <p className="mt-1 text-xs text-gray-500">The id is what sessions refer to. The description is optional.</p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Each day, under its <code className={code}>## Day | YYYY-MM-DD</code></p>
          <ul className="mt-1 space-y-1">
            <li><code className={code}>07:00 general | Label | subtitle</code></li>
            <li><code className={code}>12:00 lunch | Lunch</code> (also <code className={code}>special</code>)</li>
            <li><code className={code}>08:00 session 1 | track: a, b | class: c | note: …</code></li>
            <li><code className={code}>break | Label</code> — a gap between blocks, no time</li>
          </ul>
          <p className="mt-1 text-xs text-gray-500">
            Times are 24-hour, HH:MM. The days are the event’s dates; they’re changed in the event’s details.
          </p>
        </div>
        <div>
          <p className="font-medium text-gray-900">Colors</p>
          <ul className="mt-1 grid grid-cols-2 gap-1">
            {RUN_GROUP_BG_CLASSES.map(c => (
              <li key={c} className="flex items-center gap-2">
                <span className={`h-3 w-3 shrink-0 rounded-full ${c}`} aria-hidden="true" />
                <code className={`${code} select-all`}>{c}</code>
              </li>
            ))}
          </ul>
          <p className="mt-2">
            Text color: {RUN_GROUP_TEXT_CLASSES.map((c, i) => (
              <span key={c}>{i > 0 && ' or '}<code className={`${code} select-all`}>{c}</code></span>
            ))}
          </p>
        </div>
      </div>
    </details>
  )
}
