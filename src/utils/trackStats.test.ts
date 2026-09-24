import { describe, it, expect } from 'vitest'
import { bestOnLayout, layoutLabel, sameLayout, trackShortName } from './trackStats'
import type { EventConfig } from '../types'

const event = (id: string, fields: Partial<EventConfig> = {}): EventConfig => ({
  id, name: id, runGroups: [], days: [{ id: 'd', label: 'Day', date: '2026-09-13', activities: [] }],
  track: 'Motorsport Ranch - Cresson', trackId: 'msrc-1-7', configuration: '1.7 mile', direction: 'Clockwise',
  ...fields,
})

const scca = event('2026-09-13_msr-scca')
const tde = event('2026-09-11_msrc-1-7', { configuration: '1.7', direction: 'CW', track: 'Motorsport Ranch Cresson' })
const ccw = event('2025-09-13_msrc-1-7', { direction: 'Counter-clockwise' })
const noDirection = event('2026-06-06_msrc-1-7', { direction: undefined })
const longCourse = event('2025-11-07_msrc-3-1', { trackId: 'msrc-3-1', configuration: '3.1 mile' })
const ecr = event('2026-05-30_ecr-2-7', { track: 'Eagles Canyon Raceway', trackId: 'ecr-2-7', configuration: '2.7 mile' })

describe('sameLayout', () => {
  it('matches track, configuration and direction however they’re spelled', () => {
    expect(sameLayout(scca, tde)).toBe(true)
  })

  it('tells apart directions, configurations and tracks', () => {
    expect(sameLayout(scca, ccw)).toBe(false)
    expect(sameLayout(scca, noDirection)).toBe(false)
    expect(sameLayout(scca, longCourse)).toBe(false)
    expect(sameLayout(scca, ecr)).toBe(false)
  })

  it('never matches an event with no track', () => {
    const bare = event('x', { track: undefined })
    expect(sameLayout(bare, bare)).toBe(false)
  })
})

describe('labels', () => {
  it('shortens the track from its icon id, and the layout to "1.7 CW"', () => {
    expect(trackShortName(scca)).toBe('MSRC')
    expect(layoutLabel(scca)).toBe('1.7 CW')
    expect(layoutLabel(ccw)).toBe('1.7 CCW')
    expect(layoutLabel(noDirection)).toBe('1.7')
  })

  it('falls back to the track’s name, and to nothing', () => {
    expect(trackShortName(event('x', { trackId: undefined, track: 'Harris Hill' }))).toBe('Harris Hill')
    expect(trackShortName(event('x', { trackId: undefined, track: undefined }))).toBeNull()
    expect(layoutLabel(event('x', { configuration: undefined, direction: undefined }))).toBeNull()
  })
})

describe('bestOnLayout', () => {
  const events = [scca, tde, ccw, ecr]

  it('takes the best across events on the same layout, this one’s from the screen', () => {
    const summary = [
      { eventId: tde.id, best: 99_000, sessions: 3 },
      { eventId: ccw.id, best: 90_000, sessions: 1 },
      { eventId: ecr.id, best: 80_000, sessions: 2 },
      // Stale: this event's own laps come from the screen.
      { eventId: scca.id, best: 95_000, sessions: 1 },
    ]
    expect(bestOnLayout(scca, events, summary, 101_000)).toEqual({ best: 99_000, events: 2 })
    expect(bestOnLayout(scca, events, summary, 98_500)).toEqual({ best: 98_500, events: 2 })
    expect(bestOnLayout(scca, events, summary, undefined)).toEqual({ best: 99_000, events: 1 })
  })

  it('skips events it doesn’t know, and events with no best', () => {
    const summary = [{ eventId: 'gone', best: 50_000, sessions: 1 }, { eventId: tde.id, sessions: 1 }]
    expect(bestOnLayout(scca, events, summary, undefined)).toEqual({ events: 0 })
    expect(bestOnLayout(scca, events, summary, 101_000)).toEqual({ best: 101_000, events: 1 })
  })
})
