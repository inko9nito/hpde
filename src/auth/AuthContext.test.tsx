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
    currentUser: () => initialUser,
    on: (event: string, cb: (arg?: unknown) => void) => {
      ;(handlers[event] ??= []).push(cb)
    },
  }
  return widget as unknown as IdentityWidget & { open: ReturnType<typeof vi.fn> }
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

