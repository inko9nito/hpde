import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { EventsProvider, withTrackMap, CREATED_EVENTS_CACHE_KEY } from './EventsContext'
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
    // Not a blank page (#231): the header is there to get back out.
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
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

describe('landing page while created events load', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('shows a loading row, not "No upcoming events", until the fetch lands', async () => {
    // Far future: every built-in event is past, so Upcoming depends on the fetch.
    vi.setSystemTime(new Date('2100-01-01T12:00:00'))
    let resolve!: (r: Response) => void
    vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(r => { resolve = r })))
    localStorage.clear()
    window.location.hash = '#/'
    render(<EventsProvider><App /></EventsProvider>)

    expect(screen.getByLabelText('Loading events')).toBeInTheDocument()
    expect(screen.queryByText('No upcoming events.')).not.toBeInTheDocument()

    resolve(new Response(JSON.stringify({ events: [] }), { headers: { 'Content-Type': 'application/json' } }))
    expect(await screen.findByText('No upcoming events.')).toBeInTheDocument()
    expect(screen.queryByLabelText('Loading events')).not.toBeInTheDocument()
  })
})

describe('created events cache (#231)', () => {
  const json = (body: unknown) =>
    new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })

  beforeEach(() => {
    localStorage.clear()
  })
  afterEach(() => vi.unstubAllGlobals())

  it('shows a cached created event right away on reload, before the fetch lands', () => {
    localStorage.setItem(CREATED_EVENTS_CACHE_KEY, JSON.stringify([created]))
    vi.stubGlobal('fetch', vi.fn(() => new Promise<Response>(() => {})))
    window.location.hash = `#/event/${created.id}`
    render(<EventsProvider><App /></EventsProvider>)

    expect(screen.getByText('Schedule coming soon')).toBeInTheDocument()
    expect(screen.queryByLabelText('Loading event')).not.toBeInTheDocument()
  })

  it('caches what the fetch returns, without the build-specific map URL', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => json({ events: [{ ...created, trackId: 'ecr-2-7' }] })))
    window.location.hash = '#/'
    render(<EventsProvider><App /></EventsProvider>)

    await screen.findByRole('button', { name: /New Track Day/ })
    const cached = JSON.parse(localStorage.getItem(CREATED_EVENTS_CACHE_KEY)!)
    expect(cached).toEqual([{ ...created, trackId: 'ecr-2-7' }])
  })

  it('drops a cached event the fetch no longer returns', async () => {
    localStorage.setItem(CREATED_EVENTS_CACHE_KEY, JSON.stringify([created]))
    vi.stubGlobal('fetch', vi.fn(async () => json({ events: [] })))
    window.location.hash = `#/event/${created.id}`
    render(<EventsProvider><App /></EventsProvider>)

    expect(await screen.findByText('This event doesn’t exist')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(CREATED_EVENTS_CACHE_KEY)!)).toEqual([])
  })

  it('keeps the cached events when the fetch fails', async () => {
    localStorage.setItem(CREATED_EVENTS_CACHE_KEY, JSON.stringify([created]))
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('offline') }))
    window.location.hash = `#/event/${created.id}`
    render(<EventsProvider><App /></EventsProvider>)

    await new Promise(r => setTimeout(r, 0))
    expect(screen.getByText('Schedule coming soon')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem(CREATED_EVENTS_CACHE_KEY)!)).toEqual([created])
  })
})
