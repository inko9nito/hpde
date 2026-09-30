import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { ensureCopied, openStores, whoseRecords } from '../lib/driverStore.mts'
import type { StoreDeps } from '../lib/driverStore.mts'
import { cleanEventEvaluation, cleanSessionEvaluation } from '../../src/utils/evaluation.ts'
import type { EventEvaluation, SessionNotes } from '../../src/utils/evaluation.ts'
import { DATE, GROUP, TIME, sessionKey } from '../../src/utils/lapTimes.ts'

// A signed-in driver's notes on an event (#340), private to them, as their
// laps are (laps.mts): every request needs their sign-in and only reaches
// their own — or, for an admin, the driver named by `driver=<user id>`
// (#288). For now the notes are their instructor's evaluations: each
// session's feedback, and a TDE event's report card for the whole event.
//   GET    ?event=                    the event's notes: { evaluation?, sessions }
//   PUT    ?event=  {session}         saves one session's notes (replacing any)
//   PUT    ?event=  {evaluation}      saves the event's report card (replacing any)
//   DELETE ?event=&session=<key>      removes one session's notes
//   DELETE ?event=&evaluation=1       removes the report card
//
// Kept in Netlify Blobs, one record per driver per event, keyed
// `<user id>/<event id>`. A deploy preview gets a store of its own, which
// starts as a copy of the driver's live notes the first time they're used
// there — so saving or removing notes there never touches the live ones.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/notes' }

export const NOTES_STORE = 'notes'
// On a preview: which drivers' live notes have been copied in.
export const NOTES_META_STORE = 'notes-meta'

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/

interface EventNotes {
  eventId: string
  evaluation?: EventEvaluation
  sessions: Record<string, SessionNotes>
}

type Deps = StoreDeps & { fetch?: typeof fetch }

function inOrder(record: EventNotes | null): SessionNotes[] {
  return Object.values(record?.sessions ?? {}).sort((a, b) => a.key.localeCompare(b.key))
}

/** A session's notes as sent: which session (checked as its laps are), and its evaluation. */
function cleanSession(raw: unknown): { session: Omit<SessionNotes, 'updatedAt' | 'loggedBy'> } | { error: string } {
  const r = (raw ?? {}) as Record<string, unknown>
  if (typeof r.date !== 'string' || !DATE.test(r.date)) return { error: 'Missing the session’s day.' }
  if (typeof r.time !== 'string' || !TIME.test(r.time)) return { error: 'Missing the session’s time.' }
  if (typeof r.group !== 'string' || !GROUP.test(r.group)) return { error: 'Missing the session’s run group.' }
  const n = r.sessionNumber
  if (n !== undefined && (typeof n !== 'number' || !Number.isInteger(n) || n < 0 || n > 999)) return { error: 'Bad session number.' }
  const evaluation = cleanSessionEvaluation(r.evaluation)
  if ('error' in evaluation) return evaluation
  return {
    session: {
      key: sessionKey(r.date, r.time, r.group),
      date: r.date, time: r.time, group: r.group,
      ...(n !== undefined ? { sessionNumber: n } : {}),
      evaluation: evaluation.value,
    },
  }
}

export default async function handler(req: Request, context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  const params = new URL(req.url).searchParams
  const whose = await whoseRecords(user, params.get('driver'), 'notes', deps.identity)
  if (whose instanceof Response) return whose
  const { driverId } = whose

  const eventId = params.get('event') ?? ''
  if (!EVENT_ID.test(eventId)) return json(400, { error: 'Missing event.' })

  const stores = openStores(context, deps, NOTES_STORE, NOTES_META_STORE)
  await ensureCopied(stores, driverId)
  const store = stores.records
  const key = `${driverId}/${eventId}`
  const record = (await store.get(key, { type: 'json' })) as EventNotes | null

  if (req.method === 'GET') {
    return json(200, { ...(record?.evaluation ? { evaluation: record.evaluation } : {}), sessions: inOrder(record) })
  }

  // Saves what's left, or with nothing left, removes the record.
  const put = async (next: EventNotes) => {
    if (!next.evaluation && Object.keys(next.sessions).length === 0) await store.delete(key)
    else await store.setJSON(key, next)
  }
  const current: EventNotes = { eventId, sessions: {}, ...record }
  const stamp = {
    updatedAt: new Date().toISOString(),
    ...(driverId !== user.id ? { loggedBy: user.email } : {}),
  }

  if (req.method === 'DELETE') {
    if (params.get('evaluation')) {
      if (!current.evaluation) return json(404, { error: 'No evaluation saved for this event.' })
      const { evaluation: _gone, ...rest } = current
      await put(rest)
      return json(200, { deleted: 'evaluation' })
    }
    const session = params.get('session') ?? ''
    if (!current.sessions[session]) return json(404, { error: 'No notes saved for that session.' })
    const { [session]: _gone, ...sessions } = current.sessions
    await put({ ...current, sessions })
    return json(200, { deleted: session })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }

  if (body?.evaluation !== undefined) {
    const cleaned = cleanEventEvaluation(body.evaluation)
    if ('error' in cleaned) return json(400, { error: cleaned.error })
    const evaluation: EventEvaluation = { ...cleaned.value, ...stamp }
    await put({ ...current, evaluation })
    return json(200, { evaluation })
  }

  const cleaned = cleanSession(body?.session)
  if ('error' in cleaned) return json(400, { error: cleaned.error })
  const session: SessionNotes = { ...cleaned.session, ...stamp }
  await put({ ...current, sessions: { ...current.sessions, [session.key]: session } })
  return json(200, { session })
}
