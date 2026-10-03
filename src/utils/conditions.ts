// Track conditions (#347). Two sources, side by side:
//   - the weather near the track, looked up for the event's days (forecast
//     ahead of it, what it was once it's past): air temperature, rain and
//     the sky, hour by hour — see data/weather;
//   - what the driver records for each session they drove: the track's
//     surface, and the sky, air and track temperature as they saw them
//     (the air and sky start from the nearby weather), with a note — kept
//     with their notes for the event, like an instructor's evaluation.
// And for the event as a whole, a note of their own.
// What's read and checked here is shared by the app (the forms) and the
// notes function (which checks what it's sent before saving) — so no icons
// here: those are in components/skyIcons.

export type Surface = 'dry' | 'damp' | 'wet' | 'drying'
export type Sky = 'sunny' | 'partly' | 'cloudy' | 'rain' | 'storm'

export const SURFACES: readonly { id: Surface; label: string }[] = [
  { id: 'dry', label: 'Dry' },
  { id: 'damp', label: 'Damp' },
  { id: 'wet', label: 'Wet' },
  { id: 'drying', label: 'Drying' },
]

export const SKIES: readonly { id: Sky; label: string }[] = [
  { id: 'sunny', label: 'Sunny' },
  { id: 'partly', label: 'Partly cloudy' },
  { id: 'cloudy', label: 'Cloudy' },
  { id: 'rain', label: 'Rain' },
  { id: 'storm', label: 'Storms' },
]

export const MAX_CONDITIONS_NOTE = 500
/** Temperatures a driver can record, °F: anything outside is a typo. */
export const MIN_TEMP_F = -20
export const MAX_TEMP_F = 200

/** What a driver recorded for one session. Every field is optional. */
export interface SessionConditions {
  surface?: Surface
  sky?: Sky
  /** Air temperature, °F. */
  airF?: number
  /** Track (surface) temperature, °F, if they measured it. */
  trackF?: number
  note?: string
}

/** The driver's own note on the whole event's conditions. */
export interface EventConditions {
  note: string
  updatedAt?: string
  /** Who saved it, when it wasn't the driver: an admin's email (#288). */
  loggedBy?: string
}

export const surfaceLabel = (s: Surface) => SURFACES.find(x => x.id === s)!.label
export const skyLabel = (s: Sky) => SKIES.find(x => x.id === s)!.label

/** WMO weather code (Open-Meteo's) to the app's sky. */
export function skyFromCode(code: number): Sky {
  if (code >= 95) return 'storm'
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 71 && code <= 77) || code >= 85) return 'rain'
  if (code === 3 || code === 45 || code === 48) return 'cloudy'
  if (code === 2) return 'partly'
  return 'sunny'
}

/** "Wet · Rain · 68°F": a session's conditions in a line. */
export function conditionsText(c: SessionConditions): string {
  return [
    c.surface && surfaceLabel(c.surface),
    c.sky && skyLabel(c.sky),
    c.airF !== undefined && `${c.airF}°F`,
    c.trackF !== undefined && `track ${c.trackF}°F`,
  ].filter(Boolean).join(' · ')
}

/** "Wet → Damp → Dry": how the surface went over the day, repeats run together. */
export function surfaceTrend(sessions: SessionConditions[]): string | null {
  const steps: Surface[] = []
  for (const s of sessions) if (s.surface && steps[steps.length - 1] !== s.surface) steps.push(s.surface)
  return steps.length ? steps.map(surfaceLabel).join(' → ') : null
}

type Cleaned<T> = { value: T } | { error: string }

function temp(v: unknown, what: string): Cleaned<number | undefined> {
  if (v === undefined || v === null) return { value: undefined }
  if (typeof v !== 'number' || !Number.isFinite(v) || v < MIN_TEMP_F || v > MAX_TEMP_F) {
    return { error: `${what} must be a temperature in °F, ${MIN_TEMP_F} to ${MAX_TEMP_F}.` }
  }
  return { value: Math.round(v) }
}

function note(v: unknown, what: string): Cleaned<string | undefined> {
  if (v === undefined || v === null) return { value: undefined }
  if (typeof v !== 'string') return { error: `${what} must be text.` }
  const t = v.trim()
  if (t.length > MAX_CONDITIONS_NOTE) return { error: `${what} is too long (at most ${MAX_CONDITIONS_NOTE} characters).` }
  return { value: t || undefined }
}

/** A session's conditions as sent: only what's filled in is kept, and there must be something. */
export function cleanSessionConditions(raw: unknown): Cleaned<SessionConditions> {
  if (typeof raw !== 'object' || raw === null) return { error: 'Missing the conditions.' }
  const r = raw as Record<string, unknown>
  if (r.surface !== undefined && r.surface !== null && !SURFACES.some(s => s.id === r.surface)) return { error: 'Unknown track surface.' }
  if (r.sky !== undefined && r.sky !== null && !SKIES.some(s => s.id === r.sky)) return { error: 'Unknown weather.' }
  const airF = temp(r.airF, 'The air temperature')
  if ('error' in airF) return airF
  const trackF = temp(r.trackF, 'The track temperature')
  if ('error' in trackF) return trackF
  const n = note(r.note, 'The note')
  if ('error' in n) return n
  const value: SessionConditions = {
    ...(r.surface ? { surface: r.surface as Surface } : {}),
    ...(r.sky ? { sky: r.sky as Sky } : {}),
    ...(airF.value !== undefined ? { airF: airF.value } : {}),
    ...(trackF.value !== undefined ? { trackF: trackF.value } : {}),
    ...(n.value ? { note: n.value } : {}),
  }
  if (Object.keys(value).length === 0) return { error: 'Add the track’s conditions.' }
  return { value }
}

/** The event's conditions as sent: a note, required. */
export function cleanEventConditions(raw: unknown): Cleaned<EventConditions> {
  const n = note((raw as Record<string, unknown> | null)?.note, 'The note')
  if ('error' in n) return n
  if (!n.value) return { error: 'Add a note on the day’s conditions.' }
  return { value: { note: n.value } }
}
