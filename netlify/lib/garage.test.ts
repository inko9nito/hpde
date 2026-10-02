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
  'jason-token': { id: JASON, email: 'jason@example.com', user_metadata: { full_name: 'Jason Smith' } },
  'dad-token': { id: 'dad', email: 'dad@example.com', user_metadata: { full_name: 'Rick Smith', avatar_url: 'https://pics.example/rick.jpg' } },
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
let tokens: string[] = []
let now: Date | undefined

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
    {
      getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity,
      newId: () => ids.shift()!, newToken: () => tokens.shift()!, now: () => now ?? new Date(),
    } as never,
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
    tokens = ['invite-token-0001', 'invite-token-0002', 'invite-token-0003']
    now = undefined
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

  it('takes a car out of the garage: one that went to events is kept for them, and can be put back (#410)', async () => {
    await addCar()
    await call('PUT', { token: 'vera-token', query: '?car=car1', body: { entry: brakeJob } })
    await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup } })
    await call('PUT', { token: 'vera-token', query: '?event=other', body: { setup: { carId: 'car1' } } })
    // One that went nowhere just goes.
    const miata = await addCar('vera-token', { make: 'Mazda', model: 'Miata' })
    expect(await (await call('DELETE', { token: 'vera-token', query: `?car=${miata.id}` })).json()).toEqual({ deleted: miata.id })

    now = new Date('2026-10-02T12:00:00.000Z')
    const out = await call('DELETE', { token: 'vera-token', query: '?car=car1' })
    expect((await out.json()).car).toMatchObject({ id: 'car1', ...cayman, archived: '2026-10-02T12:00:00.000Z' })
    let garage = await garageOf('vera-token')
    // Still on its events, with its log; out of the garage.
    expect(garage.cars).toEqual([expect.objectContaining({ id: 'car1', archived: '2026-10-02T12:00:00.000Z', log: [expect.objectContaining(brakeJob)] })])
    expect(garage.events[EVENT].carId).toBe('car1')
    expect(garage.events.other.carId).toBe('car1')
    // Not to be shared, or put back twice.
    expect((await call('PUT', { token: 'vera-token', query: '?car=car1&invite=1' })).status).toBe(400)
    expect((await call('PUT', { token: 'vera-token', query: '?car=car1&restore=1' })).status).toBe(200)
    expect((await garageOf('vera-token')).cars[0]).not.toHaveProperty('archived')
    expect((await call('PUT', { token: 'vera-token', query: '?car=car1&restore=1' })).status).toBe(400)

    // Taken out again, then removed for good: its events keep their pressures, without it.
    await call('DELETE', { token: 'vera-token', query: '?car=car1' })
    expect(await (await call('DELETE', { token: 'vera-token', query: '?car=car1' })).json()).toEqual({ deleted: 'car1' })
    garage = await garageOf('vera-token')
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

  describe('a car shared between drivers (#398)', () => {
    const shared = blobs.data('site:garage-shared')
    const photos = blobs.data('site:garage-photos')
    const invite = async (token = 'vera-token', car = 'car1') => {
      const res = await call('PUT', { token, query: `?car=${car}&invite=1` })
      expect(res.status).toBe(200)
      return (await res.json()).invite.token as string
    }
    const join = (token: string, invite: string) => call('PUT', { token, query: `?invite=${invite}` })
    const photo = (token: string, query: string, init: RequestInit = {}) => handler(
      new Request(`https://site.example/api/garage${query}`, { ...init, headers: { Authorization: `Bearer ${token}`, ...init.headers as object } }),
      {},
      { getStore: blobs.getStore, getDeployStore: blobs.getDeployStore, fetch: fakeFetch, identity, newId: () => 'abcd' } as never,
    )
    const bytes = new Uint8Array([0xff, 0xd8, 0xff, 9])

    it('shares a car by an invite: its details, photo and log are both drivers’ from then on', async () => {
      await addCar()
      await photo('vera-token', '?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'image/jpeg' }, body: bytes })
      await call('PUT', { token: 'vera-token', query: '?car=car1', body: { entry: brakeJob } })
      await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup } })

      const token = await invite()
      // What it's for, before taking it: the car, and who it's from.
      const seen = await (await call('GET', { token: 'jason-token', query: `?invite=${token}` })).json()
      expect(seen.invite).toMatchObject({ car: { year: 2019, make: 'Porsche', model: '718 Cayman GTS', nickname: 'The Cayman' }, from: 'vera@example.com' })
      expect(seen.invite).not.toHaveProperty('carId')
      expect(Date.parse(seen.invite.expires) - Date.now()).toBeGreaterThan(13 * 86_400_000)

      expect((await (await join('jason-token', token)).json()).car).toEqual({ id: 'car1' })
      // Once.
      expect((await join('dad-token', token)).status).toBe(404)
      expect(shared.has(`invite/${token}`)).toBe(false)

      // In both garages, with both drivers, and its photo and log.
      const jasons = await garageOf('jason-token')
      const veras = await garageOf('vera-token')
      for (const garage of [jasons, veras]) {
        expect(garage.cars).toHaveLength(1)
        expect(garage.cars[0]).toMatchObject({ id: 'car1', ...cayman, log: [{ id: 'car2', ...brakeJob }] })
        expect(garage.cars[0].drivers.map((d: { name: string }) => d.name)).toEqual(['vera@example.com', 'Jason Smith'])
      }
      expect(jasons.cars[0].drivers[1]).toEqual({ id: JASON, name: 'Jason Smith', you: true })
      expect(veras.cars[0].drivers[0]).toEqual({ id: 'vera', name: 'vera@example.com', you: true })
      // Vera's event keeps it; Jason's garage has no events of hers.
      expect(veras.events[EVENT]).toMatchObject({ carId: 'car1' })
      expect(jasons.events).toEqual({})
      // Out of Vera's own cars, into its own record; the photo with it.
      expect(store.get('vera/garage')).toMatchObject({ cars: [], shared: ['car1'] })
      expect(store.get(`${JASON}/garage`)).toEqual({ cars: [], events: {}, shared: ['car1'] })
      expect([...photos.keys()]).toEqual(['shared/car1'])
      expect(new Uint8Array(await (await photo('jason-token', '?car=car1&photo=1')).arrayBuffer())).toEqual(bytes)

      // Either changes it, for both.
      await call('PUT', { token: 'jason-token', body: { car: { id: 'car1', ...cayman, lugNutTorque: 100 } } })
      await call('PUT', { token: 'jason-token', query: '?car=car1', body: { entry: { ...brakeJob, date: '2026-09-20' } } })
      const changed = (await garageOf('vera-token')).cars[0]
      expect(changed.lugNutTorque).toBe(100)
      expect(changed.photo).toBeTruthy()
      expect(changed.log).toHaveLength(2)
      expect((await call('DELETE', { token: 'vera-token', query: '?car=car1&entry=car2' })).status).toBe(200)
      expect((await garageOf('jason-token')).cars[0].log).toHaveLength(1)
    })

    it('says who drove it at which event, in which run group', async () => {
      await addCar()
      await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup: { carId: 'car1' } } })
      await join('jason-token', await invite())
      // Jason drives it at two events of his own; he said which group at one.
      expect((await call('PUT', { token: 'jason-token', query: '?car=car1', body: { events: ['2026-10-03_ecr', EVENT] } })).status).toBe(200)
      blobs.data('site:rsvps').set(JASON, { events: { '2026-10-03_ecr': { status: 'going', runGroup: 'blue' } } })
      blobs.data('site:rsvps').set('vera', { events: { [EVENT]: { status: 'going', runGroup: 'pink' } } })

      const veras = (await garageOf('vera-token')).cars[0]
      expect(veras.drives).toEqual([
        { eventId: '2026-10-03_ecr', driverId: JASON, runGroup: 'blue' },
        { eventId: EVENT, driverId: JASON },
      ])
      // Each sees the others' — their own are in their garage's events.
      expect((await garageOf('jason-token')).cars[0].drives).toEqual([{ eventId: EVENT, driverId: 'vera', runGroup: 'pink' }])
    })

    it('takes another driver from any of its drivers, and keeps to its own', async () => {
      await addCar()
      await join('jason-token', await invite())
      // Jason invites his dad.
      const token = await invite('jason-token')
      expect((await (await call('GET', { token: 'dad-token', query: `?invite=${token}` })).json()).invite.from).toBe('Jason Smith')
      await join('dad-token', token)
      expect((await garageOf('vera-token')).cars[0].drivers.map((d: { id: string }) => d.id)).toEqual(['vera', JASON, 'dad'])
      // One of its own drivers sees it's theirs already, and taking it again changes nothing.
      const again = await invite()
      expect((await (await call('GET', { token: 'dad-token', query: `?invite=${again}` })).json()).invite.carId).toBe('car1')
      expect((await join('dad-token', again)).status).toBe(200)
      expect((await garageOf('dad-token')).cars).toHaveLength(1)
      expect(store.get('dad/garage')).toEqual({ cars: [], events: {}, shared: ['car1'] })
      // No one else reaches it.
      expect((await call('GET', { token: 'admin-token', query: '?car=car1&photo=1' })).status).toBe(404)
      expect((await call('PUT', { token: 'admin-token', query: '?car=car1&invite=1' })).status).toBe(404)
    })

    it('takes it out of one driver’s garage only; it goes with the last', async () => {
      await addCar()
      await photo('vera-token', '?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'image/jpeg' }, body: bytes })
      await join('jason-token', await invite())
      await call('PUT', { token: 'jason-token', query: `?event=${EVENT}`, body: { setup } })

      expect((await call('DELETE', { token: 'jason-token', query: '?car=car1' })).status).toBe(200)
      const jasons = await garageOf('jason-token')
      // His event keeps it as it was when he left (#410): his own copy, out of his garage.
      expect(jasons.cars).toEqual([expect.objectContaining({ id: 'car1', ...cayman, archived: expect.any(String) })])
      expect(jasons.cars[0]).not.toHaveProperty('drivers')
      expect(jasons.events[EVENT].carId).toBe('car1')
      expect(new Uint8Array(await (await photo('jason-token', '?car=car1&photo=1')).arrayBuffer())).toEqual(bytes)
      expect((await garageOf('vera-token')).cars[0].drivers.map((d: { id: string }) => d.id)).toEqual(['vera'])
      expect([...photos.keys()].sort()).toEqual([`${JASON}/car1`, 'shared/car1'])

      // Vera never drove it at an event: with her, the last, it goes.
      expect((await call('DELETE', { token: 'vera-token', query: '?car=car1' })).status).toBe(200)
      expect((await garageOf('vera-token')).cars).toEqual([])
      expect(shared.size).toBe(0)
      expect([...photos.keys()]).toEqual([`${JASON}/car1`])
      expect(store.has('vera/garage')).toBe(false)
    })

    it('keeps a shared car for a driver who leaves it, though they never drove it at an event', async () => {
      await addCar()
      await join('jason-token', await invite())
      expect((await call('DELETE', { token: 'jason-token', query: '?car=car1' })).status).toBe(200)
      expect((await garageOf('jason-token')).cars).toEqual([expect.objectContaining({ id: 'car1', archived: expect.any(String) })])
      expect((await garageOf('vera-token')).cars[0]).not.toHaveProperty('archived')
    })

    it('takes back a driver who left it: the car itself in place of what was kept of it', async () => {
      await addCar()
      await join('jason-token', await invite())
      await call('PUT', { token: 'jason-token', query: `?event=${EVENT}`, body: { setup: { carId: 'car1' } } })
      await call('DELETE', { token: 'jason-token', query: '?car=car1' })
      expect((await join('jason-token', await invite())).status).toBe(200)
      const jasons = await garageOf('jason-token')
      expect(jasons.cars).toHaveLength(1)
      expect(jasons.cars[0]).not.toHaveProperty('archived')
      expect(jasons.cars[0].drivers.map((d: { id: string }) => d.id)).toEqual(['vera', JASON])
      expect(jasons.events[EVENT].carId).toBe('car1')
    })

    it('shows the car’s photo and the sender’s picture with the invite, and each driver’s picture with the car', async () => {
      await addCar('dad-token')
      await photo('dad-token', '?car=car1&photo=1', { method: 'PUT', headers: { 'Content-Type': 'image/jpeg' }, body: bytes })
      const token = await invite('dad-token')
      const seen = (await (await call('GET', { token: 'jason-token', query: `?invite=${token}` })).json()).invite
      expect(seen).toMatchObject({ from: 'Rick Smith', fromAvatar: 'https://pics.example/rick.jpg', photo: expect.any(String) })
      expect(new Uint8Array(await (await photo('jason-token', `?invite=${token}&photo=1`)).arrayBuffer())).toEqual(bytes)
      expect((await photo('jason-token', '?invite=not-a-real-invite-x&photo=1')).status).toBe(404)

      await join('jason-token', token)
      expect((await garageOf('jason-token')).cars[0].drivers).toEqual([
        { id: 'dad', name: 'Rick Smith', avatar: 'https://pics.example/rick.jpg' },
        { id: JASON, name: 'Jason Smith', you: true },
      ])
      // A picture added since shows from their next visit.
      identityUsers['jason-token'] = { id: JASON, email: 'jason@example.com', user_metadata: { full_name: 'Jason Smith', avatar_url: 'https://pics.example/jason.jpg' } }
      try {
        await garageOf('jason-token')
        expect((await garageOf('dad-token')).cars[0].drivers[1]).toEqual({ id: JASON, name: 'Jason Smith', avatar: 'https://pics.example/jason.jpg' })
      } finally {
        identityUsers['jason-token'] = { id: JASON, email: 'jason@example.com', user_metadata: { full_name: 'Jason Smith' } }
      }
    })

    it('refuses an invite that’s expired, made up, or for a car that’s gone', async () => {
      await addCar()
      const token = await invite()
      now = new Date(Date.now() + 15 * 86_400_000)
      expect((await call('GET', { token: 'jason-token', query: `?invite=${token}` })).status).toBe(404)
      expect((await join('jason-token', token)).status).toBe(404)
      now = undefined
      expect((await join('jason-token', 'not-a-real-invite-x')).status).toBe(404)
      expect((await join('jason-token', '../x')).status).toBe(404)
      expect((await join('jason-token', token)).status).toBe(200)
      const gone = await invite()
      await call('DELETE', { token: 'vera-token', query: '?car=car1' })
      await call('DELETE', { token: 'jason-token', query: '?car=car1' })
      expect((await join('dad-token', gone)).status).toBe(404)
      expect((await garageOf('dad-token')).cars).toEqual([])
    })

    it('gives it an id of its own when another driver has a car with the same one', async () => {
      await addCar()
      await call('PUT', { token: 'vera-token', query: `?event=${EVENT}`, body: { setup: { carId: 'car1' } } })
      ids = ['car1']
      await addCar('jason-token')
      await join('jason-token', await invite())
      const veras = await garageOf('vera-token')
      const id = veras.cars[0].id
      expect(id).not.toBe('car1')
      expect(veras.events[EVENT].carId).toBe(id)
      expect((await garageOf('jason-token')).cars.map((c: { id: string }) => c.id)).toEqual(['car1', id])
    })

    it('on a deploy preview, starts from a copy of the shared car, and never changes the live one', async () => {
      await addCar()
      await join('jason-token', await invite())
      const preview = { deploy: { context: 'deploy-preview' } }
      await call('PUT', { token: 'jason-token', context: preview, body: { car: { id: 'car1', ...cayman, nickname: 'Preview' } } })
      expect((await (await call('GET', { token: 'vera-token', context: preview })).json()).cars[0].nickname).toBe('Preview')
      expect((await garageOf('vera-token')).cars[0].nickname).toBe('The Cayman')
    })
  })
})
