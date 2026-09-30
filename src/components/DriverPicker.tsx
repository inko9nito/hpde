import { useId } from 'react'
import { Check, ChevronDown, UserRound } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { Sheet } from './Sheet'
import { driverName } from '../data/drivers'
import type { Driver, DriversStatus } from '../data/drivers'

/**
 * Everyone but the signed-in admin — and whoever's picked, even while the
 * list loads (or if it can't), so a picker never shows someone other than
 * who's picked.
 */
function otherDrivers(driver: Driver | null, drivers: { drivers: Driver[] }, selfId: string): Driver[] {
  const others = drivers.drivers.filter(d => d.id !== selfId)
  if (driver && !others.some(d => d.id === driver.id)) others.unshift(driver)
  return others
}

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
  // On the test account (#309), "Me" is it.
  const { testAccount } = useAuth()
  const others = otherDrivers(driver, drivers, selfId)

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
          <option value="">{testAccount ? 'Test account' : 'Me'}</option>
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

/**
 * Admins only (#362): Switch driver, from the event's "…" menu — whose
 * lap times and notes the event's page shows: your own ("Me"), or another
 * driver's, to log them for them. Picking one closes it.
 */
export function SwitchDriverSheet({ driver, onChange, drivers, selfId, onClose }: Omit<Props, 'className'> & { onClose: () => void }) {
  const { testAccount } = useAuth()
  const others = otherDrivers(driver, drivers, selfId)
  const choices: { id: string; label: string; pick: Driver | null }[] = [
    { id: '', label: testAccount ? 'Test account' : 'Me', pick: null },
    ...others.map(d => ({ id: d.id, label: driverName(d), pick: d })),
  ]

  return (
    <Sheet
      label="Switch driver"
      onClose={onClose}
      data-switch-driver-sheet
      heading={<h2 className="text-lg font-bold text-gray-900">Switch driver</h2>}
    >
      <p className="mt-1 text-sm text-gray-500">Whose lap times and notes to show, and to log.</p>
      <ul role="radiogroup" aria-label="Driver" className="mt-4 flex flex-col gap-2">
        {choices.map(({ id, label, pick }) => {
          const on = (driver?.id ?? '') === id
          return (
            <li key={id || 'me'}>
              <button
                role="radio"
                aria-checked={on}
                onClick={() => {
                  onChange(pick)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${on ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <UserRound size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">{label}</span>
                {on && <Check size={16} strokeWidth={2.5} className="shrink-0 text-gray-900" aria-hidden="true" />}
              </button>
            </li>
          )
        })}
      </ul>
      {drivers.status === 'loading' && <p className="mt-3 text-sm text-gray-400" aria-busy="true">Loading drivers…</p>}
      {drivers.status === 'error' && <p role="alert" className="mt-3 text-sm text-red-700">Couldn’t load drivers. Check your connection and try again.</p>}
    </Sheet>
  )
}
