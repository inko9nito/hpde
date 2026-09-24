import { getStore, getDeployStore } from '@netlify/blobs'
import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { cleanSessionLaps } from '../../src/utils/lapTimes.ts'
import type { SessionLaps } from '../../src/utils/lapTimes.ts'

// A signed-in driver's own lap times (#210), private to them: every request
// needs their sign-in, and only ever reaches their own laps — the key is
// made from who the token says they are, never from anything sent.
//   GET    ?event=               their laps for the event, by session
//   PUT    ?event=  {session}    saves one session's laps (replacing any)
//   DELETE ?event=&session=<key> removes one session's laps
//
// Kept in Netlify Blobs, one record per driver per event, keyed
// `<user id>/<event id>`. A deploy preview gets a store of its own that
// starts empty, so trying the preview never touches anyone's real laps —
// and what's saved there is gone with the next deploy.
//
// TypeScript (.mts) so it can share the lap checks in src/; Netlify bundles
// it with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/laps' }

export const LAPS_STORE = 'laps'

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/

interface EventLaps {
  eventId: string
  sessions: Record<string, SessionLaps>
}

type Deps = { getStore?: typeof getStore; getDeployStore?: typeof getDeployStore; fetch?: typeof fetch }

function openStore(context: unknown, deps: Deps) {
  const deployContext = (context as { deploy?: { context?: string } } | undefined)?.deploy?.context
  const options = { name: LAPS_STORE, consistency: 'strong' as const }
  return !deployContext || deployContext === 'production'
    ? (deps.getStore ?? getStore)(options)
    : (deps.getDeployStore ?? getDeployStore)(options)
}

function inOrder(record: EventLaps | null): SessionLaps[] {
  return Object.values(record?.sessions ?? {}).sort((a, b) => a.key.localeCompare(b.key))
}

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams
  const eventId = params.get('event') ?? ''
  if (!EVENT_ID.test(eventId)) return json(400, { error: 'Missing event.' })

  const store = openStore(context, deps)
  const key = `${user.id}/${eventId}`
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

  const session = { ...cleaned.session, updatedAt: new Date().toISOString() }
  const next: EventLaps = { eventId, sessions: { ...record?.sessions, [session.key]: session } }
  await store.setJSON(key, next)
  return json(200, { session })
}
