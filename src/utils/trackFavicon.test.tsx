import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useTrackFavicon, useDocumentTitle } from './trackFavicon'
import { trackIconSrc } from '../components/TrackIcon'

function iconHref(rel = 'icon') {
  return document.head.querySelector(`link[rel~="${rel}"]`)?.getAttribute('href') ?? null
}

// jsdom has no canvas, so the hook falls back to the raw SVG URL — enough
// to check which icon it picks and that it cleans up after itself.
describe('useTrackFavicon (#233)', () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    document.head.querySelectorAll('link[rel~="icon"], link[rel~="apple-touch-icon"]').forEach(l => l.remove())
  })
  afterEach(() => vi.restoreAllMocks())

  it('uses the track icon and removes it again when the page goes away', async () => {
    const { unmount } = renderHook(() => useTrackFavicon('msrc-1-7'))
    await waitFor(() => expect(iconHref()).toBe(trackIconSrc('msrc-1-7')))
    unmount()
    expect(iconHref()).toBeNull()
  })

  it('also sets the iOS touch icon (Favorites / Home Screen)', async () => {
    const { unmount } = renderHook(() => useTrackFavicon('msrc-3-1'))
    await waitFor(() => expect(iconHref('apple-touch-icon')).toBe(trackIconSrc('msrc-3-1')))
    unmount()
    expect(iconHref('apple-touch-icon')).toBeNull()
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

describe('useDocumentTitle (#233)', () => {
  it('shows the title while set and restores the previous one', () => {
    document.title = 'HPDE Schedule'
    const { rerender, unmount } = renderHook(({ t }) => useDocumentTitle(t), {
      initialProps: { t: 'TDE at MSRC 1.7CW' as string | undefined },
    })
    expect(document.title).toBe('TDE at MSRC 1.7CW')
    rerender({ t: undefined })
    expect(document.title).toBe('HPDE Schedule')
    rerender({ t: 'Another event' })
    unmount()
    expect(document.title).toBe('HPDE Schedule')
  })
})
