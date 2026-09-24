// Lap times logged against a session (#210). Everything about reading what
// a driver pastes, showing it and checking it lives here, so the lap-times
// sheet (live preview) and the laps function (which checks what it's sent
// before saving) read the same thing the same way.
//
// A paste can be any of:
//   - a comma-separated list, or a column:          1:39.42, 1:38.91, 1:39.08
//   - rows copied from a spreadsheet (tab-separated), in the order
//     lap, start crossing, finish crossing, lap time, note:
//         Out   11:46:32 AM   11:48:51 AM   2:19   Behind the Fit
//         1     11:48:51 AM   11:50:47 AM   1:56
//     Any of the columns can be missing. A lap with no lap time takes the
//     gap between its crossings.
//   - start/finish crossings: clock times (9:52:49 AM) or video timestamps
//     (0:02:13), one after another, in a list or a column. Each gap is a lap.
// Header, title and summary rows ("Lap  Start  Finish…", "Laps 10 Best
// 1:48") are passed over, and listed as such, so nothing is dropped quietly.

export interface Lap {
  /** The lap time, in milliseconds. */
  ms: number
  /** An out or in lap: listed, but not counted in the best or the average. */
  kind?: 'out' | 'in'
  /** Start and finish crossings as written, e.g. "9:52:49 AM" or "~2:32:44 PM". */
  start?: string
  end?: string
  note?: string
}

/** One session's laps, for one run group's slot in the schedule. */
export interface SessionLaps {
  /** `${date} ${time} ${group}` — see sessionKey. */
  key: string
  /** The day, "YYYY-MM-DD". */
  date: string
  /** The session's start time, "HH:MM" (24-hour), as the schedule has it. */
  time: string
  /** The run group's id. */
  group: string
  /** Kept so the laps still read "Session 3" if the schedule changes later. */
  sessionNumber?: number
  laps: Lap[]
  updatedAt?: string
}

/**
 * Identifies a run group's session: its day, start time and group. Laps
 * aren't tied to the schedule's order, so they stay put when an admin adds
 * or removes other lines.
 */
export function sessionKey(date: string, time: string, group: string): string {
  return `${date} ${time} ${group}`
}

// Shortest and longest lap the reader believes. Anything outside is far more
// likely a typo, or a clock time read as a lap time, than a real lap.
export const MIN_LAP_MS = 10_000
export const MAX_LAP_MS = 10 * 60_000
export const MAX_LAPS = 200
export const MAX_NOTE = 500
const MAX_CROSSING = 24

/** "1:56", "1:39.42", "0:58.3". Whole seconds unless the time has more. */
export function formatLapTime(ms: number, decimals?: number): string {
  const totalSeconds = ms / 1000
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60
  let text: string
  if (decimals !== undefined) {
    text = seconds.toFixed(decimals)
    // 59.96 rounds up to "60.0": carry it into the minutes.
    if (Number(text) >= 60) return formatLapTime((minutes + 1) * 60_000, decimals)
  } else {
    const whole = Math.floor(seconds)
    const fraction = Math.round((seconds - whole) * 1000)
    text = String(whole) + (fraction ? `.${String(fraction).padStart(3, '0').replace(/0+$/, '')}` : '')
  }
  const [whole, fraction] = text.split('.')
  return `${minutes}:${whole.padStart(2, '0')}${fraction !== undefined ? `.${fraction}` : ''}`
}

export interface LapStats {
  /** Laps that count: everything but out and in laps. */
  count: number
  best?: number
  /** Index into the laps of the best one (the first, when tied). */
  bestIndex?: number
  average?: number
}

export function lapStats(laps: Lap[]): LapStats {
  let count = 0
  let total = 0
  let best: number | undefined
  let bestIndex: number | undefined
  laps.forEach((lap, i) => {
    if (lap.kind) return
    count++
    total += lap.ms
    if (best === undefined || lap.ms < best) {
      best = lap.ms
      bestIndex = i
    }
  })
  return count ? { count, best, bestIndex, average: total / count } : { count }
}

/**
 * The average to one decimal more than the laps themselves have, the way a
 * timing sheet shows it: 1:51.0 for whole-second laps, 1:39.137 for laps to
 * the hundredth.
 */
export function formatAverage(laps: Lap[], average: number): string {
  const decimals = Math.max(0, ...laps.map(lap => {
    const fraction = lap.ms % 1000
    if (!fraction) return 0
    return String(fraction).padStart(3, '0').replace(/0+$/, '').length
  }))
  return formatLapTime(average, Math.min(3, decimals + 1))
}

/** A lap's label in a list: its number among the laps that count, or Out / In. */
export function lapLabels(laps: Lap[]): string[] {
  let n = 0
  return laps.map(lap => (lap.kind === 'out' ? 'Out' : lap.kind === 'in' ? 'In' : String(++n)))
}

// --- Reading a paste --------------------------------------------------------

export type ReadAs = 'laps' | 'timestamps'

export interface PasteProblem {
  /** 1-based line of the paste. */
  line: number
  text: string
  message: string
}

export interface ParsedLaps {
  laps: Lap[]
  /** Lines that couldn't be read. Saving waits until there are none. */
  errors: PasteProblem[]
  /** Headers, titles and summary rows, passed over on purpose. */
  skipped: PasteProblem[]
  /**
   * A plain list of increasing times like 2:13, 4:09, 5:57 could be lap
   * times or video timestamps. The sheet offers to switch when it is.
   */
  ambiguous: boolean
  readAs: ReadAs
}

type Cell =
  | { type: 'duration'; ms: number; raw: string }
  | { type: 'crossing'; seconds: number; raw: string }
  | { type: 'number'; raw: string }
  | { type: 'kind'; kind: 'out' | 'in'; raw: string }
  | { type: 'text'; raw: string }

// 9:52:49 AM, ~2:32:44 pm, 2:30 PM — a time of day.
const CLOCK = /^(~)?\s*(\d{1,2}):(\d{2})(?::(\d{2})(?:\.(\d{1,3}))?)?\s*([ap])\.?\s?m\.?$/i
// 0:02:13, 13:30:05 — a video timestamp, or a 24-hour time of day.
const HMS = /^(~)?\s*(\d{1,2}):(\d{2}):(\d{2})(?:\.(\d{1,3}))?$/
// 1:56, 1:39.42, 58.31 — a lap time.
const DURATION = /^(~)?\s*(?:(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?|(\d{1,3})\.(\d{1,3}))$/
const LAP_NUMBER = /^(?:lap\s*)?#?\d{1,3}\.?$/i
const KIND = /^(?:(out|in)(?:[\s-]*lap)?|(ol|il))$/i

function millis(fraction: string | undefined): number {
  return fraction ? Number(fraction.padEnd(3, '0')) : 0
}

function readCell(raw: string, readAs: ReadAs): Cell {
  let m = CLOCK.exec(raw)
  if (m) {
    const [, , h, min, s, fraction, ampm] = m
    const hour = (Number(h) % 12) + (ampm.toLowerCase() === 'p' ? 12 : 0)
    if (Number(h) <= 12 && Number(min) < 60 && Number(s ?? 0) < 60) {
      return { type: 'crossing', seconds: hour * 3600 + Number(min) * 60 + Number(s ?? 0) + millis(fraction) / 1000, raw }
    }
  }
  m = HMS.exec(raw)
  if (m) {
    const [, , h, min, s, fraction] = m
    if (Number(min) < 60 && Number(s) < 60) {
      return { type: 'crossing', seconds: Number(h) * 3600 + Number(min) * 60 + Number(s) + millis(fraction) / 1000, raw }
    }
  }
  m = DURATION.exec(raw)
  if (m) {
    const [, , min, sec, fraction, bareSec, bareFraction] = m
    const ms = min !== undefined
      ? Number(min) * 60_000 + Number(sec) * 1000 + millis(fraction)
      : Number(bareSec) * 1000 + millis(bareFraction)
    if (min === undefined || Number(sec) < 60) {
      // Read as timestamps, a plain list's m:ss values are crossings.
      return readAs === 'timestamps' ? { type: 'crossing', seconds: ms / 1000, raw } : { type: 'duration', ms, raw }
    }
  }
  if (LAP_NUMBER.test(raw)) return { type: 'number', raw }
  m = KIND.exec(raw)
  if (m) {
    const word = (m[1] ?? m[2]).toLowerCase()
    return { type: 'kind', kind: word === 'out' || word === 'ol' ? 'out' : 'in', raw }
  }
  return { type: 'text', raw }
}

/**
 * Splits a line into cells: tabs (a spreadsheet row) first, then commas,
 * semicolons or bars, then spaces — keeping "9:52:49 AM" in one piece.
 */
function splitLine(line: string): { cells: string[]; joiner: string } {
  if (line.includes('\t')) return { cells: line.split('\t').map(c => c.trim()), joiner: ' ' }
  const sep = /[,;|]/.exec(line)?.[0]
  if (sep) return { cells: line.split(sep).map(c => c.trim()), joiner: `${sep === '|' ? ' |' : sep} ` }
  const cells: string[] = []
  for (const word of line.trim().split(/\s+/)) {
    if (/^[ap]\.?m\.?$/i.test(word) && cells.length && /\d$/.test(cells[cells.length - 1])) {
      cells[cells.length - 1] += ` ${word}`
    } else if (cells.length && cells[cells.length - 1] === '~') {
      cells[cells.length - 1] += word
    } else {
      cells.push(word)
    }
  }
  return { cells, joiner: ' ' }
}

function checkLap(ms: number): string | null {
  if (ms < MIN_LAP_MS) return `${formatLapTime(ms)} is too short for a lap.`
  if (ms > MAX_LAP_MS) return `${formatLapTime(Math.round(ms))} is too long for a lap.`
  return null
}

type Crossing = Extract<Cell, { type: 'crossing' }>

function gap(start: Crossing, end: Crossing): number {
  return Math.round((end.seconds - start.seconds) * 1000)
}

interface Reading {
  laps: Lap[]
  errors: PasteProblem[]
  skipped: PasteProblem[]
  /** Only lap times, as a list or a column: no rows, no crossings. */
  plainList: boolean
  /** …each one longer than the one before. */
  plainIncreasing: boolean
}

function read(text: string, readAs: ReadAs): Reading {
  const laps: Lap[] = []
  const errors: PasteProblem[] = []
  const skipped: PasteProblem[] = []
  // Crossings from list lines, read as one run — each gap is a lap — and
  // put in with the laps where the first one fell.
  const crossings: { cell: Crossing; line: number; text: string }[] = []
  let crossingsAt = -1
  let rows = 0
  const listed: number[] = []
  let sessionTitles = 0

  const lines = text.split(/\r?\n/)
  lines.forEach((rawLine, i) => {
    const line = i + 1
    const lineText = rawLine.trim()
    const { cells: rawCells, joiner } = splitLine(rawLine)
    const cells = rawCells.filter(Boolean).map(raw => readCell(raw, readAs))
    if (cells.length === 0) return
    const problem = (message: string) => { errors.push({ line, text: lineText, message }) }

    const [first] = cells
    const labelled = first.type === 'number' || first.type === 'kind'
    const rest = labelled ? cells.slice(1) : cells
    const durations = rest.filter(c => c.type === 'duration')
    const times = rest.filter((c): c is Crossing => c.type === 'crossing')
    const others = rest.filter(c => c.type !== 'duration' && c.type !== 'crossing')
    // A spreadsheet row: a lap number or Out/In first, or crossings with a
    // lap time, or a start and a finish on a line of their own.
    const isRow = labelled
      || (times.length > 0 && durations.length > 0)
      || (times.length === 2 && cells.length === 2)

    // Titles, headers and totals start with a word. A line that starts
    // with something else, like a mistyped time, is flagged, not passed over.
    if (!isRow && first.type === 'text' && /^\p{L}/u.test(first.raw)) {
      if (/^session\b/i.test(first.raw)) sessionTitles++
      skipped.push({ line, text: lineText, message: 'Not a lap' })
      return
    }

    if (isRow) {
      rows++
      if (durations.length > 1) return problem('More than one lap time on this line.')
      if (times.length > 2) return problem('More than a start and a finish on this line.')
      const ms = durations.length === 1 ? (durations[0] as { ms: number }).ms
        : times.length === 2 ? gap(times[0], times[1])
        : undefined
      if (ms === undefined) return problem('No lap time on this line.')
      const bad = checkLap(ms)
      if (bad) return problem(bad)
      const note = others.map(c => c.raw).join(joiner).trim()
      if (note.length > MAX_NOTE) return problem(`Notes can be up to ${MAX_NOTE} characters.`)
      const lap: Lap = { ms }
      if (first.type === 'kind') lap.kind = first.kind
      if (times[0]) lap.start = times[0].raw
      if (times[1]) lap.end = times[1].raw
      if (note) lap.note = note
      laps.push(lap)
      return
    }

    // A list: lap times, or crossings, and nothing else.
    const unreadable = cells.find(c => c.type !== 'duration' && c.type !== 'crossing')
    if (unreadable) return problem(`Couldn’t read “${unreadable.raw}” as a time.`)
    if (durations.length && times.length) return problem('Lap times and crossing times mixed on one line.')
    for (const c of durations) {
      const { ms } = c as { ms: number }
      const bad = checkLap(ms)
      if (bad) {
        problem(bad)
        continue
      }
      listed.push(ms)
      laps.push({ ms })
    }
    for (const cell of times) {
      if (crossingsAt === -1) crossingsAt = laps.length
      crossings.push({ cell, line, text: lineText })
    }
  })

  if (crossings.length === 1) {
    const [{ line, text }] = crossings
    errors.push({ line, text, message: 'One crossing time isn’t a lap: add the next one.' })
  }
  const fromCrossings: Lap[] = []
  for (let i = 1; i < crossings.length; i++) {
    const ms = gap(crossings[i - 1].cell, crossings[i].cell)
    const { line, text } = crossings[i]
    const bad = ms <= 0 ? 'This time is before the one above it.' : checkLap(ms)
    if (bad) {
      errors.push({ line, text, message: bad })
      continue
    }
    fromCrossings.push({ ms, start: crossings[i - 1].cell.raw, end: crossings[i].cell.raw })
  }
  if (crossingsAt !== -1) laps.splice(crossingsAt, 0, ...fromCrossings)

  if (sessionTitles > 1) {
    errors.push({ line: 1, text: '', message: 'That looks like more than one session. Paste one session at a time.' })
  }
  if (laps.length > MAX_LAPS) {
    errors.push({ line: 1, text: '', message: `That’s more than ${MAX_LAPS} laps. Paste one session at a time.` })
  }
  errors.sort((a, b) => a.line - b.line)

  const plainList = rows === 0 && crossingsAt === -1
  const plainIncreasing = plainList && listed.length >= 2 && listed.every((ms, i) => i === 0 || ms > listed[i - 1])
  return { laps, errors, skipped, plainList, plainIncreasing }
}

/**
 * Reads a paste into laps. `readAs` settles a plain list of increasing m:ss
 * values — lap times or video timestamps; left out, it's lap times unless
 * they only make sense as timestamps (one of them is longer than any lap).
 */
export function parseLapTimes(text: string, readAs?: ReadAs): ParsedLaps {
  if (readAs) {
    const asLaps = read(text, 'laps')
    // Only a plain list can be read either way; anything else reads as laps.
    const ambiguous = asLaps.plainIncreasing || isTimestampList(text)
    const result = readAs === 'timestamps' && ambiguous ? read(text, 'timestamps') : asLaps
    return { laps: result.laps, errors: result.errors, skipped: result.skipped, ambiguous, readAs: ambiguous ? readAs : 'laps' }
  }
  if (isTimestampList(text)) return parseLapTimes(text, 'timestamps')
  return parseLapTimes(text, 'laps')
}

/**
 * A plain list of m:ss values that only reads as video timestamps: as lap
 * times, some are longer than any lap; as timestamps, it all reads.
 */
function isTimestampList(text: string): boolean {
  const asLaps = read(text, 'laps')
  if (!asLaps.plainList || !asLaps.errors.some(e => /too long for a lap/.test(e.message))) return false
  const asTimestamps = read(text, 'timestamps')
  return asTimestamps.errors.length === 0 && asTimestamps.laps.length > 0
}

/**
 * The laps as text the sheet can show for editing, which reads back as the
 * same laps: a comma-separated list when they're plain times, spreadsheet
 * rows (lap, start, finish, time, note) when there's more to them.
 */
export function lapsToText(laps: Lap[]): string {
  const plain = laps.every(lap => !lap.kind && !lap.start && !lap.end && !lap.note)
  if (plain) return laps.map(lap => formatLapTime(lap.ms)).join(', ')
  const labels = lapLabels(laps)
  return laps
    .map((lap, i) => [labels[i], lap.start ?? '', lap.end ?? '', formatLapTime(lap.ms), lap.note ?? ''].join('\t').replace(/\t+$/, ''))
    .join('\n')
}

// --- Checking what's sent to be saved ----------------------------------------

const DATE = /^\d{4}-\d{2}-\d{2}$/
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/
const GROUP = /^[a-z0-9][a-z0-9-]{0,39}$/

function cleanLap(value: unknown): Lap | null {
  const lap = value as Lap
  if (!lap || typeof lap !== 'object') return null
  if (!Number.isInteger(lap.ms) || lap.ms < MIN_LAP_MS || lap.ms > MAX_LAP_MS) return null
  const out: Lap = { ms: lap.ms }
  if (lap.kind !== undefined) {
    if (lap.kind !== 'out' && lap.kind !== 'in') return null
    out.kind = lap.kind
  }
  for (const field of ['start', 'end'] as const) {
    const v = lap[field]
    if (v === undefined) continue
    if (typeof v !== 'string' || v.length > MAX_CROSSING) return null
    if (v.trim()) out[field] = v.trim()
  }
  if (lap.note !== undefined) {
    if (typeof lap.note !== 'string' || lap.note.length > MAX_NOTE) return null
    if (lap.note.trim()) out.note = lap.note.trim()
  }
  return out
}

/**
 * Checks one session's laps as sent to be saved, and returns them with
 * nothing but the known fields — or what's wrong with them.
 */
export function cleanSessionLaps(value: unknown): { session: SessionLaps } | { error: string } {
  const s = value as SessionLaps
  if (!s || typeof s !== 'object') return { error: 'Missing session.' }
  if (typeof s.date !== 'string' || !DATE.test(s.date)) return { error: 'Session date must be YYYY-MM-DD.' }
  if (typeof s.time !== 'string' || !TIME.test(s.time)) return { error: 'Session time must be HH:MM.' }
  if (typeof s.group !== 'string' || !GROUP.test(s.group)) return { error: 'Unknown run group.' }
  if (s.sessionNumber !== undefined && (!Number.isInteger(s.sessionNumber) || s.sessionNumber < 0 || s.sessionNumber > 999)) {
    return { error: 'Bad session number.' }
  }
  if (!Array.isArray(s.laps) || s.laps.length === 0) return { error: 'No laps to save.' }
  if (s.laps.length > MAX_LAPS) return { error: `At most ${MAX_LAPS} laps a session.` }
  const laps: Lap[] = []
  for (const raw of s.laps) {
    const lap = cleanLap(raw)
    if (!lap) return { error: 'One of the laps isn’t a lap time.' }
    laps.push(lap)
  }
  const session: SessionLaps = { key: sessionKey(s.date, s.time, s.group), date: s.date, time: s.time, group: s.group, laps }
  if (s.sessionNumber !== undefined) session.sessionNumber = s.sessionNumber
  return { session }
}
