import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { FIXTURE_EVENTS } from '../data'
import type { EventConfig } from '../types'

// A two-day event with a schedule on both days.
const stored: EventConfig = {
  id: '2099-10-10_fall',
  name: 'Fall Track Day',
  organizer: 'Texas Region SCCA',
  track: 'Motorsport Ranch - Cresson',
  city: 'Cresson, TX',
  configuration: '1.7',
  direction: 'Clockwise',
  trackId: 'msrc-1-7',
  runGroups: [{ id: 'red', label: 'Red', bgClass: 'bg-runred-500', textClass: 'text-white' }],
  days: [
    { id: 'saturday', label: 'Saturday', date: '2099-10-10', activities: [{ time: '08:00', type: 'session', onTrack: ['red'] }] },
    { id: 'sunday', label: 'Sunday', date: '2099-10-11', activities: [{ time: '09:00', type: 'session', onTrack: ['red'] }] },
  ],
}

let roles: string[] = ['admin']
let signedIn = true
const handlers: Record<string, (u: unknown) => void> = {}
const currentUser = () => (signedIn ? { id: 'u', email: 'v@example.com', app_metadata: { roles }, jwt: async () => 'token' } : null)
const fakeWidget = {
  init: () => handlers.init?.(currentUser()),
  on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
  open() {}, close() {}, logout() {}, currentUser,
} as unknown as NonNullable<typeof window.netlifyIdentity>

const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
  if (String(url).includes('/.netlify/identity/settings')) return json({})
  if (String(url).includes('api/events')) {
    if (init?.method === 'PUT') {
      const { details } = JSON.parse(init.body as string)
      return json({ event: { ...stored, name: details.name, updatedBy: 'v@example.com' } })
    }
    return json({ events: [stored] })
  }
  return new Response('not found', { status: 404 })
})

function renderAt(hash: string) {
  window.location.hash = hash
  render(<AuthProvider><EventsProvider><App /></EventsProvider></AuthProvider>)
}

function putBody() {
  const [url, init] = fetchMock.mock.calls.find(([, i]) => i?.method === 'PUT')!
  return { url, init: init!, details: JSON.parse(init!.body as string).details }
}

describe('Edit details (#232)', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    fetchMock.mockClear()
    vi.stubGlobal('fetch', fetchMock)
    roles = ['admin']
    signedIn = true
    window.netlifyIdentity = fakeWidget
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    delete window.netlifyIdentity
  })

  it('opens from the event menu with the details filled in, saves them, and goes back with a toast', async () => {
    renderAt(`#/event/${stored.id}`)
    await userEvent.click(await screen.findByRole('button', { name: 'More actions' }))
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit details' }))
    expect(window.location.hash).toBe(`#/edit-event/${stored.id}`)

    const title = await screen.findByLabelText('Title') as HTMLInputElement
    expect(screen.getByRole('heading', { name: 'Edit details' })).toBeInTheDocument()
    expect(title.value).toBe('Fall Track Day')
    expect((screen.getByLabelText('Start date') as HTMLInputElement).value).toBe('2099-10-10')
    expect((screen.getByLabelText('End date') as HTMLInputElement).value).toBe('2099-10-11')
    expect((screen.getByLabelText('Organizer') as HTMLInputElement).value).toBe('Texas Region SCCA')
    expect((screen.getByLabelText('Direction') as HTMLSelectElement).value).toBe('Clockwise')
    // Nothing to save until something changes.
    const save = screen.getByRole('button', { name: 'Save' })
    expect(save).toBeDisabled()

    await userEvent.clear(title)
    await userEvent.type(title, 'Fall Track Day CCW')
    fireEvent.change(screen.getByLabelText('Direction'), { target: { value: 'Counter-clockwise' } })
    await userEvent.click(save)

    await waitFor(() => expect(window.location.hash).toBe(`#/event/${stored.id}`))
    expect(await screen.findByRole('status')).toHaveTextContent('Details saved')
    const { url, init, details } = putBody()
    expect(url).toContain(`?id=${stored.id}`)
    expect(new Headers(init.headers).get('Authorization')).toBe('Bearer token')
    // The track didn't change, so neither does its icon.
    expect(details).toEqual({
      name: 'Fall Track Day CCW',
      startDate: '2099-10-10',
      endDate: '2099-10-11',
      organizer: 'Texas Region SCCA',
      track: 'Motorsport Ranch - Cresson',
      city: 'Cresson, TX',
      configuration: '1.7',
      direction: 'Counter-clockwise',
      link: '',
      trackId: 'msrc-1-7',
    })
    // The page shows what the server saved.
    expect(await screen.findAllByRole('heading', { name: /Fall Track Day CCW/ })).not.toHaveLength(0)
  })

  it('moves both days together, and warns before a day’s schedule is dropped', async () => {
    renderAt(`#/edit-event/${stored.id}`)
    const start = await screen.findByLabelText('Start date')
    // A week later: same length, so the schedule moves along.
    fireEvent.change(start, { target: { value: '2099-10-17' } })
    expect((screen.getByLabelText('End date') as HTMLInputElement).value).toBe('2099-10-18')
    expect(screen.queryByText(/saving removes/)).not.toBeInTheDocument()

    // Back to the original start, one day only: Sunday's schedule goes.
    fireEvent.change(start, { target: { value: '2099-10-10' } })
    fireEvent.change(screen.getByLabelText('End date'), { target: { value: '2099-10-10' } })
    expect(screen.getByText(/saving removes/)).toHaveTextContent('Sunday, Oct 11, has a schedule that saving removes.')

    await userEvent.click(screen.getByRole('button', { name: 'Save' }))
    await waitFor(() => expect(putBody().details).toMatchObject({ startDate: '2099-10-10', endDate: '2099-10-10' }))
  })

  it('keeps the changes when the page reloads mid-edit (signing in again goes to Google and back)', async () => {
    renderAt(`#/edit-event/${stored.id}`)
    const title = await screen.findByLabelText('Title')
    await userEvent.type(title, ' (rain date)')
    // The page going away with the tab, as a redirect does: no unmount.
    const draft = sessionStorage.getItem(`hpde:detailsDraft:${stored.id}`)
    expect(draft).toContain('Fall Track Day (rain date)')
    cleanup()
    sessionStorage.setItem(`hpde:detailsDraft:${stored.id}`, draft!)

    renderAt(`#/edit-event/${stored.id}`)
    expect(((await screen.findByLabelText('Title')) as HTMLInputElement).value).toBe('Fall Track Day (rain date)')
    expect(screen.getByRole('button', { name: 'Save' })).toBeEnabled()

    // Closing the page drops it.
    await userEvent.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(window.location.hash).toBe(`#/event/${stored.id}`))
    expect(sessionStorage.getItem(`hpde:detailsDraft:${stored.id}`)).toBeNull()
  })

  it('shows Edit details disabled on test events, and the page refuses them', async () => {
    renderAt(`#/event/${FIXTURE_EVENTS[0].id}`)
    await userEvent.click(await screen.findByRole('button', { name: 'More actions' }))
    const item = screen.getByRole('menuitem', { name: /Edit details/ })
    expect(item).toBeDisabled()
    expect(item).toHaveTextContent('Test events can’t be edited')
    cleanup()

    renderAt(`#/edit-event/${FIXTURE_EVENTS[0].id}`)
    expect(await screen.findByText('Test events can’t be edited.')).toBeInTheDocument()
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument()
  })

  it('is for admins only', async () => {
    roles = []
    renderAt(`#/edit-event/${stored.id}`)
    expect(await screen.findByText('Only admins can edit events.')).toBeInTheDocument()
    expect(screen.queryByLabelText('Title')).not.toBeInTheDocument()
  })
})
