import { describe, it, expect, beforeEach } from 'vitest'
import handler from '../functions/rsvps.mts'
import { fakeBlobs } from './fakeBlobs'

const blobs = fakeBlobs()
const store = blobs.data('site:rsvps')

// Stands in for Netlify Identity's /user endpoint: one token per user.
const identityUsers: Record<string, unknown> = {
  'vera-token': { id: 'vera', email: 'vera@example.com' },
  'jason-token': { id: 'jason', email: 'jason@example.com' },
}
const fakeFetch = async (url: URL, init: { headers: Record<string, string> }) => {
  expect(String(url)).toBe('https://site.example/.netlify/identity/user')
  const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
  return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
}

const EVENT = '2026-10-18_msr-scca'
const OTHER = '2026-11-08_ecr-hpde'

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
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch } as never,
  )

const rsvpsOf = async (token: string, context?: unknown) =>
  (await (await call('GET', { token, query: '', context })).json()).rsvps

describe('rsvps function (#235)', () => {
  beforeEach(() => blobs.clear())

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
