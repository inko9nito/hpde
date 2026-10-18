import { describe, it, expect } from 'vitest'
import { layoutNotes } from './LayoutNotes'
import type { EventConfig } from '../types'

const at = (id: string, ...dates: string[]): EventConfig => ({
  id, name: id, runGroups: [],
  days: dates.map((date, i) => ({ id: `d${i}`, label: 'Day', date, activities: [] })),
})
const session = (date: string, time: string, sessionNumber: number) =>
  ({ key: `${date} ${time} blue`, date, time, group: 'blue', sessionNumber })

describe('a layout’s notes, from each event on it (#462)', () => {
  const nov = at('nov', '2025-11-07', '2025-11-08')
  const oct = at('oct', '2024-11-02')
  const bare = at('bare', '2023-09-23')
  const s1 = session('2025-11-07', '09:00', 1)
  const s4 = session('2025-11-08', '10:20', 4)
  const notes = [
    {
      eventId: 'nov',
      evaluation: { instructor: 'Dan', notes: 'Carry more speed into T5.' },
      conditions: { note: 'Cold track till ten.' },
      sessions: [
        // Conditions only: summed up for the day, not a session of its own.
        { ...s1, conditions: { surface: 'damp' as const, sky: 'sunny' as const, airF: 58 } },
        { ...s4, evaluation: { feedback: 'Look through T7.', instructor: 'Dan' }, conditions: { surface: 'dry' as const, sky: 'sunny' as const, airF: 71 } },
      ],
    },
    { eventId: 'bare', sessions: [] },
  ]
  const setups = {
    nov: { sessions: { [s1.key]: { ...s1, cold: { fl: 30 }, hot: { fl: 36 } } } },
    oct: { carId: 'car1', sessions: { [session('2024-11-02', '09:00', 1).key]: { ...session('2024-11-02', '09:00', 1), note: 'Bled 2 psi' } } },
  }

  it('lists each event with notes, newest first: its conditions, evaluation, and each session’s feedback and pressures', () => {
    const noted = layoutNotes([oct, bare, nov], notes, setups)
    expect(noted.map(n => n.event.id)).toEqual(['nov', 'oct'])
    const [first, second] = noted
    expect(first.conditions).toEqual({ line: 'Damp → Dry · Sunny · 58–71°F', sky: 'sunny' })
    expect(first.conditionsNote).toBe('Cold track till ten.')
    expect(first.evaluation?.notes).toBe('Carry more speed into T5.')
    expect(first.groups).toEqual(['blue'])
    // In schedule order: Friday's pressures, then Sunday's feedback.
    expect(first.sessions.map(s => [s.session.sessionNumber, !!s.evaluation, !!s.pressures])).toEqual([[1, false, true], [4, true, false]])
    // Tire pressures alone are notes too.
    expect(second.sessions.map(s => s.pressures?.note)).toEqual(['Bled 2 psi'])
    expect(second.evaluation).toBeUndefined()
  })

  it('has nothing for events with nothing saved', () => {
    expect(layoutNotes([bare], notes, {})).toEqual([])
    expect(layoutNotes([], notes, setups)).toEqual([])
  })
})
