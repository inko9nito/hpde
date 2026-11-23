import { describe, it, expect, vi } from 'vitest'
import handler, { MAX_IMAGE_BASE64, lapTimeMs } from '../functions/lap-import.mts'

// Stands in for Netlify Identity's /user endpoint.
const fakeFetch = async (_url: URL, init: { headers: Record<string, string> }) =>
  init.headers.Authorization === 'Bearer vera-token'
    ? new Response(JSON.stringify({ id: 'vera', email: 'vera@example.com' }))
    : new Response('{}', { status: 401 })

const IMAGE = { mediaType: 'image/jpeg', data: 'aGVsbG8=' }

// What the model answers for the first sample screenshot (#472).
const ANSWER = {
  is_lap_table: true,
  date: '2026-11-21',
  start: '09:21',
  laps: [
    { number: 2, time: '5:38.57', counted: false },
    { number: 1, time: '3:53.16', counted: true },
    { number: 3, time: '3:40.96', counted: true },
    { number: 4, time: '3:41.83', counted: true },
  ],
}

const call = (
  { token = 'vera-token', body = { image: IMAGE } as unknown, method = 'POST', read, apiKey = 'key' }:
  { token?: string; body?: unknown; method?: string; read?: unknown; apiKey?: string } = {},
) =>
  handler(
    new Request('https://site.example/api/lap-import', {
      method,
      headers: { Authorization: `Bearer ${token}` },
      ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
    }),
    {},
    { fetch: fakeFetch, apiKey, read: read ?? (async () => ({ ok: true, answer: ANSWER })) } as never,
  )

describe('lap-import function (#472)', () => {
  it('reads a screenshot’s date, start and laps, in lap order', async () => {
    const read = vi.fn(async () => ({ ok: true, answer: ANSWER }))
    const res = await call({ read })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      read: {
        date: '2026-11-21',
        start: '09:21',
        laps: [
          { ms: 233_160, counted: true },
          { ms: 338_570, counted: false },
          { ms: 220_960, counted: true },
          { ms: 221_830, counted: true },
        ],
      },
    })
    expect(read).toHaveBeenCalledWith(IMAGE)
  })

  it('leaves out what isn’t in the form asked for', async () => {
    const answer = { ...ANSWER, date: '', start: '9:21 AM', laps: [{ number: 1, time: 'DNF', counted: true }, { number: 2, time: '2:57.63', counted: true }] }
    const res = await call({ read: async () => ({ ok: true, answer }) })
    expect(await res.json()).toEqual({ read: { laps: [{ ms: 177_630, counted: true }] } })
  })

  it('says so when it isn’t a lap table, or no laps can be read', async () => {
    let res = await call({ read: async () => ({ ok: true, answer: { ...ANSWER, is_lap_table: false } }) })
    expect(res.status).toBe(422)
    res = await call({ read: async () => ({ ok: true, answer: { ...ANSWER, laps: [] } }) })
    expect(res.status).toBe(422)
    res = await call({ read: async () => ({ ok: false, status: 422, error: 'Couldn’t read the laps off this screenshot.' }) })
    expect(await res.json()).toEqual({ error: 'Couldn’t read the laps off this screenshot.' })
  })

  it('needs a sign-in, a POST, and an image', async () => {
    const read = vi.fn()
    expect((await call({ token: 'nobody', read })).status).toBe(401)
    expect((await call({ method: 'GET', read })).status).toBe(405)
    expect((await call({ body: 'not json', read })).status).toBe(400)
    expect((await call({ body: { image: { ...IMAGE, mediaType: 'image/heic' } }, read })).status).toBe(400)
    expect((await call({ body: { image: { ...IMAGE, data: 'not base64!' } }, read })).status).toBe(400)
    expect((await call({ body: { image: { ...IMAGE, data: 'A'.repeat(MAX_IMAGE_BASE64 + 4) } }, read })).status).toBe(413)
    expect(read).not.toHaveBeenCalled()
  })

  it('says it isn’t set up when the site has no API key', async () => {
    const res = await handler(
      new Request('https://site.example/api/lap-import', { method: 'POST', headers: { Authorization: 'Bearer vera-token' }, body: JSON.stringify({ image: IMAGE }) }),
      {},
      { fetch: fakeFetch as never, apiKey: '' },
    )
    expect(res.status).toBe(503)
  })
})

describe('lapTimeMs', () => {
  it('reads a lap time as a timer writes it', () => {
    expect(lapTimeMs('3:40.96')).toBe(220_960)
    expect(lapTimeMs(' 58.3 ')).toBe(58_300)
    expect(lapTimeMs('1:02:03.5')).toBe(3_723_500)
    expect(lapTimeMs('2:57')).toBe(177_000)
  })

  it('is NaN for anything else', () => {
    expect(lapTimeMs('3:75.00')).toBeNaN()
    expect(lapTimeMs('+0.87')).toBeNaN()
    expect(lapTimeMs('')).toBeNaN()
  })
})
