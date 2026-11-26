import { describe, it, expect, beforeEach } from 'vitest'
import handler, { keyMatches } from '../functions/export.mts'
import { fakeBlobs } from './fakeBlobs'

const blobs = fakeBlobs()
const laps = blobs.data('site:laps')

const KEY = 'a-long-random-export-key'
const VERA = '1c9d2e3f-4a5b-4c6d-8e7f-90a1b2c3d4e5'
const JASON = '5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5e'
const EVENT = '2026-11-20_tde-at-msr-3-1-ccw'

let identityDown = false
const identity = {
  getUser: async () => { throw new Error('not used') },
  listUsers: async ({ page }: { page: number }) => {
    if (identityDown) throw new Error('Identity unreachable')
    return page === 1 ? [{ id: VERA, email: 'vera@example.com', name: 'Vera' }] : []
  },
}

const session = (time: string, ms: number[]) => {
  const key = `2026-11-22_${time}_green`
  return { key, date: '2026-11-22', time, group: 'green', laps: ms.map(m => ({ ms: m })) }
}

const call = ({ key = KEY as string | null, query = '', method = 'GET', exportKey = KEY as string | undefined } = {}) =>
  handler(
    new Request(`https://site.example/api/export/laps${query}`, { method, headers: key ? { 'X-Export-Key': key } : {} }),
    {},
    { getStore: blobs.getStore, exportKey, identity } as never,
  )

beforeEach(() => {
  blobs.clear()
  identityDown = false
  laps.set(`${VERA}/${EVENT}`, {
    eventId: EVENT,
    sessions: {
      [session('11:30', []).key]: session('11:30', [183_270, 178_600]),
      [session('09:20', []).key]: session('09:20', [187_800, 172_430]),
    },
  })
  laps.set(`${JASON}/2026-09-13_msr-scca`, { eventId: '2026-09-13_msr-scca', sessions: {} })
})

describe('lap export (#486)', () => {
  it('is off when the site has no export key', async () => {
    const res = await call({ exportKey: '' })
    expect(res.status).toBe(503)
  })

  it('needs the key', async () => {
    expect((await call({ key: null })).status).toBe(401)
    expect((await call({ key: 'wrong' })).status).toBe(401)
    expect((await call({ key: `${KEY}x` })).status).toBe(401)
  })

  it('only reads', async () => {
    for (const method of ['PUT', 'POST', 'DELETE']) expect((await call({ method })).status).toBe(405)
  })

  it('lists every driver with laps, by name, with their bests', async () => {
    const res = await call()
    expect(res.status).toBe(200)
    const { drivers } = await res.json()
    expect(drivers).toEqual([
      { driverId: VERA, name: 'Vera', email: 'vera@example.com', events: [{ eventId: EVENT, sessions: 2, best: 172_430 }] },
      { driverId: JASON, events: [{ eventId: '2026-09-13_msr-scca', sessions: 0 }] },
    ])
  })

  it('still lists drivers when Identity is down, without names', async () => {
    identityDown = true
    const { drivers } = await (await call()).json()
    expect(drivers.map((d: { driverId: string; name?: string }) => [d.driverId, d.name])).toEqual([[VERA, undefined], [JASON, undefined]])
  })

  it('gives a driver’s laps, sessions in order', async () => {
    const { events } = await (await call({ query: `?driver=${VERA}` })).json()
    expect(events).toHaveLength(1)
    expect(events[0].sessions.map((s: { time: string }) => s.time)).toEqual(['09:20', '11:30'])
    expect(events[0].sessions[0].laps).toEqual([{ ms: 187_800 }, { ms: 172_430 }])
  })

  it('gives one event’s laps, and none for an event without', async () => {
    const one = await (await call({ query: `?driver=${VERA}&event=${EVENT}` })).json()
    expect(one.sessions).toHaveLength(2)
    const none = await (await call({ query: `?driver=${VERA}&event=2025-01-01_other` })).json()
    expect(none.sessions).toEqual([])
  })

  it('refuses ids that aren’t ids', async () => {
    expect((await call({ query: '?driver=../events' })).status).toBe(400)
    expect((await call({ query: `?driver=${VERA}&event=../x` })).status).toBe(400)
    expect((await call({ query: '?driver=test-account' })).status).toBe(200)
  })

  it('reads the live laps store, and writes nothing', async () => {
    const before = JSON.stringify([...laps])
    await call()
    await call({ query: `?driver=${VERA}` })
    expect(blobs.opened.every(o => o.kind === 'site' && (o.options as { name: string }).name === 'laps')).toBe(true)
    expect(JSON.stringify([...laps])).toBe(before)
  })
})

describe('keyMatches', () => {
  it('matches only the exact key', () => {
    expect(keyMatches(KEY, KEY)).toBe(true)
    expect(keyMatches(KEY.slice(0, -1), KEY)).toBe(false)
    expect(keyMatches('', KEY)).toBe(false)
    expect(keyMatches(null, KEY)).toBe(false)
  })
})
