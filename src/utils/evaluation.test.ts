import { describe, it, expect } from 'vitest'
import { cleanEventEvaluation, cleanSessionEvaluation, isTdeEvent } from './evaluation'

describe('isTdeEvent (#340)', () => {
  it('knows The Drivers Edge’s events by organizer, or by name when there’s none', () => {
    expect(isTdeEvent({ name: 'Track day', organizer: 'The Drivers Edge' })).toBe(true)
    expect(isTdeEvent({ name: 'Track day', organizer: "The Driver's Edge" })).toBe(true)
    expect(isTdeEvent({ name: 'TDE at MSRC 1.7 Fast Track' })).toBe(true)
    expect(isTdeEvent({ name: 'SCCA at MSRC 1.7 CW', organizer: 'Texas Region SCCA' })).toBe(false)
    expect(isTdeEvent({ name: 'TDEX Day' })).toBe(false)
  })
})

describe('cleanSessionEvaluation (#340)', () => {
  it('keeps the feedback, and the instructor when there is one, trimmed', () => {
    expect(cleanSessionEvaluation({ feedback: '  Eyes up. ', instructor: ' ' })).toEqual({ value: { feedback: 'Eyes up.' } })
    expect(cleanSessionEvaluation({ feedback: 'Eyes up.', instructor: 'John' })).toEqual({ value: { feedback: 'Eyes up.', instructor: 'John' } })
  })

  it('needs feedback, as text, not too long', () => {
    expect(cleanSessionEvaluation({})).toHaveProperty('error')
    expect(cleanSessionEvaluation({ feedback: 3 })).toHaveProperty('error')
    expect(cleanSessionEvaluation({ feedback: 'x'.repeat(2001) })).toHaveProperty('error')
  })
})

describe('cleanEventEvaluation (#340)', () => {
  it('keeps only what’s filled in, with scores rounded', () => {
    expect(cleanEventEvaluation({
      instructor: 'John', car: '', next: { sameTrack: 'Blue', newDirection: '' },
      skills: { flags: 64.6, vision: undefined, bogus: 50 }, carAidsPct: 0, notes: ' ',
    })).toEqual({ value: { instructor: 'John', next: { sameTrack: 'Blue' }, skills: { flags: 65 }, carAidsPct: 0 } })
  })

  it('refuses an empty card, scores that aren’t percentages and a yes/no that isn’t', () => {
    expect(cleanEventEvaluation({})).toHaveProperty('error')
    expect(cleanEventEvaluation({ skills: { flags: 101 } })).toHaveProperty('error')
    expect(cleanEventEvaluation({ skills: { flags: '65' } })).toHaveProperty('error')
    expect(cleanEventEvaluation({ carAidsPct: -1 })).toHaveProperty('error')
    expect(cleanEventEvaluation({ aggressivenessIsSkill: 'yes' })).toHaveProperty('error')
    expect(cleanEventEvaluation({ aggressivenessIsSkill: false })).toEqual({ value: { aggressivenessIsSkill: false } })
  })
})
