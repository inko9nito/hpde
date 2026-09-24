import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { buildEvent, isAdmin } from '../lib/newEvent.mjs'
import { openStores, listEvents, ensureSeeded } from '../lib/eventsStore.mjs'

// Every event (#232), kept in a Netlify Blobs store keyed by event id. GET
// is public — the schedule is public — and lists them all; POST creates one
// and DELETE (?id=) removes one; both are limited to users with the
// Identity "admin" role. The client sends the ids it knows about (the
// test-live fixture ships with the app) so a new id never collides.
//
// Also answers at /api/created-events, its name before #232, for app pages
// still open from before the rename.
//
// Written in the current function format (not the Lambda-compatible
// `handler`) because only it can read Blobs with strong consistency.
// Eventual reads can lag a write by up to a minute, so an event created
// and then refreshed right away was missing from the list.
export const config = { path: ['/api/events', '/api/created-events'] }

export default async function handler(req, context, deps = {}) {
  const stores = openStores(context, deps)
  const store = stores.events

  if (req.method === 'GET') {
    try {
      await ensureSeeded(stores, req.url, deps.fetch)
    } catch (err) {
      // Not fatal: list what's there, and the next request tries again.
      console.error('events: seeding failed:', err)
    }
    return json(200, { events: await listEvents(store) })
  }

  if (req.method !== 'POST' && req.method !== 'DELETE') {
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

  const knownIds = Array.isArray(body?.takenIds) ? body.takenIds.filter(id => typeof id === 'string') : []
  const existing = await listEvents(store)
  const result = buildEvent(body?.event, [...knownIds, ...existing.map(e => e.id)])
  if (result.error) return json(400, { error: result.error })

  const created = { ...result.event, createdBy: user.email, createdAt: new Date().toISOString() }
  const { modified } = await store.setJSON(created.id, created, { onlyIfNew: true })
  if (!modified) return json(409, { error: 'An event with that id was just created — try again.' })
  return json(201, { event: created })
}
