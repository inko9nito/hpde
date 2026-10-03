import { useId, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ClipboardCheck, Disc3, Timer } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { FIGURES_INDENT, LapTable, LapsHeading, SessionFigures } from './LapList'
import { Sheet } from './Sheet'
import { SessionEvaluationForm } from './SessionEvaluationForm'
import { TirePressuresForm, pressuresText } from './TirePressuresForm'
import { formatTime, formatAmPm } from '../utils/time'
import { MAX_SUMMARY, formatLapTime, lapStats, lapsToText, parseLapTimes, sessionKey } from '../utils/lapTimes'
import type { ReadAs, SessionLaps } from '../utils/lapTimes'
import type { SessionNotes } from '../utils/evaluation'
import type { SessionPressures } from '../utils/garage'
import { gapToBest } from '../utils/trackStats'
import { opensElsewhere } from '../utils/links'
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

/**
 * What the sheet shows: what can be added to the session (#205), its laps,
 * its instructor evaluation (#340) or its tire pressures (#344).
 */
export type SessionView = 'menu' | 'laps' | 'evaluation' | 'pressures'

interface Props {
  slot: SessionSlot
  /** Where it opens. The menu, unless it's opened for one of them. */
  view?: SessionView
  runGroups: RunGroupConfig[]
  /** Show the day too — for an event that runs more than one. */
  showDate: boolean
  saved: (key: string) => SessionLaps | undefined
  /** The session's instructor evaluation, if one's saved (#340). */
  savedNotes: (key: string) => SessionNotes | undefined
  /** The best on this track layout across every event, to mark a lap that set it. */
  allTimeBest?: number
  /** The layout's track page (#274), linked under saved laps. */
  track?: { name: string; href: string }
  /** Opens the track page (and closes the sheet). */
  onOpenTrack?: () => void
  /** Whose laps: another driver's, for an admin logging them (#288); null for your own. */
  driver?: Driver | null
  /** The driver's saved laps (or notes) are still on their way. */
  loading?: boolean
  onSave: (session: Omit<SessionLaps, 'key' | 'updatedAt'>) => Promise<void>
  onRemove: (key: string) => Promise<void>
  onSaveEvaluation: (session: Omit<SessionNotes, 'key' | 'updatedAt'>) => Promise<void>
  onRemoveEvaluation: (key: string) => Promise<void>
  /**
   * The session's tire pressures (#344), from the garage — only the
   * driver's own, so none for another driver's.
   */
  pressures?: {
    saved: (key: string) => SessionPressures | undefined
    onSave: (pressures: SessionPressures) => Promise<void>
    onRemove: (key: string) => Promise<void>
  }
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
 * The sheet a session you drove opens in (#210): what you can add to it
 * (#205) — its lap times and your instructor's evaluation (#340) — each
 * opening in the sheet, with the way back to the list. Lap times: paste
 * your times, check what was read, save. Opens from the bottom like an iOS
 * sheet.
 */
export function LapTimesSheet({
  slot, view: startView = 'menu', runGroups, showDate, saved, savedNotes, allTimeBest, track, onOpenTrack, driver = null,
  loading = false, onSave, onRemove, onSaveEvaluation, onRemoveEvaluation, pressures, onClose,
}: Props) {
  const [view, setView] = useState<SessionView>(startView)
  // With more than one group on track, start from the one that already has
  // laps or notes; failing that, ask — saved under the wrong group, they'd
  // be lost.
  const savedGroup = () =>
    slot.groups.length === 1 ? slot.groups[0]
      : slot.groups.find(g => {
        const k = sessionKey(slot.date, slot.time, g)
        return saved(k) ?? savedNotes(k) ?? pressures?.saved(k)
      }) ?? null
  const [group, setGroup] = useState<string | null>(savedGroup)
  const existing = group ? saved(sessionKey(slot.date, slot.time, group)) : undefined
  const notes = group ? savedNotes(sessionKey(slot.date, slot.time, group)) : undefined
  const tires = group ? pressures?.saved(sessionKey(slot.date, slot.time, group)) : undefined
  const [evaluationBusy, setEvaluationBusy] = useState(false)
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

  // A different driver picked, or their laps just in (#288): start over
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

  const key = group ? sessionKey(slot.date, slot.time, group) : null

  return (
    <Sheet
      label={title}
      busy={!!busy || evaluationBusy}
      onClose={onClose}
      data-lap-sheet
      heading={<>
        {/* Like the session's card on the schedule: its time and group. */}
        {overline && <p className="text-xs text-gray-500">{overline}</p>}
        <h2 className="mt-0.5 flex items-center gap-3">
          <span className="flex items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
            {formatTime(slot.time)}
            <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(slot.time)}</span>
          </span>
          {group !== null && <GroupBadge group={groupFor(group, runGroups)} size="sm" />}
        </h2>
      </>}
    >
      {waiting && (
        <p className="mt-4 text-sm text-gray-400" aria-busy="true">Loading your notes…</p>
      )}

      {slot.groups.length > 1 && !waiting && (
        <fieldset className="mt-4">
          <legend className="text-xs font-medium text-gray-700">
            Which group were you driving in?
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

      {view !== 'menu' && !waiting && (
        <button
          onClick={() => setView('menu')}
          disabled={!!busy || evaluationBusy}
          className="-ml-1 mt-4 flex items-center self-start text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          All session info
        </button>
      )}

      {view === 'menu' && !waiting && (
        <nav aria-label="Session info" className="mt-4 flex flex-col gap-2">
          <MenuRow
            icon={Timer}
            title="Lap times"
            detail={existing ? lapsDetail(existing) : 'Paste times or timestamps from your timing sheet'}
            saved={!!existing}
            disabled={group === null}
            onClick={() => setView('laps')}
          />
          <MenuRow
            icon={ClipboardCheck}
            title="Instructor evaluation"
            detail={notes ? notes.evaluation.feedback : 'Add what your instructor told you after this session'}
            saved={!!notes}
            disabled={group === null}
            onClick={() => setView('evaluation')}
          />
          {pressures && (
            <MenuRow
              icon={Disc3}
              title="Tire pressures"
              detail={tires ? pressuresText(tires) : 'Each corner, before the session and hot after it'}
              saved={!!tires}
              disabled={group === null}
              onClick={() => setView('pressures')}
            />
          )}
        </nav>
      )}

      {view === 'laps' && (<>
        {group !== null && existing && !editing && !waiting && (
          <section aria-label="Saved laps" className="mt-4 flex flex-col gap-3">
            {/* Like the session's card on My notes (#324). */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <LapsHeading laps={existing.laps} />
                <button
                  onClick={() => setEditing(true)}
                  className="-my-2 shrink-0 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Edit
                </button>
              </div>
              <div className={FIGURES_INDENT}>
                <SessionFigures laps={existing.laps} allTimeBest={allTimeBest} />
              </div>
            </div>
            {existing.summary && <p className={`${FIGURES_INDENT} text-sm text-gray-700`} data-lap-summary>{existing.summary}</p>}
            <LapTable laps={existing.laps} allTimeBest={allTimeBest} />
            {track && <TrackLink track={track} laps={existing} allTimeBest={allTimeBest} onOpen={onOpenTrack} />}
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
              time, top and average speed in mph, notes). Start and finish times work too. Mark out
              laps with “Out”. Laps, best and average are worked out for you.
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
                <div className="flex flex-col gap-1.5">
                  <LapsHeading laps={parsed.laps} />
                  <div className={FIGURES_INDENT}>
                    <SessionFigures laps={parsed.laps} allTimeBest={allTimeBest} />
                  </div>
                </div>
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
        </div>
      </>)}

      {view === 'evaluation' && group !== null && key !== null && !waiting && (
        <SessionEvaluationForm
          // Fresh for each group and driver, from what they have saved.
          key={`${key} ${driver?.id ?? ''}`}
          existing={notes?.evaluation}
          onBusyChange={setEvaluationBusy}
          onSave={evaluation => onSaveEvaluation({
            date: slot.date, time: slot.time, group, sessionNumber: slot.sessionNumber, evaluation,
          })}
          onRemove={() => onRemoveEvaluation(key)}
        />
      )}

      {view === 'pressures' && pressures && group !== null && key !== null && !waiting && (
        <TirePressuresForm
          key={key}
          session={{ date: slot.date, time: slot.time, group, sessionNumber: slot.sessionNumber }}
          existing={tires}
          onBusyChange={setEvaluationBusy}
          onSave={pressures.onSave}
          onRemove={() => pressures.onRemove(key)}
        />
      )}
    </Sheet>
  )
}

/** "3 laps · best 1:39.12": what a session's saved laps come to, in the menu. */
function lapsDetail(laps: SessionLaps): string {
  const { count, best } = lapStats(laps.laps)
  return `${count} ${count === 1 ? 'lap' : 'laps'}${best !== undefined ? ` · best ${formatLapTime(best)}` : ''}`
}

/** One thing a session can have (#205): what it is, what's saved, and the way in. */
function MenuRow({ icon: Icon, title, detail, saved, disabled, onClick }: {
  icon: LucideIcon
  title: string
  detail: string
  saved: boolean
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 text-left transition-colors hover:bg-gray-50 disabled:opacity-50"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900">{title}</span>
        <span className={`mt-0.5 block truncate text-xs ${saved ? 'text-gray-700' : 'text-gray-500'}`}>{detail}</span>
      </span>
      {saved && <span className="h-2 w-2 shrink-0 rounded-full bg-green-500" aria-hidden="true" />}
      <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
    </button>
  )
}

/**
 * Under a session's saved laps (#274): how they compare with the all-time
 * best on the layout, and the way to every session on it — the track page.
 */
function TrackLink({ track, laps, allTimeBest, onOpen }: {
  track: { name: string; href: string }
  laps: SessionLaps
  allTimeBest?: number
  onOpen?: () => void
}) {
  const { best } = lapStats(laps.laps)
  const gap = best !== undefined && allTimeBest !== undefined ? gapToBest(best, allTimeBest) : undefined
  return (
    <div className="flex flex-col items-start gap-1.5 border-t border-gray-100 pt-3" data-track-link>
      {best !== undefined && allTimeBest !== undefined && (
        <p className="text-xs text-gray-500">
          All time best on {track.name}:{' '}
          <span className="font-mono font-semibold tabular-nums text-gray-900">{formatLapTime(allTimeBest)}</span>
          {' · '}
          {/* Wraps as one piece, never leaving "session" on a line of its own. */}
          <span className="whitespace-nowrap">{gap ? `${gap} vs this session` : 'set this session'}</span>
        </p>
      )}
      <a
        href={track.href}
        onClick={e => {
          if (!onOpen || opensElsewhere(e)) return
          e.preventDefault()
          onOpen()
        }}
        className="flex items-center gap-0.5 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        See all my {track.name} laps
        <ChevronRight size={16} aria-hidden="true" />
      </a>
    </div>
  )
}
