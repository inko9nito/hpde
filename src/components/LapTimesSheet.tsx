import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Lock, X } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { LapChips, LapStatsLine } from './LapList'
import { formatTime, formatAmPm } from '../utils/time'
import { lapsToText, parseLapTimes, sessionKey } from '../utils/lapTimes'
import type { ReadAs, SessionLaps } from '../utils/lapTimes'
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
export function LapTimesSheet({ slot, runGroups, showDate, saved, onSave, onRemove, onClose }: Props) {
  // With more than one group on track, start from the one that already has
  // laps; failing that, ask — laps saved under the wrong group would be lost.
  const [group, setGroup] = useState<string | null>(() =>
    slot.groups.length === 1 ? slot.groups[0]
      : slot.groups.find(g => saved(sessionKey(slot.date, slot.time, g))) ?? null,
  )
  const existing = group ? saved(sessionKey(slot.date, slot.time, group)) : undefined
  const [text, setText] = useState(() => (existing ? lapsToText(existing.laps) : ''))
  const [readAs, setReadAs] = useState<ReadAs | undefined>(undefined)
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const titleId = useId()
  const textareaId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)

  const parsed = useMemo(() => parseLapTimes(text, readAs), [text, readAs])
  const canSave = group !== null && parsed.laps.length > 0 && parsed.errors.length === 0 && !busy

  function pickGroup(next: string) {
    setGroup(next)
    const laps = saved(sessionKey(slot.date, slot.time, next))
    setText(laps ? lapsToText(laps.laps) : '')
    setReadAs(undefined)
    setConfirmingRemove(false)
    setFailure(null)
  }

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
      await onSave({ date: slot.date, time: slot.time, group, sessionNumber: slot.sessionNumber, laps: parsed.laps })
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
  const subtitle = [
    slot.sessionNumber !== undefined ? `Session ${slot.sessionNumber}` : null,
    'On track',
    showDate ? shortDate(slot.date) : null,
  ].filter(Boolean).join(' · ')

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center" data-lap-sheet>
      <div className="absolute inset-0 bg-black/40" onClick={busy ? undefined : onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="sheet-up relative flex max-h-[92dvh] w-full max-w-lg flex-col overflow-y-auto overscroll-contain rounded-t-2xl bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
      >
        <div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-gray-300" aria-hidden="true" />
        <div className="flex items-start justify-between gap-3 pt-3">
          <div className="min-w-0">
            <h2 id={titleId} className="font-rubik text-lg font-semibold text-gray-900">{title}</h2>
            <p className="text-xs text-gray-500">{subtitle}</p>
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

        {slot.groups.length > 1 && (
          <fieldset className="mt-4">
            <legend className="text-xs font-medium text-gray-700">Which group were you driving in?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {slot.groups.map(id => (
                <button
                  key={id}
                  onClick={() => pickGroup(id)}
                  aria-pressed={group === id}
                  className={`rounded-full ring-offset-2 transition-shadow ${group === id ? 'ring-2 ring-gray-900' : 'opacity-60 hover:opacity-100'}`}
                >
                  <GroupBadge group={groupFor(id, runGroups)} size="sm" />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {group !== null && (
          <>
            <label htmlFor={textareaId} className="mt-4 text-xs font-medium text-gray-700">
              Lap times or timestamps
            </label>
            <textarea
              id={textareaId}
              value={text}
              onChange={e => {
                setText(e.target.value)
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
              time, notes). Start and finish times work too. Mark out laps with “Out”.
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
              <section aria-label="Laps read" className="mt-4 flex flex-col gap-2 rounded-xl bg-gray-50 p-3">
                <LapStatsLine laps={parsed.laps} />
                <LapChips laps={parsed.laps} />
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
          </>
        )}

        {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

        <div className="mt-5 flex flex-col items-center gap-3">
          <button
            onClick={save}
            disabled={!canSave}
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
          >
            {busy === 'saving' ? 'Saving…' : 'Save lap times'}
          </button>
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
            <Lock size={11} aria-hidden="true" /> Only you can see your lap times.
          </p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
