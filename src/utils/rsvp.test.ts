import { describe, it, expect } from 'vitest'
import { cleanRsvp, myEvents, myRunGroup, needsAnswer } from './rsvp'
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
  it('takes going or not, and a run group only for going', () => {
    expect(cleanRsvp({ going: true })).toEqual({ rsvp: { going: true } })
    expect(cleanRsvp({ going: true, runGroup: 'blue' })).toEqual({ rsvp: { going: true, runGroup: 'blue' } })
    expect(cleanRsvp({ going: true, runGroup: null })).toEqual({ rsvp: { going: true } })
    expect(cleanRsvp({ going: false, runGroup: 'blue' })).toEqual({ rsvp: { going: false } })
  })

  it('turns away anything else', () => {
    for (const body of [null, {}, { going: 'yes' }, { going: 1 }, { going: true, runGroup: '' }, { going: true, runGroup: 'a b' }]) {
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
    expect(needsAnswer(soon, { soon: { going: false } }, TODAY)).toBe(false)
  })

  it('holds the events they’re going to or went to, and the ones waiting on an answer', () => {
    const rsvps = { past: { going: true }, soon: { going: false } }
    expect(myEvents(events, rsvps, TODAY).map(e => e.id)).toEqual(['later', 'live', 'past'])
    expect(myEvents(events, { later: { going: false }, live: { going: false }, soon: { going: false } }, TODAY)).toEqual([])
  })

  it('knows their run group, if it’s still one of the event’s', () => {
    expect(myRunGroup(soon, { going: true, runGroup: 'blue' })).toBe('blue')
    expect(myRunGroup(soon, { going: true, runGroup: 'red' })).toBeNull()
    expect(myRunGroup(soon, { going: true })).toBeNull()
    expect(myRunGroup(soon, undefined)).toBeNull()
  })
})
