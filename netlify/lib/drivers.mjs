import { admin } from '@netlify/identity'

// The drivers an admin can log lap times for (#288): everyone who has
// signed in, from Netlify Identity's admin API. That API needs a token only
// Netlify's function runtime holds (@netlify/identity reads it from there),
// so this runs in functions, never in the browser. `identity` stands in for
// it in tests.

// Identity's user ids are UUIDs.
export const DRIVER_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const PER_PAGE = 100
// 2,000 people: far more than this site will have; a stop if paging misbehaves.
const MAX_PAGES = 20

function toDriver(user) {
  return { id: user.id, email: user.email ?? '', name: user.name ?? null }
}

const label = driver => driver.name ?? driver.email

/** Everyone who has signed in, by name (their email when there's no name). */
export async function listDrivers(identity = admin) {
  const byId = new Map()
  for (let page = 1; page <= MAX_PAGES; page++) {
    const users = await identity.listUsers({ page, perPage: PER_PAGE })
    const before = byId.size
    for (const user of users) byId.set(user.id, toDriver(user))
    // Stops at an empty page — not a short one, since Identity may send
    // fewer than asked for — or at one with nobody new on it.
    if (users.length === 0 || byId.size === before) break
  }
  return [...byId.values()].sort((a, b) => label(a).localeCompare(label(b), 'en', { sensitivity: 'base' }))
}

/** One driver, or null when there's no such user. */
export async function findDriver(id, identity = admin) {
  if (!DRIVER_ID.test(id)) return null
  try {
    return toDriver(await identity.getUser(id))
  } catch (err) {
    if (err?.status === 404) return null
    throw err
  }
}
