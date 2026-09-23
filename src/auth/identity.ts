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
