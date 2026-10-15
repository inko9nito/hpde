import { normalizeKey } from './fieldOptions'
import { lapStats } from './lapTimes'
import type { SessionLaps } from './lapTimes'
import { trackInfo } from '../data/tracks'
import type { TrackInfo } from '../data/tracks'
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
export function trackShortName(event: Pick<EventConfig, 'track' | 'trackId'>): string | null {
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
 * A layout spelled out, on its track's page (#346): "1.7 mile" and
 * "Clockwise", either one missing when the events don't say.
 */
export function layoutTitle(event: EventConfig): { length?: string; direction?: string } {
  const number = event.configuration?.trim().replace(/\s*miles?$/i, '')
  const length = number ? (/^[\d.]+$/.test(number) ? `${number} mile` : number) : undefined
  const d = directionKey(event.direction)
  const direction = d === 'cw' ? 'Clockwise' : d === 'ccw' ? 'Counter-clockwise' : event.direction?.trim() || undefined
  return { ...(length ? { length } : {}), ...(direction ? { direction } : {}) }
}

/** "MSRC 1.7 CW": the track's short name, then the layout. Null with no track. */
export function layoutName(event: EventConfig): string | null {
  const track = trackShortName(event)
  if (!track) return null
  return [track, layoutLabel(event)].filter(Boolean).join(' ')
}

/** A track's page id (#346): "msrc" — its short name, as the layouts' ids start. Null with no track. */
export function trackSlug(event: Pick<EventConfig, 'track' | 'trackId'>): string | null {
  const short = trackShortName(event)
  if (!short) return null
  return normalizeKey(short).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || null
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
  /** Where the track is: "Cresson, TX". */
  city?: string
  /** Its track's page id: "msrc" (#346). */
  trackSlug: string
  trackId?: string
  /** Which way round it's driven, when the events say (#307). */
  direction?: 'cw' | 'ccw'
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
  return [...named].map(([slug, e]): Layout => {
    const direction = directionKey(e.direction)
    return {
      slug,
      name: layoutName(e)!,
      track: e.track?.trim() || undefined,
      city: e.city?.trim() || undefined,
      trackSlug: trackSlug(e)!,
      trackId: e.trackId,
      ...(direction === 'cw' || direction === 'ccw' ? { direction } : {}),
      events: eventsOnLayout(slug, events),
    }
  }).sort((a, b) => latest(b).localeCompare(latest(a)) || a.name.localeCompare(b.name))
}

/** A track and its layouts, for the Tracks tab's groups (#314) and its page (#346). */
export interface TrackGroup {
  /** Its page's id: "msrc". */
  slug: string
  /** The track's name: "Motorsport Ranch" when the app knows it, else the events' ("Motorsport Ranch - Cresson"), or its short one. */
  name: string
  city?: string
  /** What the app knows of it: address, photo, the shape over it (#346). */
  info?: TrackInfo
  /** The shape it shows: its full course, or its first layout's. */
  trackId?: string
  layouts: Layout[]
  /** Every event on its layouts, the newest first. */
  events: EventConfig[]
}

/**
 * The layouts grouped by their track (#314), by its short name however
 * its full one is spelled — each group where its first layout falls, so
 * the track with the latest event comes first, and its layouts in
 * alphabetical order.
 */
export function trackGroups(layouts: Layout[]): TrackGroup[] {
  const groups = new Map<string, TrackGroup>()
  for (const layout of layouts) {
    const group = groups.get(layout.trackSlug)
    if (group) {
      group.layouts.push(layout)
      group.city ??= layout.city
    } else {
      const info = trackInfo(layout.trackId)
      groups.set(layout.trackSlug, {
        slug: layout.trackSlug,
        name: info?.name ?? layout.track ?? trackShortName(layout) ?? layout.name,
        city: info?.city ?? layout.city,
        ...(info ? { info } : {}),
        layouts: [layout],
        events: [],
      })
    }
  }
  const byName = (a: Layout, b: Layout) => a.name.localeCompare(b.name, undefined, { numeric: true })
  return [...groups.values()].map(g => {
    const sorted = g.layouts.sort(byName)
    const events = sorted.flatMap(l => l.events).sort((a, b) => startDate(b).localeCompare(startDate(a)))
    return { ...g, trackId: g.info?.shape ?? sorted[0].trackId, layouts: sorted, events }
  })
}

/** The track a page id names, from the events at it; null when none is. */
export function trackGroup(slug: string, events: EventConfig[]): TrackGroup | null {
  return trackGroups(layoutsOf(events)).find(g => g.slug === slug) ?? null
}

/**
 * The driver's laps on a layout, from the laps function's summary: best
 * lap and sessions, and their events there (#320) — the ones they have
 * sessions at, and the ones in `going`, that they said they're going to.
 */
export function layoutLaps(
  layout: Layout,
  summary: EventBest[],
  going: ReadonlySet<string> = new Set(),
): { best?: number; sessions: number; events: number } {
  const ids = new Set(layout.events.map(e => e.id))
  const mine = summary.filter(s => ids.has(s.eventId) && s.sessions > 0)
  const bests = mine.map(s => s.best).filter((ms): ms is number => ms !== undefined)
  const events = new Set([...mine.map(s => s.eventId), ...[...going].filter(id => ids.has(id))])
  return {
    ...(bests.length ? { best: Math.min(...bests) } : {}),
    sessions: mine.reduce((n, s) => n + s.sessions, 0),
    events: events.size,
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
