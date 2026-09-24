import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { SessionLaps } from '../utils/lapTimes'

// The signed-in driver's own lap times for one event (#210), from the laps
// function. Nothing is fetched for anyone who isn't signed in.
export const LAPS_URL = `${import.meta.env.BASE_URL}api/laps`

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

/** `eventId` is null while no event's page is open: nothing to fetch. */
export function useLapLog(eventId: string | null): LapLog {
  const { status: authStatus, authedFetch } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const active = signedIn && eventId !== null
  const [loaded, setLoaded] = useState<{ eventId: string; sessions: SessionLaps[] } | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const url = `${LAPS_URL}?event=${encodeURIComponent(eventId ?? '')}`

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
        if (!cancelled) setLoaded({ eventId, sessions: Array.isArray(body?.sessions) ? body.sessions : [] })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [signedIn, eventId, url, authedFetch, attempt])

  // Laps loaded for another event (or another sign-in) never show here.
  const sessions = useMemo(
    () => (active && loaded?.eventId === eventId ? loaded.sessions : []),
    [active, loaded, eventId],
  )
  const byKey = useMemo(() => new Map(sessions.map(s => [s.key, s])), [sessions])

  const status: LapLogStatus = !active ? 'off'
    : loaded?.eventId === eventId ? 'ready'
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
      const others = (prev?.eventId === eventId ? prev.sessions : []).filter(s => s.key !== saved.key)
      return { eventId, sessions: [...others, saved].sort((a, b) => a.key.localeCompare(b.key)) }
    })
  }, [authedFetch, url, eventId])

  const remove = useCallback(async (key: string) => {
    if (eventId === null) throw new Error('No event open.')
    const res = await authedFetch(`${url}&session=${encodeURIComponent(key)}`, { method: 'DELETE' })
    if (!res.ok && res.status !== 404) throw await errorFrom(res)
    setLoaded(prev => ({ eventId, sessions: (prev?.eventId === eventId ? prev.sessions : []).filter(s => s.key !== key) }))
  }, [authedFetch, url, eventId])

  const reload = useCallback(() => setAttempt(a => a + 1), [])

  return { status, sessions, byKey, save, remove, reload }
}
