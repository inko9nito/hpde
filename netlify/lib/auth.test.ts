import { describe, it, expect } from 'vitest'
import { requireUser } from './auth.mjs'
import { handler } from '../functions/me.mjs'

const identityUser = {
  sub: 'user-123',
  email: 'driver@example.com',
  app_metadata: { roles: ['organizer'] },
}

describe('requireUser', () => {
  it('returns null without an Identity user', () => {
    expect(requireUser(undefined)).toBeNull()
    expect(requireUser({ clientContext: {} })).toBeNull()
  })

  it('maps the Identity user to id/email/roles', () => {
    expect(requireUser({ clientContext: { user: identityUser } })).toEqual({
      id: 'user-123',
      email: 'driver@example.com',
      roles: ['organizer'],
    })
  })

  it('defaults roles to an empty list', () => {
    const user = requireUser({ clientContext: { user: { sub: 'u', email: 'e' } } })
    expect(user?.roles).toEqual([])
  })
})

describe('me function', () => {
  it('rejects signed-out requests with 401', async () => {
    const res = await handler({}, { clientContext: {} })
    expect(res.statusCode).toBe(401)
  })

  it('returns the signed-in user', async () => {
    const res = await handler({}, { clientContext: { user: identityUser } })
    expect(res.statusCode).toBe(200)
    expect(JSON.parse(res.body).user.id).toBe('user-123')
  })
})
