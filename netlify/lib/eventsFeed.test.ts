import { describe, it, expect, vi, beforeEach } from 'vitest'
import handler, { BUILTIN_PATH } from '../functions/events-json.mts'

const builtIn = {
  generatedAt: '2026-09-01T00:00:00.000Z',
  events: [
    { id: '2026-09-13_msr-scca', name: 'SCCA', runGroups: [], days: [{ id: 'sunday', label: 'Sunday', date: '2026-09-13', activities: [] }] },
    { id: 'test-live', name: 'Test Event', runGroups: [], days: [{ id: 'today', label: 'Today', date: '2000-01-01', activities: [] }] },
  ],
}

const created = {
  id: '2026-10-03_tde-at-ecr-2-7-cw',
  name: 'TDE at ECR 2.7 CW',
  track: 'Eagles Canyon Raceway',
  trackId: 'ecr',
  runGroups: [],
  days: [{ id: 'saturday', label: 'Saturday', date: '2026-10-03', activities: [] }],
  createdBy: 'admin@example.com',
  createdAt: '2026-09-20T00:00:00.000Z',
}

let store: Map<string, unknown>
const fakeGetStore = () => ({
  list: async () => ({ blobs: [...store.keys()].map(key => ({ key })) }),
  get: async (key: string) => store.get(key) ?? null,
})

const okFetch = vi.fn(async () => new Response(JSON.stringify(builtIn), { status: 200 }))

function call(deps: Record<string, unknown> = {}) {
  const req = new Request('https://myhpde.netlify.app/api/events.json')
  return handler(req, undefined, { getStore: fakeGetStore as never, fetch: okFetch as never, ...deps })
}

beforeEach(() => {
  store = new Map()
  okFetch.mockClear()
})

describe('events.json feed', () => {
  it('reads the built-in events from the same site', async () => {
    await call()
    expect(String(okFetch.mock.calls[0][0])).toBe(`https://myhpde.netlify.app${BUILTIN_PATH}`)
  })

  it('adds created events, newest first, in the widget format', async () => {
    store.set(created.id, created)
    const res = await call()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('application/json')
    const body = await res.json()
    expect(body.events.map((e: { id: string }) => e.id)).toEqual([
      '2026-10-03_tde-at-ecr-2-7-cw',
      '2026-09-13_msr-scca',
      'test-live',
    ])
    // Serialized like built-in events: no app-only fields leak out.
    const ev = body.events[0]
    expect(ev).toEqual({
      id: created.id,
      name: created.name,
      track: created.track,
      runGroups: [],
      days: created.days,
    })
    expect(typeof body.generatedAt).toBe('string')
  })

  it('keeps the built-in event when a created one has the same id', async () => {
    store.set('2026-09-13_msr-scca', { ...created, id: '2026-09-13_msr-scca', name: 'Imposter' })
    const body = await (await call()).json()
    const matches = body.events.filter((e: { id: string }) => e.id === '2026-09-13_msr-scca')
    expect(matches).toHaveLength(1)
    expect(matches[0].name).toBe('SCCA')
  })

  it('leaves out malformed created events instead of failing', async () => {
    store.set('no-days', { ...created, id: 'no-days', days: [] })
    store.set('bad-color', {
      ...created,
      id: 'bad-color',
      runGroups: [{ id: 'x', label: 'X', bgClass: 'not-a-class' }],
    })
    const res = await call()
    expect(res.status).toBe(200)
    const ids = (await res.json()).events.map((e: { id: string }) => e.id)
    expect(ids).not.toContain('no-days')
    expect(ids).not.toContain('bad-color')
    expect(ids).toHaveLength(2)
  })

  it('answers 503 in plain text when the built-in events are unavailable', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await call({ fetch: async () => new Response('nope', { status: 404 }) })
    expect(res.status).toBe(503)
    expect(res.headers.get('content-type')).toContain('text/plain')
  })

  it('answers 503 when Blobs fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const res = await call({
      getStore: () => ({ list: async () => { throw new Error('blobs down') } }),
    })
    expect(res.status).toBe(503)
  })
})
