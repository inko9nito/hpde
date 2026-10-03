import { getStore } from '@netlify/blobs'
import { userFromRequest, jsonResponse as json } from '../lib/auth.mjs'
import { MAX_PHOTO_BYTES, PHOTO_LIMIT, PHOTO_TYPES } from '../../src/utils/garage.ts'

// The picture a driver sets for this app on Edit profile (#416), in place
// of their Google one (which it never changes). Their name, and where this
// picture is, are kept in their Identity user_metadata (src/utils/profile.ts);
// the picture itself is kept here.
//   GET    ?avatar=<user id>&v=  the picture: anyone's, signed in or not,
//                                as a Google picture is — it's shown to the
//                                drivers they share a car with (#398)
//   PUT    ?avatar=1             sets theirs: the image itself as the body.
//                                { avatar: its URL }, which names it (v=)
//   DELETE ?avatar=1             removes theirs
//
// Kept in Netlify Blobs, keyed by user id, in the site's store on every
// deploy, previews too: Identity is the site's, not a deploy's, so a
// picture set on a preview is theirs everywhere — as is the URL saved with
// it — and has to be found everywhere.
export const config = { path: '/api/profile' }

export const AVATAR_STORE = 'avatars'

const USER_ID = /^[A-Za-z0-9_-]{1,64}$/

type Deps = { fetch?: typeof fetch; getStore?: typeof getStore; now?: () => Date }

export default async function handler(req: Request, _context: unknown, deps: Deps = {}) {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) return json(405, { error: 'Method not allowed.' })
  const store = (deps.getStore ?? getStore)({ name: AVATAR_STORE, consistency: 'strong' })
  const params = new URL(req.url).searchParams
  const asked = params.get('avatar')

  if (req.method === 'GET') {
    if (!asked || !USER_ID.test(asked)) return json(404, { error: 'There’s no such picture.' })
    const found = await store.getWithMetadata(asked, { type: 'arrayBuffer' })
    if (!found) return json(404, { error: 'There’s no such picture.' })
    return new Response(found.data as ArrayBuffer, {
      headers: {
        'Content-Type': String(found.metadata?.contentType ?? 'image/jpeg'),
        // The URL names the picture (v=), so a new one is a new URL.
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  }

  const user = await userFromRequest(req, deps.fetch)
  if (!user) return json(401, { error: 'Please sign in to continue.' })
  if (asked !== '1') return json(400, { error: 'Missing avatar.' })

  if (req.method === 'DELETE') {
    await store.delete(user.id)
    return json(200, { deleted: true })
  }

  const type = (req.headers.get('content-type') ?? '').split(';')[0].trim()
  if (!PHOTO_TYPES.includes(type)) return json(400, { error: 'The picture must be a JPEG, PNG or WebP image.' })
  const data = await req.arrayBuffer()
  if (data.byteLength === 0) return json(400, { error: 'The picture is empty.' })
  if (data.byteLength > MAX_PHOTO_BYTES) return json(400, { error: `That picture is over the ${PHOTO_LIMIT} limit.` })
  const version = (deps.now?.() ?? new Date()).getTime().toString(36)
  await store.set(user.id, data, { metadata: { contentType: type } })
  return json(200, { avatar: `/api/profile?avatar=${encodeURIComponent(user.id)}&v=${version}` })
}
