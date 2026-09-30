import { useState } from 'react'
import { Car as CarIcon, Lock, Plus } from 'lucide-react'
import { HomeHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { CarSheet } from './CarSheet'
import { CarRow } from './CarRow'
import { carHash } from './CarPage'
import { useAuth } from '../auth/AuthContext'
import { useGarage } from '../data/GarageContext'
import { MAX_CARS, carEvents, carName, formatDay, eventStart } from '../utils/garage'
import type { Car, Garage } from '../utils/garage'
import type { EventConfig } from '../types'

/** "Last at Alpha Track Day · Mar 7, 2026": the car's latest event, under its name. */
function lastSeen(car: Car, garage: Garage, events: EventConfig[]): string {
  const [last] = carEvents(car.id, garage, events)
  return last ? `Last at ${last.name} · ${formatDay(eventStart(last))}` : 'No events yet'
}

/**
 * The Garage tab (#344): the driver's cars, one line each — what it's
 * called and the last event it went to — each opening its page, where its
 * details, consumables and their change log are.
 */
export function GarageTab({ events, onToast }: {
  /** Every event, to find a car's last. */
  events: EventConfig[]
  onToast: (text: string) => void
}) {
  const { status: authStatus } = useAuth()
  const garage = useGarage()
  const [adding, setAdding] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="Garage" />
        {authStatus !== 'signed-in' ? (
          <SignInPrompt reason="keep your cars and what they run on" />
        ) : garage.status === 'loading' || garage.status === 'off' ? (
          <div className="fade-in flex flex-col gap-3" aria-busy="true" aria-label="Loading your garage">
            <div className="h-[74px] animate-pulse rounded-2xl border border-gray-200 bg-white" />
          </div>
        ) : garage.status === 'error' ? (
          <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-sm font-medium text-gray-700">Couldn’t load your garage</p>
            <p className="mt-1 text-xs text-gray-400">Check your connection and try again.</p>
            <button
              onClick={garage.reload}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Try again
            </button>
          </div>
        ) : garage.cars.length === 0 ? (
          <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
            <CarIcon size={22} className="mx-auto text-gray-400" aria-hidden="true" />
            <p className="mt-2 text-sm font-medium text-gray-700">No cars yet</p>
            <button
              onClick={() => setAdding(true)}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Add a car
            </button>
          </div>
        ) : (
          <div className="fade-in flex flex-col gap-3">
            <p className="-mb-1 flex items-center justify-end gap-1 px-1 text-xs text-gray-500" title="Only you and admins can see your garage">
              <Lock size={12} className="text-red-500" aria-hidden="true" /> Private
            </p>
            <ul className="flex flex-col gap-3" aria-label="Cars">
              {garage.cars.map(car => (
                <li key={car.id}>
                  <CarRow car={car} title={carName(car)} subtitle={lastSeen(car, garage, events)} href={carHash(car.id)} />
                </li>
              ))}
            </ul>
            {garage.cars.length < MAX_CARS && (
              <button
                onClick={() => setAdding(true)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Plus size={16} aria-hidden="true" />
                Add a car
              </button>
            )}
          </div>
        )}
      </div>
      {adding && (
        <CarSheet
          onSave={async car => {
            await garage.saveCar(car)
            setAdding(false)
            onToast('Car added')
          }}
          onClose={() => setAdding(false)}
        />
      )}
    </div>
  )
}
