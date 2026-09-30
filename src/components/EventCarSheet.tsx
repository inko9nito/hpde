import { useState } from 'react'
import { Check, Lock, Plus } from 'lucide-react'
import { Sheet } from './Sheet'
import { CarFields, carDraft, carFromDraft } from './CarSheet'
import { ConsumablesList, DetailRow } from './CarRow'
import { carName, carTitle, eventStart } from '../utils/garage'
import type { Car, Garage } from '../utils/garage'
import type { EventConfig } from '../types'

/**
 * The car an event was driven in (#344), from the top of its My notes:
 * its lug nut torque and what was on it at this event, from its change
 * log, and the way to its page — or, with none picked yet (or Change car),
 * the garage's cars to pick from, and the way to add one.
 */
export function EventCarSheet({ event, garage, car, onPick, onAddCar, onRemove, onOpenCar, onClose }: {
  event: EventConfig
  garage: Garage
  /** The event's car, if one's picked. */
  car?: Car
  onPick: (carId: string) => Promise<void>
  onAddCar: (car: Omit<Car, 'id' | 'photo' | 'log' | 'updatedAt'>) => Promise<Car>
  /** Opens the car's page, over the event. */
  onOpenCar: () => void
  /** Takes the car off the event. */
  onRemove: () => Promise<void>
  onClose: () => void
}) {
  const [picking, setPicking] = useState(!car)
  const [adding, setAdding] = useState(garage.cars.length === 0)
  const [draft, setDraft] = useState(() => carDraft())
  const [busy, setBusy] = useState<string | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const newCar = carFromDraft(draft)

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
      label={picking ? 'Pick your car' : carName(car!)}
      busy={!!busy}
      onClose={onClose}
      data-event-car-sheet
      heading={<>
        <p className="text-xs text-gray-500">{event.name}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">{picking ? 'Pick your car' : carName(car!)}</h2>
      </>}
    >
      {!picking && car && (<>
        <dl className="mt-3">
          {car.nickname && <DetailRow label="Car">{carTitle(car)}</DetailRow>}
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
          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Plus size={16} aria-hidden="true" />
              Add a car to your garage
            </button>
          )}
          {adding && (
            <div className="flex flex-col rounded-xl border border-gray-200 p-3" role="group" aria-label="New car">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">New car</p>
                {garage.cars.length > 0 && (
                  <button onClick={() => setAdding(false)} disabled={!!busy} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                )}
              </div>
              <CarFields draft={draft} onChange={setDraft} />
              <button
                onClick={() => 'value' in newCar && run('adding', async () => {
                  const added = await onAddCar(newCar.value)
                  // In the garage now, so trying again doesn't add it twice.
                  setAdding(false)
                  setDraft(carDraft())
                  await onPick(added.id)
                })}
                disabled={!('value' in newCar) || !!busy}
                className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
              >
                {busy === 'adding' ? 'Adding…' : 'Add car'}
              </button>
            </div>
          )}
        </div>
      )}

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        {!picking && (
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              onClick={onOpenCar}
              className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
            >
              Car details
            </button>
            <button
              onClick={() => setPicking(true)}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              Change car
            </button>
          </div>
        )}
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
