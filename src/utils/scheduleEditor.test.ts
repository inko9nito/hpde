import { describe, it, expect } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { parseScheduleMD } from './parseSchedule'
import { scheduleToMarkdown, parseScheduleEdit, applySchedule } from './scheduleEditor'
import { resolveTailwindBgColor } from './eventsJson'
import { RUN_GROUP_BG_CLASSES } from '../theme/runGroupColors'
import type { EventConfig } from '../types'

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

const GROUPS = `## groups
red | Red | bg-runred-500 | text-white | Advanced
blue | Blue | bg-runblue-500 | text-white
`

function problems(src: string, event = blank) {
  return parseScheduleEdit(event, src).problems.map(p => ({ line: p.line, blocking: p.blocking, message: p.message }))
}

describe('scheduleToMarkdown ↔ parseScheduleEdit (#232)', () => {
  it.each(showcase.map(e => [e.id, e] as const))('round-trips %s exactly, with no problems', (_, event) => {
    const edit = parseScheduleEdit(event, scheduleToMarkdown(event))
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual(event.runGroups)
    expect(edit.days).toEqual(event.days)
  })

  it('starts a blank event with a section per day, each with example lines to copy', () => {
    const md = scheduleToMarkdown(blank)
    expect(md).toContain('## groups\n// id | Label | color | text color')
    expect(md).toContain('## Saturday | 2026-10-03\n// 07:00 general |')
    expect(md).toContain('## Sunday | 2026-10-04\n// 07:00 general |')
    expect(md).toContain('// 08:00 session 1 | track: novice | class: intermediate')
    expect(md).toContain('// break | Track walk')
    // The examples are comments: nothing saved, nothing flagged.
    const edit = parseScheduleEdit(blank, md)
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual([])
    expect(edit.days).toEqual(blank.days)
  })

  it('uncommenting the examples gives a working schedule', () => {
    const md = scheduleToMarkdown(blank)
      .replace('// novice | Novice', 'novice | Novice')
      .replace(/\/\/ (\d\d:\d\d|break)/g, '$1')
      .replace(/class: intermediate/g, 'class: novice')
    const edit = parseScheduleEdit(blank, md)
    expect(edit.problems).toEqual([])
    expect(edit.runGroups).toEqual([{ id: 'novice', label: 'Novice', bgClass: 'bg-rungreen-500', textClass: 'text-white', description: 'First time at this track' }])
    expect(edit.days[0].activities).toEqual([
      { time: '07:00', type: 'general', label: 'Registration & tech', subtitle: 'Paddock' },
      { time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['novice'], inClass: ['novice'], note: 'Lead-follow' },
      { time: '12:00', type: 'lunch', label: 'Lunch' },
      { type: 'break', label: 'Track walk' },
    ])
  })

  it('suggests the event’s own group ids in the session example', () => {
    expect(scheduleToMarkdown(showcase[0])).toMatch(/\/\/ 08:00 session 1 \| track: \S+ \| class: \S+/)
    const ids = showcase[0].runGroups.slice(-2).map(g => g.id)
    expect(scheduleToMarkdown(showcase[0])).toContain(`track: ${ids[0]} | class: ${ids[1]}`)
  })

  it('keeps the event’s days and ids, whatever the day is called in the heading', () => {
    const edit = parseScheduleEdit(blank, `${GROUPS}\n## Day one | 2026-10-03\n08:00 session 1 | track: red\n`)
    expect(edit.days[0]).toMatchObject({ id: 'saturday', label: 'Saturday', date: '2026-10-03' })
    expect(edit.days[0].activities).toHaveLength(1)
  })

  it('offers only colors the app and widget can draw', () => {
    for (const bg of RUN_GROUP_BG_CLASSES) expect(resolveTailwindBgColor(bg)).toMatch(/^#[0-9a-f]{6}$/i)
  })
})

describe('parseScheduleEdit problems — nothing typed is silently dropped', () => {
  it('rejects a date that isn’t one of the event’s: dates are changed in the details', () => {
    expect(problems(`${GROUPS}\n## Monday | 2026-10-05\n08:00 session 1 | track: red\n`)).toContainEqual({
      line: 5, blocking: true,
      message: '2026-10-05 isn’t one of this event’s dates (Sat, Oct 3, Sun, Oct 4). Dates are changed in the event’s details.',
    })
  })

  it('rejects the same day twice and an unknown heading', () => {
    const p = problems(`## Saturday | 2026-10-03\n## Saturday | 2026-10-03\n## Notes\n`)
    expect(p).toContainEqual({ line: 2, blocking: true, message: '2026-10-03 has two sections — keep one.' })
    expect(p).toContainEqual(expect.objectContaining({ line: 3, blocking: true }))
  })

  it('rejects event details: they’re edited in the details form', () => {
    const p = problems(`# New name\ntrack: Somewhere\n${GROUPS}`)
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([1, 2])
  })

  it('rejects lines outside any section', () => {
    expect(problems('08:00 session 1 | track: red\n')).toContainEqual(expect.objectContaining({ line: 1, blocking: true }))
  })

  it('rejects bad group lines: too short, bad id, duplicate, unknown color or text color', () => {
    const p = problems(`## groups
red | Red
my group | Mine | bg-runred-500 | text-white
blue | Blue | bg-runblue-500 | text-white
blue | Blue again | bg-runblue-500 | text-white
pink | Pink | bg-pink-500 | text-white
teal | Teal | bg-runblue-500 | text-black
`)
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([2, 3, 5, 6, 7])
    expect(p.find(x => x.line === 6)!.message).toContain('bg-pink-500')
  })

  it('rejects times that aren’t HH:MM and unknown activity types', () => {
    const p = problems(`${GROUPS}\n## Saturday | 2026-10-03\n7:00 general | Gates\n25:00 general | Late\n08:00 lunchtime | Lunch\n08:00 general\nRegistration opens\n`)
    expect(p.filter(x => x.blocking).map(x => x.line)).toEqual([6, 7, 8, 9, 10])
    expect(p.find(x => x.line === 6)!.message).toContain('07:00')
  })

  it('rejects a session naming a group that isn’t defined', () => {
    expect(problems(`${GROUPS}\n## Saturday | 2026-10-03\n08:00 session 1 | track: red, green | class: blu\n`)).toEqual([
      { line: 6, blocking: true, message: 'There’s no group “green” in “## groups”.' },
      { line: 6, blocking: true, message: 'There’s no group “blu” in “## groups”.' },
      expect.objectContaining({ line: undefined, blocking: false }),
    ])
  })

  it('warns (without blocking) about a missing day, an empty session and times out of order', () => {
    const p = problems(`${GROUPS}\n## Saturday | 2026-10-03\n09:00 session 1 | track: red\n08:00 session 2 |\n`)
    expect(p).toEqual([
      { line: 7, blocking: false, message: 'This session has no groups on track (“track: <group ids>”).' },
      { line: 7, blocking: false, message: '08:00 is earlier than the line before it (09:00).' },
      { line: undefined, blocking: false, message: 'Sunday (Sun, Oct 4) has no section, so it’ll have no schedule.' },
    ])
  })

  it('ignores comments, blank lines and the code fences old event files had', () => {
    expect(problems(`\`\`\`\n// a note\n\`\`\`\n\n${GROUPS}\n## Saturday | 2026-10-03\n## Sunday | 2026-10-04\n`)).toEqual([])
  })
})

describe('applySchedule', () => {
  it('returns the event with the new schedule, details untouched', () => {
    const event = { ...blank, organizer: 'Club', track: 'ECR' }
    const result = applySchedule(event, `${GROUPS}\n## Saturday | 2026-10-03\n08:00 session 1 | track: red\n## Sunday | 2026-10-04\n`)
    expect('event' in result && result.event).toEqual({
      ...event,
      runGroups: parseScheduleEdit(event, GROUPS).runGroups,
      days: [{ ...blank.days[0], activities: [{ time: '08:00', type: 'session', sessionNumber: 1, onTrack: ['red'] }] }, blank.days[1]],
    })
  })

  it('refuses with the first blocking problem', () => {
    const result = applySchedule(blank, `${GROUPS}\n## Saturday | 2026-10-03\n08:00 session 1 | track: green\n`)
    expect(result).toMatchObject({ error: 'Line 6: There’s no group “green” in “## groups”.' })
  })
})
