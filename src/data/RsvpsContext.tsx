import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import { RSVP_STATUSES } from '../utils/rsvp'
import type { Rsvp, Rsvps } from '../utils/rsvp'

// The signed-in driver's answers to "are you going?" (#235), from the rsvps
// function: which events are theirs, and their run group at each. Nothing
// is fetched for anyone who isn't signed in. An admin who has switched to
// another driver on an event's page (#362) sees that driver's there
// instead: useDriverRsvps, handed to what's on it with RsvpsScope.
export const RSVPS_URL = `${import.meta.env.BASE_URL}api/rsvps`

export type RsvpsStatus = 'off' | 'loading' | 'ready' | 'error'

export interface RsvpsValue {
  status: RsvpsStatus
  rsvps: Rsvps
  /** Answers for one event, replacing any answer. Throws with a message to show. */
  answer(eventId: string, rsvp: Omit<Rsvp, 'updatedAt'>): Promise<void>
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

// Only answers in the current shape; anything else reads as no answer.
function parseRsvps(v: unknown): Rsvps {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return {}
  return Object.fromEntries(Object.entries(v).filter(([, r]) => RSVP_STATUSES.includes(r?.status)))
}

const RsvpsContext = createContext<RsvpsValue | null>(null)

/**
 * The answers of the signed-in driver (`driverId` undefined), of another
 * driver an admin picked (their user id, #362), or of nobody (null: off).
 */
function useRsvpsStore(driverId: string | null | undefined): RsvpsValue {
  const { status: authStatus, user, authedFetch } = useAuth()
  const signedIn = authStatus === 'signed-in' && driverId !== null
  // Whose answers these are, so another sign-in on this device never sees
  // them: the signed-in driver and, for another driver's, theirs.
  const userId = user ? (driverId ? `${user.id} as ${driverId}` : user.id) : null
  const url = driverId ? `${RSVPS_URL}?driver=${encodeURIComponent(driverId)}` : RSVPS_URL
  const [loaded, setLoaded] = useState<{ userId: string; rsvps: Rsvps } | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!signedIn || !userId) {
      setLoaded(null)
      return
    }
    let cancelled = false
    setFailed(false)
    ;(async () => {
      try {
        const res = await authedFetch(url)
        if (!res.ok || !(res.headers.get('content-type') ?? '').includes('json')) throw await errorFrom(res)
        const body = await res.json()
        if (!cancelled) setLoaded({ userId, rsvps: parseRsvps(body?.rsvps) })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [signedIn, userId, url, authedFetch])

  const current = signedIn && !!userId && loaded?.userId === userId
  const rsvps = useMemo(() => (current ? loaded!.rsvps : {}), [current, loaded])
  const status: RsvpsStatus = !signedIn ? 'off' : current ? 'ready' : failed ? 'error' : 'loading'

  const answer = useCallback(async (eventId: string, rsvp: Omit<Rsvp, 'updatedAt'>) => {
    if (!signedIn || !userId) throw new Error('Please sign in to continue.')
    const res = await authedFetch(`${url}${url.includes('?') ? '&' : '?'}event=${encodeURIComponent(eventId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rsvp),
    })
    if (!res.ok) throw await errorFrom(res)
    const saved = (await res.json()).rsvp as Rsvp
    setLoaded(prev => ({ userId, rsvps: { ...(prev?.userId === userId ? prev.rsvps : {}), [eventId]: saved } }))
  }, [authedFetch, signedIn, userId, url])

  return useMemo(() => ({ status, rsvps, answer }), [status, rsvps, answer])
}

export function RsvpsProvider({ children }: { children: ReactNode }) {
  const value = useRsvpsStore(undefined)
  return <RsvpsContext.Provider value={value}>{children}</RsvpsContext.Provider>
}

/** Another driver's answers, for an admin who switched to them (#362); off for null. */
export function useDriverRsvps(driverId: string | null): RsvpsValue {
  return useRsvpsStore(driverId)
}

/** Whose answers what's inside sees: `value`, from useRsvps or useDriverRsvps. */
export function RsvpsScope({ value, children }: { value: RsvpsValue; children: ReactNode }) {
  return <RsvpsContext.Provider value={value}>{children}</RsvpsContext.Provider>
}

const OFF: RsvpsValue = {
  status: 'off',
  rsvps: {},
  answer: () => Promise.reject(new Error('Please sign in to continue.')),
}

// Rendered without a provider (isolated tests) → as if signed out.
export function useRsvps(): RsvpsValue {
  return useContext(RsvpsContext) ?? OFF
}
