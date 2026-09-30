import { describe, it, expect, beforeEach } from 'vitest'
import handler from '../functions/events.mts'
import { fakeBlobs } from './fakeBlobs'
import { IMPORTED_KEY, SCHEDULES_ADDED, buildPastEvents, scheduleAddedKey } from './pastEvents.mjs'
import { MOVED_SESSIONS } from '../functions/laps.mts'
import { TEST_ACCOUNT_LAPS } from '../../src/data/fixtures/testAccountLaps'

const blobs = fakeBlobs()
const store = blobs.data('site:events')
const meta = blobs.data('site:events-meta')
const history = blobs.data('site:events-history')

const get = (context: unknown = {}) =>
  handler(new Request('https://site.example/api/events'), context, { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore })
const ids = async (context?: unknown) => (await (await get(context)).json()).events.map((e: { id: string }) => e.id).sort()

const sessions = (e: { days: { date: string; activities: { time?: string; type: string; onTrack?: string[] }[] }[] }) =>
  e.days.flatMap(d => d.activities.flatMap(a => a.type === 'session' ? [`${d.date} ${a.time} ${a.onTrack!.join()}`] : []))

const PAST = ['2025-07-19_tde-at-ecr-2-7-cw', '2025-09-13_tde-at-msrc-1-7-ccw', '2025-10-04_tde-at-ecr-2-7-ccw']

describe('past events (#310)', () => {
  beforeEach(() => blobs.clear())

  it('are built like the app’s own: details, days, and one run group’s sessions', () => {
    const events = buildPastEvents()
    expect(events.map(e => e.id)).toEqual(PAST)
    const [july, september] = events
    expect(july).toMatchObject({ name: 'TDE at ECR 2.7 CW', trackId: 'ecr-2-7', direction: 'Clockwise', organizer: 'The Drivers Edge' })
    expect(september).toMatchObject({ trackId: 'msrc-1-7', direction: 'Counter-clockwise' })

    expect(sessions(july)).toEqual(['2025-07-19 09:20 orange', '2025-07-19 13:00 orange', '2025-07-19 15:25 orange'])
    expect(sessions(september)).toHaveLength(5)
    expect(july.runGroups).toEqual([{ id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }])
  })

  it('Oct 4–5 has the organizer’s schedule (#339)', () => {
    const october = buildPastEvents()[2]
    expect(october.days.map(d => d.date)).toEqual(['2025-10-04', '2025-10-05'])
    expect(october.runGroups.map(g => [g.id, g.bgClass])).toEqual([
      ['instructors', 'bg-zinc-900'], ['red', 'bg-runred-500'], ['green', 'bg-rungreen-500'],
      ['yellow', 'bg-runyellow-500'], ['blue', 'bg-runblue-500'],
    ])
    const [saturday, sunday] = october.days
    // As the organizer's sheet has it: sessions numbered by block.
    const out = (day: typeof saturday) => day.activities.flatMap(a =>
      a.type === 'session' ? [`${a.sessionNumber} ${a.time} ${a.onTrack.join()}${a.inClass ? ` / ${a.inClass.join()}` : ''}`] : [])
    expect(out(saturday)).toEqual([
      '1 08:30 instructors / green', '1 08:55 red / blue', '1 09:20 green', '1 09:45 yellow / green', '1 10:10 blue / yellow,red',
      '2 10:40 instructors', '2 11:05 red', '2 11:30 green', '2 11:55 yellow / green', '2 12:20 blue',
      '3 13:15 red / blue', '3 13:40 green', '3 14:05 yellow / green', '3 14:30 blue / yellow,red', '3 14:55 instructors',
      '4 15:25 red', '4 15:50 green', '4 16:15 yellow', '4 16:40 blue', '4 17:05 instructors',
    ])
    expect(out(sunday)).toEqual([
      '1 08:30 instructors / green', '1 08:55 red / blue', '1 09:20 green', '1 09:45 yellow / green', '1 10:10 blue / yellow,red',
      '2 10:40 instructors', '2 11:05 red', '2 11:30 green', '2 11:55 yellow', '2 12:20 blue',
      '3 13:15 instructors', '3 13:40 red / blue', '3 14:05 green', '3 14:30 yellow / green', '3 14:55 blue / yellow,red',
      '4 15:25 red', '4 15:45 green', '4 16:05 yellow', '4 16:30 blue',
    ])
    const others = (day: typeof saturday) => day.activities.flatMap(a =>
      a.type === 'session' ? [] : [a.type === 'break' ? `break ${a.label}` : `${a.time} ${a.type} ${a.label}`])
    expect(others(saturday)).toEqual([
      '06:30 general Track gates open', '07:15 general Drivers sign in', '07:30 general Instructor meeting',
      '08:00 general Drivers meeting', '08:30 general Track goes hot', 'break Break (5 min)',
      '12:45 lunch Lunch / Lead-follow laps', 'break Break (5 min)', '17:30 general Track cold',
    ])
    expect(others(sunday)).toContain('07:10 general Church service')
  })

  it('are added on the first read, once: one deleted afterwards stays deleted', async () => {
    store.set('2026-09-13_msr-scca', { id: '2026-09-13_msr-scca', name: 'Live', runGroups: [], days: [] })
    expect(await ids()).toEqual([...PAST, '2026-09-13_msr-scca'])
    expect(store.get(PAST[0])).toMatchObject({ importedAt: expect.any(String) })
    expect(meta.get(IMPORTED_KEY)).toMatchObject({ imported: PAST })

    store.delete(PAST[0])
    expect(await ids()).toEqual([...PAST.slice(1), '2026-09-13_msr-scca'])
  })

  it('leave an event already stored under the same id alone', async () => {
    const edited = { id: PAST[1], name: 'Renamed', runGroups: [], days: [] }
    store.set(PAST[1], edited)
    await get()
    expect(store.get(PAST[1])).toEqual(edited)
    expect(meta.get(IMPORTED_KEY)).toMatchObject({ imported: [PAST[0], PAST[2]] })
  })

  it('on a deploy preview, come after its copy of the live events, in its own store', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    store.set('2026-09-13_msr-scca', { id: '2026-09-13_msr-scca', name: 'Live', runGroups: [], days: [] })
    expect(await ids(preview)).toEqual([...PAST, '2026-09-13_msr-scca'])
    // The live store is untouched.
    expect([...store.keys()]).toEqual(['2026-09-13_msr-scca'])
    expect(meta.size).toBe(0)
  })

  it('have the test account’s laps on their own sessions (#309)', () => {
    for (const event of buildPastEvents()) {
      const slots = new Set(event.days.flatMap(d => d.activities.flatMap(a =>
        a.type === 'session' ? a.onTrack.map(g => `${d.date} ${a.time} ${g}`) : [])))
      const laps = TEST_ACCOUNT_LAPS.find(e => e.eventId === event.id)
      expect(laps, event.id).toBeDefined()
      for (const key of Object.keys(laps!.sessions)) expect(slots, key).toContain(key)
    }
  })

  it('where one has laps logged at another time, they move to its session (#339)', () => {
    for (const { eventId, moves } of MOVED_SESSIONS) {
      const event = buildPastEvents().find(e => e.id === eventId)!
      const numbered = event.days.flatMap(d => d.activities.flatMap(a =>
        a.type === 'session' ? a.onTrack.map(g => `${d.date} ${a.time} ${g} #${a.sessionNumber}`) : []))
      for (const m of moves) expect(numbered).toContain(`${m.date} ${m.to} ${m.group} #${m.sessionNumber}`)
      const laps = TEST_ACCOUNT_LAPS.find(e => e.eventId === eventId)!
      expect(Object.values(laps.sessions).map(s => `${s.date} ${s.time} ${s.group} #${s.sessionNumber}`))
        .toEqual(expect.arrayContaining(moves.map(m => `${m.date} ${m.to} ${m.group} #${m.sessionNumber}`)))
    }
  })
})

describe('schedules found after an event was added (#339)', () => {
  const [added] = SCHEDULES_ADDED
  const october = () => buildPastEvents().find(e => e.id === added.id)!
  // The event as #310 added it, before its schedule was found.
  const asAdded = {
    ...october(),
    runGroups: [{ id: 'blue', label: 'Blue', bgClass: 'bg-runblue-500', textClass: 'text-white' }],
    days: [
      { id: 'saturday', label: 'Saturday', date: '2025-10-04', activities: [{ time: '10:10', type: 'session', sessionNumber: 1, onTrack: ['blue'] }] },
      { id: 'sunday', label: 'Sunday', date: '2025-10-05', activities: [{ time: '12:20', type: 'session', sessionNumber: 1, onTrack: ['blue'] }] },
    ],
    importedAt: '2026-09-28T02:57:24.123Z',
  }
  beforeEach(() => {
    blobs.clear()
    meta.set(IMPORTED_KEY, { at: 'then', imported: PAST })
  })

  it('gives the stored event the organizer’s schedule, once, keeping the rest and the old one in history', async () => {
    store.set(added.id, asAdded)
    await get()
    const { runGroups, days } = october()
    expect(store.get(added.id)).toEqual({ ...asAdded, runGroups, days, scheduleAddedAt: expect.any(String) })
    expect([...history.values()]).toEqual([asAdded])
    expect(meta.get(scheduleAddedKey(added))).toMatchObject({ outcome: 'updated' })

    // Once: put back afterwards, it stays as it's put.
    store.set(added.id, asAdded)
    await get()
    expect(store.get(added.id)).toEqual(asAdded)
  })

  it('leaves one edited in the app since, or deleted, alone', async () => {
    const edited = { ...asAdded, updatedAt: '2026-09-29T00:00:00.000Z' }
    store.set(added.id, edited)
    await get()
    expect(store.get(added.id)).toEqual(edited)
    expect(meta.get(scheduleAddedKey(added))).toMatchObject({ outcome: 'edited' })

    blobs.clear()
    meta.set(IMPORTED_KEY, { at: 'then', imported: PAST })
    await get()
    expect(store.has(added.id)).toBe(false)
    expect(meta.get(scheduleAddedKey(added))).toMatchObject({ outcome: 'missing' })
  })

  it('has nothing to do in a store that added the event with it', async () => {
    blobs.clear()
    await get()
    expect(store.get(added.id)).toMatchObject({ runGroups: october().runGroups, days: october().days })
    expect(history.size).toBe(0)
    expect(meta.get(scheduleAddedKey(added))).toMatchObject({ outcome: 'current' })
  })

  it('on a deploy preview, updates its own copy, not the live event', async () => {
    store.set(added.id, asAdded)
    await get({ deploy: { context: 'deploy-preview' } })
    expect(blobs.data('deploy:events').get(added.id)).toMatchObject({ days: october().days })
    expect(store.get(added.id)).toEqual(asAdded)
  })
})
