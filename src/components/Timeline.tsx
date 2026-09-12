import { useRef, useEffect, useState } from 'react'
import { SessionCard } from './SessionCard'
import { EventCard } from './EventCard'
import { TimeIndicator } from './TimeIndicator'
import { parseMinutes, nowMinutes, findCurrentEvent } from '../utils/time'
import type { ScheduleEvent, RunGroupConfig } from '../types'

interface Props {
  events: ScheduleEvent[]
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

export function Timeline({ events, runGroups, isToday, selectedGroups, hidePast }: Props) {
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

  const visible = events.flatMap<ScheduleEvent>(event => {
    if (event.type !== 'session') return [event]
    if (selectedGroups.length === 0) return [event]

    const onTrack = event.onTrack.filter(id => selectedGroups.includes(id))
    const inClass = (event.inClass ?? []).filter(id => selectedGroups.includes(id))
    if (onTrack.length === 0 && inClass.length === 0) return []
    return [{ ...event, onTrack, inClass }]
  })

  // Timed events collapse once they're in the past and hidePast is on.
  // A break only collapses once every event before it has collapsed too
  // (or there simply isn't one) — otherwise it'd be left dangling above
  // whatever's now the first visible card.
  const collapsed = visible.map(e => e.type !== 'break' && hidePast && isToday && parseMinutes(e.time) < now)
  visible.forEach((e, idx) => {
    if (e.type !== 'break') return
    const hasVisiblePrior = visible.slice(0, idx).some((prev, i) => prev.type !== 'break' && !collapsed[i])
    collapsed[idx] = !hasVisiblePrior
  })

  const timedIndices: number[] = []
  const timedTimes: string[] = []
  visible.forEach((e, i) => {
    if (e.type !== 'break') {
      timedIndices.push(i)
      timedTimes.push((e as { time: string }).time)
    }
  })
  const { index: currentTimedIdx } = isToday
    ? findCurrentEvent(timedTimes, now)
    : { index: -1 }
  const currentIdx = currentTimedIdx === -1 ? -1 : timedIndices[currentTimedIdx]

  const indicatorIndex = isToday
    ? visible.findIndex(e => e.type !== 'break' && parseMinutes(e.time) > now)
    : -1
  const indicatorAtEnd = isToday && indicatorIndex === -1 && visible.length > 0

  const allCollapsed = visible.length > 0 && collapsed.every(Boolean)

  let lastSessionNumber: number | undefined = undefined

  return (
    <div className="flex flex-col pb-10">
      {visible.length > 0 && (
        <Collapse collapsed={!allCollapsed}>
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">That's a wrap for today</p>
            <p className="text-xs text-gray-400">Every event on today's schedule has already happened.</p>
          </div>
        </Collapse>
      )}
      {visible.map((event, idx) => {
        const isCurrentEvent = idx === currentIdx
        const past = isToday
          && event.type !== 'break'
          && !isCurrentEvent
          && parseMinutes(event.time) < now

        let sessionHeader: React.ReactNode = null
        if (!collapsed[idx] && event.type === 'session' && event.sessionNumber !== undefined && event.sessionNumber !== lastSessionNumber) {
          lastSessionNumber = event.sessionNumber
          sessionHeader = (
            <div className="mt-5 mb-1 text-xs font-bold uppercase tracking-widest text-gray-400">
              Session {event.sessionNumber}
            </div>
          )
        }

        const card = event.type === 'break'
          ? (
            <div className="flex items-center gap-2 py-1">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400 italic">{event.label}</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
          )
          : event.type === 'session'
            ? <SessionCard event={event} runGroups={runGroups} past={past} />
            : <EventCard event={event} past={past} />

        return (
          <Collapse key={idx} collapsed={collapsed[idx]}>
            {idx === indicatorIndex && <TimeIndicator ref={indicatorRef} events={visible} />}
            {sessionHeader}
            {card}
          </Collapse>
        )
      })}
      {indicatorAtEnd && <TimeIndicator ref={indicatorRef} events={visible} />}
    </div>
  )
}
