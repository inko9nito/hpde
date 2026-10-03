import { describe, it, expect, beforeEach } from 'vitest'
import handler, { AVATAR_STORE } from '../functions/profile.mts'
import { profileOf } from './profile.mjs'
import { userFromRequest } from './auth.mjs'
import { listDrivers } from './drivers.mjs'
import { profileOf as browserProfileOf } from '../../src/utils/profile'
import { fakeBlobs } from './fakeBlobs'

const blobs = fakeBlobs()
const avatars = blobs.data(`site:${AVATAR_STORE}`)

// Stands in for Netlify Identity's /user endpoint: one token per user.
const identityUsers: Record<string, unknown> = {
  'vera-token': { id: 'vera', email: 'vera@example.com', user_metadata: { full_name: 'Vera M' } },
}
const fakeFetch = async (_url: URL, init: { headers: Record<string, string> }) => {
  const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
  return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
}

const call = (method: string, { token, query = '', body, type, context = {} }: { token?: string; query?: string; body?: BodyInit; type?: string; context?: unknown } = {}) =>
  handler(
    new Request(`https://site.example/api/profile${query}`, {
      method,
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(type ? { 'Content-Type': type } : {}) },
      ...(body !== undefined ? { body } : {}),
    }),
    context,
    { getStore: blobs.getStore, fetch: fakeFetch, now: () => new Date(1_700_000_000_000) } as never,
  )

describe('a driver’s name and picture as the app shows them (#416)', () => {
  const cases = [
    {},
    null,
    { full_name: 'Vera M', avatar_url: 'https://pics.example/vera.jpg' },
    { full_name: 'Vera M', hpde_name: '  Vera  ', hpde_avatar: '/api/profile?avatar=vera&v=1' },
    { name: 'From name', hpde_name: '   ', hpde_avatar: '' },
    { hpde_name: 'x'.repeat(80) },
    { full_name: 42, hpde_name: ['not a name'] },
  ]

  it('prefers theirs from Edit profile, then their sign-in’s', () => {
    expect(profileOf({ full_name: 'Vera M', avatar_url: 'https://pics.example/vera.jpg', hpde_name: 'Vee', hpde_avatar: '/api/profile?avatar=vera&v=1' }))
      .toEqual({ name: 'Vee', avatar: '/api/profile?avatar=vera&v=1' })
    expect(profileOf({ full_name: 'Vera M', avatar_url: 'https://pics.example/vera.jpg', hpde_name: '  ' }))
      .toEqual({ name: 'Vera M', avatar: 'https://pics.example/vera.jpg' })
    expect(profileOf(undefined)).toEqual({ name: null, avatar: null })
    expect(profileOf({ hpde_name: 'x'.repeat(80) }).name).toHaveLength(50)
  })

  it.each(cases)('is the same in the functions and the browser: %j', meta => {
    const browser = browserProfileOf(meta)
    expect(profileOf(meta)).toEqual({ name: browser.name, avatar: browser.avatarUrl })
  })

  it('is who a request is from, for a shared car’s drivers (#398)', async () => {
    const from = (meta: unknown) => userFromRequest(
      new Request('https://site.example/api/garage', { headers: { Authorization: 'Bearer t' } }),
      async () => new Response(JSON.stringify({ id: 'vera', email: 'vera@example.com', user_metadata: meta })),
    )
    expect(await from({ full_name: 'Vera M', avatar_url: 'https://pics.example/vera.jpg' }))
      .toMatchObject({ name: 'Vera M', avatar: 'https://pics.example/vera.jpg' })
    expect(await from({ full_name: 'Vera M', avatar_url: 'https://pics.example/vera.jpg', hpde_name: 'Vee', hpde_avatar: '/api/profile?avatar=vera&v=1' }))
      .toMatchObject({ name: 'Vee', avatar: '/api/profile?avatar=vera&v=1' })
  })

  it('names drivers on an admin’s Switch driver (#396)', async () => {
    const identity = {
      listUsers: async ({ page = 1 }: { page?: number }) => page > 1 ? [] : [
        { id: 'a', email: 'vera@example.com', name: 'Vera M', userMetadata: { full_name: 'Vera M', hpde_name: 'Vee' } },
        { id: 'b', email: 'amy@example.com', name: 'Amy', userMetadata: { full_name: 'Amy' } },
      ],
    }
    expect(await listDrivers(identity as never)).toEqual([
      { id: 'b', email: 'amy@example.com', name: 'Amy' },
      { id: 'a', email: 'vera@example.com', name: 'Vee' },
    ])
  })
})

describe('the profile function: a picture for the app (#416)', () => {
  beforeEach(() => blobs.clear())

  it('keeps a signed-in driver’s picture, under their id, and gives back a URL that names it', async () => {
    const res = await call('PUT', { token: 'vera-token', query: '?avatar=1', body: new Uint8Array([1, 2, 3]), type: 'image/jpeg' })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ avatar: `/api/profile?avatar=vera&v=${(1_700_000_000_000).toString(36)}` })
    expect(avatars.get('vera')).toMatchObject({ metadata: { contentType: 'image/jpeg' } })
  })

  it('serves it to anyone — as a Google picture is — cached for good', async () => {
    await call('PUT', { token: 'vera-token', query: '?avatar=1', body: new Uint8Array([1, 2, 3]), type: 'image/png' })
    const res = await call('GET', { query: '?avatar=vera&v=x' })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('image/png')
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
    expect([...new Uint8Array(await res.arrayBuffer())]).toEqual([1, 2, 3])
    expect((await call('GET', { query: '?avatar=nobody' })).status).toBe(404)
    expect((await call('GET', { query: '?avatar=../x' })).status).toBe(404)
  })

  it('uses the site’s store on a preview too: Identity is the site’s, not the deploy’s', async () => {
    await call('PUT', { token: 'vera-token', query: '?avatar=1', body: new Uint8Array([1]), type: 'image/webp', context: { deploy: { context: 'deploy-preview' } } })
    expect(avatars.has('vera')).toBe(true)
    expect(blobs.opened.every(o => o.kind === 'site')).toBe(true)
  })

  it('removes it', async () => {
    await call('PUT', { token: 'vera-token', query: '?avatar=1', body: new Uint8Array([1]), type: 'image/jpeg' })
    const res = await call('DELETE', { token: 'vera-token', query: '?avatar=1' })
    expect(await res.json()).toEqual({ deleted: true })
    expect(avatars.has('vera')).toBe(false)
  })

  it('needs a sign-in to change one, and an image within the limit', async () => {
    expect((await call('PUT', { query: '?avatar=1', body: new Uint8Array([1]), type: 'image/jpeg' })).status).toBe(401)
    expect((await call('DELETE', { token: 'nobody', query: '?avatar=1' })).status).toBe(401)
    expect(await (await call('PUT', { token: 'vera-token', query: '?avatar=1', body: 'hi', type: 'text/plain' })).json())
      .toEqual({ error: 'The picture must be a JPEG, PNG or WebP image.' })
    expect(await (await call('PUT', { token: 'vera-token', query: '?avatar=1', body: new Uint8Array(0), type: 'image/jpeg' })).json())
      .toEqual({ error: 'The picture is empty.' })
    expect(await (await call('PUT', { token: 'vera-token', query: '?avatar=1', body: new Uint8Array(3_000_001), type: 'image/jpeg' })).json())
      .toEqual({ error: 'That picture is over the 3 MB limit.' })
    expect((await call('PUT', { token: 'vera-token', body: new Uint8Array([1]), type: 'image/jpeg' })).status).toBe(400)
    expect((await call('POST', { token: 'vera-token', query: '?avatar=1' })).status).toBe(405)
    expect(avatars.size).toBe(0)
  })
})
