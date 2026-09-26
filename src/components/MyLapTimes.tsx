import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight, ChevronsDownUp, ChevronsUpDown, Lock, Timer } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { LapFigures, LapTable, lapColumns } from './LapList'
import { groupFor, shortDate } from './LapTimesSheet'
import { formatTime, formatAmPm } from '../utils/time'
import { formatLapTime } from '../utils/lapTimes'
import { eventBest, trackShortName } from '../utils/trackStats'
import type { LapLog } from '../data/lapLog'
import { driverName } from '../data/drivers'
import type { Driver } from '../data/drivers'
import type { SessionLaps } from '../utils/lapTimes'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  log: LapLog
  /** The best on this track layout across every event, and how many events that is. */
  layoutBest: { best?: number; events: number }
  /** The same best, once every event's is known — marks the lap that set it. */
  allTimeBest?: number
  /** Whose laps: another driver's, for an admin logging them (#288); null for your own. */
  driver?: Driver | null
  /** Admins only: the Driver picker, above the laps (#288). */
  driverPicker?: ReactNode
  onEdit: (session: SessionLaps) => void
}

function sessionTitle(s: SessionLaps): string {
  return s.sessionNumber !== undefined ? `Session ${s.sessionNumber}` : 'Session'
}

function plural(n: number, one: string, many: string): string {
  return `${n} ${n === 1 ? one : many}`
}

function StatCard({ label, ms, caption }: { label: string; ms: number | undefined; caption: string }) {
  return (
    <div className="min-w-0 rounded-2xl border border-gray-200 bg-white p-4" role="group" aria-label={label}>
      <p className="truncate text-[13px] font-semibold text-gray-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold tabular-nums text-gray-900">{ms !== undefined ? formatLapTime(ms) : '—'}</p>
      <p className="mt-1 text-xs text-gray-400">{caption}</p>
    </div>
  )
}

/** How long the skeleton takes to fade out once the laps are in. */
export const SKELETON_FADE_MS = 150

const bar = 'animate-pulse rounded bg-gray-100'

/** Stand-in for the stat cards and a session card while the laps load. */
function Skeleton({ track, leaving, whose }: { track: boolean; leaving: boolean; whose: string }) {
  return (
    <div className={leaving ? 'fade-out' : 'fade-in'} aria-busy="true" aria-label={`Loading ${whose} lap times`}>
      <div className={`mb-5 grid gap-3 ${track ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {(track ? [0, 1] : [0]).map(i => (
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

/**
 * The My notes tab (#210): the driver's own lap times for this event,
 * session by session. Added from the Schedule tab; edited from here too.
 * An admin can pick another driver's instead (#288).
 */
export function MyLapTimes({ event, log, layoutBest, allTimeBest, driver = null, driverPicker, onEdit }: Props) {
  // Sessions whose lap table is open. All closed to start, so the figures
  // for every session fit on screen at once.
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  const runGroups = event.runGroups
  const track = trackShortName(event)
  const allOpen = log.sessions.length > 0 && log.sessions.every(s => open.has(s.key))
  const name = driver ? driverName(driver) : null
  const whose = name ? `${name}’s` : 'your'

  // While the laps load, a skeleton fades in; once they're in, it fades
  // out and the lap times fade in in its place.
  const loading = log.status === 'loading' || log.status === 'off'
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

  function toggle(key: string) {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const header = (<>
    {driverPicker && <div className="mb-4 px-1">{driverPicker}</div>}
    <div className="mb-3 flex min-h-[20px] items-center justify-between gap-3 px-1 text-xs text-gray-500">
      {log.status === 'ready' && log.sessions.length > 0 ? (
        <button
          onClick={() => setOpen(allOpen ? new Set() : new Set(log.sessions.map(s => s.key)))}
          className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-800"
        >
          {allOpen
            ? <ChevronsDownUp size={14} aria-hidden="true" />
            : <ChevronsUpDown size={14} aria-hidden="true" />}
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      ) : <span />}
      <span
        className="flex shrink-0 items-center gap-1"
        title={name ? `Only ${name} and admins can see these lap times` : 'Only you and admins can see your lap times'}
      >
        <Lock size={12} className="text-red-500" aria-hidden="true" /> Private
      </span>
    </div>
  </>)

  if (loading || leaving) {
    return <>{header}<Skeleton track={!!track} leaving={leaving} whose={whose} /></>
  }

  if (log.status === 'error') {
    return (
      <>
        {header}
        <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-700">Couldn’t load {whose} lap times</p>
          <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
          <button
            onClick={log.reload}
            className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
          >
            Try again
          </button>
        </div>
      </>
    )
  }

  if (log.sessions.length === 0) {
    return (
      <>
        {header}
        <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <Timer size={20} className="mx-auto text-gray-400" aria-hidden="true" />
          <p className="mt-2 text-sm font-medium text-gray-700">No lap times yet</p>
          <p className="mt-1 text-xs text-gray-400">
            {name
              ? `On the Schedule tab, tap a session ${name} drove to add their laps.`
              : 'On the Schedule tab, tap a session you drove to add your laps.'}
          </p>
        </div>
      </>
    )
  }

  const days = new Set(log.sessions.map(s => s.date))
  // One set of columns for every session's table, so they line up.
  const columns = lapColumns(log.sessions.flatMap(s => s.laps))

  return (
    <>
      {header}
      <div className="fade-in">
        <div className={`mb-5 grid gap-3 ${track ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <StatCard
            label="Best lap this event"
            ms={eventBest(log.sessions)}
            caption={`Across ${plural(log.sessions.length, 'recorded session', 'recorded sessions')}`}
          />
          {track && (
            <StatCard
              label="All time best"
              ms={layoutBest.best}
              caption={`Across ${plural(layoutBest.events, 'event', 'events')} at this track config`}
            />
          )}
        </div>
        <div className="flex flex-col gap-5">
          {log.sessions.map(session => {
            const expanded = open.has(session.key)
            const tableId = `laps-${session.key.replace(/[^a-z0-9]+/gi, '-')}`
            return (
              <section key={session.key} aria-label={`${sessionTitle(session)}, ${formatTime(session.time)} ${formatAmPm(session.time)}`}>
                <h3 className="mb-1.5 px-1 text-xs font-bold uppercase tracking-widest text-gray-400">
                  {sessionTitle(session)}
                  {days.size > 1 && <span className="ml-2 font-medium normal-case tracking-normal">{shortDate(session.date)}</span>}
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
                    <div className="flex items-center justify-between gap-3">
                      <p className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Timer size={13} aria-hidden="true" /> Lap times
                      </p>
                      <button
                        onClick={() => onEdit(session)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        aria-label={`Edit lap times for ${sessionTitle(session)}`}
                      >
                        Edit
                      </button>
                    </div>
                    {/* The whole row opens the table: the chevron's button stretches over it. */}
                    <div className="relative flex items-center gap-2">
                      <LapFigures laps={session.laps} allTimeBest={allTimeBest} />
                      <button
                        onClick={() => toggle(session.key)}
                        aria-expanded={expanded}
                        aria-controls={tableId}
                        aria-label={`${expanded ? 'Hide' : 'Show'} laps for ${sessionTitle(session)}`}
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
          })}
        </div>
      </div>
    </>
  )
}
