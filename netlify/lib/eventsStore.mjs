// The Netlify Blobs store holding events created in the app (#229), keyed
// by event id. Shared by the created-events function (the app's reads and
// writes) and events-json (the iOS widget's feed).
export const STORE = 'events'

export async function listEvents(store) {
  const { blobs } = await store.list()
  const events = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' })))
  return events.filter(Boolean)
}
