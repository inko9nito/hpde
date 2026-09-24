import { useState } from 'react'
import { ChevronRight, Lock, Timer } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { LapFigures, LapTable } from './LapList'
import { groupFor, shortDate } from './LapTimesSheet'
import { useLapSummary } from '../data/lapLog'
import { useEvents } from '../data/EventsContext'
import { formatTime, formatAmPm } from '../utils/time'
import { formatLapTime, lapStats } from '../utils/lapTimes'
import { bestOnLayout, trackShortName } from '../utils/trackStats'
import type { LapLog } from '../data/lapLog'
import type { SessionLaps } from '../utils/lapTimes'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  log: LapLog
  onEdit: (session: SessionLaps) => void
}

function sessionTitle(s: SessionLaps): string {
  return s.sessionNumber !== undefined ? `Session ${s.sessionNumber}` : 'Session'
}

/** The fastest lap of the event. */
function eventBest(sessions: SessionLaps[]): number | undefined {
  const bests = sessions.map(s => lapStats(s.laps).best).filter((ms): ms is number => ms !== undefined)
  return bests.length ? Math.min(...bests) : undefined
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

/**
 * The My notes tab (#210): the driver's own lap times for this event,
 * session by session. Added from the Schedule tab; edited from here too.
 */
export function MyLapTimes({ event, log, onEdit }: Props) {
  const { allEvents } = useEvents()
  const summary = useLapSummary(true)
  // Sessions whose lap table is open. All closed to start, so the figures
  // for every session fit on screen at once.
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  const runGroups = event.runGroups
  const track = trackShortName(event)
  const allOpen = log.sessions.length > 0 && log.sessions.every(s => open.has(s.key))

  function toggle(key: string) {
    setOpen(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const header = (
    <div className="mb-3 flex min-h-[20px] items-center justify-between gap-3 px-1 text-xs text-gray-500">
      {log.sessions.length > 0 ? (
        <button
          onClick={() => setOpen(allOpen ? new Set() : new Set(log.sessions.map(s => s.key)))}
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      ) : <span />}
      <span className="flex shrink-0 items-center gap-1" title="Only you can see your lap times">
        <Lock size={12} className="text-red-500" aria-hidden="true" /> Private
      </span>
    </div>
  )

  if (log.status === 'loading' || log.status === 'off') {
    return <>{header}<div className="h-40 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading your lap times" /></>
  }

  if (log.status === 'error') {
    return (
      <>
        {header}
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-medium text-gray-700">Couldn’t load your lap times</p>
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
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
          <Timer size={20} className="mx-auto text-gray-400" aria-hidden="true" />
          <p className="mt-2 text-sm font-medium text-gray-700">No lap times yet</p>
          <p className="mt-1 text-xs text-gray-400">On the Schedule tab, tap a session you drove to add your laps.</p>
        </div>
      </>
    )
  }

  const best = eventBest(log.sessions)
  const days = new Set(log.sessions.map(s => s.date))
  // Until the summary arrives, this event's best is the best known.
  const layoutBest = bestOnLayout(event, allEvents, summary ?? [], best)

  return (
    <>
      {header}
      <div className={`mb-5 grid gap-3 ${track ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <StatCard
          label="Best lap this event"
          ms={best}
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
                <button
                  onClick={() => onEdit(session)}
                  className="ml-auto text-sm font-medium text-blue-600 hover:text-blue-700"
                  aria-label={`Edit lap times for ${sessionTitle(session)}`}
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-col gap-2 border-t border-gray-100 pt-3">
                <p className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Timer size={13} aria-hidden="true" /> Lap times
                </p>
                {/* The whole row opens the table: the chevron's button stretches over it. */}
                <div className="relative flex items-center gap-2">
                  <LapFigures laps={session.laps} />
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
                {expanded && <div id={tableId}><LapTable laps={session.laps} /></div>}
              </div>
            </div>
          </section>
          )
        })}
      </div>
    </>
  )
}
