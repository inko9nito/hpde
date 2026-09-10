import { useEffect, useState, forwardRef } from 'react'
import { nowDisplay, nowMinutes, parseMinutes, formatCountdown } from '../utils/time'
import type { ScheduleEvent } from '../types'

interface Props {
  events: ScheduleEvent[]
  /** When true, style as an overlay layered over the current event card. */
  overlay?: boolean
  /**
   * With overlay=true, position the line vertically at this percentage
   * from the top of the parent card (0 = top, 100 = bottom).
   */
  overlayTopPct?: number
}

export const TimeIndicator = forwardRef<HTMLDivElement, Props>(
  ({ events, overlay, overlayTopPct = 0 }, ref) => {
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

    const wrapperClass = overlay
      ? 'absolute inset-x-0 pointer-events-none z-10 -translate-y-1/2'
      : 'relative my-6'
    const wrapperStyle = overlay ? { top: `${overlayTopPct}%` } : undefined

    // In overlay mode, the labels above the line can spill outside the
    // parent card near the top edge. Flip them below when the line is
    // near the top so they stay inside the card.
    const labelBelow = overlay && overlayTopPct < 15
    const labelYClass = labelBelow ? 'top-1' : '-top-5'

    return (
      <div ref={ref} data-time-indicator className={wrapperClass} style={wrapperStyle}>
        <div className="flex items-center -mr-3 sm:-mr-4">
          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
          <div className="h-0.5 flex-1 bg-blue-500" />
        </div>
        <span className={`absolute left-4 font-mono text-xs font-semibold text-blue-500 ${labelYClass}`}>
          {nowDisplay()}
        </span>
        {minsUntilNext !== null && (
          <span className={`absolute right-0 text-xs ${labelYClass} ${urgencyClass}`}>
            Next event starts in <span className="font-semibold">{formatCountdown(minsUntilNext)}</span>
          </span>
        )}
      </div>
    )
  }
)

TimeIndicator.displayName = 'TimeIndicator'
