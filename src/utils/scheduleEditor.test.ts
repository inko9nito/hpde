import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { parseScheduleMD } from './parseSchedule'
import { scheduleToMarkdown, normalizeGroups, parseScheduleEdit, readScheduleEdit, applySchedule, describeProblem, deriveGroups, suggestColor, scheduleGroupNames, readLineTime } from './scheduleEditor'
import { resolveTailwindBgColor } from './eventsJson'
import { RUN_GROUP_BG_CLASSES } from '../theme/runGroupColors'
import type { EventConfig, RunGroupConfig } from '../types'

const showcaseDir = path.resolve(__dirname, '../../scripts/fixtures/showcase')
const showcase = readdirSync(showcaseDir).map(f =>
  parseScheduleMD(f.replace(/\.md$/, ''), readFileSync(path.join(showcaseDir, f), 'utf8')),
)

// Created in the app: two days, no schedule yet.
const blank: EventConfig = {
  id: '2026-10-03_tde',
  name: 'TDE',
  runGroups: [],
  days: [
    { id: 'saturday', label: 'Saturday', date: '2026-10-03', activities: [] },
    { id: 'sunday', label: 'Sunday', date: '2026-10-04', activities: [] },
  ],
}

const GROUPS: RunGroupConfig[] = [
  { id: 'red', label: 'Red', bgClass: 'bg-runred-500', textClass: 'text-white', description: 'Advanced' },
  { id: 'blue', label: 'Blue', bgClass: 'bg-runblue-500', textClass: 'text-white' },
]

function problems(src: string, event = blank, groups = GROUPS) {
  return parseScheduleEdit(event, groups, src).problems.map(p => ({ line: p.line, blocking: p.blocking, message: p.message }))
}

describe('the editor round trip (#232)', () => {
  it.each(showcase.map(e => [e.id, e] as const))('round-trips %s exactly, with no problems', (_, event) => {
    const md = scheduleToMarkdown(event)
    const edit = readScheduleEdit(event, deriveGroups(md, event.runGroups), md)
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual(event.runGroups)
    expect(edit.days).toEqual(event.days)
  })

  it('writes only the days — groups come from the sessions — each with example lines to copy', () => {
    const md = scheduleToMarkdown(blank)
    expect(md).not.toContain('## groups')
    expect(md).toContain('## Saturday | 2026-10-03\n// 7:00 AM general | Registration & tech | Paddock')
    expect(md).toContain('## Sunday | 2026-10-04\n// 7:00 AM general |')
    expect(md).toContain('// 8:00 AM session 1 | track: Novice | class: Intermediate')
    expect(md).toContain('// break | Track walk')
    // Times as they're read, AM and PM.
    expect(md).toContain('// 12:00 PM lunch | Lunch')
    expect(md).toContain('// 1:30 PM session 4 | track: Novice, Intermediate')
    // The examples are comments: nothing saved, nothing flagged.
    const edit = readScheduleEdit(blank, [], md)
    expect(edit.problems).toEqual([])
    expect(edit.days).toEqual(blank.days)
  })

  it('names groups by name in the schedule, and in the examples', () => {
    const event = { ...blank, runGroups: GROUPS }
    expect(scheduleToMarkdown(event)).toContain('// 8:00 AM session 1 | track: Red | class: Blue')
    const withSession = { ...event, days: [{ ...blank.days[0], activities: [{ time: '08:00', type: 'session' as const, sessionNumber: 1, onTrack: ['red'], inClass: ['blue'] }] }] }
    expect(scheduleToMarkdown(withSession)).toContain('\n8:00 AM session 1 | track: Red | class: Blue\n')
  })

  it('uncommenting the examples gives a working schedule, with a group for each name', () => {
    const md = scheduleToMarkdown(blank).replace(/\/\/ (\d{1,2}:\d\d|break)/g, '$1')
    const edit = readScheduleEdit(blank, deriveGroups(md, []), md)
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual([
      { id: 'novice', label: 'Novice', bgClass: 'bg-runred-500', textClass: 'text-white' },
      { id: 'intermediate', label: 'Intermediate', bgClass: 'bg-runorange-500', textClass: 'text-white' },
    ])
    expect(edit.days[0].activities).toEqual([
      { time: '07:00', type: 'general', label: 'Registration & tech', subtitle: 'Paddock' },
      { time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['novice'], inClass: ['intermediate'], note: 'Lead-follow' },
      { time: '12:00', type: 'lunch', label: 'Lunch' },
      { type: 'break', label: 'Track walk' },
      { time: '13:30', type: 'session', sessionNumber: 4, onTrack: ['novice', 'intermediate'] },
    ])
  })

  it('matches group names in any case, and a renamed group by its old name', () => {
    const renamed = [{ ...GROUPS[0], label: 'Advanced' }, GROUPS[1]]
    const { days, problems: p } = parseScheduleEdit(blank, renamed, '## Saturday | 2026-10-03\n08:00 session 1 | track: advanced, BLUE | class: Red\n')
    expect(p.filter(x => x.blocking)).toEqual([])
    expect(days[0].activities[0]).toMatchObject({ onTrack: ['red', 'blue'], inClass: ['red'] })
  })

  it('keeps the event’s days and ids, whatever the day is called in the heading', () => {
    const { days } = parseScheduleEdit(blank, GROUPS, '## Day one | 2026-10-03\n08:00 session 1 | track: Red\n')
    expect(days[0]).toMatchObject({ id: 'saturday', label: 'Saturday', date: '2026-10-03' })
    expect(days[0].activities).toHaveLength(1)
  })

  it('offers only colors the app and widget can draw', () => {
    for (const bg of RUN_GROUP_BG_CLASSES) expect(resolveTailwindBgColor(bg)).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

describe('run groups come from the schedule', () => {
  const day = (lines: string) => `## Saturday | 2026-10-03\n${lines}\n`

  it('finds every group the sessions name, in order, spelled as first written', () => {
    expect(scheduleGroupNames(day([
      '08:00 session 1 | track: Instructors, Red | class: Novice',
      '08:30 session 1 | track: red, Blue Group',
      '// 09:00 session 2 | track: Commented',
      '09:00 general | Not a group: Green',
      '7:30 session 0 | track: Early',
    ].join('\n')))).toEqual(['Instructors', 'Red', 'Novice', 'Blue Group', 'Early'])
  })

  it('picks a color from the name, black for instructors, else the next one unused', () => {
    expect(suggestColor('Red')).toBe('bg-runred-500')
    expect(suggestColor('Blue group')).toBe('bg-runblue-500')
    expect(suggestColor('Grey')).toBe('bg-rungray-500')
    expect(suggestColor('Instructors')).toBe('bg-zinc-900')
    expect(suggestColor('Coach')).toBe('bg-zinc-900')
    expect(suggestColor('Reddish')).toBe('bg-runred-500')
    expect(suggestColor('Reddish', ['bg-runred-500'])).toBe('bg-runorange-500')
    expect(suggestColor('Novice', ['bg-runred-500', 'bg-runorange-500'])).toBe('bg-runyellow-500')
  })

  it('names new groups’ colors around the ones already taken', () => {
    const md = day('08:00 session 1 | track: Novice, Red, Advanced, Instructors')
    expect(deriveGroups(md, []).map(g => [g.label, g.bgClass])).toEqual([
      ['Novice', 'bg-runorange-500'],
      ['Red', 'bg-runred-500'],
      ['Advanced', 'bg-runyellow-500'],
      ['Instructors', 'bg-zinc-900'],
    ])
  })

  it('keeps saved groups — order, color, description — and matches them by name or id, any case', () => {
    const saved = [{ id: 'blue', label: 'Blue', bgClass: 'bg-runpurple-500', textClass: 'text-white', description: 'Novice' }, GROUPS[0]]
    const md = day('08:00 session 1 | track: red, New, BLUE')
    expect(deriveGroups(md, saved)).toEqual([saved[0], saved[1], { label: 'New', bgClass: 'bg-runorange-500' }])
  })

  it('uses a color or description set in the editor for a new group, and drops groups no longer named', () => {
    const settings = [GROUPS[0], { label: 'Novice', bgClass: 'bg-runtan-500', description: 'First timers' }]
    expect(deriveGroups(day('08:00 session 1 | track: novice'), settings)).toEqual([settings[1]])
    expect(deriveGroups(day('08:00 general | Lunch'), settings)).toEqual([])
  })
})

describe('normalizeGroups — what a save sends', () => {
  it('keeps saved ids, gives new groups one from their name, and defaults to white text', () => {
    const { runGroups, problems: p } = normalizeGroups([
      GROUPS[0],
      { label: ' Time Trial ', description: ' Fast ', bgClass: 'bg-runpurple-500' },
      { label: 'Red', id: '', bgClass: 'bg-runorange-500' },
    ])
    expect(runGroups.map(g => g.id)).toEqual(['red', 'time-trial', 'red-2'])
    expect(runGroups[1]).toEqual({ id: 'time-trial', label: 'Time Trial', description: 'Fast', bgClass: 'bg-runpurple-500', textClass: 'text-white' })
    // Two groups called Red, though.
    expect(p).toEqual([{ group: 2, blocking: true, message: 'There’s already a group named “Red”.' }])
  })

  it('needs a name and a palette color for each group', () => {
    const { problems: p } = normalizeGroups([
      { label: '', bgClass: 'bg-runred-500' },
      { label: 'Pink', bgClass: 'bg-pink-500' },
      { label: 'Teal', bgClass: 'bg-runblue-500', textClass: 'text-black' },
      { label: 'x'.repeat(41), bgClass: 'bg-runblue-500' },
    ])
    expect(p.map(x => [x.group, x.message])).toEqual([
      [0, 'Give this group a name.'],
      [1, 'Pick a color.'],
      [2, 'That text color isn’t available.'],
      [3, 'Keep the name under 40 characters.'],
    ])
  })

  it('survives whatever it’s sent', () => {
    expect(normalizeGroups('nope').runGroups).toEqual([])
    expect(normalizeGroups([null, 7]).problems.filter(p => p.blocking)).toHaveLength(4)
    expect(normalizeGroups(Array(21).fill(GROUPS[1])).problems[0].message).toBe('An event can have at most 20 groups.')
  })
})

describe('parseScheduleEdit problems — nothing typed is silently dropped', () => {
  it('rejects a date that isn’t one of the event’s: dates are changed in the details', () => {
    expect(problems('## Monday | 2026-10-05\n08:00 session 1 | track: Red\n')).toContainEqual({
      line: 1, blocking: true,
      message: '2026-10-05 isn’t one of this event’s dates (Sat, Oct 3, Sun, Oct 4). Dates are changed in the event’s details.',
    })
  })

  it('rejects the same day twice, an unknown heading, and a groups section', () => {
    const p = problems('## Saturday | 2026-10-03\n## Saturday | 2026-10-03\n## Notes\n## groups\nred | Red | bg-runred-500 | text-white\n')
    expect(p).toContainEqual({ line: 2, blocking: true, message: '2026-10-03 has two sections — keep one.' })
    expect(p).toContainEqual(expect.objectContaining({ line: 3, blocking: true }))
    expect(p).toContainEqual({ line: 4, blocking: true, message: 'Run groups come from the sessions, with their colors below — remove this section.' })
    // The section's own lines aren't flagged again.
    expect(p.find(x => x.line === 5)).toBeUndefined()
  })

  it('rejects event details and lines outside any day', () => {
    const p = problems('# New name\ntrack: Somewhere\n08:00 session 1 | track: Red\n')
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([1, 2, 3])
  })

  it('rejects times it can’t read (or would have to guess), unknown activity types and missing labels', () => {
    const p = problems('## Saturday | 2026-10-03\n7:00 general | Gates\n25:00 general | Late\n8:00 AM lunchtime | Lunch\n8:00 AM general\nRegistration opens\n')
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([2, 3, 4, 5, 6])
    expect(p.find(x => x.line === 2)!.message).toBe('“7:00” needs AM or PM — e.g. 7:00 AM or 7:00 PM.')
  })

  it('reads times with AM or PM, or 24-hour with two-digit hours', () => {
    const t = (s: string) => readLineTime(`${s} general | x`)
    expect(t('1:30 PM')).toEqual({ time: '13:30', rest: 'general | x' })
    expect(t('1:30pm')).toMatchObject({ time: '13:30' })
    expect(t('1:30 p.m.')).toMatchObject({ time: '13:30' })
    expect(t('7:05 am')).toMatchObject({ time: '07:05' })
    expect(t('12:00 PM')).toMatchObject({ time: '12:00' })
    expect(t('12:30 AM')).toMatchObject({ time: '00:30' })
    expect(t('13:30')).toMatchObject({ time: '13:30' })
    expect(t('07:30')).toMatchObject({ time: '07:30' })
    expect(t('1:30')).toMatchObject({ error: '“1:30” needs AM or PM — e.g. 1:30 AM or 1:30 PM.' })
    for (const bad of ['13:30 PM', '0:30 AM', '9:75 AM', '24:00']) expect(t(bad)).toHaveProperty('error')
    expect(readLineTime('break | Walk')).toBeNull()
  })

  it('rejects a session naming a group it wasn’t sent (the function checks what it’s given)', () => {
    expect(problems('## Saturday | 2026-10-03\n08:00 session 1 | track: Red, Green | class: Blu\n')).toEqual([
      { line: 2, blocking: true, message: 'There’s no group “Green”.' },
      { line: 2, blocking: true, message: 'There’s no group “Blu”.' },
      expect.objectContaining({ line: undefined, blocking: false }),
    ])
  })

  it('warns (without blocking) about a missing day, an empty session and times out of order', () => {
    const p = problems('## Saturday | 2026-10-03\n09:00 session 1 | track: Red\n08:00 session 2 |\n')
    expect(p).toEqual([
      { line: 3, blocking: false, message: 'This session has no groups on track (“track: <group names>”).' },
      { line: 3, blocking: false, message: '8:00 AM is earlier than the line before it (9:00 AM).' },
      { line: undefined, blocking: false, message: 'Sunday (Sun, Oct 4) has no section, so it’ll have no schedule.' },
    ])
  })

  it('ignores comments, blank lines and the code fences old event files had', () => {
    expect(problems('```\n// a note\n```\n\n## Saturday | 2026-10-03\n## Sunday | 2026-10-04\n')).toEqual([])
  })
})

describe('applySchedule', () => {
  it('returns the event with the new groups and schedule, details untouched', () => {
    const event = { ...blank, organizer: 'Club', track: 'ECR' }
    const result = applySchedule(event, GROUPS, '## Saturday | 2026-10-03\n08:00 session 1 | track: Red\n## Sunday | 2026-10-04\n')
    expect('event' in result && result.event).toEqual({
      ...event,
      runGroups: GROUPS,
      days: [{ ...blank.days[0], activities: [{ time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['red'] }] }, blank.days[1]],
    })
  })

  it('refuses with the first blocking problem, groups first', () => {
    expect(applySchedule(blank, GROUPS, '## Saturday | 2026-10-03\n08:00 session 1 | track: Green\n'))
      .toMatchObject({ error: 'Line 2: There’s no group “Green”.' })
    expect(applySchedule(blank, [{ label: '', bgClass: 'bg-runred-500' }], '08:00 x\n'))
      .toMatchObject({ error: 'Group 1: Give this group a name.' })
  })

  it('says where each problem is', () => {
    expect(describeProblem({ line: 4, message: 'x', blocking: true })).toBe('Line 4: x')
    expect(describeProblem({ group: 0, message: 'y', blocking: true })).toBe('Group 1: y')
    expect(describeProblem({ message: 'z', blocking: false })).toBe('z')
  })
})
