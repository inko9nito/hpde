import { describe, it, expect } from 'vitest'
import { dayLabel, labelled, lapTicks, speedTicks } from './LapTrendChart'

describe('the track page’s chart (#274)', () => {
  it('ticks the lap times at clean steps, spanning every time', () => {
    expect(lapTicks(98_540, 110_000)).toEqual({ ticks: [95_000, 100_000, 105_000, 110_000], min: 95_000, max: 110_000 })
    // Times close together still get a couple of seconds, not a cliff.
    const close = lapTicks(99_000, 99_500)
    expect(close.max - close.min).toBeGreaterThanOrEqual(2000)
    expect(close.min).toBeLessThanOrEqual(99_000)
    expect(close.max).toBeGreaterThanOrEqual(99_500)
    expect(close.ticks.every(t => t % 500 === 0)).toBe(true)
  })

  it('ticks top speed on the lap times’ grid lines, at the least clean step spanning every speed (#298)', () => {
    expect(speedTicks(103.9, 106.6, 4)).toEqual({ ticks: [103, 104, 105, 106, 107], min: 103, max: 107 })
    expect(speedTicks(92, 106.6, 3)).toEqual({ ticks: [80, 90, 100, 110], min: 80, max: 110 })
    // One speed still gets a scale around it.
    expect(speedTicks(104.2, 104.2, 4)).toEqual({ ticks: [102, 103, 104, 105, 106], min: 102, max: 106 })
    // Never below zero.
    expect(speedTicks(6, 8, 4).min).toBeGreaterThanOrEqual(0)
  })

  it('dates as many points as there’s room for, and always the latest', () => {
    const texts = (n: number) => Array.from({ length: n }, () => 'Mar 15')
    expect(labelled([0, 50, 100, 150], texts(4))).toEqual([0, 1, 2, 3])
    expect(labelled([0, 30, 60, 90, 120], texts(5))).toEqual([0, 2, 4])
    expect(labelled([0, 30, 60, 90], texts(4))).toEqual([0, 3])
    expect(dayLabel('2025-11-07')).toBe('Nov 7')
  })
})
