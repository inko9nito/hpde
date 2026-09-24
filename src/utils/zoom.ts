// Pan/zoom math for the track map viewer (#259). Coordinates are relative to
// the center of the stage (the full-screen viewer), where the image sits
// centered at rest; `x`/`y` move it from there and `scale` grows it around
// its own center.

export interface View { scale: number; x: number; y: number }
export interface Point { x: number; y: number }
/** The image's size at scale 1, and the stage's. */
export interface Bounds { imageWidth: number; imageHeight: number; stageWidth: number; stageHeight: number }

export const MIN_SCALE = 1
/** The map photos are ~1500px wide; past this it's just bigger pixels. */
export const MAX_SCALE = 4
/** Where a double-tap zooms to from the fitted image. */
export const DOUBLE_TAP_SCALE = 2.5

export const REST: View = { scale: 1, x: 0, y: 0 }

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}

/**
 * Scale clamped to [MIN_SCALE, MAX_SCALE], and the image kept covering the
 * stage along any axis where it's bigger than the stage (centered along one
 * where it isn't), so it can't be dragged off screen.
 */
export function clampView(view: View, b: Bounds): View {
  const scale = clamp(view.scale, MIN_SCALE, MAX_SCALE)
  const maxX = Math.max(0, (b.imageWidth * scale - b.stageWidth) / 2)
  const maxY = Math.max(0, (b.imageHeight * scale - b.stageHeight) / 2)
  // `+ 0` turns -0 into 0.
  return { scale, x: clamp(view.x, -maxX, maxX) + 0, y: clamp(view.y, -maxY, maxY) + 0 }
}

function zoomAround(view: View, factor: number, focal: Point): View {
  const scale = clamp(view.scale * factor, MIN_SCALE, MAX_SCALE)
  const k = scale / view.scale
  return { scale, x: focal.x - k * (focal.x - view.x), y: focal.y - k * (focal.y - view.y) }
}

/** Zoomed by `factor`, keeping the point under `focal` where it is. */
export function zoomAt(view: View, factor: number, focal: Point, b: Bounds): View {
  return clampView(zoomAround(view, factor, focal), b)
}

/**
 * Two fingers from `start` to `now`: zoomed by how far they spread, around
 * where they started, then moved with their midpoint.
 */
export function pinch(view: View, start: [Point, Point], now: [Point, Point], b: Bounds): View {
  const startDistance = distance(start[0], start[1])
  const factor = startDistance > 0 ? distance(now[0], now[1]) / startDistance : 1
  const from = midpoint(start[0], start[1])
  const to = midpoint(now[0], now[1])
  const zoomed = zoomAround(view, factor, from)
  return clampView({ ...zoomed, x: zoomed.x + to.x - from.x, y: zoomed.y + to.y - from.y }, b)
}

/** Double-tap: zoom in on the tapped point, or back out if already zoomed. */
export function toggleZoom(view: View, focal: Point, b: Bounds): View {
  return view.scale > MIN_SCALE ? REST : zoomAt(view, DOUBLE_TAP_SCALE / view.scale, focal, b)
}

export function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

export function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}
