import { parseActivityLine } from './parseSchedule'
import { RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from '../theme/runGroupColors'
import type { DaySchedule, EventConfig, RunGroupConfig, ScheduleActivity } from '../types'

// The schedule editor (#232). An event's day-by-day schedule is markdown,
// in the format the event files used — one `## <Day> | YYYY-MM-DD` section
// per day. Its run groups come from the schedule: every group a session
// names gets a color picked from its name (see deriveGroups), which the
// editor lets you change, along with a description. The event's details
// (name, dates, track…) are edited elsewhere, so the days are fixed: each
// section fills in one of the event's own dates.
//
// Shared by the editor page (live preview) and the events function (which
// checks what it's sent itself before saving).

export interface ScheduleProblem {
  // 1-based line in the markdown, when the problem is on one line…
  line?: number
  // …or the 0-based index of the run group it's about.
  group?: number
  message: string
  // Blocking problems stop a save; the rest are worth a look.
  blocking: boolean
}

// A run group as the editor handles it. `id` is what the stored schedule
// refers to; groups that have been saved keep theirs, new ones get one from
// their name. The text color isn't offered: the palette is picked for white.
export interface GroupInput {
  id?: string
  label: string
  description?: string
  bgClass: string
  textClass?: string
}

const MAX_GROUPS = 20
const MAX_LABEL = 40
const MAX_DESCRIPTION = 80
const GROUP_ID = /^[a-z0-9][a-z0-9_-]*$/i
const DATE = /^\d{4}-\d{2}-\d{2}$/
// Lines that belong to the event's details, not its schedule.
const DETAIL_LINE = /^(# |(subtitle|link|organizer|track|city|configuration|config|direction|trackId):)/

const EXAMPLE_GROUPS = ['Novice', 'Intermediate']

// A color named in a group's name picks it ("Red", "Blue group"); so does
// a role that's conventionally black. Otherwise a group gets the first
// palette color no other group has.
const NAMED_COLORS: [RegExp, string][] = [
  [/\bred\b/i, 'bg-runred-500'],
  [/\borange\b/i, 'bg-runorange-500'],
  [/\byellow\b/i, 'bg-runyellow-500'],
  [/\bgreen\b/i, 'bg-rungreen-500'],
  [/\bblue\b/i, 'bg-runblue-500'],
  [/\bpink\b/i, 'bg-runpink-500'],
  [/\bpurple\b/i, 'bg-runpurple-500'],
  [/\bbrown\b/i, 'bg-runbrown-500'],
  [/\bgr[ae]y\b/i, 'bg-rungray-500'],
  [/\btan\b/i, 'bg-runtan-500'],
  [/\b(black|instructors?|staff|coach(es)?)\b/i, 'bg-zinc-900'],
]

export function suggestColor(name: string, taken: Iterable<string> = []): string {
  const named = NAMED_COLORS.find(([re]) => re.test(name))
  if (named) return named[1]
  const used = new Set(taken)
  // The rest of the palette, before black (kept for instructors).
  const palette = RUN_GROUP_BG_CLASSES.filter(c => c !== 'bg-zinc-900')
  return palette.find(c => !used.has(c)) ?? palette[0]
}

/**
 * The group names the schedule's sessions use (`track:` and `class:`), in
 * the order they first appear, each spelled as it first appears.
 */
export function scheduleGroupNames(src: string): string[] {
  const names = new Map<string, string>()
  for (const raw of src.split('\n')) {
    const line = raw.trim().replace(/^-\s+/, '')
    if (!/^\d{1,2}:\d{2}\s+session\b/.test(line)) continue
    const activity = parseActivityLine(line.replace(/^(\d):/, '0$1:'))
    if (activity?.type !== 'session') continue
    for (const name of [...activity.onTrack, ...(activity.inClass ?? [])]) {
      if (!names.has(name.toLowerCase())) names.set(name.toLowerCase(), name)
    }
  }
  return [...names.values()]
}

function sameGroup(g: GroupInput, name: string): boolean {
  const n = name.toLowerCase()
  return g.label.toLowerCase() === n || (!!g.id && g.id.toLowerCase() === n)
}

/**
 * The run groups for a schedule: one per group name its sessions use.
 * `settings` holds what's known about groups — the event's saved ones, and
 * any whose color or description was set in the editor — and a name
 * that matches one (by name or id, any case) takes it. Saved groups keep
 * their order; the rest follow in the order the schedule first names them,
 * each with a color picked from its name. Names no longer in the schedule
 * are left out.
 */
export function deriveGroups(src: string, settings: GroupInput[]): GroupInput[] {
  const names = scheduleGroupNames(src)
  const saved = settings.filter(g => g.id && names.some(n => sameGroup(g, n)))
  const rest = names.filter(n => !saved.some(g => sameGroup(g, n)))
  const known = new Map(rest.map(name => [name, settings.find(g => sameGroup(g, name))]))
  // Colors already spoken for — saved or set groups', and the ones named in
  // group names ("Red") — so "Novice" isn't handed the red "Red" needs.
  const taken = new Set([
    ...saved.map(g => g.bgClass),
    ...rest.map(name => known.get(name)?.bgClass ?? NAMED_COLORS.find(([re]) => re.test(name))?.[1]),
  ].filter((c): c is string => !!c))
  return [
    ...saved,
    ...rest.map(name => {
      const group = known.get(name) ?? { label: name, bgClass: suggestColor(name, taken) }
      taken.add(group.bgClass)
      return group
    }),
  ]
}

function slug(s: string): string {
  return s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
}

function text(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric',
  })
}

/**
 * The form's groups as stored run groups, and what's wrong with them.
 * Accepts anything (the function passes on what it was sent).
 */
export function normalizeGroups(inputs: unknown): { runGroups: RunGroupConfig[]; problems: ScheduleProblem[] } {
  const problems: ScheduleProblem[] = []
  const error = (group: number, message: string) => problems.push({ group, message, blocking: true })
  const list = Array.isArray(inputs) ? inputs : []
  if (list.length > MAX_GROUPS) problems.push({ message: `An event can have at most ${MAX_GROUPS} groups.`, blocking: true })

  const names = new Set<string>()
  const ids = new Set<string>()
  // Saved groups keep their ids, so claim those first.
  for (const g of list) {
    const id = text((g as GroupInput)?.id)
    if (GROUP_ID.test(id)) ids.add(id)
  }

  const runGroups = list.slice(0, MAX_GROUPS).map((g: Partial<GroupInput>, i): RunGroupConfig => {
    const label = text(g?.label)
    const description = text(g?.description)
    const bgClass = text(g?.bgClass)
    const textClass = text(g?.textClass) || 'text-white'
    if (!label) error(i, 'Give this group a name.')
    else if (label.length > MAX_LABEL) error(i, `Keep the name under ${MAX_LABEL} characters.`)
    else if (names.has(label.toLowerCase())) error(i, `There’s already a group named “${label}”.`)
    if (label) names.add(label.toLowerCase())
    if (!RUN_GROUP_BG_CLASSES.includes(bgClass)) error(i, 'Pick a color.')
    if (!RUN_GROUP_TEXT_CLASSES.includes(textClass)) error(i, 'That text color isn’t available.')
    if (description.length > MAX_DESCRIPTION) error(i, `Keep the description under ${MAX_DESCRIPTION} characters.`)

    let id = text(g?.id)
    if (!GROUP_ID.test(id)) {
      const base = slug(label) || 'group'
      id = base
      for (let n = 2; ids.has(id); n++) id = `${base}-${n}`
      ids.add(id)
    }
    return { id, label, bgClass, textClass, ...(description ? { description } : {}) }
  })
  return { runGroups, problems }
}

function activityLine(a: ScheduleActivity, names: Map<string, string>): string {
  if (a.type === 'break') return `break | ${a.label}`
  if (a.type === 'session') {
    const list = (ids: string[]) => ids.map(id => names.get(id) ?? id).join(', ')
    const parts = [`${a.time} session${a.sessionNumber !== undefined ? ` ${a.sessionNumber}` : ''}`]
    parts.push(`track: ${list(a.onTrack)}`)
    if (a.inClass?.length) parts.push(`class: ${list(a.inClass)}`)
    if (a.note) parts.push(`note: ${a.note}`)
    return parts.join(' | ')
  }
  return [`${a.time} ${a.type}`, a.label, ...(a.subtitle ? [a.subtitle] : [])].join(' | ')
}

/**
 * The event's schedule as editor markdown: a section per day, each
 * starting with commented-out example lines (`//`) to copy — remove the
 * `//` to use one. Comments aren't saved; they're written fresh each time.
 * Sessions name their groups by name.
 */
export function scheduleToMarkdown(event: EventConfig): string {
  const names = new Map(event.runGroups.map(g => [g.id, g.label]))
  const examples = event.runGroups.length >= 2 ? event.runGroups.slice(-2).map(g => g.label) : EXAMPLE_GROUPS
  const out: string[] = [
    '// Lines starting with // are examples and notes, and aren’t saved.',
    '// Remove the // to use one.',
  ]
  for (const day of event.days) {
    out.push(
      '',
      `## ${day.label} | ${day.date}`,
      '// 07:00 general | Registration & tech | Paddock',
      `// 08:00 session 1 | track: ${examples[0]} | class: ${examples[1]} | note: Lead-follow`,
      '// 12:00 lunch | Lunch',
      '// break | Track walk',
      ...day.activities.map(a => activityLine(a, names)),
    )
  }
  return out.join('\n') + '\n'
}

function minutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Reads the schedule markdown against the event and its groups. Stricter
 * than parseScheduleMD, which silently drops whatever it doesn't
 * understand: here every line that would be lost is a blocking problem,
 * with its line number, so nothing typed disappears on save. Sessions name
 * groups by name (any case) or id; they're stored by id.
 */
export function parseScheduleEdit(
  event: EventConfig,
  runGroups: RunGroupConfig[],
  src: string,
): { days: DaySchedule[]; problems: ScheduleProblem[] } {
  const problems: ScheduleProblem[] = []
  const error = (line: number | undefined, message: string) => problems.push({ line, message, blocking: true })
  const warn = (line: number | undefined, message: string) => problems.push({ line, message, blocking: false })

  // By name first, then by id (any case).
  const groupFor = (name: string) =>
    runGroups.find(g => g.label.toLowerCase() === name.toLowerCase())
    ?? runGroups.find(g => g.id.toLowerCase() === name.toLowerCase())
  const activities = new Map<string, ScheduleActivity[]>()
  const dateList = event.days.map(d => formatDate(d.date)).join(', ')

  type Section = { kind: 'none' } | { kind: 'day'; date: string; lastTime?: string } | { kind: 'skip' }
  let section: Section = { kind: 'none' }

  src.split('\n').forEach((raw, i) => {
    const n = i + 1
    const trimmed = raw.trim()
    if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('```')) return
    const line = trimmed.replace(/^-\s+/, '')

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      if (heading.toLowerCase() === 'groups') {
        error(n, 'Run groups come from the sessions, with their colors below — remove this section.')
        section = { kind: 'skip' }
        return
      }
      const parts = heading.split('|').map(s => s.trim())
      if (parts.length !== 2 || !DATE.test(parts[1])) {
        error(n, `“${line}” isn’t a day — use “## <Day> | YYYY-MM-DD”.`)
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

    if (section.kind === 'none') {
      error(n, 'Put this line under a day, “## <Day> | YYYY-MM-DD”.')
      return
    }
    // The section's heading already has a problem.
    if (section.kind === 'skip') return

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
      const resolve = (names: string[]) => names.flatMap(name => {
        const group = groupFor(name)
        if (!group) error(n, `There’s no group “${name}”.`)
        return group ? [group.id] : []
      })
      activity.onTrack = resolve(activity.onTrack)
      if (activity.inClass) activity.inClass = resolve(activity.inClass)
      if (activity.onTrack.length === 0 && !problems.some(p => p.line === n)) {
        warn(n, 'This session has no groups on track (“track: <group names>”).')
      }
    }
    if (section.lastTime && minutes(activity.time) < minutes(section.lastTime)) {
      warn(n, `${activity.time} is earlier than the line before it (${section.lastTime}).`)
    }
    section.lastTime = activity.time
    list.push(activity)
  })

  for (const day of event.days) {
    if (!activities.has(day.date)) warn(undefined, `${day.label} (${formatDate(day.date)}) has no section, so it’ll have no schedule.`)
  }

  problems.sort((a, b) => (a.line ?? Infinity) - (b.line ?? Infinity))
  return {
    days: event.days.map(d => ({ ...d, activities: activities.get(d.date) ?? [] })),
    problems,
  }
}

/** Groups, then the schedule, with every problem from both. */
export function readScheduleEdit(event: EventConfig, groups: unknown, src: string) {
  const g = normalizeGroups(groups)
  const s = parseScheduleEdit(event, g.runGroups, src)
  return { runGroups: g.runGroups, days: s.days, problems: [...g.problems, ...s.problems] }
}

export function describeProblem(p: ScheduleProblem): string {
  const where = p.line ? `Line ${p.line}: ` : p.group !== undefined ? `Group ${p.group + 1}: ` : ''
  return where + p.message
}

/** The event with the new groups and schedule, or why it can't be saved. */
export function applySchedule(
  event: EventConfig,
  groups: unknown,
  src: string,
): { event: EventConfig; problems: ScheduleProblem[] } | { error: string; problems: ScheduleProblem[] } {
  const { runGroups, days, problems } = readScheduleEdit(event, groups, src)
  const blocking = problems.find(p => p.blocking)
  if (blocking) return { error: describeProblem(blocking), problems }
  return { event: { ...event, runGroups, days }, problems }
}
