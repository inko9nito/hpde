import { describe, it, expect, beforeEach } from 'vitest'
import handler from '../functions/garage.mts'
import { fakeBlobs } from './fakeBlobs'

const blobs = fakeBlobs()
const store = blobs.data('site:garage')

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

const identity = {
  getUser: async (id: string) => {
    if (id === JASON) return { id: JASON, email: 'jason@example.com', name: 'Jason' }
    throw Object.assign(new Error('User not found'), { status: 404 })
  },
  listUsers: async () => [],
}

const EVENT = '2026-09-11_msrc-1-7'
let ids: string[] = []

const call = (
  method: string,
  { token, body, query = '', context = {} }: { token?: string; body?: unknown; query?: string; context?: unknown } = {},
) =>
  handler(
    new Request(`https://site.example/api/garage${query}`, {
      method,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      ...(body !== undefined ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
    }),
    context,
    { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity, newId: () => ids.shift()! } as never,
  )

const cayman = { year: 2019, make: 'Porsche', model: '718 Cayman GTS', nickname: 'The Cayman', lugNutTorque: 118 }
const pressures = {
  date: '2026-09-12', time: '10:25', group: 'pink', sessionNumber: 2,
  cold: { fl: 30, fr: 30, rl: 28.5, rr: 28.5 }, hot: { fl: 36, fr: 36.5 }, note: 'Bled the fronts to 36.',
}
const setup = { carId: 'car1', sessions: { x: pressures } }
const brakeJob = { date: '2026-09-01', parts: [{ part: 'frontPads', what: 'Hawk DTC-60' }, { part: 'frontRotors' }], shop: 'Speed Shop', note: 'At 12,400 miles.' }

const garageOf = async (token: string, query?: string) => (await (await call('GET', { token, query })).json())
const addCar = async (token = 'vera-token', car: unknown = cayman) => (await (await call('PUT', { token, body: { car } })).json()).car

describe('garage function (#344)', () => {
  beforeEach(() => {
    blobs.clear()
    ids = ['car1', 'car2', 'car3', 'ch1', 'ch2', 'ch3']
  })

  it('needs a sign-in for everything', async () => {
    expect((await call('GET')).status).toBe(401)
    expect((await call('GET', { token: 'forged' })).status).toBe(401)
    expect((await call('PUT', { body: { car: cayman } })).status).toBe(401)
    expect((await call('DELETE', { query: '?car=car1' })).status).toBe(401)
    expect(store.size).toBe(0)
  })

  it('starts empty', async () => {
    expect(await garageOf('vera-token')).toEqual({ cars: [], events: {} })
  })

  it('adds cars, giving each an id, and changes one by its id', async () => {
    const car = await addCar()
    expect(car).toMatchObject({ id: 'car1', ...cayman })
    expect(car.updatedAt).toBeTruthy()
    await addCar('vera-token', { make: 'Mazda', model: 'Miata' })
    const res = await call('PUT', { token: 'vera-token', body: { car: { id: 'car1', ...cayman, lugNutTorque: 96, nickname: '' } } })
    expect(res.status).toBe(200)
    const { cars } = await garageOf('vera-token')
    expect(cars.map((c: { id: string }) => c.id)).toEqual(['car1', 'car2'])
    expect(cars[0].lugNutTorque).toBe(96)
    expect(cars[0]).not.toHaveProperty('nickname')
    expect([...store.keys()]).toEqual(['vera/garage'])
    expect((await call('PUT', { token: 'vera-token', body: { car: { id: 'nope', ...cayman } } })).status).toBe(404)
  })

  it('saves an event’s setup: its car and each session’s pressures, keyed as its laps are', async () => {
    await addCar()
    const res = await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup: { ...setup, tires: 'not kept here' } } })
    expect(res.status).toBe(200)
    const { events } = await garageOf('vera-token')
    expect(events[EVENT]).toMatchObject({ carId: 'car1' })
    expect(events[EVENT]).not.toHaveProperty('tires')
    expect(events[EVENT].sessions).toEqual({ '2026-09-12 10:25 pink': { key: '2026-09-12 10:25 pink', ...pressures } })
  })

  it('drives a car at several events at once, taking over from another car and keeping their pressures', async () => {
    await addCar()
    await addCar('vera-token', { make: 'Mazda', model: 'Miata' })
    await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup: { ...setup, carId: 'car2' } } })
    const res = await call('PUT', { token: 'vera-token', query: '?car=car1', body: { events: [EVENT, '2026-10-04_alpha', EVENT] } })
    expect(res.status).toBe(200)
    expect(Object.keys((await res.json()).events)).toEqual([EVENT, '2026-10-04_alpha'])
    const { events } = await garageOf('vera-token')
    expect(events[EVENT]).toMatchObject({ carId: 'car1' })
    expect(Object.keys(events[EVENT].sessions)).toEqual(['2026-09-12 10:25 pink'])
    expect(events['2026-10-04_alpha']).toMatchObject({ carId: 'car1' })
    const bad = async (body: unknown, query = '?car=car1') => (await call('PUT', { token: 'vera-token', query, body })).status
    expect(await bad({ events: [] })).toBe(400)
    expect(await bad({ events: ['../x'] })).toBe(400)
    expect(await bad({ events: 'all' })).toBe(400)
    expect(await bad({ events: [EVENT] }, '?car=nope')).toBe(404)
  })

  it('logs jobs on a car — several consumables at once — changes an entry and removes one', async () => {
    await addCar()
    const res = await call('PUT', { token: 'vera-token', query: '?car=car1', body: { entry: brakeJob } })
    expect(res.status).toBe(200)
    expect((await res.json()).entry).toEqual({ id: 'car2', ...brakeJob })
    await call('PUT', { token: 'vera-token', query: '?car=car1', body: { entry: { date: '2026-09-01', parts: [{ part: 'brakeFluid' }] } } })
    const edited = { id: 'car2', ...brakeJob, parts: [{ part: 'frontPads', what: 'Hawk DTC-70' }] }
    await call('PUT', { token: 'vera-token', query: '?car=car1', body: { entry: edited } })
    let [car] = (await garageOf('vera-token')).cars
    expect(car.log).toEqual([edited, { id: 'car3', date: '2026-09-01', parts: [{ part: 'brakeFluid' }] }])

    // Changing the car's details keeps its log.
    await call('PUT', { token: 'vera-token', body: { car: { id: 'car1', ...cayman, lugNutTorque: 96 } } })
    ;[car] = (await garageOf('vera-token')).cars
    expect(car.log).toHaveLength(2)

    expect((await call('DELETE', { token: 'vera-token', query: '?car=car1&entry=car2' })).status).toBe(200)
    ;[car] = (await garageOf('vera-token')).cars
    expect(car.log.map((c: { id: string }) => c.id)).toEqual(['car3'])
    expect((await call('DELETE', { token: 'vera-token', query: '?car=car1&entry=car2' })).status).toBe(404)
    expect((await call('PUT', { token: 'vera-token', query: '?car=car1', body: { entry: { id: 'nope', ...brakeJob } } })).status).toBe(404)
    expect((await call('PUT', { token: 'vera-token', query: '?car=nope', body: { entry: brakeJob } })).status).toBe(404)
  })

  it('keeps a car’s photo: set, read back, kept through edits, removed with the car', async () => {
    await addCar()
    const photo = (query = '?car=car1&photo=1', init: RequestInit = {}) => handler(
      new Request(`https://site.example/api/garage${query}`, { ...init, headers: { Authorization: 'Bearer vera-token', ...init.headers as object } }),
      {},
      { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity, newId: () => 'abcd' } as never,
    )
    expect((await photo()).status).toBe(404)
    const bytes = new Uint8Array([0xff, 0xd8, 0xff, 1, 2, 3])
    const put = await photo('?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'image/jpeg' }, body: bytes })
    expect(put.status).toBe(200)
    const { car } = await put.json()
    expect(car.photo).toBeTruthy()
    const got = await photo()
    expect(got.headers.get('content-type')).toBe('image/jpeg')
    expect(new Uint8Array(await got.arrayBuffer())).toEqual(bytes)
    // Not a photo: refused.
    expect((await photo('?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'text/plain' }, body: 'hi' })).status).toBe(400)
    const tooBig = await photo('?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'image/png' }, body: new Uint8Array(3_000_001) })
    expect(tooBig.status).toBe(400)
    expect((await tooBig.json()).error).toBe('That photo is over the 3 MB limit.')
    // Changing the car's details keeps it.
    await call('PUT', { token: 'vera-token', body: { car: { id: 'car1', ...cayman } } })
    expect((await garageOf('vera-token')).cars[0].photo).toBe(car.photo)
    // Someone else can't reach it.
    expect((await photo('?car=car1&photo=1', { headers: { Authorization: 'Bearer jason-token' } })).status).toBe(404)

    expect((await photo('?car=car1&photo=1', { method: 'DELETE' })).status).toBe(200)
    expect((await garageOf('vera-token')).cars[0]).not.toHaveProperty('photo')
    expect(blobs.data('site:garage-photos').size).toBe(0)
    await photo('?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'image/jpeg' }, body: bytes })
    await call('DELETE', { token: 'vera-token', query: '?car=car1' })
    expect(blobs.data('site:garage-photos').size).toBe(0)
  })

  it('on a deploy preview, shows the live photo until it’s changed there, never changing the live one', async () => {
    await addCar()
    const bytes = new Uint8Array([1, 2, 3])
    const photo = (method: string, context: unknown, body?: Uint8Array) => handler(
      new Request('https://site.example/api/garage?car=car1&photo=1', {
        method, headers: { Authorization: 'Bearer vera-token', 'Content-Type': 'image/png' }, ...(body ? { body } : {}),
      }),
      context,
      { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity } as never,
    )
    await photo('PUT', {}, bytes)
    const preview = { deploy: { context: 'deploy-preview' } }
    expect(new Uint8Array(await (await photo('GET', preview)).arrayBuffer())).toEqual(bytes)
    await photo('DELETE', preview)
    expect(blobs.data('site:garage-photos').size).toBe(1)
    expect((await photo('GET', {})).status).toBe(200)
  })

  it('removes a car and its log; its events keep their pressures, and the record goes with the last of it', async () => {
    await addCar()
    await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup } })
    await call('PUT', { token: 'vera-token', query: '?event=other', body: { setup: { carId: 'car1' } } })
    expect((await call('DELETE', { token: 'vera-token', query: '?car=car1' })).status).toBe(200)
    const garage = await garageOf('vera-token')
    expect(garage.cars).toEqual([])
    // Nothing left of the other event's but the car.
    expect(Object.keys(garage.events)).toEqual([EVENT])
    expect(garage.events[EVENT]).not.toHaveProperty('carId')
    expect(Object.keys(garage.events[EVENT].sessions)).toEqual(['2026-09-12 10:25 pink'])
    await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}` })
    expect(store.size).toBe(0)
    expect((await call('DELETE', { token: 'vera-token', query: '?car=car1' })).status).toBe(404)
  })

  it('refuses what isn’t a car or a setup', async () => {
    await addCar()
    const bad = async (body: unknown, query = '') => (await call('PUT', { token: 'vera-token', body, query })).status
    expect(await bad({ car: { make: 'Porsche' } })).toBe(400)
    expect(await bad({ car: { ...cayman, year: 1850 } })).toBe(400)
    expect(await bad({ car: { ...cayman, lugNutTorque: 900 } })).toBe(400)
    expect(await bad({ car: { ...cayman, make: 'x'.repeat(61) } })).toBe(400)
    const q = `?event=${EVENT}`
    expect(await bad({ setup: {} }, q)).toBe(400)
    expect(await bad({ setup: { carId: 'someone-elses' } }, q)).toBe(400)
    expect(await bad({ setup: { sessions: { x: { ...pressures, cold: { fl: 120 } } } } }, q)).toBe(400)
    expect(await bad({ setup: { sessions: { x: { ...pressures, time: '10:25 AM' } } } }, q)).toBe(400)
    expect(await bad({ setup: { sessions: { x: { date: '2026-09-12', time: '10:25', group: 'pink' } } } }, q)).toBe(400)
    expect(await bad({ setup }, '?event=../../x')).toBe(400)
    expect(await bad({ entry: { parts: [{ part: 'tires' }] } }, '?car=car1')).toBe(400)
    expect(await bad({ entry: { date: '2026-09-01', parts: [] } }, '?car=car1')).toBe(400)
    expect(await bad({ entry: { date: '2026-09-01', parts: [{ part: 'wipers' }] } }, '?car=car1')).toBe(400)
    expect(await bad({ entry: { ...brakeJob, note: 'x'.repeat(501) } }, '?car=car1')).toBe(400)
    expect(await bad('not json')).toBe(400)
    expect(Object.keys((await garageOf('vera-token')).events)).toEqual([])
    expect((await garageOf('vera-token')).cars[0]).not.toHaveProperty('log')
  })

  it('keeps at most 20 cars', async () => {
    ids = Array.from({ length: 21 }, (_, i) => `car${i}`)
    for (let i = 0; i < 20; i++) expect(await addCar()).toBeTruthy()
    expect((await call('PUT', { token: 'vera-token', body: { car: cayman } })).status).toBe(400)
  })

  it('keeps each driver’s garage to themselves; an admin can reach one (#288) and the test account’s (#309)', async () => {
    await addCar()
    expect((await garageOf('jason-token')).cars).toEqual([])
    expect((await call('GET', { token: 'jason-token', query: '?driver=vera' })).status).toBe(403)
    expect((await call('GET', { token: 'jason-token', query: '?driver=test-account' })).status).toBe(403)
    expect((await call('PUT', { token: 'admin-token', query: `?driver=${JASON}`, body: { car: cayman } })).status).toBe(200)
    expect((await garageOf('jason-token')).cars).toHaveLength(1)
    expect((await call('PUT', { token: 'admin-token', query: '?driver=test-account', body: { car: cayman } })).status).toBe(200)
    expect([...store.keys()].sort()).toEqual([`${JASON}/garage`, 'test-account/garage', 'vera/garage'])
  })

  it('on a deploy preview, starts from a copy of the driver’s live garage, and never changes the live one', async () => {
    await addCar()
    const preview = { deploy: { context: 'deploy-preview' } }
    expect((await (await call('GET', { token: 'vera-token', context: preview })).json()).cars).toHaveLength(1)
    await call('DELETE', { token: 'vera-token', context: preview, query: '?car=car1' })
    expect((await garageOf('vera-token')).cars).toHaveLength(1)
    expect((await (await call('GET', { token: 'vera-token', context: preview })).json()).cars).toEqual([])
  })
})
