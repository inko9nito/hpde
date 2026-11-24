import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight, ChevronsDownUp, ChevronsUpDown, ClipboardCheck, Disc3, NotebookPen, Waves } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { CardFigures, FIGURES_INDENT, LapTable } from './LapList'
import type { LapColumns } from './LapList'
import { SessionLapChart } from './SessionLapChart'
import type { LapChartScope, Reference } from './SessionLapChart'
import { groupFor, shortDate } from './LapTimesSheet'
import { formatTime, formatAmPm } from '../utils/time'
import { formatLapTime, lapStats } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import type { SessionNotes } from '../utils/evaluation'
import { CORNERS, formatPsi } from '../utils/garage'
import type { Corners, SessionPressures } from '../utils/garage'
import { conditionsText } from '../utils/conditions'
import { SKY_ICONS } from './skyIcons'
import type { SessionConditions } from '../utils/conditions'
import type { RunGroupConfig } from '../types'

// The pieces My notes (#210) lists saved laps with — the best-lap cards,
// the Expand all bar, a session's card and the loading skeleton
// — some of which a track page (#274) shares.

/** Which session: its day, start time and run group. */
export type SessionHead = Pick<SessionLaps, 'key' | 'date' | 'time' | 'group' | 'sessionNumber'>

export function sessionTitle(s: Pick<SessionLaps, 'sessionNumber' | 'label'>): string {
  if (s.label) return s.label
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
 * (`keys`).
 */
export function LapsToolbar({ keys, open, onOpen, action }: {
  keys: string[]
  open: Set<string>
  onOpen: (open: Set<string>) => void
  /** Across from Expand all: My notes' Import laps (#472). */
  action?: ReactNode
}) {
  const allOpen = keys.length > 0 && keys.every(k => open.has(k))
  return (
    <div className="relative mb-3 flex min-h-[20px] items-center justify-between gap-3 px-1 text-xs text-gray-500">
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
      {action}
    </div>
  )
}

/** `2026-11-21` → `Saturday`. */
export function weekday(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long' })
}

/**
 * Heads a day's sessions on My notes (#477), when the event runs more than
 * one: the weekday spelled out, its date, and how many sessions it has.
 */
export function DayHeading({ date, sessions }: { date: string; sessions: number }) {
  return (
    <h3 className="flex items-baseline gap-2 px-1">
      <span className="text-[17px] font-semibold text-gray-900">{weekday(date)}</span>{' '}
      <span className="text-sm text-gray-500">{shortDate(date)}</span>{' '}
      <span className="ml-auto text-xs text-gray-400">{plural(sessions, 'session', 'sessions')}</span>
    </h3>
  )
}

/**
 * One session's notes on My notes (#210): a line with its time, which
 * session and its group (#477), then what's saved for it (#324) — its
 * average and best lap and its laps in a sparkline, which open onto the lap
 * chart and table, and its note; its instructor's evaluation (#340) and its
 * tire pressures (#344), which open in the session's sheet. `onEdit` adds an
 * Edit button, for everything the session has. Its day is in the heading
 * above it, when the event runs more than one (`DayHeading`).
 */
export function SessionLapsCard({ session, laps, notes, pressures, runGroups, columns, allTimeBest, chart, expanded, onToggle, onEdit, onOpenEvaluation, onOpenPressures, onOpenConditions, tableId }: {
  session: SessionHead
  laps?: SessionLaps
  notes?: SessionNotes
  pressures?: SessionPressures
  runGroups: RunGroupConfig[]
  /** Shared by every card on the page, so the tables line up. */
  columns: LapColumns
  allTimeBest?: number
  /**
   * Opened, the chart of its laps over the table (#475): its lines at this
   * session's best and average, or the event's (`event`, when it has more
   * than this session), as `scope` says — one switch for every card.
   */
  chart?: { scope: LapChartScope; event?: Reference; onScope: (scope: LapChartScope) => void }
  expanded: boolean
  onToggle: () => void
  onEdit?: () => void
  onOpenEvaluation?: () => void
  onOpenPressures?: () => void
  onOpenConditions?: () => void
  /** Unique on the page. */
  tableId: string
}) {
  const title = sessionTitle(session)
  return (
    <section aria-label={`${title}, ${formatTime(session.time)} ${formatAmPm(session.time)}`}>
      {/* One slim line (#477): the time, which session, its group, and Edit. */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-h-6 items-center gap-2">
          <div className="flex items-baseline gap-0.5 font-mono text-base font-semibold text-gray-900">
            {formatTime(session.time)}
            <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(session.time)}</span>
          </div>
          <span className="min-w-0 truncate text-xs text-gray-500">{title}</span>
          <GroupBadge group={groupFor(session.group, runGroups)} size="sm" className="shrink-0" />
          {onEdit && (
            <button
              onClick={onEdit}
              className="ml-auto shrink-0 text-sm font-medium text-blue-600 hover:text-blue-700"
              aria-label={`Edit ${title}`}
            >
              Edit
            </button>
          )}
        </div>
        {laps && (
          <div className="flex flex-col gap-2.5">
            {/* The figures open the table: the chevron's button stretches over them. */}
            <div className="relative flex items-center gap-3">
              <CardFigures laps={laps.laps} allTimeBest={allTimeBest} sparkline={!expanded} />
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
            {laps.summary && (
              <p className="flex gap-1.5 text-sm text-gray-700" data-lap-summary>
                <NotebookPen size={13} className="mt-[3px] shrink-0 text-gray-400" aria-label="Note" />
                <span>{laps.summary}</span>
              </p>
            )}
            {expanded && (
              <div id={tableId} className="flex flex-col gap-3">
                {chart && lapStats(laps.laps).count > 1 && (
                  <div className="pt-2">
                    <SessionLapChart laps={laps.laps} title={title} {...chart} />
                  </div>
                )}
                <LapTable laps={laps.laps} columns={columns} allTimeBest={allTimeBest} />
              </div>
            )}
          </div>
        )}
        {notes?.conditions && <ConditionsRow conditions={notes.conditions} title={title} onOpen={onOpenConditions} />}
        {notes?.evaluation && <EvaluationRow evaluation={notes.evaluation} title={title} onOpen={onOpenEvaluation} />}
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
export function EvaluationRow({ evaluation, title, onOpen }: { evaluation: NonNullable<SessionNotes['evaluation']>; title: string; onOpen?: () => void }) {
  const { feedback, instructor } = evaluation
  return (
    <div className="relative flex flex-col gap-1.5 border-t border-gray-100 pt-3" data-session-evaluation>
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <ClipboardCheck size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">Instructor feedback{instructor && ` · ${instructor}`}</span>
        </p>
        {onOpen && (
          <button
            onClick={onOpen}
            aria-label={`Open the instructor feedback for ${title}`}
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
 * A session's track conditions on its card (#347): the surface, sky and
 * temperatures in a line, and their note. The chevron opens them in the
 * session's sheet; its button stretches over the row.
 */
export function ConditionsRow({ conditions, title, onOpen }: { conditions: SessionConditions; title: string; onOpen?: () => void }) {
  const Icon = conditions.sky ? SKY_ICONS[conditions.sky] : Waves
  const line = conditionsText(conditions)
  return (
    <div className="relative flex flex-col gap-1.5 border-t border-gray-100 pt-3" data-session-conditions>
      <div className="flex items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-gray-500">
          <Waves size={13} className="shrink-0" aria-hidden="true" />
          <span className="truncate">Track conditions</span>
        </p>
        {onOpen && (
          <button
            onClick={onOpen}
            aria-label={`Open the track conditions for ${title}`}
            className="-my-1 shrink-0 rounded-lg p-1 text-gray-400 after:absolute after:inset-0 after:content-[''] hover:text-gray-600"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
      </div>
      {line && (
        <p className={`${FIGURES_INDENT} flex items-center gap-2 text-sm font-medium text-gray-900`}>
          <Icon size={16} className="shrink-0 text-gray-500" aria-hidden="true" />
          {line}
        </p>
      )}
      {conditions.note && <p className={`${FIGURES_INDENT} whitespace-pre-line text-sm text-gray-700`}>{conditions.note}</p>}
    </div>
  )
}

/**
 * A session's tire pressures on its card (#344): a small table, a column
 * for each corner, a row for before and after — and what was changed. The
 * chevron opens them in the session's sheet; its button stretches over the row.
 */
export function PressuresRow({ pressures, title, onOpen }: { pressures: SessionPressures; title: string; onOpen?: () => void }) {
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
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex min-h-6 items-center gap-2">
          <div className={`h-4 w-14 ${bar}`} />
          <div className={`h-3 w-16 ${bar}`} />
          <div className="h-5 w-12 animate-pulse rounded-full bg-gray-100" />
        </div>
        <div className="grid grid-cols-[1fr_1fr_5rem] gap-x-3 gap-y-2">
          {[0, 1, 2].map(i => <div key={i} className={`h-2.5 w-12 ${bar}`} />)}
          {[0, 1, 2].map(i => <div key={i} className={`h-4 w-4/5 ${bar}`} />)}
        </div>
      </div>
    </div>
  )
}
