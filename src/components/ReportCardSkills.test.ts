import { describe, it, expect } from 'vitest'
import { cardLooks, scoredCards, skillHistory, skillMoves } from './ReportCardSkills'
import type { ReportCardPoint } from './ReportCardSkills'
import { cardById } from '../utils/evaluation'
import type { CardId } from '../utils/evaluation'

const GREEN = cardById('green')
const BLUE = cardById('blue')

const card = (key: string, date: string, skills: Record<string, number>, carAidsPct?: number, on?: CardId): ReportCardPoint =>
  ({ key, date, title: key, evaluation: { ...(on ? { card: on } : {}), skills, ...(carAidsPct !== undefined ? { carAidsPct } : {}) } })

describe('report card skills (#345)', () => {
  it('takes the cards with a core skill scored, oldest first, and the skills any of them scores, in the card’s order', () => {
    const { cards, skills } = scoredCards([
      card('oct', '2025-10-04', { pace: 90, flags: 80 }),
      card('aids-only', '2025-08-01', {}, 20),
      card('jul', '2025-07-19', { flags: 65 }),
    ], GREEN)
    expect(cards.map(c => c.key)).toEqual(['jul', 'oct'])
    expect(skills.map(s => s.id)).toEqual(['flags', 'pace'])
  })

  it('takes one run group’s cards at a time, in that card’s skills and order (#350)', () => {
    const points = [
      card('green', '2021-02-06', { flags: 70, vision: 60 }),
      card('blue-nov', '2024-11-03', { flags: 65, offline: 95, pace: 95 }, undefined, 'blue'),
      card('blue-dec', '2024-12-07', { flags: 95, exits: 95, vision: 50 }, undefined, 'blue'),
    ]
    expect(scoredCards(points, GREEN).cards.map(c => c.key)).toEqual(['green'])
    const blue = scoredCards(points, BLUE)
    expect(blue.cards.map(c => c.key)).toEqual(['blue-nov', 'blue-dec'])
    // Blue's order; Green's Vision isn't one of Blue's skills.
    expect(blue.skills.map(s => s.short)).toEqual(['Flags', 'Exits', 'Pace', 'Offline'])
    expect(skillMoves(blue.cards, BLUE).improved.map(m => [m.skill.id, m.gain])).toEqual([['flags', 30]])
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
    const { improved, needsWork } = skillMoves(cards, GREEN)
    expect(improved.map(m => [m.skill.id, m.gain])).toEqual([['references', 30], ['flags', 25], ['vision', 15]])
    // Lowest now; of the two at 70, the one that gained least (awareness, one card) first.
    expect(needsWork.map(m => [m.skill.id, m.latest])).toEqual([['awareness', 70], ['vision', 70], ['pace', 75]])
  })

  it('has nothing improved with one card, or when nothing went up', () => {
    expect(skillMoves([card('a', '2025-07-19', { flags: 65 })], GREEN).improved).toEqual([])
    expect(skillMoves([card('a', '2025-07-19', { flags: 65 }), card('b', '2025-09-13', { flags: 60 })], GREEN).improved).toEqual([])
  })

  it('gives the four newest cards shown a marker each, and any older one a plain line behind them', () => {
    const cards = ['a', 'b', 'c', 'd', 'e', 'f'].map((k, i) => card(k, `2025-0${i + 1}-01`, { flags: 60 }))
    const all = cardLooks(cards, new Set(cards.map(c => c.key)))
    expect(['f', 'e', 'd', 'c', 'b', 'a'].map(k => all.get(k)!.shape)).toEqual(['circle', 'square', 'triangle', 'diamond', null, null])
    // Hide the newest two, and the older ones come forward.
    const some = cardLooks(cards, new Set(['a', 'b', 'c', 'd']))
    expect(['d', 'c', 'b', 'a'].map(k => some.get(k)!.shape)).toEqual(['circle', 'square', 'triangle', 'diamond'])
    expect(some.has('f')).toBe(false)
  })
})
