import { normalizeKey } from './fieldOptions'
import type { EventConfig } from '../types'

// Lap-time bests across events on the same track layout (#210): "Best on
// 1.7 CW, across every MSRC event". Events are the same layout when their
// track, configuration and direction match, however they're spelled.

/** One event's best, from the laps function's summary. */
export interface EventBest {
  eventId: string
  best?: number
  sessions: number
}

const compact = (s: string | undefined) => normalizeKey(s ?? '').replace(/ /g, '')

function directionKey(direction: string | undefined): string {
  const d = compact(direction)
  if (d === 'cw' || d === 'clockwise') return 'cw'
  if (d === 'ccw' || d === 'counterclockwise' || d === 'anticlockwise') return 'ccw'
  return d
}

/** Same track, configuration and direction. False when the event names no track. */
export function sameLayout(a: EventConfig, b: EventConfig): boolean {
  if (!compact(a.track)) return false
  return compact(a.track) === compact(b.track)
    && compact(a.configuration).replace(/miles?$/, '') === compact(b.configuration).replace(/miles?$/, '')
    && directionKey(a.direction) === directionKey(b.direction)
}

/** "MSRC" from the track icon id (msrc-1-7), otherwise the track's name. */
export function trackShortName(event: EventConfig): string | null {
  const fromIcon = event.trackId?.match(/^([a-z]+)-/)?.[1]
  if (fromIcon) return fromIcon.toUpperCase()
  return event.track?.trim() || null
}

/** "1.7 CW" from "1.7 mile" and "Clockwise"; null when neither is set. */
export function layoutLabel(event: EventConfig): string | null {
  const configuration = event.configuration?.trim().replace(/\s*miles?$/i, '')
  const d = directionKey(event.direction)
  const direction = d === 'cw' ? 'CW' : d === 'ccw' ? 'CCW' : event.direction?.trim()
  return [configuration, direction].filter(Boolean).join(' ') || null
}

/**
 * The best lap on this event's layout across every event with laps — this
 * one's taken from `thisBest` (what's on screen, saved a moment ago
 * included), the others from the summary. Undefined when there's none.
 */
export function bestOnLayout(
  event: EventConfig,
  events: EventConfig[],
  summary: EventBest[],
  thisBest: number | undefined,
): number | undefined {
  const byId = new Map(events.map(e => [e.id, e]))
  const bests = summary
    .filter(s => s.eventId !== event.id && s.best !== undefined)
    .filter(s => {
      const other = byId.get(s.eventId)
      return other !== undefined && sameLayout(event, other)
    })
    .map(s => s.best!)
  if (thisBest !== undefined) bests.push(thisBest)
  return bests.length ? Math.min(...bests) : undefined
}
