import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// Before iOS 26, Safari's Add to Home Screen only opens a site full screen
// if the site asks for it; otherwise it's a bookmark that opens in Safari,
// and the app had to be installed from a configuration profile (#375).
describe('Home Screen app (#375)', () => {
  const root = resolve(__dirname, '../..')
  const html = readFileSync(resolve(root, 'index.html'), 'utf8')

  it('links a manifest that opens the whole site full screen', () => {
    const link = html.match(/<link rel="manifest" href="\/([^"]+)"/)
    expect(link, '<link rel="manifest">').not.toBeNull()
    const manifest = JSON.parse(readFileSync(resolve(root, 'public', link![1]), 'utf8'))
    expect(manifest).toMatchObject({ display: 'standalone', start_url: '/', scope: '/' })
    expect(manifest.short_name).toBe('HPDE')
  })

  it('asks for full screen the older Apple way too, for when the manifest is late', () => {
    expect(html).toContain('<meta name="apple-mobile-web-app-capable" content="yes" />')
  })
})
