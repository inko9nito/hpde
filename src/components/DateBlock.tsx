import { firstDate } from '../utils/eventClass'
import { todayLocalISO } from '../utils/time'
import type { EventConfig } from '../types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** Month + day-of-month tile on the left of a card. A multi-day event
 *  shows only its first day (#243). The year goes under the day, only
 *  when it isn't this year (#266). `dark` is for the featured card's
 *  near-black background (#276). `lg` is the event page header's big
 *  date (#305), and `sm` its collapsed copy in the top bar. */
export function DateBlock({ event, muted, dark = false, size = 'md' }: {
  event: EventConfig
  muted: boolean
  dark?: boolean
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = DATE_BLOCK_SIZES[size]
  if (event.days.length === 0) return <div className={`${sizes.box} shrink-0`} />
  const [y, m, d] = firstDate(event).split('-').map(Number)
  const thisYear = Number(todayLocalISO().slice(0, 4))
  const monthColor = muted ? 'text-gray-500' : dark ? 'text-red-400' : 'text-red-600'
  return (
    <div className={`flex ${sizes.box} shrink-0 flex-col items-center font-rubik leading-none`}>
      <span className={`${sizes.month} font-medium uppercase tracking-wider ${monthColor}`}>
        {MONTHS[m - 1]}
      </span>
      <span className={`${sizes.day} font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{d}</span>
      {sizes.year && y !== thisYear && (
        <span className={`${sizes.year} font-normal tracking-wider ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
          {y}
        </span>
      )}
    </div>
  )
}

const DATE_BLOCK_SIZES = {
  sm: { box: 'w-8', month: 'text-[9px]', day: 'mt-0.5 text-lg', year: '' },
  md: { box: 'w-10', month: 'text-[11px]', day: 'mt-1 text-2xl', year: 'mt-0.5 text-[11px]' },
  lg: { box: 'w-14', month: 'text-[13px]', day: 'mt-1 text-[34px]', year: 'mt-0.5 text-xs' },
}
