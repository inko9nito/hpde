import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { FIXTURE_EVENTS } from './index'
import { TRACK_MAPS } from './trackMaps'
import type { EventConfig } from '../types'

// Every event lives in the events store, behind a Netlify function (#232);
// the app ships with none of them, only the test fixtures. Where the
// function isn't there (local dev, tests) the list stays empty.
export const EVENTS_URL = `${import.meta.env.BASE_URL}api/events`

interface EventsValue {
  // Shown in the landing list, calendar and event picker.
  events: EventConfig[]
  // Plus the fixtures, which are reachable only by URL (test-live).
  allEvents: EventConfig[]
  // Merge a just-created event in without waiting for a refetch.
  addEvent(event: EventConfig): void
  // Drop a just-deleted event.
  removeEvent(id: string): void
  // In the store (so an admin can delete it), as opposed to a fixture.
  isStored(id: string): boolean
  // False until the fetch settles, so a link to an event can wait for it
  // instead of falling back to another event.
  loaded: boolean
}

function isEventConfig(e: unknown): e is EventConfig {
  const v = e as EventConfig
  return !!v && typeof v.id === 'string' && typeof v.name === 'string'
    && Array.isArray(v.days) && v.days.length > 0 && Array.isArray(v.runGroups)
}

// Track map images are build assets (hashed URLs), so they're not stored
// with an event — it gets the one for its track icon (e.g. an ECR 2.7
// event gets ecr.png).
export function withTrackMap(event: EventConfig): EventConfig {
  if (event.mapImage || !event.trackId) return event
  const mapImage = TRACK_MAPS[event.trackId]
  return mapImage ? { ...event, mapImage } : event
}

// Ids start with the date, so this is newest first.
function sortEvents(events: EventConfig[]): EventConfig[] {
  return [...events].sort((a, b) => b.id.localeCompare(a.id))
}

function parseEvents(events: unknown): EventConfig[] {
  return Array.isArray(events) ? events.filter(isEventConfig).map(withTrackMap) : []
}

// null = the fetch failed (offline, no function here), as opposed to a
// successful fetch that came back empty.
export async function fetchEvents(): Promise<EventConfig[] | null> {
  try {
    const res = await fetch(EVENTS_URL)
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) return null
    const body = await res.json()
    return parseEvents(body?.events)
  } catch {
    return null
  }
}

// The last list the fetch returned. The function can take a second or two
// (cold start + a strongly consistent Blobs read), and until it answers
// there's nothing to show — so a reload, or the return from Google sign-in,
// sat on a blank page (#231). Starting from the cached list shows the
// events right away; the fetch then corrects it.
export const EVENTS_CACHE_KEY = 'hpde:events'
// Its name before #232, when it held only the events created in the app.
const OLD_CACHE_KEY = 'hpde:createdEvents'

function readCache(): EventConfig[] {
  try {
    localStorage.removeItem(OLD_CACHE_KEY)
    const saved = localStorage.getItem(EVENTS_CACHE_KEY)
    return saved ? parseEvents(JSON.parse(saved)) : []
  } catch {
    return []
  }
}

function writeCache(events: EventConfig[]) {
  try {
    // Without the map: its hashed URL goes stale on the next deploy, and
    // readCache looks up the current one again.
    const stored = events.map(({ mapImage: _mapImage, ...e }) => e)
    localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify(stored))
  } catch {
    // Storage full or blocked — next load just waits for the fetch.
  }
}

const EventsContext = createContext<EventsValue | null>(null)

function contextValue(
  stored: EventConfig[],
  loaded: boolean,
  addEvent: (event: EventConfig) => void,
  removeEvent: (id: string) => void,
): EventsValue {
  const fixtureIds = new Set(FIXTURE_EVENTS.map(e => e.id))
  const events = sortEvents(stored.filter(e => !fixtureIds.has(e.id)))
  const storedIds = new Set(events.map(e => e.id))
  return {
    events,
    allEvents: [...events, ...FIXTURE_EVENTS],
    addEvent,
    removeEvent,
    isStored: id => storedIds.has(id),
    loaded,
  }
}

/**
 * `initialEvents` stands in for the cache on first render — for tests,
 * which have no function to fetch from.
 */
export function EventsProvider({ children, initialEvents }: { children: ReactNode; initialEvents?: EventConfig[] }) {
  const [stored, setStored] = useState<EventConfig[]>(() =>
    initialEvents ? initialEvents.map(withTrackMap) : readCache(),
  )
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchEvents().then(events => {
      if (cancelled) return
      // A failed fetch keeps whatever the cache had rather than dropping it.
      if (events) setStored(events)
      setLoaded(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Only after the fetch: before that, `stored` is just the cache.
  useEffect(() => {
    if (loaded) writeCache(stored)
  }, [loaded, stored])

  const addEvent = useCallback((event: EventConfig) => {
    setStored(prev => [...prev.filter(e => e.id !== event.id), withTrackMap(event)])
  }, [])

  const removeEvent = useCallback((id: string) => {
    setStored(prev => prev.filter(e => e.id !== id))
  }, [])

  const value = useMemo(
    () => contextValue(stored, loaded, addEvent, removeEvent),
    [stored, loaded, addEvent, removeEvent],
  )

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

const STATIC_FALLBACK = contextValue([], true, () => {}, () => {})

// Rendered without a provider (isolated tests) → just the fixtures.
export function useEvents(): EventsValue {
  return useContext(EventsContext) ?? STATIC_FALLBACK
}
