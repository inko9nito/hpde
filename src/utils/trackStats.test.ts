import { describe, it, expect } from 'vitest'
import { bestOnLayout, eventsOnLayout, gapToBest, layoutLabel, layoutLaps, layoutName, layoutSlug, layoutsOf, sameLayout, trackGroups, trackShortName } from './trackStats'
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

describe('track pages (#274)', () => {
  it('names a layout "MSRC 1.7 CW", and gives it an id for its page', () => {
    expect(layoutName(scca)).toBe('MSRC 1.7 CW')
    expect(layoutSlug(scca)).toBe('msrc-1-7-cw')
    expect(layoutSlug(tde)).toBe('msrc-1-7-cw')
    expect(layoutSlug(noDirection)).toBe('msrc-1-7')
    expect(layoutSlug(event('x', { trackId: undefined, track: 'Harris Hill', configuration: undefined, direction: 'CCW' })))
      .toBe('harris-hill-ccw')
    expect(layoutSlug(event('x', { trackId: undefined, track: undefined }))).toBeNull()
  })

  it('finds every event on the layout a page names, as the All time best card counts them', () => {
    const events = [scca, tde, ccw, noDirection, longCourse, ecr]
    expect(eventsOnLayout('msrc-1-7-cw', events)).toEqual([scca, tde])
    expect(eventsOnLayout('msrc-1-7-ccw', events)).toEqual([ccw])
    expect(eventsOnLayout('ecr-2-7-cw', events)).toEqual([ecr])
    expect(eventsOnLayout('nowhere', events)).toEqual([])
  })

  it('keeps an event whose layout is named only by its icon id', () => {
    const iconOnly = event('y', { track: undefined })
    expect(eventsOnLayout('msrc-1-7-cw', [iconOnly])).toEqual([iconOnly])
  })

  it('says how far a session’s best is off the all-time best', () => {
    expect(gapToBest(101_040, 98_540)).toBe('+2.5s')
    expect(gapToBest(98_580, 98_540)).toBe('+0.04s')
    expect(gapToBest(104_000, 101_000)).toBe('+3s')
    expect(gapToBest(98_540, 98_540)).toBeNull()
  })
})

describe('the Tracks tab (#274)', () => {
  const upcoming = event('2026-10-03_ecr', { track: 'Eagles Canyon Raceway', trackId: 'ecr-2-7', configuration: '2.7 mile', days: [{ id: 'd', label: 'Day', date: '2026-10-03', activities: [] }] })
  const noTrack = event('2026-04-01_x', { track: undefined, trackId: undefined })

  it('lists each layout once, the one with the latest event first', () => {
    const lastYear = { ...ccw, days: [{ id: 'd', label: 'Day', date: '2025-09-13', activities: [] }] }
    const layouts = layoutsOf([lastYear, scca, tde, upcoming, noTrack])
    expect(layouts.map(l => [l.slug, l.name, l.track, l.events.map(e => e.id)])).toEqual([
      ['ecr-2-7-cw', 'ECR 2.7 CW', 'Eagles Canyon Raceway', [upcoming.id]],
      ['msrc-1-7-cw', 'MSRC 1.7 CW', 'Motorsport Ranch - Cresson', [scca.id, tde.id]],
      ['msrc-1-7-ccw', 'MSRC 1.7 CCW', 'Motorsport Ranch - Cresson', [lastYear.id]],
    ])
  })

  it('groups the layouts by track, however it’s spelled, the track with the latest event first, its layouts A–Z (#314)', () => {
    const at = (e: EventConfig, date: string, city?: string) => ({ ...e, city, days: [{ id: 'd', label: 'Day', date, activities: [] }] })
    const layouts = layoutsOf([
      at(ccw, '2025-09-13', 'Cresson, TX'),
      at({ ...longCourse, track: 'Motorsport Ranch Cresson' }, '2025-11-07'),
      at(ecr, '2026-05-30', 'Decatur, TX'),
      at(scca, '2026-09-13', 'Cresson, TX'),
      at(event('2026-10-03_ecr', { ...ecr, direction: 'CCW' }), '2026-10-03', 'Decatur, TX'),
      at(event('2026-08-01_x', { track: undefined, trackId: 'xyz-1' }), '2026-08-01'),
    ])
    expect(trackGroups(layouts).map(g => [g.name, g.city, g.layouts.map(l => l.name)])).toEqual([
      ['Eagles Canyon Raceway', 'Decatur, TX', ['ECR 2.7 CCW', 'ECR 2.7 CW']],
      ['Motorsport Ranch - Cresson', 'Cresson, TX', ['MSRC 1.7 CCW', 'MSRC 1.7 CW', 'MSRC 3.1 CW']],
      ['XYZ', undefined, ['XYZ 1.7 CW']],
    ])
  })

  it('says which way round each layout is driven, when its events say (#307)', () => {
    const noWay = event('2025-11-07_msrc-3-1', { trackId: 'msrc-3-1', configuration: '3.1 mile', direction: undefined })
    const byName = (ls: ReturnType<typeof layoutsOf>) => ls.map(l => [l.name, l.direction]).sort()
    expect(byName(layoutsOf([scca, { ...ccw, direction: 'counterclockwise' }, noWay]))).toEqual([
      ['MSRC 1.7 CCW', 'ccw'],
      ['MSRC 1.7 CW', 'cw'],
      ['MSRC 3.1', undefined],
    ])
  })

  it('sums up the driver’s laps on a layout', () => {
    const [layout] = layoutsOf([scca, tde])
    const summary = [
      { eventId: scca.id, best: 99_000, sessions: 2 },
      { eventId: tde.id, best: 98_540, sessions: 1 },
      { eventId: ccw.id, best: 90_000, sessions: 3 },
    ]
    expect(layoutLaps(layout, summary)).toEqual({ best: 98_540, sessions: 3, events: 2 })
    expect(layoutLaps(layout, [])).toEqual({ sessions: 0, events: 0 })
  })
})
