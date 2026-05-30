import { describe, it, expect } from 'vitest'
import { parseMinutes, formatTime, formatCountdown } from './time'

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
