import { useState } from 'react'
import { ArrowLeftRight, Check, ChevronRight, Lock, Plus } from 'lucide-react'
import { Sheet } from './Sheet'
import { CarTile, ConsumablesList, DetailRow } from './CarRow'
import { carName, carTitle, eventStart } from '../utils/garage'
import type { Car, Garage } from '../utils/garage'
import type { EventConfig } from '../types'

/**
 * The car an event was driven in (#344), from the top of its My notes:
 * the car — its photo and name, which open its page, with Change beside
 * them — its lug nut torque and what was on it at this event, from its
 * change log. With none picked yet (or Change), the garage's cars to pick
 * from, and the way to add one (its own page, over the event).
 */
export function EventCarSheet({ event, garage, car, onPick, onAddCar, onRemove, onOpenCar, onClose }: {
  event: EventConfig
  garage: Garage
  /** The event's car, if one's picked. */
  car?: Car
  onPick: (carId: string) => Promise<void>
  /** Opens the page to add a car, which is then the event's. */
  onAddCar: () => void
  /** Opens the car's page, over the event. */
  onOpenCar: () => void
  /** Takes the car off the event. */
  onRemove: () => Promise<void>
  onClose: () => void
}) {
  const [picking, setPicking] = useState(!car)
  const [busy, setBusy] = useState<string | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)

  async function run(what: string, action: () => Promise<void>) {
    setBusy(what)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  return (
    <Sheet
      label={picking ? 'Pick your car' : 'Your car'}
      busy={!!busy}
      onClose={onClose}
      data-event-car-sheet
      heading={<>
        <p className="text-xs text-gray-500">{event.name}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">{picking ? 'Pick your car' : 'Your car'}</h2>
      </>}
    >
      {!picking && car && (<>
        {/* The car: its page from its name, and Change beside it. */}
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-gray-200 p-2 pr-1">
          <button
            onClick={onOpenCar}
            aria-label={`${carName(car)}: car details`}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-lg text-left transition-colors hover:bg-gray-50"
          >
            <CarTile car={car} size={44} rounded="rounded-lg" />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-base font-semibold text-gray-900">{carName(car)}</span>
              {car.nickname && <span className="block truncate text-xs text-gray-500">{carTitle(car)}</span>}
            </span>
            <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
          </button>
          <span className="h-8 w-px shrink-0 bg-gray-200" aria-hidden="true" />
          <button
            onClick={() => setPicking(true)}
            className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            <ArrowLeftRight size={14} aria-hidden="true" />
            Change
          </button>
        </div>
        <dl className="mt-2">
          <DetailRow label="Lug nut torque">{car.lugNutTorque !== undefined ? `${car.lugNutTorque} ft·lb` : '—'}</DetailRow>
        </dl>
        <h3 className="mt-4 text-sm font-semibold text-gray-900">At this event</h3>
        <ConsumablesList car={car} day={eventStart(event)} />
      </>)}

      {picking && (
        <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Cars">
          {garage.cars.map(c => (
            <button
              key={c.id}
              onClick={() => run(c.id, () => onPick(c.id))}
              disabled={!!busy}
              aria-pressed={car?.id === c.id}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${car?.id === c.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <CarTile car={c} size={32} rounded="rounded-lg" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-gray-900">{carName(c)}</span>
                {c.nickname && <span className="block truncate text-xs text-gray-500">{carTitle(c)}</span>}
              </span>
              {busy === c.id
                ? <span className="text-xs text-gray-500">Saving…</span>
                : (
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${car?.id === c.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'}`} aria-hidden="true">
                    {car?.id === c.id && <Check size={12} strokeWidth={3} />}
                  </span>
                )}
            </button>
          ))}
          <button
            onClick={onAddCar}
            disabled={!!busy}
            className="flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Plus size={16} aria-hidden="true" />
            Add a car to your garage
          </button>
        </div>
      )}

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        {picking && car && (
          <button onClick={() => setPicking(false)} disabled={!!busy} className="text-sm text-gray-600 hover:text-gray-800">Cancel</button>
        )}
        {car && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from event
          </button>
        )}
        {car && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Take the car off this event?</span>
            <button onClick={() => run('removing', onRemove)} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
              {busy === 'removing' ? 'Removing…' : 'Remove'}
            </button>
            <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
              Keep
            </button>
          </div>
        )}
        <p className="flex items-center gap-1 text-[11px] text-gray-400">
          <Lock size={11} aria-hidden="true" />
          Only you and admins can see your garage.
        </p>
      </div>
    </Sheet>
  )
}
