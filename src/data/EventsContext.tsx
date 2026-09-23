import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { EVENTS, ALL_EVENTS } from './index'
import type { EventConfig } from '../types'

// Events created in the app (#229) live in a Netlify function, not in
// src/data. They're merged in after load; everywhere else (GitHub Pages,
// local dev, tests) the endpoint isn't there and only built-in events show.
export const CREATED_EVENTS_URL = `${import.meta.env.BASE_URL}api/created-events`

interface EventsValue {
  // Shown in the landing list, calendar and event picker.
  events: EventConfig[]
  // Plus the hidden-by-URL ones (test-live).
  allEvents: EventConfig[]
  // Merge a just-created event in without waiting for a refetch.
  addEvent(event: EventConfig): void
  // Drop a just-deleted event.
  removeEvent(id: string): void
  // Created in the app (deletable), as opposed to built into src/data.
  isCreated(id: string): boolean
  // False until the created-events fetch settles, so a link to a created
  // event can wait for it instead of falling back to another event.
  loaded: boolean
}

function isEventConfig(e: unknown): e is EventConfig {
  const v = e as EventConfig
  return !!v && typeof v.id === 'string' && typeof v.name === 'string'
    && Array.isArray(v.days) && v.days.length > 0 && Array.isArray(v.runGroups)
}

// Track map images are build assets (hashed URLs), so they're not stored
// with a created event — it borrows the map of a built-in event that has
// the same track icon (e.g. a new ECR 2.7 event gets ecr.png).
const MAP_BY_TRACK_ID = new Map(
  ALL_EVENTS.filter(e => e.trackId && e.mapImage).map(e => [e.trackId!, e.mapImage!]),
)

export function withTrackMap(event: EventConfig): EventConfig {
  if (event.mapImage || !event.trackId) return event
  const mapImage = MAP_BY_TRACK_ID.get(event.trackId)
  return mapImage ? { ...event, mapImage } : event
}

function merge(base: EventConfig[], created: EventConfig[]): EventConfig[] {
  // A built-in event always wins over a created one with the same id.
  const ids = new Set(base.map(e => e.id))
  return [...base, ...created.filter(e => !ids.has(e.id))]
}

export async function fetchCreatedEvents(): Promise<EventConfig[]> {
  try {
    const res = await fetch(CREATED_EVENTS_URL)
    if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) return []
    const body = await res.json()
    return Array.isArray(body?.events) ? body.events.filter(isEventConfig).map(withTrackMap) : []
  } catch {
    return []
  }
}

const EventsContext = createContext<EventsValue | null>(null)

export function EventsProvider({ children }: { children: ReactNode }) {
  const [created, setCreated] = useState<EventConfig[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetchCreatedEvents().then(events => {
      if (cancelled) return
      setCreated(events)
      setLoaded(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const addEvent = useCallback((event: EventConfig) => {
    setCreated(prev => [...prev.filter(e => e.id !== event.id), withTrackMap(event)])
  }, [])

  const removeEvent = useCallback((id: string) => {
    setCreated(prev => prev.filter(e => e.id !== id))
  }, [])

  const value = useMemo<EventsValue>(() => {
    const builtInIds = new Set(ALL_EVENTS.map(e => e.id))
    const createdIds = new Set(created.map(e => e.id))
    return {
      events: merge(EVENTS, created),
      allEvents: merge(ALL_EVENTS, created),
      addEvent,
      removeEvent,
      isCreated: id => createdIds.has(id) && !builtInIds.has(id),
      loaded,
    }
  }, [created, loaded, addEvent, removeEvent])

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

const STATIC_FALLBACK: EventsValue = {
  events: EVENTS,
  allEvents: ALL_EVENTS,
  addEvent: () => {},
  removeEvent: () => {},
  isCreated: () => false,
  loaded: true,
}

// Rendered without a provider (isolated tests) → just the built-in events.
export function useEvents(): EventsValue {
  return useContext(EventsContext) ?? STATIC_FALLBACK
}
