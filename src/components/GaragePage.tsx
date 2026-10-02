import { useState } from 'react'
import { CarFront, ChevronRight, Lock, Plus } from 'lucide-react'
import { AvatarStack, useDriverAvatar } from './Avatar'
import { CarHero, CarRow } from './CarRow'
import { SubPageHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { CarFormPage } from './CarFormPage'
import { carHash } from './CarPage'
import { useAuth } from '../auth/AuthContext'
import { useCarPhoto, useGarage } from '../data/GarageContext'
import { useRsvps } from '../data/RsvpsContext'
import { MAX_CARS, activeCars, carName, carOutings, isShared, othersText } from '../utils/garage'
import type { Car } from '../utils/garage'
import type { EventConfig } from '../types'

/**
 * A car in the Garage (#410): its photo with its name over it, and under
 * it how many events it's been to — after its drivers' pictures, when
 * it's shared (#398). Opens its page.
 */
function CarCard({ car, events }: { car: Car; events: number }) {
  const src = useCarPhoto(car)
  const avatarOf = useDriverAvatar()
  const shared = isShared(car)
  // You first, then the others in the order they joined.
  const drivers = [...(car.drivers ?? [])].sort((a, b) => Number(!!b.you) - Number(!!a.you))
  return (
    <a
      href={carHash(car.id)}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300"
      data-car-row
    >
      <CarHero car={car} src={src} />
      <div className="flex min-h-12 items-center gap-2.5 px-4 py-3">
        {shared && <AvatarStack people={drivers.map(d => ({ name: d.name, url: avatarOf(d) }))} size={24} />}
        <span className="min-w-0 flex-1 truncate text-sm text-gray-500">
          {shared && <span className="sr-only">Shared with {othersText(car)} · </span>}
          {events === 0 ? 'No events yet' : events === 1 ? '1 event' : `${events} events`}
        </span>
        <ChevronRight size={18} className="shrink-0 text-gray-400" aria-hidden="true" />
      </div>
    </a>
  )
}

/**
 * The Garage (#344), a page over the More tab (#345): the driver's cars,
 * a card each (#410) — its photo, what it's called and how many events
 * it's been to — each opening its page, where its setup, change history
 * and events are.
 */
export function GaragePage({ events, onBack, onToast }: {
  /** Every event, to find a car's last. */
  events: EventConfig[]
  onBack: () => void
  onToast: (text: string) => void
}) {
  const { status: authStatus } = useAuth()
  const garage = useGarage()
  const { rsvps } = useRsvps()
  // Add a car's page, while it's open: a new one each time (see CarPage).
  const [adding, setAdding] = useState<number | null>(null)
  const add = () => setAdding(n => (n ?? 0) + 1)
  const cars = activeCars(garage.cars)
  // Taken out of the garage, kept for the events they went to (#410).
  const removed = garage.cars.filter(c => c.archived)

  return (
    <div className="min-h-screen bg-gray-50">
      <SubPageHeader
        title="Garage"
        onBack={onBack}
        accessory={authStatus === 'signed-in' && garage.status === 'ready' && cars.length > 0 && (
          <p className="flex shrink-0 items-center gap-1 text-sm text-gray-500" title="Only you and admins can see your garage">
            <Lock size={14} aria-hidden="true" /> Private
          </p>
        )}
      />
      <div className="mx-auto max-w-lg px-3 pt-4 sm:px-4 sm:pt-6 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {authStatus !== 'signed-in' ? (
          <SignInPrompt reason="manage your cars" privacyNote={false} />
        ) : garage.status === 'loading' || garage.status === 'off' ? (
          <div className="fade-in flex flex-col gap-3" aria-busy="true" aria-label="Loading your garage">
            <div className="aspect-[16/11] animate-pulse rounded-2xl border border-gray-200 bg-white" />
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
        ) : cars.length === 0 ? (
          <div className="fade-in rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
            <CarFront size={22} className="mx-auto text-gray-400" aria-hidden="true" />
            <p className="mt-2 text-sm font-medium text-gray-700">No cars yet</p>
            <button
              onClick={add}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
            >
              Add a car
            </button>
          </div>
        ) : (
          <div className="fade-in flex flex-col gap-4">
            <ul className="flex flex-col gap-4" aria-label="Cars">
              {cars.map(car => (
                <li key={car.id}>
                  <CarCard car={car} events={carOutings(car, garage, events, rsvps).length} />
                </li>
              ))}
            </ul>
            {cars.length < MAX_CARS && (
              <button
                onClick={add}
                className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white px-4 py-3 text-[15px] font-semibold text-gray-900 transition-colors hover:bg-gray-50"
              >
                <Plus size={16} aria-hidden="true" />
                Add a car
              </button>
            )}
          </div>
        )}
        {authStatus === 'signed-in' && garage.status === 'ready' && removed.length > 0 && (
          <section aria-label="Removed cars" className="fade-in mt-8">
            <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
              <h2 className="font-rubik text-xs font-medium uppercase tracking-[0.15em] text-gray-500">Removed</h2>
              <span className="text-xs text-gray-500">Kept for the events they went to</span>
            </div>
            <ul className="flex flex-col gap-2">
              {removed.map(car => {
                const n = carOutings(car, garage, events, rsvps).length
                return (
                  <li key={car.id}>
                    <CarRow car={car} title={carName(car)} subtitle={n === 1 ? '1 event' : `${n} events`} onClick={() => { window.location.hash = carHash(car.id) }} />
                  </li>
                )
              })}
            </ul>
          </section>
        )}
      </div>
      {adding !== null && (
        <CarFormPage key={adding} onSaved={() => onToast('Car added')} onClosed={() => setAdding(null)} />
      )}
    </div>
  )
}
