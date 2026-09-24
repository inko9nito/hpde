import { parseActivityLine, parseGroupLine } from './parseSchedule'
import { RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from '../theme/runGroupColors'
import type { DaySchedule, EventConfig, RunGroupConfig, ScheduleActivity } from '../types'

// The schedule editor (#232): an event's run groups and day-by-day
// schedule as markdown, in the format the event files used to have — only
// the `## groups` and `## <Day> | YYYY-MM-DD` sections. The event's details
// (name, dates, track…) are edited elsewhere, so the days are fixed: each
// section fills in one of the event's own dates.
//
// Shared by the editor page (live preview) and the events function (which
// parses what it's sent itself before saving).

export interface ScheduleProblem {
  // 1-based line in the markdown, when the problem is on one line.
  line?: number
  message: string
  // Blocking problems stop a save; the rest are worth a look.
  blocking: boolean
}

export interface ScheduleEdit {
  runGroups: RunGroupConfig[]
  days: DaySchedule[]
  problems: ScheduleProblem[]
}

// Lines that belong to the event's details, not its schedule.
const DETAIL_LINE = /^(# |(subtitle|link|organizer|track|city|configuration|config|direction|trackId):)/
const GROUP_ID = /^[A-Za-z0-9_-]+$/
const DATE = /^\d{4}-\d{2}-\d{2}$/

const EXAMPLE_GROUPS = ['novice', 'intermediate']

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric',
  })
}

function groupLine(g: RunGroupConfig): string {
  return [g.id, g.label, g.bgClass, g.textClass, ...(g.description ? [g.description] : [])].join(' | ')
}

function activityLine(a: ScheduleActivity): string {
  if (a.type === 'break') return `break | ${a.label}`
  if (a.type === 'session') {
    const parts = [`${a.time} session${a.sessionNumber !== undefined ? ` ${a.sessionNumber}` : ''}`]
    parts.push(`track: ${a.onTrack.join(', ')}`)
    if (a.inClass?.length) parts.push(`class: ${a.inClass.join(', ')}`)
    if (a.note) parts.push(`note: ${a.note}`)
    return parts.join(' | ')
  }
  return [`${a.time} ${a.type}`, a.label, ...(a.subtitle ? [a.subtitle] : [])].join(' | ')
}

/**
 * The event's schedule as editor markdown. Every section starts with
 * commented-out example lines (`//`) to copy — remove the `//` to use one.
 * Comments aren't saved; they're written fresh each time.
 */
export function scheduleToMarkdown(event: EventConfig): string {
  const ids = event.runGroups.length >= 2
    ? event.runGroups.slice(-2).map(g => g.id)
    : EXAMPLE_GROUPS
  const out: string[] = [
    '// Lines starting with // are examples and notes, and aren’t saved.',
    '// Remove the // to use one.',
    '',
    '## groups',
    '// id | Label | color | text color | description (optional)',
    '// novice | Novice | bg-rungreen-500 | text-white | First time at this track',
    ...event.runGroups.map(groupLine),
  ]
  for (const day of event.days) {
    out.push(
      '',
      `## ${day.label} | ${day.date}`,
      '// 07:00 general | Registration & tech | Paddock',
      `// 08:00 session 1 | track: ${ids[0]} | class: ${ids[1]} | note: Lead-follow`,
      '// 12:00 lunch | Lunch',
      '// break | Track walk',
      ...day.activities.map(activityLine),
    )
  }
  return out.join('\n') + '\n'
}

function minutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Reads editor markdown against the event it belongs to. Stricter than
 * parseScheduleMD, which silently drops whatever it doesn't understand:
 * here every line that would be lost is a blocking problem, with its line
 * number, so nothing typed disappears on save.
 */
export function parseScheduleEdit(event: EventConfig, src: string): ScheduleEdit {
  const problems: ScheduleProblem[] = []
  const error = (line: number | undefined, message: string) => problems.push({ line, message, blocking: true })
  const warn = (line: number | undefined, message: string) => problems.push({ line, message, blocking: false })

  const runGroups: RunGroupConfig[] = []
  const groupIds = new Set<string>()
  const activities = new Map<string, ScheduleActivity[]>()
  // Checked once all groups are known, so their order doesn't matter.
  const refs: { line: number; ids: string[] }[] = []
  const dateList = event.days.map(d => formatDate(d.date)).join(', ')

  type Section = { kind: 'none' } | { kind: 'groups' } | { kind: 'day'; date: string; lastTime?: string } | { kind: 'skip' }
  let section: Section = { kind: 'none' }
  let sawGroups = false

  src.split('\n').forEach((raw, i) => {
    const n = i + 1
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('```')) return
    const line = trimmed.replace(/^-\s+/, '')

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      if (heading.toLowerCase() === 'groups') {
        if (sawGroups) error(n, 'There’s already a “## groups” section — keep one.')
        sawGroups = true
        section = { kind: 'groups' }
        return
      }
      const parts = heading.split('|').map(s => s.trim())
      if (parts.length !== 2 || !DATE.test(parts[1])) {
        error(n, `“${line}” isn’t a section — use “## groups” or “## <Day> | YYYY-MM-DD”.`)
        section = { kind: 'skip' }
        return
      }
      const date = parts[1]
      if (!event.days.some(d => d.date === date)) {
        error(n, `${date} isn’t one of this event’s dates (${dateList}). Dates are changed in the event’s details.`)
        section = { kind: 'skip' }
      } else if (activities.has(date)) {
        error(n, `${date} has two sections — keep one.`)
        section = { kind: 'skip' }
      } else {
        activities.set(date, [])
        section = { kind: 'day', date }
      }
      return
    }

    if (DETAIL_LINE.test(line)) {
      error(n, 'Event details (name, track, link…) aren’t edited here — remove this line.')
      return
    }

    switch (section.kind) {
      case 'none':
        error(n, 'Put this line under “## groups” or a day’s section.')
        return
      case 'skip':
        // The section's heading already has a problem.
        return
      case 'groups': {
        const group = parseGroupLine(line)
        if (!group) {
          error(n, 'A group line needs: id | Label | color | text color')
          return
        }
        if (!GROUP_ID.test(group.id)) {
          error(n, `Group id “${group.id}” can only have letters, numbers, - and _.`)
        } else if (groupIds.has(group.id)) {
          error(n, `There’s already a group “${group.id}”.`)
        } else if (!RUN_GROUP_BG_CLASSES.includes(group.bgClass)) {
          error(n, `“${group.bgClass}” isn’t one of the group colors (see Format help).`)
        } else if (!RUN_GROUP_TEXT_CLASSES.includes(group.textClass)) {
          error(n, `Text color must be ${RUN_GROUP_TEXT_CLASSES.join(' or ')}.`)
        } else if (!group.label) {
          error(n, 'The group needs a label.')
        } else {
          groupIds.add(group.id)
          runGroups.push(group)
        }
        return
      }
      case 'day': {
        const list = activities.get(section.date)!
        if (/^break\s*\|/.test(line)) {
          list.push({ type: 'break', label: line.slice(line.indexOf('|') + 1).trim() })
          return
        }
        const time = line.match(/^(\d{1,2}):(\d{2})\b/)
        if (!time) {
          error(n, 'Not a schedule line — start it with a time (07:00) or “break |”.')
          return
        }
        if (time[1].length !== 2 || Number(time[1]) > 23 || Number(time[2]) > 59) {
          error(n, `“${time[0]}” isn’t a time — use 24-hour HH:MM, e.g. 07:00 or 13:30.`)
          return
        }
        const activity = parseActivityLine(line)
        if (!activity || activity.type === 'break') {
          error(n, 'After the time, use general, lunch, special or session <n>.')
          return
        }
        if (activity.type !== 'session' && !activity.label) {
          error(n, 'Add a label after the |, e.g. “07:00 general | Registration”.')
          return
        }
        if (activity.type === 'session') {
          if (activity.onTrack.length === 0) warn(n, 'This session has no groups on track (“track: <group ids>”).')
          refs.push({ line: n, ids: [...activity.onTrack, ...(activity.inClass ?? [])] })
        }
        if (section.lastTime && minutes(activity.time) < minutes(section.lastTime)) {
          warn(n, `${activity.time} is earlier than the line before it (${section.lastTime}).`)
        }
        section.lastTime = activity.time
        list.push(activity)
        return
      }
    }
  })

  for (const { line, ids } of refs) {
    for (const id of ids) {
      if (!groupIds.has(id)) error(line, `There’s no group “${id}” in “## groups”.`)
    }
  }
  for (const day of event.days) {
    if (!activities.has(day.date)) warn(undefined, `${day.label} (${formatDate(day.date)}) has no section, so it’ll have no schedule.`)
  }

  problems.sort((a, b) => (a.line ?? Infinity) - (b.line ?? Infinity))
  return {
    runGroups,
    days: event.days.map(d => ({ ...d, activities: activities.get(d.date) ?? [] })),
    problems,
  }
}

/** The event with the markdown's schedule, or why it can't be saved. */
export function applySchedule(
  event: EventConfig,
  src: string,
): { event: EventConfig; problems: ScheduleProblem[] } | { error: string; problems: ScheduleProblem[] } {
  const { runGroups, days, problems } = parseScheduleEdit(event, src)
  const blocking = problems.filter(p => p.blocking)
  if (blocking.length) {
    const first = blocking[0]
    return { error: `${first.line ? `Line ${first.line}: ` : ''}${first.message}`, problems }
  }
  return { event: { ...event, runGroups, days }, problems }
}
