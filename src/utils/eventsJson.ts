// With the extension: the widget feed function (netlify/functions/
// events-json.mts) imports this file, and Netlify runs it as plain Node ESM
// with packages left unbundled, where 'tailwindcss/colors' doesn't resolve.
import tailwindColors from 'tailwindcss/colors.js'
import { runGroupColors } from '../theme/runGroupColors'
import type { EventConfig, ScheduleActivity } from '../types'

export interface SerializedRunGroup {
  id: string
  label: string
  color: string
  description?: string
}

export interface SerializedDay {
  id: string
  label: string
  date: string
  activities: ScheduleActivity[]
}

export interface SerializedEvent {
  id: string
  name: string
  subtitle?: string
  link?: string
  organizer?: string
  track?: string
  city?: string
  configuration?: string
  direction?: string
  /** Which track shape to draw (the widget's Medium card, #204). */
  trackId?: string
  runGroups: SerializedRunGroup[]
  days: SerializedDay[]
}

export interface EventsManifest {
  generatedAt: string
  events: SerializedEvent[]
}

export function resolveTailwindBgColor(bgClass: string): string {
  const m = bgClass.match(/^bg-([a-z]+)-(\d+)$/)
  if (!m) {
    throw new Error(
      `eventsJson: cannot resolve Tailwind bg class "${bgClass}" — expected format "bg-<name>-<shade>"`
    )
  }
  const [, name, shade] = m
  if (name in runGroupColors) {
    if (shade !== '500') {
      throw new Error(
        `eventsJson: run-group color "${name}" is only defined at shade 500, got "bg-${name}-${shade}"`
      )
    }
    return runGroupColors[name]
  }
  const palette = (tailwindColors as unknown as Record<string, unknown>)[name]
  if (!palette || typeof palette !== 'object') {
    throw new Error(
      `eventsJson: unknown Tailwind color "${name}" in "${bgClass}". ` +
      `Add it to Tailwind's palette or pick a known color; the widget script derives its hex from this.`
    )
  }
  const hex = (palette as Record<string, unknown>)[shade]
  if (typeof hex !== 'string') {
    throw new Error(
      `eventsJson: unknown Tailwind shade "${shade}" for color "${name}" in "${bgClass}"`
    )
  }
  return hex
}

export function serializeEvents(events: EventConfig[], now: Date = new Date()): EventsManifest {
  return {
    generatedAt: now.toISOString(),
    events: events.map(e => ({
      id: e.id,
      name: e.name,
      ...(e.subtitle ? { subtitle: e.subtitle } : {}),
      ...(e.link ? { link: e.link } : {}),
      ...(e.organizer ? { organizer: e.organizer } : {}),
      ...(e.track ? { track: e.track } : {}),
      ...(e.city ? { city: e.city } : {}),
      ...(e.configuration ? { configuration: e.configuration } : {}),
      ...(e.direction ? { direction: e.direction } : {}),
      ...(e.trackId ? { trackId: e.trackId } : {}),
      runGroups: e.runGroups.map(g => ({
        id: g.id,
        label: g.label,
        color: resolveTailwindBgColor(g.bgClass),
        ...(g.description ? { description: g.description } : {}),
      })),
      days: e.days.map(d => ({
        id: d.id,
        label: d.label,
        date: d.date,
        activities: d.activities,
      })),
    })),
  }
}
