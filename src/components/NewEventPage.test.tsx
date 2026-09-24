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

  function setup() {
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
    render(<AuthProvider><EventsProvider><NewEventPage onCreated={() => {}} onClose={() => {}} /></EventsProvider></AuthProvider>)
    const posted = async () => {
      await waitFor(() => expect(fetchMock).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ method: 'POST' })))
      const [, init] = fetchMock.mock.calls.find(([, i]) => i?.method === 'POST')!
      return JSON.parse(init!.body as string).event
    }
    return { fetchMock, posted }
  }

  it('defaults the end date to the start date and moves it with the start', async () => {
    const { posted } = setup()
    await userEvent.type(await screen.findByLabelText('Title'), 'Fall Track Day')
    const start = screen.getByLabelText('Start date') as HTMLInputElement
    const end = screen.getByLabelText('End date') as HTMLInputElement

    fireEvent.change(start, { target: { value: '2026-10-30' } })
    expect(end.value).toBe('2026-10-30')

    // Make it a 3-day event, then move the start: the length is kept.
    fireEvent.change(end, { target: { value: '2026-11-01' } })
    fireEvent.change(start, { target: { value: '2026-11-06' } })
    expect(end.value).toBe('2026-11-08')

    await userEvent.click(screen.getByRole('button', { name: 'Create event' }))
    expect(await posted()).toMatchObject({ startDate: '2026-11-06', endDate: '2026-11-08' })
  })

  it('blocks an end date before the start date', async () => {
    const { fetchMock } = setup()
    await userEvent.type(await screen.findByLabelText('Title'), 'Fall Track Day')
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2026-10-30' } })
    fireEvent.change(screen.getByLabelText('End date'), { target: { value: '2026-09-23' } })

    expect(screen.getByRole('alert')).toHaveTextContent('Ends before it starts')
    await userEvent.click(screen.getByRole('button', { name: 'Create event' }))
    expect(fetchMock).not.toHaveBeenCalledWith(expect.anything(), expect.objectContaining({ method: 'POST' }))
  })
})
