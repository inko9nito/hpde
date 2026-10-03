import { useId, useState } from 'react'
import { PAGE_BODY, PageHeader } from './PageHeader'
import type { Toolbar } from './PageHeader'
import { MAX_FEEDBACK, MAX_NAME } from '../utils/evaluation'
import type { SessionEvaluation } from '../utils/evaluation'

export const inputClass = 'mt-1.5 w-full rounded-xl border border-gray-300 px-3 py-2 text-base leading-snug text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none sm:text-sm'

/**
 * A session's instructor feedback (#340), in the session's sheet: what
 * they said, and who said it, under Cancel and Save (#388). Saved replaces
 * what's there; Remove takes it off the session.
 */
export function SessionEvaluationForm({ toolbar, existing, onBusyChange, onSave, onRemove }: {
  toolbar: Toolbar
  existing?: SessionEvaluation
  /** Saving or removing, so the sheet stays open till it's done. */
  onBusyChange?: (busy: boolean) => void
  onSave: (evaluation: SessionEvaluation) => Promise<void>
  onRemove: () => Promise<void>
}) {
  const [feedback, setFeedback] = useState(existing?.feedback ?? '')
  const [instructor, setInstructor] = useState(existing?.instructor ?? '')
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const feedbackId = useId()
  const instructorId = useId()
  const canSave = !!feedback.trim() && !busy

  async function run(what: 'saving' | 'removing', action: () => Promise<void>) {
    setBusy(what)
    onBusyChange?.(true)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    } finally {
      onBusyChange?.(false)
    }
  }

  return (
    <>
      <PageHeader
        {...toolbar}
        cancelDisabled={!!busy}
        save={{
          label: busy === 'saving' ? 'Saving…' : 'Save',
          disabled: !canSave,
          onClick: () => run('saving', () => onSave({
            feedback: feedback.trim(),
            ...(instructor.trim() ? { instructor: instructor.trim() } : {}),
          })),
        }}
      />
      <div className={PAGE_BODY}>
      <label htmlFor={feedbackId} className="mt-4 text-xs font-medium text-gray-700">
        What they said
      </label>
      <textarea
        id={feedbackId}
        value={feedback}
        onChange={e => {
          setFeedback(e.target.value)
          setConfirmingRemove(false)
        }}
        rows={5}
        maxLength={MAX_FEEDBACK}
        placeholder="What your instructor saw, and what to work on next…"
        className={`${inputClass} resize-y`}
      />
      <label htmlFor={instructorId} className="mt-4 flex items-baseline justify-between text-xs font-medium text-gray-700">
        Instructor
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <input
        id={instructorId}
        value={instructor}
        onChange={e => setInstructor(e.target.value)}
        maxLength={MAX_NAME}
        autoComplete="off"
        placeholder="Their name"
        className={inputClass}
      />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        {existing && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from session
          </button>
        )}
        {existing && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove this feedback?</span>
            <button onClick={() => run('removing', onRemove)} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
              {busy === 'removing' ? 'Removing…' : 'Remove'}
            </button>
            <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
              Keep
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  )
}
