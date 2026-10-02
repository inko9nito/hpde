import { firstDate } from '../utils/eventClass'
import { todayLocalISO } from '../utils/time'
import type { EventConfig } from '../types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** An event's first day as its month ("Sep"), day of the month and year,
 *  or null with no days. */
export function firstDayParts(event: EventConfig): { month: string; day: number; year: number } | null {
  if (event.days.length === 0) return null
  const [year, m, day] = firstDate(event).split('-').map(Number)
  return { month: MONTHS[m - 1], day, year }
}

/** Month + day-of-month tile on the left of a card. A multi-day event
 *  shows only its first day (#243). The year goes under the day, only
 *  when it isn't this year (#266). `dark` is for the featured card's
 *  near-black background (#276). `lg` is the event page header's big
 *  date (#305). */
export function DateBlock({ event, muted, dark = false, size = 'md' }: {
  event: EventConfig
  muted: boolean
  dark?: boolean
  size?: 'md' | 'lg'
}) {
  const sizes = DATE_BLOCK_SIZES[size]
  const parts = firstDayParts(event)
  if (!parts) return <div className={`${sizes.box} shrink-0`} />
  const { month, day, year } = parts
  const thisYear = Number(todayLocalISO().slice(0, 4))
  const monthColor = muted ? 'text-gray-500' : dark ? 'text-red-400' : 'text-red-600'
  return (
    <div className={`flex ${sizes.box} shrink-0 flex-col items-center font-rubik leading-none`}>
      <span className={`${sizes.month} font-medium uppercase tracking-wider ${monthColor}`}>
        {month}
      </span>
      <span className={`${sizes.day} font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{day}</span>
      {year !== thisYear && (
        <span className={`${sizes.year} font-normal tracking-wider ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          {year}
        </span>
      )}
    </div>
  )
}

const DATE_BLOCK_SIZES = {
  md: { box: 'w-10', month: 'text-[11px]', day: 'mt-1 text-2xl', year: 'mt-0.5 text-[11px]' },
  lg: { box: 'w-14', month: 'text-[13px]', day: 'mt-1 text-[34px]', year: 'mt-0.5 text-xs' },
}
