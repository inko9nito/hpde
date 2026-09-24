import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// The default app icon (#237) lives in index.html; event pages swap it for
// the track icon by matching rel + sizes (trackFavicon.ts). If a link's
// sizes drift from the hook's, the event page would add a second icon
// instead of replacing this one — and each PNG must really be that size.
const root = resolve(__dirname, '../..')
const html = readFileSync(resolve(root, 'index.html'), 'utf8')

function pngSize(file: string): string {
  const png = readFileSync(resolve(root, 'public', file))
  return `${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`
}

describe('default app icon (#237)', () => {
  it.each([
    ['icon', '64x64'],
    ['icon', '192x192'],
    ['apple-touch-icon', '180x180'],
  ])('index.html links a %s at %s that the event page can swap', (rel, sizes) => {
    const link = new RegExp(`<link rel="${rel}"[^>]*sizes="${sizes}"[^>]*href="/([^"]+)"`)
    const match = html.match(link)
    expect(match, `<link rel="${rel}" sizes="${sizes}">`).not.toBeNull()
    expect(pngSize(match![1])).toBe(sizes)
  })
})

// Safari's tab overview on iOS reads /favicon.ico, not the <link>s above;
// without the file, Netlify serves its own logo there (#270).
describe('favicon.ico (#270)', () => {
  const ico = readFileSync(resolve(root, 'public', 'favicon.ico'))
  const count = ico.readUInt16LE(4)

  it('is an icon file with a frame for each tab size', () => {
    expect(ico.readUInt16LE(0)).toBe(0)
    expect(ico.readUInt16LE(2)).toBe(1)
    const sizes = Array.from({ length: count }, (_, i) => ico.readUInt8(6 + 16 * i))
    expect(sizes).toEqual([16, 32, 48])
  })

  it('holds a PNG of the stated size in every frame', () => {
    for (let i = 0; i < count; i++) {
      const entry = 6 + 16 * i
      const size = ico.readUInt8(entry)
      const start = ico.readUInt32LE(entry + 12)
      const png = ico.subarray(start, start + ico.readUInt32LE(entry + 8))
      expect(png.subarray(1, 4).toString('latin1')).toBe('PNG')
      expect(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`).toBe(`${size}x${size}`)
    }
  })
})
