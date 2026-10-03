// Track conditions (#347). Two sources, side by side:
//   - the weather near the track, looked up for the event's days (forecast
//     ahead of it, what it was once it's past): air temperature, rain and
//     the sky, hour by hour — see data/weather;
//   - what the driver records for each session they drove: the track's
//     surface, and the sky, air and track temperature as they saw them
//     (the air and sky start from the nearby weather), with a note — kept
//     with their notes for the event, like an instructor's evaluation.
// And for the event as a whole, a note of their own.
import { Cloud, CloudLightning, CloudRain, CloudSun, Sun } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type Surface = 'dry' | 'damp' | 'wet' | 'drying'
export type Sky = 'sunny' | 'partly' | 'cloudy' | 'rain' | 'storm'

export const SURFACES: readonly { id: Surface; label: string }[] = [
  { id: 'dry', label: 'Dry' },
  { id: 'damp', label: 'Damp' },
  { id: 'wet', label: 'Wet' },
  { id: 'drying', label: 'Drying' },
]

export const SKIES: readonly { id: Sky; label: string; icon: LucideIcon }[] = [
  { id: 'sunny', label: 'Sunny', icon: Sun },
  { id: 'partly', label: 'Partly cloudy', icon: CloudSun },
  { id: 'cloudy', label: 'Cloudy', icon: Cloud },
  { id: 'rain', label: 'Rain', icon: CloudRain },
  { id: 'storm', label: 'Storms', icon: CloudLightning },
]

export const MAX_CONDITIONS_NOTE = 500

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
}

export const surfaceLabel = (s: Surface) => SURFACES.find(x => x.id === s)!.label
export const skyOf = (s: Sky) => SKIES.find(x => x.id === s)!

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
    c.sky && skyOf(c.sky).label,
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
