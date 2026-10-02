import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { LAPS_META_STORE, LAPS_STORE, ensureCopied, isSampleDriver, openStores, whoseRecords } from '../lib/driverStore.mts'
import type { Store, StoreDeps } from '../lib/driverStore.mts'
import { markDrove, openRsvpStores } from '../lib/rsvpStore.mts'
import { cleanSessionLaps, lapStats, sessionKey } from '../../src/utils/lapTimes.ts'
import type { Lap, SessionLaps } from '../../src/utils/lapTimes.ts'
import { droveIn } from '../../src/utils/rsvp.ts'
import type { Rsvp } from '../../src/utils/rsvp.ts'
import { TEST_DRIVER_ID } from '../../src/data/testAccount.ts'
import { TEST_ACCOUNT_LAPS, TEST_ACCOUNT_VERSION } from '../../src/data/fixtures/testAccountLaps.ts'

// A signed-in driver's own lap times (#210), private to them: every request
// needs their sign-in, and only ever reaches their own laps — the key is
// made from who the token says they are, never from anything sent. The one
// exception is an admin, who can add `driver=<user id>` to any of these to
// read and write that driver's laps instead (#288) — the id is checked
// against Identity, and a session saved that way records who saved it.
// An admin can also name the test account (`driver=test-account`, #309),
// which starts out full of sample laps (see ensureSeeded). The driver those
// laps belong to gets them in their own account too (see ensureOwnLaps),
// and the sheet's speeds on the laps they'd already logged (ensureOwnSpeeds).
// Laps at an event that got the organizer's schedule after the fact move
// onto its sessions (ensureMovedSessions, #339).
//   GET                          a summary of every event they have laps
//                                for — its best lap and how many sessions —
//                                for bests across a track (My notes)
//   GET    ?event=               their laps for the event, by session
//   GET    ?events=<id>,<id>     their laps for each of those events that
//                                has any — a track page (#274), every event
//                                on one layout in one request
//   PUT    ?event=  {session}    saves one session's laps (replacing any) —
//                                and with laps, they drove it: their answer
//                                to "Did you drive?" becomes "I drove", in
//                                their last session's group (#377), sent
//                                back as `rsvp`
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

export { LAPS_STORE, LAPS_META_STORE, isSampleDriver }
export const TEST_SEED_KEY = `seeded:${TEST_DRIVER_ID}`

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/
// Events a track page can ask for at once: far more than one layout has.
const MAX_EVENTS = 100

interface EventLaps {
  eventId: string
  sessions: Record<string, SessionLaps>
}

type Deps = StoreDeps & {
  fetch?: typeof fetch
  /** Stands in for SAMPLE_DRIVER_EMAIL_SHA256 in tests. */
  sampleDriverSha256?: string
}

/**
 * Fills the test account with its sample laps (#309) the first time it's
 * used in this store — production's, or a preview's own — and again when
 * the sample changes (TEST_ACCOUNT_VERSION), replacing whatever it had:
 * laps saved or removed there last only until then. A preview never copies
 * production's test account; it starts from the sample.
 */
async function ensureSeeded({ records: laps, meta }: { records: Store; meta: Store }) {
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

/**
 * The sample laps are one real driver's (#310): the first time their laps
 * are used — by them, or an admin who picks them — they're filled into
 * their own account, once, in this store (production's, or a preview's
 * own). A session they already have is kept as it is; the record of the
 * fill lists those. Removed afterwards, laps stay removed.
 */
async function ensureOwnLaps({ records: laps, meta }: { records: Store; meta: Store }, driverId: string, email: string | undefined, sha256?: string) {
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

/**
 * Sessions that moved when an event added without the organizer's schedule
 * got it (#339): laps were logged at the time they started, which isn't
 * always the time the schedule gives the session, and sessions are numbered
 * across every group. Each is the session's day, group and old start time,
 * and its start time and number in the schedule.
 */
export const MOVED_SESSIONS = [
  {
    eventId: '2025-10-04_tde-at-ecr-2-7-ccw', issue: 339,
    moves: [
      { date: '2025-10-04', group: 'blue', from: '12:25', to: '12:20', sessionNumber: 2 },
      { date: '2025-10-05', group: 'blue', from: '12:20', to: '12:20', sessionNumber: 2 },
      { date: '2025-10-05', group: 'blue', from: '14:55', to: '14:55', sessionNumber: 3 },
      { date: '2025-10-05', group: 'blue', from: '16:25', to: '16:30', sessionNumber: 4 },
    ],
  },
]

/**
 * Moves a driver's laps onto their sessions in the new schedule
 * (MOVED_SESSIONS), once per driver in this store — production's, or a
 * preview's own. Only the session's time, key and number change. One the
 * sample laps filled in at the new time on a preview (ensureOwnLaps) gives
 * way to the driver's own. The record of it lists the sessions moved.
 */
async function ensureMovedSessions({ records: laps, meta }: { records: Store; meta: Store }, driverId: string) {
  for (const { eventId, issue, moves } of MOVED_SESSIONS) {
    const doneKey = `moved-sessions:${eventId}:${issue}:${driverId}`
    if (await meta.get(doneKey, { type: 'json' })) continue
    const key = `${driverId}/${eventId}`
    const record = (await laps.get(key, { type: 'json' })) as EventLaps | null
    const moved: string[] = []
    for (const { date, group, from, to, sessionNumber } of moves) {
      const old = sessionKey(date, from, group)
      const session = record?.sessions[old]
      if (!record || !session) continue
      delete record.sessions[old]
      const next = sessionKey(date, to, group)
      record.sessions[next] = { ...session, key: next, time: to, sessionNumber }
      moved.push(old)
    }
    if (record && moved.length) await laps.setJSON(key, record)
    await meta.setJSON(doneKey, { at: new Date().toISOString(), moved })
  }
}

// How far apart a lap the driver logged and a lap in the sheet can be and
// still be the same lap: typed by hand, a time may be rounded or cut short.
export const SAME_LAP_MS = 1000

const hasSpeed = (lap: Lap) => lap.topMph !== undefined || lap.avgMph !== undefined

/**
 * Which of the driver's laps is which of the sheet's, as index pairs: laps
 * are logged in order, so this pairs them in order — as many as it can,
 * each within SAME_LAP_MS, and of those, the pairing closest in time —
 * skipping any lap on either side that isn't in the other (an in lap left
 * out, a stop the app can't hold).
 */
function sameLaps(mine: Lap[], sheet: Lap[]): Map<number, number> {
  type Best = { count: number; off: number; step: 'pair' | 'skip mine' | 'skip sheet' | 'end' }
  const better = (a: Best, b: Best) => a.count > b.count || (a.count === b.count && a.off < b.off)
  // best[i][j]: the best pairing of mine[i..] with sheet[j..].
  const best: Best[][] = Array.from({ length: mine.length + 1 }, () =>
    Array.from({ length: sheet.length + 1 }, () => ({ count: 0, off: 0, step: 'end' as const })))
  for (let i = mine.length - 1; i >= 0; i--) {
    for (let j = sheet.length - 1; j >= 0; j--) {
      const off = Math.abs(mine[i].ms - sheet[j].ms)
      const options: Best[] = [
        ...(off <= SAME_LAP_MS ? [{ count: best[i + 1][j + 1].count + 1, off: best[i + 1][j + 1].off + off, step: 'pair' as const }] : []),
        { ...best[i + 1][j], step: 'skip mine' },
        { ...best[i][j + 1], step: 'skip sheet' },
      ]
      best[i][j] = options.reduce((a, b) => (better(b, a) ? b : a))
    }
  }
  const pairs = new Map<number, number>()
  for (let i = 0, j = 0; i < mine.length && j < sheet.length; ) {
    const { step } = best[i][j]
    if (step === 'pair') pairs.set(i++, j++)
    else if (step === 'skip mine') i++
    else j++
  }
  return pairs
}

/**
 * A session's laps with the sheet's speeds (#322): each lap takes the top
 * and average speed of the same lap in the sheet's session (see sameLaps).
 * Only a lap with no speed, or with speeds that came from the sheet, is
 * given them; nothing else about a lap changes, and a lap that isn't in the
 * sheet is left as it is. `added` counts the laps whose speeds changed.
 */
export function withSheetSpeeds(mine: Lap[], sheet: Lap[]): { laps: Lap[]; added: number } {
  const pairs = sameLaps(mine, sheet)
  const fromSheet = (lap: Lap) => sheet.some(s => hasSpeed(s) && s.topMph === lap.topMph && s.avgMph === lap.avgMph)
  let added = 0
  const laps = mine.map((lap, i) => {
    const j = pairs.get(i)
    const match = j === undefined ? undefined : sheet[j]
    if (!match || !hasSpeed(match) || (hasSpeed(lap) && !fromSheet(lap))) return lap
    if (lap.topMph === match.topMph && lap.avgMph === match.avgMph) return lap
    added++
    const { topMph: _top, avgMph: _avg, ...rest } = lap
    return {
      ...rest,
      ...(match.topMph !== undefined ? { topMph: match.topMph } : {}),
      ...(match.avgMph !== undefined ? { avgMph: match.avgMph } : {}),
    }
  })
  return { laps, added }
}

/**
 * The sessions the sample's driver already had when their laps were filled
 * in (#310) were kept as they were: lap times, but no speeds, since they
 * were logged before speeds were (#322). Once, after that fill, each of
 * their sessions the sheet has gets the sheet's speeds on its laps (see
 * withSheetSpeeds) — only the speeds; their times, notes and in/out laps
 * stay theirs. The record of it says how many laps' speeds it set, per
 * session.
 *
 * Its first version (recorded as `sheet-speeds:<id>`) paired laps by time
 * alone, not order, so two laps logged a few hundredths apart could swap
 * speeds; this one runs once more with laps in order, and puts right any
 * speeds that came from the sheet onto the wrong lap.
 */
async function ensureOwnSpeeds({ records: laps, meta }: { records: Store; meta: Store }, driverId: string, email: string | undefined, sha256?: string) {
  if (!isSampleDriver(email, sha256)) return
  const doneKey = `sheet-speeds-2:${driverId}`
  if (await meta.get(doneKey, { type: 'json' })) return
  const sessions: { session: string; added: number; of: number }[] = []
  for (const record of TEST_ACCOUNT_LAPS) {
    const key = `${driverId}/${record.eventId}`
    const existing = (await laps.get(key, { type: 'json' })) as EventLaps | null
    if (!existing) continue
    let changed = false
    for (const [k, sheet] of Object.entries(record.sessions)) {
      const mine = existing.sessions[k]
      if (!mine) continue
      const { laps: withSpeeds, added } = withSheetSpeeds(mine.laps, sheet.laps)
      if (added || !withSpeeds.every(hasSpeed)) sessions.push({ session: `${record.eventId} ${k}`, added, of: mine.laps.length })
      if (!added) continue
      existing.sessions[k] = { ...mine, laps: withSpeeds }
      changed = true
    }
    if (changed) await laps.setJSON(key, existing)
  }
  await meta.setJSON(doneKey, { at: new Date().toISOString(), sessions })
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
  const whose = await whoseRecords(user, params.get('driver'), 'lap times', deps.identity)
  if (whose instanceof Response) return whose
  const { driverId, driverEmail } = whose

  const stores = openStores(context, deps, LAPS_STORE, LAPS_META_STORE)
  if (driverId === TEST_DRIVER_ID) await ensureSeeded(stores)
  else {
    await ensureCopied(stores, driverId)
    await ensureOwnLaps(stores, driverId, driverEmail, deps.sampleDriverSha256)
    await ensureMovedSessions(stores, driverId)
    await ensureOwnSpeeds(stores, driverId, driverEmail, deps.sampleDriverSha256)
  }
  const store = stores.records

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
  // With laps, they drove it (#377). The laps are saved either way: a
  // failure here only leaves their answer as it was.
  let rsvp: Rsvp | undefined
  try {
    const drove = { eventId, runGroup: droveIn(Object.values(next.sessions)) }
    rsvp = (await markDrove(openRsvpStores(context, deps), driverId, [drove]))[eventId]
  } catch (err) {
    console.error('laps: answering "I drove" failed:', err)
  }
  return json(200, { session, ...(rsvp ? { rsvp } : {}) })
}
