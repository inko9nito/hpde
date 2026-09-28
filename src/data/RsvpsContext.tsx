import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import { RSVP_STATUSES } from '../utils/rsvp'
import type { Rsvp, Rsvps } from '../utils/rsvp'

// The signed-in driver's answers to "are you going?" (#235), from the rsvps
// function: which events are theirs, and their run group at each. Nothing
// is fetched for anyone who isn't signed in.
export const RSVPS_URL = `${import.meta.env.BASE_URL}api/rsvps`

export type RsvpsStatus = 'off' | 'loading' | 'ready' | 'error'

interface RsvpsValue {
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

export function RsvpsProvider({ children }: { children: ReactNode }) {
  const { status: authStatus, user, authedFetch } = useAuth()
  const signedIn = authStatus === 'signed-in'
  const userId = user?.id ?? null
  // Whose answers these are, so another sign-in on this device never sees them.
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
        const res = await authedFetch(RSVPS_URL)
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
  }, [signedIn, userId, authedFetch])

  const current = signedIn && !!userId && loaded?.userId === userId
  const rsvps = useMemo(() => (current ? loaded!.rsvps : {}), [current, loaded])
  const status: RsvpsStatus = !signedIn ? 'off' : current ? 'ready' : failed ? 'error' : 'loading'

  const answer = useCallback(async (eventId: string, rsvp: Omit<Rsvp, 'updatedAt'>) => {
    if (!userId) throw new Error('Please sign in to continue.')
    const res = await authedFetch(`${RSVPS_URL}?event=${encodeURIComponent(eventId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rsvp),
    })
    if (!res.ok) throw await errorFrom(res)
    const saved = (await res.json()).rsvp as Rsvp
    setLoaded(prev => ({ userId, rsvps: { ...(prev?.userId === userId ? prev.rsvps : {}), [eventId]: saved } }))
  }, [authedFetch, userId])

  const value = useMemo(() => ({ status, rsvps, answer }), [status, rsvps, answer])
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
