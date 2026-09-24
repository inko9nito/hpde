// Thin wrapper around the Netlify Identity widget (#223) — the same
// sign-in setup the BEI app uses, loaded on demand so the public schedule
// never waits on it.

export interface IdentityToken {
  access_token: string
  refresh_token: string
  // Milliseconds since the epoch.
  expires_at: number
}

export interface IdentityUser {
  id: string
  email: string
  user_metadata?: { full_name?: string; avatar_url?: string }
  app_metadata?: { roles?: string[] }
  // gotrue-js's copy of the sign-in (the widget is built on it).
  token?: IdentityToken | null
  // The access token, renewed first if it's (nearly) expired.
  jwt(): Promise<string>
}

// Where gotrue-js keeps the sign-in, in every version the widget has used.
export const SESSION_KEY = 'gotrue.user'

/**
 * Brings this page's copy of the sign-in up to date with the one saved on
 * the device, before it's renewed.
 *
 * A sign-in lasts an hour and is then renewed with a refresh token that
 * works once. Another copy of the site (a second tab, or this page before
 * a reload) may have renewed it since this page read it — and then this
 * page's refresh token is spent: renewing with it fails, and gotrue-js
 * responds by clearing the sign-in everywhere. Renewing with the newest
 * token, the one saved on the device, avoids that.
 */
export function adoptSavedToken(user: IdentityUser): void {
  try {
    const saved = JSON.parse(localStorage.getItem(SESSION_KEY) ?? 'null')
    const token = saved?.token as IdentityToken | undefined
    if (saved?.id !== user.id || !token?.refresh_token || !token.access_token) return
    if (token.refresh_token === user.token?.refresh_token) return
    if ((token.expires_at ?? 0) < (user.token?.expires_at ?? 0)) return
    user.token = token
  } catch {
    // Unreadable storage: renew with what this page has.
  }
}

export interface IdentityWidget {
  init(opts?: { APIUrl?: string }): void
  open(tab?: 'login' | 'signup'): void
  close(): void
  logout(): void
  currentUser(): IdentityUser | null
  on(event: 'init', cb: (user: IdentityUser | null) => void): void
  on(event: 'login', cb: (user: IdentityUser) => void): void
  on(event: 'logout' | 'close', cb: () => void): void
  on(event: 'error', cb: (err: Error) => void): void
}

declare global {
  interface Window {
    netlifyIdentity?: IdentityWidget
  }
}

const WIDGET_SRC = 'https://identity.netlify.com/v1/netlify-identity-widget.js'
const IDENTITY_PATH = '/.netlify/identity'

// Where the user was when they tapped "Sign in", so the Google round trip
// lands them back on the same event/tab instead of the landing page.
export const RETURN_TO_KEY = 'hpde:returnTo'

// True when this page load is the redirect back from Google — the widget
// reads the token out of the hash and clears it, so this is captured at
// startup, before the widget loads.
const signInReturn = /(^#\/?|&)access_token=/.test(window.location.hash)

export function isSignInReturn(): boolean {
  return signInReturn
}

// While the widget trades the token for a user it opens its full-screen
// modal for a moment — a white flash between the page and the signed-in
// view (#231). This class hides it (see index.css) until the login lands;
// visibility, because the widget sets display inline with !important.
const HIDE_WIDGET_CLASS = 'finishing-sign-in'
if (signInReturn) document.documentElement.classList.add(HIDE_WIDGET_CLASS)

export function showIdentityWidget() {
  document.documentElement.classList.remove(HIDE_WIDGET_CLASS)
}

// Puts the user back where they tapped "Sign in" (RETURN_TO_KEY) once the
// Google round trip completes. location.replace keeps the redirect's
// #access_token entry out of history, and — being a same-document hash
// navigation — fires hashchange for the app's router.
export function restoreReturnTo() {
  try {
    const hash = sessionStorage.getItem(RETURN_TO_KEY)
    sessionStorage.removeItem(RETURN_TO_KEY)
    if (hash && hash !== window.location.hash) window.location.replace(hash)
  } catch {
    // Storage blocked — stay wherever the redirect landed.
  }
}

// Identity only exists on Netlify. The Vite dev server answers with
// index.html, which isn't JSON, so sign-in stays hidden there.
export async function identityAvailable(): Promise<boolean> {
  try {
    const res = await fetch(`${IDENTITY_PATH}/settings`)
    return res.ok && (res.headers.get('content-type') ?? '').includes('json')
  } catch {
    return false
  }
}

let widgetPromise: Promise<IdentityWidget> | null = null

export function loadIdentityWidget(): Promise<IdentityWidget> {
  widgetPromise ??= new Promise((resolve, reject) => {
    if (window.netlifyIdentity) return resolve(window.netlifyIdentity)
    const script = document.createElement('script')
    script.src = WIDGET_SRC
    script.async = true
    script.onload = () =>
      window.netlifyIdentity ? resolve(window.netlifyIdentity) : reject(new Error('Identity widget missing'))
    script.onerror = () => reject(new Error('Identity widget failed to load'))
    document.head.appendChild(script)
  })
  return widgetPromise
}

// Straight to Google's consent screen — skips the widget's email/password
// modal, since Google is the only way in.
export function startGoogleSignIn() {
  try {
    sessionStorage.setItem(RETURN_TO_KEY, window.location.hash)
  } catch {
    // Private mode etc. — sign-in still works, it just lands on the home page.
  }
  window.location.assign(`${IDENTITY_PATH}/authorize?provider=google`)
}
