import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { buildEvent, isAdmin } from '../lib/newEvent.mjs'
import { openStores, listEvents, ensureCopied } from '../lib/eventsStore.mjs'
import { applySchedule } from '../../src/utils/scheduleEditor.ts'

// Every event (#232), kept in a Netlify Blobs store keyed by event id. GET
// is public — the schedule is public — and lists them all. Changes are
// limited to users with the Identity "admin" role:
//   POST              creates an event (the New event form). The client
//                     sends the ids it knows about (the test-live fixture
//                     ships with the app) so a new id never collides.
//   PUT ?id=          replaces an event's schedule with `schedule`, the
//                     editor's markdown, parsed here with the same code the
//                     editor previews with. The event as it was is kept in
//                     the history store first.
//   DELETE ?id=       removes an event.
//
// Also answers at /api/created-events, its name before #232, for app pages
// still open from before the rename.
//
// Written in the current function format (not the Lambda-compatible
// `handler`) because only it can read Blobs with strong consistency.
// Eventual reads can lag a write by up to a minute, so an event created
// and then refreshed right away was missing from the list.
//
// TypeScript (.mts) so it can share the schedule parser in src/; Netlify
// bundles it with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: ['/api/events', '/api/created-events'] }

// Far more than any real schedule; keeps a runaway paste out of the store.
const MAX_SCHEDULE_LENGTH = 50_000

export default async function handler(req: Request, context: unknown, deps: Record<string, unknown> = {}) {
  const stores = openStores(context, deps)
  const store = stores.events

  try {
    await ensureCopied(stores)
  } catch (err) {
    // Not fatal: work with what's there, and the next request tries again.
    console.error('events: copying the live events failed:', err)
  }

  if (req.method === 'GET') {
    return json(200, { events: await listEvents(store) })
  }

  if (req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return json(405, { error: 'Method not allowed.' })
  }

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })
  if (!isAdmin(user)) return json(403, { error: 'Only admins can change events.' })

  if (req.method === 'DELETE') {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return json(400, { error: 'Missing event id.' })
    if (!(await store.get(id, { type: 'json' }))) return json(404, { error: 'That event doesn’t exist.' })
    await store.delete(id)
    return json(200, { deleted: id })
  }

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }

  if (req.method === 'PUT') {
    const id = new URL(req.url).searchParams.get('id')
    if (!id) return json(400, { error: 'Missing event id.' })
    const schedule = body?.schedule
    if (typeof schedule !== 'string') return json(400, { error: 'Missing the schedule.' })
    if (schedule.length > MAX_SCHEDULE_LENGTH) return json(400, { error: 'That schedule is too long.' })

    const current = await store.get(id, { type: 'json' })
    if (!current) return json(404, { error: 'That event doesn’t exist.' })
    const result = applySchedule(current, schedule)
    if ('error' in result) return json(400, { error: result.error, problems: result.problems })

    const savedAt = new Date().toISOString()
    await stores.history.setJSON(`${id}/${savedAt}`, current)
    const updated = { ...result.event, updatedBy: user.email, updatedAt: savedAt }
    await store.setJSON(id, updated)
    return json(200, { event: updated })
  }

  const knownIds = Array.isArray(body?.takenIds) ? body.takenIds.filter((id: unknown) => typeof id === 'string') : []
  const existing = await listEvents(store)
  const result = buildEvent(body?.event, [...knownIds, ...existing.map((e: { id: string }) => e.id)])
  if (result.error) return json(400, { error: result.error })

  const created = { ...result.event, createdBy: user.email, createdAt: new Date().toISOString() }
  const { modified } = await store.setJSON(created.id, created, { onlyIfNew: true })
  if (!modified) return json(409, { error: 'An event with that id was just created — try again.' })
  return json(201, { event: created })
}
