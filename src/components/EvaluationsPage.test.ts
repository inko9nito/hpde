import { describe, it, expect } from 'vitest'
import { NO_FILTERS, entryGroups, evaluationEntries, ranIn, filterChoices, filterEntries, layoutChoices, newestCardGroup, organizerOf, reportCardKinds, shownReportCards, unevaluatedEvents } from './EvaluationsPage'
import type { Entry } from './EvaluationsPage'
import type { EventConfig } from '../types'

const at = (id: string, ...dates: string[]): EventConfig => ({
  id, name: id, runGroups: [],
  days: dates.map((date, i) => ({ id: `d${i}`, label: 'Day', date, activities: [] })),
})

describe('events they went to with no evaluation yet (#345)', () => {
  const today = '2026-09-30'
  const events = [
    at('drove', '2026-06-01'),
    at('laps', '2026-05-01'),
    at('maybe', '2026-04-01'),
    at('not-going', '2026-03-01'),
    at('evaluated', '2026-07-01'),
    at('today', '2026-09-30'),
    at('next-month', '2026-10-20'),
    at('no-days'),
  ]
  const rsvps = {
    drove: { status: 'going' as const },
    maybe: { status: 'maybe' as const },
    'not-going': { status: 'not-going' as const },
    evaluated: { status: 'going' as const },
    today: { status: 'going' as const },
    'next-month': { status: 'going' as const },
    'no-days': { status: 'going' as const },
  }

  it('takes the begun ones they said they drove or have laps at, newest first, leaving out the evaluated', () => {
    expect(unevaluatedEvents(events, rsvps, new Set(['laps']), new Set(['evaluated']), today).map(e => e.id))
      .toEqual(['today', 'drove', 'laps'])
  })

  it('counts laps even when they said they weren’t going', () => {
    expect(unevaluatedEvents(events, rsvps, new Set(['not-going']), new Set(), today).map(e => e.id))
      .toEqual(['today', 'evaluated', 'drove', 'not-going'])
  })
})

describe('filtering the events, and so the report cards (#401)', () => {
  const group = (id: string, label: string) => ({ id, label, bgClass: 'bg-gray-500', textClass: 'text-white' })
  const ev = (id: string, date: string, organizer: string | undefined, groups: string[]): EventConfig => ({
    id, name: id, organizer, runGroups: groups.map(g => group(g.toLowerCase(), g)),
    days: [{ id: 'd0', label: 'Day', date, activities: [] }],
  })
  const greenDay = ev('green-day', '2025-07-19', 'The Drivers Edge', ['Green', 'Blue'])
  const blueDay = ev('blue-day', '2025-10-04', "The Driver's Edge", ['Green', 'Blue'])
  const unnamed = ev('TDE at ECR', '2025-11-01', undefined, ['Blue'])
  const scca = ev('scca', '2026-03-07', 'Texas Region SCCA', ['Red', 'Blue'])
  const none = ev('none', '2026-04-01', undefined, [])
  const entries: Entry[] = [
    { event: none, notes: null },
    { event: scca, notes: { eventId: 'scca', evaluation: { notes: 'Good day' }, sessions: [] } },
    { event: unnamed, notes: null },
    { event: blueDay, notes: { eventId: 'blue-day', evaluation: { card: 'blue', skills: { flags: 80 } }, sessions: [] } },
    { event: greenDay, notes: { eventId: 'green-day', evaluation: { skills: { flags: 60 } }, sessions: [] } },
  ]
  const rsvps = {
    'TDE at ECR': { status: 'going' as const, runGroup: 'blue' },
    scca: { status: 'going' as const, runGroup: 'red' },
  }

  it('names every TDE event’s organizer the same, however it’s spelled or if it isn’t set', () => {
    expect([greenDay, blueDay, unnamed, scca, none].map(organizerOf))
      .toEqual(['The Drivers Edge', 'The Drivers Edge', 'The Drivers Edge', 'Texas Region SCCA', ''])
  })

  it('knows the run group they were in from their answer, or the report card filled in', () => {
    expect(entries.map(e => entryGroups(e, rsvps))).toEqual([[], ['Red'], ['Blue'], ['Blue'], ['Green']])
  })

  it('counts a TDE level group — Purple, Orange, Pink — as the group of their report card by then', () => {
    const purple = (id: string, date: string, evaluation?: object): Entry => ({
      event: ev(id, date, 'The Drivers Edge', ['Purple', 'Orange']),
      notes: evaluation ? { eventId: id, evaluation, sessions: [] } : null,
    })
    const early = purple('early', '2025-01-01')
    const later = purple('later', '2026-05-30')
    const carded = purple('carded', '2026-06-06', { card: 'blue', skills: { flags: 90 } })
    const all = [...entries, early, later, carded]
    const going = { ...rsvps, early: { status: 'going' as const, runGroup: 'purple' }, later: { status: 'going' as const, runGroup: 'purple' }, carded: { status: 'going' as const, runGroup: 'purple' } }
    // Before any report card, Purple; after their Blue one (Oct 4), Blue; with a card of its own, that card's group.
    expect([early, later, carded].map(e => entryGroups(e, going, all))).toEqual([['Purple'], ['Blue'], ['Blue']])
    // Which they ran as, beside the group they were in.
    expect([early, later, carded].map(e => ranIn(e, going, all))).toEqual([[{ group: 'Purple' }], [{ group: 'Purple', as: 'Blue' }], [{ group: 'Purple', as: 'Blue' }]])
    expect(filterChoices(all, going, 'The Drivers Edge').groups).toEqual(['Green', 'Blue', 'Purple'])
    expect(filterEntries(all, going, { organizer: 'The Drivers Edge', group: 'blue' }).map(e => e.event.id)).toEqual(['TDE at ECR', 'blue-day', 'later', 'carded'])
  })

  it('offers each organizer, and then the run groups at the one picked — its own, so none with no organizer', () => {
    expect(filterChoices(entries, rsvps, null)).toEqual({ organizers: ['Texas Region SCCA', 'The Drivers Edge', ''], groups: [] })
    expect(filterChoices(entries, rsvps, 'The Drivers Edge').groups).toEqual(['Green', 'Blue'])
    expect(filterChoices(entries, rsvps, 'Texas Region SCCA').groups).toEqual(['Red'])
  })

  const ids = (f: Partial<typeof NO_FILTERS>) => filterEntries(entries, rsvps, { ...NO_FILTERS, ...f }).map(e => e.event.id)

  it('filters by organizer, then run group', () => {
    expect(ids({})).toEqual(['none', 'scca', 'TDE at ECR', 'blue-day', 'green-day'])
    expect(ids({ organizer: 'The Drivers Edge' })).toEqual(['TDE at ECR', 'blue-day', 'green-day'])
    expect(ids({ organizer: '' })).toEqual(['none'])
    expect(ids({ organizer: 'The Drivers Edge', group: 'blue' })).toEqual(['TDE at ECR', 'blue-day'])
    expect(ids({ organizer: 'Texas Region SCCA', group: 'red' })).toEqual(['scca'])
    // A run group is an organizer's own: none without one.
    expect(ids({ group: 'red' })).toEqual(ids({}))
  })

  it('picks the run group of their newest report card at first, if they’ve one at the organizer’s events', () => {
    expect(newestCardGroup(entries, rsvps, 'The Drivers Edge')).toBe('blue')
    expect(newestCardGroup(entries, rsvps, null)).toBeNull()
    expect(newestCardGroup(entries.filter(e => e.event !== blueDay), rsvps, 'The Drivers Edge')).toBe('green')
    expect(newestCardGroup(entries, rsvps, 'Texas Region SCCA')).toBeNull()
  })

  it('charts only the shown events’ report cards — with a run group picked, only its card — newest group first', () => {
    const all = shownReportCards(entries, null)
    expect(all.map(p => p.key)).toEqual(['blue-day', 'green-day'])
    expect(reportCardKinds(all).map(k => k.id)).toEqual(['blue', 'green'])
    expect(shownReportCards(entries, 'green').map(p => p.key)).toEqual(['green-day'])
    expect(shownReportCards(filterEntries(entries, rsvps, { ...NO_FILTERS, organizer: 'Texas Region SCCA' }), null)).toEqual([])
  })
})

describe('an event’s layout, among the events (#462)', () => {
  const on = (id: string, date: string, track: string, configuration?: string, direction?: string, trackId?: string): EventConfig => ({
    ...at(id, date), track, configuration, direction, trackId,
  })
  const msrc31 = on('msrc-31', '2025-11-07', 'Motorsport Ranch - Cresson', '3.1 mile', 'Counter-clockwise', 'msrc-3-1')
  // The same layout, spelled another way: its track page counts it.
  const msrc31b = on('msrc-31b', '2024-11-02', 'Motorsport Ranch - Cresson', '3.1', 'CCW')
  const msrc17 = on('msrc-17', '2025-09-13', 'Motorsport Ranch - Cresson', '1.7 mile', 'Clockwise', 'msrc-1-7')
  const ecr = on('ecr', '2025-10-04', 'Eagles Canyon Raceway', '2.7 mile', 'Clockwise', 'ecr-2-7')
  const next = on('next', '2026-11-20', 'Motorsport Ranch - Cresson', '3.1 mile', 'Counter-clockwise', 'msrc-3-1')
  const events = [next, msrc31, msrc17, ecr, msrc31b]
  const today = '2026-10-18'
  // An evaluation at one, laps at two, and a yes to the one coming up.
  const entries = evaluationEntries(
    [{ eventId: 'msrc-31', evaluation: { notes: 'Carry more speed' }, sessions: [] }],
    events, { next: { status: 'going' } }, new Set(['msrc-17', 'msrc-31b', 'ecr']), today,
  )

  it('lists the evaluated and the ones they went to, newest first — not one still to come', () => {
    expect(entries.map(e => e.event.id)).toEqual(['msrc-31', 'ecr', 'msrc-17', 'msrc-31b'])
    expect(entries[0].notes?.evaluation?.notes).toBe('Carry more speed')
    expect(entries[1].notes).toBeNull()
  })

  it('filters to a layout as its track page finds its events, however they’re spelled', () => {
    expect(filterEntries(entries, {}, { ...NO_FILTERS, layout: 'msrc-3-1-ccw' }, events).map(e => e.event.id)).toEqual(['msrc-31', 'msrc-31b'])
    expect(filterEntries(entries, {}, { ...NO_FILTERS, layout: 'ecr-2-7-cw' }, events).map(e => e.event.id)).toEqual(['ecr'])
    expect(filterEntries(entries, {}, NO_FILTERS, events)).toHaveLength(4)
  })

  it('offers each layout of theirs by name — and one picked from an event, if it isn’t among them', () => {
    // One with no track icon goes by its track's name, as on the Tracks tab.
    expect(layoutChoices(entries, events)).toEqual([
      { slug: 'ecr-2-7-cw', name: 'ECR 2.7 CW' },
      { slug: 'motorsport-ranch-cresson-3-1-ccw', name: 'Motorsport Ranch - Cresson 3.1 CCW' },
      { slug: 'msrc-1-7-cw', name: 'MSRC 1.7 CW' },
      { slug: 'msrc-3-1-ccw', name: 'MSRC 3.1 CCW' },
    ])
    expect(layoutChoices([], events, 'msrc-3-1-ccw')).toEqual([{ slug: 'msrc-3-1-ccw', name: 'MSRC 3.1 CCW' }])
    expect(layoutChoices([], events, 'nowhere')).toEqual([])
  })
})
