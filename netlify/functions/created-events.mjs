import { connectLambda, getStore } from '@netlify/blobs'
import { requireUser, json, UNAUTHORIZED } from '../lib/auth.mjs'
import { buildEvent, isAdmin } from '../lib/newEvent.mjs'

// Events created in the app (#229), kept in a Netlify Blobs store keyed by
// event id. GET is public — the schedule is public — and lists them all;
// POST creates one and DELETE (?id=) removes one; both are limited to users
// with the Identity "admin" role. Only created events can be deleted —
// built-in ones live in src/data.
// Built-in events live in src/data, so the client sends their ids along
// and the new id never collides with one.
const STORE = 'events'

async function listEvents(store) {
  const { blobs } = await store.list()
  const events = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })))
  return events.filter(Boolean)
}

export const handler = async (event, context) => {
  connectLambda(event)
  const store = getStore(STORE)

  if (event.httpMethod === 'GET') {
    return json(200, { events: await listEvents(store) })
  }

  if (event.httpMethod !== 'POST' && event.httpMethod !== 'DELETE') {
    return json(405, { error: 'Method not allowed.' })
  }

  const user = requireUser(context)
  if (!user) return UNAUTHORIZED
  if (!isAdmin(user)) return json(403, { error: 'Only admins can change events.' })

  if (event.httpMethod === 'DELETE') {
    const id = event.queryStringParameters?.id
    if (!id) return json(400, { error: 'Missing event id.' })
    if (!(await store.get(id, { type: 'json' }))) return json(404, { error: 'That event doesn’t exist.' })
    await store.delete(id)
    return json(200, { deleted: id })
  }

  let body
  try {
    body = JSON.parse(event.body || '{}')
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }

  const builtInIds = Array.isArray(body.takenIds) ? body.takenIds.filter(id => typeof id === 'string') : []
  const existing = await listEvents(store)
  const result = buildEvent(body.event, [...builtInIds, ...existing.map(e => e.id)])
  if (result.error) return json(400, { error: result.error })

  const created = { ...result.event, createdBy: user.email, createdAt: new Date().toISOString() }
  const { modified } = await store.setJSON(created.id, created, { onlyIfNew: true })
  if (!modified) return json(409, { error: 'An event with that id was just created — try again.' })
  return json(201, { event: created })
}
