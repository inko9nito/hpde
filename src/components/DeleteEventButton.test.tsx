import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { EVENTS } from '../data'
import type { EventConfig } from '../types'

const created: EventConfig = {
  id: '2099-10-10_test',
  name: 'Test',
  runGroups: [],
  days: [{ id: 'saturday', label: 'Saturday', date: '2099-10-10', activities: [] }],
}

// identity.ts caches the first widget it loads, so every test shares one
// fake and just changes who's signed in.
let roles: string[] = []
const handlers: Record<string, (u: unknown) => void> = {}
const currentUser = () => ({ id: 'u', email: 'v@example.com', app_metadata: { roles }, jwt: async () => 'token' })
const fakeWidget = {
  init: () => handlers.init?.(currentUser()),
  on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
  open() {}, close() {}, logout() {}, currentUser,
} as unknown as NonNullable<typeof window.netlifyIdentity>

function signInAs(nextRoles: string[]) {
  roles = nextRoles
  window.netlifyIdentity = fakeWidget
}

const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  if (String(url).includes('/.netlify/identity/settings')) return json({})
  if (String(url).includes('api/created-events')) {
    if (init?.method === 'DELETE') return json({ deleted: created.id })
    if (init?.method === 'POST') return json({ event: { ...created, id: '2099-11-11_fresh', name: 'Fresh Event' } }, 201)
    return json({ events: [created] })
  }
  return new Response('not found', { status: 404 })
})

function renderApp() {
  render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
}

async function openInfo(eventId: string) {
  window.location.hash = `#/event/${eventId}`
  renderApp()
  await userEvent.click(await screen.findByRole('tab', { name: 'Info' }))
}

describe('deleting a created event (#229)', () => {
  beforeEach(() => {
    localStorage.clear()
    fetchMock.mockClear()
    vi.stubGlobal('fetch', fetchMock)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    delete window.netlifyIdentity
  })

  it('asks for confirmation, then deletes and goes home', async () => {
    signInAs(['admin'])
    await openInfo(created.id)

    await userEvent.click(await screen.findByRole('button', { name: 'Delete event' }))
    expect(screen.getByRole('alertdialog')).toHaveTextContent('Delete “Test”?')

    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(fetchMock).not.toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ method: 'DELETE' }))

    await userEvent.click(screen.getByRole('button', { name: 'Delete event' }))
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }))

    await waitFor(() => expect(window.location.hash).toBe('#/'))
    expect(screen.getByRole('status')).toHaveTextContent('“Test” deleted')
    const [url, init] = fetchMock.mock.calls.find(([, i]) => i?.method === 'DELETE')!
    expect(url).toContain(`?id=${created.id}`)
    expect(new Headers(init!.headers).get('Authorization')).toBe('Bearer token')
  })

  it('is hidden from non-admins', async () => {
    signInAs([])
    const eventName = created.name
    await openInfo(created.id)
    // Signed in and the created event loaded — the button would be there by now.
    await screen.findAllByRole('button', { name: 'Account: v@example.com' })
    await screen.findAllByRole('heading', { name: new RegExp(eventName) })
    expect(screen.queryByRole('button', { name: 'Delete event' })).not.toBeInTheDocument()
  })

  it('is hidden on built-in events, even for admins', async () => {
    signInAs(['admin'])
    const eventName = EVENTS[0].name
    await openInfo(EVENTS[0].id)
    // Signed in and the created event loaded — the button would be there by now.
    await screen.findAllByRole('button', { name: 'Account: v@example.com' })
    await screen.findAllByRole('heading', { name: new RegExp(eventName) })
    expect(screen.queryByRole('button', { name: 'Delete event' })).not.toBeInTheDocument()
  })

  it('confirms a new event with a toast on its page', async () => {
    signInAs(['admin'])
    window.location.hash = '#/new-event'
    renderApp()
    await userEvent.type(await screen.findByLabelText('Title'), 'Fresh Event')
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2099-11-11' } })
    await userEvent.click(screen.getByRole('button', { name: 'Create event' }))

    await waitFor(() => expect(window.location.hash).toBe('#/event/2099-11-11_fresh'))
    expect(await screen.findByRole('status')).toHaveTextContent('“Fresh Event” created')
  })
})

