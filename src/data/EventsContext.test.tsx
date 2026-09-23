import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { EventsProvider, withTrackMap } from './EventsContext'
import { ALL_EVENTS } from './index'
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

  it('lists a created event and shows "Schedule coming soon" for it', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    await userEvent.click(await screen.findByRole('button', { name: /New Track Day/ }))

    const panel = await screen.findByRole('tabpanel')
    expect(within(panel).getByText('Schedule coming soon')).toBeInTheDocument()
  })

  it('resolves a direct link to a created event once it has loaded', async () => {
    window.location.hash = `#/event/${created.id}`
    render(<EventsProvider><App /></EventsProvider>)

    expect(await screen.findByText('Schedule coming soon')).toBeInTheDocument()
  })

  it('waits for created events instead of showing another event, then says when one is gone', async () => {
    let resolve!: (r: Response) => void
    vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(r => { resolve = r })))
    window.location.hash = '#/event/2099-01-01_deleted'
    render(<EventsProvider><App /></EventsProvider>)

    expect(screen.getByLabelText('Loading event')).toBeInTheDocument()
    expect(screen.queryByRole('tablist', { name: 'Event section' })).not.toBeInTheDocument()

    resolve(new Response(JSON.stringify({ events: [created] }), { headers: { 'Content-Type': 'application/json' } }))
    expect(await screen.findByText('This event doesn’t exist')).toBeInTheDocument()
  })
})

describe('withTrackMap', () => {
  it('borrows the map of a built-in event with the same track icon', () => {
    const builtIn = ALL_EVENTS.find(e => e.trackId === 'ecr-2-7' && e.mapImage)!
    expect(withTrackMap({ ...created, trackId: 'ecr-2-7' }).mapImage).toBe(builtIn.mapImage)
    expect(withTrackMap({ ...created, trackId: 'unknown' })).not.toHaveProperty('mapImage')
    expect(withTrackMap(created)).not.toHaveProperty('mapImage')
  })
})
