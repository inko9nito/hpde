import { describe, it, expect, beforeEach } from 'vitest'
import { createHash } from 'node:crypto'
import handler from '../functions/rsvps.mts'
import { fakeBlobs } from './fakeBlobs'
import { TEST_DRIVER_ID } from '../../src/data/testAccount'

const blobs = fakeBlobs()
const store = blobs.data('site:rsvps')

// Identity's user ids are UUIDs; an admin names a driver by theirs.
const JASON = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'

// Stands in for Netlify Identity's /user endpoint: one token per user.
const identityUsers: Record<string, unknown> = {
  'vera-token': { id: 'vera', email: 'vera@example.com' },
  'jason-token': { id: JASON, email: 'jason@example.com' },
  'admin-token': { id: 'amy', email: 'amy@example.com', app_metadata: { roles: ['admin'] } },
}

const identity = {
  getUser: async (id: string) => {
    if (id === JASON) return { id: JASON, email: 'jason@example.com', name: 'Jason' }
    throw Object.assign(new Error('User not found'), { status: 404 })
  },
  listUsers: async () => [],
}
const fakeFetch = async (url: URL, init: { headers: Record<string, string> }) => {
  expect(String(url)).toBe('https://site.example/.netlify/identity/user')
  const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
  return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
}

const EVENT = '2026-10-18_msr-scca'
const OTHER = '2026-11-08_ecr-hpde'

// Whose the sample laps are (Jason's, #310), for these tests: nobody, unless one sets it.
let sampleDriverSha256 = ''
const sha256 = (s: string) => createHash('sha256').update(s).digest('hex')

const call = (
  method: string,
  { token, body, query = `?event=${EVENT}`, context = {} }: { token?: string; body?: unknown; query?: string; context?: unknown } = {},
) =>
  handler(
    new Request(`https://site.example/api/rsvps${query}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...(body !== undefined ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
    }),
    context,
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity, sampleDriverSha256 } as never,
  )

const rsvpsOf = async (token: string, context?: unknown) =>
  (await (await call('GET', { token, query: '', context })).json()).rsvps

describe('rsvps function (#235)', () => {
  beforeEach(() => {
    blobs.clear()
    sampleDriverSha256 = ''
  })

  it('keeps each driver’s answers to themselves; an admin can read and answer for one (#362)', async () => {
    expect((await call('PUT', { token: 'vera-token', body: { status: 'going' } })).status).toBe(200)
    expect(await rsvpsOf('jason-token')).toEqual({})
    // Only an admin can name another driver, and only a real one.
    expect((await call('GET', { token: 'jason-token', query: '?driver=vera' })).status).toBe(403)
    expect((await call('PUT', { token: 'jason-token', query: `?event=${EVENT}&driver=vera`, body: { status: 'not-going' } })).status).toBe(403)
    expect((await call('GET', { token: 'admin-token', query: '?driver=nobody' })).status).toBe(404)

    const put = await call('PUT', { token: 'admin-token', query: `?event=${EVENT}&driver=${JASON}`, body: { status: 'going', runGroup: 'blue' } })
    expect(put.status).toBe(200)
    expect(Object.keys(await rsvpsOf('jason-token'))).toEqual([EVENT])
    expect((await (await call('GET', { token: 'admin-token', query: `?driver=${JASON}` })).json()).rsvps[EVENT]).toMatchObject({ status: 'going', runGroup: 'blue' })
    // Not the admin's own.
    expect(await rsvpsOf('admin-token')).toEqual({})
    expect((await call('DELETE', { token: 'admin-token', query: `?event=${EVENT}&driver=${JASON}` })).status).toBe(200)
    expect(await rsvpsOf('jason-token')).toEqual({})
    expect([...store.keys()]).toEqual(['vera'])
  })

  it('needs a sign-in for everything', async () => {
    expect((await call('GET', { query: '' })).status).toBe(401)
    expect((await call('GET', { token: 'forged', query: '' })).status).toBe(401)
    expect((await call('PUT', { body: { status: 'going' } })).status).toBe(401)
    expect((await call('DELETE')).status).toBe(401)
    expect(store.size).toBe(0)
  })

  it('starts with no answers, never cached', async () => {
    const res = await call('GET', { token: 'vera-token', query: '' })
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toBe('no-store')
    expect(await res.json()).toEqual({ rsvps: {} })
  })

  it('reads with strong consistency, so an answer shows up on refresh', async () => {
    await call('GET', { token: 'vera-token', query: '' })
    expect(blobs.opened).toContainEqual({ kind: 'site', options: { name: 'rsvps', consistency: 'strong' } })
  })

  it('saves an answer with a run group, and lists every answer by event', async () => {
    const res = await call('PUT', { token: 'vera-token', body: { status: 'going', runGroup: 'blue' } })
    expect(res.status).toBe(200)
    const { rsvp } = await res.json()
    expect(rsvp).toMatchObject({ status: 'going', runGroup: 'blue' })
    expect(typeof rsvp.updatedAt).toBe('string')
    await call('PUT', { token: 'vera-token', query: `?event=${OTHER}`, body: { status: 'not-going' } })

    const rsvps = await rsvpsOf('vera-token')
    expect(rsvps[EVENT]).toMatchObject({ status: 'going', runGroup: 'blue' })
    expect(rsvps[OTHER]).toMatchObject({ status: 'not-going' })
    expect(rsvps[OTHER].runGroup).toBeUndefined()
    // Maybe (undecided, or on the waitlist) keeps a run group too.
    await call('PUT', { token: 'vera-token', query: `?event=${OTHER}`, body: { status: 'maybe', runGroup: 'red' } })
    expect((await rsvpsOf('vera-token'))[OTHER]).toMatchObject({ status: 'maybe', runGroup: 'red' })
    expect([...store.keys()]).toEqual(['vera'])
  })

  it('replaces an answer when it changes; not going drops the run group', async () => {
    await call('PUT', { token: 'vera-token', body: { status: 'going', runGroup: 'blue' } })
    await call('PUT', { token: 'vera-token', body: { status: 'not-going', runGroup: 'blue' } })
    expect((await rsvpsOf('vera-token'))[EVENT]).toEqual({ status: 'not-going', updatedAt: expect.any(String) })
  })

  it('keeps each driver’s answers to themselves', async () => {
    await call('PUT', { token: 'vera-token', body: { status: 'going' } })
    expect(await rsvpsOf('jason-token')).toEqual({})
  })

  it('takes an answer back', async () => {
    await call('PUT', { token: 'vera-token', body: { status: 'going' } })
    await call('PUT', { token: 'vera-token', query: `?event=${OTHER}`, body: { status: 'going' } })
    expect((await call('DELETE', { token: 'vera-token' })).status).toBe(200)
    expect(Object.keys(await rsvpsOf('vera-token'))).toEqual([OTHER])
    await call('DELETE', { token: 'vera-token', query: `?event=${OTHER}` })
    expect(store.size).toBe(0)
    // Nothing to take back is fine too.
    expect((await call('DELETE', { token: 'vera-token' })).status).toBe(200)
  })

  it('turns away a bad answer or event', async () => {
    for (const body of [{}, { going: true }, { status: 'yes' }, { status: 'going', runGroup: 'has space' }, { status: 'going', runGroup: 7 }]) {
      const res = await call('PUT', { token: 'vera-token', body })
      expect(res.status).toBe(400)
    }
    expect((await call('PUT', { token: 'vera-token', body: 'not json' })).status).toBe(400)
    expect((await call('PUT', { token: 'vera-token', query: '?event=../x', body: { status: 'going' } })).status).toBe(400)
    expect((await call('PUT', { token: 'vera-token', query: '', body: { status: 'going' } })).status).toBe(400)
    expect((await call('POST', { token: 'vera-token', body: { status: 'going' } })).status).toBe(405)
    expect(store.size).toBe(0)
  })

  it('on a preview, starts from the driver’s live answers, and never changes them', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    await call('PUT', { token: 'vera-token', body: { status: 'going', runGroup: 'blue' } })

    expect((await rsvpsOf('vera-token', preview))[EVENT]).toMatchObject({ status: 'going', runGroup: 'blue' })
    await call('PUT', { token: 'vera-token', body: { status: 'not-going' }, context: preview })
    await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}`, context: preview })

    // Taken back on the preview: stays taken back there…
    expect(await rsvpsOf('vera-token', preview)).toEqual({})
    // …and live, it's as it was.
    expect((await rsvpsOf('vera-token'))[EVENT]).toMatchObject({ status: 'going', runGroup: 'blue' })
  })
})

describe('laps answer for them (#377)', () => {
  const laps = blobs.data('site:laps')
  const meta = blobs.data('site:rsvps-meta')
  const THIRD = '2025-10-04_tde-at-ecr-2-7-ccw'
  const lapsAt = (driver: string, eventId: string, ...sessions: { date: string; time: string; group: string }[]) =>
    laps.set(`${driver}/${eventId}`, {
      eventId,
      sessions: Object.fromEntries(sessions.map(s => {
        const key = `${s.date} ${s.time} ${s.group}`
        return [key, { key, ...s, laps: [{ ms: 100_000 }] }]
      })),
    })
  const groups = (rsvps: Record<string, { status: string; runGroup?: string }>) =>
    Object.fromEntries(Object.entries(rsvps).map(([id, r]) => [id, `${r.status} ${r.runGroup ?? '-'}`]))

  beforeEach(() => {
    blobs.clear()
    sampleDriverSha256 = ''
  })

  it('once: every event they’ve laps at is "I drove", in their last session’s group, putting a wrong answer right', async () => {
    store.set(JASON, { events: { [EVENT]: { status: 'going', runGroup: 'green' }, [OTHER]: { status: 'not-going' }, kept: { status: 'maybe' } } })
    lapsAt(JASON, EVENT,
      { date: '2026-10-18', time: '09:00', group: 'blue' },
      { date: '2026-10-18', time: '14:00', group: 'yellow' },
      { date: '2026-10-18', time: '11:00', group: 'blue' })
    lapsAt(JASON, OTHER, { date: '2026-11-08', time: '10:00', group: 'red' })
    lapsAt(JASON, THIRD, { date: '2025-10-04', time: '10:10', group: 'blue' })
    lapsAt('vera', '2026-09-13_msr-scca', { date: '2026-09-13', time: '09:00', group: 'orange' })

    // An admin who picked Jason (#362) sees the same as Jason does.
    const asAdmin = (await (await call('GET', { token: 'admin-token', query: `?driver=${JASON}` })).json()).rsvps
    expect(groups(asAdmin)).toEqual({
      [EVENT]: 'going yellow', [OTHER]: 'going red', [THIRD]: 'going blue', kept: 'maybe -',
    })
    expect(asAdmin[EVENT].updatedAt).toEqual(expect.any(String))
    expect(groups(await rsvpsOf('jason-token'))).toEqual(groups(asAdmin))
    expect(meta.get(`drove:${JASON}`)).toMatchObject({ drove: [EVENT, OTHER, THIRD] })
    // Only Jason's own laps answer for Jason.
    expect(store.has('amy')).toBe(false)

    // Once: an answer given afterwards stands.
    await call('PUT', { token: 'jason-token', body: { status: 'going', runGroup: 'blue' } })
    expect((await rsvpsOf('jason-token'))[EVENT]).toMatchObject({ status: 'going', runGroup: 'blue' })
  })

  it('for Jason, the events in Jason’s track history from before the laps too (#373), in the last of each one’s groups', async () => {
    sampleDriverSha256 = sha256('jason@example.com')
    expect(groups(await rsvpsOf('jason-token'))).toEqual({
      '2020-01-18_drive-xotics-at-msrc-1-3-ccw': 'going -',
      '2020-12-05_scca-at-msrc-1-3-ccw': 'going -',
      '2021-02-06_tde-at-msrc-1-7-cw': 'going green',
      '2021-11-08_edge-addicts-at-msrc-3-1-ccw': 'going blue',
      '2023-09-23_tde-at-msrc-1-7-ccw': 'going orange',
      '2024-11-02_tde-at-msrc-3-1-ccw': 'going blue',
      '2024-12-07_tde-at-msrc-1-7-cw': 'going orange',
    })
    // Nobody else's.
    expect(await rsvpsOf('vera-token')).toEqual({})
  })

  it('the test account’s, from its sample laps (#309)', async () => {
    const rsvps = (await (await call('GET', { token: 'admin-token', query: `?driver=${TEST_DRIVER_ID}` })).json()).rsvps
    expect(groups(rsvps)).toMatchObject({ '2025-07-19_tde-at-ecr-2-7-cw': 'going orange', [THIRD]: 'going blue' })
  })

  it('on a preview, from its own copy of their laps, keeping their live answers — and never changing the live ones', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    store.set(JASON, { events: { [OTHER]: { status: 'going', runGroup: 'blue' } } })
    lapsAt(JASON, EVENT, { date: '2026-10-18', time: '09:00', group: 'yellow' })
    expect(groups(await rsvpsOf('jason-token', preview))).toEqual({ [OTHER]: 'going blue', [EVENT]: 'going yellow' })
    expect(blobs.data('deploy:laps').has(`${JASON}/${EVENT}`)).toBe(true)
    expect(store.get(JASON)).toEqual({ events: { [OTHER]: { status: 'going', runGroup: 'blue' } } })
    expect(meta.size).toBe(0)
  })
})
