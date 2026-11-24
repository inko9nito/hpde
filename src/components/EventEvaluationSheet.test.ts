import { describe, it, expect } from 'vitest'
import { draftFrom, fillDraft } from './EventEvaluationSheet'

describe('fillDraft (#483)', () => {
  const typed = draftFrom({
    instructor: 'Sam Ortiz',
    car: 'Miata',
    next: { sameTrack: 'Blue', newTrack: 'Green' },
    nextHow: { sameTrack: 'partTime' },
    skills: { flags: 50, exits: 40 },
    notes: 'Typed in first.',
  }, 'blue')

  it('fills in what was read, on the card it was read off, and leaves the rest', () => {
    const filled = fillDraft(typed, {
      card: 'green',
      instructor: 'John Harms',
      next: { sameTrack: 'Green' },
      skills: { flags: 65 },
      aggressivenessIsSkill: true,
      carAidsPct: 25,
    })
    expect(filled.card).toBe('green')
    expect(filled.instructor).toBe('John Harms')
    expect(filled.car).toBe('Miata')
    // A group read comes without the how typed in for another.
    expect(filled.next).toEqual({ sameTrack: 'Green', newDirection: '', newTrack: 'Green' })
    expect(filled.nextHow.sameTrack).toBe('')
    expect(filled.skills.flags).toBe('65')
    expect(filled.skills.exits).toBe('40')
    expect(filled.aggressivenessIsSkill).toBe(true)
    expect(filled.carAidsPct).toBe('25')
    expect(filled.notes).toBe('Typed in first.')
  })

  it('keeps the card picked when the screenshot doesn’t say which', () => {
    expect(fillDraft(typed, { instructor: 'John Harms' }).card).toBe('blue')
  })
})
