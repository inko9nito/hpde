import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  identityAvailable,
  loadIdentityWidget,
  startGoogleSignIn,
  isSignInReturn,
  restoreReturnTo,
  showIdentityWidget,
  adoptSavedToken,
} from './identity'
import type { IdentityUser, IdentityWidget } from './identity'
import { TEST_DRIVER_ID } from '../data/testAccount'
import type { Driver } from '../data/drivers'
import { PROFILE_AVATAR_KEY, PROFILE_NAME_KEY, profileParts } from '../utils/profile'

// 'unavailable' = this copy of the site has no Identity service (GitHub
// Pages, local dev). Everything public still works; sign-in is hidden.
export type AuthStatus = 'loading' | 'unavailable' | 'signed-out' | 'signed-in'

export interface AuthUser {
  id: string
  email: string
  // Their name and picture as the app shows them (#416): the ones they set
  // on Edit profile, or else Google's.
  name: string | null
  avatarUrl: string | null
  // Each on its own: what they set on Edit profile, and Google's.
  profile: ReturnType<typeof profileParts>
  // Identity roles (set in the Netlify UI). "admin" can create events
  // (#229); the events function enforces it server-side.
  roles: string[]
}

interface AuthValue {
  status: AuthStatus
  user: AuthUser | null
  signIn(): void
  signOut(): void
  // Edit profile (#416): the name and picture to show in the app — null
  // for Google's. Throws with a message to show.
  saveProfile(profile: { name: string | null; avatarUrl: string | null }): Promise<void>
  // fetch() with the signed-in user's token attached, for calls to the
  // personal-data functions (notes, garage).
  authedFetch(input: RequestInfo, init?: RequestInit): Promise<Response>
  // Who an admin is acting as (#396), from the menu: another driver, or
  // the test account (#309) — everywhere, until they switch back; null for
  // themselves. Every page shows that driver's data, and saves as them.
  actingAs: Driver | null
  setActingAs(driver: Driver | null): void
  // Acting as the test account.
  testAccount: boolean
}

/** The test account (#309), as a driver an admin can act as. */
export const TEST_DRIVER: Driver = { id: TEST_DRIVER_ID, email: '', name: 'Test account' }

const AuthContext = createContext<AuthValue | null>(null)

// Who an admin is acting as (#396), and who that admin is, by user id, so
// it's only ever theirs: someone else signing in on this device starts as
// themselves. Before #396 only the test account could be switched to,
// kept as the admin's id under the old key; it's read as that.
const ACTING_AS_KEY = 'hpde:actingAs'
const TEST_ACCOUNT_KEY = 'hpde:testAccount'

interface ActingAsRecord {
  by: string
  driver: Driver
}

function readActingAs(): ActingAsRecord | null {
  try {
    const raw = localStorage.getItem(ACTING_AS_KEY)
    if (raw) {
      const r = JSON.parse(raw) as Partial<ActingAsRecord> | null
      return r && typeof r.by === 'string' && typeof r.driver?.id === 'string' ? (r as ActingAsRecord) : null
    }
    const testOf = localStorage.getItem(TEST_ACCOUNT_KEY)
    return testOf ? { by: testOf, driver: TEST_DRIVER } : null
  } catch {
    return null
  }
}

function writeActingAs(record: ActingAsRecord | null) {
  try {
    localStorage.removeItem(TEST_ACCOUNT_KEY)
    if (record) localStorage.setItem(ACTING_AS_KEY, JSON.stringify(record))
    else localStorage.removeItem(ACTING_AS_KEY)
  } catch {
    // Private browsing: it lasts until the page is closed.
  }
}

/**
 * authedFetch couldn't get a token: the sign-in has lapsed. It's renewed
 * behind the scenes after an hour (gotrue-js, with a one-time refresh
 * token), and when that renewal fails gotrue-js drops the session without
 * telling anyone. Callers show "signed out", not a connection problem —
 * retrying could never work.
 */
export class SignedOutError extends Error {
  constructor() {
    super('Signed out')
    this.name = 'SignedOutError'
  }
}

function toAuthUser(u: IdentityUser): AuthUser {
  const profile = profileParts(u.user_metadata)
  return {
    id: u.id,
    email: u.email,
    name: profile.own.name ?? profile.signIn.name,
    avatarUrl: profile.own.avatarUrl ?? profile.signIn.avatarUrl,
    profile,
    roles: u.app_metadata?.roles ?? [],
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [identityUser, setIdentityUser] = useState<IdentityUser | null>(null)
  const [widget, setWidget] = useState<IdentityWidget | null>(null)
  const [acting, setActing] = useState<ActingAsRecord | null>(readActingAs)
  // Bumped when Edit profile changes the user in place (gotrue-js keeps it there).
  const [profileSaves, setProfileSaves] = useState(0)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!(await identityAvailable())) {
        if (!cancelled) setStatus('unavailable')
        return
      }
      let w: IdentityWidget
      try {
        w = await loadIdentityWidget()
      } catch {
        if (!cancelled) setStatus('unavailable')
        return
      }
      if (cancelled) return
      const apply = (u: IdentityUser | null) => {
        setIdentityUser(u)
        setStatus(u ? 'signed-in' : 'signed-out')
      }
      // The widget initializes itself as soon as its script runs, so by now
      // its 'init' event (and, with a saved session, 'login') has already
      // fired. Don't call w.init() again: the v1 widget the site loads has
      // no guard against that and re-initializes, which on the way back
      // from Google crashed it mid-login and left the app stuck until a
      // manual refresh (#231). 'init' is kept for the unlikely case the
      // script ran before the page finished parsing.
      w.on('init', apply)
      // On the way back from Google, the widget reports 'login' once it has
      // traded the token for a user and saved the session.
      let finishingSignIn = isSignInReturn()
      w.on('login', u => {
        w.close()
        apply(u)
        if (finishingSignIn) {
          finishingSignIn = false
          restoreReturnTo()
          showIdentityWidget()
        }
      })
      // If the token exchange fails, the widget's modal has the error.
      w.on('error', err => {
        // Also fires with null when an error is cleared.
        if (!err) return
        showIdentityWidget()
        if (finishingSignIn) {
          finishingSignIn = false
          apply(null)
        }
      })
      w.on('logout', () => {
        w.close()
        apply(null)
      })
      setWidget(w)
      // Read the session the widget has already restored. Not on the way
      // back from Google: currentUser() is set as soon as the token exchange
      // starts, before the user's details load — wait for 'login' instead.
      if (!finishingSignIn) apply(w.currentUser())
    })()
    return () => {
      cancelled = true
    }
  }, [])

  // The access token, renewed if it's due — with the newest refresh token
  // on the device (see adoptSavedToken). If Identity still refuses (the
  // sign-in was revoked), gotrue-js has already dropped it, so show it:
  // signed out, with a way back in.
  const renew = useCallback(async (u: IdentityUser): Promise<string> => {
    adoptSavedToken(u)
    try {
      return await u.jwt()
    } catch (err) {
      console.error('Sign-in renewal failed:', err)
      setIdentityUser(null)
      setStatus('signed-out')
      throw new SignedOutError()
    }
  }, [])

  // Renew in the background when the app is opened or comes back to the
  // front, so a save never waits on it — or finds out only then that the
  // sign-in lapsed. jwt() only goes to the network when the token is due.
  useEffect(() => {
    if (!identityUser) return
    const renewIfVisible = () => {
      if (document.visibilityState === 'visible') renew(identityUser).catch(() => {})
    }
    renewIfVisible()
    document.addEventListener('visibilitychange', renewIfVisible)
    window.addEventListener('focus', renewIfVisible)
    return () => {
      document.removeEventListener('visibilitychange', renewIfVisible)
      window.removeEventListener('focus', renewIfVisible)
    }
  }, [identityUser, renew])

  const signIn = useCallback(() => startGoogleSignIn(), [])
  const signOut = useCallback(() => widget?.logout(), [widget])
  // In their Identity user_metadata, under the app's own keys: Google's
  // stay as they are (#416). Null takes a key out — back to Google's.
  const saveProfile = useCallback(
    async ({ name, avatarUrl }: { name: string | null; avatarUrl: string | null }) => {
      if (!identityUser) throw new SignedOutError()
      await renew(identityUser)
      try {
        await identityUser.update({ data: { [PROFILE_NAME_KEY]: name, [PROFILE_AVATAR_KEY]: avatarUrl } })
      } catch (err) {
        console.error('Saving the profile failed:', err)
        throw new Error('Couldn’t save your profile. Check your connection and try again.')
      }
      setProfileSaves(n => n + 1)
    },
    [identityUser, renew],
  )
  const authedFetch = useCallback(
    async (input: RequestInfo, init: RequestInit = {}) => {
      if (!identityUser) throw new SignedOutError()
      const token = await renew(identityUser)
      const headers = new Headers(init.headers)
      headers.set('Authorization', `Bearer ${token}`)
      return fetch(input, { ...init, headers })
    },
    [identityUser, renew],
  )

  // Signed out: themselves again next time.
  useEffect(() => {
    if (status !== 'signed-out' || acting === null) return
    setActing(null)
    writeActingAs(null)
  }, [status, acting])

  // Again after Edit profile, which changes identityUser in place.
  const user = useMemo(() => (identityUser ? toAuthUser(identityUser) : null), [identityUser, profileSaves])
  // The admin role (ADMIN_ROLE); the functions check it too.
  const isAdmin = status === 'signed-in' && !!user?.roles.includes('admin')
  const userId = user?.id ?? null
  // Only the admin who chose it, and never themselves.
  const actingAs = isAdmin && acting?.by === userId && acting.driver.id !== userId ? acting.driver : null
  const testAccount = actingAs?.id === TEST_DRIVER_ID
  const setActingAs = useCallback((driver: Driver | null) => {
    const next = driver && isAdmin && userId && driver.id !== userId ? { by: userId, driver } : null
    setActing(next)
    writeActingAs(next)
  }, [isAdmin, userId])

  const value = useMemo<AuthValue>(
    () => ({ status, user, signIn, signOut, saveProfile, authedFetch, actingAs, setActingAs, testAccount }),
    [status, user, signIn, signOut, saveProfile, authedFetch, actingAs, setActingAs, testAccount],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const SIGNED_OUT_FALLBACK: AuthValue = {
  status: 'unavailable',
  user: null,
  signIn: () => {},
  signOut: () => {},
  saveProfile: () => Promise.reject(new SignedOutError()),
  authedFetch: () => Promise.reject(new SignedOutError()),
  actingAs: null,
  setActingAs: () => {},
  testAccount: false,
}

// Components rendered without a provider (isolated tests) behave as if
// sign-in isn't available, rather than crashing.
export function useAuth(): AuthValue {
  return useContext(AuthContext) ?? SIGNED_OUT_FALLBACK
}
