import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { EventsProvider } from '../data/EventsContext'
import type { EventConfig } from '../types'
import { todayLocalISO } from '../utils/time'

const day = (id: string, date: string) => ({ id, label: id, date, activities: [] })

const thisYear = todayLocalISO().slice(0, 4)

const twoDay: EventConfig = {
  id: '2099-10-10_two-day',
  name: 'Two Day Event',
  organizer: 'Texas Region SCCA',
  runGroups: [],
  days: [day('sunday', '2099-10-11'), day('saturday', '2099-10-10')],
}

const noOrganizer: EventConfig = {
  id: '2099-11-03_no-organizer',
  name: 'No Organizer Event',
  runGroups: [],
  days: [day('tuesday', '2099-11-03')],
}

// Jan 1 is today or earlier, Dec 31 today or later — either way this year.
const thisYearEvent: EventConfig = {
  id: `${thisYear}-01-01_this-year`,
  name: 'This Year Event',
  runGroups: [],
  days: [day('first', `${thisYear}-01-01`)],
}

const lastYearEvent: EventConfig = {
  id: '2000-11-07_last-year',
  name: 'Earlier Year Event',
  runGroups: [],
  days: [day('friday', '2000-11-07'), day('saturday', '2000-11-08')],
}

describe('landing event cards (#243)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '#/'
    vi.stubGlobal('fetch', vi.fn(async () =>
      new Response(JSON.stringify({ events: [twoDay, noOrganizer, thisYearEvent, lastYearEvent] }), { headers: { 'Content-Type': 'application/json' } }),
    ))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('shows only the first day of a multi-day event, and its organizer', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    const card = await screen.findByRole('button', { name: /Two Day Event/ })
    expect(within(card).getByText('Oct')).toBeInTheDocument()
    expect(within(card).getByText('10')).toBeInTheDocument()
    expect(within(card).queryByText('11')).not.toBeInTheDocument()
    expect(within(card).getByText('Texas Region SCCA')).toBeInTheDocument()
  })

  it('says so when an event has no organizer', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    const card = await screen.findByRole('button', { name: /No Organizer Event/ })
    expect(within(card).getByText('Organizer not set')).toBeInTheDocument()
  })

  it("shows the year under the date only when it isn't this year (#266)", async () => {
    render(<EventsProvider><App /></EventsProvider>)

    const past = await screen.findByRole('button', { name: /Earlier Year Event/ })
    expect(within(past).getByText('Nov')).toBeInTheDocument()
    expect(within(past).getByText('7')).toBeInTheDocument()
    expect(within(past).getByText('2000')).toBeInTheDocument()

    const upcoming = screen.getByRole('button', { name: /Two Day Event/ })
    expect(within(upcoming).getByText('2099')).toBeInTheDocument()

    const current = screen.getByRole('button', { name: /This Year Event/ })
    expect(within(current).getByText('Jan')).toBeInTheDocument()
    expect(within(current).queryByText(thisYear)).not.toBeInTheDocument()
  })
})

describe('live and upcoming cards (#276)', () => {
  const liveEvent: EventConfig = {
    id: `${todayLocalISO()}_live`,
    name: 'Live Event',
    organizer: 'Live Club',
    runGroups: [],
    days: [day('today', todayLocalISO())],
  }

  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '#/'
    vi.stubGlobal('fetch', vi.fn(async () =>
      new Response(JSON.stringify({ events: [twoDay, liveEvent, lastYearEvent] }), { headers: { 'Content-Type': 'application/json' } }),
    ))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('lists live and upcoming events together, with no Upcoming heading', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    const section = screen.getByRole('region', { name: 'Live and upcoming events' })
    await within(section).findByRole('button', { name: /Two Day Event/ })
    expect(within(section).getAllByRole('button').map(b => b.textContent)).toEqual([
      expect.stringContaining('Live Event'),
      expect.stringContaining('Two Day Event'),
    ])
    expect(screen.queryByRole('heading', { name: 'Upcoming' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Past' })).toBeInTheDocument()
  })

  it('puts a LIVE badge on a live event, after its organizer as on the event page', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    const live = await screen.findByRole('button', { name: /Live Event/ })
    expect(within(live).getByText('Live Club').nextElementSibling).toHaveTextContent(/^Live$/)
    const upcoming = screen.getByRole('button', { name: /Two Day Event/ })
    expect(within(upcoming).queryByText('Live')).not.toBeInTheDocument()
  })
})

describe('the More tab: Share, the iOS widget and the build date (#395, #416)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '#/more'
    vi.stubGlobal('fetch', vi.fn(async () =>
      new Response(JSON.stringify({ events: [twoDay] }), { headers: { 'Content-Type': 'application/json' } }),
    ))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('opens About, Share and the iOS widget from a list under the tiles', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    expect(within(screen.getByRole('list', { name: 'More' })).getAllByRole('link').map(l => l.textContent)).toEqual(['Instructor evaluations', 'Garage'])
    const links = screen.getByRole('list', { name: 'About, Share and iOS widget' })
    // About first (#455).
    expect(within(links).getAllByRole('link').map(l => l.textContent)).toEqual(['About', 'Share', 'iOS widget'])
    // The menu that held them beside the account button is gone.
    expect(screen.queryByRole('button', { name: 'Menu' })).not.toBeInTheDocument()

    await userEvent.click(within(links).getByRole('link', { name: 'Share' }))
    await waitFor(() => expect(window.location.hash).toBe('#/share'))
    const share = await screen.findByRole('dialog', { name: 'Share this app' })
    expect(within(share).getByRole('button', { name: 'Copy link' })).toHaveTextContent('https://myhpde.netlify.app/')
    // A sheet over the More tab, which stays put underneath (#411).
    expect(screen.getByRole('heading', { level: 1, name: 'More' })).toBeInTheDocument()
    await userEvent.click(within(share).getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(window.location.hash).toBe('#/more'))

    await userEvent.click(within(screen.getByRole('list', { name: 'About, Share and iOS widget' })).getByRole('link', { name: 'iOS widget' }))
    await waitFor(() => expect(window.location.hash).toBe('#/widget-setup'))
    expect(await screen.findByRole('heading', { level: 1, name: 'iOS widget' })).toBeInTheDocument()
  })

  it('About says what the app is for, then a headline for each feature, and closes back to More (#455)', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    await userEvent.click(within(screen.getByRole('list', { name: 'About, Share and iOS widget' })).getByRole('link', { name: 'About' }))
    await waitFor(() => expect(window.location.hash).toBe('#/about'))
    expect(await screen.findByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument()
    expect(screen.getByText('Your track days, in one place')).toBeInTheDocument()
    const about = screen.getByRole('heading', { level: 1, name: 'About' }).closest<HTMLElement>('.fixed')!
    expect(within(about).getAllByRole('heading', { level: 2 }).map(h => h.textContent)).toEqual([
      'See what’s on track now.',
      'Paste your laps. See your best.',
      'See how you’re improving.',
      'Your car’s setup, event by event.',
      'Share a car, and its history.',
      'What’s next, without opening the app.',
    ])
    // Sharing a car is sharing its history, not entering it twice.
    expect(within(screen.getByRole('region', { name: 'Share a car, and its history.' })).getByText(/same change log/)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('link', { name: 'Close' }))
    await waitFor(() => expect(window.location.hash).toBe('#/more'))
  })

  it('shows the build date on the More tab, not under the events list', async () => {
    render(<EventsProvider><App /></EventsProvider>)
    expect(screen.getByText(/^build /)).toBeInTheDocument()

    window.location.hash = '#/'
    expect(await screen.findByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInTheDocument()
    await screen.findByRole('button', { name: /Two Day Event/ })
    expect(screen.queryByText(/^build /)).not.toBeInTheDocument()
  })

  it('still switches between list and calendar', async () => {
    window.location.hash = '#/'
    render(<EventsProvider><App /></EventsProvider>)
    await screen.findByRole('button', { name: /Two Day Event/ })
    await userEvent.click(screen.getByRole('button', { name: 'Calendar view' }))
    expect(screen.queryByRole('heading', { name: 'Past' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(screen.getByRole('heading', { name: 'Past' })).toBeInTheDocument()
  })
})
