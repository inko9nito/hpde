import { useEffect, useState, forwardRef } from 'react'
import { nowDisplay, nowMinutes, parseMinutes, formatCountdown } from '../utils/time'
import type { ScheduleEvent } from '../types'

interface Props {
  events: ScheduleEvent[]
}

export const TimeIndicator = forwardRef<HTMLDivElement, Props>(({ events }, ref) => {
  const [, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 30000)
    return () => clearInterval(id)
  }, [])

  const now = nowMinutes()
  const timed = events.filter((e): e is Extract<ScheduleEvent, { time: string }> => 'time' in e)
  const nextEvent = timed.find(e => parseMinutes(e.time) > now)
  const minsUntilNext = nextEvent ? parseMinutes(nextEvent.time) - now : null

  const urgencyClass = minsUntilNext !== null
    ? minsUntilNext <= 5  ? 'text-red-500'
    : minsUntilNext <= 10 ? 'text-orange-500'
    : 'text-gray-400'
    : 'text-gray-400'

  return (
    <div ref={ref} data-time-indicator className="relative my-6">
      <div className="flex items-center -mr-3 sm:-mr-4">
        <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
        <div className="h-0.5 flex-1 bg-blue-500" />
      </div>
      <span className="absolute left-4 -top-5 font-mono text-xs font-semibold text-blue-500">
        {nowDisplay()}
      </span>
      {minsUntilNext !== null && (
        <span className={`absolute right-0 -top-5 text-xs ${urgencyClass}`}>
          Next event starts in <span className="font-semibold">{formatCountdown(minsUntilNext)}</span>
        </span>
      )}
    </div>
  )
})

TimeIndicator.displayName = 'TimeIndicator'
