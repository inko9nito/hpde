import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LapSparkline } from './LapSparkline'

describe('LapSparkline (#477)', () => {
  it('draws the laps that count, slower higher as on the session chart, the best as a black dot and the average as a dashed line', () => {
    render(<LapSparkline laps={[{ ms: 130_000, kind: 'out' }, { ms: 102_000 }, { ms: 99_000 }, { ms: 101_000 }, { ms: 125_000, kind: 'in' }]} />)
    const svg = screen.getByRole('img', { name: 'Each lap’s time: 1:42, 1:39, 1:41' })
    const lap = svg.querySelector('[data-series="lap"]')!.getAttribute('d')!
    // Three points, the out and in laps left off.
    expect(lap.match(/[ML]/g)).toHaveLength(3)
    const ys = [...lap.matchAll(/[ML][\d.]+,([\d.]+)/g)].map(m => Number(m[1]))
    // The slowest lap at the top, the best at the bottom.
    expect(ys[0]).toBeLessThan(ys[2])
    expect(ys[2]).toBeLessThan(ys[1])
    const best = svg.querySelector('[data-series="best"]')!
    expect(Number(best.getAttribute('cy'))).toBeCloseTo(ys[1])
    expect(best).toHaveAttribute('fill', '#111827')
    // The average, 1:40.667, between the best and the slowest.
    const average = Number(svg.querySelector('[data-series="average"]')!.getAttribute('y1'))
    expect(average).toBeGreaterThan(ys[0])
    expect(average).toBeLessThan(ys[1])
  })

  it('counts out and in laps in the average line when the driver does (#480), and keeps it in the box', () => {
    const laps = [{ ms: 160_000, kind: 'out' as const }, { ms: 100_000 }, { ms: 99_000 }]
    render(<LapSparkline laps={laps} outLapsInAverage height={22} />)
    const svg = screen.getByRole('img')
    // The average, 1:59.667, is slower than either lap: the top of the box.
    const average = Number(svg.querySelector('[data-series="average"]')!.getAttribute('y1'))
    expect(average).toBeCloseTo(3.5)
    const ys = [...svg.querySelector('[data-series="lap"]')!.getAttribute('d')!.matchAll(/[ML][\d.]+,([\d.]+)/g)].map(m => Number(m[1]))
    expect(Math.max(...ys)).toBeLessThanOrEqual(22)
    expect(Math.min(...ys)).toBeGreaterThan(average)
  })

  it('draws nothing without a lap that counts', () => {
    const { container } = render(<LapSparkline laps={[{ ms: 130_000, kind: 'out' }]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
