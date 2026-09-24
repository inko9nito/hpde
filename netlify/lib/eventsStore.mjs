import { getStore, getDeployStore } from '@netlify/blobs'

// Every event lives in a Netlify Blobs store keyed by event id (#232). The
// events function (the app's reads and writes) and events-json (the iOS
// widget's feed) both go through here.
export const STORE = 'events'
// Bookkeeping that isn't an event, kept out of the events store so listing
// it only ever returns events.
export const META_STORE = 'events-meta'

// Each event as it was before a save replaced it, keyed
// `<event id>/<saved at>` — so a bad edit can be undone (#232).
export const HISTORY_STORE = 'events-history'

// Written by the build (scripts/vite-plugin-events-json.ts): the test
// events (test-live) that ship with the app and are never stored.
export const BUILTIN_PATH = '/api/builtin-events.json'

// Set once a deploy's own store has its copy of the live events.
const COPIED_KEY = 'copied-from-live'

/**
 * Production reads and writes the live events. Anything else (a deploy
 * preview, a branch deploy) gets stores of its own for that deploy, which
 * start as a copy of the live events (see ensureCopied) — so a preview
 * shows real data, but creating or deleting events there never touches
 * the live ones. `live` is only read from, to make that copy.
 */
export function openStores(context, deps = {}) {
  const site = name => (deps.getStore ?? getStore)({ name, consistency: 'strong' })
  const deploy = name => (deps.getDeployStore ?? getDeployStore)({ name, consistency: 'strong' })
  const deployContext = context?.deploy?.context
  if (!deployContext || deployContext === 'production') {
    return { events: site(STORE), meta: site(META_STORE), history: site(HISTORY_STORE) }
  }
  return { events: deploy(STORE), meta: deploy(META_STORE), history: deploy(HISTORY_STORE), live: site(STORE) }
}

export async function listEvents(store) {
  const { blobs } = await store.list()
  const events = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })))
  return events.filter(Boolean)
}

export async function fetchFixtures(origin, fetchImpl = fetch) {
  const res = await fetchImpl(new URL(BUILTIN_PATH, origin))
  if (!res.ok) throw new Error(`${BUILTIN_PATH} answered ${res.status}`)
  const body = await res.json()
  return Array.isArray(body?.fixtures) ? body.fixtures : []
}

/**
 * On a preview, copies the live events (as they are at that moment) into
 * the deploy's own store the first time it's used, and records that it
 * did, so an event deleted on the preview doesn't come back. Production
 * has nothing to copy. Safe to run twice at once: each copy only writes
 * if the key is new.
 */
export async function ensureCopied(stores) {
  if (!stores.live) return
  if (await stores.meta.get(COPIED_KEY, { type: 'json' })) return
  const copiedAt = new Date().toISOString()
  for (const event of await listEvents(stores.live)) {
    if (!event || typeof event.id !== 'string') continue
    await stores.events.setJSON(event.id, event, { onlyIfNew: true })
  }
  await stores.meta.setJSON(COPIED_KEY, { at: copiedAt })
}
