import { describe, it, expect } from 'vitest'
import { classifyEvent, partitionEvents, firstDate, lastDate } from './eventClass'
import type { EventConfig } from '../types'

function ev(id: string, dates: string[]): EventConfig {
  return {
    id,
    name: id,
    runGroups: [],
    days: dates.map(date => ({ id: date, label: date, date, activities: [] })),
  }
}

describe('classifyEvent', () => {
  const today = '2026-09-19'

  it('is live when any day matches today', () => {
    expect(classifyEvent(ev('a', ['2026-09-18', '2026-09-19']), today)).toBe('live')
    expect(classifyEvent(ev('a', ['2026-09-19']), today)).toBe('live')
  })

  it('is upcoming when every day is strictly after today', () => {
    expect(classifyEvent(ev('a', ['2026-09-20']), today)).toBe('upcoming')
    expect(classifyEvent(ev('a', ['2026-09-20', '2026-09-21']), today)).toBe('upcoming')
  })

  it('is past when every day is strictly before today', () => {
    expect(classifyEvent(ev('a', ['2026-09-18']), today)).toBe('past')
    expect(classifyEvent(ev('a', ['2026-09-17', '2026-09-18']), today)).toBe('past')
  })

  it('treats a straddling event without today as past (last day is over)', () => {
    // Practically shouldn't happen for a single event, but the rule is
    // "no day today AND not entirely in the future" -> past.
    expect(classifyEvent(ev('a', ['2026-09-18', '2026-09-20']), today)).toBe('past')
  })
})

describe('firstDate / lastDate', () => {
  it('finds the earliest and latest day.date', () => {
    const e = ev('a', ['2026-09-13', '2026-09-11', '2026-09-12'])
    expect(firstDate(e)).toBe('2026-09-11')
    expect(lastDate(e)).toBe('2026-09-13')
  })
})

describe('partitionEvents', () => {
  const today = '2026-09-19'
  const live = ev('live', ['2026-09-19'])
  const upSoon = ev('up-soon', ['2026-09-25'])
  const upLater = ev('up-later', ['2026-10-10'])
  const pastRecent = ev('past-recent', ['2026-09-15'])
  const pastOld = ev('past-old', ['2025-11-07'])

  it('groups events by status', () => {
    const { live: L, upcoming, past } = partitionEvents([upLater, pastOld, live, pastRecent, upSoon], today)
    expect(L.map(e => e.id)).toEqual(['live'])
    expect(upcoming.map(e => e.id)).toEqual(['up-soon', 'up-later'])
    expect(past.map(e => e.id)).toEqual(['past-recent', 'past-old'])
  })

  it('sorts upcoming ascending by first date, past descending by last date', () => {
    const { upcoming, past } = partitionEvents([upLater, upSoon, pastOld, pastRecent], today)
    expect(upcoming.map(e => e.id)).toEqual(['up-soon', 'up-later'])
    expect(past.map(e => e.id)).toEqual(['past-recent', 'past-old'])
  })
})
