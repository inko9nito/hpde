import { useId, useState } from 'react'
import { inputClass } from './SessionEvaluationForm'
import { PAGE_BODY, PageHeader } from './PageHeader'
import type { Toolbar } from './PageHeader'
import { CORNERS, MAX_NOTE, MAX_PSI, cleanPressures, cornersText } from '../utils/garage'
import type { CornerId, Corners, SessionPressures } from '../utils/garage'

type Draft = Record<CornerId, string>

const WHEN = [
  { id: 'cold', title: 'Before the session', hint: 'Cold, or as you set them' },
  { id: 'hot', title: 'After the session', hint: 'Hot, as soon as you’re in' },
] as const

function draftFrom(c: Corners | undefined): Draft {
  return Object.fromEntries(CORNERS.map(k => [k.id, c?.[k.id] !== undefined ? String(c[k.id]) : ''])) as Draft
}

function cornersFrom(d: Draft): Record<CornerId, number | undefined> {
  return Object.fromEntries(CORNERS.map(k => [k.id, d[k.id].trim() === '' ? undefined : Number(d[k.id])])) as Record<CornerId, number | undefined>
}

/** A pressure as typed: digits and one decimal place, under 100. */
function psiInput(t: string): string {
  const m = t.replace(/[^\d.]/g, '').match(/^(\d{0,2})(\.\d?)?/)
  const v = m ? `${m[1]}${m[2] ?? ''}` : ''
  return v === '.' ? '0.' : Number(v) > MAX_PSI ? String(MAX_PSI) : v
}

/** "Before 32/32/30/30 · after 38/38/35/35": a session's pressures, in a line. */
export function pressuresText(p: Pick<SessionPressures, 'cold' | 'hot' | 'note'>): string {
  const parts = [p.cold && `Before ${cornersText(p.cold)}`, p.hot && `${p.cold ? 'after' : 'After'} ${cornersText(p.hot)}`].filter(Boolean)
  return parts.length ? parts.join(' · ') : p.note ?? ''
}

/**
 * A session's tire pressures (#344), in its sheet: each corner's, before it
 * and hot after it — laid out as the car sits, fronts on top — and what was
 * changed, under Cancel and Save (#388). Save replaces what's there; Remove
 * takes them off the session.
 */
export function TirePressuresForm({ toolbar, session, existing, onBusyChange, onSave, onRemove }: {
  toolbar: Toolbar
  /** Which session. */
  session: Pick<SessionPressures, 'date' | 'time' | 'group' | 'sessionNumber'>
  existing?: SessionPressures
  onBusyChange?: (busy: boolean) => void
  onSave: (pressures: SessionPressures) => Promise<void>
  onRemove: () => Promise<void>
}) {
  const [cold, setCold] = useState(() => draftFrom(existing?.cold))
  const [hot, setHot] = useState(() => draftFrom(existing?.hot))
  const [note, setNote] = useState(existing?.note ?? '')
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()
  const cleaned = cleanPressures({ ...session, cold: cornersFrom(cold), hot: cornersFrom(hot), note })
  const drafts = { cold: [cold, setCold], hot: [hot, setHot] } as const

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
          disabled: !('value' in cleaned) || !!busy,
          onClick: () => { if ('value' in cleaned) run('saving', () => onSave(cleaned.value)) },
        }}
      />
      <div className={PAGE_BODY}>
      {WHEN.map(w => {
        const [draft, setDraft] = drafts[w.id]
        return (
          <fieldset key={w.id} className="mt-4">
            <legend className="flex w-full items-baseline justify-between text-xs font-medium text-gray-700">
              {w.title}
              <span className="font-normal text-gray-400">{w.hint}</span>
            </legend>
            {/* As the car sits: fronts on top. */}
            <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-2">
              {CORNERS.map(c => (
                <div key={c.id} className="relative">
                  <label htmlFor={`${id}-${w.id}-${c.id}`} className="sr-only">{`${c.label}, ${w.title.toLowerCase()}`}</label>
                  <span className="pointer-events-none absolute bottom-2 left-3 text-xs font-semibold text-gray-400" aria-hidden="true">{c.short}</span>
                  <input
                    id={`${id}-${w.id}-${c.id}`}
                    value={draft[c.id]}
                    onChange={e => {
                      setDraft({ ...draft, [c.id]: psiInput(e.target.value) })
                      setConfirmingRemove(false)
                    }}
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="–"
                    className={`${inputClass} px-10 text-center font-semibold tabular-nums`}
                  />
                  <span className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-400" aria-hidden="true">psi</span>
                </div>
              ))}
            </div>
          </fieldset>
        )
      })}

      <label htmlFor={`${id}-note`} className="mt-4 flex items-baseline justify-between text-xs font-medium text-gray-700">
        What you changed
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <textarea
        id={`${id}-note`}
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={2}
        maxLength={MAX_NOTE}
        placeholder="Bled 2 psi from the fronts…"
        className={`${inputClass} resize-y`}
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
            <span className="text-gray-700">Remove these pressures?</span>
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
