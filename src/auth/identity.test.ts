import { describe, it, expect, beforeEach } from 'vitest'
import { adoptSavedToken, SESSION_KEY } from './identity'
import type { IdentityUser } from './identity'

const HOUR = 3_600_000

function user(token: IdentityUser['token']): IdentityUser {
  return { id: 'u1', email: 'a@example.com', token, jwt: async () => '' }
}

function save(id: string, token: unknown) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id, email: 'a@example.com', token }))
}

describe('adoptSavedToken — renew with the newest sign-in on the device', () => {
  beforeEach(() => localStorage.clear())

  it('takes the token another copy of the site renewed and saved', () => {
    const u = user({ access_token: 'a1', refresh_token: 'r1', expires_at: 1 * HOUR })
    const newer = { access_token: 'a2', refresh_token: 'r2', expires_at: 2 * HOUR }
    save('u1', newer)
    adoptSavedToken(u)
    expect(u.token).toEqual(newer)
  })

  it('leaves it alone when it’s the same, older, someone else’s, or unreadable', () => {
    const mine = { access_token: 'a2', refresh_token: 'r2', expires_at: 2 * HOUR }
    const cases: (() => void)[] = [
      () => save('u1', mine),
      () => save('u1', { access_token: 'a0', refresh_token: 'r0', expires_at: 1 * HOUR }),
      () => save('someone-else', { access_token: 'a3', refresh_token: 'r3', expires_at: 3 * HOUR }),
      () => save('u1', { refresh_token: 'r3' }),
      () => localStorage.setItem(SESSION_KEY, '{not json'),
      () => localStorage.removeItem(SESSION_KEY),
    ]
    for (const setUp of cases) {
      const u = user({ ...mine })
      setUp()
      adoptSavedToken(u)
      expect(u.token).toEqual(mine)
    }
  })
})
