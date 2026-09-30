import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import { BackButton } from './EventHeader'
import { CarTile, ConsumablesList, DetailRow } from './CarRow'
import { CarFormPage } from './CarFormPage'
import { ChangeSheet } from './ChangeSheet'
import { DriveAtSheet } from './DriveAtSheet'
import { TrackIcon } from './TrackIcon'
import { useCarPhoto, useGarage } from '../data/GarageContext'
import { carEvents, carName, carTitle, consumableLabel, formatDay, logNewestFirst } from '../utils/garage'
import type { Car, LogEntry } from '../utils/garage'
import { formatDateRange } from '../utils/time'
import type { EventConfig } from '../types'

const CAR_HASH_PREFIX = '#/garage/'

/** A car's page (#344), under the Garage tab. */
export function carHash(carId: string): string {
  return `${CAR_HASH_PREFIX}${encodeURIComponent(carId)}`
}

export function carIdFromHash(hash: string): string | null {
  if (!hash.startsWith(CAR_HASH_PREFIX)) return null
  return decodeURIComponent(hash.slice(CAR_HASH_PREFIX.length).split('/')[0]) || null
}

/** A card with a heading, and a button at its foot. */
function Card({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section aria-label={title} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <div className="mt-1">{children}</div>
      {action}
    </section>
  )
}

/** The car's photo, at the top of its details: changed from Edit. */
function CarPhoto({ car }: { car: Car }) {
  const src = useCarPhoto(car)
  if (!car.photo) return null
  return (
    <div className="mb-3 mt-2 overflow-hidden rounded-xl bg-gray-100">
      {src
        ? <img src={src} alt={carName(car)} className="aspect-[16/10] w-full object-cover" data-car-photo />
        : <div className="aspect-[16/10] w-full animate-pulse" aria-busy="true" />}
    </div>
  )
}

const footButton = 'mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50'

/**
 * A car's details (#344), pushed over the Garage: what it is and its lug
 * nut torque (Edit to change them), what's on it now, the log of every
 * change to its consumables — each opens to change or remove — and the
 * events it went to, which open on their My notes.
 */
export function CarPage({ carId, events, onBack, onOpenEvent, onToast }: {
  carId: string
  events: EventConfig[]
  onBack: () => void
  onOpenEvent: (event: EventConfig) => void
  onToast: (text: string) => void
}) {
  const garage = useGarage()
  const car = garage.cars.find(c => c.id === carId)
  // Edit's page, while it's open: a new one each time, so one opened while
  // the last is still sliding away starts afresh.
  const [editing, setEditing] = useState<number | null>(null)
  const [addingEvents, setAddingEvents] = useState(false)
  // The log entry open in its sheet: one to change, or a new one.
  const [entry, setEntry] = useState<LogEntry | 'new' | null>(null)

  const header = (
    <div className="sticky top-0 z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]">
      <div className="mx-auto flex min-h-[64px] max-w-lg items-center gap-2 px-4 py-2">
        <BackButton onClick={onBack} />
        {car && (
          <div className="flex min-w-0 items-center gap-3">
            <CarTile car={car} size={44} />
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="truncate font-rubik text-lg font-bold leading-tight text-gray-900">{carName(car)}</h1>
              <p className="truncate text-[13px] leading-tight text-gray-500">{car.nickname ? carTitle(car) : 'Garage'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        {header}
        <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
          {garage.status === 'loading' ? (
            <div className="h-44 animate-pulse rounded-2xl border border-gray-200 bg-white" aria-busy="true" aria-label="Loading your car" />
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
              <p className="text-sm font-medium text-gray-700">This car isn’t in your garage</p>
              <p className="mt-1 text-xs text-gray-400">It may have been removed.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const went = carEvents(car.id, garage, events)
  const log = logNewestFirst(car)

  return (
    <div className="min-h-screen bg-gray-50">
      {header}
      <div className="mx-auto flex max-w-lg flex-col gap-5 px-3 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-4 sm:pt-6">
        <Card
          title="Details"
          action={<button onClick={() => setEditing(n => (n ?? 0) + 1)} className={footButton}>Edit details</button>}
        >
          <CarPhoto car={car} />
          <dl>
            {car.year !== undefined && <DetailRow label="Year">{car.year}</DetailRow>}
            <DetailRow label="Make">{car.make}</DetailRow>
            <DetailRow label="Model">{car.model}</DetailRow>
            {car.nickname && <DetailRow label="Nickname">{car.nickname}</DetailRow>}
            <DetailRow label="Lug nut torque">{car.lugNutTorque !== undefined ? `${car.lugNutTorque} ft·lb` : '—'}</DetailRow>
          </dl>
        </Card>

        <Card
          title="Consumables"
          action={<button onClick={() => setEntry('new')} className={footButton}><Plus size={16} aria-hidden="true" />Log a change</button>}
        >
          <ConsumablesList car={car} />
        </Card>

        <Card title="Change log">
          {log.length === 0 ? (
            <p className="mt-1 text-xs text-gray-500">Nothing logged yet.</p>
          ) : (
            <ul className="mt-1" aria-label="Change log">
              {log.map(e => (
                <li key={e.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setEntry(e)}
                    className="-mx-2 flex w-[calc(100%+1rem)] items-start gap-3 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="w-[5.5rem] shrink-0 pt-px text-xs tabular-nums text-gray-500">{formatDay(e.date)}</span>
                    <span className="min-w-0 flex-1">
                      {e.parts.map(p => (
                        <span key={p.part} className="block text-sm">
                          <span className="font-semibold text-gray-900">{consumableLabel(p.part)}</span>
                          {p.what && <span className="text-gray-700"> · {p.what}</span>}
                        </span>
                      ))}
                      {e.shop && <span className="mt-0.5 block text-xs text-gray-500">at {e.shop}</span>}
                      {e.note && <span className="mt-0.5 block whitespace-pre-line text-xs text-gray-500">{e.note}</span>}
                    </span>
                    <ChevronRight size={16} className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card
          title="Events"
          action={<button onClick={() => setAddingEvents(true)} className={footButton}><Plus size={16} aria-hidden="true" />Add to events</button>}
        >
          {went.length === 0 ? (
            <p className="mt-1 text-xs text-gray-500">None yet.</p>
          ) : (
            <ul className="mt-2 flex flex-col gap-1" aria-label={`${carName(car)}’s events`}>
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
        </Card>
      </div>

      {editing !== null && (
        <CarFormPage
          key={editing}
          car={car}
          events={went.length}
          onSaved={() => onToast('Car saved')}
          onRemoved={() => {
            onToast('Car removed')
            onBack()
          }}
          onClosed={() => setEditing(null)}
        />
      )}
      {addingEvents && (
        <DriveAtSheet
          car={car}
          garage={garage}
          onSave={async ids => {
            await garage.driveAt(car.id, ids)
            setAddingEvents(false)
            onToast(ids.length === 1 ? 'Added to 1 event' : `Added to ${ids.length} events`)
          }}
          onClose={() => setAddingEvents(false)}
        />
      )}
      {entry && (
        <ChangeSheet
          key={entry === 'new' ? 'new' : entry.id}
          car={car}
          garage={garage}
          entry={entry === 'new' ? undefined : entry}
          onSave={async next => {
            await garage.saveEntry(car.id, next)
            setEntry(null)
            onToast(entry === 'new' ? 'Logged' : 'Entry saved')
          }}
          onRemove={entry === 'new' ? undefined : async () => {
            await garage.removeEntry(car.id, entry.id)
            setEntry(null)
            onToast('Entry removed')
          }}
          onClose={() => setEntry(null)}
        />
      )}
    </div>
  )
}
