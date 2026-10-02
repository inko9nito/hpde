import { describe, it, expect } from 'vitest'
import { answerFor, cleanRsvp, droveIn, goingIds, myEvents, myRunGroup, needsAnswer } from './rsvp'
import type { EventConfig } from '../types'

const event = (id: string, date: string): EventConfig => ({
  id,
  name: id,
  runGroups: [{ id: 'blue', label: 'Blue', bgClass: 'bg-blue-500', textClass: 'text-white' }],
  days: [{ id: 'saturday', label: 'Saturday', date, activities: [] }],
})

const TODAY = '2026-09-28'
const past = event('past', '2026-09-01')
const live = event('live', TODAY)
const soon = event('soon', '2026-10-18')
const later = event('later', '2026-11-08')

describe('cleanRsvp (#235)', () => {
  it('takes going, maybe or not going, and a run group only for going or maybe', () => {
    expect(cleanRsvp({ status: 'going' })).toEqual({ rsvp: { status: 'going' } })
    expect(cleanRsvp({ status: 'going', runGroup: 'blue' })).toEqual({ rsvp: { status: 'going', runGroup: 'blue' } })
    expect(cleanRsvp({ status: 'maybe', runGroup: 'blue' })).toEqual({ rsvp: { status: 'maybe', runGroup: 'blue' } })
    expect(cleanRsvp({ status: 'going', runGroup: null })).toEqual({ rsvp: { status: 'going' } })
    expect(cleanRsvp({ status: 'not-going', runGroup: 'blue' })).toEqual({ rsvp: { status: 'not-going' } })
  })

  it('turns away anything else', () => {
    for (const body of [null, {}, { going: true }, { status: 'yes' }, { status: 'going', runGroup: '' }, { status: 'going', runGroup: 'a b' }]) {
      expect(cleanRsvp(body)).toHaveProperty('error')
    }
  })
})

describe('My events (#235)', () => {
  const events = [later, soon, live, past]

  it('asks about events that aren’t over and have no answer — not past ones', () => {
    expect(needsAnswer(soon, {}, TODAY)).toBe(true)
    expect(needsAnswer(live, {}, TODAY)).toBe(true)
    expect(needsAnswer(past, {}, TODAY)).toBe(false)
    expect(needsAnswer(soon, { soon: { status: 'maybe' } }, TODAY)).toBe(false)
  })

  it('holds the events they’re going to, went to or might go to, and the ones waiting on an answer', () => {
    const rsvps = { past: { status: 'going' as const }, soon: { status: 'not-going' as const }, live: { status: 'maybe' as const } }
    expect(myEvents(events, rsvps, TODAY).map(e => e.id)).toEqual(['later', 'live', 'past'])
    const none = { later: { status: 'not-going' as const }, live: { status: 'not-going' as const }, soon: { status: 'not-going' as const } }
    expect(myEvents(events, none, TODAY)).toEqual([])
  })

  it('once it’s over, a maybe is no answer: it only counts if they drove', () => {
    expect(answerFor(past, { past: { status: 'maybe' } }, TODAY)).toBeNull()
    expect(answerFor(soon, { soon: { status: 'maybe' } }, TODAY)).toBe('maybe')
    expect(myEvents([past], { past: { status: 'maybe' } }, TODAY)).toEqual([])
  })

  it('knows the events they said yes to — not a maybe, nor a no (#320)', () => {
    const rsvps = { past: { status: 'going' as const }, soon: { status: 'maybe' as const }, later: { status: 'not-going' as const }, live: { status: 'going' as const } }
    expect([...goingIds(events, rsvps, TODAY)].sort()).toEqual(['live', 'past'])
    expect(goingIds(events, {}, TODAY).size).toBe(0)
  })

  it('knows their run group, if it’s still one of the event’s', () => {
    expect(myRunGroup(soon, { status: 'going', runGroup: 'blue' })).toBe('blue')
    expect(myRunGroup(soon, { status: 'maybe', runGroup: 'blue' })).toBe('blue')
    expect(myRunGroup(soon, { status: 'not-going', runGroup: 'blue' })).toBeNull()
    expect(myRunGroup(soon, { status: 'going', runGroup: 'red' })).toBeNull()
    expect(myRunGroup(soon, { status: 'going' })).toBeNull()
    expect(myRunGroup(soon, undefined)).toBeNull()
  })
})

describe('droveIn (#377)', () => {
  it('is the group of their last session at the event, by day and time', () => {
    expect(droveIn([
      { date: '2023-09-23', time: '13:00', group: 'orange' },
      { date: '2023-09-23', time: '09:00', group: 'purple' },
      { date: '2023-09-23', time: '10:30', group: 'purple' },
    ])).toBe('orange')
    expect(droveIn([
      { date: '2025-10-05', time: '08:55', group: 'yellow' },
      { date: '2025-10-04', time: '16:40', group: 'blue' },
    ])).toBe('yellow')
    expect(droveIn([])).toBeUndefined()
  })
})
