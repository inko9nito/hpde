import { useId } from 'react'
import { Check, ChevronDown, FlaskConical, UserRound } from 'lucide-react'
import { TEST_DRIVER, useAuth } from '../auth/AuthContext'
import { Sheet } from './Sheet'
import { driverName, useDrivers } from '../data/drivers'
import type { Driver } from '../data/drivers'

/**
 * Who an admin can act as (#396): themselves ("Me"), the test account
 * (#309), and everyone else who has signed in — including whoever they're
 * acting as, even while the list loads (or if it can't), so a picker never
 * shows someone other than who's picked.
 */
function useChoices(active: boolean): { choices: { driver: Driver | null; label: string }[]; status: ReturnType<typeof useDrivers>['status'] } {
  const { user, actingAs } = useAuth()
  const drivers = useDrivers(active)
  const others = drivers.drivers.filter(d => d.id !== user?.id && d.id !== TEST_DRIVER.id)
  if (actingAs && actingAs.id !== TEST_DRIVER.id && !others.some(d => d.id === actingAs.id)) others.unshift(actingAs)
  return {
    choices: [
      { driver: null, label: 'Me' },
      { driver: TEST_DRIVER, label: driverName(TEST_DRIVER) },
      ...others.map(d => ({ driver: d, label: driverName(d) })),
    ],
    status: drivers.status,
  }
}

/**
 * Admins only (#288): whose lap times the sheet and My notes are showing,
 * as a select — the same choice as Switch driver (#396), so picking one
 * here acts as them everywhere.
 */
export function DriverPicker({ className = '' }: { className?: string }) {
  const id = useId()
  const { actingAs, setActingAs } = useAuth()
  const { choices, status } = useChoices(true)

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label htmlFor={id} className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-500">
        <UserRound size={13} aria-hidden="true" /> Driver
      </label>
      <div className="relative min-w-0">
        <select
          id={id}
          value={actingAs?.id ?? ''}
          onChange={e => setActingAs(choices.find(c => (c.driver?.id ?? '') === e.target.value)?.driver ?? null)}
          className="block h-8 w-full min-w-0 max-w-64 appearance-none truncate rounded-lg border border-gray-200 bg-white pl-2.5 pr-7 text-base text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none sm:text-sm"
        >
          {choices.map(c => (
            <option key={c.driver?.id ?? 'me'} value={c.driver?.id ?? ''}>{c.label}</option>
          ))}
          {status === 'loading' && <option disabled>Loading drivers…</option>}
          {status === 'error' && <option disabled>Couldn’t load drivers</option>}
        </select>
        <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  )
}

/**
 * Admins only: Switch driver (#362, #396), from the menu or an event's "…"
 * menu — who to act as, everywhere, until they switch back: themselves
 * ("Me"), the test account, or another driver, to see their laps, notes,
 * answers and garage and to log them for them. Picking one closes it.
 */
export function SwitchDriverSheet({ onClose }: { onClose: () => void }) {
  const { actingAs, setActingAs } = useAuth()
  const { choices, status } = useChoices(true)

  return (
    <Sheet
      label="Switch driver"
      onClose={onClose}
      data-switch-driver-sheet
      heading={<h2 className="text-lg font-bold text-gray-900">Switch driver</h2>}
    >
      <p className="mt-1 text-sm text-gray-500">Whose laps, notes and events to show everywhere, and to log as.</p>
      <ul role="radiogroup" aria-label="Driver" className="mt-4 flex flex-col gap-2">
        {choices.map(({ driver, label }) => {
          const on = (actingAs?.id ?? null) === (driver?.id ?? null)
          const Icon = driver?.id === TEST_DRIVER.id ? FlaskConical : UserRound
          return (
            <li key={driver?.id ?? 'me'}>
              <button
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setActingAs(driver)
                  onClose()
                }}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${on ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <Icon size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">{label}</span>
                {on && <Check size={16} strokeWidth={2.5} className="shrink-0 text-gray-900" aria-hidden="true" />}
              </button>
            </li>
          )
        })}
      </ul>
      {status === 'loading' && <p className="mt-3 text-sm text-gray-400" aria-busy="true">Loading drivers…</p>}
      {status === 'error' && <p role="alert" className="mt-3 text-sm text-red-700">Couldn’t load drivers. Check your connection and try again.</p>}
    </Sheet>
  )
}
