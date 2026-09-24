import { useRef, useEffect, useState } from 'react'
import { SessionCard } from './SessionCard'
import { ActivityCard } from './ActivityCard'
import { TimeIndicator } from './TimeIndicator'
import { parseMinutes, nowMinutes, findCurrentActivity } from '../utils/time'
import type { ScheduleActivity, RunGroupConfig } from '../types'
import noFutureEventsArt from '../assets/no-future-events.svg'

interface Props {
  activities: ScheduleActivity[]
  runGroups: RunGroupConfig[]
  isToday: boolean
  selectedGroups: string[]
  hidePast: boolean
}

// Animates an item sliding away instead of vanishing instantly. Stays
// mounted while collapsed so the transition has something to animate —
// the grid-template-rows 1fr/0fr trick collapses height without knowing
// the content's natural height up front.
function Collapse({ collapsed, children }: { collapsed: boolean; children: React.ReactNode }) {
  return (
    <div
      data-collapsed={collapsed}
      aria-hidden={collapsed}
      className="grid transition-[grid-template-rows,opacity,margin-bottom] duration-300 ease-in-out"
      style={{ gridTemplateRows: collapsed ? '0fr' : '1fr', opacity: collapsed ? 0 : 1, marginBottom: collapsed ? 0 : '0.5rem' }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

export function Timeline({ activities, runGroups, isToday, selectedGroups, hidePast }: Props) {
  const indicatorRef = useRef<HTMLDivElement>(null)
  const [, setTick] = useState(0)

  useEffect(() => {
    if (!isToday) return
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [isToday])

  useEffect(() => {
    if (!isToday) return
    const timeout = setTimeout(() => {
      indicatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 150)
    return () => clearTimeout(timeout)
  }, [isToday])

  const now = nowMinutes()

  const visible = activities.flatMap<ScheduleActivity>(activity => {
    if (activity.type !== 'session') return [activity]
    if (selectedGroups.length === 0) return [activity]

    const onTrack = activity.onTrack.filter(id => selectedGroups.includes(id))
    const inClass = (activity.inClass ?? []).filter(id => selectedGroups.includes(id))
    if (onTrack.length === 0 && inClass.length === 0) return []
    return [{ ...activity, onTrack, inClass }]
  })

  // Timed activities collapse once they're in the past and hidePast is on.
  // A break only collapses once every activity before it has collapsed too
  // (or there simply isn't one) — otherwise it'd be left dangling above
  // whatever's now the first visible card.
  const collapsed = visible.map(a => a.type !== 'break' && hidePast && isToday && parseMinutes(a.time) < now)
  visible.forEach((a, idx) => {
    if (a.type !== 'break') return
    const hasVisiblePrior = visible.slice(0, idx).some((prev, i) => prev.type !== 'break' && !collapsed[i])
    collapsed[idx] = !hasVisiblePrior
  })

  const timedIndices: number[] = []
  const timedTimes: string[] = []
  visible.forEach((a, i) => {
    if (a.type !== 'break') {
      timedIndices.push(i)
      timedTimes.push((a as { time: string }).time)
    }
  })
  const { index: currentTimedIdx } = isToday
    ? findCurrentActivity(timedTimes, now)
    : { index: -1 }
  const currentIdx = currentTimedIdx === -1 ? -1 : timedIndices[currentTimedIdx]

  const indicatorIndex = isToday
    ? visible.findIndex(a => a.type !== 'break' && parseMinutes(a.time) > now)
    : -1
  const indicatorAtEnd = isToday && indicatorIndex === -1 && visible.length > 0

  const allCollapsed = visible.length > 0 && collapsed.every(Boolean)

  let lastSessionNumber: number | undefined = undefined

  return (
    <div className="flex flex-col pb-10">
      {visible.length > 0 && (
        <Collapse collapsed={!allCollapsed}>
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 pt-6 pb-10 text-center shadow-sm">
            <img src={noFutureEventsArt} alt="" className="mb-2 w-48" />
            <p className="text-sm font-medium text-gray-700">No more events today</p>
            <p className="text-xs text-gray-400">Everything on today’s schedule has already happened. Turn off “Hide past activities” to see it.</p>
          </div>
        </Collapse>
      )}
      {visible.map((activity, idx) => {
        const isCurrentActivity = idx === currentIdx
        const past = isToday
          && activity.type !== 'break'
          && !isCurrentActivity
          && parseMinutes(activity.time) < now

        let sessionHeader: React.ReactNode = null
        if (!collapsed[idx] && activity.type === 'session' && activity.sessionNumber !== undefined && activity.sessionNumber !== lastSessionNumber) {
          lastSessionNumber = activity.sessionNumber
          sessionHeader = (
            <div className="mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
              Session {activity.sessionNumber}
            </div>
          )
        }

        const card = activity.type === 'break'
          ? (
            <div className="flex items-center gap-2 py-1">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400 italic">{activity.label}</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          )
          : activity.type === 'session'
            ? <SessionCard activity={activity} runGroups={runGroups} past={past} />
            : <ActivityCard activity={activity} past={past} />

        return (
          <Collapse key={idx} collapsed={collapsed[idx]}>
            {idx === indicatorIndex && <TimeIndicator ref={indicatorRef} activities={visible} />}
            {sessionHeader}
            {card}
          </Collapse>
        )
      })}
      {indicatorAtEnd && <TimeIndicator ref={indicatorRef} activities={visible} />}
    </div>
  )
}
