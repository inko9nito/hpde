import { getStore, getDeployStore } from '@netlify/blobs'
import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { whoseRecords } from '../lib/driverStore.mts'
import type { StoreDeps } from '../lib/driverStore.mts'
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
// Kept in Netlify Blobs, one record per driver, keyed by user id. A deploy
// preview gets a store of its own, which starts as a copy of the driver's
// live answers the first time they're used there (as their laps do) — so a
// preview shows real answers, but answering there never touches the live
// ones.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/rsvps' }

export const RSVPS_STORE = 'rsvps'
// On a preview: which drivers' live answers have been copied in.
export const RSVPS_META_STORE = 'rsvps-meta'

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/
// Far more events than anyone answers for; keeps a runaway client in check.
const MAX_ANSWERS = 1000

type Deps = {
  getStore?: typeof getStore
  getDeployStore?: typeof getDeployStore
  fetch?: typeof fetch
  identity?: StoreDeps['identity']
}

type Store = ReturnType<typeof getStore>

interface DriverRsvps {
  events: Rsvps
}

function openStores(context: unknown, deps: Deps): { rsvps: Store; meta: Store; live?: Store } {
  const deployContext = (context as { deploy?: { context?: string } } | undefined)?.deploy?.context
  const site = (name: string) => (deps.getStore ?? getStore)({ name, consistency: 'strong' })
  const deploy = (name: string) => (deps.getDeployStore ?? getDeployStore)({ name, consistency: 'strong' })
  if (!deployContext || deployContext === 'production') return { rsvps: site(RSVPS_STORE), meta: site(RSVPS_META_STORE) }
  return { rsvps: deploy(RSVPS_STORE), meta: deploy(RSVPS_META_STORE), live: site(RSVPS_STORE) }
}

/**
 * On a preview, copies the driver's live answers into the deploy's own
 * store the first time they're used there, once, so an answer taken back
 * on the preview doesn't come back.
 */
async function ensureCopied({ rsvps, meta, live }: { rsvps: Store; meta: Store; live?: Store }, driverId: string) {
  if (!live) return
  if (await meta.get(driverId, { type: 'json' })) return
  const record = await live.get(driverId, { type: 'json' })
  if (record) await rsvps.setJSON(driverId, record, { onlyIfNew: true })
  await meta.setJSON(driverId, { at: new Date().toISOString() })
}

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams
  const whose = await whoseRecords(user, params.get('driver'), 'answers', deps.identity)
  if (whose instanceof Response) return whose
  const { driverId } = whose

  const stores = openStores(context, deps)
  await ensureCopied(stores, driverId)
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
