import { describe, it, expect } from 'vitest'
import { LEFT_OUT_NOTE, cleanRead, lapsFromRead, matchSession, minutesOff, slotsOn } from './lapImport'
import type { EventConfig, ScheduleActivity } from '../types'

const session = (time: string, sessionNumber: number, ...onTrack: string[]): ScheduleActivity =>
  ({ time, type: 'session', sessionNumber, onTrack })

// Saturday at TDE at MSR 3.1 CCW, Nov 2026: the weekend the sample
// screenshots are from (#472).
const EVENT: EventConfig = {
  id: '2026-11-20_tde-at-msr-3-1-ccw',
  name: 'TDE at MSR 3.1 CCW',
  runGroups: ['instructors', 'red', 'green', 'yellow', 'blue'].map(id => ({ id, label: id, bgClass: '', textClass: '' })),
  days: [{
    id: 'saturday', label: 'Saturday', date: '2026-11-21',
    activities: [
      { time: '08:00', type: 'general', label: 'Mandatory drivers meeting' },
      { time: '08:30', type: 'general', label: 'Track goes hot' },
      session('08:30', 1, 'instructors'),
      session('08:55', 1, 'red'),
      session('09:20', 1, 'green'),
      session('09:45', 1, 'yellow'),
      session('10:10', 1, 'blue'),
      { type: 'break', label: 'Break (5 min)' },
      session('10:40', 2, 'instructors'),
      session('11:05', 2, 'red'),
      session('11:30', 2, 'green'),
      session('11:55', 2, 'yellow'),
      session('12:20', 2, 'blue'),
      { time: '12:45', type: 'lunch', label: 'Lunch / Lead-follow laps' },
      session('13:15', 3, 'red', 'green'),
      session('17:05', 4, 'instructors'),
      { time: '17:30', type: 'general', label: 'Track goes cold' },
    ],
  }],
}

const read = (start: string, date = '2026-11-21') => ({ date, start, laps: [] })

describe('matchSession (#472)', () => {
  describe('in their own group', () => {
    it('takes their session that starts nearest the timer', () => {
      expect(matchSession(EVENT, read('09:21'), ['green'])).toEqual({
        slot: { key: '2026-11-21 09:20 green', date: '2026-11-21', time: '09:20', group: 'green', sessionNumber: 1 },
      })
      expect(matchSession(EVENT, read('11:32'), ['green'])).toMatchObject({ slot: { time: '11:30', sessionNumber: 2 } })
    })

    it('takes a session that went out early, or late: not another group’s on track then', () => {
      // Afternoon sessions 15 minutes early: Red's was on the schedule then.
      expect(matchSession(EVENT, read('13:02'), ['green'])).toMatchObject({ slot: { key: '2026-11-21 13:15 green' } })
      // As near lunch as the session: the session.
      expect(matchSession(EVENT, read('13:00'), ['green'])).toMatchObject({ slot: { key: '2026-11-21 13:15 green' } })
      expect(matchSession(EVENT, read('11:52'), ['green'])).toMatchObject({ slot: { time: '11:30', group: 'green' } })
      expect(matchSession(EVENT, read('09:00'), ['green'])).toMatchObject({ slot: { time: '09:20' } })
      expect(matchSession(EVENT, read('08:59'), ['green'])).toEqual({ reason: 'no-session' })
    })

    it('takes lunch, for lead-follow laps, titled with its line', () => {
      expect(matchSession(EVENT, read('12:56'), ['green'])).toEqual({
        slot: { key: '2026-11-21 12:45 green', date: '2026-11-21', time: '12:45', group: 'green', label: 'Lunch / Lead-follow laps' },
      })
    })

    it('finds none of theirs far from any of their sessions', () => {
      expect(matchSession(EVENT, read('16:00'), ['green'])).toEqual({ reason: 'no-session' })
      // Red and Green's 13:15 isn't theirs, and isn't taken for them.
      expect(matchSession(EVENT, read('13:20'), ['blue'])).toEqual({ reason: 'no-session' })
      expect(matchSession(EVENT, read('15:00'), ['blue'])).toEqual({ reason: 'no-session' })
    })
  })

  describe('with no group to go by', () => {
    it('takes the session on track when the timer started', () => {
      expect(matchSession(EVENT, read('09:21'))).toMatchObject({ slot: { time: '09:20', group: 'green', sessionNumber: 1 } })
      expect(matchSession(EVENT, read('09:16'))).toMatchObject({ slot: { time: '09:20', group: 'green' } })
      expect(matchSession(EVENT, read('09:14'))).toMatchObject({ slot: { time: '08:55', group: 'red' } })
      expect(matchSession(EVENT, read('13:20'))).toMatchObject({ slot: { group: 'red' } })
    })

    it('finds none once the next line has started', () => {
      expect(matchSession(EVENT, read('12:56'))).toEqual({ reason: 'no-session' })
      expect(matchSession(EVENT, read('07:50'))).toEqual({ reason: 'no-session' })
      expect(matchSession(EVENT, read('17:20'))).toMatchObject({ slot: { time: '17:05', group: 'instructors' } })
      expect(matchSession(EVENT, read('17:40'))).toEqual({ reason: 'no-session' })
    })
  })

  it('says why when there’s nothing to match by', () => {
    expect(matchSession(EVENT, { start: '09:21', laps: [] })).toEqual({ reason: 'no-date' })
    expect(matchSession(EVENT, { date: '2026-11-21', laps: [] })).toEqual({ reason: 'no-start' })
    expect(matchSession(EVENT, read('09:21', '2026-11-22'))).toEqual({ reason: 'not-this-event' })
  })
})

describe('slotsOn', () => {
  it('lists every group’s session on the day, and lunch for every group, in schedule order', () => {
    const slots = slotsOn(EVENT, '2026-11-21')
    expect(slots.filter(s => s.label).map(s => s.key)).toEqual(EVENT.runGroups.map(g => `2026-11-21 12:45 ${g.id}`))
    expect(slots.map(s => s.key).slice(-3)).toEqual(['2026-11-21 13:15 red', '2026-11-21 13:15 green', '2026-11-21 17:05 instructors'])
    expect(slots).toHaveLength(13 + EVENT.runGroups.length)
    expect(slotsOn(EVENT, '2026-11-22')).toEqual([])
  })
})

describe('minutesOff', () => {
  it('is negative for a session that went out early', () => {
    expect(minutesOff({ time: '15:45' }, '15:32')).toBe(-13)
    expect(minutesOff({ time: '09:20' }, '09:21')).toBe(1)
  })
})

describe('cleanRead', () => {
  it('keeps what’s in the form asked for', () => {
    expect(cleanRead({ date: '2026-11-21', start: '09:21', laps: [{ ms: 233160, counted: true }, { ms: 338570, counted: false }] }))
      .toEqual({ date: '2026-11-21', start: '09:21', laps: [{ ms: 233160, counted: true }, { ms: 338570, counted: false }] })
  })

  it('leaves out anything else, never guessing', () => {
    expect(cleanRead({ date: 'Nov 21', start: '9:21 AM', laps: [{ ms: 5_000 }, { ms: 'x' }, null, { ms: 100_000.4 }, { ms: 11 * 60_000 }] }))
      .toEqual({ laps: [{ ms: 100_000, counted: true }] })
    expect(cleanRead({ date: '2026-11-21' })).toBeNull()
    expect(cleanRead('laps')).toBeNull()
  })
})

describe('lapsFromRead', () => {
  it('makes a lap the timer left out an out lap first, an in lap after', () => {
    expect(lapsFromRead([
      { ms: 200_000, counted: false },
      { ms: 180_000, counted: true },
      { ms: 300_000, counted: false },
      { ms: 181_000, counted: true },
    ])).toEqual([
      { ms: 200_000, kind: 'out', note: LEFT_OUT_NOTE },
      { ms: 180_000 },
      { ms: 300_000, kind: 'in', note: LEFT_OUT_NOTE },
      { ms: 181_000 },
    ])
  })
})
