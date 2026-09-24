import { Lock, Timer } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { LapChips, LapDetails, LapStatsLine } from './LapList'
import { groupFor, shortDate } from './LapTimesSheet'
import { formatTime, formatAmPm } from '../utils/time'
import { formatLapTime, lapStats } from '../utils/lapTimes'
import type { LapLog } from '../data/lapLog'
import type { SessionLaps } from '../utils/lapTimes'
import type { RunGroupConfig } from '../types'

interface Props {
  log: LapLog
  runGroups: RunGroupConfig[]
  onEdit: (session: SessionLaps) => void
}

function sessionTitle(s: SessionLaps): string {
  return s.sessionNumber !== undefined ? `Session ${s.sessionNumber}` : 'Session'
}

/** The fastest lap of the event, and which session it was in. */
function eventBest(sessions: SessionLaps[]): { ms: number; session: SessionLaps } | null {
  let best: { ms: number; session: SessionLaps } | null = null
  for (const session of sessions) {
    const { best: ms } = lapStats(session.laps)
    if (ms !== undefined && (!best || ms < best.ms)) best = { ms, session }
  }
  return best
}

/**
 * The My notes tab (#210): the driver's own lap times for this event,
 * session by session. Added from the Schedule tab; edited from here too.
 */
export function MyLapTimes({ log, runGroups, onEdit }: Props) {
  const header = (
    <div className="mb-3 flex items-center justify-between px-1 text-xs text-gray-500">
      <span>Only visible to you</span>
      <span className="flex items-center gap-1"><Lock size={12} aria-hidden="true" /> Private</span>
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

  return (
    <>
      {header}
      {best && (
        <p className="mb-4 px-1 text-sm text-gray-700">
          Best lap <span className="font-mono font-semibold tabular-nums text-gray-900">{formatLapTime(best.ms)}</span>
          <span className="text-gray-500"> · {sessionTitle(best.session)}</span>
        </p>
      )}
      <div className="flex flex-col gap-5">
        {log.sessions.map(session => (
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
                <LapChips laps={session.laps} />
                <LapStatsLine laps={session.laps} />
                <LapDetails laps={session.laps} />
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
