import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight, ChevronsDownUp, ChevronsUpDown, ClipboardCheck, Disc3, Lock } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { FIGURES_INDENT, LapTable, LapsHeading, SessionFigures } from './LapList'
import type { LapColumns } from './LapList'
import { groupFor, shortDate } from './LapTimesSheet'
import { formatTime, formatAmPm } from '../utils/time'
import { formatLapTime } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import type { SessionNotes } from '../utils/evaluation'
import { CORNERS, formatPsi } from '../utils/garage'
import type { Corners, SessionPressures } from '../utils/garage'
import type { RunGroupConfig } from '../types'

// The pieces My notes (#210) lists saved laps with — the best-lap cards,
// the Expand all / Private bar, a session's card and the loading skeleton
// — some of which a track page (#274) shares.

/** Which session: its day, start time and run group. */
export type SessionHead = Pick<SessionLaps, 'key' | 'date' | 'time' | 'group' | 'sessionNumber'>

export function sessionTitle(s: Pick<SessionLaps, 'sessionNumber'>): string {
  return s.sessionNumber !== undefined ? `Session ${s.sessionNumber}` : 'Session'
}

export function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

/**
 * A best lap in a card. With `link`, the whole card opens it (a chevron
 * says so); `children` go under it (a track page's chart, #274).
 */
export function StatCard({ label, ms, caption, link, children }: {
  label: string
  ms: number | undefined
  caption: string
  link?: { href: string; label: string }
  children?: ReactNode
}) {
  return (
    <div
      className={`relative min-w-0 rounded-2xl border border-gray-200 bg-white p-4 ${link ? 'transition-colors hover:border-gray-400' : ''}`}
      role="group"
      aria-label={label}
    >
      <p className="truncate text-[13px] font-semibold text-gray-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-gray-900">{ms !== undefined ? formatLapTime(ms) : '—'}</p>
      <p className={`mt-1 text-xs text-gray-400 ${link ? 'pr-4' : ''}`}>{caption}</p>
      {children}
      {link && (
        <a
          href={link.href}
          aria-label={link.label}
          className="absolute inset-0 rounded-2xl"
        >
          <ChevronRight size={16} className="absolute bottom-4 right-3 text-gray-400" aria-hidden="true" />
        </a>
      )}
    </div>
  )
}

/** Which sessions' lap tables are open. All closed to start, so every session's figures fit on screen. */
export function useOpenSessions() {
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  function toggle(key: string) {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }
  return { open, setOpen, toggle }
}

/**
 * Above the laps: Expand all / Collapse all, once there are laps to open
 * (`keys`), and the Private tag.
 */
export function LapsToolbar({ keys, open, onOpen }: {
  keys: string[]
  open: Set<string>
  onOpen: (open: Set<string>) => void
}) {
  const allOpen = keys.length > 0 && keys.every(k => open.has(k))
  return (
    <div className="mb-3 flex min-h-[20px] items-center justify-between gap-3 px-1 text-xs text-gray-500">
      {keys.length > 0 ? (
        <button
          onClick={() => onOpen(allOpen ? new Set() : new Set(keys))}
          className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-800"
        >
          {allOpen
            ? <ChevronsDownUp size={14} aria-hidden="true" />
            : <ChevronsUpDown size={14} aria-hidden="true" />}
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      ) : <span />}
      <PrivateTag />
    </div>
  )
}

/**
 * "Private", with who can see the laps on hover — worded for the driver,
 * as they'd see it, whoever's looking (#364); `what` is what's private, if
 * not lap times.
 */
export function PrivateTag({ what = 'lap times' }: { what?: string }) {
  return (
    <span
      className="flex shrink-0 items-center gap-1"
      title={`Only you and admins can see your ${what}`}
    >
      <Lock size={12} className="text-red-500" aria-hidden="true" /> Private
    </span>
  )
}

/**
 * One session's notes on My notes (#210): its time and group, then what's
 * saved for it (#324) — its lap count and a small table of its average and
 * best lap and speeds, which open onto the lap table; its instructor's
 * evaluation (#340) and its tire pressures (#344), which open in the
 * session's sheet. `onEdit` adds an
 * Edit button, for everything the session has.
 */
export function SessionLapsCard({ session, laps, notes, pressures, runGroups, showDate, columns, allTimeBest, expanded, onToggle, onEdit, onOpenEvaluation, onOpenPressures, tableId }: {
  session: SessionHead
  laps?: SessionLaps
  notes?: SessionNotes
  pressures?: SessionPressures
  runGroups: RunGroupConfig[]
  /** Show the day too — the event runs more than one. */
  showDate: boolean
  /** Shared by every card on the page, so the tables line up. */
  columns: LapColumns
  allTimeBest?: number
  expanded: boolean
  onToggle: () => void
  onEdit?: () => void
  onOpenEvaluation?: () => void
  onOpenPressures?: () => void
  /** Unique on the page. */
  tableId: string
}) {
  const title = sessionTitle(session)
  return (
    <section aria-label={`${title}, ${formatTime(session.time)} ${formatAmPm(session.time)}`}>
      <h3 className="mb-1.5 px-1 text-xs font-bold uppercase tracking-widest text-gray-400">
        {title}
        {showDate && <span className="ml-2 font-medium normal-case tracking-normal">{shortDate(session.date)}</span>}
      </h3>
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-h-7 items-center gap-3">
          <div className="flex items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
            {formatTime(session.time)}
            <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(session.time)}</span>
          </div>
          <GroupBadge group={groupFor(session.group, runGroups)} size="sm" />
          {onEdit && (
            <button
              onClick={onEdit}
              className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700"
              aria-label={`Edit ${title}`}
            >
              Edit
            </button>
          )}
        </div>
        {laps && (
          <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
            {/* The heading and figures open the table: the chevron's button stretches over them. */}
            <div className="relative flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <LapsHeading laps={laps.laps} />
                <button
                  onClick={onToggle}
                  aria-expanded={expanded}
                  aria-controls={tableId}
                  aria-label={`${expanded ? 'Hide' : 'Show'} laps for ${title}`}
                  className="-my-1 shrink-0 rounded-lg p-1 text-gray-400 after:absolute after:inset-0 after:content-[''] hover:text-gray-600"
                >
                  <ChevronRight
                    size={18}
                    className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div className={FIGURES_INDENT}>
                <SessionFigures laps={laps.laps} allTimeBest={allTimeBest} />
              </div>
            </div>
            {laps.summary && (
              <p className={`${FIGURES_INDENT} text-sm text-gray-700`} data-lap-summary>{laps.summary}</p>
            )}
            {expanded && (
              <div id={tableId}>
                <LapTable laps={laps.laps} columns={columns} allTimeBest={allTimeBest} />
              </div>
            )}
          </div>
        )}
        {notes && <EvaluationRow notes={notes} title={title} onOpen={onOpenEvaluation} />}
        {pressures && <PressuresRow pressures={pressures} title={title} onOpen={onOpenPressures} />}
      </div>
    </section>
  )
}

/**
 * A session's instructor evaluation on its card (#340): who gave it, and
 * what they said. The chevron opens it in the session's sheet; its button
 * stretches over the row.
 */
function EvaluationRow({ notes, title, onOpen }: { notes: SessionNotes; title: string; onOpen?: () => void }) {
  const { feedback, instructor } = notes.evaluation
  return (
    <div className="relative flex flex-col gap-1.5 border-t border-gray-100 pt-3" data-session-evaluation>
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <ClipboardCheck size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">Instructor evaluation{instructor && ` · ${instructor}`}</span>
        </p>
        {onOpen && (
          <button
            onClick={onOpen}
            aria-label={`Open the instructor evaluation for ${title}`}
            className="-my-1 shrink-0 rounded-lg p-1 text-gray-400 after:absolute after:inset-0 after:content-[''] hover:text-gray-600"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      <p className={`${FIGURES_INDENT} whitespace-pre-line text-sm text-gray-900`}>{feedback}</p>
    </div>
  )
}

/**
 * A session's tire pressures on its card (#344): a small table, a column
 * for each corner, a row for before and after — and what was changed. The
 * chevron opens them in the session's sheet; its button stretches over the row.
 */
function PressuresRow({ pressures, title, onOpen }: { pressures: SessionPressures; title: string; onOpen?: () => void }) {
  const rows = ([['Before', pressures.cold], ['After', pressures.hot]] as [string, Corners | undefined][])
    .flatMap(([label, corners]) => (corners ? [[label, corners] as const] : []))
  return (
    <div className="relative flex flex-col gap-1.5 border-t border-gray-100 pt-3" data-session-pressures>
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <Disc3 size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">Tire pressures · psi</span>
        </p>
        {onOpen && (
          <button
            onClick={onOpen}
            aria-label={`Open the tire pressures for ${title}`}
            className="-my-1 shrink-0 rounded-lg p-1 text-gray-400 after:absolute after:inset-0 after:content-[''] hover:text-gray-600"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      {rows.length > 0 && (
        <div className={FIGURES_INDENT}>
        <table className="text-sm" aria-label="Tire pressures">
          <thead>
            <tr>
              <th />
              {CORNERS.map(c => (
                <th key={c.id} scope="col" className="px-2 text-right text-[11px] font-medium text-gray-400" title={c.label}>{c.short}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, corners]) => (
              <tr key={label}>
                <th scope="row" className="pr-2 text-left text-xs font-normal text-gray-500">{label}</th>
                {CORNERS.map(c => (
                  <td key={c.id} className="px-2 text-right font-mono tabular-nums text-gray-900">{formatPsi(corners[c.id])}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
      {pressures.note && <p className={`${FIGURES_INDENT} whitespace-pre-line text-sm text-gray-700`}>{pressures.note}</p>}
    </div>
  )
}

/** How long the skeleton takes to fade out once the laps are in. */
export const SKELETON_FADE_MS = 150

/**
 * While the laps load, a skeleton fades in; once they're in, it fades out
 * and the lap times fade in in its place. True while it's fading out.
 */
export function useSkeletonFade(loading: boolean): boolean {
  const [wasLoading, setWasLoading] = useState(loading)
  const [leaving, setLeaving] = useState(false)
  if (wasLoading !== loading) {
    setWasLoading(loading)
    setLeaving(!loading)
  }
  useEffect(() => {
    if (!leaving) return
    const timer = setTimeout(() => setLeaving(false), SKELETON_FADE_MS)
    return () => clearTimeout(timer)
  }, [leaving])
  return leaving
}

const bar = 'animate-pulse rounded bg-gray-100'

/** Stand-in for the stat cards and a session card while the laps load. */
export function LapsSkeleton({ cards, leaving, label }: {
  cards: 1 | 2
  leaving: boolean
  label: string
}) {
  return (
    <div className={leaving ? 'fade-out' : 'fade-in'} aria-busy="true" aria-label={label}>
      <div className={`mb-5 grid gap-3 ${cards === 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {(cards === 2 ? [0, 1] : [0]).map(i => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className={`h-3 w-2/3 ${bar}`} />
            <div className={`mt-3 h-6 w-1/2 ${bar}`} />
            <div className={`mt-3 h-2.5 w-3/4 ${bar}`} />
          </div>
        ))}
      </div>
      <div className={`mb-2 ml-1 h-2.5 w-20 ${bar}`} />
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-h-7 items-center gap-3">
          <div className={`h-5 w-16 ${bar}`} />
          <div className="h-5 w-12 animate-pulse rounded-full bg-gray-100" />
        </div>
        <div className="flex flex-col gap-2.5 border-t border-gray-100 pt-3">
          <div className={`h-3 w-28 ${bar}`} />
          <div className={`flex flex-col gap-2 ${FIGURES_INDENT}`}>
            {[0, 1].map(i => <div key={i} className={`h-4 w-4/5 ${bar}`} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
