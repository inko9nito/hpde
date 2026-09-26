import { describe, it, expect, beforeEach, vi } from 'vitest'
import handler from '../functions/laps.mts'
import { fakeBlobs } from './fakeBlobs'

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

// Stands in for Identity's admin API (#289): Jason is the only other user.
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
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity } as never,
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

  it('on a deploy preview, uses a store of its own and never the live laps', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    await call('PUT', { token: 'vera-token', body: { session: session1 } })

    expect(await sessionsOf('vera-token', preview)).toEqual([])
    await call('PUT', { token: 'vera-token', body: { session: session2 }, context: preview })
    expect((await sessionsOf('vera-token', preview)).map((s: { key: string }) => s.key)).toEqual(['2026-09-13 11:45 blue'])
    // The live laps are exactly as they were.
    expect((await sessionsOf('vera-token')).map((s: { key: string }) => s.key)).toEqual(['2026-09-13 09:50 blue'])
  })

  describe('an admin logging for another driver (#289)', () => {
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
})
