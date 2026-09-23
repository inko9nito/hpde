import { describe, it, expect, beforeEach } from 'vitest'
import { buildEvent, isAdmin, slugify } from './newEvent.mjs'
import handler from '../functions/created-events.mjs'

const store = new Map<string, unknown>()
const storeOptions: unknown[] = []
const fakeGetStore = (opts: unknown) => {
  storeOptions.push(opts)
  return {
    list: async () => ({ blobs: [...store.keys()].map(key => ({ key })) }),
    get: async (key: string) => store.get(key) ?? null,
    setJSON: async (key: string, value: unknown, o?: { onlyIfNew?: boolean }) => {
      if (o?.onlyIfNew && store.has(key)) return { modified: false }
      store.set(key, value)
      return { modified: true }
    },
    delete: async (key: string) => {
      store.delete(key)
    },
  }
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

const call = (method: string, { token, body, query = '' }: { token?: string; body?: unknown; query?: string } = {}) =>
  handler(
    new Request(`https://site.example/api/created-events${query}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),
    {},
    { getStore: fakeGetStore, fetch: fakeFetch },
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

describe('created-events function', () => {
  beforeEach(() => store.clear())

  it('reads with strong consistency, so a fresh create shows up on refresh', async () => {
    await call('GET')
    expect(storeOptions.at(-1)).toEqual({ name: 'events', consistency: 'strong' })
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

    const list = await (await call('GET')).json()
    expect(list.events.map((e: { id: string }) => e.id)).toEqual([created.id])
  })

  it('avoids built-in and previously created ids', async () => {
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
})
