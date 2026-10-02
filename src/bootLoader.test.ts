import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

// index.html's loader (#365) shows before any of the app has loaded, so it
// carries its own copy of the checkers rather than loading the asset.
describe('the loader in index.html', () => {
  const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8')
  const root = html.slice(html.indexOf('<div id="root">'), html.indexOf('</body>'))

  it('is the app’s own checkers, path for path', () => {
    const svg = readFileSync(join(__dirname, 'assets', 'checkered-flag.svg'), 'utf8')
    const paths = (src: string) => [...src.matchAll(/<path d="([^"]+)"/g)].map(m => m[1])
    expect(paths(svg)).toHaveLength(4)
    expect(paths(root)).toEqual(paths(svg))
    expect(root).toContain(`viewBox="${svg.match(/viewBox="([^"]+)"/)![1]}"`)
  })

  it('sits inside the root, so the app’s first render replaces it', () => {
    expect(root).toMatch(/^<div id="root"><div class="boot-loader"[^>]*role="progressbar"/)
  })
})
