import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
// @ts-expect-error: a plain .mjs module, shared with the generator script.
import { LAUNCH_SCREENS, launchScreenLink, launchScreenPath } from '../scripts/launch-screens/devices.mjs'

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

// What iOS shows while the Home Screen app opens (#365): index.html's
// loader, rendered for each iPhone screen by `npm run launch-screens:generate`.
describe('the launch images', () => {
  type Screen = { width: number; height: number; ratio: number }
  const screens = LAUNCH_SCREENS as Screen[]
  const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8')

  it('are each linked from index.html, and nothing else is', () => {
    const linked = [...html.matchAll(/<link rel="apple-touch-startup-image"[^>]*>/g)].map(m => m[0])
    expect(linked).toEqual(screens.map(s => launchScreenLink(s) as string))
  })

  it('are there, each the size of its screen in pixels', () => {
    for (const screen of screens) {
      const png = readFileSync(join(__dirname, '..', 'public', launchScreenPath(screen)))
      // A PNG's IHDR: width and height, big-endian, at bytes 16 and 20.
      expect([png.readUInt32BE(16), png.readUInt32BE(20)], launchScreenPath(screen))
        .toEqual([screen.width * screen.ratio, screen.height * screen.ratio])
    }
  })

  it('cover each screen once', () => {
    const keys = screens.map(s => `${s.width}x${s.height}@${s.ratio}`)
    expect(new Set(keys).size).toBe(keys.length)
  })
})
