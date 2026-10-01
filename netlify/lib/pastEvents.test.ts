import { describe, it, expect, beforeEach } from 'vitest'
import handler from '../functions/events.mts'
import { fakeBlobs } from './fakeBlobs'
import { PAST_IMPORTS, SCHEDULES_ADDED, buildPastEvents, scheduleAddedKey } from './pastEvents.mjs'
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

// #310's, with laps; and #373's, from before them, without.
const WITH_LAPS = ['2025-07-19_tde-at-ecr-2-7-cw', '2025-09-13_tde-at-msrc-1-7-ccw', '2025-10-04_tde-at-ecr-2-7-ccw']
const OLDER = [
  '2020-01-18_drive-xotics-at-msrc-1-3-ccw', '2020-12-05_scca-at-msrc-1-3-ccw', '2021-02-06_tde-at-msrc-1-7-cw',
  '2021-11-08_edge-addicts-at-msrc-3-1-ccw', '2023-09-23_tde-at-msrc-1-7-ccw', '2024-11-02_tde-at-msrc-3-1-ccw',
  '2024-12-07_tde-at-msrc-1-7-cw',
]
const PAST = [...WITH_LAPS, ...OLDER]
const [KEY_310, KEY_373] = PAST_IMPORTS.map(i => i.key)

describe('past events (#310)', () => {
  beforeEach(() => blobs.clear())

  it('are built like the app’s own: details, days, and one run group’s sessions', () => {
    expect(buildPastEvents().map(e => e.id)).toEqual(PAST)
    const events = buildPastEvents(310)
    expect(events.map(e => e.id)).toEqual(WITH_LAPS)
    const [july, september] = events
    expect(july).toMatchObject({ name: 'TDE at ECR 2.7 CW', trackId: 'ecr-2-7', direction: 'Clockwise', organizer: 'The Drivers Edge' })
    expect(september).toMatchObject({ trackId: 'msrc-1-7', direction: 'Counter-clockwise' })

    expect(sessions(july)).toEqual(['2025-07-19 09:20 orange', '2025-07-19 13:00 orange', '2025-07-19 15:25 orange'])
    expect(sessions(september)).toHaveLength(5)
    expect(july.runGroups).toEqual([{ id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }])
  })

  it('Oct 4–5 has the organizer’s schedule (#339)', () => {
    const october = buildPastEvents(310)[2]
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
    expect(await ids()).toEqual([...PAST, '2026-09-13_msr-scca'].sort())
    expect(store.get(PAST[0])).toMatchObject({ importedAt: expect.any(String) })
    expect(meta.get(KEY_310)).toMatchObject({ imported: WITH_LAPS })
    expect(meta.get(KEY_373)).toMatchObject({ imported: OLDER })

    store.delete(WITH_LAPS[0])
    store.delete(OLDER[0])
    expect(await ids()).toEqual([...PAST.filter(id => id !== WITH_LAPS[0] && id !== OLDER[0]), '2026-09-13_msr-scca'].sort())
  })

  it('leave an event already stored under the same id alone', async () => {
    const edited = { id: PAST[1], name: 'Renamed', runGroups: [], days: [] }
    store.set(PAST[1], edited)
    await get()
    expect(store.get(PAST[1])).toEqual(edited)
    expect(meta.get(KEY_310)).toMatchObject({ imported: [PAST[0], PAST[2]] })
  })

  it('on a deploy preview, come after its copy of the live events, in its own store', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    store.set('2026-09-13_msr-scca', { id: '2026-09-13_msr-scca', name: 'Live', runGroups: [], days: [] })
    expect(await ids(preview)).toEqual([...PAST, '2026-09-13_msr-scca'].sort())
    // The live store is untouched.
    expect([...store.keys()]).toEqual(['2026-09-13_msr-scca'])
    expect(meta.size).toBe(0)
  })

  it('added for their laps, have the test account’s laps on their own sessions (#309)', () => {
    for (const event of buildPastEvents(310)) {
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

describe('older events, without laps (#373)', () => {
  beforeEach(() => blobs.clear())

  it('have the run groups Jason drove in, and no schedule', () => {
    const events = buildPastEvents(373)
    expect(events.map(e => e.id)).toEqual(OLDER)
    expect(events.map(e => [e.organizer, e.trackId, e.direction, e.days.map(d => d.date).join()])).toEqual([
      ['Drive Xotics', 'msrc-1-3', 'Counter-clockwise', '2020-01-18'],
      ['SCCA', 'msrc-1-3', 'Counter-clockwise', '2020-12-05'],
      ['The Drivers Edge', 'msrc-1-7', 'Clockwise', '2021-02-06,2021-02-07'],
      ['Edge Addicts', 'msrc-3-1', 'Counter-clockwise', '2021-11-08'],
      ['The Drivers Edge', 'msrc-1-7', 'Counter-clockwise', '2023-09-23'],
      ['The Drivers Edge', 'msrc-3-1', 'Counter-clockwise', '2024-11-02,2024-11-03'],
      ['The Drivers Edge', 'msrc-1-7', 'Clockwise', '2024-12-07'],
    ])
    expect(events.map(e => e.runGroups.map(g => `${g.id} ${g.label} ${g.bgClass}`))).toEqual([
      [],
      [],
      ['green Green bg-rungreen-500'],
      ['blue Blue bg-runblue-500'],
      ['purple Purple bg-runpurple-500', 'orange Orange bg-runorange-500'],
      ['blue Blue bg-runblue-500'],
      ['orange Orange bg-runorange-500'],
    ])
    for (const e of events) expect(e.days.flatMap(d => d.activities), e.id).toEqual([])
  })

  it('are added once to a store that already has #310’s, which stay as they are', async () => {
    // As the live store is: #310's added, and one of them deleted since.
    meta.set(KEY_310, { at: 'then', imported: WITH_LAPS })
    for (const id of WITH_LAPS.slice(1)) store.set(id, { id, name: 'Stored', runGroups: [], days: [] })
    expect(await ids()).toEqual([...WITH_LAPS.slice(1), ...OLDER].sort())
    expect(store.get(WITH_LAPS[1])).toEqual({ id: WITH_LAPS[1], name: 'Stored', runGroups: [], days: [] })
    expect(store.get(OLDER[5])).toMatchObject({ name: 'TDE at MSRC 3.1 CCW', importedAt: expect.any(String) })
    expect(meta.get(KEY_310)).toEqual({ at: 'then', imported: WITH_LAPS })
    expect(meta.get(KEY_373)).toMatchObject({ imported: OLDER })

    // Once: one deleted afterwards stays deleted.
    store.delete(OLDER[6])
    expect(await ids()).toEqual([...WITH_LAPS.slice(1), ...OLDER.slice(0, 6)].sort())
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
    for (const { key } of PAST_IMPORTS) meta.set(key, { at: 'then', imported: [] })
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
    for (const { key } of PAST_IMPORTS) meta.set(key, { at: 'then', imported: [] })
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
