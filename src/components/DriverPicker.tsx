import { useId } from 'react'
import { ChevronDown, UserRound } from 'lucide-react'
import { driverName } from '../data/drivers'
import type { Driver, DriversStatus } from '../data/drivers'

interface Props {
  /** Whose laps are showing: another driver, or null for your own. */
  driver: Driver | null
  onChange: (driver: Driver | null) => void
  drivers: { status: DriversStatus; drivers: Driver[] }
  /** The signed-in admin, left out of the list: they're "Me". */
  selfId: string
  className?: string
}

/**
 * Admins only (#288): whose lap times the sheet and My notes are showing —
 * your own ("Me"), or another driver's, to log them for them.
 */
export function DriverPicker({ driver, onChange, drivers, selfId, className = '' }: Props) {
  const id = useId()
  const others = drivers.drivers.filter(d => d.id !== selfId)
  // Still listed while the list loads (or if it can't), so the picker
  // never shows someone other than who's picked.
  if (driver && !others.some(d => d.id === driver.id)) others.unshift(driver)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor={id} className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-500">
        <UserRound size={13} aria-hidden="true" /> Driver
      </label>
      <div className="relative min-w-0">
        <select
          id={id}
          value={driver?.id ?? ''}
          onChange={e => onChange(others.find(d => d.id === e.target.value) ?? null)}
          className="block h-8 w-full min-w-0 max-w-64 appearance-none truncate rounded-lg border border-gray-200 bg-white pl-2.5 pr-7 text-base text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none sm:text-sm"
        >
          <option value="">Me</option>
          {others.map(d => (
            <option key={d.id} value={d.id}>{driverName(d)}</option>
          ))}
          {drivers.status === 'loading' && <option disabled>Loading drivers…</option>}
          {drivers.status === 'error' && <option disabled>Couldn’t load drivers</option>}
        </select>
        <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}
