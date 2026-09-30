import { describe, it, expect } from 'vitest'
import { scoredCards, skillHistory, skillMoves, wheelScale } from './ReportCardSkills'
import type { ReportCardPoint } from './ReportCardSkills'

const card = (key: string, date: string, skills: Record<string, number>, carAidsPct?: number): ReportCardPoint =>
  ({ key, date, title: key, evaluation: { skills, ...(carAidsPct !== undefined ? { carAidsPct } : {}) } })

describe('report card skills (#345)', () => {
  it('takes the cards with a core skill scored, oldest first, and the skills any of them scores, in the card’s order', () => {
    const { cards, skills } = scoredCards([
      card('oct', '2025-10-04', { pace: 90, flags: 80 }),
      card('aids-only', '2025-08-01', {}, 20),
      card('jul', '2025-07-19', { flags: 65 }),
    ])
    expect(cards.map(c => c.key)).toEqual(['jul', 'oct'])
    expect(skills.map(s => s.id)).toEqual(['flags', 'pace'])
  })

  it('gives a skill’s score on each card that scored it, with the change from the one before', () => {
    const cards = [card('a', '2025-07-19', { flags: 65 }), card('b', '2025-09-13', { pace: 70 }), card('c', '2025-10-04', { flags: 60, pace: 70 })]
    expect(skillHistory('flags', cards)).toEqual([{ card: cards[0], score: 65 }, { card: cards[2], score: 60, change: -5 }])
    expect(skillHistory('vision', cards)).toEqual([])
  })

  it('lists the most improved since the first card, and the lowest on the latest', () => {
    const cards = [
      card('jul', '2025-07-19', { flags: 65, passing: 95, vision: 55, references: 50, pace: 80 }),
      card('oct', '2025-10-04', { flags: 90, passing: 100, vision: 70, references: 80, pace: 75, awareness: 70 }),
    ]
    const { improved, needsWork } = skillMoves(cards)
    expect(improved.map(m => [m.skill.id, m.gain])).toEqual([['references', 30], ['flags', 25], ['vision', 15]])
    // Lowest now; of the two at 70, the one that gained least (awareness, one card) first.
    expect(needsWork.map(m => [m.skill.id, m.latest])).toEqual([['awareness', 70], ['vision', 70], ['pace', 75]])
  })

  it('has nothing improved with one card, or when nothing went up', () => {
    expect(skillMoves([card('a', '2025-07-19', { flags: 65 })]).improved).toEqual([])
    expect(skillMoves([card('a', '2025-07-19', { flags: 65 }), card('b', '2025-09-13', { flags: 60 })]).improved).toEqual([])
  })

  it('puts 100% at the rim and 50% at the middle, or lower in tens for a lower score', () => {
    expect(wheelScale([65, 95])).toEqual({ min: 50, max: 100 })
    expect(wheelScale([42, 90])).toEqual({ min: 40, max: 100 })
    expect(wheelScale([0])).toEqual({ min: 0, max: 100 })
  })
})
