import type { EventConfig, DaySchedule, ScheduleEvent, RunGroupConfig } from '../types'

export function parseScheduleMD(id: string, src: string): EventConfig {
  const lines = src.split('\n').map(l => l.trim())

  let name = ''
  let subtitle = ''
  const runGroups: RunGroupConfig[] = []
  const days: DaySchedule[] = []
  let currentDay: DaySchedule | null = null
  let inGroups = false

  for (const line of lines) {
    if (!line || line.startsWith('//')) continue

    if (line.startsWith('# ')) {
      name = line.slice(2).trim()
      continue
    }

    if (line.startsWith('subtitle:')) {
      subtitle = line.slice('subtitle:'.length).trim()
      continue
    }

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      if (heading.toLowerCase() === 'groups') {
        inGroups = true
        currentDay = null
        continue
      }
      // Day header: "Saturday | 2026-05-30"
      const parts = heading.split('|').map(s => s.trim())
      if (parts.length === 2 && /^\d{4}-\d{2}-\d{2}$/.test(parts[1])) {
        inGroups = false
        currentDay = {
          id: parts[0].toLowerCase().replace(/\s+/g, '-'),
          label: parts[0],
          date: parts[1],
          events: [],
        }
        days.push(currentDay)
      } else {
        inGroups = false
      }
      continue
    }

    if (inGroups) {
      const parts = line.split('|').map(s => s.trim())
      if (parts.length >= 4) {
        runGroups.push({ id: parts[0], label: parts[1], bgClass: parts[2], textClass: parts[3] })
      }
      continue
    }

    if (currentDay && /^\d{2}:\d{2}/.test(line)) {
      const event = parseEventLine(line)
      if (event) currentDay.events.push(event)
    }
  }

  return { id, name, subtitle, runGroups, days }
}

function parseEventLine(line: string): ScheduleEvent | null {
  const tokens = line.split('|').map(s => s.trim())
  const firstToken = tokens[0]
  const rest = tokens.slice(1)

  const m = firstToken.match(/^(\d{2}:\d{2})\s+(.+)$/)
  if (!m) return null

  const time = m[1]
  const typePart = m[2].trim()

  if (/^(general|lunch|special)$/.test(typePart)) {
    const type = typePart as 'general' | 'lunch' | 'special'
    const label = rest[0] ?? ''
    const subtitle = rest[1] || undefined
    return { time, type, label, ...(subtitle ? { subtitle } : {}) }
  }

  if (/^session/.test(typePart)) {
    const snMatch = typePart.match(/^session\s+(\d+)/)
    const sessionNumber = snMatch ? parseInt(snMatch[1], 10) : undefined

    let onTrack: string[] = []
    let inClass: string[] = []
    let note: string | undefined

    for (const token of rest) {
      if (token.startsWith('on:')) {
        onTrack = token.slice(3).trim().split(',').map(s => s.trim()).filter(Boolean)
      } else if (token.startsWith('in:')) {
        inClass = token.slice(3).trim().split(',').map(s => s.trim()).filter(Boolean)
      } else if (token.startsWith('note:')) {
        note = token.slice(5).trim()
      }
    }

    return {
      time,
      type: 'session',
      ...(sessionNumber !== undefined ? { sessionNumber } : {}),
      onTrack,
      ...(inClass.length ? { inClass } : {}),
      ...(note ? { note } : {}),
    }
  }

  return null
}
