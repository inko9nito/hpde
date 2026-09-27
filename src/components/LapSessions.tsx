import { useEffect, useState } from 'react'
import { ChevronRight, ChevronsDownUp, ChevronsUpDown, Lock, Timer } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { LapFigures, LapTable } from './LapList'
import type { LapColumns } from './LapList'
import { groupFor, shortDate } from './LapTimesSheet'
import { formatTime, formatAmPm } from '../utils/time'
import { formatLapTime } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import type { RunGroupConfig } from '../types'

// The pieces My notes (#210) lists saved laps with — the best-lap cards,
// the Expand all / Private bar, a session's card and the loading skeleton
// — some of which a track page (#274) shares.

export function sessionTitle(s: SessionLaps): string {
  return s.sessionNumber !== undefined ? `Session ${s.sessionNumber}` : 'Session'
}

export function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

/** A best lap in a card. With `link`, the whole card opens it (a chevron says so). */
export function StatCard({ label, ms, caption, link }: {
  label: string
  ms: number | undefined
  caption: string
  link?: { href: string; label: string }
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
 * (`keys`), and the Private tag. `whose` names another driver's laps, for
 * an admin (#288).
 */
export function LapsToolbar({ keys, open, onOpen, whose }: {
  keys: string[]
  open: Set<string>
  onOpen: (open: Set<string>) => void
  whose: string | null
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
      <PrivateTag whose={whose} />
    </div>
  )
}

/** "Private", with who can see the laps on hover. `whose` names another driver, for an admin (#288). */
export function PrivateTag({ whose }: { whose: string | null }) {
  return (
    <span
      className="flex shrink-0 items-center gap-1"
      title={whose ? `Only ${whose} and admins can see these lap times` : 'Only you and admins can see your lap times'}
    >
      <Lock size={12} className="text-red-500" aria-hidden="true" /> Private
    </span>
  )
}

/**
 * One session's laps (#210): its time and group, then Laps · Average · Best,
 * which open onto the lap table. `onEdit` adds an Edit button (My notes).
 */
export function SessionLapsCard({ session, runGroups, showDate, columns, allTimeBest, expanded, onToggle, onEdit, tableId }: {
  session: SessionLaps
  runGroups: RunGroupConfig[]
  /** Show the day too — the event runs more than one. */
  showDate: boolean
  /** Shared by every card on the page, so the tables line up. */
  columns: LapColumns
  allTimeBest?: number
  expanded: boolean
  onToggle: () => void
  onEdit?: () => void
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
        <div className="flex items-center gap-3">
          <div className="flex items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
            {formatTime(session.time)}
            <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(session.time)}</span>
          </div>
          <GroupBadge group={groupFor(session.group, runGroups)} size="sm" />
        </div>
        <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
          <div className="flex min-h-5 items-center justify-between gap-3">
            <p className="flex items-center gap-1.5 text-xs text-gray-500">
              <Timer size={13} aria-hidden="true" /> Lap times
            </p>
            {onEdit && (
              <button
                onClick={onEdit}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
                aria-label={`Edit lap times for ${title}`}
              >
                Edit
              </button>
            )}
          </div>
          {/* The whole row opens the table: the chevron's button stretches over it. */}
          <div className="relative flex items-center gap-2">
            <LapFigures laps={session.laps} allTimeBest={allTimeBest} />
            <button
              onClick={onToggle}
              aria-expanded={expanded}
              aria-controls={tableId}
              aria-label={`${expanded ? 'Hide' : 'Show'} laps for ${title}`}
              className="shrink-0 rounded-lg p-1 text-gray-400 after:absolute after:inset-0 after:content-[''] hover:text-gray-600"
            >
              <ChevronRight
                size={18}
                className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
          {session.summary && (
            <p className="text-sm text-gray-700" data-lap-summary>{session.summary}</p>
          )}
          {expanded && (
            <div id={tableId}>
              <LapTable laps={session.laps} columns={columns} allTimeBest={allTimeBest} />
            </div>
          )}
        </div>
      </div>
    </section>
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
        <div className="flex items-center gap-3">
          <div className={`h-5 w-16 ${bar}`} />
          <div className="h-5 w-12 animate-pulse rounded-full bg-gray-100" />
        </div>
        <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
          <div className={`h-3 w-20 ${bar}`} />
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map(i => <div key={i} className="h-[52px] animate-pulse rounded-lg bg-gray-50" />)}
          </div>
        </div>
      </div>
    </div>
  )
}
