import type { EventConfig } from '../types'
import { classifyEvent } from './eventClass'
import { todayLocalISO } from './time'

// A driver's answer to "are you going?" for one event (#235): going, maybe
// (not decided yet, or on the waiting list) or not going — or, for an
// event that's over, whether they drove it. The events they're going to,
// or might be, are theirs: My events, and the run group they're in.

export type RsvpStatus = 'going' | 'maybe' | 'not-going'

export const RSVP_STATUSES: readonly RsvpStatus[] = ['going', 'maybe', 'not-going']

export interface Rsvp {
  status: RsvpStatus
  /** The run group they're driving in, when they've said. */
  runGroup?: string
  updatedAt?: string
}

/** Every answer a driver has given, by event id. */
export type Rsvps = Record<string, Rsvp>

// Run-group ids are short names ("blue", "hpde-1"), set per event; the
// function doesn't look the event up, so this only keeps junk out.
const RUN_GROUP_ID = /^[^\s\u0000-\u001f]{1,60}$/

function isStatus(v: unknown): v is RsvpStatus {
  return RSVP_STATUSES.includes(v as RsvpStatus)
}

/** An answer as sent to the rsvps function, checked. */
export function cleanRsvp(body: unknown): { rsvp: Rsvp } | { error: string } {
  const b = body as { status?: unknown; runGroup?: unknown } | null
  if (!b || !isStatus(b.status)) return { error: 'Say whether you’re going.' }
  if (b.runGroup === undefined || b.runGroup === null) return { rsvp: { status: b.status } }
  if (typeof b.runGroup !== 'string' || !RUN_GROUP_ID.test(b.runGroup)) return { error: 'Bad run group.' }
  // A run group only means something for someone who might drive.
  return { rsvp: b.status === 'not-going' ? { status: b.status } : { status: b.status, runGroup: b.runGroup } }
}

/**
 * What they've said about this event, as it stands: once it's over, a
 * "maybe" never became an answer, so it's none — a past event is theirs
 * only if they drove it.
 */
export function answerFor(event: EventConfig, rsvps: Rsvps, today: string = todayLocalISO()): RsvpStatus | null {
  const status = rsvps[event.id]?.status ?? null
  if (status === 'maybe' && classifyEvent(event, today) === 'past') return null
  return status
}

/**
 * Still waiting on their answer: an event that hasn't finished yet which
 * they haven't answered for. Past events they never answered for are
 * simply not theirs — nothing to chase.
 */
export function needsAnswer(event: EventConfig, rsvps: Rsvps, today: string = todayLocalISO()): boolean {
  return !rsvps[event.id] && classifyEvent(event, today) !== 'past'
}

/**
 * My events: the ones they're going to (or went to) or might go to, plus
 * the upcoming ones still waiting on their answer — a new event shows up
 * there, asking, rather than staying out of sight until they happen to
 * look at All.
 */
export function myEvents(events: EventConfig[], rsvps: Rsvps, today: string = todayLocalISO()): EventConfig[] {
  return events.filter(e => {
    const answer = answerFor(e, rsvps, today)
    return answer === 'going' || answer === 'maybe' || needsAnswer(e, rsvps, today)
  })
}

/** Their run group at this event, if they've said and it's still one of its groups. */
export function myRunGroup(event: EventConfig, rsvp: Rsvp | undefined): string | null {
  const id = rsvp && rsvp.status !== 'not-going' ? rsvp.runGroup : undefined
  return id && event.runGroups.some(g => g.id === id) ? id : null
}
