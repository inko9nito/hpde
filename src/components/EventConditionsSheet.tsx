import { useId, useState } from 'react'
import { Sheet } from './Sheet'
import { inputClass } from './SessionEvaluationForm'
import { MAX_CONDITIONS_NOTE } from '../utils/conditions'
import type { EventConditions } from '../utils/conditions'

/**
 * The driver's note on the whole event's conditions (#347), from the
 * Conditions card on Details: how the day went, beyond each session's.
 * Save replaces what's there; Remove takes it off the event.
 */
export function EventConditionsSheet({ existing, onSave, onRemove, onClose }: {
  existing?: EventConditions
  onSave: (conditions: EventConditions) => Promise<void>
  onRemove: () => Promise<void>
  onClose: () => void
}) {
  const [note, setNote] = useState(existing?.note ?? '')
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()

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

  return (
    <Sheet
      label="Note on the day’s conditions"
      busy={!!busy}
      onClose={onClose}
      data-event-conditions-sheet
      heading={<h2 className="font-rubik text-lg font-semibold text-gray-900">Conditions on the day</h2>}
    >
      <label htmlFor={id} className="mt-4 text-xs font-medium text-gray-700">Your note</label>
      <textarea
        id={id}
        value={note}
        onChange={e => { setNote(e.target.value); setConfirmingRemove(false) }}
        rows={4}
        maxLength={MAX_CONDITIONS_NOTE}
        placeholder="Rained all morning, dry and grippy after lunch…"
        className={`${inputClass} resize-y`}
      />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={() => run('saving', () => onSave({ note: note.trim() }))}
          disabled={!note.trim() || !!busy}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : 'Save note'}
        </button>
        {existing && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove note
          </button>
        )}
        {existing && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove this note?</span>
            <button onClick={() => run('removing', onRemove)} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
              {busy === 'removing' ? 'Removing…' : 'Remove'}
            </button>
            <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
              Keep
            </button>
          </div>
        )}
      </div>
    </Sheet>
  )
}
