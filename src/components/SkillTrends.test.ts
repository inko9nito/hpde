import { describe, it, expect } from 'vitest'
import { SCORE_ROWS, scoreAt, scoreScale, scoredCards } from './SkillTrends'
import type { ReportCardPoint } from './SkillTrends'

const card = (key: string, date: string, skills: Record<string, number>, carAidsPct?: number): ReportCardPoint =>
  ({ key, date, title: key, evaluation: { skills, ...(carAidsPct !== undefined ? { carAidsPct } : {}) } })

describe('report card scores over time (#345)', () => {
  it('takes the cards with a skill scored, oldest first, and the skills any of them scores, in the card’s order', () => {
    const { cards, rows } = scoredCards([
      card('oct', '2025-10-04', { pace: 90, flags: 80 }),
      card('notes-only', '2025-08-01', {}, 20),
      card('jul', '2025-07-19', { flags: 65 }),
    ])
    expect(cards.map(c => c.key)).toEqual(['jul', 'oct'])
    expect(rows.map(r => r.id)).toEqual(['flags', 'pace'])
    expect(SCORE_ROWS.map(r => r.id)).not.toContain('carAids')
  })

  it('shares one scale, to the tens around the scores, at least 20 points tall, within 0 to 100', () => {
    expect(scoreScale([65, 95, 70])).toEqual({ min: 60, max: 100 })
    expect(scoreScale([100])).toEqual({ min: 80, max: 100 })
    expect(scoreScale([72, 74])).toEqual({ min: 70, max: 90 })
    expect(scoreScale([0, 5])).toEqual({ min: 0, max: 20 })
  })

  it('gives a card’s score, and the change from the last card before it that scored the same skill', () => {
    const cards = [card('a', '2025-07-19', { flags: 65 }), card('b', '2025-09-13', { pace: 70 }), card('c', '2025-10-04', { flags: 60, pace: 70 })]
    const [flags, pace] = [SCORE_ROWS.find(r => r.id === 'flags')!, SCORE_ROWS.find(r => r.id === 'pace')!]
    expect(scoreAt(flags, cards, 2)).toEqual({ score: 60, change: -5, since: cards[0] })
    expect(scoreAt(pace, cards, 2)).toEqual({ score: 70, change: 0, since: cards[1] })
    expect(scoreAt(flags, cards, 1)).toEqual({})
    expect(scoreAt(flags, cards, 0)).toEqual({ score: 65 })
  })
})
