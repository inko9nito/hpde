import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, cleanup, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { EVENTS } from './data'

function gotoEvent(eventId: string) {
  window.location.hash = `#/event/${encodeURIComponent(eventId)}`
}

/** The pushed event page. Scoped off its tablist so queries don't reach
 *  the landing page, which stays mounted behind it. */
function eventPage() {
  return screen.getByRole('tablist', { name: 'Event section' }).closest('.max-w-lg') as HTMLElement
}

/** The event page's header picker button, and an event's row inside the
 *  dropdown it opens. */
function pickerButton() {
  return within(eventPage()).getByRole('heading', { level: 1 }).closest('button')!
}

function pickerRow(name: string) {
  return within(eventPage()).getByRole('button', { name: new RegExp(name) })
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
    render(<App />)

    await userEvent.click(tab('My notes'))
    expect(tab('My notes')).toHaveAttribute('aria-selected', 'true')

    // Open the event picker and pick a different event.
    await userEvent.click(pickerButton())
    await userEvent.click(pickerRow(second.name))

    await waitFor(() => {
      expect(tab('Schedule')).toHaveAttribute('aria-selected', 'true')
    })
    expect(tab('My notes')).toHaveAttribute('aria-selected', 'false')
  })

  it('keeps the selected tab across a reload (what pull-to-refresh does)', async () => {
    gotoEvent(EVENTS[0].id)
    render(<App />)

    await userEvent.click(tab('My notes'))
    expect(tab('My notes')).toHaveAttribute('aria-selected', 'true')

    // A reload remounts the app from scratch with the same URL; only
    // persisted state survives.
    cleanup()
    render(<App />)

    expect(tab('My notes')).toHaveAttribute('aria-selected', 'true')
  })
})
