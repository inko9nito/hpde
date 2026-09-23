import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  identityAvailable,
  loadIdentityWidget,
  startGoogleSignIn,
  isSignInReturn,
  hasSavedSession,
  reloadAfterSignIn,
} from './identity'
import type { IdentityUser, IdentityWidget } from './identity'

// 'unavailable' = this copy of the site has no Identity service (GitHub
// Pages, local dev). Everything public still works; sign-in is hidden.
export type AuthStatus = 'loading' | 'unavailable' | 'signed-out' | 'signed-in'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  // Identity roles (set in the Netlify UI). "admin" can create events
  // (#229); the created-events function enforces it server-side.
  roles: string[]
}

interface AuthValue {
  status: AuthStatus
  user: AuthUser | null
  signIn(): void
  // Opens the widget's account panel (shows who's signed in + Log out).
  openAccount(): void
  signOut(): void
  // fetch() with the signed-in user's token attached, for calls to the
  // personal-data functions (notes, garage).
  authedFetch(input: RequestInfo, init?: RequestInit): Promise<Response>
}

const AuthContext = createContext<AuthValue | null>(null)

function toAuthUser(u: IdentityUser): AuthUser {
  return {
    id: u.id,
    email: u.email,
    name: u.user_metadata?.full_name ?? null,
    avatarUrl: u.user_metadata?.avatar_url ?? null,
    roles: u.app_metadata?.roles ?? [],
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>('loading')
  const [identityUser, setIdentityUser] = useState<IdentityUser | null>(null)
  const [widget, setWidget] = useState<IdentityWidget | null>(null)

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
      // no guard against that and re-initializes — mid token exchange on the
      // way back from Google, which fired 'login' before the session was
      // saved and reloaded into a signed-out page (#231). Kept for the
      // unlikely case the script ran before the page finished parsing.
      w.on('init', apply)
      // On the way back from Google, the widget reports 'login' once it has
      // traded the token for a user and saved the session.
      let finishingSignIn = isSignInReturn()
      w.on('login', u => {
        w.close()
        if (finishingSignIn && hasSavedSession()) {
          finishingSignIn = false
          reloadAfterSignIn()
          return
        }
        apply(u)
      })
      w.on('logout', () => {
        w.close()
        apply(null)
      })
      setWidget(w)
      // Read the session the widget has already restored. Not on the way
      // back from Google: currentUser() is set as soon as the token exchange
      // starts, before the session is saved — wait for 'login' instead.
      if (!finishingSignIn) apply(w.currentUser())
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const signIn = useCallback(() => startGoogleSignIn(), [])
  const openAccount = useCallback(() => widget?.open(), [widget])
  const signOut = useCallback(() => widget?.logout(), [widget])
  const authedFetch = useCallback(
    async (input: RequestInfo, init: RequestInit = {}) => {
      if (!identityUser) throw new Error('Not signed in')
      // jwt() refreshes the token first if it has expired.
      const token = await identityUser.jwt()
      const headers = new Headers(init.headers)
      headers.set('Authorization', `Bearer ${token}`)
      return fetch(input, { ...init, headers })
    },
    [identityUser],
  )

  const value = useMemo<AuthValue>(
    () => ({
      status,
      user: identityUser ? toAuthUser(identityUser) : null,
      signIn,
      openAccount,
      signOut,
      authedFetch,
    }),
    [status, identityUser, signIn, openAccount, signOut, authedFetch],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const SIGNED_OUT_FALLBACK: AuthValue = {
  status: 'unavailable',
  user: null,
  signIn: () => {},
  openAccount: () => {},
  signOut: () => {},
  authedFetch: () => Promise.reject(new Error('Not signed in')),
}

// Components rendered without a provider (isolated tests) behave as if
// sign-in isn't available, rather than crashing.
export function useAuth(): AuthValue {
  return useContext(AuthContext) ?? SIGNED_OUT_FALLBACK
}
