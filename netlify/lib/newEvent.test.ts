import { describe, it, expect, vi, beforeEach } from 'vitest'
import { buildEvent, isAdmin, slugify } from './newEvent.mjs'

const store = new Map<string, unknown>()
vi.mock('@netlify/blobs', () => ({
  connectLambda: () => {},
  getStore: () => ({
    list: async () => ({ blobs: [...store.keys()].map(key => ({ key })) }),
    get: async (key: string) => store.get(key) ?? null,
    setJSON: async (key: string, value: unknown, opts?: { onlyIfNew?: boolean }) => {
      if (opts?.onlyIfNew && store.has(key)) return { modified: false }
      store.set(key, value)
      return { modified: true }
    },
  }),
}))

const { handler } = await import('../functions/created-events.mjs')

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
  const admin = { clientContext: { user: { sub: 'a', email: 'admin@example.com', app_metadata: { roles: ['admin'] } } } }
  const driver = { clientContext: { user: { sub: 'd', email: 'driver@example.com' } } }
  const post = (body: unknown) => ({ httpMethod: 'POST', body: JSON.stringify(body) })

  beforeEach(() => store.clear())

  it('rejects signed-out and non-admin creates', async () => {
    expect((await handler(post({ event: valid }), { clientContext: {} })).statusCode).toBe(401)
    expect((await handler(post({ event: valid }), driver)).statusCode).toBe(403)
    expect(store.size).toBe(0)
  })

  it('lets an admin create an event that GET then lists publicly', async () => {
    const res = await handler(post({ event: valid, takenIds: [] }), admin)
    expect(res.statusCode).toBe(201)
    const created = JSON.parse(res.body).event
    expect(created.createdBy).toBe('admin@example.com')

    const list = await handler({ httpMethod: 'GET' }, { clientContext: {} })
    expect(JSON.parse(list.body).events.map((e: { id: string }) => e.id)).toEqual([created.id])
  })

  it('avoids built-in and previously created ids', async () => {
    const first = JSON.parse((await handler(post({ event: valid }), admin)).body).event
    const second = JSON.parse(
      (await handler(post({ event: valid, takenIds: ['2026-10-10_scca-at-msrc-1-7-cw-2'] }), admin)).body,
    ).event
    expect(first.id).toBe('2026-10-10_scca-at-msrc-1-7-cw')
    expect(second.id).toBe('2026-10-10_scca-at-msrc-1-7-cw-3')
  })

  it('returns validation errors as 400', async () => {
    const res = await handler(post({ event: { ...valid, name: '' } }), admin)
    expect(res.statusCode).toBe(400)
    expect(JSON.parse(res.body).error).toMatch(/Title/)
  })
})
