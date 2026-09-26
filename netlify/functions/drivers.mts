import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { isAdmin } from '../lib/newEvent.mjs'
import { listDrivers } from '../lib/drivers.mjs'

// Who an admin can log lap times for (#288): everyone who has signed in,
// with their name and email, for the lap sheet's Driver picker. Admins only.
//   GET   { drivers: [{ id, email, name }] }, by name
//
// Written in the current function format: only it gets the Identity admin
// token that listing users needs (see netlify/lib/drivers.mjs).
export const config = { path: '/api/drivers' }

type Deps = { fetch?: typeof fetch; identity?: Parameters<typeof listDrivers>[0] }

export default async function handler(req: Request, _context: unknown, deps: Deps = {}) {
  if (req.method !== 'GET') return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })
  if (!isAdmin(user)) return json(403, { error: 'Only admins can log lap times for other drivers.' })

  try {
    return json(200, { drivers: await listDrivers(deps.identity) })
  } catch (err) {
    console.error('drivers: listing Identity users failed:', err)
    return json(502, { error: 'Couldn’t get the list of drivers. Try again in a moment.' })
  }
}
