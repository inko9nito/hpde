import { describe, it, expect, vi } from 'vitest'
import handler from '../functions/drivers.mts'
import { listDrivers, findDriver } from './drivers.mjs'

const ids = Array.from({ length: 5 }, (_, i) => `5b0f2c1e-8d3a-4f6b-9c2d-7e1a0b3c4d5${i}`)
const people = [
  { id: ids[0], email: 'vera@example.com', name: 'Vera' },
  { id: ids[1], email: 'jason@example.com', name: 'jason' },
  { id: ids[2], email: 'amy@example.com', name: 'Amy' },
  { id: ids[3], email: 'noname@example.com' },
  { id: ids[4], email: 'bo@example.com', name: 'Bo' },
]

// Identity's admin API, handing out `perPage` users a page, or fewer if it
// caps pages at `cap` — callers must not take a short page as the last.
function fakeIdentity(users: typeof people, cap = Infinity) {
  return {
    listUsers: vi.fn(async ({ page = 1, perPage = 50 }: { page?: number; perPage?: number } = {}) => {
      const size = Math.min(perPage, cap)
      return users.slice((page - 1) * size, page * size)
    }),
    getUser: async (id: string) => {
      const user = users.find(u => u.id === id)
      if (!user) throw Object.assign(new Error('User not found'), { status: 404 })
      return user
    },
  }
}

describe('listDrivers (#288)', () => {
  it('lists everyone by name, or email with no name, ignoring case', async () => {
    expect(await listDrivers(fakeIdentity(people))).toEqual([
      { id: ids[2], email: 'amy@example.com', name: 'Amy' },
      { id: ids[4], email: 'bo@example.com', name: 'Bo' },
      { id: ids[1], email: 'jason@example.com', name: 'jason' },
      { id: ids[3], email: 'noname@example.com', name: null },
      { id: ids[0], email: 'vera@example.com', name: 'Vera' },
    ])
  })

  it('keeps paging past a short page until an empty one', async () => {
    const identity = fakeIdentity(people, 2)
    expect(await listDrivers(identity)).toHaveLength(5)
    expect(identity.listUsers).toHaveBeenCalledTimes(4)
  })

  it('stops if Identity ignores the page and sends the same people again', async () => {
    const identity = { listUsers: vi.fn(async () => people.slice(0, 2)), getUser: async () => people[0] }
    expect(await listDrivers(identity)).toHaveLength(2)
    expect(identity.listUsers).toHaveBeenCalledTimes(2)
  })
})

describe('findDriver (#288)', () => {
  it('finds a driver by id, and nobody for an unknown or malformed one', async () => {
    const identity = fakeIdentity(people)
    expect(await findDriver(ids[1], identity)).toEqual({ id: ids[1], email: 'jason@example.com', name: 'jason' })
    expect(await findDriver('00000000-0000-4000-8000-000000000000', identity)).toBeNull()
    expect(await findDriver('jason/../vera', identity)).toBeNull()
  })

  it('passes other Identity failures on', async () => {
    const identity = { listUsers: async () => [], getUser: async () => { throw new Error('down') } }
    await expect(findDriver(ids[1], identity)).rejects.toThrow('down')
  })
})

describe('drivers function (#288)', () => {
  const identityUsers: Record<string, unknown> = {
    'driver-token': { id: ids[1], email: 'jason@example.com' },
    'admin-token': { id: ids[0], email: 'vera@example.com', app_metadata: { roles: ['admin'] } },
  }
  const fakeFetch = async (_url: URL, init: { headers: Record<string, string> }) => {
    const u = identityUsers[init.headers.Authorization.replace('Bearer ', '')]
    return u ? new Response(JSON.stringify(u)) : new Response('{}', { status: 401 })
  }
  const call = (token?: string, { method = 'GET', identity = fakeIdentity(people) }: { method?: string; identity?: unknown } = {}) =>
    handler(
      new Request('https://site.example/api/drivers', { method, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
      {},
      { fetch: fakeFetch, identity } as never,
    )

  it('lists the drivers for an admin', async () => {
    const res = await call('admin-token')
    expect(res.status).toBe(200)
    expect(res.headers.get('cache-control')).toBe('no-store')
    const { drivers } = await res.json()
    expect(drivers.map((d: { email: string }) => d.email)).toEqual([
      'amy@example.com', 'bo@example.com', 'jason@example.com', 'noname@example.com', 'vera@example.com',
    ])
  })

  it('is for admins only', async () => {
    expect((await call()).status).toBe(401)
    expect((await call('forged')).status).toBe(401)
    expect((await call('driver-token')).status).toBe(403)
    expect((await call('admin-token', { method: 'POST' })).status).toBe(405)
  })

  it('answers 502 when Identity can’t be reached', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {})
    const down = { listUsers: async () => { throw new Error('down') }, getUser: async () => ({}) }
    expect((await call('admin-token', { identity: down })).status).toBe(502)
    expect(error).toHaveBeenCalled()
    error.mockRestore()
  })
})
