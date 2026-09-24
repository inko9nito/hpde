import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { EventsProvider } from './data/EventsContext'
import { FIXTURE_EVENTS } from './data'
import { TEST_EVENTS as EVENTS } from './test/events'

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
    const titleBlock = heading.parentElement!
    expect(titleBlock).toHaveTextContent(/Past$/)
    expect(screen.queryByText('This event has passed.')).not.toBeInTheDocument()
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
