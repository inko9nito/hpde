import { useState } from 'react'
import { CarFront, ChevronRight, Lock, Plus } from 'lucide-react'
import { SubPageHeader } from './HomeTabs'
import { SignInPrompt } from './SignInPrompt'
import { CarFormPage } from './CarFormPage'
import { carHash } from './CarPage'
import { useAuth } from '../auth/AuthContext'
import { useCarPhoto, useGarage } from '../data/GarageContext'
import { useRsvps } from '../data/RsvpsContext'
import { MAX_CARS, carHeading, carOutings, carSubtitle, isShared, othersText } from '../utils/garage'
import type { Car, Garage } from '../utils/garage'
import type { Rsvps } from '../utils/rsvp'
import type { EventConfig } from '../types'

/**
 * "6 events": how many the car went to, by whoever drove it — and who
 * else drives it, when it's shared (#398).
 */
function eventsLine(car: Car, garage: Garage, events: EventConfig[], rsvps: Rsvps): string {
  const n = carOutings(car, garage, events, rsvps).length
  const went = n === 0 ? 'No events yet' : n === 1 ? '1 event' : `${n} events`
  return isShared(car) ? `With ${othersText(car)} · ${went}` : went
}

/**
 * A car in the Garage (#410): its photo, landscape, with its name and
 * year over the foot of it — or, with none (yet), a car on dark gray — and
 * under it how many events it's been to. Opens its page.
 */
function CarCard({ car, line }: { car: Car; line: string }) {
  const src = useCarPhoto(car)
  return (
    <a
      href={carHash(car.id)}
      className="block overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-colors hover:border-gray-300"
      data-car-row
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-800">
        {src ? (
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" data-car-photo />
        ) : car.photo ? (
          <div className="absolute inset-0 animate-pulse bg-gray-700" aria-busy="true" />
        ) : (
          <CarFront size={96} strokeWidth={1.25} className="absolute right-6 top-6 text-gray-600" aria-hidden="true" />
        )}
        {/* Dark enough at the foot for the name to read over any photo. */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/35 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
          <h2 className="truncate font-rubik text-[22px] font-bold leading-tight text-white">{carHeading(car)}</h2>
          {carSubtitle(car) && <p className="mt-0.5 truncate text-sm text-white/85">{carSubtitle(car)}</p>}
        </div>
      </div>
      <div className="flex min-h-12 items-center gap-3 px-4 py-3">
        <span className="min-w-0 flex-1 truncate text-sm text-gray-500">{line}</span>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SubPageHeader
        title="Garage"
        onBack={onBack}
        accessory={authStatus === 'signed-in' && garage.status === 'ready' && garage.cars.length > 0 && (
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
        ) : garage.cars.length === 0 ? (
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
              {garage.cars.map(car => (
                <li key={car.id}>
                  <CarCard car={car} line={eventsLine(car, garage, events, rsvps)} />
                </li>
              ))}
            </ul>
            {garage.cars.length < MAX_CARS && (
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
      </div>
      {adding !== null && (
        <CarFormPage key={adding} onSaved={() => onToast('Car added')} onClosed={() => setAdding(null)} />
      )}
    </div>
  )
}
