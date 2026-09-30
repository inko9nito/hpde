import { describe, it, expect } from 'vitest'
import { unevaluatedEvents } from './EvaluationsPage'
import type { EventConfig } from '../types'

const at = (id: string, ...dates: string[]): EventConfig => ({
  id, name: id, runGroups: [],
  days: dates.map((date, i) => ({ id: `d${i}`, label: 'Day', date, activities: [] })),
})

describe('events they went to with no evaluation yet (#345)', () => {
  const today = '2026-09-30'
  const events = [
    at('drove', '2026-06-01'),
    at('laps', '2026-05-01'),
    at('maybe', '2026-04-01'),
    at('not-going', '2026-03-01'),
    at('evaluated', '2026-07-01'),
    at('today', '2026-09-30'),
    at('next-month', '2026-10-20'),
    at('no-days'),
  ]
  const rsvps = {
    drove: { status: 'going' as const },
    maybe: { status: 'maybe' as const },
    'not-going': { status: 'not-going' as const },
    evaluated: { status: 'going' as const },
    today: { status: 'going' as const },
    'next-month': { status: 'going' as const },
    'no-days': { status: 'going' as const },
  }

  it('takes the begun ones they said they drove or have laps at, newest first, leaving out the evaluated', () => {
    expect(unevaluatedEvents(events, rsvps, new Set(['laps']), new Set(['evaluated']), today).map(e => e.id))
      .toEqual(['today', 'drove', 'laps'])
  })

  it('counts laps even when they said they weren’t going', () => {
    expect(unevaluatedEvents(events, rsvps, new Set(['not-going']), new Set(), today).map(e => e.id))
      .toEqual(['today', 'evaluated', 'drove', 'not-going'])
  })
})
