import { describe, it, expect, beforeEach } from 'vitest'
import handler from '../functions/events.mts'
import { fakeBlobs } from './fakeBlobs'
import { IMPORTED_KEY, buildPastEvents } from './pastEvents.mjs'
import { TEST_ACCOUNT_LAPS } from '../../src/data/fixtures/testAccountLaps'

const blobs = fakeBlobs()
const store = blobs.data('site:events')
const meta = blobs.data('site:events-meta')

const get = (context: unknown = {}) =>
  handler(new Request('https://site.example/api/events'), context, { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore })
const ids = async (context?: unknown) => (await (await get(context)).json()).events.map((e: { id: string }) => e.id).sort()

const PAST = ['2025-07-19_tde-at-ecr-2-7-cw', '2025-09-13_tde-at-msrc-1-7-ccw', '2025-10-04_tde-at-ecr-2-7-ccw']

describe('past events (#310)', () => {
  beforeEach(() => blobs.clear())

  it('are built like the app’s own: details, days, and one run group’s sessions', () => {
    const events = buildPastEvents()
    expect(events.map(e => e.id)).toEqual(PAST)
    const [july, september, october] = events
    expect(july).toMatchObject({ name: 'TDE at ECR 2.7 CW', trackId: 'ecr-2-7', direction: 'Clockwise', organizer: 'The Drivers Edge' })
    expect(september).toMatchObject({ trackId: 'msrc-1-7', direction: 'Counter-clockwise' })
    expect(october.days.map(d => d.date)).toEqual(['2025-10-04', '2025-10-05'])

    const sessions = (e: typeof july) => e.days.flatMap(d => d.activities.map(a => `${d.date} ${a.time} ${a.type === 'session' ? a.onTrack.join() : ''}`))
    expect(sessions(july)).toEqual(['2025-07-19 09:20 orange', '2025-07-19 13:00 orange', '2025-07-19 15:25 orange'])
    expect(sessions(september)).toHaveLength(5)
    expect(sessions(october)).toEqual([
      '2025-10-04 10:10 blue', '2025-10-04 12:25 blue', '2025-10-04 14:30 blue', '2025-10-04 16:40 blue',
      '2025-10-05 12:20 blue', '2025-10-05 14:55 blue', '2025-10-05 16:25 blue',
    ])
    expect(july.runGroups).toEqual([{ id: 'orange', label: 'Orange', bgClass: 'bg-runorange-500', textClass: 'text-white' }])
    expect(october.runGroups.map(g => g.bgClass)).toEqual(['bg-runblue-500'])
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
})
