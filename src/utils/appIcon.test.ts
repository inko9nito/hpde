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
