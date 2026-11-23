import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { EventsProvider } from './data/EventsContext'
import { FIXTURE_EVENTS } from './data'
import { TEST_EVENTS as EVENTS } from './test/events'
import { parseScheduleMD } from './utils/parseSchedule'

function renderApp() {
  return render(<EventsProvider initialEvents={EVENTS}><App /></EventsProvider>)
}

function gotoEvent(eventId: string) {
  window.location.hash = `#/event/${encodeURIComponent(eventId)}`
}

function tab(name: string) {
  return screen.getByRole('tab', { name })
}

describe('event page tab selection (#219)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = ''
  })

  it('resets to Schedule when you switch to another event', async () => {
    const [first, second] = EVENTS
    gotoEvent(first.id)
    renderApp()

    await userEvent.click(tab('My notes'))
    expect(tab('My notes')).toHaveAttribute('aria-selected', 'true')

    // Back to the event list, then open a different event.
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    await waitFor(() => expect(window.location.hash).toBe('#/'))
    await userEvent.click(screen.getByRole('button', { name: new RegExp(second.name) }))

    await waitFor(() => {
      expect(tab('Schedule')).toHaveAttribute('aria-selected', 'true')
    })
    expect(tab('My notes')).toHaveAttribute('aria-selected', 'false')
  })

  it('keeps the selected tab across a reload (what pull-to-refresh does)', async () => {
    gotoEvent(EVENTS[0].id)
    renderApp()

    await userEvent.click(tab('My notes'))
    expect(tab('My notes')).toHaveAttribute('aria-selected', 'true')

    // A reload remounts the app from scratch with the same URL; only
    // persisted state survives.
    cleanup()
    renderApp()

    expect(tab('My notes')).toHaveAttribute('aria-selected', 'true')
  })
})

describe('event page header (#216)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = ''
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('goes back to the event list from the back chevron', async () => {
    gotoEvent(EVENTS[0].id)
    renderApp()
    await userEvent.click(screen.getByRole('button', { name: 'Back' }))
    expect(window.location.hash).toBe('#/')
  })

  it('marks a past event with a PAST badge instead of a banner', () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2100-01-01T12:00:00'))
    gotoEvent(EVENTS[0].id)
    renderApp()
    const heading = screen.getByRole('heading', { level: 1, name: EVENTS[0].name })
    // On the date line, under the name — the track follows on its own line (#305).
    expect(heading.nextElementSibling).toHaveTextContent(/Past$/)
    expect(screen.queryByText('This event has passed.')).not.toBeInTheDocument()
  })

  it('leads with the big date, and the track second (#305)', () => {
    gotoEvent(EVENTS[0].id)
    renderApp()
    const heading = screen.getByRole('heading', { level: 1, name: EVENTS[0].name })
    const titleRow = heading.parentElement!.parentElement!
    const [y, m, d] = EVENTS[0].days[0].date.split('-').map(Number)
    const month = new Date(2000, m - 1, 1).toLocaleDateString('en-US', { month: 'short' })
    // Month over day (and the year, once it isn't this year), ahead of the
    // name; the track's layout after the date line.
    expect(titleRow).toHaveTextContent(new RegExp(`^${month}${d}(${y})?${EVENTS[0].name}`))
    expect(titleRow).toHaveTextContent(/MSRC 2\.0 CW$/)
    expect(titleRow.querySelector('[data-track-icon]')).not.toBeNull()
  })

  it('shows a LIVE badge on the date line of a live event', () => {
    // test-live's single day is always today.
    gotoEvent('test-live')
    renderApp()
    const heading = screen.getByRole('heading', { level: 1, name: FIXTURE_EVENTS.find(e => e.id === 'test-live')!.name })
    expect(heading).not.toHaveTextContent(/Live/)
    expect(heading.nextElementSibling).toHaveTextContent(/Live$/)
  })

  it('labels the info tab "Details"', () => {
    gotoEvent(EVENTS[0].id)
    renderApp()
    expect(screen.getByRole('tab', { name: 'Details' })).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: 'Info' })).not.toBeInTheDocument()
  })
})

describe('the schedule opens on today’s day (#470)', () => {
  // A weekend event: Saturday then Sunday.
  const WEEKEND = parseScheduleMD('weekend-470', `# Weekend HPDE

- organizer: Test Club
- track: Alpha Raceway
- trackId: msrc-1-7

## groups
red | Red | bg-red-500 | text-white

## Saturday | 2026-11-21
08:00 session 1 | track: red
17:00 session 2 | track: red

## Sunday | 2026-11-22
08:00 session 1 | track: red
17:00 session 2 | track: red
`)

  function renderWeekend() {
    return render(<EventsProvider initialEvents={[WEEKEND, ...EVENTS]}><App /></EventsProvider>)
  }
  function dayTab(name: string) {
    return screen.getByRole('button', { name })
  }
  const selected = (el: HTMLElement) => el.className.includes('bg-gray-900')

  beforeEach(() => {
    localStorage.clear()
    window.location.hash = ''
    vi.useFakeTimers({ toFake: ['Date'] })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('opens on Sunday on Sunday, though Saturday was showing on Saturday', async () => {
    // Saturday: open the event from the list — it opens on Saturday.
    vi.setSystemTime(new Date('2026-11-21T10:00:00'))
    renderWeekend()
    await userEvent.click(await screen.findByRole('button', { name: /Weekend HPDE/ }))
    await waitFor(() => expect(selected(dayTab('Saturday'))).toBe(true))

    // Sunday: open the app straight onto the event (a reload, or the Home
    // Screen) — Sunday's tab, with the now-line on it.
    cleanup()
    vi.setSystemTime(new Date('2026-11-22T10:00:00'))
    renderWeekend()
    expect(selected(dayTab('Sunday'))).toBe(true)
    expect(document.querySelectorAll('[data-time-indicator]')).toHaveLength(1)
  })

  it('keeps a day picked by hand through a reload the same day', async () => {
    vi.setSystemTime(new Date('2026-11-22T10:00:00'))
    gotoEvent(WEEKEND.id)
    renderWeekend()
    expect(selected(dayTab('Sunday'))).toBe(true)
    await userEvent.click(dayTab('Saturday'))
    expect(selected(dayTab('Saturday'))).toBe(true)
    // No now-line on a day that isn't today.
    expect(document.querySelectorAll('[data-time-indicator]')).toHaveLength(0)

    cleanup()
    renderWeekend()
    expect(selected(dayTab('Saturday'))).toBe(true)
  })

  it('ignores a day stored before #470 (an id with no date)', () => {
    vi.setSystemTime(new Date('2026-11-22T10:00:00'))
    localStorage.setItem('hpde:activeEvent', JSON.stringify(WEEKEND.id))
    localStorage.setItem('hpde:activeDay', JSON.stringify(WEEKEND.days[0].id))
    gotoEvent(WEEKEND.id)
    renderWeekend()
    expect(selected(dayTab('Sunday'))).toBe(true)
  })

  it('moves to the new day when a page left open overnight comes back', async () => {
    vi.setSystemTime(new Date('2026-11-21T22:00:00'))
    gotoEvent(WEEKEND.id)
    renderWeekend()
    expect(selected(dayTab('Saturday'))).toBe(true)

    // The phone sleeps; the page is frozen, not reloaded.
    vi.setSystemTime(new Date('2026-11-22T07:30:00'))
    act(() => {
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(selected(dayTab('Sunday'))).toBe(true)
    expect(document.querySelectorAll('[data-time-indicator]')).toHaveLength(1)
  })
})
