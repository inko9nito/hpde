import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { whoseRecords } from '../lib/driverStore.mts'
import type { StoreDeps } from '../lib/driverStore.mts'
import { RSVPS_META_STORE, RSVPS_STORE, ensureDrove, ensureRsvpsCopied, openRsvpStores } from '../lib/rsvpStore.mts'
import type { DriverRsvps, RsvpDeps } from '../lib/rsvpStore.mts'
import { cleanRsvp } from '../../src/utils/rsvp.ts'
import type { Rsvp, Rsvps } from '../../src/utils/rsvp.ts'

// A signed-in driver's answers to "are you going?" (#235), private to them:
// every request needs their sign-in, and only ever reaches their own — the
// key is who the token says they are, never anything sent. The one
// exception is an admin, who can add `driver=<user id>` to any of these to
// read and answer for that driver instead (#362), as with their laps
// (#288) — the id is checked against Identity.
//   GET                         every answer they've given, by event id
//   PUT    ?event=  {status, runGroup?}  answers for one event (replacing
//                                any): going, maybe or not-going
//   DELETE ?event=              takes the answer back: not answered again
//
// Laps answer for them too (#377): with laps at an event, they drove it,
// in their last session's run group — saving laps answers so, and laps
// saved before that are answered for once, here (see rsvpStore.mts). So
// are the events in Jason's track history from before those laps (#373).
//
// Kept in Netlify Blobs, one record per driver, keyed by user id. A deploy
// preview gets a store of its own, which starts as a copy of the driver's
// live answers the first time they're used there (as their laps do) — so a
// preview shows real answers, but answering there never touches the live
// ones.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/rsvps' }

export { RSVPS_STORE, RSVPS_META_STORE }

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/
// Far more events than anyone answers for; keeps a runaway client in check.
const MAX_ANSWERS = 1000

type Deps = RsvpDeps & {
  fetch?: typeof fetch
  identity?: StoreDeps['identity']
  /** Stands in for SAMPLE_DRIVER_EMAIL_SHA256 in tests. */
  sampleDriverSha256?: string
}

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams
  const whose = await whoseRecords(user, params.get('driver'), 'answers', deps.identity)
  if (whose instanceof Response) return whose
  const { driverId, driverEmail } = whose

  const stores = openRsvpStores(context, deps)
  await ensureRsvpsCopied(stores, driverId)
  try {
    await ensureDrove(context, deps, stores, driverId, driverEmail, deps.sampleDriverSha256)
  } catch (err) {
    // Not fatal: their answers as they are, and the next request tries again.
    console.error('rsvps: answering for their laps failed:', err)
  }
  const store = stores.rsvps
  const record = (await store.get(driverId, { type: 'json' })) as DriverRsvps | null
  const events: Rsvps = record?.events ?? {}

  if (req.method === 'GET') return json(200, { rsvps: events })

  const eventId = params.get('event') ?? ''
  if (!EVENT_ID.test(eventId)) return json(400, { error: 'Missing event.' })

  if (req.method === 'DELETE') {
    if (!events[eventId]) return json(200, { deleted: eventId })
    const { [eventId]: _removed, ...rest } = events
    if (Object.keys(rest).length === 0) await store.delete(driverId)
    else await store.setJSON(driverId, { events: rest })
    return json(200, { deleted: eventId })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }
  const cleaned = cleanRsvp(body)
  if ('error' in cleaned) return json(400, { error: cleaned.error })
  if (!events[eventId] && Object.keys(events).length >= MAX_ANSWERS) {
    return json(400, { error: 'That’s too many events.' })
  }

  const rsvp: Rsvp = { ...cleaned.rsvp, updatedAt: new Date().toISOString() }
  await store.setJSON(driverId, { events: { ...events, [eventId]: rsvp } })
  return json(200, { rsvp })
}
