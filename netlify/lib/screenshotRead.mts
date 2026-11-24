import Anthropic from '@anthropic-ai/sdk'
import { jsonResponse as json } from './auth.mjs'

// Reading a screenshot with Claude, for the functions that import what one
// shows: a lap timer's lap table (#472), an instructor's report card (#483).
// Nothing is kept: the screenshot goes to Claude to be read, and what it
// read comes back. Claude is reached through Netlify's AI Gateway, as the
// cookbook app's recipe reading is: on Netlify it gives every function
// ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL, so the SDK's default client uses
// it and the usage is billed to the Netlify account — no key of our own.
// One set on the site by hand would be used instead.

/** The model, unless the site sets another (e.g. if the gateway doesn't offer this one). */
export const DEFAULT_MODEL = 'claude-opus-5-5'

export const MEDIA_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const
export type MediaType = (typeof MEDIA_TYPES)[number]
export interface Image { mediaType: MediaType; data: string }
// The app shrinks a screenshot well under this before sending it.
export const MAX_IMAGE_BASE64 = 4_000_000
const BASE64 = /^[A-Za-z0-9+/]+={0,2}$/

/** An image as sent, checked: the image, or the response that says what's wrong with it. */
export function checkImage(image: unknown): { image: Image } | { error: Response } {
  const mediaType = (image as { mediaType?: unknown } | undefined)?.mediaType
  const data = (image as { data?: unknown } | undefined)?.data
  if (!MEDIA_TYPES.includes(mediaType as MediaType)) return { error: json(400, { error: 'Send a JPEG, PNG, WebP or GIF image.' }) }
  if (typeof data !== 'string' || !data || !BASE64.test(data)) return { error: json(400, { error: 'The image must be base64-encoded.' }) }
  if (data.length > MAX_IMAGE_BASE64) return { error: json(413, { error: 'That image is too large.' }) }
  return { image: { mediaType: mediaType as MediaType, data } }
}

/** What reading gives: the model's answer, or the status and message to answer with. */
export type ReadResult<T> = { ok: true; answer: T } | { ok: false; status: number; error: string }

/**
 * Asks Claude to read the screenshots, with its answer held to `schema`. An
 * ordinary function gets 30 seconds, so Claude gets 25 and one try: what's
 * read is short. `unreadable` is the message when it can't be read at all.
 */
export function claudeReader<T>({ model, gateway, system, instructions, schema, tag, unreadable }: {
  model: string
  gateway: Gateway
  system: string
  instructions: string
  schema: Record<string, unknown>
  /** For the log: which function it is. */
  tag: string
  unreadable: string
}): (images: Image[]) => Promise<ReadResult<T>> {
  const client = new Anthropic({ ...gateway, timeout: 25_000, maxRetries: 0 })
  return async images => {
    let response
    try {
      response = await client.messages.create({
        model,
        max_tokens: 8000,
        output_config: { effort: 'low', format: { type: 'json_schema', schema } },
        system,
        messages: [{
          role: 'user',
          content: [
            ...images.map(({ mediaType, data }) => ({ type: 'image' as const, source: { type: 'base64' as const, media_type: mediaType, data } })),
            { type: 'text', text: instructions },
          ],
        }],
      })
    } catch (err) {
      console.error(`${tag}: reading the screenshot failed:`, err)
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
      return { ok: false, status: 422, error: unreadable }
    }
    const text = response.content.flatMap(block => (block.type === 'text' ? [block.text] : [])).join('')
    try {
      return { ok: true, answer: JSON.parse(text) as T }
    } catch {
      return { ok: false, status: 422, error: unreadable }
    }
  }
}

/** Where to reach Claude: the gateway's (or a key set on the site); none for the SDK's own defaults. */
export type Gateway = { apiKey?: string; baseURL?: string }

// The variables the AI Gateway can show up in, for the message when none
// is there: names only, never values.
const GATEWAY_VARS = ['ANTHROPIC_API_KEY', 'ANTHROPIC_BASE_URL', 'NETLIFY_AI_GATEWAY_KEY', 'NETLIFY_AI_GATEWAY_URL', 'AI_GATEWAY'] as const

/**
 * How to reach Claude, from what Netlify gave the function, or null if it
 * gave nothing. ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL first — the AI
 * Gateway's, or a key set on the site, which the SDK reads itself. Then the
 * gateway's own NETLIFY_AI_GATEWAY_KEY and NETLIFY_AI_GATEWAY_URL, which it
 * says are always there; then AI_GATEWAY, the base64 JSON they're made from
 * ({token, url}: the same token and URL for every provider, as Netlify's
 * own @netlify/dev sets them).
 */
export function gatewayFrom(env: Record<string, string | undefined>): Gateway | null {
  if (env.ANTHROPIC_API_KEY) return {}
  if (env.NETLIFY_AI_GATEWAY_KEY && env.NETLIFY_AI_GATEWAY_URL) {
    return { apiKey: env.NETLIFY_AI_GATEWAY_KEY, baseURL: env.NETLIFY_AI_GATEWAY_URL }
  }
  if (env.AI_GATEWAY) {
    try {
      const { token, url } = JSON.parse(Buffer.from(env.AI_GATEWAY, 'base64').toString('utf8'))
      if (typeof token === 'string' && token && typeof url === 'string' && url) return { apiKey: token, baseURL: url }
    } catch {
      // Not what it should be: as if it weren't there.
    }
  }
  return null
}

/**
 * The answer when there's no AI Gateway: which of its variables Netlify gave
 * the function — names only — to tell a gateway that's off from one that's
 * half there.
 */
export function noGateway(env: Record<string, string | undefined>, tag: string): Response {
  const found = GATEWAY_VARS.filter(name => env[name] !== undefined)
  console.error(`${tag}: no AI Gateway. Gateway variables set: ${found.join(', ') || 'none'}`)
  return json(503, {
    error: `Screenshot import isn’t set up on this site: it needs Netlify’s AI Gateway. (Gateway variables found: ${found.join(', ') || 'none'}.)`,
  })
}
