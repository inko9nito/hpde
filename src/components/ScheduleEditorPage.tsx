import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import { useAuth, SignedOutError } from '../auth/AuthContext'
import { useEvents, EVENTS_URL } from '../data/EventsContext'
import { ADMIN_ROLE } from './NewEventPage'
import { SignInPrompt } from './SignInPrompt'
import { ICON_BUTTON } from './iconButton'
import { Timeline } from './Timeline'
import { Legend } from './Legend'
import { DayTabs } from './DayTabs'
import { RunGroupFilter } from './RunGroupFilter'
import { todayLocalISO } from '../utils/time'
import { scheduleToMarkdown, readScheduleEdit, describeProblem, deriveGroups } from '../utils/scheduleEditor'
import type { GroupInput, ScheduleProblem } from '../utils/scheduleEditor'
import { RUN_GROUP_BG_CLASSES } from '../theme/runGroupColors'
import type { EventConfig } from '../types'

export const EDIT_SCHEDULE_HASH_PREFIX = '#/edit-schedule/'

export function editScheduleHash(eventId: string): string {
  return `${EDIT_SCHEDULE_HASH_PREFIX}${encodeURIComponent(eventId)}`
}

export function eventIdFromEditScheduleHash(hash: string): string | null {
  if (!hash.startsWith(EDIT_SCHEDULE_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(EDIT_SCHEDULE_HASH_PREFIX.length))
}

// Unsaved changes, per event, so leaving the page (or the phone killing the
// tab) doesn't lose a long paste: the text, and the groups' colors and
// descriptions as set. `base` is the saved version they started from, to
// tell whether that changed since.
const DRAFT_KEY_PREFIX = 'hpde:scheduleDraft:'

interface Content {
  groups: GroupInput[]
  text: string
}

interface Draft extends Content {
  base: string
}

function readDraft(eventId: string): Draft | null {
  try {
    const saved = localStorage.getItem(DRAFT_KEY_PREFIX + eventId)
    const draft = saved ? JSON.parse(saved) : null
    return draft && typeof draft.text === 'string' && Array.isArray(draft.groups) && typeof draft.base === 'string'
      ? draft
      : null
  } catch {
    return null
  }
}

function writeDraft(eventId: string, draft: Draft | null) {
  try {
    if (draft) localStorage.setItem(DRAFT_KEY_PREFIX + eventId, JSON.stringify(draft))
    else localStorage.removeItem(DRAFT_KEY_PREFIX + eventId)
  } catch {
    // Storage full or blocked — the changes are still on screen.
  }
}

function contentKey(c: Content): string {
  return JSON.stringify(c)
}

// "bg-runred-500" → "Red"; the one non-palette color is instructors' black.
function colorName(bgClass: string): string {
  const m = bgClass.match(/^bg-run([a-z]+)-500$/)
  return m ? m[1][0].toUpperCase() + m[1].slice(1) : 'Black'
}

interface Props {
  eventId: string
  onClose: () => void
  onSaved: (event: EventConfig) => void
}

/**
 * Schedule editor (#232): an event's day-by-day schedule as markdown, with
 * a live preview. The run groups come from the sessions, each with a color
 * picked from its name, which can be changed below the schedule. Admins
 * only; the events function checks that, and checks the groups and the
 * schedule again itself before saving. The event's details — dates
 * included — aren't edited here.
 */
export function ScheduleEditorPage({ eventId, onClose, onSaved }: Props) {
  const { status, user } = useAuth()
  const { allEvents, isStored, loaded } = useEvents()
  const event = allEvents.find(e => e.id === eventId)
  // Set once the editor has been shown, so a sign-in that lapses mid-edit
  // says so (changes kept) rather than showing the generic prompt.
  const wasEditing = useRef(false)

  let content: React.ReactNode
  if (status === 'loading' || (!loaded && (!event || isStored(eventId)))) {
    // Wait for the fresh list, so the editor never starts from a stale copy.
    content = <div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading" />
  } else if (status !== 'signed-in') {
    content = wasEditing.current ? <SignedOutNotice /> : <SignInPrompt reason="edit schedules" />
  } else if (!user?.roles.includes(ADMIN_ROLE)) {
    content = <Notice title="Only admins can edit schedules." detail={`Signed in as ${user?.email}`} />
  } else if (!event) {
    content = <Notice title="This event doesn’t exist" detail="It may have been deleted." />
  } else if (!isStored(event.id)) {
    content = <Notice title="Test events can’t be edited." detail="They ship with the app." />
  } else {
    wasEditing.current = true
    content = <Editor key={event.id} event={event} onSaved={onSaved} />
  }

  return (
    // Its own scroll area, like the event page's (PushPage): html and body
    // clip overflow-x, which stops `sticky` from working against the window,
    // and the Edit / Preview tabs stick to the top of this instead.
    <div data-scroll-root className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-gray-50">
      <div className="mx-auto max-w-lg px-3 pt-3 sm:px-4 sm:pt-5">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-1 pb-3">
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">Edit schedule</h1>
            {event && <p className="truncate text-sm text-gray-500">{event.name}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className={`-mr-2 ${ICON_BUTTON}`}
          >
            <X size={20} />
          </button>
        </div>
        {content}
      </div>
    </div>
  )
}

function SignedOutNotice() {
  const { signIn } = useAuth()
  return (
    <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-center">
      <p className="text-sm font-semibold text-amber-900">You’ve been signed out</p>
      <p className="mt-1 text-sm text-amber-800">
        Sign in again to save. Your changes are kept on this device.
      </p>
      <button
        onClick={signIn}
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Sign in
      </button>
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
  // As saved, when the page opened.
  const [saved] = useState<Content>(() => ({
    groups: event.runGroups.map(({ id, label, description, bgClass, textClass }) => ({
      id, label, bgClass, textClass, ...(description ? { description } : {}),
    })),
    text: scheduleToMarkdown(event),
  }))
  const [restored, setRestored] = useState(() => {
    const draft = readDraft(event.id)
    return draft && contentKey({ groups: deriveGroups(draft.text, draft.groups), text: draft.text }) !== contentKey(saved)
      ? draft
      : null
  })
  // What's known about groups: the saved ones, plus any whose color or
  // description was set here. The groups themselves come from the text.
  const [settings, setSettings] = useState<GroupInput[]>(restored?.groups ?? saved.groups)
  const [text, setText] = useState(restored?.text ?? saved.text)
  const [tab, setTab] = useState<Tab>('edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [barHeight, setBarHeight] = useState(0)

  const groups = useMemo(() => deriveGroups(text, settings), [text, settings])
  const edit = useMemo(() => readScheduleEdit(event, groups, text), [event, groups, text])
  const blocking = edit.problems.filter(p => p.blocking)
  const changed = contentKey({ groups, text }) !== contentKey(saved)

  // A new group's picked color is kept once it's shown, so changing
  // another group's color never recolors this one.
  useEffect(() => {
    const unset = groups.filter(g => !settings.some(s => s.label.toLowerCase() === g.label.toLowerCase()))
    if (unset.length) setSettings(list => [...list, ...unset])
  }, [groups, settings])

  useEffect(() => {
    writeDraft(event.id, changed ? { groups: settings, text, base: restored?.base ?? contentKey(saved) } : null)
  }, [event.id, settings, text, changed, saved, restored])

  // Tall enough for every line, wrapped ones included, so the page scrolls
  // rather than a box inside it — easier on a phone.
  useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight + 2}px`
  }, [text, tab])

  // The save bar is fixed to the bottom of the screen, so the page gets
  // room for it underneath, however tall the problem list makes it.
  useEffect(() => {
    const el = barRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => setBarHeight(el.offsetHeight))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function discardDraft() {
    setSettings(saved.groups)
    setText(saved.text)
    setRestored(null)
    setError(null)
  }

  // A color or description set here sticks to the group by its name, even
  // if its sessions are retyped.
  function updateGroup(group: GroupInput, patch: Partial<GroupInput>) {
    setSettings(list => {
      const i = list.findIndex(g => g === group || g.label.toLowerCase() === group.label.toLowerCase())
      return i >= 0 ? list.map((g, j) => (j === i ? { ...g, ...patch } : g)) : [...list, { ...group, ...patch }]
    })
  }

  // Tapping a problem takes you to it: the start of its line, or its group.
  function goTo(p: ScheduleProblem) {
    setTab('edit')
    requestAnimationFrame(() => {
      if (p.group !== undefined) {
        document.getElementById(`run-group-${p.group}`)?.scrollIntoView({ block: 'center' })
        return
      }
      const el = textareaRef.current
      if (!el || !p.line) return
      const start = text.split('\n').slice(0, p.line - 1).reduce((n, l) => n + l.length + 1, 0)
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
        body: JSON.stringify({ runGroups: groups, schedule: text }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.event) {
        setError(body.error ?? 'Couldn’t save the schedule. Try again.')
        return
      }
      writeDraft(event.id, null)
      addEvent(body.event)
      onSaved(body.event)
    } catch (err) {
      // Signed out: the page swaps to a notice with a way back in, and the
      // changes are already kept on the device.
      if (err instanceof SignedOutError) return
      const reason = err instanceof Error && err.message ? ` (${err.message})` : ''
      setError(`Couldn’t reach the server. Check your connection and try again.${reason}`)
    } finally {
      setSaving(false)
    }
  }

  const tabClass = (t: Tab) =>
    `-mb-px border-b-[3px] pb-2.5 pt-3 text-base transition-colors ${
      tab === t ? 'border-gray-900 font-semibold text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-800'
    }`

  return (
    <div style={{ paddingBottom: barHeight + 16 }}>
      {restored && changed && (
        <div className="mb-3 flex items-center justify-between gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          <span>
            Your unsaved changes are back.
            {restored.base !== contentKey(saved) && ' The saved schedule has changed since you started them.'}
          </span>
          <button onClick={discardDraft} className="shrink-0 font-medium underline">Discard</button>
        </div>
      )}

      <div
        role="tablist"
        aria-label="Editor view"
        // Stays at the top while the page scrolls, so you can switch any time.
        className="sticky top-0 z-10 -mx-3 mb-5 flex gap-8 border-b border-gray-200 bg-gray-50 px-4 sm:-mx-4 sm:px-5"
      >
        <button role="tab" aria-selected={tab === 'edit'} onClick={() => setTab('edit')} className={tabClass('edit')}>
          Edit
        </button>
        <button role="tab" aria-selected={tab === 'preview'} onClick={() => setTab('preview')} className={tabClass('preview')}>
          Preview
        </button>
      </div>

      {tab === 'edit' ? (
        <div className="space-y-7">
          <section aria-label="Schedule">
            <textarea
              ref={textareaRef}
              aria-label="Schedule"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={5}
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              // 16px on phones: iOS zooms into anything smaller on focus.
              className="block w-full resize-none overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 py-3.5 text-base leading-7 text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
            <FormatHelp />
          </section>
          <RunGroups groups={groups} problems={edit.problems} onChange={updateGroup} />
        </div>
      ) : (
        <Preview event={{ ...event, runGroups: edit.runGroups, days: edit.days }} />
      )}

      <div ref={barRef} className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-gray-50/95 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 backdrop-blur">
        <div className="mx-auto max-w-lg px-3 sm:px-4">
          <Problems problems={edit.problems} onGoTo={goTo} />
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

function RunGroups({ groups, problems, onChange }: {
  groups: GroupInput[]
  problems: ScheduleProblem[]
  onChange: (group: GroupInput, patch: Partial<GroupInput>) => void
}) {
  return (
    <section aria-labelledby="run-groups-title">
      <h2 id="run-groups-title" className="px-1 text-base font-bold text-gray-900">Run groups</h2>
      <p className="mt-0.5 px-1 text-sm text-gray-500">
        Choose how each group appears in the schedule.
      </p>
      {groups.length === 0 ? (
        <p className="mt-3 rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
          Groups named in sessions (“track: Red, Blue”) show up here.
        </p>
      ) : (
        <ul className="mt-2 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5">
          {groups.map((g, i) => (
            <GroupRow
              key={g.label.toLowerCase()}
              index={i}
              group={g}
              problems={problems.filter(p => p.group === i)}
              onChange={patch => onChange(g, patch)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

const fieldLabel = 'block text-xs font-medium uppercase tracking-wider text-gray-500'

// One row of the list, iOS-settings style: the group's chip, its
// description (if any) in gray, and a chevron; tapped open, its
// description and color below it. Rows after the first get an inset
// divider.
function GroupRow({ index, group, problems, onChange }: {
  index: number
  group: GroupInput
  problems: ScheduleProblem[]
  onChange: (patch: Partial<GroupInput>) => void
}) {
  const [open, setOpen] = useState(false)
  const panelId = `run-group-${index}-panel`
  return (
    <li id={`run-group-${index}`} aria-label={group.label} className="px-4">
      <div className={index > 0 ? 'border-t border-gray-200' : ''}>
        <button
          onClick={() => setOpen(o => !o)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-[52px] w-full items-center gap-3 py-2.5 text-left"
        >
          <span className={`max-w-[60%] shrink-0 truncate rounded-full px-3 py-1 text-sm font-semibold ${group.bgClass} ${group.textClass ?? 'text-white'}`}>
            {group.label}
          </span>
          <span className="min-w-0 flex-1 truncate text-right text-sm text-gray-400">{group.description}</span>
          <ChevronRight
            size={18}
            aria-hidden="true"
            className={`shrink-0 text-gray-300 transition-transform ${open ? 'rotate-90' : ''}`}
          />
        </button>
        {open && (
          <div id={panelId} className="pb-4">
            <label className={fieldLabel}>
              Description
              <input
                aria-label={`${group.label} description`}
                value={group.description ?? ''}
                onChange={e => onChange({ description: e.target.value })}
                placeholder="Add optional description"
                className="mt-2 block h-11 w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50 px-3 text-base font-normal normal-case tracking-normal text-gray-900 focus:border-gray-400 focus:bg-white focus:outline-none sm:text-sm"
              />
            </label>
            <fieldset className="mt-4">
              <legend className="sr-only">{`${group.label} color`}</legend>
              <p aria-hidden="true" className={fieldLabel}>Color</p>
              <div className="mt-3 grid grid-cols-[repeat(6,auto)] justify-between gap-y-3">
                {RUN_GROUP_BG_CLASSES.map(c => (
                  <label key={c} className="relative block">
                    <input
                      type="radio"
                      name={`run-group-${index}-color`}
                      value={c}
                      checked={group.bgClass === c}
                      onChange={() => onChange({ bgClass: c })}
                      aria-label={colorName(c)}
                      // Invisible, over its swatch, so a tap lands on it.
                      className="peer absolute inset-0 z-10 m-0 h-full w-full cursor-pointer appearance-none rounded-full opacity-0"
                    />
                    <span
                      aria-hidden="true"
                      className={`block h-9 w-9 rounded-full ${c} ring-gray-900 ring-offset-[3px] peer-checked:ring-2 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500`}
                    />
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        )}
        {problems.map((p, j) => (
          <p key={j} className="pb-3 text-xs text-red-600">{p.message}</p>
        ))}
      </div>
    </li>
  )
}

function Problems({ problems, onGoTo }: { problems: ScheduleProblem[]; onGoTo: (p: ScheduleProblem) => void }) {
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
              onClick={() => onGoTo(p)}
              disabled={!p.line && p.group === undefined}
              className={`w-full rounded-md px-2 py-1 text-left text-xs ${
                p.blocking ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'
              }`}
            >
              {describeProblem(p)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// The schedule as the event page will show it: the same day tabs, run
// group filter, timeline and legend.
function Preview({ event }: { event: EventConfig }) {
  const today = event.days.find(d => d.date === todayLocalISO())
  const [dayId, setDayId] = useState((today ?? event.days[0]).id)
  const [selected, setSelected] = useState<string[]>([])
  const day = event.days.find(d => d.id === dayId) ?? event.days[0]
  const groupIds = new Set(event.runGroups.map(g => g.id))
  return (
    <div>
      {event.days.length > 1 && (
        <DayTabs days={event.days} activeDayId={day.id} onSelect={setDayId} todayDayId={today?.id} />
      )}
      {day.activities.length > 0 ? (
        <>
          <div className="mb-4 flex items-center justify-between gap-3">
            <RunGroupFilter groups={event.runGroups} selected={selected.filter(id => groupIds.has(id))} onChange={setSelected} />
          </div>
          <Timeline
            activities={day.activities}
            runGroups={event.runGroups}
            isToday={day.date === todayLocalISO()}
            selectedGroups={selected.filter(id => groupIds.has(id))}
            hidePast={false}
          />
          <Legend groups={event.runGroups} />
        </>
      ) : (
        <p className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
          Nothing scheduled{event.days.length > 1 ? ` on ${day.label}` : ''} yet.
        </p>
      )}
    </div>
  )
}

function FormatHelp() {
  const code = 'rounded bg-gray-100 px-1 font-mono text-[12px] text-gray-800'
  return (
    <details className="group mt-3 rounded-2xl border border-gray-200 bg-white text-sm text-gray-700 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-base text-gray-900 [&::-webkit-details-marker]:hidden">
        Format help
        <ChevronDown size={18} aria-hidden="true" className="text-gray-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="space-y-3 px-4 pb-4">
        <p>
          A line starting with <code className={code}>//</code> is an example or note and isn’t saved. Remove the{' '}
          <code className={code}>//</code> to use it.
        </p>
        <div>
          <p className="font-medium text-gray-900">Each day, under its <code className={code}>## Day | YYYY-MM-DD</code></p>
          <ul className="mt-1 space-y-1">
            <li><code className={code}>7:00 AM general | Label | subtitle</code></li>
            <li><code className={code}>12:00 PM lunch | Lunch</code> (also <code className={code}>special</code>)</li>
            <li><code className={code}>1:30 PM session 4 | track: Red, Blue | class: Novice | note: …</code></li>
            <li><code className={code}>break | Label</code> — a gap between blocks, no time</li>
          </ul>
          <p className="mt-2">
            Write times with AM or PM: <code className={code}>7:30 AM</code>, <code className={code}>1:30 PM</code>{' '}
            (<code className={code}>1:30pm</code> works too). 24-hour times like <code className={code}>13:30</code> are
            fine as well.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          Name run groups however the organizer does; each one shows up under Run groups with a color. The days
          are the event’s dates; they’re changed in the event’s details.
        </p>
      </div>
    </details>
  )
}
