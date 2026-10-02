import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useAuth } from '../auth/AuthContext'
import type { Car, EventSetup, Garage, LogEntry } from '../utils/garage'

// The signed-in driver's garage (#344), from the garage function: their
// cars, and what each event ran on. Shared by the Garage tab and the event
// page, so a car added in one is there in the other. While an admin is
// acting as another driver or the test account (#396), it's theirs.
// Nothing is fetched for anyone who isn't signed in.
export const GARAGE_URL = `${import.meta.env.BASE_URL}api/garage`

export type GarageStatus = 'off' | 'loading' | 'ready' | 'error'

export interface GarageValue extends Garage {
  status: GarageStatus
  /** Adds a car (no id) or changes one; resolves to it as saved. Throws with a message to show. */
  saveCar(car: Omit<Car, 'id' | 'photo' | 'log' | 'updatedAt'> & { id?: string }): Promise<Car>
  removeCar(id: string): Promise<void>
  /** Sets a car's photo: the image, already shrunk (shrinkPhoto). */
  savePhoto(carId: string, photo: Blob): Promise<void>
  removePhoto(carId: string): Promise<void>
  /** Where a car's photo is, for useCarPhoto; none without one. */
  photoUrl(car: Car): string | null
  /** Logs a job on a car (no id), or changes an entry. */
  saveEntry(carId: string, entry: Omit<LogEntry, 'id'> & { id?: string }): Promise<void>
  removeEntry(carId: string, entryId: string): Promise<void>
  /** Saves an event's setup, replacing any. */
  saveSetup(eventId: string, setup: Omit<EventSetup, 'updatedAt'>): Promise<void>
  removeSetup(eventId: string): Promise<void>
  /** Makes a car the one driven at each of these events, instead of any other. */
  driveAt(carId: string, eventIds: string[]): Promise<void>
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

const EMPTY: Garage = { cars: [], events: {} }

const GarageContext = createContext<GarageValue | null>(null)

/**
 * The garage of the signed-in driver (`driverId` undefined) — or of
 * whoever an admin is acting as (#396) — of another driver (their user
 * id), or of nobody (null: off).
 */
function useGarageStore(driverId: string | null | undefined): GarageValue {
  const { status: authStatus, user, authedFetch, actingAs } = useAuth()
  const signedIn = authStatus === 'signed-in' && !!user && driverId !== null
  const whose = driverId ?? actingAs?.id ?? null
  // Whose garage this is, so another sign-in on this device never sees it.
  const who = signedIn ? (whose ? `${user!.id} as ${whose}` : user!.id) : null
  const url = `${GARAGE_URL}${whose ? `?driver=${encodeURIComponent(whose)}` : ''}`
  const [loaded, setLoaded] = useState<{ who: string; garage: Garage } | null>(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!who) {
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
        if (!cancelled) {
          setLoaded({
            who,
            garage: {
              cars: Array.isArray(body?.cars) ? body.cars : [],
              events: body?.events && typeof body.events === 'object' ? body.events : {},
            },
          })
        }
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [who, url, authedFetch, attempt])

  const current = who !== null && loaded?.who === who
  const garage = current ? loaded!.garage : EMPTY
  const status: GarageStatus = !who ? 'off' : current ? 'ready' : failed ? 'error' : 'loading'

  const send = useCallback(async (query: string, init: RequestInit) => {
    if (!who) throw new Error('Please sign in to continue.')
    const sep = url.includes('?') ? '&' : '?'
    const res = await authedFetch(query ? `${url}${sep}${query}` : url, init)
    if (!res.ok && !(init.method === 'DELETE' && res.status === 404)) throw await errorFrom(res)
    return res
  }, [who, url, authedFetch])

  // Changes what's loaded for this driver, once the function has saved it.
  const change = useCallback((next: (g: Garage) => Garage) => {
    if (!who) return
    setLoaded(prev => ({ who, garage: next(prev?.who === who ? prev.garage : EMPTY) }))
  }, [who])

  const put = (body: unknown): RequestInit => ({
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const saveCar = useCallback(async (car: Omit<Car, 'id' | 'photo' | 'log' | 'updatedAt'> & { id?: string }) => {
    const saved = (await (await send('', put({ car }))).json()).car as Car
    change(g => ({
      ...g,
      cars: g.cars.some(c => c.id === saved.id) ? g.cars.map(c => (c.id === saved.id ? saved : c)) : [...g.cars, saved],
    }))
    return saved
  }, [send, change])

  const removeCar = useCallback(async (id: string) => {
    await send(`car=${encodeURIComponent(id)}`, { method: 'DELETE' })
    // As the function does: its events keep their tire pressures, without it.
    change(g => ({
      cars: g.cars.filter(c => c.id !== id),
      events: Object.fromEntries(Object.entries(g.events).flatMap(([eventId, setup]): [string, EventSetup][] => {
        if (setup.carId !== id) return [[eventId, setup]]
        const { carId: _gone, ...rest } = setup
        return rest.sessions ? [[eventId, rest]] : []
      })),
    }))
  }, [send, change])

  const saveEntry = useCallback(async (carId: string, entry: Omit<LogEntry, 'id'> & { id?: string }) => {
    const saved = (await (await send(`car=${encodeURIComponent(carId)}`, put({ entry }))).json()).entry as LogEntry
    change(g => ({
      ...g,
      cars: g.cars.map(c => {
        if (c.id !== carId) return c
        const log = c.log ?? []
        return { ...c, log: log.some(e => e.id === saved.id) ? log.map(e => (e.id === saved.id ? saved : e)) : [...log, saved] }
      }),
    }))
  }, [send, change])

  const removeEntry = useCallback(async (carId: string, entryId: string) => {
    await send(`car=${encodeURIComponent(carId)}&entry=${encodeURIComponent(entryId)}`, { method: 'DELETE' })
    change(g => ({ ...g, cars: g.cars.map(c => (c.id === carId ? { ...c, log: (c.log ?? []).filter(e => e.id !== entryId) } : c)) }))
  }, [send, change])

  const replaceCar = useCallback((saved: Car) => {
    change(g => ({ ...g, cars: g.cars.map(c => (c.id === saved.id ? saved : c)) }))
  }, [change])

  const savePhoto = useCallback(async (carId: string, photo: Blob) => {
    const res = await send(`car=${encodeURIComponent(carId)}&photo=1`, {
      method: 'PUT',
      headers: { 'Content-Type': photo.type || 'image/jpeg' },
      body: photo,
    })
    replaceCar((await res.json()).car as Car)
  }, [send, replaceCar])

  const removePhoto = useCallback(async (carId: string) => {
    const res = await send(`car=${encodeURIComponent(carId)}&photo=1`, { method: 'DELETE' })
    replaceCar((await res.json()).car as Car)
  }, [send, replaceCar])

  const photoUrl = useCallback((car: Car) => {
    if (!car.photo) return null
    const sep = url.includes('?') ? '&' : '?'
    return `${url}${sep}car=${encodeURIComponent(car.id)}&photo=1&v=${encodeURIComponent(car.photo)}`
  }, [url])

  const saveSetup = useCallback(async (eventId: string, setup: Omit<EventSetup, 'updatedAt'>) => {
    const saved = (await (await send(`event=${encodeURIComponent(eventId)}`, put({ setup }))).json()).setup as EventSetup
    change(g => ({ ...g, events: { ...g.events, [eventId]: saved } }))
  }, [send, change])

  const removeSetup = useCallback(async (eventId: string) => {
    await send(`event=${encodeURIComponent(eventId)}`, { method: 'DELETE' })
    change(g => {
      const { [eventId]: _gone, ...events } = g.events
      return { ...g, events }
    })
  }, [send, change])

  const driveAt = useCallback(async (carId: string, eventIds: string[]) => {
    const saved = (await (await send(`car=${encodeURIComponent(carId)}`, put({ events: eventIds }))).json()).events as Record<string, EventSetup>
    change(g => ({ ...g, events: { ...g.events, ...saved } }))
  }, [send, change])

  const reload = useCallback(() => setAttempt(a => a + 1), [])

  return useMemo(
    () => ({ status, ...garage, saveCar, removeCar, savePhoto, removePhoto, photoUrl, saveEntry, removeEntry, saveSetup, removeSetup, driveAt, reload }),
    [status, garage, saveCar, removeCar, savePhoto, removePhoto, photoUrl, saveEntry, removeEntry, saveSetup, removeSetup, driveAt, reload],
  )
}

export function GarageProvider({ children }: { children: ReactNode }) {
  const value = useGarageStore(undefined)
  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>
}

const signIn = () => Promise.reject(new Error('Please sign in to continue.'))
const OFF: GarageValue = {
  status: 'off',
  ...EMPTY,
  saveCar: signIn,
  removeCar: signIn,
  savePhoto: signIn,
  removePhoto: signIn,
  photoUrl: () => null,
  saveEntry: signIn,
  removeEntry: signIn,
  saveSetup: signIn,
  removeSetup: signIn,
  driveAt: signIn,
  reload() {},
}

// Rendered without a provider (isolated tests) → as if signed out.
export function useGarage(): GarageValue {
  return useContext(GarageContext) ?? OFF
}

// Photos already fetched, by URL (which names the photo): each is fetched
// once, however many places show it.
const photoCache = new Map<string, Promise<string | null>>()

/**
 * A car's photo, ready for an <img> — fetched with the driver's sign-in,
 * since the photos are private — or null: none, or not in yet.
 */
export function useCarPhoto(car: Car | undefined): string | null {
  const { photoUrl } = useGarage()
  const { authedFetch } = useAuth()
  const url = car ? photoUrl(car) : null
  const [shown, setShown] = useState<{ url: string; src: string } | null>(null)
  useEffect(() => {
    if (!url) return
    let cancelled = false
    if (!photoCache.has(url)) {
      photoCache.set(url, (async () => {
        try {
          const res = await authedFetch(url)
          if (!res.ok) throw new Error('No photo')
          return URL.createObjectURL(await res.blob())
        } catch {
          photoCache.delete(url)
          return null
        }
      })())
    }
    photoCache.get(url)!.then(src => {
      if (!cancelled && src) setShown({ url, src })
    })
    return () => {
      cancelled = true
    }
  }, [url, authedFetch])
  return url && shown?.url === url ? shown.src : null
}
