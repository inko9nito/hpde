import { getStore } from '@netlify/blobs'
import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { buildEvent, isAdmin } from '../lib/newEvent.mjs'
import { STORE, listEvents } from '../lib/eventsStore.mjs'

// Events created in the app (#229), kept in a Netlify Blobs store keyed by
// event id. GET is public — the schedule is public — and lists them all;
// POST creates one and DELETE (?id=) removes one; both are limited to users
// with the Identity "admin" role. Only created events can be deleted —
// built-in ones live in src/data, so the client sends their ids along on
// create and the new id never collides with one.
//
// Written in the current function format (not the Lambda-compatible
// `handler`) because only it can read Blobs with strong consistency.
// Eventual reads can lag a write by up to a minute, so an event created
// and then refreshed right away was missing from the list.
export const config = { path: '/api/created-events' }

export default async function handler(req, _context, deps = {}) {
  const store = (deps.getStore ?? getStore)({ name: STORE, consistency: 'strong' })

  if (req.method === 'GET') {
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

  const builtInIds = Array.isArray(body?.takenIds) ? body.takenIds.filter(id => typeof id === 'string') : []
  const existing = await listEvents(store)
  const result = buildEvent(body?.event, [...builtInIds, ...existing.map(e => e.id)])
  if (result.error) return json(400, { error: result.error })

  const created = { ...result.event, createdBy: user.email, createdAt: new Date().toISOString() }
  const { modified } = await store.setJSON(created.id, created, { onlyIfNew: true })
  if (!modified) return json(409, { error: 'An event with that id was just created — try again.' })
  return json(201, { event: created })
}
