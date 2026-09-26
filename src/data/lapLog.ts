import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { SessionLaps } from '../utils/lapTimes'
import type { EventBest } from '../utils/trackStats'

// The signed-in driver's own lap times for one event (#210), from the laps
// function — or, for an admin, another driver's (#288). Nothing is fetched
// for anyone who isn't signed in.
export const LAPS_URL = `${import.meta.env.BASE_URL}api/laps`

/** `?driver=` for another driver's laps; nothing for your own. */
function driverQuery(driverId: string | null, first: '?' | '&'): string {
  return driverId ? `${first}driver=${encodeURIComponent(driverId)}` : ''
}

export type LapLogStatus = 'off' | 'loading' | 'ready' | 'error'

export interface LapLog {
  status: LapLogStatus
  /** In schedule order. */
  sessions: SessionLaps[]
  byKey: Map<string, SessionLaps>
  /** Saves one session's laps, replacing any it had. Throws with a message to show. */
  save(session: Omit<SessionLaps, 'key' | 'updatedAt'>): Promise<void>
  remove(key: string): Promise<void>
  reload(): void
}

async function errorFrom(res: Response): Promise<Error> {
  try {
    const body = await res.json()
    if (typeof body?.error === 'string') return new Error(body.error)
  } catch {
    // Not JSON: fall through to the generic message.
  }
  return new Error('Couldn’t reach the server. Check your connection and try again.')
}

/**
 * `eventId` is null while no event's page is open: nothing to fetch.
 * `driverId` is another driver's, for an admin logging theirs (#288);
 * null for your own.
 */
export function useLapLog(eventId: string | null, driverId: string | null = null): LapLog {
  const { status: authStatus, authedFetch } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const active = signedIn && eventId !== null
  const [loaded, setLoaded] = useState<{ url: string; eventId: string; sessions: SessionLaps[] } | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const url = `${LAPS_URL}?event=${encodeURIComponent(eventId ?? '')}${driverQuery(driverId, '&')}`

  useEffect(() => {
    // Signed out: forget them, so the next person to sign in on this
    // device never sees them, even for a moment.
    if (!signedIn) {
      setLoaded(null)
      return
    }
    if (eventId === null) return
    let cancelled = false
    setFailed(false)
    ;(async () => {
      try {
        const res = await authedFetch(url)
        if (!res.ok) throw await errorFrom(res)
        const body = await res.json()
        if (!cancelled) setLoaded({ url, eventId, sessions: Array.isArray(body?.sessions) ? body.sessions : [] })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [signedIn, eventId, url, authedFetch, attempt])

  // Laps loaded for another event or driver (or another sign-in) never
  // show here.
  const current = loaded?.url === url
  const sessions = useMemo(
    () => (active && current ? loaded!.sessions : []),
    [active, current, loaded],
  )
  const byKey = useMemo(() => new Map(sessions.map(s => [s.key, s])), [sessions])

  const status: LapLogStatus = !active ? 'off'
    : current ? 'ready'
    : failed ? 'error'
    : 'loading'

  const save = useCallback(async (session: Omit<SessionLaps, 'key' | 'updatedAt'>) => {
    if (eventId === null) throw new Error('No event open.')
    const res = await authedFetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session }),
    })
    if (!res.ok) throw await errorFrom(res)
    const saved = (await res.json()).session as SessionLaps
    setLoaded(prev => {
      const others = (prev?.url === url ? prev.sessions : []).filter(s => s.key !== saved.key)
      return { url, eventId, sessions: [...others, saved].sort((a, b) => a.key.localeCompare(b.key)) }
    })
  }, [authedFetch, url, eventId])

  const remove = useCallback(async (key: string) => {
    if (eventId === null) throw new Error('No event open.')
    const res = await authedFetch(`${url}&session=${encodeURIComponent(key)}`, { method: 'DELETE' })
    if (!res.ok && res.status !== 404) throw await errorFrom(res)
    setLoaded(prev => ({ url, eventId, sessions: (prev?.url === url ? prev.sessions : []).filter(s => s.key !== key) }))
  }, [authedFetch, url, eventId])

  const reload = useCallback(() => setAttempt(a => a + 1), [])

  return { status, sessions, byKey, save, remove, reload }
}

/**
 * Every event the driver has laps for, with its best lap — for bests across
 * a track layout. Fetched while `active` (the My notes tab is open); null
 * until it arrives, or if it can't be had. `driverId` as for useLapLog.
 */
export function useLapSummary(active: boolean, driverId: string | null = null): EventBest[] | null {
  const { status: authStatus, authedFetch } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const [loaded, setLoaded] = useState<{ url: string; events: EventBest[] } | null>(null)
  const url = `${LAPS_URL}${driverQuery(driverId, '?')}`

  useEffect(() => {
    if (!signedIn) {
      setLoaded(null)
      return
    }
    if (!active) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await authedFetch(url)
        if (!res.ok) return
        const body = await res.json()
        if (!cancelled && Array.isArray(body?.events)) setLoaded({ url, events: body.events })
      } catch {
        // Only the across-events best goes missing; this event's laps still show.
      }
    })()
    return () => {
      cancelled = true
    }
  }, [signedIn, active, url, authedFetch])

  // Another driver's bests never show here.
  return signedIn && loaded?.url === url ? loaded.events : null
}
