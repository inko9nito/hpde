import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  FadedTrack,
  FADED_TRACK,
  FADED_TRACK_FADE,
  fadedTrackMask,
  TrackIcon,
  TRACK_ICON_IDS,
  TRACK_WINDOW,
} from './TrackIcon'

function glyph(container: HTMLElement) {
  return container.querySelector<HTMLElement>('[data-track-icon]')!
}

describe('TrackIcon', () => {
  it('masks a known track with its own shape', () => {
    const { container } = render(<TrackIcon trackId={TRACK_ICON_IDS[0]} />)
    expect(glyph(container)).toHaveAttribute('data-track-icon', TRACK_ICON_IDS[0])
    expect(glyph(container).style.maskImage).toContain(TRACK_ICON_IDS[0])
  })

  it.each([undefined, 'no-such-track'])('falls back to a 15% white checkered flag on the dark tile (trackId %s)', trackId => {
    const { container } = render(<TrackIcon trackId={trackId} tone="dark" />)
    expect(glyph(container)).toHaveAttribute('data-track-icon', 'placeholder')
    expect(glyph(container)).toHaveClass('text-white')
    expect(glyph(container).style.opacity).toBe('0.15')
    expect(glyph(container).style.maskImage).toMatch(/checkered-flag|svg/)
  })
})

describe('FadedTrack (#292)', () => {
  it('masks a known track with its own shape, in the widget track color, at 50%', () => {
    const { container } = render(<FadedTrack trackId={TRACK_ICON_IDS[0]} />)
    expect(glyph(container)).toHaveAttribute('data-track-icon', TRACK_ICON_IDS[0])
    expect(glyph(container).style.maskImage).toContain(TRACK_ICON_IDS[0])
    expect(glyph(container)).toHaveClass('bg-[#646872]/50')
  })

  it.each([undefined, 'no-such-track'])('falls back to the checkered flag (trackId %s)', trackId => {
    const { container } = render(<FadedTrack trackId={trackId} />)
    expect(glyph(container)).toHaveAttribute('data-track-icon', 'placeholder')
    expect(glyph(container).style.maskImage).toMatch(/checkered-flag|svg/)
  })

  it('fades from the top right to the bottom left, as the widget does', () => {
    // The widget lays the ground over the shape at a·u + b·v + c: about
    // -0.10 at the window's top right (all there), 1.52 at its bottom
    // left (gone), so opaque at 6.2% and clear at 67.8% down-left.
    expect(fadedTrackMask()).toBe('linear-gradient(216.9deg, #000 6.2%, transparent 67.8%)')
  })

  // The app and the widget (scripts/hpde-widget.js) draw the same card.
  it('places and fades the track with the widget Medium card numbers', () => {
    const widget = readFileSync(join(__dirname, '..', '..', 'scripts', 'hpde-widget.js'), 'utf8')
    const num = String.raw`(-?[\d.]+)`
    const win = widget.match(new RegExp(String.raw`const TRACK_SHAPE_WINDOW = \{ x: ${num}, y: ${num}, w: ${num}, h: ${num} \}`))
    expect(win?.slice(1).map(Number)).toEqual([TRACK_WINDOW.x, TRACK_WINDOW.y, TRACK_WINDOW.w, TRACK_WINDOW.h])
    const medium = widget.match(new RegExp(
      String.raw`medium: \[\{ x: ${num}, y: ${num}, w: ${num}, fade: \{ a: ${num}, b: ${num}, c: ${num} \} \}\]`,
    ))
    expect(medium?.slice(1).map(Number)).toEqual([
      FADED_TRACK.x, FADED_TRACK.y, FADED_TRACK.w, FADED_TRACK_FADE.a, FADED_TRACK_FADE.b, FADED_TRACK_FADE.c,
    ])
  })
})
