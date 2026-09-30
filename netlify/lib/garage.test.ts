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
const setup = { carId: 'car1', tires: 'Hoosier R7', frontPads: 'Hawk DTC-60', sessions: { x: pressures } }

const garageOf = async (token: string, query?: string) => (await (await call('GET', { token, query })).json())
const addCar = async (token = 'vera-token', car: unknown = cayman) => (await (await call('PUT', { token, body: { car } })).json()).car

describe('garage function (#344)', () => {
  beforeEach(() => {
    blobs.clear()
    ids = ['car1', 'car2', 'car3']
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

  it('saves an event’s setup: its car, consumables and each session’s pressures, keyed as its laps are', async () => {
    await addCar()
    const res = await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup: { ...setup, rearPads: '  ' } } })
    expect(res.status).toBe(200)
    const { events } = await garageOf('vera-token')
    expect(events[EVENT]).toMatchObject({ carId: 'car1', tires: 'Hoosier R7', frontPads: 'Hawk DTC-60' })
    expect(events[EVENT]).not.toHaveProperty('rearPads')
    expect(events[EVENT].sessions).toEqual({ '2026-09-12 10:25 pink': { key: '2026-09-12 10:25 pink', ...pressures } })
  })

  it('removes an event’s setup', async () => {
    await addCar()
    await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup } })
    expect((await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}` })).status).toBe(200)
    expect((await garageOf('vera-token')).events).toEqual({})
    expect((await call('DELETE', { token: 'vera-token', query: `?event=${EVENT}` })).status).toBe(404)
  })

  it('removes a car; its events keep what they ran, and the record goes with the last of it', async () => {
    await addCar()
    await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup } })
    await call('PUT', { token: 'vera-token', query: '?event=other', body: { setup: { carId: 'car1' } } })
    expect((await call('DELETE', { token: 'vera-token', query: '?car=car1' })).status).toBe(200)
    const garage = await garageOf('vera-token')
    expect(garage.cars).toEqual([])
    // Nothing left of the other event's but the car.
    expect(Object.keys(garage.events)).toEqual([EVENT])
    expect(garage.events[EVENT]).not.toHaveProperty('carId')
    expect(garage.events[EVENT].tires).toBe('Hoosier R7')
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
    expect(await bad('not json')).toBe(400)
    expect(Object.keys((await garageOf('vera-token')).events)).toEqual([])
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
