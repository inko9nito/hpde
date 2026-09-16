import type {
  EventConfig, DaySchedule, ScheduleEvent, RunGroupConfig, DayWeather, Precipitation,
  SessionLog, TirePressureSet, InstructorEval, InstructorEvalSkills, MediaLink, MediaKind,
  EventVitals, CarConfigSnapshot,
} from '../types'

// A "key: value" line, used by every freeform-ish section below (vitals,
// car, weather, session logs). Lines that don't look like one of these
// are treated as a continuation of whatever freeform field came before —
// see `collectFreeform`.
const KEY_LINE = /^[a-zA-Z][a-zA-Z0-9_.=\- ]*:/

function isKeyLine(line: string): boolean {
  return KEY_LINE.test(line)
}

function parseKV(line: string): [string, string] | null {
  const idx = line.indexOf(':')
  if (idx === -1) return null
  const key = line.slice(0, idx).trim().toLowerCase()
  const value = line.slice(idx + 1).trim()
  return [key, value]
}

// Consumes subsequent lines as a continuation of a freeform field (notes,
// summaries, instructor comments) until a blank/heading/key-looking line
// ends it. Returns the joined text and the index to resume the main loop
// from. Lines are joined with a space since these fields read as wrapped
// prose, not line-by-line lists.
function collectFreeform(lines: string[], start: number, firstValue: string): { text: string; next: number } {
  const parts: string[] = []
  if (firstValue) parts.push(firstValue)
  let i = start
  while (i < lines.length) {
    const l = lines[i]
    if (!l || l.startsWith('#') || isKeyLine(l)) break
    parts.push(l)
    i++
  }
  return { text: parts.join(' ').trim(), next: i }
}

function parseCorners(value: string): TirePressureSet {
  const out: TirePressureSet = {}
  for (const m of value.matchAll(/\b(fl|fr|rl|rr)\s*=\s*([\d.]+)/gi)) {
    out[m[1].toLowerCase() as keyof TirePressureSet] = parseFloat(m[2])
  }
  return out
}

function parseNumber(value: string): number | undefined {
  const m = value.match(/-?[\d.]+/)
  return m ? parseFloat(m[0]) : undefined
}

function parseMediaLine(value: string): MediaLink | null {
  const parts = value.split('|').map(s => s.trim())
  if (parts.length < 3) return null
  const [kind, label, url] = parts
  if (!url) return null
  return { kind: kind as MediaKind, label, url }
}

const PRECIP_VALUES: Precipitation[] = ['dry', 'damp', 'light-rain', 'heavy-rain', 'mixed']

const SKILL_KEYS: Record<string, keyof InstructorEvalSkills> = {
  flags: 'flags',
  passing: 'passing',
  smoothinputs: 'smoothInputs',
  looksahead: 'looksAhead',
  consistency: 'consistency',
  carcontrol: 'carControl',
  pace: 'pace',
  referencepoints: 'referencePoints',
  trackawareness: 'trackAwareness',
}

type TopMode = 'none' | 'groups' | 'notes' | 'vitals' | 'media' | 'car' | 'day'
type DaySubMode = 'schedule' | 'weather' | 'session'

export function parseScheduleMD(id: string, src: string): EventConfig {
  const lines = src.split('\n').map(l => l.trim())

  let name = ''
  let subtitle = ''
  let link: string | undefined
  const runGroups: RunGroupConfig[] = []
  const days: DaySchedule[] = []
  let currentDay: DaySchedule | null = null

  let notes: string | undefined
  const vitals: EventVitals = {}
  const media: MediaLink[] = []
  const carConfig: CarConfigSnapshot = {}

  let mode: TopMode = 'none'
  let daySubMode: DaySubMode = 'schedule'
  let currentSessionLog: SessionLog | null = null

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line || line.startsWith('//')) { i++; continue }

    if (line.startsWith('# ')) {
      name = line.slice(2).trim()
      i++
      continue
    }

    if (mode === 'none' && line.startsWith('subtitle:')) {
      subtitle = line.slice('subtitle:'.length).trim()
      i++
      continue
    }

    if (mode === 'none' && line.startsWith('link:')) {
      link = line.slice('link:'.length).trim() || undefined
      i++
      continue
    }

    if (line.startsWith('### ')) {
      const heading = line.slice(4).trim().toLowerCase()
      if (mode === 'day' && currentDay) {
        if (heading === 'weather') {
          daySubMode = 'weather'
          currentDay.weather = currentDay.weather ?? {}
        } else {
          const sm = heading.match(/^session\s+(\d+)/)
          if (sm) {
            const sessionNumber = parseInt(sm[1], 10)
            currentDay.sessionLogs = currentDay.sessionLogs ?? []
            currentSessionLog = currentDay.sessionLogs.find(s => s.sessionNumber === sessionNumber) ?? null
            if (!currentSessionLog) {
              currentSessionLog = { sessionNumber }
              currentDay.sessionLogs.push(currentSessionLog)
            }
            daySubMode = 'session'
          } else {
            daySubMode = 'schedule'
          }
        }
      }
      i++
      continue
    }

    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim()
      const lower = heading.toLowerCase()
      currentSessionLog = null
      daySubMode = 'schedule'

      if (lower === 'groups') {
        mode = 'groups'
        currentDay = null
        i++
        continue
      }
      if (lower === 'notes') {
        mode = 'notes'
        currentDay = null
        i++
        continue
      }
      if (lower === 'vitals') {
        mode = 'vitals'
        currentDay = null
        i++
        continue
      }
      if (lower === 'media') {
        mode = 'media'
        currentDay = null
        i++
        continue
      }
      if (lower === 'car') {
        mode = 'car'
        currentDay = null
        i++
        continue
      }

      const parts = heading.split('|').map(s => s.trim())
      if (parts.length === 2 && /^\d{4}-\d{2}-\d{2}$/.test(parts[1])) {
        mode = 'day'
        currentDay = {
          id: parts[0].toLowerCase().replace(/\s+/g, '-'),
          label: parts[0],
          date: parts[1],
          events: [],
        }
        days.push(currentDay)
      } else {
        mode = 'none'
        currentDay = null
      }
      i++
      continue
    }

    if (mode === 'groups') {
      const parts = line.split('|').map(s => s.trim())
      if (parts.length >= 4) {
        const description = parts[4] || undefined
        runGroups.push({
          id: parts[0],
          label: parts[1],
          bgClass: parts[2],
          textClass: parts[3],
          ...(description ? { description } : {}),
        })
      }
      i++
      continue
    }

    if (mode === 'notes') {
      notes = notes ? `${notes}\n${line}` : line
      i++
      continue
    }

    if (mode === 'vitals') {
      const kv = parseKV(line)
      if (kv) {
        const [key, value] = kv
        if (key === 'attended') {
          vitals.attended = value.split(',').map(s => s.trim()).filter(Boolean)
          i++
        } else if (key === 'summary') {
          const { text, next } = collectFreeform(lines, i + 1, value)
          vitals.summary = text || undefined
          i = next
        } else {
          i++
        }
      } else {
        i++
      }
      continue
    }

    if (mode === 'media') {
      const link = parseMediaLine(line)
      if (link) media.push(link)
      i++
      continue
    }

    if (mode === 'car') {
      const kv = parseKV(line)
      if (kv) {
        const [key, value] = kv
        if (key === 'tires') carConfig.tires = value
        else if (key === 'brakes') carConfig.brakes = value
        else if (key === 'ride height' || key === 'rideheight') carConfig.rideHeight = value
        else if (key === 'alignment') carConfig.alignment = value
        else if (key === 'aids') carConfig.aids = value
      }
      i++
      continue
    }

    if (mode === 'day' && currentDay) {
      if (daySubMode === 'weather' && currentDay.weather) {
        const kv = parseKV(line)
        if (kv) {
          const [key, value] = kv
          const weather = currentDay.weather as DayWeather
          if (key === 'high') weather.highF = parseNumber(value)
          else if (key === 'low') weather.lowF = parseNumber(value)
          else if (key === 'track') weather.trackTempF = parseNumber(value)
          else if (key === 'precip') {
            const v = value.toLowerCase() as Precipitation
            if (PRECIP_VALUES.includes(v)) weather.precipitation = v
          } else if (key === 'notes') {
            const { text, next } = collectFreeform(lines, i + 1, value)
            weather.notes = text || undefined
            i = next
            continue
          }
        }
        i++
        continue
      }

      if (daySubMode === 'session' && currentSessionLog) {
        const kv = parseKV(line)
        if (kv) {
          const [key, value] = kv
          const log = currentSessionLog

          if (key === 'notes') {
            const { text, next } = collectFreeform(lines, i + 1, value)
            log.notes = text || undefined
            i = next
            continue
          }
          if (key === 'tires cold' || key === 'tires hot') {
            log.tirePressures = log.tirePressures ?? {}
            const corners = parseCorners(value)
            if (key === 'tires cold') log.tirePressures.cold = corners
            else log.tirePressures.hot = corners
          } else if (key === 'tires unit') {
            log.tirePressures = log.tirePressures ?? {}
            if (value === 'psi' || value === 'bar') log.tirePressures.unit = value
          } else if (key === 'aids') {
            log.carAids = value
          } else if (key === 'media') {
            const parsed = parseMediaLine(value)
            if (parsed) log.media = [...(log.media ?? []), parsed]
          } else if (key.startsWith('eval.')) {
            const evalKey = key.slice('eval.'.length)
            log.instructorEval = log.instructorEval ?? {}
            const evalObj: InstructorEval = log.instructorEval

            if (evalKey === 'track') evalObj.track = value
            else if (evalKey === 'instructor') evalObj.instructor = value
            else if (evalKey === 'student') evalObj.student = value
            else if (evalKey === 'car') evalObj.car = value
            else if (evalKey === 'aggressiveness=skill') {
              evalObj.aggressivenessEqualsSkill = /^y/i.test(value)
            } else if (evalKey === 'aidsoveractivated') {
              evalObj.aidsOveractivatedPct = parseNumber(value)
            } else if (evalKey === 'recommend.samedirection') {
              evalObj.recommend = { ...evalObj.recommend, sameDirection: value }
            } else if (evalKey === 'recommend.newdirection') {
              evalObj.recommend = { ...evalObj.recommend, newDirection: value }
            } else if (evalKey === 'recommend.newtrack') {
              evalObj.recommend = { ...evalObj.recommend, newTrack: value }
            } else if (evalKey === 'notes') {
              const { text, next } = collectFreeform(lines, i + 1, value)
              evalObj.notes = text || undefined
              i = next
              continue
            } else if (evalKey.startsWith('skill.')) {
              const skillKey = SKILL_KEYS[evalKey.slice('skill.'.length)]
              if (skillKey) {
                evalObj.skills = evalObj.skills ?? {}
                evalObj.skills[skillKey] = parseNumber(value)
              }
            }
          }
        }
        i++
        continue
      }

      // daySubMode === 'schedule' (default)
      if (/^\d{2}:\d{2}/.test(line)) {
        const event = parseEventLine(line)
        if (event) currentDay.events.push(event)
      } else if (/^break\s*\|/.test(line)) {
        const label = line.slice(line.indexOf('|') + 1).trim()
        currentDay.events.push({ type: 'break', label })
      }
      i++
      continue
    }

    i++
  }

  return {
    id,
    name,
    subtitle,
    ...(link ? { link } : {}),
    runGroups,
    days,
    ...(notes ? { notes } : {}),
    ...(Object.keys(vitals).length ? { vitals } : {}),
    ...(media.length ? { media } : {}),
    ...(Object.keys(carConfig).length ? { carConfig } : {}),
  }
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
        note = token.slice(5).trim() || undefined
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
