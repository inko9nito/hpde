import { describe, it, expect } from 'vitest'
import { aggressivenessText, carAidsText, cardById, cardForGroup, cleanEventEvaluation, cleanSessionEvaluation, isTdeEvent } from './evaluation'

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

describe('each run group’s report card (#350)', () => {
  it('knows a group’s card by its name, if the app has it', () => {
    expect(cardForGroup('Blue')?.id).toBe('blue')
    expect(cardForGroup('Blue PT Solo')?.id).toBe('blue')
    expect(cardForGroup('green')?.id).toBe('green')
    expect(cardForGroup('Orange')).toBeUndefined()
    expect(cardForGroup('Bluebonnet')).toBeUndefined()
    expect(cardForGroup(null)).toBeUndefined()
    // None said: Green's, as every evaluation from before.
    expect(cardById(undefined).id).toBe('green')
  })

  it('keeps a Blue card’s own skills and fields, and says it’s Blue’s', () => {
    expect(cleanEventEvaluation({
      card: 'blue', instructor: 'Tom Albertson', instructed: 'fullTime', car: 'Porsche Cayman GTS', escTc: 'Comp Mode',
      next: { sameTrack: 'Blue', newDirection: 'Blue', newTrack: 'Blue' },
      nextHow: { sameTrack: 'fullTime', newDirection: '', newTrack: 'partTime' },
      nextOr: { sameTrack: '', newTrack: 'Yellow' },
      skills: { flags: 65, exits: 80, offline: 95, vision: 50 },
      aggressivenessIsSkill: 'tooAggressive', carAidsPct: 0, soloQualified: false,
    })).toEqual({
      value: {
        card: 'blue', instructor: 'Tom Albertson', instructed: 'fullTime', car: 'Porsche Cayman GTS', escTc: 'Comp Mode',
        next: { sameTrack: 'Blue', newDirection: 'Blue', newTrack: 'Blue' },
        nextHow: { sameTrack: 'fullTime', newTrack: 'partTime' },
        nextOr: { newTrack: 'Yellow' },
        // Green's Vision isn't on Blue's card.
        skills: { flags: 65, exits: 80, offline: 95 },
        aggressivenessIsSkill: 'tooAggressive', carAidsPct: 0, soloQualified: false,
      },
    })
  })

  it('leaves out what Green’s card doesn’t have, and refuses what it can’t say', () => {
    expect(cleanEventEvaluation({
      card: 'green', instructed: 'partTime', escTc: 'On', soloQualified: true,
      next: { sameTrack: 'Blue' }, nextHow: { sameTrack: 'solo' }, nextOr: { sameTrack: 'Yellow' },
      skills: { flags: 70, offline: 90 },
    })).toEqual({ value: { next: { sameTrack: 'Blue' }, skills: { flags: 70 } } })
    expect(cleanEventEvaluation({ aggressivenessIsSkill: 'tooAggressive' })).toHaveProperty('error')
    expect(cleanEventEvaluation({ card: 'orange', instructor: 'Lee' })).toHaveProperty('error')
    expect(cleanEventEvaluation({ card: 'blue', instructed: 'sometimes' })).toHaveProperty('error')
    expect(cleanEventEvaluation({ card: 'blue', next: { sameTrack: 'Blue' }, nextHow: { sameTrack: 'always' } })).toHaveProperty('error')
    // A card alone is nothing filled in.
    expect(cleanEventEvaluation({ card: 'blue' })).toHaveProperty('error')
  })

  it('says each card’s answers in its words', () => {
    expect(aggressivenessText(true)).toBe('Yes')
    expect(aggressivenessText(false)).toBe('No')
    expect(aggressivenessText('tooAggressive')).toBe('Too aggressive')
    expect(carAidsText(0, cardById('blue'))).toBe('Never')
    expect(carAidsText(25, cardById('blue'))).toBe('25%')
    expect(carAidsText(0, cardById('green'))).toBe('0%')
  })
})
