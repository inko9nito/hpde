import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EventInfo } from './EventInfo'
import type { EventConfig } from '../types'

const event: EventConfig = {
  id: '2026-03-07_alpha',
  name: 'Alpha Track Day',
  mapImage: '/map.png',
  runGroups: [],
  days: [{ id: 'saturday', label: 'Saturday', date: '2026-03-07', activities: [] }],
}

describe('EventInfo track map (#259)', () => {
  it('opens full screen over the page, not inside it', async () => {
    const { container } = render(<EventInfo event={event} />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand track map' }))
    const dialog = screen.getByRole('dialog', { name: 'Alpha Track Day track map' })
    // Portalled to <body>: a `fixed` overlay inside the event page's
    // transformed wrappers would be pinned to the page, not the screen.
    expect(container).not.toContainElement(dialog)
    expect(dialog.parentElement).toBe(document.body)
    expect(dialog).toHaveClass('touch-none')
    expect(screen.getByRole('button', { name: 'Close map' })).toHaveFocus()
  })

  it('closes with the close button, back on the map it opened from', async () => {
    render(<EventInfo event={event} />)
    const expand = screen.getByRole('button', { name: 'Expand track map' })
    await userEvent.click(expand)
    await userEvent.click(screen.getByRole('button', { name: 'Close map' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(expand).toHaveFocus()
  })

  it('closes with Escape', async () => {
    render(<EventInfo event={event} />)
    await userEvent.click(screen.getByRole('button', { name: 'Expand track map' }))
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
