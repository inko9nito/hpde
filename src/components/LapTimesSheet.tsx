import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Lock, X } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { LapFigures, LapTable } from './LapList'
import { formatTime, formatAmPm } from '../utils/time'
import { MAX_SUMMARY, lapsToText, parseLapTimes, sessionKey } from '../utils/lapTimes'
import type { ReadAs, SessionLaps } from '../utils/lapTimes'
import { driverName } from '../data/drivers'
import type { Driver } from '../data/drivers'
import type { RunGroupConfig } from '../types'

/** A session a driver can log laps for: a day, a start time, the groups on track. */
export interface SessionSlot {
  date: string
  time: string
  sessionNumber?: number
  /** Run group ids on track. With more than one, the driver picks theirs. */
  groups: string[]
}

interface Props {
  slot: SessionSlot
  runGroups: RunGroupConfig[]
  /** Show the day too — for an event that runs more than one. */
  showDate: boolean
  saved: (key: string) => SessionLaps | undefined
  /** The best on this track layout across every event, to mark a lap that set it. */
  allTimeBest?: number
  /** Whose laps: another driver's, for an admin logging them (#289); null for your own. */
  driver?: Driver | null
  /** Admins only: the Driver picker, under the heading (#289). */
  driverPicker?: ReactNode
  /** The driver's saved laps are still on their way. */
  loading?: boolean
  onSave: (session: Omit<SessionLaps, 'key' | 'updatedAt'>) => Promise<void>
  onRemove: (key: string) => Promise<void>
  onClose: () => void
}

export function groupFor(id: string, runGroups: RunGroupConfig[]): RunGroupConfig {
  return runGroups.find(g => g.id === id) ?? { id, label: id, bgClass: 'bg-gray-500', textClass: 'text-white' }
}

export function shortDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/**
 * The sheet a session's lap times are added and edited in (#210): tap a
 * session you drove, paste your times, check what was read, save. Opens
 * from the bottom like an iOS sheet.
 */
export function LapTimesSheet({
  slot, runGroups, showDate, saved, allTimeBest, driver = null, driverPicker, loading = false, onSave, onRemove, onClose,
}: Props) {
  // With more than one group on track, start from the one that already has
  // laps; failing that, ask — laps saved under the wrong group would be lost.
  const savedGroup = () =>
    slot.groups.length === 1 ? slot.groups[0]
      : slot.groups.find(g => saved(sessionKey(slot.date, slot.time, g))) ?? null
  const [group, setGroup] = useState<string | null>(savedGroup)
  const existing = group ? saved(sessionKey(slot.date, slot.time, group)) : undefined
  const [text, setText] = useState(() => (existing ? lapsToText(existing.laps) : ''))
  const [textTouched, setTextTouched] = useState(false)
  const [readAs, setReadAs] = useState<ReadAs | undefined>(undefined)
  // A summary of the laps. Until it's typed in, a summary found in the
  // paste (the words under a timing sheet's session title) fills it.
  const [summaryText, setSummaryText] = useState(() => existing?.summary ?? '')
  const [summaryTouched, setSummaryTouched] = useState(false)
  const summaryId = useId()
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  // Saved laps open read-only; Edit brings up the text box.
  const [editing, setEditing] = useState(() => !existing)
  const textareaId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  const parsed = useMemo(() => parseLapTimes(text, readAs), [text, readAs])
  const canSave = group !== null && parsed.laps.length > 0 && parsed.errors.length === 0 && !busy && !loading
  const summaryFromPaste = !summaryTouched && !summaryText && !!parsed.summary
  const summary = summaryFromPaste ? parsed.summary! : summaryText

  // Starts over from what's saved for this group (none: ask for one).
  function startFrom(next: string | null) {
    setGroup(next)
    const laps = next ? saved(sessionKey(slot.date, slot.time, next)) : undefined
    setText(laps ? lapsToText(laps.laps) : '')
    setTextTouched(false)
    setSummaryText(laps?.summary ?? '')
    setSummaryTouched(false)
    setEditing(!laps)
    setReadAs(undefined)
    setConfirmingRemove(false)
    setFailure(null)
  }

  // A different driver picked, or their laps just in (#289): start over
  // from what they have saved — unless something's been typed, which
  // stays, to be saved for whoever's picked now.
  const typed = textTouched || summaryTouched
  const source = `${driver?.id ?? ''} ${loading ? 'loading' : 'ready'}`
  const [shownSource, setShownSource] = useState(source)
  if (shownSource !== source) {
    setShownSource(source)
    if (!typed) startFrom(savedGroup())
  }
  // Until their laps are in, there's nothing to show but that.
  const waiting = loading && !typed
  const whose = driver ? `${driverName(driver)}’s` : 'your'

  // Once, when the sheet opens — not on every render, which would pull
  // focus out of the text box mid-typing (and close the iPhone keyboard).
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCloseRef.current() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previousFocus?.focus?.()
    }
  }, [])

  async function save() {
    if (!canSave || group === null) return
    setBusy('saving')
    setFailure(null)
    try {
      await onSave({
        date: slot.date, time: slot.time, group, sessionNumber: slot.sessionNumber, laps: parsed.laps,
        ...(summary.trim() ? { summary: summary.trim() } : {}),
      })
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  async function remove() {
    if (!existing) return
    setBusy('removing')
    setFailure(null)
    try {
      await onRemove(existing.key)
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  const title = `${formatTime(slot.time)} ${formatAmPm(slot.time)}${group ? ` · ${groupFor(group, runGroups).label}` : ''}`
  const overline = [
    slot.sessionNumber !== undefined ? `Session ${slot.sessionNumber}` : null,
    showDate ? shortDate(slot.date) : null,
  ].filter(Boolean).join(' · ')

  function cancelEdit() {
    if (!existing) return
    setText(lapsToText(existing.laps))
    setTextTouched(false)
    setSummaryText(existing.summary ?? '')
    setSummaryTouched(false)
    setReadAs(undefined)
    setFailure(null)
    setEditing(false)
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center" data-lap-sheet>
      <div className="absolute inset-0 bg-black/40" onClick={busy ? undefined : onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="sheet-up relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-y-auto [&>*]:shrink-0 overscroll-contain rounded-t-2xl bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
      >
        <div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3 pt-3">
          {/* Like the session's card on the schedule: its time and group. */}
          <div className="min-w-0">
            {overline && <p className="text-xs text-gray-500">{overline}</p>}
            <h2 className="mt-0.5 flex items-center gap-3">
              <span className="flex items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
                {formatTime(slot.time)}
                <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(slot.time)}</span>
              </span>
              {group !== null && <GroupBadge group={groupFor(group, runGroups)} size="sm" />}
            </h2>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            disabled={!!busy}
            aria-label="Close"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>

        {driverPicker && <div className="mt-4">{driverPicker}</div>}

        {waiting && (
          <p className="mt-4 text-sm text-gray-400" aria-busy="true">Loading {whose} lap times…</p>
        )}

        {slot.groups.length > 1 && !waiting && (
          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-gray-700">
              {driver ? `Which group was ${driverName(driver)} driving in?` : 'Which group were you driving in?'}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {slot.groups.map(id => (
                <button
                  key={id}
                  onClick={() => startFrom(id)}
                  aria-pressed={group === id}
                  className={`rounded-full ring-offset-2 transition-shadow ${group === id ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'}`}
                >
                  <GroupBadge group={groupFor(id, runGroups)} size="sm" />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {group !== null && existing && !editing && !waiting && (
          <section aria-label="Saved laps" className="mt-4 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <LapFigures laps={existing.laps} allTimeBest={allTimeBest} />
              <button
                onClick={() => setEditing(true)}
                className="shrink-0 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
            </div>
            {existing.summary && <p className="text-sm text-gray-700" data-lap-summary>{existing.summary}</p>}
            <LapTable laps={existing.laps} allTimeBest={allTimeBest} />
          </section>
        )}

        {group !== null && editing && !waiting && (
          <>
            <label htmlFor={textareaId} className="mt-4 text-xs font-medium text-gray-700">
              Lap times or timestamps
            </label>
            <textarea
              id={textareaId}
              value={text}
              onChange={e => {
                setText(e.target.value)
                setTextTouched(true)
                setConfirmingRemove(false)
              }}
              rows={5}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              placeholder="1:39.42, 1:38.91, 1:39.08"
              className="mt-1.5 w-full resize-y rounded-xl border border-gray-300 px-3 py-2 font-mono text-base leading-snug text-gray-900 [tab-size:2] placeholder:text-gray-400 focus:border-gray-900 focus:outline-none sm:text-sm"
            />
            <p className="mt-1.5 text-xs text-gray-500">
              Paste a list, a spreadsheet column, or rows from your timing sheet (lap, start, finish,
              time, notes). Start and finish times work too. Mark out laps with “Out”. Laps, best and
              average are worked out for you.
            </p>

            {parsed.ambiguous && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-700" role="group" aria-label="Read these as">
                <span>These are</span>
                {(['laps', 'timestamps'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setReadAs(mode)}
                    aria-pressed={parsed.readAs === mode}
                    className={`rounded-full border px-2.5 py-1 ${parsed.readAs === mode ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700'}`}
                  >
                    {mode === 'laps' ? 'Lap times' : 'Video timestamps'}
                  </button>
                ))}
              </div>
            )}

            {parsed.laps.length > 0 && (
              <section aria-label="Laps read" className="mt-4 flex flex-col gap-2 rounded-xl border border-gray-200 p-3">
                <LapFigures laps={parsed.laps} allTimeBest={allTimeBest} />
                <LapTable laps={parsed.laps} allTimeBest={allTimeBest} />
              </section>
            )}

            {parsed.errors.length > 0 && (
              <ul className="mt-3 flex flex-col gap-1 text-xs text-red-700" aria-label="Can’t read">
                {parsed.errors.map((e, i) => (
                  <li key={i}>
                    <span className="font-medium">Line {e.line}:</span> {e.message}
                  </li>
                ))}
              </ul>
            )}

            {parsed.skipped.length > 0 && (
              <p className="mt-2 text-xs text-gray-400">
                Passed over {parsed.skipped.length === 1 ? 'line' : 'lines'}{' '}
                {parsed.skipped.map(s => s.line).join(', ')}: not laps (titles, headers or totals).
              </p>
            )}

            <label htmlFor={summaryId} className="mt-4 flex items-baseline justify-between text-xs font-medium text-gray-700">
              Lap time summary
              <span className="font-normal text-gray-400">{summaryFromPaste ? 'From your paste' : 'Optional'}</span>
            </label>
            <textarea
              id={summaryId}
              value={summary}
              onChange={e => {
                setSummaryText(e.target.value)
                setSummaryTouched(true)
              }}
              rows={3}
              maxLength={MAX_SUMMARY}
              placeholder="Out lap, traffic, flags, checkered…"
              className="mt-1.5 w-full resize-y rounded-xl border border-gray-300 px-3 py-2 text-base leading-snug text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none sm:text-sm"
            />
          </>
        )}

        {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

        <div className="mt-5 flex flex-col items-center gap-3">
          {(editing || group === null) && !waiting && (
            <button
              onClick={save}
              disabled={!canSave}
              className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
            >
              {busy === 'saving' ? 'Saving…' : 'Save lap times'}
            </button>
          )}
          {editing && existing && (
            <button onClick={cancelEdit} disabled={!!busy} className="text-sm text-gray-600 hover:text-gray-800">
              Cancel
            </button>
          )}
          {existing && !confirmingRemove && (
            <button
              onClick={() => setConfirmingRemove(true)}
              disabled={!!busy}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove from session
            </button>
          )}
          {existing && confirmingRemove && (
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-700">Remove these lap times?</span>
              <button onClick={remove} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
                {busy === 'removing' ? 'Removing…' : 'Remove'}
              </button>
              <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
                Keep
              </button>
            </div>
          )}
          <p className="flex items-center gap-1 text-[11px] text-gray-400">
            <Lock size={11} aria-hidden="true" />
            {driver ? `Only ${driverName(driver)} and admins can see these lap times.` : 'Only you and admins can see your lap times.'}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
