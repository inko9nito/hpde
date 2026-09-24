import { describe, it, expect, beforeEach } from 'vitest'
import { buildEvent, isAdmin, slugify } from './newEvent.mjs'
import handler from '../functions/events.mts'
import { fakeBlobs } from './fakeBlobs'

const blobs = fakeBlobs()
const store = blobs.data('site:events')

const liveEvent = {
  id: '2026-09-13_msr-scca',
  name: 'SCCA at MSRC 1.7 CW',
  runGroups: [],
  days: [{ id: 'sunday', label: 'Sunday', date: '2026-09-13', activities: [] }],
}

// Stands in for Netlify Identity's /user endpoint: one token per user.
const identityUsers: Record<string, unknown> = {
  'admin-token': { id: 'a', email: 'admin@example.com', app_metadata: { roles: ['admin'] } },
  'driver-token': { id: 'd', email: 'driver@example.com' },
}
const fakeFetch = async (url: URL, init: { headers: Record<string, string> }) => {
  expect(String(url)).toBe('https://site.example/.netlify/identity/user')
  const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
  return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
}

const call = (
  method: string,
  { token, body, query = '', context = {} }: { token?: string; body?: unknown; query?: string; context?: unknown } = {},
) =>
  handler(
    new Request(`https://site.example/api/events${query}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),
    context,
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch },
  )

const valid = {
  name: 'SCCA at MSRC 1.7 CW',
  startDate: '2026-10-10',
  endDate: '2026-10-11',
  organizer: ' Texas Region SCCA ',
  track: 'Motorsport Ranch - Cresson',
  city: 'Cresson, TX',
  configuration: '1.7',
  direction: 'Clockwise',
  link: 'https://www.motorsportreg.com/events/x',
}

describe('buildEvent', () => {
  it('builds one empty day per date in the range, with trimmed fields', () => {
    const { event, error } = buildEvent(valid)
    expect(error).toBeUndefined()
    expect(event).toEqual({
      id: '2026-10-10_scca-at-msrc-1-7-cw',
      name: 'SCCA at MSRC 1.7 CW',
      organizer: 'Texas Region SCCA',
      track: 'Motorsport Ranch - Cresson',
      city: 'Cresson, TX',
      configuration: '1.7',
      direction: 'Clockwise',
      link: 'https://www.motorsportreg.com/events/x',
      runGroups: [],
      days: [
        { id: 'saturday', label: 'Saturday', date: '2026-10-10', activities: [] },
        { id: 'sunday', label: 'Sunday', date: '2026-10-11', activities: [] },
      ],
    })
  })

  it('treats a missing end date as a single-day event and drops blank fields', () => {
    const { event } = buildEvent({ name: 'Test day', startDate: '2026-10-10', endDate: '', city: '  ' })
    expect(event?.days).toHaveLength(1)
    expect(event).not.toHaveProperty('city')
  })

  it.each([
    [{ ...valid, name: '  ' }, /Title/],
    [{ ...valid, startDate: '2026-02-30' }, /Start date/],
    [{ ...valid, endDate: '2026-10-09' }, /before the start/],
    [{ ...valid, endDate: '2026-10-30' }, /at most 7 days/],
    [{ ...valid, link: 'motorsportreg.com' }, /full URL/],
    [{ ...valid, link: 'javascript:alert(1)' }, /full URL/],
  ])('rejects invalid input %#', (input, message) => {
    expect(buildEvent(input).error).toMatch(message)
  })

  it('keeps a well-formed trackId and drops anything else', () => {
    expect(buildEvent({ ...valid, trackId: 'ecr-2-7' }).event?.trackId).toBe('ecr-2-7')
    expect(buildEvent({ ...valid, trackId: '../x' }).event).not.toHaveProperty('trackId')
  })

  it('never reuses a taken id', () => {
    const taken = ['2026-10-10_scca-at-msrc-1-7-cw', '2026-10-10_scca-at-msrc-1-7-cw-2']
    expect(buildEvent(valid, taken).event?.id).toBe('2026-10-10_scca-at-msrc-1-7-cw-3')
  })

  it('slugifies accents and punctuation', () => {
    expect(slugify('  Café Track Day!! ')).toBe('cafe-track-day')
  })
})

describe('isAdmin', () => {
  it('needs the admin role', () => {
    expect(isAdmin(null)).toBe(false)
    expect(isAdmin({ roles: ['organizer'] })).toBe(false)
    expect(isAdmin({ roles: ['admin'] })).toBe(true)
  })
})

describe('events function', () => {
  beforeEach(() => blobs.clear())

  const ids = async () => (await (await call('GET')).json()).events.map((e: { id: string }) => e.id)

  it('reads with strong consistency, so a fresh create shows up on refresh', async () => {
    await call('GET')
    expect(blobs.opened).toContainEqual({ kind: 'site', options: { name: 'events', consistency: 'strong' } })
  })

  it('lists what’s in the live store, and writes nothing on a read', async () => {
    store.set(liveEvent.id, liveEvent)
    expect(await ids()).toEqual([liveEvent.id])
    expect([...store.keys()]).toEqual([liveEvent.id])
    expect(blobs.data('site:events-meta').size).toBe(0)
  })

  it('starts a deploy preview from a copy of the live events, and keeps its changes to itself', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    store.set(liveEvent.id, liveEvent)

    const listed = (await (await call('GET', { context: preview })).json()).events.map((e: { id: string }) => e.id)
    expect(listed).toEqual([liveEvent.id])

    const res = await call('POST', { token: 'admin-token', body: { event: valid }, context: preview })
    expect(res.status).toBe(201)
    const del = await call('DELETE', { token: 'admin-token', query: `?id=${liveEvent.id}`, context: preview })
    expect(del.status).toBe(200)

    // Deleted on the preview, it stays deleted there…
    const after = (await (await call('GET', { context: preview })).json()).events.map((e: { id: string }) => e.id)
    expect(after).not.toContain(liveEvent.id)
    // …and the live store is exactly as it was.
    expect([...store.keys()]).toEqual([liveEvent.id])
    expect(blobs.data('site:events-meta').size).toBe(0)
    const siteOpens = blobs.opened.filter(o => o.kind === 'site').map(o => (o.options as { name: string }).name)
    expect(new Set(siteOpens)).toEqual(new Set(['events']))
  })

  it('rejects signed-out, bad-token and non-admin creates', async () => {
    expect((await call('POST', { body: { event: valid } })).status).toBe(401)
    expect((await call('POST', { token: 'forged', body: { event: valid } })).status).toBe(401)
    expect((await call('POST', { token: 'driver-token', body: { event: valid } })).status).toBe(403)
    expect(store.size).toBe(0)
  })

  it('lets an admin create an event that GET then lists publicly', async () => {
    const res = await call('POST', { token: 'admin-token', body: { event: valid, takenIds: [] } })
    expect(res.status).toBe(201)
    const created = (await res.json()).event
    expect(created.createdBy).toBe('admin@example.com')

    expect(await ids()).toEqual([created.id])
  })

  it('avoids ids the client knows and ones already stored', async () => {
    const first = (await (await call('POST', { token: 'admin-token', body: { event: valid } })).json()).event
    const second = (await (await call('POST', {
      token: 'admin-token',
      body: { event: valid, takenIds: ['2026-10-10_scca-at-msrc-1-7-cw-2'] },
    })).json()).event
    expect(first.id).toBe('2026-10-10_scca-at-msrc-1-7-cw')
    expect(second.id).toBe('2026-10-10_scca-at-msrc-1-7-cw-3')
  })

  it('lets only admins delete, and only events that exist', async () => {
    const created = (await (await call('POST', { token: 'admin-token', body: { event: valid } })).json()).event
    const query = `?id=${created.id}`

    expect((await call('DELETE', { query })).status).toBe(401)
    expect((await call('DELETE', { token: 'driver-token', query })).status).toBe(403)
    expect(store.has(created.id)).toBe(true)

    expect((await call('DELETE', { token: 'admin-token' })).status).toBe(400)
    expect((await call('DELETE', { token: 'admin-token', query: '?id=2026-01-01_nope' })).status).toBe(404)
    expect((await call('DELETE', { token: 'admin-token', query })).status).toBe(200)
    expect(store.has(created.id)).toBe(false)
  })

  it('returns validation errors as 400', async () => {
    const res = await call('POST', { token: 'admin-token', body: { event: { ...valid, name: '' } } })
    expect(res.status).toBe(400)
    expect((await res.json()).error).toMatch(/Title/)
  })

  describe('PUT ?id= — the schedule editor (#232)', () => {
    const query = `?id=${liveEvent.id}`
    const runGroups = [{ label: 'Red', bgClass: 'bg-runred-500', description: 'Advanced' }]
    const schedule = `## Sunday | 2026-09-13
08:00 session 1 | track: Red
`
    const put = (opts: { token?: string; body?: unknown; query?: string; context?: unknown }) =>
      call('PUT', { query, ...opts })

    it('lets only admins save a schedule', async () => {
      store.set(liveEvent.id, liveEvent)
      expect((await put({ body: { runGroups, schedule } })).status).toBe(401)
      expect((await put({ token: 'forged', body: { runGroups, schedule } })).status).toBe(401)
      expect((await put({ token: 'driver-token', body: { runGroups, schedule } })).status).toBe(403)
      expect(store.get(liveEvent.id)).toEqual(liveEvent)
    })

    it('replaces the schedule, keeps the details, and keeps the old version in history', async () => {
      const event = { ...liveEvent, organizer: 'Texas Region SCCA', createdBy: 'admin@example.com' }
      store.set(event.id, event)
      const res = await put({ token: 'admin-token', body: { runGroups, schedule } })
      expect(res.status).toBe(200)
      const saved = (await res.json()).event
      expect(saved).toEqual({
        ...event,
        runGroups: [{ id: 'red', label: 'Red', bgClass: 'bg-runred-500', textClass: 'text-white', description: 'Advanced' }],
        days: [{ ...event.days[0], activities: [{ time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['red'] }] }],
        updatedBy: 'admin@example.com',
        updatedAt: expect.any(String),
      })
      expect(store.get(event.id)).toEqual(saved)
      // GET lists the new version.
      const listed = (await (await call('GET')).json()).events
      expect(listed).toEqual([saved])

      const history = blobs.data('site:events-history')
      expect([...history.keys()]).toEqual([`${event.id}/${saved.updatedAt}`])
      expect(history.get(`${event.id}/${saved.updatedAt}`)).toEqual(event)
    })

    it('checks the groups and the markdown itself, and refuses anything the editor would flag', async () => {
      store.set(liveEvent.id, liveEvent)
      const res = await put({ token: 'admin-token', body: { runGroups, schedule: schedule.replace('track: Red', 'track: Blue') } })
      expect(res.status).toBe(400)
      const body = await res.json()
      expect(body.error).toBe('Line 2: There’s no group “Blue”.')
      expect(body.problems).toContainEqual({ line: 2, message: 'There’s no group “Blue”.', blocking: true })
      // Another date: dates belong to the details.
      const moved = await put({ token: 'admin-token', body: { runGroups, schedule: schedule.replace('2026-09-13', '2026-09-14') } })
      expect(moved.status).toBe(400)
      // A color that isn't in the palette (so wouldn't draw).
      const pink = await put({ token: 'admin-token', body: { runGroups: [{ ...runGroups[0], bgClass: 'bg-pink-500' }], schedule } })
      expect((await pink.json()).error).toBe('Group 1: Pick a color.')
      expect(store.get(liveEvent.id)).toEqual(liveEvent)
      expect(blobs.data('site:events-history').size).toBe(0)
    })

    it('needs an id, groups, a schedule string, and an event that exists', async () => {
      store.set(liveEvent.id, liveEvent)
      expect((await put({ token: 'admin-token', query: '', body: { runGroups, schedule } })).status).toBe(400)
      expect((await put({ token: 'admin-token', body: { runGroups } })).status).toBe(400)
      expect((await put({ token: 'admin-token', body: { schedule } })).status).toBe(400)
      expect((await put({ token: 'admin-token', body: { runGroups, schedule: 'x'.repeat(50_001) } })).status).toBe(400)
      expect((await put({ token: 'admin-token', query: '?id=test-live', body: { runGroups, schedule } })).status).toBe(404)
    })

    it('on a deploy preview, edits the preview’s copy and never the live event', async () => {
      const preview = { deploy: { context: 'deploy-preview' } }
      store.set(liveEvent.id, liveEvent)
      // Straight to a save, with no GET first: the copy is made anyway.
      const res = await put({ token: 'admin-token', body: { runGroups, schedule }, context: preview })
      expect(res.status).toBe(200)
      expect(blobs.data('deploy:events').get(liveEvent.id)).toMatchObject({ updatedBy: 'admin@example.com' })
      expect(blobs.data('deploy:events-history').size).toBe(1)
      expect(store.get(liveEvent.id)).toEqual(liveEvent)
      expect(blobs.data('site:events-history').size).toBe(0)
    })
  })
})
