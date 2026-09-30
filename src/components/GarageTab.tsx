import { useState } from 'react'
import { Car as CarIcon, ChevronRight, Lock, Plus } from 'lucide-react'
import { HomeHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { CarSheet } from './CarSheet'
import { ConsumableRows, SetupRow } from './EventSetupCard'
import { TrackIcon } from './TrackIcon'
import { useAuth } from '../auth/AuthContext'
import { useGarage } from '../data/GarageContext'
import { MAX_CARS, carEvents, carName, carTitle, lastConsumables } from '../utils/garage'
import type { Car, Garage } from '../utils/garage'
import { formatDateRange } from '../utils/time'
import type { EventConfig } from '../types'

/**
 * The Garage tab (#344): the driver's cars — each with its lug nut torque,
 * the consumables it ran last, and the events it went to, which open on
 * their My notes. A car's added and changed here, or from an event.
 */
export function GarageTab({ events, onOpenEvent, onToast }: {
  /** Every event, to list a car's. */
  events: EventConfig[]
  /** Opens an event a car went to. */
  onOpenEvent: (event: EventConfig) => void
  onToast: (text: string) => void
}) {
  const { status: authStatus } = useAuth()
  const garage = useGarage()
  // The car open in its sheet: one to change, or a new one.
  const [editing, setEditing] = useState<Car | 'new' | null>(null)
  const editingCar = editing === 'new' ? undefined : editing ?? undefined

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="Garage" />
        {authStatus !== 'signed-in' ? (
          <SignInPrompt reason="keep your cars and what they run on" />
        ) : garage.status === 'loading' || garage.status === 'off' ? (
          <div className="fade-in flex flex-col gap-5" aria-busy="true" aria-label="Loading your garage">
            <div className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white" />
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
            <p className="mt-1 text-xs text-gray-400">
              Add your car and its lug nut torque. Then, at each event, its tires, brakes and each session’s tire pressures.
            </p>
            <button
              onClick={() => setEditing('new')}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Add a car
            </button>
          </div>
        ) : (
          <div className="fade-in flex flex-col gap-5">
            <p className="-mb-2 flex items-center justify-end gap-1 px-1 text-xs text-gray-500" title="Only you and admins can see your garage">
              <Lock size={12} className="text-red-500" aria-hidden="true" /> Private
            </p>
            {garage.cars.map(car => (
              <CarCard key={car.id} car={car} garage={garage} events={events} onEdit={() => setEditing(car)} onOpenEvent={onOpenEvent} />
            ))}
            {garage.cars.length < MAX_CARS && (
              <button
                onClick={() => setEditing('new')}
                className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Plus size={16} aria-hidden="true" />
                Add a car
              </button>
            )}
          </div>
        )}
      </div>
      {editing && (
        <CarSheet
          key={editingCar?.id ?? 'new'}
          car={editingCar}
          events={editingCar ? carEvents(editingCar.id, garage, events).length : 0}
          onSave={async car => {
            await garage.saveCar(car)
            setEditing(null)
            onToast(editingCar ? 'Car saved' : 'Car added')
          }}
          onRemove={editingCar && (async () => {
            await garage.removeCar(editingCar.id)
            setEditing(null)
            onToast('Car removed')
          })}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

/**
 * One car (#344): what it's called, its lug nut torque, what it ran at its
 * last event, and every event it went to, newest first.
 */
function CarCard({ car, garage, events, onEdit, onOpenEvent }: {
  car: Car
  garage: Garage
  events: EventConfig[]
  onEdit: () => void
  onOpenEvent: (event: EventConfig) => void
}) {
  const went = carEvents(car.id, garage, events).flatMap(id => events.filter(e => e.id === id))
  const last = lastConsumables(car.id, garage, events)
  const lastEvent = last && events.find(e => e.id === last.eventId)
  const name = carName(car)
  return (
    <section aria-label={name} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" data-car>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-gray-900">{name}</h2>
          {car.nickname && <p className="truncate text-sm text-gray-500">{carTitle(car)}</p>}
        </div>
        <button onClick={onEdit} aria-label={`Edit ${name}`} className="-my-1 shrink-0 py-1 text-sm font-medium text-blue-600 hover:text-blue-700">
          Edit
        </button>
      </div>

      {car.lugNutTorque !== undefined && (
        <dl className="mt-2"><SetupRow label="Lug nut torque" value={`${car.lugNutTorque} ft·lb`} /></dl>
      )}

      {last && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-gray-900">Consumables</h3>
          {lastEvent && <p className="text-xs text-gray-500">At {lastEvent.name}</p>}
          <dl className="mt-1"><ConsumableRows setup={last.setup} /></dl>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900">Events</h3>
        {went.length === 0 ? (
          <p className="mt-1 text-xs text-gray-500">None yet. Add it to an event from the event’s My notes tab.</p>
        ) : (
          <ul className="mt-2 flex flex-col gap-1" aria-label={`${name}’s events`}>
            {went.map(e => (
              <li key={e.id}>
                <button
                  onClick={() => onOpenEvent(e)}
                  className="-mx-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors hover:bg-gray-50"
                >
                  <TrackIcon trackId={e.trackId} tone="dark" size={32} padding={0} radius="rounded-lg" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-gray-900">{e.name}</span>
                    <span className="block text-xs text-gray-500">{formatDateRange(e.days)}</span>
                  </span>
                  <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
