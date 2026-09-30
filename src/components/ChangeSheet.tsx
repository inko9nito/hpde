import { useId, useState } from 'react'
import { Lock } from 'lucide-react'
import { Sheet } from './Sheet'
import { SuggestInput } from './SuggestInput'
import { inputClass } from './SessionEvaluationForm'
import { CONSUMABLES, MAX_NOTE, MAX_PART, carName, cleanChange, consumableLabel, partOptions } from '../utils/garage'
import type { Car, ConsumableChange, ConsumableId, Garage } from '../utils/garage'
import { todayLocalISO } from '../utils/time'

const label = 'text-xs font-medium text-gray-700'

/**
 * Logs a consumable's change on a car (#344), or changes or removes an
 * entry: what was changed — picked from the consumables, two by two — the
 * day it was done, what went on and a note.
 */
export function ChangeSheet({ car, garage, change, onSave, onRemove, onClose }: {
  car: Car
  /** Every car's log, for suggestions. */
  garage: Garage
  /** The entry to change; none to log a new one. */
  change?: ConsumableChange
  onSave: (change: Omit<ConsumableChange, 'id'> & { id?: string }) => Promise<void>
  onRemove?: () => Promise<void>
  onClose: () => void
}) {
  const [part, setPart] = useState<ConsumableId | null>(change?.part ?? null)
  const [date, setDate] = useState(change?.date ?? todayLocalISO())
  const [what, setWhat] = useState(change?.what ?? '')
  const [note, setNote] = useState(change?.note ?? '')
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()
  const cleaned = cleanChange({ date, part, what, note })

  async function run(kind: 'saving' | 'removing', action: () => Promise<void>) {
    setBusy(kind)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  const title = change ? 'Edit change' : 'Log a change'
  return (
    <Sheet
      label={title}
      busy={!!busy}
      onClose={onClose}
      data-change-sheet
      heading={<>
        <p className="text-xs text-gray-500">{carName(car)}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">{title}</h2>
      </>}
    >
      <fieldset className="mt-4">
        <legend className={label}>What was changed</legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {CONSUMABLES.map(c => (
            <button
              key={c.id}
              onClick={() => setPart(c.id)}
              aria-pressed={part === c.id}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                part === c.id ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-800 hover:bg-gray-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label htmlFor={`${id}-date`} className={`mt-4 ${label}`}>Date</label>
      <input
        id={`${id}-date`}
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        max={todayLocalISO()}
        className={`${inputClass} min-h-10 bg-white`}
      />

      <label htmlFor={`${id}-what`} className={`mt-4 flex items-baseline justify-between ${label}`}>
        What went on
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <SuggestInput
        id={`${id}-what`}
        value={what}
        onChange={v => setWhat(v.slice(0, MAX_PART))}
        options={part ? partOptions(part, garage) : []}
        placeholder={part ? CONSUMABLES.find(c => c.id === part)!.placeholder : 'Brand and model'}
        className={inputClass}
      />

      <label htmlFor={`${id}-note`} className={`mt-4 flex items-baseline justify-between ${label}`}>
        Note
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <textarea
        id={`${id}-note`}
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={2}
        maxLength={MAX_NOTE}
        placeholder="Mileage, who did it, why…"
        className={`${inputClass} resize-y`}
      />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={() => 'value' in cleaned && run('saving', () => onSave({ ...(change ? { id: change.id } : {}), ...cleaned.value }))}
          disabled={!('value' in cleaned) || !!busy}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : change ? 'Save change' : part ? `Log ${consumableLabel(part).toLowerCase()} change` : 'Log change'}
        </button>
        {change && onRemove && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from log
          </button>
        )}
        {change && onRemove && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove this change?</span>
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
