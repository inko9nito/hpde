import { describe, it, expect, vi, afterEach } from 'vitest'
import { parseMinutes, formatTime, formatCountdown, findCurrentActivity, LAST_ACTIVITY_FALLBACK_MIN, todayLocalISO, formatDateRange, eventSubtitle } from './time'
import type { DaySchedule } from '../types'

function day(date: string): DaySchedule {
  return { id: date, label: date, date, activities: [] }
}

describe('parseMinutes', () => {
  it('converts "00:00" to 0', () => expect(parseMinutes('00:00')).toBe(0))
  it('converts "08:30" to 510', () => expect(parseMinutes('08:30')).toBe(510))
  it('converts "12:00" to 720', () => expect(parseMinutes('12:00')).toBe(720))
  it('converts "17:35" to 1055', () => expect(parseMinutes('17:35')).toBe(1055))
  it('converts "23:59" to 1439', () => expect(parseMinutes('23:59')).toBe(1439))
})

describe('formatTime', () => {
  it('formats midnight as "12:00"', () => expect(formatTime('00:00')).toBe('12:00'))
  it('formats "08:30" as "8:30"', () => expect(formatTime('08:30')).toBe('8:30'))
  it('formats "12:00" as "12:00"', () => expect(formatTime('12:00')).toBe('12:00'))
  it('formats "13:30" as "1:30"', () => expect(formatTime('13:30')).toBe('1:30'))
  it('formats "09:05" as "9:05"', () => expect(formatTime('09:05')).toBe('9:05'))
})

describe('findCurrentActivity', () => {
  const times = ['08:30', '09:00', '10:30', '11:00']

  it('returns -1 before the first activity', () => {
    expect(findCurrentActivity(times, parseMinutes('08:00'))).toEqual({ index: -1, progress: 0 })
  })
  it('returns index 0 at the very start of the first activity', () => {
    expect(findCurrentActivity(times, parseMinutes('08:30'))).toEqual({ index: 0, progress: 0 })
  })
  it('returns index 0 with progress at midpoint between 08:30 and 09:00', () => {
    const r = findCurrentActivity(times, parseMinutes('08:45'))
    expect(r.index).toBe(0)
    expect(r.progress).toBeCloseTo(0.5, 5)
  })
  it('flips to the next activity as soon as it starts', () => {
    expect(findCurrentActivity(times, parseMinutes('09:00'))).toEqual({ index: 1, progress: 0 })
  })
  it('progress on 09:00 → 10:30 activity goes 0.20 at 09:18', () => {
    const r = findCurrentActivity(times, parseMinutes('09:18'))
    expect(r.index).toBe(1)
    expect(r.progress).toBeCloseTo(18 / 90, 5)
  })
  it('uses the 30 min fallback for the last activity of the day', () => {
    const r = findCurrentActivity(times, parseMinutes('11:15'))
    expect(r.index).toBe(3)
    expect(r.progress).toBeCloseTo(0.5, 5)
  })
  it('returns -1 once the fallback duration has elapsed on the last activity', () => {
    expect(findCurrentActivity(times, parseMinutes('11:30'))).toEqual({ index: -1, progress: 0 })
  })
  it('LAST_ACTIVITY_FALLBACK_MIN is 30 (kept in sync with the widget)', () => {
    expect(LAST_ACTIVITY_FALLBACK_MIN).toBe(30)
  })
})

describe('formatCountdown', () => {
  it('returns "" for 0 minutes', () => expect(formatCountdown(0)).toBe(''))
  it('returns "" for negative minutes', () => expect(formatCountdown(-5)).toBe(''))
  it('formats 25 minutes as "25 min"', () => expect(formatCountdown(25)).toBe('25 min'))
  it('formats 59 minutes as "59 min"', () => expect(formatCountdown(59)).toBe('59 min'))
  it('formats 60 minutes as "1h"', () => expect(formatCountdown(60)).toBe('1h'))
  it('formats 65 minutes as "1h 5m"', () => expect(formatCountdown(65)).toBe('1h 5m'))
  it('formats 90 minutes as "1h 30m"', () => expect(formatCountdown(90)).toBe('1h 30m'))
  it('formats 120 minutes as "2h"', () => expect(formatCountdown(120)).toBe('2h'))
})

describe('formatDateRange', () => {
  it('returns "" for no days', () => expect(formatDateRange([])).toBe(''))

  it('formats a single day', () => {
    expect(formatDateRange([day('2026-06-06')])).toBe('Jun 6, 2026')
  })

  it('formats a range within the same month as "Mon D–D, YYYY"', () => {
    expect(formatDateRange([day('2026-09-11'), day('2026-09-12')])).toBe('Sep 11–12, 2026')
  })

  it('formats a range spanning months in the same year', () => {
    expect(formatDateRange([day('2025-11-28'), day('2025-12-02')])).toBe('Nov 28 – Dec 2, 2025')
  })

  it('formats a range spanning years', () => {
    expect(formatDateRange([day('2025-12-30'), day('2026-01-02')])).toBe('Dec 30, 2025 – Jan 2, 2026')
  })

  it('sorts unordered days before computing the range', () => {
    expect(formatDateRange([day('2026-09-12'), day('2026-09-11')])).toBe('Sep 11–12, 2026')
  })
})

describe('eventSubtitle', () => {
  it('uses the computed date range when no subtitle is set', () => {
    expect(eventSubtitle({ days: [day('2026-06-06')] })).toBe('Jun 6, 2026')
  })

  it('uses the explicit subtitle when set, ignoring the days', () => {
    expect(eventSubtitle({ subtitle: 'Test data, not a real event', days: [day('2000-01-01')] }))
      .toBe('Test data, not a real event')
  })
})

describe('todayLocalISO', () => {
  afterEach(() => vi.useRealTimers())

  it('formats today as YYYY-MM-DD using the LOCAL calendar', () => {
    // Pick a fixed instant. The result must reflect the runner's local
    // getFullYear/getMonth/getDate — not the UTC date, which is the
    // point of this helper.
    vi.useFakeTimers()
    const fixed = new Date(2026, 8, 10, 19, 59, 0) // 2026-09-10 19:59 local
    vi.setSystemTime(fixed)
    expect(todayLocalISO()).toBe('2026-09-10')
  })

  it('does not slip a day when local evening crosses UTC midnight', () => {
    // Pathological case that broke the old toISOString() approach: local
    // evening in a US timezone, where UTC has already ticked to the next
    // day. Constructing Date with local Y/M/D/h fields guarantees the
    // local getters return exactly those fields regardless of the
    // runner's timezone.
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 8, 10, 23, 30, 0))
    expect(todayLocalISO()).toBe('2026-09-10')
  })
})
