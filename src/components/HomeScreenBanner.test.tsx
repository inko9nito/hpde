import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DISMISSED_KEY, HomeScreenBanner, isIos, shareIsUnderMore } from './HomeScreenBanner'

const IPHONE_SAFARI = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1'
const IPAD_AS_MAC = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15'
// iOS 26 Safari still says iOS 18 in its user agent; only Safari's version moves.
const IPHONE_SAFARI_26 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1'
const IPHONE_CHROME = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/129.0.6668.69 Mobile/15E148 Safari/604.1'
const ANDROID_CHROME = 'Mozilla/5.0 (Linux; Android 14; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36'

function onDevice(userAgent: string, { standalone = false, displayMode = 'browser' } = {}) {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(userAgent)
  Object.defineProperty(navigator, 'standalone', { value: standalone, configurable: true })
  window.matchMedia = ((query: string) => ({ matches: query === `(display-mode: ${displayMode})` })) as typeof window.matchMedia
}

describe('Add to Home Screen banner (#379)', () => {
  const matchMedia = window.matchMedia
  beforeEach(() => localStorage.clear())
  afterEach(() => {
    vi.restoreAllMocks()
    delete (navigator as { standalone?: boolean }).standalone
    window.matchMedia = matchMedia
  })

  it('shows in Safari on an iPhone, with the steps in it', () => {
    onDevice(IPHONE_SAFARI)
    render(<HomeScreenBanner />)
    const banner = screen.getByRole('region', { name: 'Add to Home Screen' })
    expect(banner).toHaveTextContent('Add HPDE to your Home Screen')
    expect(banner).toHaveTextContent('Tap then “Add to Home Screen”')
    expect(screen.getByLabelText('Share')).toBeInTheDocument()
  })

  it('sends iOS 26 Safari to Share under ⋯', () => {
    onDevice(IPHONE_SAFARI_26)
    render(<HomeScreenBanner />)
    expect(screen.getByRole('region', { name: 'Add to Home Screen' })).toHaveTextContent('Tap , then Share, then “Add to Home Screen”')
    expect(screen.getByLabelText('More')).toBeInTheDocument()
  })

  it('finds Share under ⋯ only in Safari on an iPhone running iOS 26 or later', () => {
    expect(shareIsUnderMore(IPHONE_SAFARI_26)).toBe(true)
    expect(shareIsUnderMore(IPHONE_SAFARI)).toBe(false)
    expect(shareIsUnderMore(IPHONE_CHROME)).toBe(false)
    expect(shareIsUnderMore(IPAD_AS_MAC.replace('Version/18.6', 'Version/26.0'))).toBe(false)
  })

  it('never shows in the Home Screen app, by iOS’s flag or the manifest’s display mode', () => {
    onDevice(IPHONE_SAFARI, { standalone: true })
    const { unmount } = render(<HomeScreenBanner />)
    expect(screen.queryByRole('region', { name: 'Add to Home Screen' })).toBeNull()
    unmount()
    onDevice(IPHONE_SAFARI, { displayMode: 'standalone' })
    render(<HomeScreenBanner />)
    expect(screen.queryByRole('region', { name: 'Add to Home Screen' })).toBeNull()
  })

  it('doesn’t show off iOS, where these steps don’t apply', () => {
    onDevice(ANDROID_CHROME)
    render(<HomeScreenBanner />)
    expect(screen.queryByRole('region', { name: 'Add to Home Screen' })).toBeNull()
  })

  it('counts an iPad asking for the desktop site as iOS, by its touch screen', () => {
    expect(isIos(IPAD_AS_MAC, 5)).toBe(true)
    expect(isIos(IPAD_AS_MAC, 0)).toBe(false)
    expect(isIos(IPHONE_SAFARI, 5)).toBe(true)
    expect(isIos(ANDROID_CHROME, 5)).toBe(false)
  })

  it('goes away for good once dismissed', () => {
    onDevice(IPHONE_SAFARI)
    const { unmount } = render(<HomeScreenBanner />)
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }))
    expect(screen.queryByRole('region', { name: 'Add to Home Screen' })).toBeNull()
    expect(localStorage.getItem(DISMISSED_KEY)).not.toBeNull()
    unmount()
    render(<HomeScreenBanner />)
    expect(screen.queryByRole('region', { name: 'Add to Home Screen' })).toBeNull()
  })
})
