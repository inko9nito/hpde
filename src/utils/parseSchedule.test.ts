import { describe, it, expect } from 'vitest'
import { parseScheduleMD } from './parseSchedule'

const SAMPLE = `
# Test Event
subtitle: Jan 1, 2030

## groups
orange | Orange | bg-orange-500 | text-white
pink | Pink | bg-pink-500 | text-white

## Saturday | 2030-01-01

08:00 general | Drivers meeting
08:30 general | Track goes hot
08:30 session | on: orange | in: pink
09:00 session 1 | on: orange | note: Instructor break
10:00 session 2 | on: pink | in: orange
12:00 lunch | Lunch break | Bring your own food
17:00 general | Track goes cold
`.trim()

describe('parseScheduleMD', () => {
  it('parses event name and subtitle', () => {
    const config = parseScheduleMD('test', SAMPLE)
    expect(config.id).toBe('test')
    expect(config.name).toBe('Test Event')
    expect(config.subtitle).toBe('Jan 1, 2030')
  })

  it('parses run groups', () => {
    const { runGroups } = parseScheduleMD('test', SAMPLE)
    expect(runGroups).toHaveLength(2)
    expect(runGroups[0]).toEqual({ id: 'orange', label: 'Orange', bgClass: 'bg-orange-500', textClass: 'text-white' })
    expect(runGroups[1]).toEqual({ id: 'pink', label: 'Pink', bgClass: 'bg-pink-500', textClass: 'text-white' })
  })

  it('parses day with correct id, label, and date', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    expect(days).toHaveLength(1)
    expect(days[0].id).toBe('saturday')
    expect(days[0].label).toBe('Saturday')
    expect(days[0].date).toBe('2030-01-01')
  })

  it('parses general events', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    const general = days[0].events.filter(e => e.type === 'general')
    expect(general).toHaveLength(3)
    expect(general[0]).toMatchObject({ time: '08:00', type: 'general', label: 'Drivers meeting' })
  })

  it('parses lunch event with subtitle', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    const lunch = days[0].events.find(e => e.type === 'lunch')
    expect(lunch).toMatchObject({ time: '12:00', type: 'lunch', label: 'Lunch break', subtitle: 'Bring your own food' })
  })

  it('parses session with onTrack and inClass', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    const session = days[0].events.find(e => e.type === 'session' && (e as { onTrack: string[] }).onTrack.includes('orange') && (e as { inClass?: string[] }).inClass?.includes('pink'))
    expect(session).toBeDefined()
    expect(session).toMatchObject({ time: '08:30', type: 'session', onTrack: ['orange'], inClass: ['pink'] })
  })

  it('parses session number', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    const s1 = days[0].events.find(e => e.type === 'session' && (e as { sessionNumber?: number }).sessionNumber === 1)
    expect(s1).toMatchObject({ sessionNumber: 1, onTrack: ['orange'] })
    const s2 = days[0].events.find(e => e.type === 'session' && (e as { sessionNumber?: number }).sessionNumber === 2)
    expect(s2).toMatchObject({ sessionNumber: 2 })
  })

  it('parses session note', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    const withNote = days[0].events.find(e => e.type === 'session' && (e as { note?: string }).note)
    expect(withNote).toMatchObject({ note: 'Instructor break' })
  })

  it('parses multiple groups in a single field', () => {
    const multiSrc = `
# X
## groups
red | Red | bg-red-500 | text-white
yellow | Yellow | bg-yellow-400 | text-black
## Day | 2030-06-01
10:00 session | on: red, yellow
`.trim()
    const { days } = parseScheduleMD('x', multiSrc)
    const s = days[0].events[0] as { onTrack: string[] }
    expect(s.onTrack).toEqual(['red', 'yellow'])
  })

  it('produces the correct number of events for a multi-day event', () => {
    const multiDay = `
# Y
## groups
red | Red | bg-red-500 | text-white
## Friday | 2030-01-03
08:00 general | Open
## Saturday | 2030-01-04
08:00 general | Open
09:00 session | on: red
`.trim()
    const { days } = parseScheduleMD('y', multiDay)
    expect(days).toHaveLength(2)
    expect(days[0].events).toHaveLength(1)
    expect(days[1].events).toHaveLength(2)
  })
})
