import { describe, it, expect, vi, beforeEach } from 'vitest'
import handler from '../functions/events-json.mts'
import { fakeBlobs } from './fakeBlobs'

const day = (date: string) => ({ id: 'd', label: 'Day', date, activities: [] })

const pastEvent = { id: '2026-09-13_msr-scca', name: 'SCCA', runGroups: [], days: [day('2026-09-13')] }
const fixture = { id: 'test-live', name: 'Test Event', runGroups: [], days: [day('2000-01-01')] }
const created = {
  id: '2026-10-03_tde-at-ecr-2-7-cw',
  name: 'TDE at ECR 2.7 CW',
  track: 'Eagles Canyon Raceway',
  trackId: 'ecr-2-7',
  runGroups: [{ id: 'orange', label: 'Orange', bgClass: 'bg-orange-500', textClass: 'text-white' }],
  days: [{ id: 'saturday', label: 'Saturday', date: '2026-10-03', activities: [] }],
  createdBy: 'admin@example.com',
  createdAt: '2026-09-20T00:00:00.000Z',
}

const blobs = fakeBlobs()
const store = blobs.data('site:events')
let builtinStatus = 200

const fakeFetch = vi.fn(async (url: URL) => {
  expect(String(url)).toBe('https://myhpde.netlify.app/api/builtin-events.json')
  return builtinStatus === 200
    ? new Response(JSON.stringify({ fixtures: [fixture] }))
    : new Response('nope', { status: builtinStatus })
})

function call(context: unknown = {}) {
  const req = new Request('https://myhpde.netlify.app/api/events.json')
  return handler(req, context, { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch as never })
}

const idsOf = async (res: Response) => (await res.json()).events.map((e: { id: string }) => e.id)

beforeEach(() => {
  blobs.clear()
  builtinStatus = 200
  vi.restoreAllMocks()
})

describe('events.json feed', () => {
  it('serves every stored event plus the fixtures, newest first', async () => {
    store.set(pastEvent.id, pastEvent)
    store.set(created.id, created)
    const res = await call()
    expect(res.status).toBe(200)
    expect(res.headers.get('content-type')).toContain('application/json')
    expect(await idsOf(res)).toEqual([created.id, pastEvent.id, 'test-live'])
  })

  it('uses the widget format: colors resolved, track id kept, no app-only fields', async () => {
    store.set(created.id, created)
    const body = await (await call()).json()
    expect(body.events[0]).toEqual({
      id: created.id,
      name: created.name,
      track: created.track,
      trackId: created.trackId,
      runGroups: [{ id: 'orange', label: 'Orange', color: expect.stringMatching(/^#[0-9a-f]{6}$/i) }],
      days: created.days,
    })
    expect(typeof body.generatedAt).toBe('string')
  })

  it('shows the fixture, not a stored event with the same id', async () => {
    store.set('test-live', { ...created, id: 'test-live', name: 'Imposter' })
    const body = await (await call()).json()
    const matches = body.events.filter((e: { id: string }) => e.id === 'test-live')
    expect(matches).toHaveLength(1)
    expect(matches[0].name).toBe('Test Event')
  })

  it('leaves out malformed events instead of failing', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    store.set('no-days', { ...created, id: 'no-days', days: [] })
    store.set('bad-color', { ...created, id: 'bad-color', runGroups: [{ id: 'x', label: 'X', bgClass: 'nope' }] })
    const res = await call()
    expect(res.status).toBe(200)
    const ids = await idsOf(res)
    expect(ids).not.toContain('no-days')
    expect(ids).not.toContain('bad-color')
  })

  it('serves a deploy preview’s own copy of the events', async () => {
    const preview = { deploy: { context: 'deploy-preview' } }
    store.set(pastEvent.id, pastEvent)
    store.set(created.id, created)
    expect(await idsOf(await call(preview))).toEqual([created.id, pastEvent.id, 'test-live'])

    // Gone from the preview's copy, still live.
    blobs.data('deploy:events').delete(created.id)
    expect(await idsOf(await call(preview))).toEqual([pastEvent.id, 'test-live'])
    expect(store.has(created.id)).toBe(true)
  })

  it('answers 503 in plain text when the build’s file is unavailable', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    builtinStatus = 404
    const res = await call()
    expect(res.status).toBe(503)
    expect(res.headers.get('content-type')).toContain('text/plain')
  })

  it('answers 503 when Blobs fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const broken = () => ({ list: async () => { throw new Error('blobs down') } })
    const req = new Request('https://myhpde.netlify.app/api/events.json')
    const res = await handler(req, {}, { getStore: broken, fetch: fakeFetch as never })
    expect(res.status).toBe(503)
  })
})
