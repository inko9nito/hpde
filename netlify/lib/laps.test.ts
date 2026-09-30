import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createHash } from 'node:crypto'
import handler, { TEST_SEED_KEY, isSampleDriver, withSheetSpeeds } from '../functions/laps.mts'
import { fakeBlobs } from './fakeBlobs'
import { TEST_DRIVER_ID } from '../../src/data/testAccount'
import { TEST_ACCOUNT_LAPS, TEST_ACCOUNT_VERSION } from '../../src/data/fixtures/testAccountLaps'
import { cleanSessionLaps } from '../../src/utils/lapTimes'

const blobs = fakeBlobs()
const store = blobs.data('site:laps')

// Identity's user ids are UUIDs; an admin names a driver by theirs.
const JASON = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'

// Stands in for Netlify Identity's /user endpoint: one token per user.
const identityUsers: Record<string, unknown> = {
  'vera-token': { id: 'vera', email: 'vera@example.com' },
  'jason-token': { id: JASON, email: 'jason@example.com' },
  'admin-token': { id: 'amy', email: 'amy@example.com', app_metadata: { roles: ['admin'] } },
}
const fakeFetch = async (url: URL, init: { headers: Record<string, string> }) => {
  expect(String(url)).toBe('https://site.example/.netlify/identity/user')
  const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
  return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
}

// Stands in for Identity's admin API (#288): Jason is the only other user.
let identityDown = false
const identity = {
  getUser: async (id: string) => {
    if (identityDown) throw new Error('Identity unreachable')
    if (id === JASON) return { id: JASON, email: 'jason@example.com', name: 'Jason' }
    throw Object.assign(new Error('User not found'), { status: 404 })
  },
  listUsers: async () => [],
}

const EVENT = '2026-09-13_msr-scca'

// Whose the sample laps are, for these tests: nobody, unless one sets it.
let sampleDriverSha256 = ''

const call = (
  method: string,
  { token, body, query = `?event=${EVENT}`, context = {} }: { token?: string; body?: unknown; query?: string; context?: unknown } = {},
) =>
  handler(
    new Request(`https://site.example/api/laps${query}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...(body !== undefined ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
    }),
    context,
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity, sampleDriverSha256 } as never,
  )

const session1 = { date: '2026-09-13', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 116_000 }, { ms: 108_000 }] }
const session2 = {
  date: '2026-09-13', time: '11:45', group: 'blue', sessionNumber: 2,
  laps: [{ ms: 139_000, kind: 'out', start: '11:46:32 AM', end: '11:48:51 AM', note: 'Traffic' }, { ms: 104_000 }],
}

const sessionsOf = async (token: string, context?: unknown) =>
  (await (await call('GET', { token, context })).json()).sessions

describe('laps function (#210)', () => {
  beforeEach(() => {
    blobs.clear()
    identityDown = false
    sampleDriverSha256 = ''
  })

  it('needs a sign-in for everything', async () => {
    expect((await call('GET')).status).toBe(401)
    expect((await call('GET', { token: 'forged' })).status).toBe(401)
    expect((await call('PUT', { body: { session: session1 } })).status).toBe(401)
    expect((await call('DELETE', { query: `?event=${EVENT}&session=x` })).status).toBe(401)
    expect(store.size).toBe(0)
  })

  it('starts with no laps', async () => {
    const res = await call('GET', { token: 'vera-token' })
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(await res.json()).toEqual({ sessions: [] })
  })

  it('reads with strong consistency, so a save shows up on refresh', async () => {
    await call('GET', { token: 'vera-token' })
    expect(blobs.opened).toContainEqual({ kind: 'site', options: { name: 'laps', consistency: 'strong' } })
  })

  it('saves a session’s laps, keyed by day, time and group, and lists them in schedule order', async () => {
    const res = await call('PUT', { token: 'vera-token', body: { session: session2 } })
    expect(res.status).toBe(200)
    const saved = (await res.json()).session
    expect(saved).toMatchObject({ key: '2026-09-13 11:45 blue', laps: session2.laps })
    expect(typeof saved.updatedAt).toBe('string')
    await call('PUT', { token: 'vera-token', body: { session: session1 } })

    const sessions = await sessionsOf('vera-token')
    expect(sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-13 09:50 blue', '2026-09-13 11:45 blue'])
    expect([...store.keys()]).toEqual([`vera/${EVENT}`])
    expect(saved.loggedBy).toBeUndefined()
  })

  it('replaces a session’s laps when they’re saved again', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    await call('PUT', { token: 'vera-token', body: { session: { ...session1, laps: [{ ms: 101_000 }] } } })
    const sessions = await sessionsOf('vera-token')
    expect(sessions).toHaveLength(1)
    expect(sessions[0].laps).toEqual([{ ms: 101_000 }])
  })

  it('keeps each driver’s laps to themselves', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    expect(await sessionsOf('jason-token')).toEqual([])

    await call('PUT', { token: 'jason-token', body: { session: { ...session1, laps: [{ ms: 84_000 }] } } })
    expect((await sessionsOf('vera-token'))[0].laps).toEqual(session1.laps)
    expect((await sessionsOf('jason-token'))[0].laps).toEqual([{ ms: 84_000 }])

    // Jason can't remove Vera's.
    const del = await call('DELETE', { token: 'jason-token', query: `?event=${EVENT}&session=2026-09-13 11:45 blue` })
    expect(del.status).toBe(404)
  })

  it('keeps each event’s laps apart', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    const other = await call('GET', { token: 'vera-token', query: '?event=2026-09-11_msrc-1-7' })
    expect((await other.json()).sessions).toEqual([])
  })

  it('sums up every event with laps — best lap and sessions — for the driver only', async () => {
    expect((await call('GET', { query: '' })).status).toBe(401)
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    await call('PUT', { token: 'vera-token', body: { session: { ...session1, laps: [{ ms: 99_000 }] } }, query: '?event=2026-09-11_msrc-1-7' })
    await call('PUT', { token: 'jason-token', body: { session: { ...session1, laps: [{ ms: 84_000 }] } } })
    // An out lap alone has no best.
    await call('PUT', { token: 'vera-token', body: { session: { ...session1, laps: [{ ms: 140_000, kind: 'out' }] } }, query: '?event=2026-06-06_msrc-1-7' })

    const res = await call('GET', { token: 'vera-token', query: '' })
    expect(res.status).toBe(200)
    const { events } = await res.json()
    expect(events.sort((a: { eventId: string }, b: { eventId: string }) => a.eventId.localeCompare(b.eventId))).toEqual([
      { eventId: '2026-06-06_msrc-1-7', sessions: 1 },
      { eventId: '2026-09-11_msrc-1-7', sessions: 1, best: 99_000 },
      { eventId: EVENT, sessions: 2, best: 104_000 },
    ])
  })

  it('reads several events’ laps in one go, for a track page (#274) — the driver’s own, events with laps only', async () => {
    const tde = '2026-09-11_msrc-1-7'
    await call('PUT', { token: 'vera-token', body: { session: session2 } })
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    await call('PUT', { token: 'vera-token', body: { session: { ...session1, date: '2026-09-11' } }, query: `?event=${tde}` })
    await call('PUT', { token: 'jason-token', body: { session: session1 }, query: '?event=2026-06-06_msrc-1-7' })

    expect((await call('GET', { query: `?events=${EVENT}` })).status).toBe(401)
    const res = await call('GET', { token: 'vera-token', query: `?events=${EVENT},${tde},2026-06-06_msrc-1-7,${EVENT}` })
    expect(res.status).toBe(200)
    const { events } = await res.json()
    // Each once, in the order asked; each event's sessions in schedule order.
    expect(events.map((e: { eventId: string }) => e.eventId)).toEqual([EVENT, tde])
    expect(events[0].sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-13 09:50 blue', '2026-09-13 11:45 blue'])
    expect(events[1].sessions[0]).toMatchObject({ key: '2026-09-11 09:50 blue', laps: session1.laps })

    expect(await (await call('GET', { token: 'vera-token', query: '?events=' })).json()).toEqual({ events: [] })
    expect((await call('GET', { token: 'vera-token', query: '?events=../../jason/x' })).status).toBe(400)
    const tooMany = Array.from({ length: 101 }, (_, i) => `e${i}`).join(',')
    expect((await call('GET', { token: 'vera-token', query: `?events=${tooMany}` })).status).toBe(400)
  })

  it('removes one session’s laps, and the record with the last one', async () => {
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    await call('PUT', { token: 'vera-token', body: { session: session2 } })

    const first = await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&session=${encodeURIComponent('2026-09-13 09:50 blue')}` })
    expect(first.status).toBe(200)
    expect((await sessionsOf('vera-token')).map((s: { key: string }) => s.key)).toEqual(['2026-09-13 11:45 blue'])

    await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&session=${encodeURIComponent('2026-09-13 11:45 blue')}` })
    expect(store.size).toBe(0)
  })

  it('refuses laps that aren’t laps, and a missing or odd event id', async () => {
    const bad = await call('PUT', { token: 'vera-token', body: { session: { ...session1, laps: [{ ms: 3 }] } } })
    expect(bad.status).toBe(400)
    expect((await call('PUT', { token: 'vera-token', body: 'not json' })).status).toBe(400)
    expect((await call('GET', { token: 'vera-token', query: '?event=' })).status).toBe(400)
    expect((await call('GET', { token: 'vera-token', query: '?event=../../jason/x' })).status).toBe(400)
    expect((await call('POST', { token: 'vera-token' })).status).toBe(405)
    expect(store.size).toBe(0)
  })

  it('on a deploy preview, starts from a copy of the driver’s live laps, and never changes the live ones', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    const keys = (sessions: { key: string }[]) => sessions.map(s => s.key)
    await call('PUT', { token: 'vera-token', body: { session: session1 } })
    await call('PUT', { token: 'vera-token', body: { session: session1 }, query: '?event=2026-09-11_msrc-1-7' })
    await call('PUT', { token: 'jason-token', body: { session: session1 } })
    const live = structuredClone([...store.entries()])

    // The preview shows the real laps: this event's, and across events.
    expect(keys(await sessionsOf('vera-token', preview))).toEqual(['2026-09-13 09:50 blue'])
    const summary = await (await call('GET', { token: 'vera-token', query: '', context: preview })).json()
    expect(summary.events).toHaveLength(2)

    // Saved and removed there, they change on the preview only…
    await call('PUT', { token: 'vera-token', body: { session: session2 }, context: preview })
    await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}&session=${encodeURIComponent('2026-09-13 09:50 blue')}`, context: preview })
    expect(keys(await sessionsOf('vera-token', preview))).toEqual(['2026-09-13 11:45 blue'])
    // …and a removed one doesn't come back from the live laps.
    expect(keys(await sessionsOf('vera-token', preview))).toEqual(['2026-09-13 11:45 blue'])
    expect([...store.entries()]).toEqual(live)

    // Only the drivers whose laps were used there are copied in.
    expect([...blobs.data('deploy:laps').keys()].every(key => key.startsWith('vera/'))).toBe(true)
    // Production never opens a deploy's store.
    blobs.opened.length = 0
    await sessionsOf('vera-token')
    expect(blobs.opened.every(o => o.kind === 'site')).toBe(true)
  })

  describe('an admin logging for another driver (#288)', () => {
    const forJason = (q = `?event=${EVENT}`) => `${q}${q ? '&' : '?'}driver=${JASON}`

    it('saves into the driver’s own laps, so they see them, noting who saved them', async () => {
      const res = await call('PUT', { token: 'admin-token', body: { session: session1 }, query: forJason() })
      expect(res.status).toBe(200)
      expect((await res.json()).session.loggedBy).toBe('amy@example.com')
      expect([...store.keys()]).toEqual([`${JASON}/${EVENT}`])

      const jasons = await sessionsOf('jason-token')
      expect(jasons).toHaveLength(1)
      expect(jasons[0]).toMatchObject({ laps: session1.laps, loggedBy: 'amy@example.com' })
      // The admin's own laps are untouched.
      expect(await sessionsOf('admin-token')).toEqual([])
    })

    it('reads, sums up and removes the driver’s laps', async () => {
      await call('PUT', { token: 'jason-token', body: { session: session2 } })

      const read = await call('GET', { token: 'admin-token', query: forJason() })
      expect((await read.json()).sessions.map((s: { key: string }) => s.key)).toEqual(['2026-09-13 11:45 blue'])

      const summary = await call('GET', { token: 'admin-token', query: forJason('') })
      expect((await summary.json()).events).toEqual([{ eventId: EVENT, sessions: 1, best: 104_000 }])

      const track = await call('GET', { token: 'admin-token', query: forJason(`?events=${EVENT}`) })
      expect((await track.json()).events.map((e: { eventId: string }) => e.eventId)).toEqual([EVENT])
      expect((await call('GET', { token: 'vera-token', query: forJason(`?events=${EVENT}`) })).status).toBe(403)

      const del = await call('DELETE', {
        token: 'admin-token',
        query: `${forJason()}&session=${encodeURIComponent('2026-09-13 11:45 blue')}`,
      })
      expect(del.status).toBe(200)
      expect(store.size).toBe(0)
    })

    it('a driver saving their own laps again clears who logged them', async () => {
      await call('PUT', { token: 'admin-token', body: { session: session1 }, query: forJason() })
      await call('PUT', { token: 'jason-token', body: { session: session1 } })
      expect((await sessionsOf('jason-token'))[0].loggedBy).toBeUndefined()
    })

    it('is for admins only', async () => {
      const res = await call('PUT', { token: 'vera-token', body: { session: session1 }, query: forJason() })
      expect(res.status).toBe(403)
      expect((await call('GET', { token: 'vera-token', query: forJason() })).status).toBe(403)
      expect((await call('GET', { token: 'vera-token', query: forJason('') })).status).toBe(403)
      expect((await call('GET', { query: forJason() })).status).toBe(401)
      expect(store.size).toBe(0)
    })

    it('lets anyone name themselves', async () => {
      await call('PUT', { token: 'jason-token', body: { session: session1 }, query: forJason() })
      expect((await sessionsOf('jason-token'))[0].loggedBy).toBeUndefined()
    })

    it('refuses a driver Identity doesn’t know, and says so when Identity can’t be reached', async () => {
      const unknown = await call('PUT', {
        token: 'admin-token', body: { session: session1 },
        query: `?event=${EVENT}&driver=00000000-0000-4000-8000-000000000000`,
      })
      expect(unknown.status).toBe(404)
      expect((await call('GET', { token: 'admin-token', query: `?event=${EVENT}&driver=../vera` })).status).toBe(404)

      identityDown = true
      const error = vi.spyOn(console, 'error').mockImplementation(() => {})
      expect((await call('GET', { token: 'admin-token', query: forJason() })).status).toBe(502)
      expect(error).toHaveBeenCalled()
      error.mockRestore()
      expect(store.size).toBe(0)
    })
  })

  describe('the test account (#309)', () => {
    const asTest = (q = `?event=${EVENT}`) => `${q}${q ? '&' : '?'}driver=${TEST_DRIVER_ID}`
    const meta = blobs.data('site:laps-meta')

    it('starts full of the sample laps, with each lap’s speeds, for admins', async () => {
      const res = await call('GET', { token: 'admin-token', query: asTest() })
      expect(res.status).toBe(200)
      const sessions = (await res.json()).sessions
      const sample = TEST_ACCOUNT_LAPS.find(e => e.eventId === EVENT)!
      expect(sessions).toEqual(Object.values(sample.sessions))
      expect(sessions[0].laps[0]).toMatchObject({ topMph: expect.any(Number), avgMph: expect.any(Number) })

      const summary = (await (await call('GET', { token: 'admin-token', query: asTest('') })).json()).events
      expect(summary.map((e: { eventId: string }) => e.eventId).sort()).toEqual(TEST_ACCOUNT_LAPS.map(e => e.eventId).sort())
      // The admin's own laps are untouched.
      expect(await sessionsOf('admin-token')).toEqual([])
    })

    it('is for admins only', async () => {
      expect((await call('GET', { token: 'vera-token', query: asTest() })).status).toBe(403)
      expect((await call('PUT', { token: 'vera-token', body: { session: session1 }, query: asTest() })).status).toBe(403)
      expect((await call('GET', { query: asTest() })).status).toBe(401)
      expect(store.size).toBe(0)
    })

    it('keeps what’s saved there, until the sample changes', async () => {
      await call('PUT', { token: 'admin-token', body: { session: session1 }, query: asTest() })
      await call('PUT', { token: 'admin-token', body: { session: session1 }, query: asTest('?event=2026-10-03_elsewhere') })
      const keys = async () => (await (await call('GET', { token: 'admin-token', query: asTest() })).json()).sessions.map((s: { key: string }) => s.key)
      expect(await keys()).toContain('2026-09-13 09:50 blue')

      // A new sample replaces it all.
      meta.set(TEST_SEED_KEY, { version: TEST_ACCOUNT_VERSION - 1 })
      expect(await keys()).not.toContain('2026-09-13 09:50 blue')
      expect(store.has(`${TEST_DRIVER_ID}/2026-10-03_elsewhere`)).toBe(false)
      expect(meta.get(TEST_SEED_KEY)).toMatchObject({ version: TEST_ACCOUNT_VERSION })
    })

    it('on a deploy preview, starts from the sample in its own store', async () => {
      const preview = { deploy: { context: 'deploy-preview' } }
      await call('PUT', { token: 'admin-token', body: { session: session1 }, query: asTest() })
      const res = await call('GET', { token: 'admin-token', query: asTest(), context: preview })
      const sessions = (await res.json()).sessions
      expect(sessions).toEqual(Object.values(TEST_ACCOUNT_LAPS.find(e => e.eventId === EVENT)!.sessions))
      expect([...blobs.data('deploy:laps').keys()].every(key => key.startsWith(`${TEST_DRIVER_ID}/`))).toBe(true)
    })

    it('has sample laps the laps function would save as they are', () => {
      expect(TEST_ACCOUNT_LAPS.length).toBeGreaterThan(0)
      for (const event of TEST_ACCOUNT_LAPS) {
        for (const [key, session] of Object.entries(event.sessions)) {
          expect(key).toBe(session.key)
          expect(cleanSessionLaps(session)).toEqual({ session })
          expect(session.laps.every(lap => lap.topMph !== undefined && lap.avgMph !== undefined)).toBe(true)
        }
      }
    })
  })

  describe('the sample laps’ own driver (#310)', () => {
    const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')
    const sampleEvents = TEST_ACCOUNT_LAPS.map(e => e.eventId).sort()
    const summary = async (token: string, query = '') =>
      (await (await call('GET', { token, query })).json()).events.map((e: { eventId: string }) => e.eventId).sort()
    beforeEach(() => {
      sampleDriverSha256 = sha256('jason@example.com')
    })

    it('gets them in their own account the first time they use their laps, once', async () => {
      expect(await summary('jason-token')).toEqual(sampleEvents)
      const sample = TEST_ACCOUNT_LAPS.find(e => e.eventId === EVENT)!
      expect(await sessionsOf('jason-token')).toEqual(Object.values(sample.sessions))

      // Removed afterwards, they stay removed.
      const key = Object.keys(sample.sessions)[0]
      await call('DELETE', { token: 'jason-token', query: `?event=${EVENT}&session=${encodeURIComponent(key)}` })
      expect((await sessionsOf('jason-token')).map((s: { key: string }) => s.key)).not.toContain(key)
    })

    it('keeps a session they already have as it is', async () => {
      // A lap no lap in the sheet is near, so it gets no speeds either (#322).
      const mine = { key: '2026-09-13 09:30 orange', date: '2026-09-13', time: '09:30', group: 'orange', sessionNumber: 1, laps: [{ ms: 60_000 }] }
      store.set(`${JASON}/${EVENT}`, { eventId: EVENT, sessions: { [mine.key]: mine } })
      const sessions = await sessionsOf('jason-token')
      expect(sessions.find((s: { key: string }) => s.key === mine.key)).toEqual(mine)
      expect(sessions.length).toBeGreaterThan(1)
      expect(blobs.data('site:laps-meta').get(`filled-own-laps:${JASON}`)).toMatchObject({ kept: [`${EVENT} ${mine.key}`] })
    })

    it('puts the sheet’s speeds on the laps of a session they already had, once (#322)', async () => {
      const sample = TEST_ACCOUNT_LAPS.find(e => e.eventId === EVENT)!
      const [key, sheet] = Object.entries(sample.sessions)[0]
      // Logged by hand before speeds were: times to a hundredth, a note, and
      // the in lap left out.
      const typed = sheet.laps.filter(lap => !lap.kind).map(lap => ({ ms: Math.round(lap.ms / 10) * 10 }))
      typed[0] = { ...typed[0], note: 'Traffic' } as never
      const mine = { key, date: sheet.date, time: sheet.time, group: sheet.group, sessionNumber: sheet.sessionNumber, laps: typed, summary: 'Mine' }
      store.set(`${JASON}/${EVENT}`, { eventId: EVENT, sessions: { [key]: mine } })

      const got = (await sessionsOf('jason-token')).find((s: { key: string }) => s.key === key)
      const flying = sheet.laps.filter(lap => !lap.kind)
      expect(got).toEqual({
        ...mine,
        laps: typed.map((lap, i) => ({ ...lap, topMph: flying[i].topMph, avgMph: flying[i].avgMph })),
      })
      expect(blobs.data('site:laps-meta').get(`sheet-speeds-2:${JASON}`)).toMatchObject({
        sessions: [{ session: `${EVENT} ${key}`, added: typed.length, of: typed.length }],
      })

      // Once: laps changed afterwards stay as they are.
      store.set(`${JASON}/${EVENT}`, { eventId: EVENT, sessions: { [key]: mine } })
      expect((await sessionsOf('jason-token')).find((s: { key: string }) => s.key === key)).toEqual(mine)
    })

    it('puts right speeds the first version put on the wrong lap, once', async () => {
      const sample = TEST_ACCOUNT_LAPS.find(e => e.eventId === EVENT)!
      const [key, sheet] = Object.entries(sample.sessions)[1]
      const flying = sheet.laps.filter(lap => !lap.kind)
      // Two laps' speeds swapped, as pairing by time alone could leave them.
      const swapped = flying.map((lap, i) => ({ ms: lap.ms, topMph: flying[i ^ 1]?.topMph ?? lap.topMph, avgMph: flying[i ^ 1]?.avgMph ?? lap.avgMph }))
      const mine = { ...sheet, laps: swapped }
      store.set(`${JASON}/${EVENT}`, { eventId: EVENT, sessions: { [key]: mine } })
      blobs.data('site:laps-meta').set(`filled-own-laps:${JASON}`, { at: 'then', kept: [`${EVENT} ${key}`] })
      blobs.data('site:laps-meta').set(`sheet-speeds:${JASON}`, { at: 'then', sessions: [] })

      const got = (await sessionsOf('jason-token')).find((s: { key: string }) => s.key === key)
      expect(got.laps).toEqual(flying.map(lap => ({ ms: lap.ms, topMph: lap.topMph, avgMph: lap.avgMph })))
    })

    it('adds the speeds on a preview too, after copying the live laps', async () => {
      const sample = TEST_ACCOUNT_LAPS.find(e => e.eventId === EVENT)!
      const [key, sheet] = Object.entries(sample.sessions)[0]
      const mine = { ...sheet, laps: sheet.laps.map(lap => ({ ms: lap.ms })) }
      store.set(`${JASON}/${EVENT}`, { eventId: EVENT, sessions: { [key]: mine } })
      const got = (await sessionsOf('jason-token', { deploy: { context: 'deploy-preview' } })).find((s: { key: string }) => s.key === key)
      expect(got.laps).toEqual(sheet.laps.map(lap => ({ ms: lap.ms, topMph: lap.topMph, avgMph: lap.avgMph })))
      // The live laps are untouched.
      expect(store.get(`${JASON}/${EVENT}`)).toEqual({ eventId: EVENT, sessions: { [key]: mine } })
    })

    it('fills them when an admin picks the driver too', async () => {
      expect(await summary('admin-token', `?driver=${JASON}`)).toEqual(sampleEvents)
      expect([...store.keys()].every(key => key.startsWith(`${JASON}/`))).toBe(true)
    })

    it('matches the email however it’s written, and nobody else', async () => {
      expect(isSampleDriver(' Jason@Example.COM', sha256('jason@example.com'))).toBe(true)
      expect(isSampleDriver(undefined, sha256('jason@example.com'))).toBe(false)

      sampleDriverSha256 = sha256('someone@example.com')
      await call('GET', { token: 'vera-token' })
      await call('GET', { token: 'admin-token', query: `?driver=${JASON}` })
      expect(await summary('jason-token')).toEqual([])
      expect(store.size).toBe(0)
    })
  })
})

describe('withSheetSpeeds (#322)', () => {
  const sheet = [
    { ms: 139_000, kind: 'out' as const, topMph: 90, avgMph: 40 },
    { ms: 85_857, topMph: 104.9, avgMph: 71.7 },
    { ms: 85_930, topMph: 105.7, avgMph: 71.6 },
    { ms: 86_659, topMph: 104.7, avgMph: 71.1 },
    { ms: 133_721, kind: 'in' as const, topMph: 105.3, avgMph: 44.7 },
  ]

  it('takes each lap’s speeds from the lap at the same place when both list the same laps', () => {
    // Cut to whole seconds, every lap is within a second of its own.
    const mine = sheet.map(lap => ({ ms: Math.floor(lap.ms / 1000) * 1000, ...(lap.kind ? { kind: lap.kind } : {}) }))
    const { laps, added } = withSheetSpeeds(mine, sheet)
    expect(added).toBe(5)
    expect(laps.map(lap => lap.topMph)).toEqual([90, 104.9, 105.7, 104.7, 105.3])
  })

  it('otherwise pairs them in order, skipping a lap either side doesn’t have', () => {
    // The out lap left out, and a lap the sheet doesn't have.
    const mine = [{ ms: 85_900 }, { ms: 85_900, note: 'Traffic' }, { ms: 99_000 }, { ms: 86_700 }, { ms: 133_700, kind: 'in' as const }]
    const { laps, added } = withSheetSpeeds(mine, sheet)
    expect(added).toBe(4)
    expect(laps).toEqual([
      { ms: 85_900, topMph: 104.9, avgMph: 71.7 },
      { ms: 85_900, note: 'Traffic', topMph: 105.7, avgMph: 71.6 },
      { ms: 99_000 },
      { ms: 86_700, topMph: 104.7, avgMph: 71.1 },
      { ms: 133_700, kind: 'in', topMph: 105.3, avgMph: 44.7 },
    ])
  })

  it('gives every lap in the sheet its own speeds, however it was typed', () => {
    const ways: [string, (ms: number) => number][] = [
      ['to the thousandth', ms => ms],
      ['to the hundredth', ms => Math.round(ms / 10) * 10],
      ['to the tenth', ms => Math.round(ms / 100) * 100],
      ['cut to the tenth', ms => Math.floor(ms / 100) * 100],
    ]
    for (const record of TEST_ACCOUNT_LAPS) {
      for (const session of Object.values(record.sessions)) {
        for (const [way, typed] of ways) {
          for (const outAndIn of [true, false]) {
            const kept = session.laps.filter(lap => outAndIn || !lap.kind)
            const mine = kept.map(lap => ({ ms: typed(lap.ms), ...(lap.kind ? { kind: lap.kind } : {}) }))
            const { laps } = withSheetSpeeds(mine, session.laps)
            expect(laps, `${session.key}, ${way}${outAndIn ? '' : ', no out or in laps'}`).toEqual(
              kept.map((lap, i) => ({ ...mine[i], topMph: lap.topMph, avgMph: lap.avgMph })),
            )
          }
        }
      }
    }
  })

  it('leaves a lap with no match, or with speeds of its own, as it is', () => {
    const mine = [{ ms: 85_857, topMph: 100 }, { ms: 95_000 }, { ms: 85_930 }]
    const { laps, added } = withSheetSpeeds(mine, sheet)
    expect(added).toBe(1)
    expect(laps).toEqual([{ ms: 85_857, topMph: 100 }, { ms: 95_000 }, { ms: 85_930, topMph: 105.7, avgMph: 71.6 }])
  })

  it('moves speeds from the sheet that were on the wrong lap to the right one', () => {
    const mine = [{ ms: 85_800, topMph: 105.7, avgMph: 71.6 }, { ms: 85_900, topMph: 104.9, avgMph: 71.7 }]
    const { laps, added } = withSheetSpeeds(mine, sheet)
    expect(added).toBe(2)
    expect(laps).toEqual([{ ms: 85_800, topMph: 104.9, avgMph: 71.7 }, { ms: 85_900, topMph: 105.7, avgMph: 71.6 }])
  })
})
