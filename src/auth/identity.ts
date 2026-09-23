// Thin wrapper around the Netlify Identity widget (#223) — the same
// sign-in setup the BEI app uses, loaded on demand so the public schedule
// never waits on it.

export interface IdentityUser {
  id: string
  email: string
  user_metadata?: { full_name?: string; avatar_url?: string }
  app_metadata?: { roles?: string[] }
  jwt(): Promise<string>
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

// Where gotrue (inside the widget) keeps the signed-in session.
const SESSION_KEY = 'gotrue.user'

// Only reload once the session is really on disk — a reload before that
// comes back signed out.
export function hasSavedSession(): boolean {
  try {
    return localStorage.getItem(SESSION_KEY) !== null
  } catch {
    return false
  }
}

// Finishes the Google round trip with a fresh page load at the spot the
// user signed in from (RETURN_TO_KEY). Switching to the signed-in view in
// place, on top of the redirect's #access_token page, left iOS Safari on a
// blank page until a manual refresh (#231) — so do that refresh for them.
// The session is already saved when the widget reports the login, so the
// reload comes up signed in, exactly like that manual refresh did.
export function reloadAfterSignIn() {
  let hash = ''
  try {
    hash = sessionStorage.getItem(RETURN_TO_KEY) ?? ''
    sessionStorage.removeItem(RETURN_TO_KEY)
  } catch {
    // Storage blocked — reload onto the home page instead.
  }
  // replaceState, not location.hash: a hash-only change doesn't reload, and
  // this also drops the #access_token entry from history.
  window.history.replaceState(null, '', window.location.pathname + window.location.search + hash)
  window.location.reload()
}

// Identity only exists on the Netlify deploy. GitHub Pages (and the
// GitHub-hosted PR previews) 404 here, and the Vite dev server answers
// with index.html — neither is JSON, so sign-in stays hidden there.
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
