import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TrackIcon, TRACK_ICON_IDS } from './TrackIcon'

function glyph(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-track-icon]')!
}

describe('TrackIcon', () => {
  it('masks a known track with its own shape', () => {
    const { container } = render(<TrackIcon trackId={TRACK_ICON_IDS[0]} />)
    expect(glyph(container)).toHaveAttribute('data-track-icon', TRACK_ICON_IDS[0])
    expect(glyph(container).style.maskImage).toContain(TRACK_ICON_IDS[0])
  })

  it.each([undefined, 'no-such-track'])('falls back to a 2% white checkered flag on the dark tile (trackId %s)', trackId => {
    const { container } = render(<TrackIcon trackId={trackId} tone="dark" />)
    expect(glyph(container)).toHaveAttribute('data-track-icon', 'placeholder')
    expect(glyph(container)).toHaveClass('text-white')
    expect(glyph(container).style.opacity).toBe('0.02')
    expect(glyph(container).style.maskImage).toMatch(/checkered-flag|svg/)
  })
})
