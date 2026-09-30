import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

// The tab bar, sheets, toast and page bottoms pad by
// env(safe-area-inset-bottom) to clear the iPhone's home indicator. iOS
// only reports the insets to a page that opts in with viewport-fit=cover;
// without it they're all 0, and in the Home Screen app the tab bar sat
// under the home indicator (#318).
describe('safe-area insets (#318)', () => {
  const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf8')

  it('the viewport opts in to the safe-area insets', () => {
    const viewport = html.match(/<meta name="viewport" content="([^"]+)"/)
    expect(viewport, '<meta name="viewport">').not.toBeNull()
    expect(viewport![1].split(',').map(s => s.trim())).toContain('viewport-fit=cover')
  })
})
