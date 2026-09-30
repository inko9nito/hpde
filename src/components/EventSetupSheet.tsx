import { useId, useState } from 'react'
import { Check, Lock, Plus } from 'lucide-react'
import { Sheet } from './Sheet'
import { SuggestInput } from './SuggestInput'
import { CarFields, carDraft, carFromDraft } from './CarSheet'
import { inputClass } from './SessionEvaluationForm'
import { CONSUMABLES, MAX_PART, carName, carTitle, cleanSetup, consumableOptions, lastConsumables } from '../utils/garage'
import type { Car, ConsumableId, EventSetup, Garage } from '../utils/garage'
import type { EventConfig } from '../types'

type Parts = Record<ConsumableId, string>

function partsFrom(setup: EventSetup | undefined): Parts {
  return Object.fromEntries(CONSUMABLES.map(c => [c.id, setup?.[c.id] ?? ''])) as Parts
}

const label = 'text-xs font-medium text-gray-700'

/**
 * The car an event ran on, and its track-prep consumables (#344): picked
 * from the garage — or added here, when it isn't in it yet. A car's tires,
 * pads, rotors and brake fluid start as they were at its last event, since
 * they carry over until they're changed. Each session's tire pressures are
 * the session's (its sheet), and stay when this is removed.
 */
export function EventSetupSheet({ event, events, garage, onSaveCar, onSave, onRemove, onClose }: {
  event: EventConfig
  /** Every event, to find a car's last one. */
  events: EventConfig[]
  garage: Garage
  onSaveCar: (car: Omit<Car, 'id' | 'updatedAt'>) => Promise<Car>
  onSave: (setup: Omit<EventSetup, 'updatedAt'>) => Promise<void>
  /** Takes the car and consumables off the event. */
  onRemove: () => Promise<void>
  onClose: () => void
}) {
  const existing = garage.events[event.id]
  const hasOwn = !!existing && (!!existing.carId || CONSUMABLES.some(c => !!existing[c.id]))
  // The event's car, or with only one in the garage, that one.
  const [carId, setCarId] = useState<string | null>(
    () => existing?.carId ?? (!hasOwn && garage.cars.length === 1 ? garage.cars[0].id : null),
  )
  const [adding, setAdding] = useState(garage.cars.length === 0)
  const [newCar, setNewCar] = useState(() => carDraft())
  const carried = (id: string | null) => (id ? lastConsumables(id, garage, events, event.id) : null)
  const [from, setFrom] = useState(() => (hasOwn ? null : carried(carId)))
  const [parts, setParts] = useState<Parts>(() => partsFrom(hasOwn ? existing : from?.setup))
  const [partsTouched, setPartsTouched] = useState(false)
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()

  // Another car picked: its own last consumables, unless some were typed.
  function pick(next: string | null, add = false) {
    setCarId(next)
    setAdding(add)
    if (!partsTouched && !hasOwn) {
      const last = carried(next)
      setFrom(last)
      setParts(partsFrom(last?.setup))
    }
  }

  const car = adding ? carFromDraft(newCar) : null
  const setupOf = (chosen?: string) => ({ ...(chosen ? { carId: chosen } : {}), ...parts, ...(existing?.sessions ? { sessions: existing.sessions } : {}) })
  const cleaned = cleanSetup(setupOf(carId ?? undefined), garage.cars.map(c => c.id))
  const canSave = !busy && (adding ? !!car && 'value' in car : 'value' in cleaned)
  const fromEvent = from ? events.find(e => e.id === from.eventId) : undefined

  async function save() {
    if (!canSave) return
    setBusy('saving')
    setFailure(null)
    try {
      let chosen = carId ?? undefined
      if (adding && car && 'value' in car) {
        const saved = await onSaveCar(car.value)
        chosen = saved.id
        // Saved, so trying again doesn't add it twice.
        setCarId(saved.id)
        setAdding(false)
      }
      const setup = cleanSetup(setupOf(chosen), [...garage.cars.map(c => c.id), ...(chosen ? [chosen] : [])])
      if ('error' in setup) throw new Error(setup.error)
      await onSave(setup.value)
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  async function remove() {
    setBusy('removing')
    setFailure(null)
    try {
      await onRemove()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  return (
    <Sheet
      label="Car and consumables"
      busy={!!busy}
      onClose={onClose}
      data-setup-sheet
      heading={<>
        <p className="text-xs text-gray-500">{event.name}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">Car and consumables</h2>
      </>}
    >
      <fieldset className="mt-4">
        <legend className={label}>Car</legend>
        <div className="mt-1.5 flex flex-col gap-2">
          {garage.cars.map(c => (
            <CarChoice key={c.id} car={c} picked={!adding && carId === c.id} onPick={() => pick(carId === c.id && !adding ? null : c.id)} />
          ))}
          {!adding && (
            <button
              onClick={() => pick(null, true)}
              className="flex items-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Plus size={16} aria-hidden="true" />
              Add a car to your garage
            </button>
          )}
        </div>
      </fieldset>
      {adding && (
        <div className="mt-3 flex flex-col rounded-xl border border-gray-200 p-3 [&>label:first-child]:mt-0" role="group" aria-label="New car">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-900">New car</p>
            {garage.cars.length > 0 && (
              <button onClick={() => pick(existing?.carId ?? null)} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
            )}
          </div>
          <CarFields draft={newCar} onChange={setNewCar} />
        </div>
      )}

      <h3 className="mt-6 text-sm font-semibold text-gray-900">Consumables</h3>
      <p className="mt-0.5 text-xs text-gray-500">
        {fromEvent ? `As they were at ${fromEvent.name}. Change what you’ve replaced.` : 'What’s on the car for this event.'}
      </p>
      {CONSUMABLES.map(c => (
        <div key={c.id} className="flex flex-col">
          <label htmlFor={`${id}-${c.id}`} className={`mt-4 ${label}`}>{c.label}</label>
          <SuggestInput
            id={`${id}-${c.id}`}
            value={parts[c.id]}
            onChange={v => {
              setParts(p => ({ ...p, [c.id]: v.slice(0, MAX_PART) }))
              setPartsTouched(true)
              setConfirmingRemove(false)
            }}
            options={consumableOptions(c.id, garage)}
            placeholder={c.placeholder}
            className={inputClass}
          />
        </div>
      ))}

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={save}
          disabled={!canSave}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : 'Save'}
        </button>
        {hasOwn && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from event
          </button>
        )}
        {hasOwn && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove the car and consumables?</span>
            <button onClick={remove} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
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

/** A car in the garage to pick: what it's called, and its year, make and model under a nickname. */
function CarChoice({ car, picked, onPick }: { car: Car; picked: boolean; onPick: () => void }) {
  return (
    <button
      onClick={onPick}
      aria-pressed={picked}
      className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${picked ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
    >
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-gray-900">{carName(car)}</span>
        {car.nickname && <span className="block truncate text-xs text-gray-500">{carTitle(car)}</span>}
      </span>
      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${picked ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'}`} aria-hidden="true">
        {picked && <Check size={12} strokeWidth={3} />}
      </span>
    </button>
  )
}
