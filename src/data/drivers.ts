import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

// Who an admin can log lap times for (#288), from the drivers function:
// everyone who has signed in.
export const DRIVERS_URL = `${import.meta.env.BASE_URL}api/drivers`

export interface Driver {
  /** Their Identity user id. */
  id: string
  email: string
  name: string | null
}

export type DriversStatus = 'off' | 'loading' | 'ready' | 'error'

export function driverName(driver: Driver): string {
  return driver.name ?? driver.email
}

/**
 * Everyone an admin can log laps for. Fetched the first time `active` is
 * true (an admin opens a lap sheet or My notes), then kept for the sign-in.
 */
export function useDrivers(active: boolean): { status: DriversStatus; drivers: Driver[] } {
  const { status: authStatus, user, authedFetch } = useAuth()
  const userId = authStatus === 'signed-in' ? user?.id ?? null : null
  const [loaded, setLoaded] = useState<{ userId: string; drivers: Driver[] } | null>(null)
  const [failed, setFailed] = useState(false)
  const have = userId !== null && loaded?.userId === userId

  useEffect(() => {
    if (!active || userId === null || have) return
    let cancelled = false
    setFailed(false)
    ;(async () => {
      try {
        const res = await authedFetch(DRIVERS_URL)
        if (!res.ok) throw new Error(`drivers: ${res.status}`)
        const body = await res.json()
        if (!cancelled) setLoaded({ userId, drivers: Array.isArray(body?.drivers) ? body.drivers : [] })
      } catch {
        if (!cancelled) setFailed(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [active, userId, have, authedFetch])

  if (have) return { status: 'ready', drivers: loaded!.drivers }
  return { status: !active || userId === null ? 'off' : failed ? 'error' : 'loading', drivers: [] }
}
