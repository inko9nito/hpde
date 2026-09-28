import type { EventConfig } from '../types'
import { classifyEvent } from './eventClass'
import { todayLocalISO } from './time'

// A driver's answer to "are you going?" for one event (#235) — or, for an
// event that's over, "did you drive it?". Only the events they're going
// to (or went to) are theirs: My events, and the run group they're in.

export interface Rsvp {
  going: boolean
  /** The run group they're driving in, when they've said. */
  runGroup?: string
  updatedAt?: string
}

/** Every answer a driver has given, by event id. */
export type Rsvps = Record<string, Rsvp>

// Run-group ids are short names ("blue", "hpde-1"), set per event; the
// function doesn't look the event up, so this only keeps junk out.
const RUN_GROUP_ID = /^[^\s\u0000-\u001f]{1,60}$/

/** An answer as sent to the rsvps function, checked. */
export function cleanRsvp(body: unknown): { rsvp: Rsvp } | { error: string } {
  const b = body as { going?: unknown; runGroup?: unknown } | null
  if (!b || typeof b.going !== 'boolean') return { error: 'Say whether you’re going.' }
  if (b.runGroup === undefined || b.runGroup === null) return { rsvp: { going: b.going } }
  if (typeof b.runGroup !== 'string' || !RUN_GROUP_ID.test(b.runGroup)) return { error: 'Bad run group.' }
  // A run group only means something for someone who's going.
  return { rsvp: b.going ? { going: true, runGroup: b.runGroup } : { going: false } }
}

/**
 * Still waiting on their answer: an event that hasn't finished yet which
 * they haven't said they're going to or not. Past events they never
 * answered for are simply not theirs — nothing to chase.
 */
export function needsAnswer(event: EventConfig, rsvps: Rsvps, today: string = todayLocalISO()): boolean {
  return !rsvps[event.id] && classifyEvent(event, today) !== 'past'
}

/**
 * My events: the ones they're going to (or went to), plus the upcoming ones
 * still waiting on their answer — a new event shows up there, asking,
 * rather than staying out of sight until they happen to look at All.
 */
export function myEvents(events: EventConfig[], rsvps: Rsvps, today: string = todayLocalISO()): EventConfig[] {
  return events.filter(e => rsvps[e.id]?.going || needsAnswer(e, rsvps, today))
}

/** Their run group at this event, if they've said and it's still one of its groups. */
export function myRunGroup(event: EventConfig, rsvp: Rsvp | undefined): string | null {
  const id = rsvp?.going ? rsvp.runGroup : undefined
  return id && event.runGroups.some(g => g.id === id) ? id : null
}
