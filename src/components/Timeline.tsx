import { useRef, useEffect, useState } from 'react'
import { SessionCard } from './SessionCard'
import { EventCard } from './EventCard'
import { TimeIndicator } from './TimeIndicator'
import { parseMinutes, nowMinutes, isCurrent } from '../utils/time'
import type { ScheduleEvent, RunGroupConfig } from '../types'

interface Props {
  events: ScheduleEvent[]
  runGroups: RunGroupConfig[]
  isToday: boolean
  selectedGroups: string[]
  hidePast: boolean
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
    // Breaks and general events always show
    if (event.type !== 'session') return [event]
    // Sessions: filter by selected groups
    if (selectedGroups.length === 0) return [event]

    const onTrack = event.onTrack.filter(id => selectedGroups.includes(id))
    const inClass = (event.inClass ?? []).filter(id => selectedGroups.includes(id))
    if (onTrack.length === 0 && inClass.length === 0) return []
    return [{ ...event, onTrack, inClass }]
  })

  // Breaks have no time; keep them unless they'd be orphaned at the top of the list
  const withoutPast = hidePast && isToday
    ? visible.filter(e => e.type === 'break' || parseMinutes(e.time) >= now)
    : visible
  const filtered = withoutPast.filter((e, idx) => {
    if (e.type !== 'break') return true
    return withoutPast.slice(0, idx).some(prev => prev.type !== 'break')
  })

  // A "current" event is one whose start is within CURRENT_WINDOW_MIN of
  // now. When present, the now-indicator overlays that card instead of
  // sitting between cards, and the card stays at full opacity.
  const currentIndex = isToday
    ? filtered.findIndex(e => e.type !== 'break' && isCurrent(parseMinutes(e.time), now))
    : -1
  const indicatorIndex = currentIndex === -1 && isToday
    ? filtered.findIndex(e => e.type !== 'break' && parseMinutes(e.time) > now)
    : -1
  const indicatorAtEnd = isToday && currentIndex === -1 && indicatorIndex === -1 && filtered.length > 0

  let lastSessionNumber: number | undefined = undefined

  return (
    <div className="flex flex-col gap-2 pb-10">
      {filtered.map((event, idx) => {
        const isCurrentEvent = idx === currentIndex
        const past = isToday
          && event.type !== 'break'
          && !isCurrentEvent
          && parseMinutes(event.time) < now

        let sessionHeader: React.ReactNode = null
        if (event.type === 'session' && event.sessionNumber !== undefined && event.sessionNumber !== lastSessionNumber) {
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
          <div key={idx} className={isCurrentEvent ? 'relative' : undefined}>
            {idx === indicatorIndex && <TimeIndicator ref={indicatorRef} events={filtered} />}
            {sessionHeader}
            {card}
            {isCurrentEvent && <TimeIndicator ref={indicatorRef} events={filtered} overlay />}
          </div>
        )
      })}
      {indicatorAtEnd && <TimeIndicator ref={indicatorRef} events={filtered} />}
    </div>
  )
}
