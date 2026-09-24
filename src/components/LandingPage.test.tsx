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

describe('landing menu and footer (#273)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '#/'
    vi.stubGlobal('fetch', vi.fn(async () =>
      new Response(JSON.stringify({ events: [twoDay] }), { headers: { 'Content-Type': 'application/json' } }),
    ))
  })
  afterEach(() => vi.unstubAllGlobals())

  it('opens Share and the iOS widget from the menu sheet', async () => {
    render(<EventsProvider><App /></EventsProvider>)

    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    const sheet = screen.getByRole('dialog', { name: 'Menu' })
    expect(within(sheet).getAllByRole('link').map(l => l.textContent)).toEqual(['Share', 'Get iOS widget'])

    await userEvent.click(within(sheet).getByRole('link', { name: 'Share' }))
    await waitFor(() => expect(window.location.hash).toBe('#/share'))
    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument()
    expect(await screen.findByText('https://myhpde.netlify.app/')).toBeInTheDocument()
    // Slid in over the landing page, which stays put underneath.
    expect(screen.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeInTheDocument()

    window.location.hash = '#/'
    await userEvent.click(await screen.findByRole('button', { name: 'Menu' }))
    await userEvent.click(screen.getByRole('link', { name: 'Get iOS widget' }))
    await waitFor(() => expect(window.location.hash).toBe('#/widget-setup'))
    expect(await screen.findByRole('heading', { level: 1, name: 'iOS widget' })).toBeInTheDocument()
  })

  it('closes the menu sheet on Escape', async () => {
    render(<EventsProvider><App /></EventsProvider>)
    await userEvent.click(screen.getByRole('button', { name: 'Menu' }))
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument()
  })

  it('still switches between list and calendar', async () => {
    render(<EventsProvider><App /></EventsProvider>)
    await screen.findByRole('button', { name: /Two Day Event/ })
    await userEvent.click(screen.getByRole('button', { name: 'Calendar view' }))
    expect(screen.queryByRole('heading', { name: 'Upcoming' })).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(screen.getByRole('heading', { name: 'Upcoming' })).toBeInTheDocument()
  })

  it('shows the footer — just the build date — on the landing page only', async () => {
    render(<EventsProvider><App /></EventsProvider>)
    expect(screen.getByText(/^build /)).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Share' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'iOS widget' })).not.toBeInTheDocument()

    await userEvent.click(await screen.findByRole('button', { name: /Two Day Event/ }))
    await waitFor(() => expect(window.location.hash).toBe(`#/event/${twoDay.id}`))
    const eventPage = screen.getByRole('heading', { level: 1, name: twoDay.name }).closest('.fixed') as HTMLElement
    expect(within(eventPage).queryByText(/^build /)).not.toBeInTheDocument()
  })
})
