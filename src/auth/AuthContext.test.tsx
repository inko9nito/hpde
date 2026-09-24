import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from './AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { TEST_EVENTS as EVENTS } from '../test/events'
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
      <EventsProvider initialEvents={EVENTS}>
        <App />
      </EventsProvider>
    </AuthProvider>,
  )
}

describe('sign-in (#223)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('hides sign-in where Identity is not available (local dev)', async () => {
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
    sessionStorage.clear()
    vi.restoreAllMocks()
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
  })

  it('shows the signed-in view in place, back where sign-in started', async () => {
    vi.spyOn(identity, 'isSignInReturn').mockReturnValue(true)
    const widget = fakeWidget(null)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    // The widget clears the token hash; sign-in started on an event page.
    window.location.hash = ''
    sessionStorage.setItem(identity.RETURN_TO_KEY, `#/event/${encodeURIComponent(EVENTS[0].id)}`)
    render(<AuthProvider><EventsProvider initialEvents={EVENTS}><App /></EventsProvider></AuthProvider>)
    await new Promise(r => setTimeout(r, 0))

    widget.completeLogin(driver)
    expect(await screen.findAllByRole('button', { name: 'Account: driver@example.com' })).not.toHaveLength(0)
    expect(widget.close).toHaveBeenCalled()
    await waitFor(() => expect(window.location.hash).toBe(`#/event/${encodeURIComponent(EVENTS[0].id)}`))
    expect(sessionStorage.getItem(identity.RETURN_TO_KEY)).toBeNull()
  })

  it("keeps the widget's modal hidden until the Google login lands", async () => {
    vi.spyOn(identity, 'isSignInReturn').mockReturnValue(true)
    const show = vi.spyOn(identity, 'showIdentityWidget')
    const widget = fakeWidget(null)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await new Promise(r => setTimeout(r, 0))
    expect(show).not.toHaveBeenCalled()

    widget.completeLogin(driver)
    expect(show).toHaveBeenCalled()
  })

  it("doesn't trust currentUser() before the Google login completes", async () => {
    // Mid token exchange gotrue already reports a user with no details yet.
    vi.spyOn(identity, 'isSignInReturn').mockReturnValue(true)
    const widget = fakeWidget({ id: 'u1' } as IdentityUser)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await new Promise(r => setTimeout(r, 0))
    expect(screen.queryByRole('button', { name: /^Account/ })).not.toBeInTheDocument()

    widget.completeLogin(driver)
    expect(await screen.findAllByRole('button', { name: 'Account: driver@example.com' })).not.toHaveLength(0)
  })

  it('never re-initializes the widget (v1 has no guard and crashes mid sign-in)', async () => {
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await screen.findAllByRole('button', { name: 'Account: driver@example.com' })
    expect(widget.init).not.toHaveBeenCalled()
  })

  it('picks up a session even when the widget initialized before we listened', async () => {
    // The real widget inits itself when its script runs, so our handlers
    // miss its 'init' event.
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    expect(await screen.findAllByRole('button', { name: 'Account: driver@example.com' })).not.toHaveLength(0)
  })

  it('holds the account spot with a person icon while sign-in loads', async () => {
    vi.spyOn(identity, 'loadIdentityWidget').mockReturnValue(new Promise(() => {}))
    window.location.hash = '#/'
    const { container } = render(<AuthProvider><EventsProvider initialEvents={EVENTS}><App /></EventsProvider></AuthProvider>)
    await new Promise(r => setTimeout(r, 0))
    // Same 36px box the avatar will fill, so nothing shifts when it arrives.
    expect(container.querySelector('div[aria-hidden="true"].h-9.w-9 svg')).toBeInTheDocument()
  })
})
