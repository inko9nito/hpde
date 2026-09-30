import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { ensureCopied, openStores, whoseRecords } from '../lib/driverStore.mts'
import type { StoreDeps } from '../lib/driverStore.mts'
import { MAX_CARS, MAX_EVENTS, MAX_LOG, cleanCar, cleanChange, cleanSetup } from '../../src/utils/garage.ts'
import type { Car, ConsumableChange, EventSetup, Garage } from '../../src/utils/garage.ts'

// A signed-in driver's garage (#344), private to them, as their laps and
// notes are: every request needs their sign-in and only reaches their own
// — or, for an admin, the test account's (#309) or the driver named by
// `driver=<user id>` (#288).
//   GET                          their cars, and each event's setup: { cars, events }
//   PUT    {car}                 adds a car (no id) or changes one (its id);
//                                its log is kept as it is
//   DELETE ?car=<id>             removes a car and its log; events it went
//                                to keep their tire pressures
//   PUT    ?car=<id>  {change}   logs a consumable's change on the car (no
//                                id), or changes an entry (its id)
//   DELETE ?car=<id>&change=<id> removes an entry from its log
//   PUT    ?event=  {setup}      saves an event's setup (replacing any): the
//                                car, and each session's pressures
//   DELETE ?event=               removes an event's setup
//
// Kept in Netlify Blobs, one record per driver, keyed `<user id>/garage`.
// A deploy preview gets a store of its own, which starts as a copy of the
// driver's live garage the first time it's used there — so changes there
// never touch the live one. Each deploy copies afresh.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/garage' }

export const GARAGE_STORE = 'garage'
// On a preview: which drivers' live garages have been copied in.
export const GARAGE_META_STORE = 'garage-meta'

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/

type Deps = StoreDeps & { fetch?: typeof fetch; newId?: () => string }

const randomId = () => crypto.randomUUID().slice(0, 8)

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams
  const whose = await whoseRecords(user, params.get('driver'), 'a garage', deps.identity)
  if (whose instanceof Response) return whose
  const { driverId } = whose

  const stores = openStores(context, deps, GARAGE_STORE, GARAGE_META_STORE)
  await ensureCopied(stores, driverId)
  const store = stores.records
  const key = `${driverId}/garage`
  const record = (await store.get(key, { type: 'json' })) as Garage | null
  const garage: Garage = { cars: record?.cars ?? [], events: record?.events ?? {} }

  if (req.method === 'GET') return json(200, garage)

  // Saves what's left, or with nothing left, removes the record.
  const put = async (next: Garage) => {
    if (next.cars.length === 0 && Object.keys(next.events).length === 0) await store.delete(key)
    else await store.setJSON(key, next)
  }
  const updatedAt = new Date().toISOString()
  const eventId = params.get('event')
  const carId = params.get('car')

  const car = carId !== null ? garage.cars.find(c => c.id === carId) : undefined
  if (carId !== null && !car) return json(404, { error: 'That car isn’t in the garage.' })
  const newId = deps.newId ?? randomId

  if (req.method === 'DELETE') {
    const changeId = params.get('change')
    if (car && changeId !== null) {
      if (!car.log?.some(c => c.id === changeId)) return json(404, { error: 'That change isn’t in the car’s log.' })
      const log = car.log.filter(c => c.id !== changeId)
      const { log: _old, ...rest } = car
      await put({ ...garage, cars: garage.cars.map(c => (c.id === car.id ? { ...rest, ...(log.length ? { log } : {}) } : c)) })
      return json(200, { deleted: changeId })
    }
    if (carId !== null) {
      // Its events keep their tire pressures, without the car.
      const events = Object.fromEntries(Object.entries(garage.events).flatMap(([id, setup]): [string, EventSetup][] => {
        if (setup.carId !== carId) return [[id, setup]]
        const { carId: _gone, ...rest } = setup
        // Nothing left but the car: nothing to keep.
        return 'value' in cleanSetup(rest, []) ? [[id, rest]] : []
      }))
      await put({ cars: garage.cars.filter(c => c.id !== carId), events })
      return json(200, { deleted: carId })
    }
    if (eventId === null || !EVENT_ID.test(eventId)) return json(400, { error: 'Missing event.' })
    if (!garage.events[eventId]) return json(404, { error: 'Nothing saved for this event.' })
    const { [eventId]: _gone, ...events } = garage.events
    await put({ ...garage, events })
    return json(200, { deleted: eventId })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }

  if (car) {
    const cleaned = cleanChange(body?.change)
    if ('error' in cleaned) return json(400, { error: cleaned.error })
    const log = car.log ?? []
    const id = body?.change?.id
    if (id !== undefined && id !== null && !log.some(c => c.id === id)) return json(404, { error: 'That change isn’t in the car’s log.' })
    if (id === undefined || id === null) {
      if (log.length >= MAX_LOG) return json(400, { error: 'That’s too many changes for one car.' })
    }
    let fresh = id ?? newId()
    while ((id === undefined || id === null) && log.some(c => c.id === fresh)) fresh = randomId()
    const change: ConsumableChange = { id: fresh, ...cleaned.value }
    const next = id ? log.map(c => (c.id === id ? change : c)) : [...log, change]
    await put({ ...garage, cars: garage.cars.map(c => (c.id === car.id ? { ...c, log: next, updatedAt } : c)) })
    return json(200, { change })
  }

  if (eventId !== null) {
    if (!EVENT_ID.test(eventId)) return json(400, { error: 'Missing event.' })
    const cleaned = cleanSetup(body?.setup, garage.cars.map(c => c.id))
    if ('error' in cleaned) return json(400, { error: cleaned.error })
    if (!garage.events[eventId] && Object.keys(garage.events).length >= MAX_EVENTS) {
      return json(400, { error: 'That’s too many events.' })
    }
    const setup: EventSetup = { ...cleaned.value, updatedAt }
    await put({ ...garage, events: { ...garage.events, [eventId]: setup } })
    return json(200, { setup })
  }

  const cleaned = cleanCar(body?.car)
  if ('error' in cleaned) return json(400, { error: cleaned.error })
  const id = body?.car?.id
  if (id !== undefined && id !== null) {
    const old = garage.cars.find(c => c.id === id)
    if (!old) return json(404, { error: 'That car isn’t in the garage.' })
    const changed: Car = { id, ...cleaned.value, ...(old.log ? { log: old.log } : {}), updatedAt }
    await put({ ...garage, cars: garage.cars.map(c => (c.id === id ? changed : c)) })
    return json(200, { car: changed })
  }
  if (garage.cars.length >= MAX_CARS) return json(400, { error: `That’s too many cars (at most ${MAX_CARS}).` })
  let fresh = newId()
  while (garage.cars.some(c => c.id === fresh)) fresh = randomId()
  const added: Car = { id: fresh, ...cleaned.value, updatedAt }
  await put({ ...garage, cars: [...garage.cars, added] })
  return json(200, { car: added })
}
