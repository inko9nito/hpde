import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from './AuthContext'
import { EVENTS } from '../data'
import type { IdentityUser, IdentityWidget } from './identity'
import * as identity from './identity'

// A stand-in for the Netlify Identity widget: records handlers so tests can
// fire init/login/logout the way the real widget would.
function fakeWidget(initialUser: IdentityUser | null) {
  const handlers: Record<string, ((arg?: unknown) => void)[]> = {}
  const widget = {
    init: vi.fn(() => handlers.init?.forEach(h => h(initialUser))),
    open: vi.fn(),
    close: vi.fn(),
    logout: vi.fn(() => handlers.logout?.forEach(h => h())),
    // What the widget does once it has traded the redirect's token for a user.
    completeLogin: (user: IdentityUser) => handlers.login?.forEach(h => h(user)),
    currentUser: () => initialUser,
    on: (event: string, cb: (arg?: unknown) => void) => {
      ;(handlers[event] ??= []).push(cb)
    },
  }
  return widget as unknown as IdentityWidget & {
    open: ReturnType<typeof vi.fn>
    completeLogin: (user: IdentityUser) => void
  }
}

const driver: IdentityUser = {
  id: 'u1',
  email: 'driver@example.com',
  user_metadata: { full_name: 'Dana Driver' },
  jwt: () => Promise.resolve('token-abc'),
}

function renderApp() {
  window.location.hash = `#/event/${encodeURIComponent(EVENTS[0].id)}`
  localStorage.setItem('hpde:activeTab', JSON.stringify('notes'))
  render(
    <AuthProvider>
      <App />
    </AuthProvider>,
  )
}

describe('sign-in (#223)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('hides sign-in where Identity is not available (GitHub Pages)', async () => {
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(false)
    renderApp()
    expect(await screen.findByText(/isn't available on this version/)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument()
  })

  it('asks signed-out users to sign in for notes, schedule stays public', async () => {
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(fakeWidget(null))
    const google = vi.spyOn(identity, 'startGoogleSignIn').mockImplementation(() => {})
    renderApp()
    await userEvent.click(await screen.findByRole('button', { name: 'Sign in with Google' }))
    expect(google).toHaveBeenCalled()
    await userEvent.click(screen.getByRole('tab', { name: 'Schedule' }))
    expect(screen.queryByText(/Sign in to/)).not.toBeInTheDocument()
  })

  it('shows the account button and notes once signed in', async () => {
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    const account = await screen.findAllByRole('button', { name: 'Account: driver@example.com' })
    expect(screen.queryByText(/Sign in to/)).not.toBeInTheDocument()
    await userEvent.click(account[account.length - 1])
    expect(widget.open).toHaveBeenCalled()
  })

  it('flips back to the sign-in prompt on logout', async () => {
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await screen.findAllByRole('button', { name: 'Account: driver@example.com' })
    widget.logout()
    await waitFor(() => expect(screen.getByText(/Sign in to keep private notes/)).toBeInTheDocument())
  })
})


describe('coming back from Google (#231)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
  })

  it('reloads into the signed-in page once the login completes', async () => {
    vi.spyOn(identity, 'isSignInReturn').mockReturnValue(true)
    const reload = vi.spyOn(identity, 'reloadAfterSignIn').mockImplementation(() => {})
    const widget = fakeWidget(null)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await new Promise(r => setTimeout(r, 0))

    // gotrue saves the session, then the widget reports the login.
    localStorage.setItem('gotrue.user', '{}')
    widget.completeLogin(driver)
    expect(reload).toHaveBeenCalledTimes(1)
    expect(widget.close).toHaveBeenCalled()
  })

  it("doesn't reload into a signed-out page when the session isn't saved yet", async () => {
    vi.spyOn(identity, 'isSignInReturn').mockReturnValue(true)
    const reload = vi.spyOn(identity, 'reloadAfterSignIn').mockImplementation(() => {})
    const widget = fakeWidget(null)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await new Promise(r => setTimeout(r, 0))

    widget.completeLogin(driver)
    expect(reload).not.toHaveBeenCalled()
    expect(await screen.findAllByRole('button', { name: 'Account: driver@example.com' })).not.toHaveLength(0)
  })

  it("never re-initializes the widget (v1 has no guard and restarts mid sign-in)", async () => {
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await screen.findAllByRole('button', { name: 'Account: driver@example.com' })
    expect(widget.init).not.toHaveBeenCalled()
  })

  it("doesn't reload for the login the widget reports on an ordinary load", async () => {
    vi.spyOn(identity, 'isSignInReturn').mockReturnValue(false)
    const reload = vi.spyOn(identity, 'reloadAfterSignIn').mockImplementation(() => {})
    const widget = fakeWidget(null)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await screen.findByRole('button', { name: 'Sign in with Google' })

    widget.completeLogin(driver)
    expect(await screen.findAllByRole('button', { name: 'Account: driver@example.com' })).not.toHaveLength(0)
    expect(reload).not.toHaveBeenCalled()
  })

  it('picks up a session even when the widget initialized before we listened', async () => {
    // The real widget inits itself when its script runs, so our handlers
    // miss its 'init' event.
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    expect(await screen.findAllByRole('button', { name: 'Account: driver@example.com' })).not.toHaveLength(0)
  })

  it('reloads back to where sign-in started, without the token in the URL', () => {
    const reload = vi.fn()
    vi.spyOn(window, 'location', 'get').mockReturnValue({ ...window.location, pathname: '/', search: '', reload })
    const replace = vi.spyOn(window.history, 'replaceState')
    sessionStorage.setItem(identity.RETURN_TO_KEY, '#/event/test')

    identity.reloadAfterSignIn()

    expect(replace).toHaveBeenCalledWith(null, '', '/#/event/test')
    expect(reload).toHaveBeenCalled()
    expect(sessionStorage.getItem(identity.RETURN_TO_KEY)).toBeNull()
  })
})
