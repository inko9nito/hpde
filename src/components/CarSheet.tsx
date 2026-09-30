import { useId, useState } from 'react'
import { Lock } from 'lucide-react'
import { Sheet } from './Sheet'
import { inputClass } from './SessionEvaluationForm'
import { MAX_NAME, MAX_TORQUE, cleanCar, carTitle } from '../utils/garage'
import type { Car } from '../utils/garage'

/** What the car form holds: every field as typed, numbers too. */
export interface CarDraft {
  year: string
  make: string
  model: string
  nickname: string
  lugNutTorque: string
}

export function carDraft(car?: Car): CarDraft {
  return {
    year: car?.year !== undefined ? String(car.year) : '',
    make: car?.make ?? '',
    model: car?.model ?? '',
    nickname: car?.nickname ?? '',
    lugNutTorque: car?.lugNutTorque !== undefined ? String(car.lugNutTorque) : '',
  }
}

const number = (t: string) => (t.trim() === '' ? undefined : Number(t))

/** The draft, checked: the car to save, or what's wrong. */
export function carFromDraft(d: CarDraft) {
  return cleanCar({ year: number(d.year), make: d.make, model: d.model, nickname: d.nickname, lugNutTorque: number(d.lugNutTorque) })
}

const digits = (t: string, max: number) => t.replace(/\D/g, '').slice(0, max)

const label = 'text-xs font-medium text-gray-700'

/** A car's fields (#344): year, make and model, what they call it, and its lug nut torque. */
export function CarFields({ draft, onChange }: { draft: CarDraft; onChange: (draft: CarDraft) => void }) {
  const id = useId()
  const set = (patch: Partial<CarDraft>) => onChange({ ...draft, ...patch })
  return (
    <>
      <div className="mt-4 grid grid-cols-[5rem_1fr] gap-3">
        <div className="flex flex-col">
          <label htmlFor={`${id}-year`} className={label}>Year</label>
          <input
            id={`${id}-year`}
            value={draft.year}
            onChange={e => set({ year: digits(e.target.value, 4) })}
            inputMode="numeric"
            autoComplete="off"
            placeholder="2019"
            className={inputClass}
          />
        </div>
        <div className="flex min-w-0 flex-col">
          <label htmlFor={`${id}-make`} className={label}>Make</label>
          <input
            id={`${id}-make`}
            value={draft.make}
            onChange={e => set({ make: e.target.value })}
            maxLength={MAX_NAME}
            autoComplete="off"
            placeholder="Porsche"
            className={inputClass}
          />
        </div>
      </div>
      <label htmlFor={`${id}-model`} className={`mt-4 ${label}`}>Model</label>
      <input
        id={`${id}-model`}
        value={draft.model}
        onChange={e => set({ model: e.target.value })}
        maxLength={MAX_NAME}
        autoComplete="off"
        placeholder="718 Cayman GTS"
        className={inputClass}
      />
      <label htmlFor={`${id}-nickname`} className={`mt-4 flex items-baseline justify-between ${label}`}>
        Nickname
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <input
        id={`${id}-nickname`}
        value={draft.nickname}
        onChange={e => set({ nickname: e.target.value })}
        maxLength={MAX_NAME}
        autoComplete="off"
        placeholder="What you call it"
        className={inputClass}
      />
      <label htmlFor={`${id}-torque`} className={`mt-4 flex items-baseline justify-between ${label}`}>
        Lug nut torque
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <div className="relative">
        <input
          id={`${id}-torque`}
          value={draft.lugNutTorque}
          onChange={e => {
            const t = digits(e.target.value, 3)
            set({ lugNutTorque: t === '' ? '' : String(Math.min(MAX_TORQUE, Number(t))) })
          }}
          inputMode="numeric"
          autoComplete="off"
          placeholder="96"
          className={`${inputClass} pr-14`}
        />
        <span className="pointer-events-none absolute bottom-2 right-3 text-sm text-gray-400" aria-hidden="true">ft·lb</span>
      </div>
    </>
  )
}

/**
 * Adds a car to the garage, or changes or removes one (#344). Removing a
 * car takes its change log with it; the events it went to keep their
 * sessions' tire pressures.
 */
export function CarSheet({ car, events, onSave, onRemove, onClose }: {
  /** The car to change; none to add one. */
  car?: Car
  /** How many events it's been to, so Remove can say. */
  events?: number
  onSave: (car: Omit<Car, 'id' | 'log' | 'updatedAt'> & { id?: string }) => Promise<void>
  onRemove?: () => Promise<void>
  onClose: () => void
}) {
  const [draft, setDraft] = useState(() => carDraft(car))
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const cleaned = carFromDraft(draft)

  async function run(what: 'saving' | 'removing', action: () => Promise<void>) {
    setBusy(what)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  const title = car ? 'Edit car' : 'Add a car'
  return (
    <Sheet
      label={title}
      busy={!!busy}
      onClose={onClose}
      data-car-sheet
      heading={<>
        <p className="text-xs text-gray-500">{car ? carTitle(car) : 'Garage'}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">{title}</h2>
      </>}
    >
      <CarFields draft={draft} onChange={setDraft} />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={() => 'value' in cleaned && run('saving', () => onSave({ ...(car ? { id: car.id } : {}), ...cleaned.value }))}
          disabled={!('value' in cleaned) || !!busy}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : car ? 'Save car' : 'Add car'}
        </button>
        {car && onRemove && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from garage
          </button>
        )}
        {car && onRemove && confirmingRemove && (
          <div className="flex flex-col items-center gap-1.5 text-sm">
            <span className="text-center text-gray-700">
              Remove this car and its change log?
              {!!events && ` Its ${events === 1 ? 'event keeps its' : `${events} events keep their`} tire pressures.`}
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => run('removing', onRemove)} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
                {busy === 'removing' ? 'Removing…' : 'Remove'}
              </button>
              <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
                Keep
              </button>
            </div>
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
