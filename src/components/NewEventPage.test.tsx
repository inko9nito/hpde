import '@testing-library/jest-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../auth/AuthContext'
import { EventsProvider } from '../data/EventsContext'
import { NewEventPage } from './NewEventPage'

const handlers: Record<string, (u: unknown) => void> = {}
const user = { id: 'u', email: 'v@example.com', app_metadata: { roles: ['admin'] }, jwt: async () => 'token' }

describe('NewEventPage', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('sends an end date computed from start date + Days', async () => {
    window.netlifyIdentity = {
      init: () => handlers.init?.(user),
      on: (e: string, cb: (u: unknown) => void) => { handlers[e] = cb },
      open() {}, close() {}, logout() {}, currentUser: () => user,
    } as unknown as NonNullable<typeof window.netlifyIdentity>
    const fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      const json = (body: unknown) => new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })
      if (String(url).includes('identity/settings')) return json({})
      if (init?.method === 'POST') return json({ error: 'stop here' })
      return json({ events: [] })
    })
    vi.stubGlobal('fetch', fetchMock)

    render(<AuthProvider><EventsProvider><NewEventPage onCreated={() => {}} /></EventsProvider></AuthProvider>)

    await userEvent.type(await screen.findByLabelText('Title'), 'Fall Track Day')
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2026-10-30' } })
    await userEvent.selectOptions(screen.getByLabelText(/Days/), '3')
    expect(screen.getByText('Ends Sun, Nov 1')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Create event' }))
    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ method: 'POST' })))
    const [, init] = fetchMock.mock.calls.find(([, i]) => i?.method === 'POST')!
    const { event } = JSON.parse(init!.body as string)
    expect(event).toMatchObject({ startDate: '2026-10-30', endDate: '2026-11-01' })
  })
})
