import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { ensureCopied, openStores, whoseRecords } from '../lib/driverStore.mts'
import type { DriverStores, StoreDeps } from '../lib/driverStore.mts'
import { ensureRsvpsCopied, openRsvpStores } from '../lib/rsvpStore.mts'
import type { DriverRsvps } from '../lib/rsvpStore.mts'
import { INVITE_DAYS, MAX_CARS, MAX_DRIVERS, MAX_EVENTS, MAX_LOG, MAX_PHOTO_BYTES, PHOTO_LIMIT, PHOTO_TYPES, activeCars, cleanCar, cleanEntry, cleanSetup } from '../../src/utils/garage.ts'
import type { Car, CarDrive, CarDriver, CarInvite, EventSetup, Garage, LogEntry } from '../../src/utils/garage.ts'

// A signed-in driver's garage (#344), private to them, as their laps and
// notes are: every request needs their sign-in and only reaches their own
// — or, for an admin, the test account's (#309) or the driver named by
// `driver=<user id>` (#288).
//   GET                          their cars, and each event's setup: { cars, events }
//   PUT    {car}                 adds a car (no id) or changes one (its id);
//                                its photo and log are kept as they are
//   DELETE ?car=<id>             takes a car out of the garage (#410): one
//                                that went to events, or is shared, is kept
//                                — photo, log and all — marked `archived`,
//                                and can be put back; one that did neither,
//                                or one already archived, goes, with its
//                                photo and log (its events keep their tire
//                                pressures)
//   PUT    ?car=<id>&restore=1   puts an archived car back in the garage
//   GET    ?car=<id>&photo=1     the car's photo
//   PUT    ?car=<id>&photo=1     sets it: the image itself as the body
//   DELETE ?car=<id>&photo=1     removes it
//   PUT    ?car=<id>  {entry}    logs a job on the car — the consumables
//                                changed on one day — (no id), or changes
//                                an entry (its id)
//   DELETE ?car=<id>&entry=<id>  removes an entry from its log
//   PUT    ?car=<id>  {events}   drives it at these events (their ids): the
//                                car of each, instead of any other; their
//                                tire pressures are kept
//   PUT    ?event=  {setup}      saves an event's setup (replacing any): the
//                                car, and each session's pressures
//   DELETE ?event=               removes an event's setup
//
// A car can be shared with other drivers (#398) — Jason and his dad, one
// Mustang: its details, photo and log are theirs together, and each of
// them drives it at their own events, with their own tire pressures.
//   PUT    ?car=<id>&invite=1    an invite to share it: { invite: { token,
//                                expires } }, for a link. Works once, for
//                                INVITE_DAYS days.
//   GET    ?invite=<token>       what the invite is for: { invite } (CarInvite)
//   GET    ?invite=<token>&photo=1  the car's photo, to show with it
//   PUT    ?invite=<token>       takes it: the car's in their garage too
//   DELETE ?car=<id>             on a shared car, takes it out of their
//                                garage only — kept as it is then, archived,
//                                for the events they drove it at — and it
//                                goes with its last driver
// A shared car comes with its drivers (`drivers`, each by name and, from
// their sign-in, their picture) and the events the others drove it at, in
// their run group there (`drives`).
//
// Kept in Netlify Blobs, one record per driver, keyed `<user id>/garage`;
// photos in a store of their own, keyed `<user id>/<car id>`. A shared car
// moves out of its first driver's record, when another takes the invite,
// to one of its own in the shared store, keyed `car/<car id>` (its photo:
// `shared/<car id>`), and each of its drivers' records lists it under
// `shared`; invites are kept there too, keyed `invite/<token>`. A deploy
// preview gets stores of its own: the garage starts as a copy of the
// driver's live one the first time it's used there, as does a shared car,
// and a photo not changed there is read from the live store — so changes
// there never touch the live garage. Each deploy copies afresh.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/garage' }

export const GARAGE_STORE = 'garage'
// On a preview: which drivers' live garages have been copied in.
export const GARAGE_META_STORE = 'garage-meta'
export const PHOTO_STORE = 'garage-photos'
// Shared cars and the invites to them (#398).
export const SHARED_STORE = 'garage-shared'
// On a preview: which shared cars have been copied in.
export const SHARED_META_STORE = 'garage-shared-meta'

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/
const TOKEN = /^[A-Za-z0-9_-]{16,64}$/

type Deps = StoreDeps & { fetch?: typeof fetch; newId?: () => string; newToken?: () => string; now?: () => Date }

const randomId = () => crypto.randomUUID().slice(0, 8)
const randomToken = () => Buffer.from(crypto.getRandomValues(new Uint8Array(18))).toString('base64url')

/** A driver's record: their own cars, the shared cars they drive, and each event's setup. */
type DriverRecord = Garage & { shared?: string[] }

/** A shared car (#398): the car, and who drives it. */
interface SharedCar {
  car: Car
  drivers: CarDriver[]
}

/** An invite to share a car: whose garage it's in until it's shared, or that it already is. */
interface Invite {
  carId: string
  /** The driver who sent it. */
  from: CarDriver
  /** Set while the car is still in the sender's own garage. */
  owner?: string
  expires: string
}

/** A shared car's record, copied in from the live store the first time a preview reads it. */
async function readShared(stores: DriverStores, key: string): Promise<SharedCar | null> {
  if (stores.live && !(await stores.meta.get(key, { type: 'json' }))) {
    const live = await stores.live.get(key, { type: 'json' })
    if (live) await stores.records.setJSON(key, live, { onlyIfNew: true })
    await stores.meta.setJSON(key, { at: new Date().toISOString() })
  }
  return (await stores.records.get(key, { type: 'json' })) as SharedCar | null
}

/** A photo as it's sent: the image, cached for good (its URL names it). */
function photoResponse(found: { data: unknown; metadata?: Record<string, unknown> }) {
  return new Response(found.data as ArrayBuffer, {
    headers: {
      'Content-Type': String(found.metadata?.contentType ?? 'image/jpeg'),
      // The URL names the photo (v=), so a new one is a new URL.
      'Cache-Control': 'private, max-age=31536000, immutable',
    },
  })
}

/** A photo, from the deploy's own store or, on a preview, the live one. */
async function readPhoto(photos: DriverStores, key: string) {
  return (await photos.records.getWithMetadata(key, { type: 'arrayBuffer' }))
    ?? (await photos.live?.getWithMetadata(key, { type: 'arrayBuffer' }))
    ?? null
}

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams
  const whose = await whoseRecords(user, params.get('driver'), 'a garage', deps.identity)
  if (whose instanceof Response) return whose
  const { driverId } = whose
  // Their picture, from their own sign-in: not an admin's, acting for them.
  const avatar = driverId === user.id ? (user as { avatar?: string | null }).avatar : null
  const me: CarDriver = { id: driverId, name: whose.driverName ?? 'A driver', ...(avatar ? { avatar } : {}) }

  const stores = openStores(context, deps, GARAGE_STORE, GARAGE_META_STORE)
  const sharedStores = openStores(context, deps, SHARED_STORE, SHARED_META_STORE)
  const photos = () => openStores(context, deps, PHOTO_STORE, `${PHOTO_STORE}-meta`)
  const store = stores.records
  const updatedAt = (deps.now?.() ?? new Date()).toISOString()
  const newId = deps.newId ?? randomId

  // A driver's record, as it's kept.
  const recordOf = async (id: string): Promise<DriverRecord> => {
    await ensureCopied(stores, id)
    const record = (await store.get(`${id}/garage`, { type: 'json' })) as DriverRecord | null
    return { cars: record?.cars ?? [], events: record?.events ?? {}, ...(record?.shared?.length ? { shared: record.shared } : {}) }
  }
  // Saves what's left, or with nothing left, removes the record.
  const putRecord = async (id: string, next: DriverRecord) => {
    const { shared, ...rest } = next
    if (rest.cars.length === 0 && Object.keys(rest.events).length === 0 && !shared?.length) await store.delete(`${id}/garage`)
    else await store.setJSON(`${id}/garage`, shared?.length ? { ...rest, shared } : rest)
  }

  const record = await recordOf(driverId)
  // The shared cars they drive: those still there, with them among its drivers.
  const sharedCars = (await Promise.all((record.shared ?? []).map(id => readShared(sharedStores, `car/${id}`))))
    .filter((s): s is SharedCar => !!s && s.drivers.some(d => d.id === driverId))
  const garage: Garage = { cars: [...record.cars, ...sharedCars.map(s => s.car)], events: record.events }

  const put = (next: Garage) => putRecord(driverId, {
    cars: next.cars.filter(c => !sharedCars.some(s => s.car.id === c.id)),
    events: next.events,
    ...(record.shared ? { shared: record.shared } : {}),
  })

  // An invite: what it's for, and taking it (#398).
  const token = params.get('invite')
  if (token !== null && token !== '1') {
    if (!TOKEN.test(token)) return json(404, { error: 'That invite has expired, or was already used.' })
    const inviteKey = `invite/${token}`
    const invite = (await sharedStores.records.get(inviteKey, { type: 'json' })) as Invite | null
    if (!invite || invite.expires < updatedAt) return json(404, { error: 'That invite has expired, or was already used.' })
    const shared = invite.owner ? null : await readShared(sharedStores, `car/${invite.carId}`)
    const owner = invite.owner ? await recordOf(invite.owner) : null
    const car = shared?.car ?? owner?.cars.find(c => c.id === invite.carId && !c.archived)
    if (!car) return json(404, { error: 'That car isn’t in their garage any more.' })
    const mine = invite.owner === driverId || shared?.drivers.some(d => d.id === driverId)

    if (req.method === 'GET' && params.get('photo')) {
      const found = car.photo ? await readPhoto(photos(), invite.owner ? `${invite.owner}/${car.id}` : `shared/${car.id}`) : null
      if (!found) return json(404, { error: 'That car has no photo.' })
      return photoResponse(found)
    }
    if (req.method === 'GET') {
      const { year, make, model, nickname } = car
      const shown: CarInvite = {
        car: { ...(year !== undefined ? { year } : {}), make, model, ...(nickname ? { nickname } : {}) },
        from: invite.from.name,
        ...(invite.from.avatar ? { fromAvatar: invite.from.avatar } : {}),
        ...(car.photo ? { photo: car.photo } : {}),
        expires: invite.expires,
        ...(mine ? { carId: car.id } : {}),
      }
      return json(200, { invite: shown })
    }
    if (req.method !== 'PUT') return json(405, { error: 'Method not allowed.' })
    if (mine) return json(200, { car: { id: car.id } })
    if (activeCars(garage.cars).length >= MAX_CARS) return json(400, { error: `Your garage is full (at most ${MAX_CARS} cars).` })
    if ((shared?.drivers.length ?? 1) >= MAX_DRIVERS) return json(400, { error: `That car has as many drivers as it can (${MAX_DRIVERS}).` })

    let id = car.id
    if (owner) {
      // Out of its first driver's garage, into one of its own — under a
      // new id if its own is taken there, or in this garage.
      const taken = async (candidate: string) => garage.cars.some(c => c.id === candidate)
        || !!(await readShared(sharedStores, `car/${candidate}`))
      while (await taken(id)) id = randomId()
      if (car.photo) {
        const found = await readPhoto(photos(), `${invite.owner}/${car.id}`)
        if (found) await photos().records.set(`shared/${id}`, found.data as ArrayBuffer, { metadata: found.metadata })
        await photos().records.delete(`${invite.owner}/${car.id}`)
      }
      await sharedStores.records.setJSON(`car/${id}`, { car: { ...car, id }, drivers: [invite.from, me] } satisfies SharedCar)
      const events = id === car.id ? owner.events : Object.fromEntries(Object.entries(owner.events).map(([e, setup]) => [e, setup.carId === car.id ? { ...setup, carId: id } : setup]))
      await putRecord(invite.owner!, { cars: owner.cars.filter(c => c.id !== car.id), events, shared: [...(owner.shared ?? []), id] })
    } else {
      const same = garage.cars.find(c => c.id === id)
      if (same && !same.archived) return json(409, { error: 'A car of yours has the same id as that one. Remove it, or ask for another invite.' })
      // Back to a car they left: what was kept of it gives way to the car itself.
      if (same) {
        record.cars = record.cars.filter(c => c.id !== id)
        if (same.photo) await photos().records.delete(`${driverId}/${id}`)
      }
      await sharedStores.records.setJSON(`car/${id}`, { ...shared!, drivers: [...shared!.drivers, me] })
    }
    await putRecord(driverId, { ...record, shared: [...(record.shared ?? []).filter(s => s !== id), id] })
    await sharedStores.records.delete(inviteKey)
    return json(200, { car: { id } })
  }

  const eventId = params.get('event')
  const carId = params.get('car')
  const car = carId !== null ? garage.cars.find(c => c.id === carId) : undefined
  if (carId !== null && !car) return json(404, { error: 'That car isn’t in the garage.' })
  const sharedCar = car ? sharedCars.find(s => s.car.id === car.id) : undefined
  // Changes the car where it's kept: a shared one in its own record.
  const replaceCar = (next: Car) => sharedCar
    ? sharedStores.records.setJSON(`car/${next.id}`, { ...sharedCar, car: next })
    : put({ ...garage, cars: garage.cars.map(c => (c.id === next.id ? next : c)) })
  const photoKey = car ? (sharedCar ? `shared/${car.id}` : `${driverId}/${car.id}`) : ''

  if (car && params.get('restore') === '1') {
    if (req.method !== 'PUT') return json(405, { error: 'Method not allowed.' })
    if (!car.archived) return json(400, { error: 'That car is in the garage already.' })
    if (activeCars(garage.cars).length >= MAX_CARS) return json(400, { error: `Your garage is full (at most ${MAX_CARS} cars).` })
    const { archived: _was, ...back } = car
    const restored: Car = { ...back, updatedAt }
    await put({ ...garage, cars: garage.cars.map(c => (c.id === car.id ? restored : c)) })
    return json(200, { car: restored })
  }

  if (car && params.get('invite') === '1') {
    if (req.method !== 'PUT') return json(405, { error: 'Method not allowed.' })
    if (car.archived) return json(400, { error: 'Put the car back in your garage first.' })
    if ((sharedCar?.drivers.length ?? 1) >= MAX_DRIVERS) return json(400, { error: `That car has as many drivers as it can (${MAX_DRIVERS}).` })
    const invite: Invite = {
      carId: car.id,
      from: sharedCar?.drivers.find(d => d.id === driverId) ?? me,
      ...(sharedCar ? {} : { owner: driverId }),
      expires: new Date(Date.parse(updatedAt) + INVITE_DAYS * 86_400_000).toISOString(),
    }
    const fresh = (deps.newToken ?? randomToken)()
    await sharedStores.records.setJSON(`invite/${fresh}`, invite)
    return json(200, { invite: { token: fresh, expires: invite.expires } })
  }

  if (car && params.get('photo')) {
    if (req.method === 'GET') {
      if (!car.photo) return json(404, { error: 'That car has no photo.' })
      const found = await readPhoto(photos(), photoKey)
      if (!found) return json(404, { error: 'That car has no photo.' })
      return photoResponse(found)
    }
    if (req.method === 'DELETE') {
      await photos().records.delete(photoKey)
      const { photo: _gone, ...rest } = car
      await replaceCar({ ...rest, updatedAt })
      return json(200, { car: { ...rest, updatedAt } })
    }
    const type = (req.headers.get('content-type') ?? '').split(';')[0].trim()
    if (!PHOTO_TYPES.includes(type)) return json(400, { error: 'The photo must be a JPEG, PNG or WebP image.' })
    const data = await req.arrayBuffer()
    if (data.byteLength === 0) return json(400, { error: 'The photo is empty.' })
    if (data.byteLength > MAX_PHOTO_BYTES) return json(400, { error: `That photo is over the ${PHOTO_LIMIT} limit.` })
    await photos().records.set(photoKey, data, { metadata: { contentType: type } })
    const next: Car = { ...car, photo: `${Date.now().toString(36)}${newId().slice(0, 4)}`, updatedAt }
    await replaceCar(next)
    return json(200, { car: next })
  }

  if (req.method === 'GET') {
    // Their name and picture as they are now, on the shared cars they drive.
    if (driverId === user.id) {
      for (const s of sharedCars) {
        const was = s.drivers.find(d => d.id === driverId)!
        if (was.name === me.name && was.avatar === me.avatar) continue
        s.drivers = s.drivers.map(d => (d.id === driverId ? me : d))
        await sharedStores.records.setJSON(`car/${s.car.id}`, s)
      }
    }
    // A shared car's drivers, and the events the others drove it at, in
    // their run group there.
    const rsvpStores = openRsvpStores(context, deps)
    const others = [...new Set(sharedCars.flatMap(s => s.drivers.map(d => d.id)))].filter(id => id !== driverId)
    const theirs = new Map(await Promise.all(others.map(async id => {
      await ensureRsvpsCopied(rsvpStores, id)
      const rsvps = (await rsvpStores.rsvps.get(id, { type: 'json' })) as DriverRsvps | null
      return [id, { events: (await recordOf(id)).events, rsvps: rsvps?.events ?? {} }] as const
    })))
    const shown = (s: SharedCar): Car => ({
      ...s.car,
      drivers: s.drivers.map(d => (d.id === driverId ? { ...d, you: true } : d)),
      drives: s.drivers.flatMap(d => {
        const them = theirs.get(d.id)
        if (!them) return []
        return Object.entries(them.events).filter(([, setup]) => setup.carId === s.car.id).map(([eventId]): CarDrive => {
          const runGroup = them.rsvps[eventId]?.runGroup
          return { eventId, driverId: d.id, ...(runGroup ? { runGroup } : {}) }
        })
      }),
    })
    return json(200, { cars: [...record.cars, ...sharedCars.map(shown)], events: garage.events })
  }

  if (req.method === 'DELETE') {
    const entryId = params.get('entry')
    if (car && entryId !== null) {
      if (!car.log?.some(e => e.id === entryId)) return json(404, { error: 'That entry isn’t in the car’s log.' })
      const log = car.log.filter(e => e.id !== entryId)
      const { log: _old, ...rest } = car
      await replaceCar({ ...rest, ...(log.length ? { log } : {}), updatedAt })
      return json(200, { deleted: entryId })
    }
    if (car && !car.archived) {
      // A shared car stays with its other drivers; with none, it goes.
      const others = sharedCar?.drivers.filter(d => d.id !== driverId) ?? []
      if (others.length) await sharedStores.records.setJSON(`car/${car.id}`, { ...sharedCar!, drivers: others })
      else if (sharedCar) await sharedStores.records.delete(`car/${car.id}`)
      // Driven at events, or shared: kept, as it is now (#410), its photo
      // where their own cars' are. Neither: it goes.
      const went = Object.values(garage.events).some(setup => setup.carId === car.id) || others.length > 0
      const ownKey = `${driverId}/${car.id}`
      if (car.photo && sharedCar && went) {
        const found = await readPhoto(photos(), photoKey)
        if (found) await photos().records.set(ownKey, found.data as ArrayBuffer, { metadata: found.metadata })
      }
      if (car.photo && (sharedCar ? !others.length : !went)) await photos().records.delete(photoKey)
      const { drivers: _drivers, drives: _drives, ...details } = car
      const kept: Car = { ...details, archived: updatedAt }
      const own = record.cars.filter(c => c.id !== car.id)
      await putRecord(driverId, {
        cars: !went ? own : sharedCar ? [...own, kept] : record.cars.map(c => (c.id === car.id ? kept : c)),
        events: garage.events,
        shared: (record.shared ?? []).filter(id => id !== car.id),
      })
      return json(200, went ? { car: kept } : { deleted: car.id })
    }
    if (car) {
      // Already out of the garage: gone for good. Its events keep their
      // tire pressures, without it.
      if (car.photo) await photos().records.delete(`${driverId}/${car.id}`)
      const events = Object.fromEntries(Object.entries(garage.events).flatMap(([id, setup]): [string, EventSetup][] => {
        if (setup.carId !== carId) return [[id, setup]]
        const { carId: _gone, ...rest } = setup
        // Nothing left but the car: nothing to keep.
        return 'value' in cleanSetup(rest, []) ? [[id, rest]] : []
      }))
      await putRecord(driverId, {
        cars: record.cars.filter(c => c.id !== carId),
        events,
        ...(record.shared ? { shared: record.shared } : {}),
      })
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

  if (car && body?.events !== undefined) {
    const ids = body.events
    if (!Array.isArray(ids) || ids.length === 0 || !ids.every(id => typeof id === 'string' && EVENT_ID.test(id))) {
      return json(400, { error: 'Pick the events to drive it at.' })
    }
    const unique = [...new Set(ids as string[])]
    const added = unique.filter(id => !garage.events[id]).length
    if (Object.keys(garage.events).length + added > MAX_EVENTS) return json(400, { error: 'That’s too many events.' })
    const setups = Object.fromEntries(unique.map(id => [id, { ...garage.events[id], carId: car.id, updatedAt }]))
    await put({ ...garage, events: { ...garage.events, ...setups } })
    return json(200, { events: setups })
  }

  if (car) {
    const cleaned = cleanEntry(body?.entry)
    if ('error' in cleaned) return json(400, { error: cleaned.error })
    const log = car.log ?? []
    const id = body?.entry?.id
    const isNew = id === undefined || id === null
    if (!isNew && !log.some(e => e.id === id)) return json(404, { error: 'That entry isn’t in the car’s log.' })
    if (isNew && log.length >= MAX_LOG) return json(400, { error: 'That’s too many entries for one car.' })
    let fresh = isNew ? newId() : id
    while (isNew && log.some(e => e.id === fresh)) fresh = randomId()
    const entry: LogEntry = { id: fresh, ...cleaned.value }
    await replaceCar({ ...car, log: isNew ? [...log, entry] : log.map(e => (e.id === id ? entry : e)), updatedAt })
    return json(200, { entry })
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
    const changed: Car = {
      id, ...cleaned.value,
      ...(old.photo ? { photo: old.photo } : {}), ...(old.log ? { log: old.log } : {}), ...(old.archived ? { archived: old.archived } : {}),
      updatedAt,
    }
    if (sharedCars.some(s => s.car.id === id)) {
      const s = sharedCars.find(s => s.car.id === id)!
      await sharedStores.records.setJSON(`car/${id}`, { ...s, car: changed })
    } else await put({ ...garage, cars: garage.cars.map(c => (c.id === id ? changed : c)) })
    return json(200, { car: changed })
  }
  if (activeCars(garage.cars).length >= MAX_CARS) return json(400, { error: `That’s too many cars (at most ${MAX_CARS}).` })
  let fresh = newId()
  while (garage.cars.some(c => c.id === fresh)) fresh = randomId()
  const added: Car = { id: fresh, ...cleaned.value, updatedAt }
  await put({ ...garage, cars: [...garage.cars, added] })
  return json(200, { car: added })
}
