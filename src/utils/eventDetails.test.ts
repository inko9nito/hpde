import { describe, it, expect } from 'vitest'
import { datesBetween, retimeDays } from './eventDetails'
import type { DaySchedule } from '../types'

const session = (time: string) => ({ time, type: 'session' as const, onTrack: ['red'] })

// Sat Oct 3 – Sun Oct 4, 2026, each with a schedule.
const weekend: DaySchedule[] = [
  { id: 'saturday', label: 'Saturday', date: '2026-10-03', activities: [session('08:00')] },
  { id: 'sunday', label: 'Sunday', date: '2026-10-04', activities: [session('09:00')] },
]

describe('datesBetween', () => {
  it('lists every date, both ends included, across a month end', () => {
    expect(datesBetween('2026-10-30', '2026-11-02')).toEqual(['2026-10-30', '2026-10-31', '2026-11-01', '2026-11-02'])
    expect(datesBetween('2026-10-03', '2026-10-03')).toEqual(['2026-10-03'])
  })
})

describe('retimeDays', () => {
  it('keeps the days as they are when the dates don’t change', () => {
    expect(retimeDays(weekend, '2026-10-03', '2026-10-04')).toEqual({ days: weekend, dropped: [] })
  })

  it('moves each day’s schedule with the event when it moves (rain date)', () => {
    const { days, dropped } = retimeDays(weekend, '2026-10-10', '2026-10-11')
    expect(days).toEqual([
      { ...weekend[0], date: '2026-10-10' },
      { ...weekend[1], date: '2026-10-11' },
    ])
    expect(dropped).toEqual([])
  })

  it('relabels weekday days that land on another weekday, and keeps custom labels', () => {
    const custom = [{ ...weekend[0], id: 'day-1', label: 'Day 1' }, weekend[1]]
    const { days } = retimeDays(custom, '2026-10-09', '2026-10-10')
    expect(days.map(d => [d.id, d.label, d.date])).toEqual([
      ['day-1', 'Day 1', '2026-10-09'],
      ['saturday', 'Saturday', '2026-10-10'],
    ])
    expect(days[1].activities).toEqual(weekend[1].activities)
  })

  it('adds an empty day when a day is added, leaving the others on their dates', () => {
    const { days, dropped } = retimeDays(weekend, '2026-10-02', '2026-10-04')
    expect(days).toEqual([
      { id: 'friday', label: 'Friday', date: '2026-10-02', activities: [] },
      ...weekend,
    ])
    expect(dropped).toEqual([])
  })

  it('reports the schedule of a day that’s taken away', () => {
    const { days, dropped } = retimeDays(weekend, '2026-10-03', '2026-10-03')
    expect(days).toEqual([weekend[0]])
    expect(dropped).toEqual([weekend[1]])
  })

  it('doesn’t report an empty day that’s taken away', () => {
    const empty = [weekend[0], { ...weekend[1], activities: [] }]
    expect(retimeDays(empty, '2026-10-03', '2026-10-03').dropped).toEqual([])
  })

  it('moves the schedules from the first day on when the event moves and changes length', () => {
    const { days, dropped } = retimeDays(weekend, '2026-10-17', '2026-10-17')
    expect(days).toEqual([{ ...weekend[0], date: '2026-10-17' }])
    expect(dropped).toEqual([weekend[1]])
  })

  it('keeps day ids distinct when a custom id matches a weekday’s', () => {
    const odd = [{ id: 'friday', label: 'Practice', date: '2026-10-03', activities: [] }]
    const { days } = retimeDays(odd, '2026-10-02', '2026-10-03')
    expect(days.map(d => d.id)).toEqual(['friday', 'friday-2026-10-03'])
  })
})
