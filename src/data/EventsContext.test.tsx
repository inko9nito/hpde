import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { EventsProvider } from './EventsContext'
import type { EventConfig } from '../types'

const created: EventConfig = {
  id: '2099-10-10_new-track-day',
  name: 'New Track Day',
  track: 'Somewhere Raceway',
  runGroups: [],
  days: [{ id: 'saturday', label: 'Saturday', date: '2099-10-10', activities: [] }],
}

describe('events created in the app (#229)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '#/'
    vi.stubGlobal('fetch', vi.fn(async (url: string) =>
      String(url).endsWith('api/created-events')
        ? new Response(JSON.stringify({ events: [created] }), { headers: { 'Content-Type': 'application/json' } })
        : new Response('not found', { status: 404 }),
    ))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('lists a created event and shows "Schedule not posted yet" for it', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    await userEvent.click(await screen.findByRole('button', { name: /New Track Day/ }))

    const panel = await screen.findByRole('tabpanel')
    expect(within(panel).getByText('Schedule not posted yet')).toBeInTheDocument()
  })

  it('resolves a direct link to a created event once it has loaded', async () => {
    window.location.hash = `#/event/${created.id}`
    render(<EventsProvider><App /></EventsProvider>)

    expect(await screen.findByText('Schedule not posted yet')).toBeInTheDocument()
  })
})
