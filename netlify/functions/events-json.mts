import { getStore } from '@netlify/blobs'
import { STORE, listEvents } from '../lib/eventsStore.mjs'
import { serializeEvents } from '../../src/utils/eventsJson.ts'
import type { EventsManifest, SerializedEvent } from '../../src/utils/eventsJson.ts'
import type { EventConfig } from '../../src/types.ts'

// The iOS widget's data feed (#232): the built-in events, which the build
// writes to api/builtin-events.json, plus the ones created in the app
// (Netlify Blobs), in the same format the widget has always read from
// this URL. Built-in events win over a created one with the same id, as
// in the app.
//
// Any failure answers 503 with a plain-text body, never partial JSON, so
// the widget keeps showing its cached copy instead of a list with events
// missing.
export const config = { path: '/api/events.json' }

export const BUILTIN_PATH = '/api/builtin-events.json'

interface Deps {
  getStore?: typeof getStore
  fetch?: typeof fetch
}

function isEventConfig(e: unknown): e is EventConfig {
  const v = e as EventConfig
  return !!v && typeof v.id === 'string' && typeof v.name === 'string'
    && Array.isArray(v.days) && v.days.length > 0 && Array.isArray(v.runGroups)
}

// One at a time, so a created event the serializer rejects (e.g. an
// unknown run-group color) is left out instead of taking the feed down.
function serializeCreated(events: EventConfig[]): SerializedEvent[] {
  return events.flatMap(e => {
    try {
      return serializeEvents([e]).events
    } catch (err) {
      console.error(`events.json: skipping created event ${e.id}:`, err)
      return []
    }
  })
}

const firstDate = (e: SerializedEvent) => e.days[0]?.date ?? ''

export default async function handler(req: Request, _context?: unknown, deps: Deps = {}) {
  try {
    const res = await (deps.fetch ?? fetch)(new URL(BUILTIN_PATH, req.url))
    if (!res.ok) throw new Error(`${BUILTIN_PATH} answered ${res.status}`)
    const builtIn = (await res.json()) as EventsManifest
    if (!Array.isArray(builtIn?.events)) throw new Error(`${BUILTIN_PATH} has no events list`)

    const store = (deps.getStore ?? getStore)({ name: STORE, consistency: 'strong' })
    const builtInIds = new Set(builtIn.events.map(e => e.id))
    const created = (await listEvents(store))
      .filter(isEventConfig)
      .filter(e => !builtInIds.has(e.id))

    // Newest first, as the build has always ordered them.
    const events = [...builtIn.events, ...serializeCreated(created)]
      .sort((a, b) => firstDate(b).localeCompare(firstDate(a)))
    const manifest: EventsManifest = { generatedAt: new Date().toISOString(), events }

    return new Response(JSON.stringify(manifest), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=0, must-revalidate',
        // Cached at Netlify's edge for a minute, so a new event reaches the
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
