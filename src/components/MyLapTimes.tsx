import type { ReactNode } from 'react'
import { Timer } from 'lucide-react'
import { lapColumns } from './LapList'
import { LapsSkeleton, LapsToolbar, SessionLapsCard, StatCard, plural, sessionTitle, useOpenSessions, useSkeletonFade } from './LapSessions'
import { LapTrendChart, withTopSpeed } from './LapTrendChart'
import type { TrendPoint } from './LapTrendChart'
import { groupFor, shortDate } from './LapTimesSheet'
import { eventBest, trackShortName } from '../utils/trackStats'
import { formatAverage, lapSpeeds, lapStats } from '../utils/lapTimes'
import { formatTime, formatAmPm } from '../utils/time'
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
  /** The layout's track page (#274), which the All time best card opens. */
  track?: { name: string; href: string }
  /** Whose laps: another driver's, for an admin logging them (#288); null for your own. */
  driver?: Driver | null
  /** Admins only: the Driver picker, above the laps (#288). */
  driverPicker?: ReactNode
  onEdit: (session: SessionLaps) => void
}

/**
 * The My notes tab (#210): the driver's own lap times for this event,
 * session by session. Added from the Schedule tab; edited from here too.
 * An admin can pick another driver's instead (#288).
 */
export function MyLapTimes({ event, log, layoutBest, allTimeBest, track: trackPage, driver = null, driverPicker, onEdit }: Props) {
  const { open, setOpen, toggle } = useOpenSessions()
  const runGroups = event.runGroups
  const track = trackShortName(event)
  const name = driver ? driverName(driver) : null
  const whose = name ? `${name}’s` : 'your'

  const loading = log.status === 'loading' || log.status === 'off'
  const leaving = useSkeletonFade(loading)

  const header = (<>
    {driverPicker && <div className="mb-4 px-1">{driverPicker}</div>}
    <LapsToolbar
      keys={log.status === 'ready' ? log.sessions.map(s => s.key) : []}
      open={open}
      onOpen={setOpen}
      whose={name}
    />
  </>)

  if (loading || leaving) {
    return <>{header}<LapsSkeleton cards={track ? 2 : 1} leaving={leaving} label={`Loading ${whose} lap times`} /></>
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
  // Each session's best and average, in schedule order, for the chart (#274).
  const trend = log.sessions.flatMap((s): TrendPoint[] => {
    const { best, average } = lapStats(s.laps)
    if (best === undefined || average === undefined) return []
    const day = days.size > 1 ? shortDate(s.date) : undefined
    return [{
      key: s.key,
      tick: s.sessionNumber !== undefined ? `S${s.sessionNumber}` : formatTime(s.time),
      tickGroup: day,
      title: sessionTitle(s),
      subtitle: [`${formatTime(s.time)} ${formatAmPm(s.time)}`, groupFor(s.group, runGroups).label, day].filter(Boolean).join(' · '),
      best, average, averageText: formatAverage(s.laps, average),
      ...withTopSpeed(lapSpeeds(s.laps).top),
    }]
  })

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
              link={trackPage && {
                href: trackPage.href,
                label: `See all ${name ? `${name}’s` : 'my'} ${trackPage.name} laps`,
              }}
            />
          )}
        </div>
        {trend.length > 0 && (
          <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4">
            <p className="mb-3 text-[13px] font-semibold text-gray-500">Lap times by session</p>
            <LapTrendChart points={trend} label="Best and average lap in each session, in schedule order" noun={['session', 'sessions']} />
          </div>
        )}
        <div className="flex flex-col gap-5">
          {log.sessions.map(session => (
            <SessionLapsCard
              key={session.key}
              session={session}
              runGroups={runGroups}
              showDate={days.size > 1}
              columns={columns}
              allTimeBest={allTimeBest}
              expanded={open.has(session.key)}
              onToggle={() => toggle(session.key)}
              onEdit={() => onEdit(session)}
              tableId={`laps-${session.key.replace(/[^a-z0-9]+/gi, '-')}`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
