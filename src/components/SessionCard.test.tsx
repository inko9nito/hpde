import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { SessionCard } from './SessionCard'
import type { SessionEvent, RunGroupConfig, SessionLog } from '../types'

const runGroups: RunGroupConfig[] = [
  { id: 'green', label: 'Green', bgClass: 'bg-green-500', textClass: 'text-white' },
]

const event: SessionEvent = { time: '08:50', type: 'session', sessionNumber: 1, onTrack: ['green'] }

describe('SessionCard', () => {
  it('renders with no expand affordance when there is no log', () => {
    render(<SessionCard event={event} runGroups={runGroups} />)
    expect(screen.queryByLabelText(/session details/i)).not.toBeInTheDocument()
  })

  it('renders nothing extra for a log with no content', () => {
    const emptyLog: SessionLog = { sessionNumber: 1 }
    render(<SessionCard event={event} runGroups={runGroups} log={emptyLog} />)
    expect(screen.queryByLabelText(/session details/i)).not.toBeInTheDocument()
  })

  it('shows an expand button when the log has notes, and reveals them on click', () => {
    const log: SessionLog = { sessionNumber: 1, notes: 'Great session, car felt planted.' }
    render(<SessionCard event={event} runGroups={runGroups} log={log} />)

    expect(screen.queryByText('Great session, car felt planted.')).not.toBeInTheDocument()
    fireEvent.click(screen.getByLabelText(/show session details/i))
    expect(screen.getByText('Great session, car felt planted.')).toBeInTheDocument()
  })

  it('renders tire pressures when present', () => {
    const log: SessionLog = {
      sessionNumber: 1,
      tirePressures: { cold: { fl: 32, fr: 32, rl: 30, rr: 30 }, hot: { fl: 38, fr: 37, rl: 34, rr: 33 } },
    }
    render(<SessionCard event={event} runGroups={runGroups} log={log} />)
    fireEvent.click(screen.getByLabelText(/show session details/i))
    const flCorner = screen.getByText('FL').closest('div')
    expect(flCorner).toHaveTextContent('32')
    expect(flCorner).toHaveTextContent('38')
  })

  it('renders the structured instructor evaluation when present', () => {
    const log: SessionLog = {
      sessionNumber: 1,
      instructorEval: { instructor: 'John Harms', student: 'Vera Maxakova', skills: { passing: 95 } },
    }
    render(<SessionCard event={event} runGroups={runGroups} log={log} />)
    fireEvent.click(screen.getByLabelText(/show session details/i))
    expect(screen.getByText('John Harms')).toBeInTheDocument()
    expect(screen.getByText('Vera Maxakova')).toBeInTheDocument()
    expect(screen.getByText('95%')).toBeInTheDocument()
  })

  it('renders media links when present', () => {
    const log: SessionLog = {
      sessionNumber: 1,
      media: [{ kind: 'video', label: 'Onboard lap', url: 'https://example.com/video' }],
    }
    render(<SessionCard event={event} runGroups={runGroups} log={log} />)
    fireEvent.click(screen.getByLabelText(/show session details/i))
    const link = screen.getByText('Onboard lap').closest('a')
    expect(link).toHaveAttribute('href', 'https://example.com/video')
  })
})
