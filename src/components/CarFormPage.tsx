import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Camera, Lock } from 'lucide-react'
import { PushPage } from './PushPage'
import { inputClass } from './SessionEvaluationForm'
import { useCarPhoto, useGarage } from '../data/GarageContext'
import { MAX_NAME, MAX_TORQUE, cleanCar, carName } from '../utils/garage'
import type { Car } from '../utils/garage'
import { shrinkPhoto } from '../utils/photo'

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
      <div className="grid grid-cols-[5rem_1fr] gap-3">
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

/** A photo picked here, not saved yet: shown from the phone until Save. */
type PhotoChange = { blob: Blob; src: string } | 'remove' | null

const card = 'rounded-2xl border border-gray-200 bg-white p-5 shadow-sm'
const outlineButton = 'rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50'

/**
 * Adds a car to the garage, or changes or removes one (#344): a page that
 * slides in over the one it's opened from, Cancel and Save across its
 * top — its photo, what it is and its lug nut torque. Nothing's saved
 * until Save; a photo picked is made small enough to upload first.
 * Removing a car takes its change log with it; the events it went to keep
 * their sessions' tire pressures.
 */
export function CarFormPage({ car, events, onSaved, onRemoved, onClosed }: {
  /** The car to change; none to add one. */
  car?: Car
  /** How many events it's been to, so Remove can say. */
  events?: number
  /** Once it's saved, with the car as saved; the page then slides away. Throws with a message to show. */
  onSaved: (car: Car) => void | Promise<void>
  /** Once it's removed; the page then slides away. */
  onRemoved?: () => void
  /** Once it's slid away. */
  onClosed: () => void
}) {
  const garage = useGarage()
  const [open, setOpen] = useState(true)
  const [draft, setDraft] = useState(() => carDraft(car))
  const [photo, setPhoto] = useState<PhotoChange>(null)
  // Added already, when a first Save got that far: trying again changes it.
  const [added, setAdded] = useState<Car | null>(null)
  const [busy, setBusy] = useState<'saving' | 'removing' | 'photo' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const cleaned = carFromDraft(draft)
  const input = useRef<HTMLInputElement>(null)
  const savedSrc = useCarPhoto(car)
  const hasPhoto = photo ? photo !== 'remove' : !!car?.photo
  const src = photo && photo !== 'remove' ? photo.src : savedSrc

  // A picked photo is shown from the phone; let it go once it's replaced.
  useEffect(() => () => {
    if (photo && photo !== 'remove') URL.revokeObjectURL(photo.src)
  }, [photo])

  const close = () => setOpen(false)
  const busyRef = useRef(busy)
  busyRef.current = busy
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busyRef.current) setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  async function run(what: 'saving' | 'removing' | 'photo', action: () => Promise<void>) {
    setBusy(what)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
    } finally {
      setBusy(null)
    }
  }

  function save() {
    if (!('value' in cleaned)) return
    run('saving', async () => {
      const id = car?.id ?? added?.id
      const saved = await garage.saveCar({ ...(id ? { id } : {}), ...cleaned.value })
      if (!car) setAdded(saved)
      try {
        if (photo === 'remove') {
          if (car?.photo) await garage.removePhoto(saved.id)
        } else if (photo) {
          await garage.savePhoto(saved.id, photo.blob)
        }
      } catch (err) {
        throw new Error(`The car’s saved, but not its photo: ${(err as Error).message}`)
      }
      await onSaved(saved)
      close()
    })
  }

  const title = car ? 'Edit car' : 'Add a car'
  // Over whatever page it's opened from — a car's page scrolls, so not in it.
  return createPortal(
    <PushPage open={open} onExited={onClosed} raised>
      {/* On its way out once closed: gone to a screen reader, and to taps. */}
      <div role="dialog" aria-label={title} aria-hidden={!open || undefined} inert={!open || undefined} className="min-h-screen bg-gray-50" data-car-form>
        <div className="sticky top-0 z-20 border-b border-gray-500/20 bg-white shadow-[0_4px_15px_rgba(12,12,13,0.05)]">
          <div className="mx-auto grid min-h-[52px] max-w-lg grid-cols-[1fr_auto_1fr] items-center gap-2 px-2">
            <button onClick={close} disabled={!!busy} className="justify-self-start rounded-lg px-2 py-2 text-[15px] text-blue-600 hover:text-blue-700 disabled:text-gray-300">
              Cancel
            </button>
            <h1 className="truncate text-[15px] font-semibold text-gray-900">{title}</h1>
            <button
              onClick={save}
              disabled={!('value' in cleaned) || !!busy}
              className="justify-self-end rounded-lg px-2 py-2 text-[15px] font-semibold text-blue-600 hover:text-blue-700 disabled:text-gray-300"
            >
              {busy === 'saving' ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-lg flex-col gap-5 px-3 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-4 sm:pt-6">
          <section aria-label="Photo" className={card}>
            <input
              ref={input}
              type="file"
              accept="image/*"
              className="sr-only"
              aria-label={hasPhoto ? 'Change photo' : 'Add a photo'}
              // The button that opens it is what's read out and tapped.
              aria-hidden="true"
              tabIndex={-1}
              onChange={e => {
                const file = e.target.files?.[0]
                e.target.value = ''
                if (file) {
                  run('photo', async () => {
                    const blob = await shrinkPhoto(file)
                    setPhoto({ blob, src: URL.createObjectURL(blob) })
                  })
                }
              }}
            />
            {hasPhoto ? (<>
              {src
                ? <img src={src} alt={car ? carName(car) : 'Your car'} className="aspect-[16/10] w-full rounded-xl bg-gray-100 object-cover" data-car-photo />
                : <div className="aspect-[16/10] w-full animate-pulse rounded-xl bg-gray-100" aria-busy="true" />}
              <div className="mt-3 flex gap-2">
                <button onClick={() => input.current?.click()} disabled={!!busy} className={`flex-1 text-gray-900 ${outlineButton}`}>
                  {busy === 'photo' ? 'Getting it ready…' : 'Change photo'}
                </button>
                <button onClick={() => setPhoto('remove')} disabled={!!busy} className={`text-red-600 ${outlineButton}`}>
                  Remove
                </button>
              </div>
            </>) : (
              <button
                onClick={() => input.current?.click()}
                disabled={!!busy}
                className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <Camera size={22} className="text-gray-400" aria-hidden="true" />
                {busy === 'photo' ? 'Getting it ready…' : 'Add a photo'}
                <span className="text-xs font-normal text-gray-400">Any size: it’s made smaller to upload</span>
              </button>
            )}
          </section>

          <section aria-label="Car" className={`flex flex-col ${card}`}>
            <CarFields draft={draft} onChange={setDraft} />
          </section>

          {failure && <p role="alert" className="-mt-2 px-1 text-xs text-red-700">{failure}</p>}

          <div className="flex flex-col items-center gap-3">
            {car && !confirmingRemove && (
              <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
                Remove from garage
              </button>
            )}
            {car && confirmingRemove && (
              <div className="flex flex-col items-center gap-1.5 text-sm">
                <span className="text-center text-gray-700">
                  Remove this car and its change log?
                  {!!events && ` Its ${events === 1 ? 'event keeps its' : `${events} events keep their`} tire pressures.`}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => run('removing', async () => {
                      await garage.removeCar(car.id)
                      onRemoved?.()
                      close()
                    })}
                    disabled={!!busy}
                    className="font-semibold text-red-600 hover:text-red-700"
                  >
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
        </div>
      </div>
    </PushPage>,
    document.body,
  )
}
