import { getStore, getDeployStore } from '@netlify/blobs'

// Every event lives in a Netlify Blobs store keyed by event id (#232). The
// events function (the app's reads and writes) and events-json (the iOS
// widget's feed) both go through here.
export const STORE = 'events'
// Bookkeeping that isn't an event, kept out of the events store so listing
// it only ever returns events.
export const META_STORE = 'events-meta'

// Written by the build (scripts/vite-plugin-events-json.ts):
//   seed     — the events that used to be built into the app, imported
//              into the store once (see ensureSeeded)
//   fixtures — test events (test-live) that ship with the app and are
//              never stored
export const BUILTIN_PATH = '/api/builtin-events.json'

const SEED_KEY = 'seeded'

/**
 * Production reads and writes the live events. Anything else (a deploy
 * preview, a branch deploy) gets stores of its own for that deploy, which
 * start as a copy of the live events (see ensureSeeded) — so a preview
 * shows real data, but creating or deleting events there never touches
 * the live ones. `live` is only read from, to make that copy.
 */
export function openStores(context, deps = {}) {
  const site = name => (deps.getStore ?? getStore)({ name, consistency: 'strong' })
  const deploy = name => (deps.getDeployStore ?? getDeployStore)({ name, consistency: 'strong' })
  const deployContext = context?.deploy?.context
  if (!deployContext || deployContext === 'production') {
    return { events: site(STORE), meta: site(META_STORE) }
  }
  return { events: deploy(STORE), meta: deploy(META_STORE), live: site(STORE) }
}

export async function listEvents(store) {
  const { blobs } = await store.list()
  const events = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })))
  return events.filter(Boolean)
}

export async function fetchBuiltin(origin, fetchImpl = fetch) {
  const res = await fetchImpl(new URL(BUILTIN_PATH, origin))
  if (!res.ok) throw new Error(`${BUILTIN_PATH} answered ${res.status}`)
  const body = await res.json()
  return {
    seed: Array.isArray(body?.seed) ? body.seed : [],
    fixtures: Array.isArray(body?.fixtures) ? body.fixtures : [],
  }
}

/**
 * Copies the build's seed events into the store the first time it's used,
 * then records that it did, so an event deleted afterwards doesn't come
 * back. An id already in the store is left alone. Safe to run twice at
 * once: each copy only writes if the key is new.
 *
 * A preview's store first gets a copy of the live events as they are at
 * that moment, then the seed — what the live site will show once this
 * deploy is live.
 */
export async function ensureSeeded(stores, origin, fetchImpl = fetch) {
  if (await stores.meta.get(SEED_KEY, { type: 'json' })) return
  const { seed } = await fetchBuiltin(origin, fetchImpl)
  const live = stores.live ? await listEvents(stores.live) : []
  const importedAt = new Date().toISOString()
  const imported = []
  for (const event of [...live, ...seed]) {
    if (!event || typeof event.id !== 'string') continue
    const { modified } = await stores.events.setJSON(event.id, { ...event, importedAt }, { onlyIfNew: true })
    if (modified) imported.push(event.id)
  }
  await stores.meta.setJSON(SEED_KEY, { at: importedAt, imported })
}
