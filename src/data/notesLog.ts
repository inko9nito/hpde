import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { EventEvaluation, SessionNotes } from '../utils/evaluation'
import type { EventConditions } from '../utils/conditions'

// The signed-in driver's notes for one event (#340), from the notes
// function: each session's instructor feedback, and a TDE event's report
// card. Private to them, as their laps are (lapLog) — or, for an admin,
// another driver's (#288). Nothing is fetched for anyone who isn't signed in.
export const NOTES_URL = `${import.meta.env.BASE_URL}api/notes`

export type NotesStatus = 'off' | 'loading' | 'ready' | 'error'

export interface NotesLog {
  status: NotesStatus
  /** The event's report card, if one's saved. */
  evaluation?: EventEvaluation
  /** Their note on the whole event's conditions (#347). */
  conditions?: EventConditions
  /** In schedule order. */
  sessions: SessionNotes[]
  byKey: Map<string, SessionNotes>
  /** Saves one session's notes, replacing any it had. Throws with a message to show. */
  saveSession(session: Omit<SessionNotes, 'key' | 'updatedAt'>): Promise<void>
  removeSession(key: string): Promise<void>
  saveEvaluation(evaluation: EventEvaluation): Promise<void>
  removeEvaluation(): Promise<void>
  /** Saves the note on the event's conditions (#347), replacing any. */
  saveConditions(conditions: EventConditions): Promise<void>
  removeConditions(): Promise<void>
  reload(): void
}

interface Loaded {
  url: string
  evaluation?: EventEvaluation
  conditions?: EventConditions
  sessions: SessionNotes[]
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

const inOrder = (sessions: SessionNotes[]) => [...sessions].sort((a, b) => a.key.localeCompare(b.key))

/** `eventId` null: no event's page is open. `driverId` as for useLapLog. */
export function useNotesLog(eventId: string | null, driverId: string | null = null): NotesLog {
  const { status: authStatus, authedFetch, actingAs } = useAuth()
  const who = driverId ?? actingAs?.id ?? null
  const signedIn = authStatus === 'signed-in'
  const active = signedIn && eventId !== null
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const url = `${NOTES_URL}?event=${encodeURIComponent(eventId ?? '')}${who ? `&driver=${encodeURIComponent(who)}` : ''}`

  useEffect(() => {
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
        if (!cancelled) {
          setLoaded({
            url,
            ...(body?.evaluation ? { evaluation: body.evaluation } : {}),
            ...(body?.conditions ? { conditions: body.conditions } : {}),
            sessions: Array.isArray(body?.sessions) ? inOrder(body.sessions) : [],
          })
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [signedIn, eventId, url, authedFetch, attempt])

  // Notes loaded for another event or driver never show here.
  const current = active && loaded?.url === url
  const sessions = useMemo(() => (current ? loaded!.sessions : []), [current, loaded])
  const byKey = useMemo(() => new Map(sessions.map(s => [s.key, s])), [sessions])
  const evaluation = current ? loaded!.evaluation : undefined
  const conditions = current ? loaded!.conditions : undefined
  const status: NotesStatus = !active ? 'off' : current ? 'ready' : failed ? 'error' : 'loading'

  const mine = useCallback((prev: Loaded | null): Loaded => (prev?.url === url ? prev : { url, sessions: [] }), [url])

  const send = useCallback(async (init: RequestInit, query = '') => {
    if (eventId === null) throw new Error('No event open.')
    const res = await authedFetch(`${url}${query}`, init)
    if (!res.ok && !(init.method === 'DELETE' && res.status === 404)) throw await errorFrom(res)
    return res
  }, [authedFetch, url, eventId])

  const put = (body: unknown): RequestInit => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const saveSession = useCallback(async (session: Omit<SessionNotes, 'key' | 'updatedAt'>) => {
    const saved = (await (await send(put({ session }))).json()).session as SessionNotes
    setLoaded(prev => {
      const base = mine(prev)
      return { ...base, sessions: inOrder([...base.sessions.filter(s => s.key !== saved.key), saved]) }
    })
  }, [send, mine])

  const removeSession = useCallback(async (key: string) => {
    await send({ method: 'DELETE' }, `&session=${encodeURIComponent(key)}`)
    setLoaded(prev => {
      const base = mine(prev)
      return { ...base, sessions: base.sessions.filter(s => s.key !== key) }
    })
  }, [send, mine])

  const saveEvaluation = useCallback(async (next: EventEvaluation) => {
    const saved = (await (await send(put({ evaluation: next }))).json()).evaluation as EventEvaluation
    setLoaded(prev => ({ ...mine(prev), evaluation: saved }))
  }, [send, mine])

  const removeEvaluation = useCallback(async () => {
    await send({ method: 'DELETE' }, '&evaluation=1')
    setLoaded(prev => {
      const { evaluation: _gone, ...rest } = mine(prev)
      return rest
    })
  }, [send, mine])

  const saveConditions = useCallback(async (next: EventConditions) => {
    const saved = (await (await send(put({ conditions: next }))).json()).conditions as EventConditions
    setLoaded(prev => ({ ...mine(prev), conditions: saved }))
  }, [send, mine])

  const removeConditions = useCallback(async () => {
    await send({ method: 'DELETE' }, '&conditions=1')
    setLoaded(prev => {
      const { conditions: _gone, ...rest } = mine(prev)
      return rest
    })
  }, [send, mine])

  const reload = useCallback(() => setAttempt(a => a + 1), [])

  return {
    status, evaluation, conditions, sessions, byKey,
    saveSession, removeSession, saveEvaluation, removeEvaluation, saveConditions, removeConditions, reload,
  }
}

/** One event's notes, as the list of every event's has them (#345). */
export interface EventNotes {
  eventId: string
  evaluation?: EventEvaluation
  conditions?: EventConditions
  sessions: SessionNotes[]
}

export interface AllNotes {
  status: NotesStatus
  events: EventNotes[]
  reload(): void
}

/**
 * Every event's notes (#345), for the Instructor evaluations page: the
 * signed-in driver's own, or whoever an admin is acting as (#396).
 * Fetched while `active`.
 */
export function useAllNotes(active: boolean): AllNotes {
  const { status: authStatus, authedFetch, actingAs } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const on = signedIn && active
  const [loaded, setLoaded] = useState<{ url: string; events: EventNotes[] } | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const url = `${NOTES_URL}${actingAs ? `?driver=${encodeURIComponent(actingAs.id)}` : ''}`

  useEffect(() => {
    if (!signedIn) {
      setLoaded(null)
      return
    }
    if (!on) return
    let cancelled = false
    setFailed(false)
    ;(async () => {
      try {
        const res = await authedFetch(url)
        if (!res.ok) throw await errorFrom(res)
        const body = await res.json()
        if (!cancelled) setLoaded({ url, events: Array.isArray(body?.events) ? body.events : [] })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [signedIn, on, url, authedFetch, attempt])

  // Another account's notes never show here.
  const current = loaded?.url === url
  const events = useMemo(() => (signedIn && current ? loaded!.events : []), [signedIn, current, loaded])
  const status: NotesStatus = !signedIn ? 'off' : current ? 'ready' : failed ? 'error' : 'loading'
  const reload = useCallback(() => setAttempt(a => a + 1), [])
  return { status, events, reload }
}
