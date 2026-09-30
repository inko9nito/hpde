import { useId, useState } from 'react'
import { Lock } from 'lucide-react'
import { Sheet } from './Sheet'
import { SuggestInput } from './SuggestInput'
import { inputClass } from './SessionEvaluationForm'
import { CONSUMABLES, MAX_NAME, MAX_NOTE, MAX_PART, carName, cleanEntry, partOptions, shopOptions } from '../utils/garage'
import type { Car, ConsumableId, Garage, LogEntry } from '../utils/garage'
import { todayLocalISO } from '../utils/time'

const label = 'text-xs font-medium text-gray-700'
// iOS centers a date input's value and lets it run wider than the field;
// left-aligned, one line tall, it sits like the text boxes around it
// (as on New event's dates).
const dateClass = `${inputClass} block h-10 min-w-0 appearance-none bg-white py-[7px] leading-6 [&::-webkit-date-and-time-value]:min-h-6 [&::-webkit-date-and-time-value]:text-left`

/**
 * Logs a job on a car (#344), or changes or removes an entry: what was
 * changed — any of the consumables, picked two by two, each then asking
 * what went on — the day it was done, the shop and a note.
 */
export function ChangeSheet({ car, garage, entry, onSave, onRemove, onClose }: {
  car: Car
  /** Every car's log, for suggestions. */
  garage: Garage
  /** The entry to change; none to log a new one. */
  entry?: LogEntry
  onSave: (entry: Omit<LogEntry, 'id'> & { id?: string }) => Promise<void>
  onRemove?: () => Promise<void>
  onClose: () => void
}) {
  // What went on for each consumable picked; one not picked isn't in it.
  const [parts, setParts] = useState<Partial<Record<ConsumableId, string>>>(
    () => Object.fromEntries((entry?.parts ?? []).map(p => [p.part, p.what ?? ''])),
  )
  const [date, setDate] = useState(entry?.date ?? todayLocalISO())
  const [shop, setShop] = useState(entry?.shop ?? '')
  const [note, setNote] = useState(entry?.note ?? '')
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()
  const picked = CONSUMABLES.filter(c => parts[c.id] !== undefined)
  const cleaned = cleanEntry({ date, shop, note, parts: picked.map(c => ({ part: c.id, what: parts[c.id] })) })

  function toggle(part: ConsumableId) {
    setParts(prev => {
      if (prev[part] === undefined) return { ...prev, [part]: '' }
      const { [part]: _gone, ...rest } = prev
      return rest
    })
  }

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

  const title = entry ? 'Edit entry' : 'Log a change'
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
        <legend className={`flex w-full items-baseline justify-between ${label}`}>
          What was changed
          <span className="font-normal text-gray-400">Pick all that apply</span>
        </legend>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          {CONSUMABLES.map(c => (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              aria-pressed={parts[c.id] !== undefined}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
                parts[c.id] !== undefined ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 text-gray-800 hover:bg-gray-50'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* What went on, for each one picked. */}
      {picked.length > 0 && (
        <fieldset className="mt-4">
          <legend className={`flex w-full items-baseline justify-between ${label}`}>
            What went on
            <span className="font-normal text-gray-400">Optional</span>
          </legend>
          {picked.map(c => (
            <div key={c.id} className="mt-2 flex flex-col first-of-type:mt-1.5">
              <label htmlFor={`${id}-${c.id}`} className="text-xs text-gray-500">{c.label}</label>
              <SuggestInput
                id={`${id}-${c.id}`}
                value={parts[c.id] ?? ''}
                onChange={v => setParts(prev => ({ ...prev, [c.id]: v.slice(0, MAX_PART) }))}
                options={partOptions(c.id, garage)}
                placeholder={c.placeholder}
                className={inputClass}
              />
            </div>
          ))}
        </fieldset>
      )}

      <label htmlFor={`${id}-date`} className={`mt-4 ${label}`}>Date</label>
      <input
        id={`${id}-date`}
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        max={todayLocalISO()}
        className={dateClass}
      />

      <label htmlFor={`${id}-shop`} className={`mt-4 flex items-baseline justify-between ${label}`}>
        Shop
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <SuggestInput
        id={`${id}-shop`}
        value={shop}
        onChange={v => setShop(v.slice(0, MAX_NAME))}
        options={shopOptions(garage)}
        placeholder="Where it was done"
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
        placeholder="Mileage, why…"
        className={`${inputClass} resize-y`}
      />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={() => 'value' in cleaned && run('saving', () => onSave({ ...(entry ? { id: entry.id } : {}), ...cleaned.value }))}
          disabled={!('value' in cleaned) || !!busy}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : entry ? 'Save entry' : picked.length > 1 ? `Log ${picked.length} changes` : 'Log change'}
        </button>
        {entry && onRemove && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from log
          </button>
        )}
        {entry && onRemove && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove this entry?</span>
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
