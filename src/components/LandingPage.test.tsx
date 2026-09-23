import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import App from '../App'
import { EventsProvider } from '../data/EventsContext'
import type { EventConfig } from '../types'

const day = (id: string, date: string) => ({ id, label: id, date, activities: [] })

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

describe('landing event cards (#243)', () => {
  beforeEach(() => {
    localStorage.clear()
    window.location.hash = '#/'
    vi.stubGlobal('fetch', vi.fn(async () =>
      new Response(JSON.stringify({ events: [twoDay, noOrganizer] }), { headers: { 'Content-Type': 'application/json' } }),
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
})
