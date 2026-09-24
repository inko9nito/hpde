import { describe, it, expect } from 'vitest'
import { clampView, zoomAt, pinch, toggleZoom, REST, MAX_SCALE, DOUBLE_TAP_SCALE } from './zoom'

// A 300×200 map fitted in a 400×800 phone screen.
const b = { imageWidth: 300, imageHeight: 200, stageWidth: 400, stageHeight: 800 }

describe('clampView', () => {
  it('keeps the scale between fitted and MAX_SCALE', () => {
    expect(clampView({ scale: 0.5, x: 0, y: 0 }, b).scale).toBe(1)
    expect(clampView({ scale: 20, x: 0, y: 0 }, b).scale).toBe(MAX_SCALE)
  })

  it('centers the image along an axis where it fits the screen', () => {
    expect(clampView({ scale: 1, x: 50, y: -50 }, b)).toEqual(REST)
    // 600 tall at 3×: still fits the 800 screen height.
    expect(clampView({ scale: 3, x: 0, y: 100 }, b).y).toBe(0)
  })

  it('stops a zoomed image’s edge at the screen’s edge', () => {
    // 900 wide at 3× on a 400 screen: 250 either way.
    expect(clampView({ scale: 3, x: 1000, y: 0 }, b).x).toBe(250)
    expect(clampView({ scale: 3, x: -1000, y: 0 }, b).x).toBe(-250)
  })
})

describe('zoomAt', () => {
  it('keeps the point under the finger in place', () => {
    // A map bigger than the screen both ways once zoomed, so neither axis
    // is re-centered.
    const big = { ...b, imageWidth: 400, imageHeight: 600 }
    const focal = { x: 100, y: 50 }
    const view = zoomAt(REST, 2, focal, big)
    expect(view.scale).toBe(2)
    // The image point that was under (100, 50) is at x + scale * 100,
    // y + scale * 50 afterwards.
    expect(view.x + view.scale * focal.x).toBe(focal.x)
    expect(view.y + view.scale * focal.y).toBe(focal.y)
  })

  it('zooms back out to the fitted image, centered', () => {
    const view = zoomAt({ scale: 3, x: 200, y: 0 }, 1 / 10, { x: 150, y: 0 }, b)
    expect(view).toEqual(REST)
  })
})

describe('pinch', () => {
  it('zooms by how far the fingers spread', () => {
    const view = pinch(REST, [{ x: -50, y: 0 }, { x: 50, y: 0 }], [{ x: -100, y: 0 }, { x: 100, y: 0 }], b)
    expect(view).toEqual({ scale: 2, x: 0, y: 0 })
  })

  it('pans with the fingers’ midpoint', () => {
    const zoomed = { scale: 3, x: 0, y: 0 }
    const view = pinch(zoomed, [{ x: -50, y: 0 }, { x: 50, y: 0 }], [{ x: -10, y: 0 }, { x: 90, y: 0 }], b)
    expect(view).toEqual({ scale: 3, x: 40, y: 0 })
  })
})

describe('toggleZoom', () => {
  it('zooms in on the tapped point, then back out', () => {
    const tap = { x: 60, y: 20 }
    const zoomed = toggleZoom(REST, tap, b)
    expect(zoomed.scale).toBe(DOUBLE_TAP_SCALE)
    expect(zoomed.x + zoomed.scale * tap.x).toBeCloseTo(tap.x)
    expect(toggleZoom(zoomed, tap, b)).toEqual(REST)
  })
})
