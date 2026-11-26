import { createHash, timingSafeEqual } from 'node:crypto'
import { getStore } from '@netlify/blobs'
import { jsonResponse as json } from '../lib/auth.mjs'
import { DRIVER_ID, listDrivers } from '../lib/drivers.mjs'
import { LAPS_STORE } from '../lib/driverStore.mts'
import { lapStats } from '../../src/utils/lapTimes.ts'
import { TEST_DRIVER_ID } from '../../src/data/testAccount.ts'
import type { SessionLaps } from '../../src/utils/lapTimes.ts'

// A read-only export of every driver's lap times, for the site's owner to
// read from outside the app — Claude's sandbox, say, to compare them with
// another lap timer's — where there's no sign-in to send (#486). Instead
// of a sign-in it takes a key: the `X-Export-Key` header must match the
// EXPORT_KEY environment variable set on the site. With no EXPORT_KEY set,
// it's off. It only ever reads, and only the live laps (production's).
//   GET                          every driver with laps: their name and
//                                email, and per event how many sessions
//                                and their best lap
//   GET ?driver=<user id>        that driver's laps, every event, by session
//   GET ?driver=&event=<id>      one event's
export const config = { path: '/api/export/laps' }

export const KEY_HEADER = 'x-export-key'

const EVENT_ID = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,119}$/

interface EventLaps {
  eventId: string
  sessions: Record<string, SessionLaps>
}

type Deps = {
  getStore?: typeof getStore
  /** Stands in for the EXPORT_KEY environment variable in tests. */
  exportKey?: string
  /** Stands in for Identity's admin API in tests. */
  identity?: Parameters<typeof listDrivers>[0]
}

/** Whether the key sent is the site's, compared in constant time. */
export function keyMatches(sent: string | null, key: string): boolean {
  if (!sent) return false
  const digest = (s: string) => createHash('sha256').update(s).digest()
  return timingSafeEqual(digest(sent), digest(key))
}

function inOrder(record: EventLaps | null): SessionLaps[] {
  return Object.values(record?.sessions ?? {}).sort((a, b) => a.key.localeCompare(b.key))
}

export default async function handler(req: Request, _context: unknown, deps: Deps = {}) {
  if (req.method !== 'GET') return json(405, { error: 'Method not allowed.' })

  const key = deps.exportKey ?? process.env.EXPORT_KEY
  if (!key) return json(503, { error: 'The export isn’t set up on this site.' })
  if (!keyMatches(req.headers.get(KEY_HEADER), key)) return json(401, { error: 'A valid export key is needed.' })

  const store = (deps.getStore ?? getStore)({ name: LAPS_STORE, consistency: 'strong' })
  const params = new URL(req.url).searchParams
  const driverId = params.get('driver')

  if (!driverId) {
    const { blobs } = await store.list()
    const byDriver = new Map<string, { eventId: string; sessions: number; best?: number }[]>()
    for (const { key: k } of blobs) {
      const [id] = k.split('/')
      const record = (await store.get(k, { type: 'json' })) as EventLaps | null
      if (!record) continue
      const sessions = inOrder(record)
      const bests = sessions.map(s => lapStats(s.laps).best).filter((ms): ms is number => ms !== undefined)
      const events = byDriver.get(id) ?? []
      events.push({ eventId: record.eventId, sessions: sessions.length, ...(bests.length ? { best: Math.min(...bests) } : {}) })
      byDriver.set(id, events)
    }
    let names = new Map<string, { name: string | null; email: string }>()
    try {
      names = new Map((await listDrivers(deps.identity)).map(d => [d.id, { name: d.name, email: d.email }]))
    } catch (err) {
      console.error('export: listing drivers failed:', err)
    }
    const drivers = [...byDriver].map(([id, events]) => ({ driverId: id, ...names.get(id), events }))
    return json(200, { drivers })
  }

  if (!DRIVER_ID.test(driverId) && driverId !== TEST_DRIVER_ID) return json(400, { error: 'Bad driver id.' })

  const eventId = params.get('event')
  if (eventId !== null) {
    if (!EVENT_ID.test(eventId)) return json(400, { error: 'Bad event id.' })
    const record = (await store.get(`${driverId}/${eventId}`, { type: 'json' })) as EventLaps | null
    return json(200, { driverId, eventId, sessions: inOrder(record) })
  }

  const { blobs } = await store.list({ prefix: `${driverId}/` })
  const records = await Promise.all(blobs.map(b => store.get(b.key, { type: 'json' }) as Promise<EventLaps | null>))
  const events = records.flatMap(record => (record ? [{ eventId: record.eventId, sessions: inOrder(record) }] : []))
  return json(200, { driverId, events })
}
