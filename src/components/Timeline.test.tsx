import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Timeline } from './Timeline'
import type { ScheduleEvent, RunGroupConfig } from '../types'
import * as timeModule from '../utils/time'

vi.mock('../utils/time', async importOriginal => {
  const real = await importOriginal<typeof import('../utils/time')>()
  return { ...real, nowMinutes: vi.fn(() => 600), nowDisplay: vi.fn(() => '10:00 AM') }
})

const runGroups: RunGroupConfig[] = [
  { id: 'orange', label: 'Orange', bgClass: 'bg-orange-500', textClass: 'text-white' },
  { id: 'pink',   label: 'Pink',   bgClass: 'bg-pink-500',   textClass: 'text-white' },
  { id: 'purple', label: 'Purple', bgClass: 'bg-purple-500', textClass: 'text-white' },
]

// now = 10:00 (600 min); events at 08:xx are past, 10:30+ are future
const events: ScheduleEvent[] = [
  { time: '08:00', type: 'general', label: 'Drivers meeting' },
  { time: '08:30', type: 'session', onTrack: ['orange'] },
  { time: '09:00', type: 'session', onTrack: ['pink'] },
  { time: '10:30', type: 'session', onTrack: ['orange'] },
  { time: '11:00', type: 'general', label: 'Lunch' },
]

beforeEach(() => {
  vi.mocked(timeModule.nowMinutes).mockReturnValue(600)
  vi.mocked(timeModule.nowDisplay).mockReturnValue('10:00 AM')
})

describe('hidePast toggle', () => {
  it('shows all events when hidePast is false', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={true} selectedGroups={[]} hidePast={false} />)
    expect(screen.getByText('Drivers meeting')).toBeInTheDocument()
    expect(screen.getByText('Lunch')).toBeInTheDocument()
  })

  it('hides events before current time when hidePast is true', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={true} selectedGroups={[]} hidePast={true} />)
    expect(screen.queryByText('Drivers meeting')).not.toBeInTheDocument()
    expect(screen.getByText('Lunch')).toBeInTheDocument()
  })

  it('shows all events when hidePast is true but isToday is false', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={false} selectedGroups={[]} hidePast={true} />)
    expect(screen.getByText('Drivers meeting')).toBeInTheDocument()
  })
})

describe('past event opacity', () => {
  it('applies opacity-40 to cards before current time on today', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={true} selectedGroups={[]} hidePast={false} />)
    const cards = document.querySelectorAll('.rounded-xl')
    const pastCards = Array.from(cards).filter(el => el.classList.contains('opacity-40'))
    const futureCards = Array.from(cards).filter(el => !el.classList.contains('opacity-40'))
    // 08:30 and 09:00 sessions are past; 10:30 session is future
    expect(pastCards.length).toBeGreaterThan(0)
    expect(futureCards.length).toBeGreaterThan(0)
  })

  it('does not apply opacity-40 when isToday is false', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={false} selectedGroups={[]} hidePast={false} />)
    expect(document.querySelectorAll('.opacity-40')).toHaveLength(0)
  })
})

describe('run group filter', () => {
  it('shows all sessions when no groups selected', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={false} selectedGroups={[]} hidePast={false} />)
    expect(screen.getAllByText('Orange')).toHaveLength(2)
    expect(screen.getByText('Pink')).toBeInTheDocument()
  })

  it('hides sessions not matching the selected group', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={false} selectedGroups={['orange']} hidePast={false} />)
    expect(screen.getAllByText('Orange')).toHaveLength(2)
    expect(screen.queryByText('Pink')).not.toBeInTheDocument()
  })

  it('always shows general events regardless of group filter', () => {
    render(<Timeline events={events} runGroups={runGroups} isToday={false} selectedGroups={['orange']} hidePast={false} />)
    expect(screen.getByText('Drivers meeting')).toBeInTheDocument()
    expect(screen.getByText('Lunch')).toBeInTheDocument()
  })
})

describe('break events', () => {
  it('renders a break label between sessions', () => {
    const withBreak: ScheduleEvent[] = [
      { time: '09:15', type: 'session', onTrack: ['purple'] },
      { type: 'break', label: 'Instructor break' },
      { time: '09:50', type: 'session', onTrack: ['orange'] },
    ]
    render(<Timeline events={withBreak} runGroups={runGroups} isToday={false} selectedGroups={[]} hidePast={false} />)
    expect(screen.getByText('Instructor break')).toBeInTheDocument()
  })

  it('hides an orphaned break when hidePast removes all preceding events', () => {
    const withBreak: ScheduleEvent[] = [
      { time: '08:00', type: 'session', onTrack: ['purple'] },
      { type: 'break', label: 'Instructor break' },
      { time: '10:30', type: 'session', onTrack: ['orange'] },
    ]
    render(<Timeline events={withBreak} runGroups={runGroups} isToday={true} selectedGroups={[]} hidePast={true} />)
    // 08:00 is past (now=10:00), so the break is orphaned and should be hidden
    expect(screen.queryByText('Instructor break')).not.toBeInTheDocument()
  })
})

describe('session number headers', () => {
  it('renders a Session N header when sessionNumber is set', () => {
    const withSession: ScheduleEvent[] = [
      { time: '09:50', type: 'session', sessionNumber: 1, onTrack: ['orange'] },
      { time: '11:45', type: 'session', sessionNumber: 2, onTrack: ['orange'] },
    ]
    render(<Timeline events={withSession} runGroups={runGroups} isToday={false} selectedGroups={[]} hidePast={false} />)
    expect(screen.getByText('Session 1')).toBeInTheDocument()
    expect(screen.getByText('Session 2')).toBeInTheDocument()
  })

  it('does not repeat a session header for the same sessionNumber', () => {
    const repeated: ScheduleEvent[] = [
      { time: '09:50', type: 'session', sessionNumber: 1, onTrack: ['orange'] },
      { time: '10:00', type: 'session', sessionNumber: 1, onTrack: ['pink'] },
    ]
    render(<Timeline events={repeated} runGroups={runGroups} isToday={false} selectedGroups={[]} hidePast={false} />)
    expect(screen.getAllByText('Session 1')).toHaveLength(1)
  })
})
