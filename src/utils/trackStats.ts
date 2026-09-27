import { normalizeKey } from './fieldOptions'
import { lapStats } from './lapTimes'
import type { SessionLaps } from './lapTimes'
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

/** "MSRC 1.7 CW": the track's short name, then the layout. Null with no track. */
export function layoutName(event: EventConfig): string | null {
  const track = trackShortName(event)
  if (!track) return null
  return [track, layoutLabel(event)].filter(Boolean).join(' ')
}

/** The track page's id for this event's layout (#274): "msrc-1-7-cw". Null with no track. */
export function layoutSlug(event: EventConfig): string | null {
  const name = layoutName(event)
  if (!name) return null
  return normalizeKey(name).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || null
}

/**
 * Every event on the layout a track page's id names: the events it's the id
 * of, and every event on the same layout as one of them — the same match
 * the All time best card makes. Empty when no event has that id.
 */
export function eventsOnLayout(slug: string, events: EventConfig[]): EventConfig[] {
  const named = events.filter(e => layoutSlug(e) === slug)
  return events.filter(e => named.some(n => n.id === e.id || sameLayout(n, e)))
}

/** An event's first day, "YYYY-MM-DD"; empty with no days. */
export function startDate(event: EventConfig): string {
  return event.days.map(d => d.date).sort()[0] ?? ''
}

/** A track layout, for the Tracks tab (#274). */
export interface Layout {
  /** Its track page's id: "msrc-1-7-cw". */
  slug: string
  /** "MSRC 1.7 CW". */
  name: string
  /** The track's full name: "Motorsport Ranch - Cresson". */
  track?: string
  trackId?: string
  /** Every event on it, as its track page finds them. */
  events: EventConfig[]
}

/**
 * Every layout these events are on, the one with the latest event first
 * (the next one coming up, or the last one run). Events with no track
 * aren't on one.
 */
export function layoutsOf(events: EventConfig[]): Layout[] {
  const named = new Map<string, EventConfig>()
  for (const e of events) {
    const slug = layoutSlug(e)
    if (slug && !named.has(slug)) named.set(slug, e)
  }
  const latest = (layout: Layout) => layout.events.map(startDate).sort().at(-1) ?? ''
  return [...named].map(([slug, e]): Layout => ({
    slug,
    name: layoutName(e)!,
    track: e.track?.trim() || undefined,
    trackId: e.trackId,
    events: eventsOnLayout(slug, events),
  })).sort((a, b) => latest(b).localeCompare(latest(a)) || a.name.localeCompare(b.name))
}

/** The driver's laps on a layout, from the laps function's summary: best lap, sessions, and events with laps. */
export function layoutLaps(layout: Layout, summary: EventBest[]): { best?: number; sessions: number; events: number } {
  const ids = new Set(layout.events.map(e => e.id))
  const mine = summary.filter(s => ids.has(s.eventId) && s.sessions > 0)
  const bests = mine.map(s => s.best).filter((ms): ms is number => ms !== undefined)
  return {
    ...(bests.length ? { best: Math.min(...bests) } : {}),
    sessions: mine.reduce((n, s) => n + s.sessions, 0),
    events: mine.length,
  }
}

/**
 * The best lap on this event's layout across every event with laps, and how
 * many events that is — this one's best taken from `thisBest` (what's on
 * screen, saved a moment ago included), the others' from the summary.
 */
export function bestOnLayout(
  event: EventConfig,
  events: EventConfig[],
  summary: EventBest[],
  thisBest: number | undefined,
): { best?: number; events: number } {
  const byId = new Map(events.map(e => [e.id, e]))
  const bests = summary
    .filter(s => s.eventId !== event.id && s.best !== undefined)
    .filter(s => {
      const other = byId.get(s.eventId)
      return other !== undefined && sameLayout(event, other)
    })
    .map(s => s.best!)
  if (thisBest !== undefined) bests.push(thisBest)
  return bests.length ? { best: Math.min(...bests), events: bests.length } : { events: 0 }
}

/**
 * How far a session's best is off the all-time best: "+2.5s", "+0.04s",
 * "+3s". Null when it is the all-time best.
 */
export function gapToBest(sessionBest: number, allTimeBest: number): string | null {
  const gap = Math.max(0, sessionBest - allTimeBest)
  if (gap === 0) return null
  return `+${String(Number((gap / 1000).toFixed(3)))}s`
}

/** The fastest lap across these sessions. */
export function eventBest(sessions: SessionLaps[]): number | undefined {
  const bests = sessions.map(s => lapStats(s.laps).best).filter((ms): ms is number => ms !== undefined)
  return bests.length ? Math.min(...bests) : undefined
}
