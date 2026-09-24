import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { parseScheduleMD } from './parseSchedule'
import { scheduleToMarkdown, normalizeGroups, parseScheduleEdit, readScheduleEdit, applySchedule, describeProblem } from './scheduleEditor'
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
    const edit = readScheduleEdit(event, event.runGroups, scheduleToMarkdown(event))
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual(event.runGroups)
    expect(edit.days).toEqual(event.days)
  })

  it('writes only the days — groups are in the form — each with example lines to copy', () => {
    const md = scheduleToMarkdown(blank)
    expect(md).not.toContain('## groups')
    expect(md).toContain('## Saturday | 2026-10-03\n// 07:00 general | Registration & tech | Paddock')
    expect(md).toContain('## Sunday | 2026-10-04\n// 07:00 general |')
    expect(md).toContain('// 08:00 session 1 | track: novice | class: intermediate')
    expect(md).toContain('// break | Track walk')
    // The examples are comments: nothing saved, nothing flagged.
    const edit = readScheduleEdit(blank, [], md)
    expect(edit.problems).toEqual([])
    expect(edit.days).toEqual(blank.days)
  })

  it('names groups by name in the schedule, and in the examples', () => {
    const event = { ...blank, runGroups: GROUPS }
    expect(scheduleToMarkdown(event)).toContain('// 08:00 session 1 | track: Red | class: Blue')
    const withSession = { ...event, days: [{ ...blank.days[0], activities: [{ time: '08:00', type: 'session' as const, sessionNumber: 1, onTrack: ['red'], inClass: ['blue'] }] }] }
    expect(scheduleToMarkdown(withSession)).toContain('\n08:00 session 1 | track: Red | class: Blue\n')
  })

  it('uncommenting the examples, with those groups in the form, gives a working schedule', () => {
    const md = scheduleToMarkdown(blank).replace(/\/\/ (\d\d:\d\d|break)/g, '$1')
    const groups = [
      { label: 'Novice', bgClass: 'bg-rungreen-500' },
      { label: 'Intermediate', bgClass: 'bg-runblue-500' },
    ]
    const edit = readScheduleEdit(blank, groups, md)
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual([
      { id: 'novice', label: 'Novice', bgClass: 'bg-rungreen-500', textClass: 'text-white' },
      { id: 'intermediate', label: 'Intermediate', bgClass: 'bg-runblue-500', textClass: 'text-white' },
    ])
    expect(edit.days[0].activities).toEqual([
      { time: '07:00', type: 'general', label: 'Registration & tech', subtitle: 'Paddock' },
      { time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['novice'], inClass: ['intermediate'], note: 'Lead-follow' },
      { time: '12:00', type: 'lunch', label: 'Lunch' },
      { type: 'break', label: 'Track walk' },
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

describe('normalizeGroups — the run groups form', () => {
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
    expect(p).toContainEqual({ line: 4, blocking: true, message: 'Run groups are set in the form above the schedule — remove this section.' })
    // The section's own lines aren't flagged again.
    expect(p.find(x => x.line === 5)).toBeUndefined()
  })

  it('rejects event details and lines outside any day', () => {
    const p = problems('# New name\ntrack: Somewhere\n08:00 session 1 | track: Red\n')
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([1, 2, 3])
  })

  it('rejects times that aren’t HH:MM, unknown activity types and missing labels', () => {
    const p = problems('## Saturday | 2026-10-03\n7:00 general | Gates\n25:00 general | Late\n08:00 lunchtime | Lunch\n08:00 general\nRegistration opens\n')
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([2, 3, 4, 5, 6])
    expect(p.find(x => x.line === 2)!.message).toContain('07:00')
  })

  it('rejects a session naming a group that isn’t in the form', () => {
    expect(problems('## Saturday | 2026-10-03\n08:00 session 1 | track: Red, Green | class: Blu\n')).toEqual([
      { line: 2, blocking: true, message: 'There’s no group “Green” — add it under Run groups.' },
      { line: 2, blocking: true, message: 'There’s no group “Blu” — add it under Run groups.' },
      expect.objectContaining({ line: undefined, blocking: false }),
    ])
  })

  it('warns (without blocking) about a missing day, an empty session and times out of order', () => {
    const p = problems('## Saturday | 2026-10-03\n09:00 session 1 | track: Red\n08:00 session 2 |\n')
    expect(p).toEqual([
      { line: 3, blocking: false, message: 'This session has no groups on track (“track: <group names>”).' },
      { line: 3, blocking: false, message: '08:00 is earlier than the line before it (09:00).' },
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
      .toMatchObject({ error: 'Line 2: There’s no group “Green” — add it under Run groups.' })
    expect(applySchedule(blank, [{ label: '', bgClass: 'bg-runred-500' }], '08:00 x\n'))
      .toMatchObject({ error: 'Group 1: Give this group a name.' })
  })

  it('says where each problem is', () => {
    expect(describeProblem({ line: 4, message: 'x', blocking: true })).toBe('Line 4: x')
    expect(describeProblem({ group: 0, message: 'y', blocking: true })).toBe('Group 1: y')
    expect(describeProblem({ message: 'z', blocking: false })).toBe('z')
  })
})
