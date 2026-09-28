import { createHash } from 'node:crypto'
import { getStore, getDeployStore } from '@netlify/blobs'
import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { isAdmin } from '../lib/newEvent.mjs'
import { findDriver } from '../lib/drivers.mjs'
import { cleanSessionLaps, lapStats } from '../../src/utils/lapTimes.ts'
import type { SessionLaps } from '../../src/utils/lapTimes.ts'
import { TEST_DRIVER_ID } from '../../src/data/testAccount.ts'
import { SAMPLE_DRIVER_EMAIL_SHA256, TEST_ACCOUNT_LAPS, TEST_ACCOUNT_VERSION } from '../../src/data/fixtures/testAccountLaps.ts'

// A signed-in driver's own lap times (#210), private to them: every request
// needs their sign-in, and only ever reaches their own laps — the key is
// made from who the token says they are, never from anything sent. The one
// exception is an admin, who can add `driver=<user id>` to any of these to
// read and write that driver's laps instead (#288) — the id is checked
// against Identity, and a session saved that way records who saved it.
// An admin can also name the test account (`driver=test-account`, #309),
// which starts out full of sample laps (see ensureSeeded). The driver those
// laps belong to gets them in their own account too (see ensureOwnLaps).
//   GET                          a summary of every event they have laps
//                                for — its best lap and how many sessions —
//                                for bests across a track (My notes)
//   GET    ?event=               their laps for the event, by session
//   GET    ?events=<id>,<id>     their laps for each of those events that
//                                has any — a track page (#274), every event
//                                on one layout in one request
//   PUT    ?event=  {session}    saves one session's laps (replacing any)
//   DELETE ?event=&session=<key> removes one session's laps
//
// Kept in Netlify Blobs, one record per driver per event, keyed
// `<user id>/<event id>`. A deploy preview gets a store of its own, which
// starts as a copy of the driver's live laps the first time they're used
// there (as the events do) — so a preview shows real laps, but saving or
// removing laps there never touches the live ones. Each deploy copies
// afresh.
//
// TypeScript (.mts) so it can share the lap checks in src/; Netlify bundles
// it with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/laps' }

export const LAPS_STORE = 'laps'
// On a preview: which drivers' live laps have been copied in, keyed by user
// id. Anywhere: which version of the test account's laps it has.
export const LAPS_META_STORE = 'laps-meta'
export const TEST_SEED_KEY = `seeded:${TEST_DRIVER_ID}`

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/
// Events a track page can ask for at once: far more than one layout has.
const MAX_EVENTS = 100

interface EventLaps {
  eventId: string
  sessions: Record<string, SessionLaps>
}

type Deps = {
  getStore?: typeof getStore
  getDeployStore?: typeof getDeployStore
  fetch?: typeof fetch
  identity?: Parameters<typeof findDriver>[1]
  /** Stands in for SAMPLE_DRIVER_EMAIL_SHA256 in tests. */
  sampleDriverSha256?: string
}

type Store = ReturnType<typeof getStore>

/**
 * Production reads and writes the live laps. Anything else (a deploy
 * preview, a branch deploy) gets stores of its own for that deploy;
 * `live` is only read from, to copy the driver's laps in (ensureCopied).
 */
function openStores(context: unknown, deps: Deps): { laps: Store; meta: Store; live?: Store } {
  const deployContext = (context as { deploy?: { context?: string } } | undefined)?.deploy?.context
  const site = (name: string) => (deps.getStore ?? getStore)({ name, consistency: 'strong' })
  const deploy = (name: string) => (deps.getDeployStore ?? getDeployStore)({ name, consistency: 'strong' })
  if (!deployContext || deployContext === 'production') return { laps: site(LAPS_STORE), meta: site(LAPS_META_STORE) }
  return { laps: deploy(LAPS_STORE), meta: deploy(LAPS_META_STORE), live: site(LAPS_STORE) }
}

/**
 * On a preview, copies the driver's live laps (as they are at that moment)
 * into the deploy's own store the first time they're used there, and
 * records that it did, so laps removed on the preview don't come back.
 * Production has nothing to copy. Each copy only writes a record that
 * isn't there yet, so one saved on the preview meanwhile is kept.
 */
async function ensureCopied({ laps, meta, live }: { laps: Store; meta: Store; live?: Store }, driverId: string) {
  if (!live) return
  if (await meta.get(driverId, { type: 'json' })) return
  const { blobs } = await live.list({ prefix: `${driverId}/` })
  for (const { key } of blobs) {
    const record = await live.get(key, { type: 'json' })
    if (record) await laps.setJSON(key, record, { onlyIfNew: true })
  }
  await meta.setJSON(driverId, { at: new Date().toISOString() })
}

/**
 * Fills the test account with its sample laps (#309) the first time it's
 * used in this store — production's, or a preview's own — and again when
 * the sample changes (TEST_ACCOUNT_VERSION), replacing whatever it had:
 * laps saved or removed there last only until then. A preview never copies
 * production's test account; it starts from the sample.
 */
async function ensureSeeded({ laps, meta }: { laps: Store; meta: Store }) {
  const seeded = (await meta.get(TEST_SEED_KEY, { type: 'json' })) as { version?: number } | null
  if (seeded?.version === TEST_ACCOUNT_VERSION) return
  // Written over, never deleted first, so a request that comes in meanwhile
  // (the app asks for several things at once) never finds them missing.
  const keys = new Set(TEST_ACCOUNT_LAPS.map(record => `${TEST_DRIVER_ID}/${record.eventId}`))
  for (const record of TEST_ACCOUNT_LAPS) await laps.setJSON(`${TEST_DRIVER_ID}/${record.eventId}`, record)
  const { blobs } = await laps.list({ prefix: `${TEST_DRIVER_ID}/` })
  for (const { key } of blobs) if (!keys.has(key)) await laps.delete(key)
  await meta.setJSON(TEST_SEED_KEY, { version: TEST_ACCOUNT_VERSION, at: new Date().toISOString() })
}

/** Whose the sample laps are: a SHA-256 of their sign-in email, lowercased. */
export function isSampleDriver(email: string | undefined | null, sha256 = SAMPLE_DRIVER_EMAIL_SHA256): boolean {
  if (!email) return false
  return createHash('sha256').update(email.trim().toLowerCase()).digest('hex') === sha256
}

/**
 * The sample laps are one real driver's (#310): the first time their laps
 * are used — by them, or an admin who picks them — they're filled into
 * their own account, once, in this store (production's, or a preview's
 * own). A session they already have is kept as it is; the record of the
 * fill lists those. Removed afterwards, laps stay removed.
 */
async function ensureOwnLaps({ laps, meta }: { laps: Store; meta: Store }, driverId: string, email: string | undefined, sha256?: string) {
  if (!isSampleDriver(email, sha256)) return
  const doneKey = `filled-own-laps:${driverId}`
  if (await meta.get(doneKey, { type: 'json' })) return
  const kept: string[] = []
  for (const record of TEST_ACCOUNT_LAPS) {
    const key = `${driverId}/${record.eventId}`
    const existing = (await laps.get(key, { type: 'json' })) as EventLaps | null
    const sessions = { ...record.sessions, ...existing?.sessions }
    for (const k of Object.keys(record.sessions)) if (existing?.sessions[k]) kept.push(`${record.eventId} ${k}`)
    await laps.setJSON(key, { eventId: record.eventId, sessions })
  }
  await meta.setJSON(doneKey, { at: new Date().toISOString(), kept })
}

function inOrder(record: EventLaps | null): SessionLaps[] {
  return Object.values(record?.sessions ?? {}).sort((a, b) => a.key.localeCompare(b.key))
}

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams

  // Whose laps: the signed-in driver's, or for an admin, the driver asked for.
  let driverId = user.id
  let driverEmail: string | undefined = user.email
  const asked = params.get('driver')
  if (asked === TEST_DRIVER_ID) {
    if (!isAdmin(user)) return json(403, { error: 'Only admins can use the test account.' })
    driverId = TEST_DRIVER_ID
  } else if (asked && asked !== user.id) {
    if (!isAdmin(user)) return json(403, { error: 'Only admins can log lap times for other drivers.' })
    let driver
    try {
      driver = await findDriver(asked, deps.identity)
    } catch (err) {
      console.error('laps: looking up the driver failed:', err)
      return json(502, { error: 'Couldn’t check that driver. Try again in a moment.' })
    }
    if (!driver) return json(404, { error: 'There’s no driver with that id.' })
    driverId = driver.id
    driverEmail = driver.email
  }

  const stores = openStores(context, deps)
  if (driverId === TEST_DRIVER_ID) await ensureSeeded(stores)
  else {
    await ensureCopied(stores, driverId)
    await ensureOwnLaps(stores, driverId, driverEmail, deps.sampleDriverSha256)
  }
  const store = stores.laps

  if (req.method === 'GET' && params.has('events')) {
    const eventIds = [...new Set((params.get('events') ?? '').split(',').filter(Boolean))]
    if (eventIds.length > MAX_EVENTS) return json(400, { error: `At most ${MAX_EVENTS} events at once.` })
    if (!eventIds.every(id => EVENT_ID.test(id))) return json(400, { error: 'Bad event id.' })
    const records = await Promise.all(eventIds.map(id => store.get(`${driverId}/${id}`, { type: 'json' }) as Promise<EventLaps | null>))
    const events = records.flatMap((record, i) => {
      const sessions = inOrder(record)
      return sessions.length ? [{ eventId: eventIds[i], sessions }] : []
    })
    return json(200, { events })
  }

  if (req.method === 'GET' && !params.has('event')) {
    const { blobs } = await store.list({ prefix: `${driverId}/` })
    const records = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' }) as Promise<EventLaps | null>))
    const events = records.flatMap(record => {
      if (!record) return []
      const sessions = inOrder(record)
      const bests = sessions.map(s => lapStats(s.laps).best).filter((ms): ms is number => ms !== undefined)
      return [{ eventId: record.eventId, sessions: sessions.length, ...(bests.length ? { best: Math.min(...bests) } : {}) }]
    })
    return json(200, { events })
  }

  const eventId = params.get('event') ?? ''
  if (!EVENT_ID.test(eventId)) return json(400, { error: 'Missing event.' })

  const key = `${driverId}/${eventId}`
  const record = (await store.get(key, { type: 'json' })) as EventLaps | null

  if (req.method === 'GET') return json(200, { sessions: inOrder(record) })

  if (req.method === 'DELETE') {
    const session = params.get('session') ?? ''
    if (!record?.sessions[session]) return json(404, { error: 'No laps saved for that session.' })
    delete record.sessions[session]
    if (Object.keys(record.sessions).length === 0) await store.delete(key)
    else await store.setJSON(key, record)
    return json(200, { deleted: session })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }
  const cleaned = cleanSessionLaps(body?.session)
  if ('error' in cleaned) return json(400, { error: cleaned.error })

  const session: SessionLaps = {
    ...cleaned.session,
    updatedAt: new Date().toISOString(),
    ...(driverId !== user.id ? { loggedBy: user.email } : {}),
  }
  const next: EventLaps = { eventId, sessions: { ...record?.sessions, [session.key]: session } }
  await store.setJSON(key, next)
  return json(200, { session })
}
