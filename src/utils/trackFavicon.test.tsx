import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTrackFavicon } from './trackFavicon'
import { trackIconSrc } from '../components/TrackIcon'

function iconHref() {
  return document.head.querySelector('link[rel~="icon"]')?.getAttribute('href') ?? null
}

// jsdom has no canvas, so the hook falls back to the raw SVG URL — enough
// to check which icon it picks and that it cleans up after itself.
describe('useTrackFavicon (#233)', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    document.head.querySelectorAll('link[rel~="icon"]').forEach(l => l.remove())
  })
  afterEach(() => vi.restoreAllMocks())

  it('uses the track icon and removes it again when the page goes away', async () => {
    const { unmount } = renderHook(() => useTrackFavicon('msrc-1-7'))
    await waitFor(() => expect(iconHref()).toBe(trackIconSrc('msrc-1-7')))
    unmount()
    expect(iconHref()).toBeNull()
  })

  it('follows the track when switching events', async () => {
    const { rerender } = renderHook(({ id }) => useTrackFavicon(id), {
      initialProps: { id: 'msrc-1-7' as string | undefined },
    })
    await waitFor(() => expect(iconHref()).toBe(trackIconSrc('msrc-1-7')))
    rerender({ id: 'ecr-2-7' })
    await waitFor(() => expect(iconHref()).toBe(trackIconSrc('ecr-2-7')))
    rerender({ id: undefined })
    expect(iconHref()).toBeNull()
  })

  it('leaves the page favicon alone for a track with no icon', () => {
    renderHook(() => useTrackFavicon('harris-hill'))
    expect(iconHref()).toBeNull()
  })

  it('restores an existing favicon', async () => {
    const link = document.createElement('link')
    link.rel = 'icon'
    link.href = '/favicon.png'
    document.head.appendChild(link)

    const { unmount } = renderHook(() => useTrackFavicon('ecr-2-7'))
    await waitFor(() => expect(iconHref()).toBe(trackIconSrc('ecr-2-7')))
    unmount()
    expect(iconHref()).toBe('/favicon.png')
    link.remove()
  })
})
