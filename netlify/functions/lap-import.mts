import Anthropic from '@anthropic-ai/sdk'
import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { cleanRead } from '../../src/utils/lapImport.ts'

// Reads one screenshot of a lap timer's lap table (#472) — its date, the
// time the session started, and each lap — for the import sheet on My
// notes, which matches it to a session and shows it to the driver before
// anything is saved. Nothing is kept here: the screenshot goes to Claude to
// be read, and what it read comes back. Claude is reached through Netlify's
// AI Gateway, as the cookbook app's recipe reading is: on Netlify it gives
// every function ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL, so the SDK's
// default client uses it and the usage is billed to the Netlify account —
// no key of our own. One set on the site by hand would be used instead.
//   POST {image: {mediaType, data}}   data is the image, base64-encoded
//     200 {read: {date?, start?, laps: [{ms, counted}]}}
//     422 {error}  not a lap table, or nothing could be read off it
//     503 {error}  no AI Gateway (or key) on the site
// Signed-in drivers only: each read costs a little.
//
// TypeScript (.mts) so it can share the checks in src/; Netlify bundles it
// with esbuild (see netlify/lib/functionsLoad.test.ts).
export const config = { path: '/api/lap-import' }

/** The model, unless the site sets LAP_IMPORT_MODEL (e.g. if the gateway doesn't offer this one). */
export const DEFAULT_MODEL = 'claude-opus-5-5'

const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const
type MediaType = (typeof MEDIA_TYPES)[number]
// The app shrinks a screenshot well under this before sending it.
export const MAX_IMAGE_BASE64 = 4_000_000
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/

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

type Read = (image: { mediaType: MediaType; data: string }) => Promise<
  | { ok: true; answer: ModelRead }
  | { ok: false; status: number; error: string }
>

/**
 * Asks Claude to read the screenshot, with its answer held to SCHEMA. An
 * ordinary function gets 30 seconds, so Claude gets 25 and one try: a lap
 * table is short to read.
 */
function claudeReader(model: string): Read {
  const client = new Anthropic({ timeout: 25_000, maxRetries: 0 })
  return async ({ mediaType, data }) => {
    let response
    try {
      response = await client.messages.create({
        model,
        max_tokens: 8000,
        output_config: { effort: 'low', format: { type: 'json_schema', schema: SCHEMA } },
        system: SYSTEM,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType, data } },
            { type: 'text', text: INSTRUCTIONS },
          ],
        }],
      })
    } catch (err) {
      console.error('lap-import: reading the screenshot failed:', err)
      if (err instanceof Anthropic.AuthenticationError || err instanceof Anthropic.PermissionDeniedError) {
        return { ok: false, status: 503, error: 'Screenshot import isn’t set up on this site: Netlify’s AI Gateway didn’t accept the request.' }
      }
      if (err instanceof Anthropic.NotFoundError) {
        return { ok: false, status: 503, error: 'Screenshot import isn’t set up on this site: the AI model wasn’t found.' }
      }
      if (err instanceof Anthropic.APIConnectionTimeoutError) {
        return { ok: false, status: 504, error: 'Claude took too long to read the screenshot. Try again.' }
      }
      if (err instanceof Anthropic.RateLimitError) {
        return { ok: false, status: 429, error: 'Too many screenshots at once. Wait a minute and try again.' }
      }
      return { ok: false, status: 502, error: 'Couldn’t read the screenshot just now. Try again.' }
    }
    if (response.stop_reason === 'refusal' || response.stop_reason === 'max_tokens') {
      return { ok: false, status: 422, error: 'Couldn’t read the laps off this screenshot.' }
    }
    const text = response.content.flatMap(block => (block.type === 'text' ? [block.text] : [])).join('')
    try {
      return { ok: true, answer: JSON.parse(text) as ModelRead }
    } catch {
      return { ok: false, status: 422, error: 'Couldn’t read the laps off this screenshot.' }
    }
  }
}

type Deps = {
  fetch?: typeof fetch
  /** Stands in for Claude in tests. */
  read?: Read
  /** Stands in for the ANTHROPIC_API_KEY the AI Gateway gives, in tests. */
  apiKey?: string
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
  const mediaType = body?.image?.mediaType
  const data = body?.image?.data
  if (!MEDIA_TYPES.includes(mediaType)) return json(400, { error: 'Send a JPEG, PNG, WebP or GIF image.' })
  if (typeof data !== 'string' || !data || !BASE64.test(data)) return json(400, { error: 'The image must be base64-encoded.' })
  if (data.length > MAX_IMAGE_BASE64) return json(413, { error: 'That image is too large.' })

  // The AI Gateway gives the function its key.
  const apiKey = deps.apiKey ?? process.env.ANTHROPIC_API_KEY
  const read = deps.read ?? (apiKey ? claudeReader(process.env.LAP_IMPORT_MODEL || DEFAULT_MODEL) : undefined)
  if (!read) return json(503, { error: 'Screenshot import isn’t set up on this site: it needs Netlify’s AI Gateway.' })

  const result = await read({ mediaType, data })
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
