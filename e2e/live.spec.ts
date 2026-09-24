import { test, expect } from './fixtures'

// Read-only checks against a deployed site — a Netlify deploy preview or
// production — with the real functions behind it (#256). Run with
// E2E_BASE_URL set. Nothing here creates, edits or deletes anything.
//
// The functions are what unit tests can't vouch for: #253 passed every one
// and answered 502 on Netlify.

interface ApiEvent {
  id: string
  name: string
  days: { date: string }[]
}

test('/api/events lists the stored events', async ({ request }) => {
  const res = await request.get('/api/events')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('application/json')
  const { events } = (await res.json()) as { events: ApiEvent[] }
  expect(Array.isArray(events)).toBe(true)
  for (const e of events) {
    expect(typeof e.id).toBe('string')
    expect(typeof e.name).toBe('string')
    expect(e.days.length).toBeGreaterThan(0)
  }
})

test('/api/created-events, its old name, still answers', async ({ request }) => {
  expect((await request.get('/api/created-events')).status()).toBe(200)
})

test('/api/events.json is the widget feed, in the widget’s format', async ({ request }) => {
  const res = await request.get('/api/events.json')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toContain('application/json')
  const body = await res.json()
  expect(typeof body.generatedAt).toBe('string')
  const ids = body.events.map((e: { id: string }) => e.id)
  // The widget's `test` flag needs the fixture.
  expect(ids).toContain('test-live')
  // Same events as the app sees.
  const { events } = (await (await request.get('/api/events')).json()) as { events: ApiEvent[] }
  for (const e of events) expect(ids).toContain(e.id)
  // Colors resolved to hex, as the widget draws them.
  for (const e of body.events) {
    for (const g of e.runGroups) expect(g.color).toMatch(/^#[0-9a-f]{6}$/i)
  }
})

test('/api/me says who is signed in, and no one is', async ({ request }) => {
  expect((await request.get('/api/me')).status()).toBe(401)
})

test('the app lists the stored events and opens one', async ({ page, request }) => {
  const { events } = (await (await request.get('/api/events')).json()) as { events: ApiEvent[] }
  await page.goto('/#/')
  await expect(page.getByRole('heading', { level: 1, name: 'HPDE Events' })).toBeVisible()
  test.skip(events.length === 0, 'no events stored on this site')

  const newest = [...events].sort((a, b) => b.id.localeCompare(a.id))[0]
  await page.getByRole('button', { name: new RegExp(newest.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) }).first().click()
  await expect(page.getByRole('heading', { level: 1, name: newest.name })).toBeVisible()
  await expect(page.getByRole('tablist', { name: 'Event section' })).toBeVisible()
})

test('today’s test event renders with the now-line', async ({ page }) => {
  await page.goto('/#/event/test-live')
  await expect(page.locator('[data-time-indicator]')).toBeInViewport()
})
