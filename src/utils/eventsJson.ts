import tailwindColors from 'tailwindcss/colors'
import { runGroupColors } from '../theme/runGroupColors'
import type { EventConfig, ScheduleEvent } from '../types'

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
  events: ScheduleEvent[]
}

export interface SerializedEvent {
  id: string
  name: string
  subtitle: string
  link?: string
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
      subtitle: e.subtitle,
      ...(e.link ? { link: e.link } : {}),
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
        events: d.events,
      })),
    })),
  }
}
