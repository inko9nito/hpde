import { openStores, listEvents, ensureCopied, fetchFixtures } from '../lib/eventsStore.mjs'
import { serializeEvents } from '../../src/utils/eventsJson.ts'
import type { EventsManifest, SerializedEvent } from '../../src/utils/eventsJson.ts'
import type { EventConfig } from '../../src/types.ts'

// The iOS widget's data feed (#232): every event in the Blobs store plus
// the test fixtures that ship with the app (test-live, which the widget's
// `test` flag uses), in the same format the widget has always read from
// this URL.
//
// Any failure answers 503 with a plain-text body, never partial JSON, so
// the widget keeps showing its cached copy instead of a list with events
// missing.
export const config = { path: '/api/events.json' }

interface Deps {
  getStore?: unknown
  getDeployStore?: unknown
  fetch?: typeof fetch
}

function isEventConfig(e: unknown): e is EventConfig {
  const v = e as EventConfig
  return !!v && typeof v.id === 'string' && typeof v.name === 'string'
    && Array.isArray(v.days) && v.days.length > 0 && Array.isArray(v.runGroups)
}

// One at a time, so an event the serializer rejects (e.g. an unknown
// run-group color) is left out instead of taking the feed down.
function serializeEach(events: EventConfig[]): SerializedEvent[] {
  return events.flatMap(e => {
    try {
      return serializeEvents([e]).events
    } catch (err) {
      console.error(`events.json: skipping event ${e.id}:`, err)
      return []
    }
  })
}

const firstDate = (e: SerializedEvent) => e.days[0]?.date ?? ''

export default async function handler(req: Request, context?: unknown, deps: Deps = {}) {
  try {
    const stores = openStores(context, deps)
    await ensureCopied(stores)
    const fixtures = await fetchFixtures(req.url, deps.fetch)

    const fixtureIds = new Set(fixtures.map((e: EventConfig) => e.id))
    const stored = (await listEvents(stores.events)).filter((e: EventConfig) => !fixtureIds.has(e.id))
    const all = [...stored, ...fixtures].filter(isEventConfig)

    // Newest first, as the build has always ordered them.
    const events = serializeEach(all).sort((a, b) => firstDate(b).localeCompare(firstDate(a)))
    const manifest: EventsManifest = { generatedAt: new Date().toISOString(), events }

    return new Response(JSON.stringify(manifest), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
        // Cached at Netlify's edge for a minute, so a change reaches the
        // widget within about a minute without every refresh reading Blobs.
        'netlify-cdn-cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (err) {
    console.error('events.json:', err)
    return new Response('Events are unavailable right now.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' },
    })
  }
}
