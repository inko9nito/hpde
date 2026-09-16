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
09:00 session 1 | on: orange
break | Instructor break
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

  it('parses break event', () => {
    const { days } = parseScheduleMD('test', SAMPLE)
    const brk = days[0].events.find(e => e.type === 'break')
    expect(brk).toMatchObject({ type: 'break', label: 'Instructor break' })
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

describe('phase-1 logbook sections', () => {
  const FULL = `
# Full Event
subtitle: Sep 13, 2026 · MSR

## groups
red   | Red   | bg-runred-500   | text-white
blue  | Blue  | bg-runblue-500  | text-white
green | Green | bg-rungreen-500 | text-white

## notes
Great weekend overall.
Car ran strong all day.

## vitals
attended: John Harms, Steve
summary: Warm, clear day. First time on this layout.

## media
photos | Weekend album | https://photos.example.com/album
video | Session 3 onboard | https://youtu.be/abc123

## car
tires: Michelin PS4S 245/40R18
brakes: Ferodo DS2500 front
ride height: stock
alignment: -2.0 front camber
aids: PSM Sport, TC off, ABS on

## Sunday | 2026-09-13

08:30 session 1 | on: red
break | corner worker break
10:25 session 2 | on: red

### weather
high: 88
low: 68
track: 112
precip: dry
notes: Windy in the afternoon, dust picked up after lunch.

### session 1
notes: Really happy with braking today. Picked up more confidence in Turn 3.
tires cold: fl=32 fr=32 rl=30 rr=30
tires hot: fl=38 fr=37 rl=34 rr=33
aids: PSM Sport, TC off
eval.track: MSRC 1.7cw
eval.instructor: John Harms
eval.student: Vera Maxakova
eval.car: Porsche Panamerica
eval.skill.flags: 65
eval.skill.passing: 95
eval.skill.smoothInputs: 95
eval.skill.looksAhead: 80
eval.skill.consistency: 80
eval.skill.carControl: 95
eval.skill.pace: 95
eval.skill.referencePoints: 95
eval.skill.trackAwareness: 95
eval.aggressiveness=skill: yes
eval.aidsOveractivated: 25
eval.recommend.sameDirection: blue
eval.recommend.newDirection: green
eval.recommend.newTrack: green
eval.notes: Worked on braking successfully, picked up on initial hard braking and then slowly releasing into throttle.
media: video | Session 1 lap | https://youtu.be/session1
`.trim()

  it('parses event-wide notes as a joined block', () => {
    const config = parseScheduleMD('full', FULL)
    expect(config.notes).toBe('Great weekend overall.\nCar ran strong all day.')
  })

  it('parses vitals with attended list and freeform summary', () => {
    const config = parseScheduleMD('full', FULL)
    expect(config.vitals?.attended).toEqual(['John Harms', 'Steve'])
    expect(config.vitals?.summary).toBe('Warm, clear day. First time on this layout.')
  })

  it('parses event-level media links', () => {
    const config = parseScheduleMD('full', FULL)
    expect(config.media).toEqual([
      { kind: 'photos', label: 'Weekend album', url: 'https://photos.example.com/album' },
      { kind: 'video', label: 'Session 3 onboard', url: 'https://youtu.be/abc123' },
    ])
  })

  it('parses the car config snapshot', () => {
    const config = parseScheduleMD('full', FULL)
    expect(config.carConfig).toEqual({
      tires: 'Michelin PS4S 245/40R18',
      brakes: 'Ferodo DS2500 front',
      rideHeight: 'stock',
      alignment: '-2.0 front camber',
      aids: 'PSM Sport, TC off, ABS on',
    })
  })

  it('still parses the schedule rows for a day that also has weather/session sections', () => {
    const config = parseScheduleMD('full', FULL)
    const day = config.days[0]
    expect(day.events.filter(e => e.type === 'session')).toHaveLength(2)
    expect(day.events.some(e => e.type === 'break')).toBe(true)
  })

  it('parses per-day weather', () => {
    const config = parseScheduleMD('full', FULL)
    expect(config.days[0].weather).toEqual({
      highF: 88,
      lowF: 68,
      trackTempF: 112,
      precipitation: 'dry',
      notes: 'Windy in the afternoon, dust picked up after lunch.',
    })
  })

  it('parses per-session tire pressures', () => {
    const config = parseScheduleMD('full', FULL)
    const log = config.days[0].sessionLogs?.find(s => s.sessionNumber === 1)
    expect(log?.tirePressures).toEqual({
      cold: { fl: 32, fr: 32, rl: 30, rr: 30 },
      hot: { fl: 38, fr: 37, rl: 34, rr: 33 },
    })
  })

  it('parses per-session notes and car aids override', () => {
    const config = parseScheduleMD('full', FULL)
    const log = config.days[0].sessionLogs?.find(s => s.sessionNumber === 1)
    expect(log?.notes).toBe('Really happy with braking today. Picked up more confidence in Turn 3.')
    expect(log?.carAids).toBe('PSM Sport, TC off')
  })

  it('parses the structured instructor evaluation', () => {
    const config = parseScheduleMD('full', FULL)
    const log = config.days[0].sessionLogs?.find(s => s.sessionNumber === 1)
    expect(log?.instructorEval).toEqual({
      track: 'MSRC 1.7cw',
      instructor: 'John Harms',
      student: 'Vera Maxakova',
      car: 'Porsche Panamerica',
      skills: {
        flags: 65,
        passing: 95,
        smoothInputs: 95,
        looksAhead: 80,
        consistency: 80,
        carControl: 95,
        pace: 95,
        referencePoints: 95,
        trackAwareness: 95,
      },
      aggressivenessEqualsSkill: true,
      aidsOveractivatedPct: 25,
      recommend: { sameDirection: 'blue', newDirection: 'green', newTrack: 'green' },
      notes: 'Worked on braking successfully, picked up on initial hard braking and then slowly releasing into throttle.',
    })
  })

  it('parses per-session media links', () => {
    const config = parseScheduleMD('full', FULL)
    const log = config.days[0].sessionLogs?.find(s => s.sessionNumber === 1)
    expect(log?.media).toEqual([
      { kind: 'video', label: 'Session 1 lap', url: 'https://youtu.be/session1' },
    ])
  })

  it('leaves phase-1 fields undefined for events with none of the new sections', () => {
    const config = parseScheduleMD('test', SAMPLE)
    expect(config.notes).toBeUndefined()
    expect(config.vitals).toBeUndefined()
    expect(config.media).toBeUndefined()
    expect(config.carConfig).toBeUndefined()
    expect(config.days[0].weather).toBeUndefined()
    expect(config.days[0].sessionLogs).toBeUndefined()
  })
})
