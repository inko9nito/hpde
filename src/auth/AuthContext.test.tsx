import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
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
  update: () => Promise.reject(new Error('Not used here')),
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
    // Its own menu (#416), not the widget's "Logged in" panel.
    await userEvent.click(account[account.length - 1])
    const menu = screen.getByRole('dialog', { name: 'Account' })
    expect(menu).toHaveTextContent('Dana Driver')
    expect(menu).toHaveTextContent('driver@example.com')
    expect(within(menu).getAllByRole('button').map(b => b.textContent)).toEqual(['Edit profile', 'Log out'])
    expect(widget.open).not.toHaveBeenCalled()
  })

  it('flips back to the sign-in prompt on logout', async () => {
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
    const widget = fakeWidget(driver)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    renderApp()
    await screen.findAllByRole('button', { name: 'Account: driver@example.com' })
    widget.logout()
    await waitFor(() => expect(screen.getByText(/Sign in to keep notes/)).toBeInTheDocument())
  })
})

describe('the account menu and Edit profile (#416)', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  // A signed-in driver whose user_metadata changes as gotrue-js's update()
  // changes it: in place, a key set to null taken out.
  function editableDriver(meta: Record<string, unknown>) {
    const user: IdentityUser = {
      id: 'u1',
      email: 'driver@example.com',
      user_metadata: { ...meta },
      jwt: () => Promise.resolve('token-abc'),
      update: vi.fn(async ({ data }: { data: Record<string, unknown> }) => {
        for (const [key, value] of Object.entries(data)) {
          if (value === null) delete user.user_metadata![key]
          else user.user_metadata![key] = value
        }
        return user
      }),
    }
    return user
  }

  function renderMore(user: IdentityUser) {
    vi.spyOn(identity, 'identityAvailable').mockResolvedValue(true)
    const widget = fakeWidget(user)
    vi.spyOn(identity, 'loadIdentityWidget').mockResolvedValue(widget)
    window.location.hash = '#/more'
    render(
      <AuthProvider>
        <EventsProvider initialEvents={EVENTS}>
          <App />
        </EventsProvider>
      </AuthProvider>,
    )
    return widget
  }

  async function openMenu() {
    await userEvent.click(await screen.findByRole('button', { name: 'Account: driver@example.com' }))
    return screen.getByRole('dialog', { name: 'Account' })
  }

  it('logs out from the menu', async () => {
    const widget = renderMore(editableDriver({ full_name: 'Dana Driver' }))
    await userEvent.click(within(await openMenu()).getByRole('button', { name: 'Log out' }))
    expect(widget.logout).toHaveBeenCalled()
    expect(await screen.findByRole('button', { name: 'Sign in' })).toBeInTheDocument()
    expect(screen.queryByRole('dialog', { name: 'Account' })).not.toBeInTheDocument()
  })

  it('sets a name for the app, under its own key, leaving Google’s alone — and back to Google’s when cleared', async () => {
    const user = editableDriver({ full_name: 'Dana Driver', avatar_url: 'https://pics.example/dana.jpg' })
    renderMore(user)
    await userEvent.click(within(await openMenu()).getByRole('button', { name: 'Edit profile' }))
    const page = screen.getByRole('dialog', { name: 'Edit profile' })
    // A page sheet with Cancel, up from the bottom (#356, #415).
    expect(within(page).getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    const name = within(page).getByRole('textbox', { name: 'Name' })
    // Nothing of their own yet: Google's shows through.
    expect(name).toHaveValue('')
    expect(name).toHaveAttribute('placeholder', 'Dana Driver')
    expect(within(page).getByRole('button', { name: 'Save' })).toBeDisabled()
    expect(within(page).queryByRole('button', { name: 'Use Google’s' })).not.toBeInTheDocument()

    await userEvent.type(name, '  Dana  the Driver ')
    await userEvent.click(within(page).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument())
    expect(user.update).toHaveBeenCalledWith({ data: { hpde_name: 'Dana the Driver', hpde_avatar: null } })
    expect(user.user_metadata).toEqual({ full_name: 'Dana Driver', avatar_url: 'https://pics.example/dana.jpg', hpde_name: 'Dana the Driver' })
    expect(await openMenu()).toHaveTextContent('Dana the Driver')

    await userEvent.click(within(screen.getByRole('dialog', { name: 'Account' })).getByRole('button', { name: 'Edit profile' }))
    const again = screen.getByRole('dialog', { name: 'Edit profile' })
    await userEvent.clear(within(again).getByRole('textbox', { name: 'Name' }))
    await userEvent.click(within(again).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument())
    expect(user.user_metadata).toEqual({ full_name: 'Dana Driver', avatar_url: 'https://pics.example/dana.jpg' })
    expect(await openMenu()).toHaveTextContent('Dana Driver')
  })

  it('uploads a picture for the app, and goes back to Google’s', async () => {
    const createObjectURL = vi.fn(() => 'blob:dana')
    vi.stubGlobal('URL', Object.assign(URL, { createObjectURL, revokeObjectURL: vi.fn() }))
    const calls: { method: string; url: string; type: string | null; auth: string | null }[] = []
    vi.stubGlobal('fetch', vi.fn(async (url: string, init: RequestInit = {}) => {
      const headers = new Headers(init.headers)
      calls.push({ method: init.method ?? 'GET', url: String(url), type: headers.get('Content-Type'), auth: headers.get('Authorization') })
      if (String(url).includes('/api/profile')) {
        return new Response(JSON.stringify(init.method === 'PUT' ? { avatar: '/api/profile?avatar=u1&v=abc' } : { deleted: true }))
      }
      return new Response(JSON.stringify({}), { status: 404 })
    }))
    const user = editableDriver({ full_name: 'Dana Driver', avatar_url: 'https://pics.example/dana.jpg' })
    renderMore(user)
    await userEvent.click(within(await openMenu()).getByRole('button', { name: 'Edit profile' }))
    const page = screen.getByRole('dialog', { name: 'Edit profile' })
    await userEvent.upload(within(page).getByLabelText('Choose a picture'), new File(['png'], 'dana.png', { type: 'image/png' }))
    // Shown from the phone till Save.
    await waitFor(() => expect(page.querySelector('img[data-avatar]')).toHaveAttribute('src', 'blob:dana'))
    await userEvent.click(within(page).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument())
    expect(calls.filter(c => c.url.includes('/api/profile'))).toEqual([
      { method: 'PUT', url: '/api/profile?avatar=1', type: 'image/png', auth: 'Bearer token-abc' },
    ])
    expect(user.update).toHaveBeenCalledWith({ data: { hpde_name: null, hpde_avatar: '/api/profile?avatar=u1&v=abc' } })
    expect(user.user_metadata).toMatchObject({ avatar_url: 'https://pics.example/dana.jpg', hpde_avatar: '/api/profile?avatar=u1&v=abc' })
    const button = screen.getByRole('button', { name: 'Account: driver@example.com' })
    expect(button.querySelector('img')).toHaveAttribute('src', '/api/profile?avatar=u1&v=abc')

    await userEvent.click(within(await openMenu()).getByRole('button', { name: 'Edit profile' }))
    const again = screen.getByRole('dialog', { name: 'Edit profile' })
    await userEvent.click(within(again).getByRole('button', { name: 'Use Google’s' }))
    expect(again.querySelector('img[data-avatar]')).toHaveAttribute('src', 'https://pics.example/dana.jpg')
    await userEvent.click(within(again).getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(screen.queryByRole('dialog', { name: 'Edit profile' })).not.toBeInTheDocument())
    expect(user.user_metadata).toEqual({ full_name: 'Dana Driver', avatar_url: 'https://pics.example/dana.jpg' })
    await waitFor(() => expect(calls.filter(c => c.url.includes('/api/profile')).map(c => c.method)).toEqual(['PUT', 'DELETE']))
    expect(button.querySelector('img')).toHaveAttribute('src', 'https://pics.example/dana.jpg')
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
