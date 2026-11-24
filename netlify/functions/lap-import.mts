import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { cleanRead } from '../../src/utils/lapImport.ts'
import { DEFAULT_MODEL, checkImage, claudeReader, gatewayFrom, noGateway } from '../lib/screenshotRead.mts'
import type { Gateway, Image, ReadResult } from '../lib/screenshotRead.mts'

export { DEFAULT_MODEL, MAX_IMAGE_BASE64, gatewayFrom } from '../lib/screenshotRead.mts'

// Reads one screenshot of a lap timer's lap table (#472) — its date, the
// time the session started, and each lap — for the import sheet on My
// notes, which matches it to a session and shows it to the driver before
// anything is saved. Nothing is kept here. It's read by Claude, through
// Netlify's AI Gateway (netlify/lib/screenshotRead.mts); the site can pick
// another model with LAP_IMPORT_MODEL.
//   POST {image: {mediaType, data}}   data is the image, base64-encoded
//     200 {read: {date?, start?, laps: [{ms, counted}]}}
//     422 {error}  not a lap table, or nothing could be read off it
//     503 {error}  no AI Gateway (or key) on the site
// Signed-in drivers only: each read costs a little.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/lap-import' }

const SYSTEM = `You read screenshots of a lap timer app for a track-day driver's logbook. The screenshot shows one session's lap table. Transcribe what it shows; never work out, estimate or guess a value it doesn't show.`

const INSTRUCTIONS = `Read this lap table.

- is_lap_table: false if this isn't a lap timer's table of laps for one session; the rest can then be empty.
- date: the session's date as YYYY-MM-DD, from the screenshot's title or header; "" if it shows none. Not the phone's status bar.
- start: when the session started, as 24-hour HH:MM, from the title or header (9:21 AM is "09:21", 12:56 PM is "12:56"); "" if it shows none. Not the phone's clock in the status bar.
- laps: one per numbered lap row, in lap number order however the table is sorted. Leave out summary rows (Avg, Average, Opt, Optimal, Best, Theoretical, Total) and any row cut off at the screen's edge.
  - number: the lap's number.
  - time: its lap time exactly as written, e.g. "3:40.96".
  - counted: false only if the screenshot shows the timer left that lap out of its count — e.g. a "Laps (3)" heading over four rows, with that lap's number missing from the chart's lap axis. Otherwise true.`

const SCHEMA = {
  type: 'object',
  properties: {
    is_lap_table: { type: 'boolean' },
    date: { type: 'string' },
    start: { type: 'string' },
    laps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          number: { type: 'integer' },
          time: { type: 'string' },
          counted: { type: 'boolean' },
        },
        required: ['number', 'time', 'counted'],
        additionalProperties: false,
      },
    },
  },
  required: ['is_lap_table', 'date', 'start', 'laps'],
  additionalProperties: false,
}

/** What the model answers, before it's checked. */
interface ModelRead {
  is_lap_table: boolean
  date: string
  start: string
  laps: { number: number; time: string; counted: boolean }[]
}

/** "3:40.96", "58.3", "1:02:03.5": a lap time as a timer writes it, in ms; NaN if it isn't one. */
export function lapTimeMs(text: string): number {
  const m = /^(?:(\d+):)?(?:(\d{1,2}):)?(\d{1,2}(?:\.\d+)?)$/.exec(text.trim())
  if (!m) return NaN
  const [, a, b, s] = m
  const [h, min] = b !== undefined ? [Number(a), Number(b)] : [0, Number(a ?? 0)]
  if (a !== undefined && Number(s) >= 60) return NaN
  return Math.round(((h * 60 + min) * 60 + Number(s)) * 1000)
}

type Read = (image: Image) => Promise<ReadResult<ModelRead>>

/** Claude, reading one lap table. */
function lapReader(model: string, gateway: Gateway): Read {
  const reader = claudeReader<ModelRead>({
    model,
    gateway,
    system: SYSTEM,
    instructions: INSTRUCTIONS,
    schema: SCHEMA,
    tag: 'lap-import',
    unreadable: 'Couldn’t read the laps off this screenshot.',
  })
  return image => reader([image])
}

type Deps = {
  fetch?: typeof fetch
  /** Stands in for Claude in tests. */
  read?: Read
  /** Stands in for process.env, in tests. */
  env?: Record<string, string | undefined>
}

export default async function handler(req: Request, _context: unknown, deps: Deps = {}) {
  if (req.method !== 'POST') return json(405, { error: 'Method not allowed.' })

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })

  let body
  try {
    body = await req.json()
  } catch {
    return json(400, { error: 'Request body must be JSON.' })
  }
  const checked = checkImage(body?.image)
  if ('error' in checked) return checked.error

  // The AI Gateway gives the function its key.
  const env = deps.env ?? process.env
  const gateway = gatewayFrom(env)
  const read = deps.read ?? (gateway ? lapReader(env.LAP_IMPORT_MODEL || DEFAULT_MODEL, gateway) : undefined)
  if (!read) return noGateway(env, 'lap-import')

  const result = await read(checked.image)
  if (!result.ok) return json(result.status, { error: result.error })
  const { answer } = result
  if (!answer || answer.is_lap_table === false) {
    return json(422, { error: 'This doesn’t look like a lap timer’s lap table.' })
  }
  const laps = Array.isArray(answer.laps) ? [...answer.laps].sort((a, b) => a.number - b.number) : []
  const cleaned = cleanRead({
    date: answer.date,
    start: answer.start,
    laps: laps.map(lap => ({ ms: lapTimeMs(String(lap.time ?? '')), counted: lap.counted })),
  })
  if (!cleaned || cleaned.laps.length === 0) return json(422, { error: 'Couldn’t read any laps off this screenshot.' })
  return json(200, { read: cleaned })
}
