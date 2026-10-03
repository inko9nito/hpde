import { useId, useState } from 'react'
import { inputClass } from './SessionEvaluationForm'
import { MAX_CONDITIONS_NOTE, SKIES, SURFACES } from '../utils/conditions'
import type { SessionConditions, Sky, Surface } from '../utils/conditions'
import type { HourWeather } from '../data/weather'

/** A temperature as typed: an optional minus and up to three digits. */
function tempInput(t: string): string {
  const m = t.replace(/[^\d-]/g, '').match(/^-?\d{0,3}/)
  return m ? m[0] : ''
}

const chip = (on: boolean) =>
  `rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors ${on ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'}`

/**
 * A session's track conditions (#347), in its sheet: the surface as they
 * drove it, the sky, the air and — if they measured it — the track
 * temperature, and a note. The sky and air start from the weather near the
 * track at the session's hour, to keep or change. Save replaces what's
 * there; Remove takes them off the session.
 */
export function ConditionsForm({ existing, nearby, onBusyChange, onSave, onRemove }: {
  existing?: SessionConditions
  /** The weather near the track at the session's hour, if it's known. */
  nearby?: HourWeather
  onBusyChange?: (busy: boolean) => void
  onSave: (conditions: SessionConditions) => Promise<void>
  onRemove: () => Promise<void>
}) {
  const [surface, setSurface] = useState<Surface | undefined>(existing?.surface)
  const [sky, setSky] = useState<Sky | undefined>(existing ? existing.sky : nearby?.sky)
  const [air, setAir] = useState(existing?.airF !== undefined ? String(existing.airF) : !existing && nearby ? String(nearby.tempF) : '')
  const [track, setTrack] = useState(existing?.trackF !== undefined ? String(existing.trackF) : '')
  const [note, setNote] = useState(existing?.note ?? '')
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()

  const fromNearby = (v: string | undefined, n: string | undefined) => !!nearby && v !== undefined && v === n
  const skyFromNearby = fromNearby(sky, nearby?.sky)
  const airFromNearby = fromNearby(air, nearby && String(nearby.tempF))

  const value: SessionConditions = {
    ...(surface ? { surface } : {}),
    ...(sky ? { sky } : {}),
    ...(air.trim() && air !== '-' ? { airF: Number(air) } : {}),
    ...(track.trim() && track !== '-' ? { trackF: Number(track) } : {}),
    ...(note.trim() ? { note: note.trim() } : {}),
  }
  const empty = Object.keys(value).length === 0

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
      <fieldset className="mt-4">
        <legend className="text-xs font-medium text-gray-700">Track surface</legend>
        <div className="mt-1.5 grid grid-cols-4 gap-2">
          {SURFACES.map(s => (
            <button key={s.id} type="button" aria-pressed={surface === s.id} onClick={() => setSurface(surface === s.id ? undefined : s.id)} className={chip(surface === s.id)}>
              {s.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-4">
        <legend className="flex w-full items-baseline justify-between text-xs font-medium text-gray-700">
          Weather
          {skyFromNearby && <span className="font-normal text-gray-400">From nearby weather</span>}
        </legend>
        <div className="mt-1.5 grid grid-cols-5 gap-2">
          {SKIES.map(s => (
            <button
              key={s.id}
              type="button"
              aria-pressed={sky === s.id}
              aria-label={s.label}
              onClick={() => setSky(sky === s.id ? undefined : s.id)}
              className={`${chip(sky === s.id)} flex flex-col items-center gap-1 !px-1 !py-2 !text-[11px] leading-tight`}
            >
              <s.icon size={20} aria-hidden="true" />
              <span className="truncate">{s.id === 'partly' ? 'Partly' : s.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {([
          ['air', 'Air', air, setAir, airFromNearby ? 'Nearby weather' : undefined],
          ['track', 'Track', track, setTrack, 'Optional'],
        ] as const).map(([key, label, v, set, hint]) => (
          <div key={key}>
            <label htmlFor={`${id}-${key}`} className="flex items-baseline justify-between text-xs font-medium text-gray-700">
              {label}
              {hint && <span className="font-normal text-gray-400">{hint}</span>}
            </label>
            <div className="relative">
              <input
                id={`${id}-${key}`}
                value={v}
                onChange={e => { set(tempInput(e.target.value)); setConfirmingRemove(false) }}
                inputMode="numeric"
                autoComplete="off"
                placeholder="–"
                className={`${inputClass} pr-9 font-semibold tabular-nums`}
              />
              <span className="pointer-events-none absolute bottom-2 right-3 text-sm text-gray-400" aria-hidden="true">°F</span>
            </div>
          </div>
        ))}
      </div>

      <label htmlFor={`${id}-note`} className="mt-4 flex items-baseline justify-between text-xs font-medium text-gray-700">
        Notes
        <span className="font-normal text-gray-400">Optional</span>
      </label>
      <textarea
        id={`${id}-note`}
        value={note}
        onChange={e => setNote(e.target.value)}
        rows={2}
        maxLength={MAX_CONDITIONS_NOTE}
        placeholder="Standing water at Turn 2…"
        className={`${inputClass} resize-y`}
      />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={() => run('saving', () => onSave(value))}
          disabled={empty || !!busy}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : 'Save conditions'}
        </button>
        {existing && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove from session
          </button>
        )}
        {existing && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove these conditions?</span>
            <button onClick={() => run('removing', onRemove)} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
              {busy === 'removing' ? 'Removing…' : 'Remove'}
            </button>
            <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
              Keep
            </button>
          </div>
        )}
      </div>
    </>
  )
}
