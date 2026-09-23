import { useEffect } from 'react'
import { trackIconSrc } from '../components/TrackIcon'

// Tab icon for an event page (#233): the event's track shape on the same
// tinted rounded tile TrackIcon draws in the app (gray-100 / gray-700), so
// it stays legible on both light and dark tab bars. Drawn to a canvas and
// handed over as a PNG because Safari ignores SVG favicons — and the raw
// SVGs are plain black, which would vanish on a dark tab bar anyway.
const SIZE = 64
const PADDING = 7
const RADIUS = 14
// How far (in tile px) the shape is thickened; see the stamping loop.
const BOLDEN = 1.5
const TILE_COLOR = '#f3f4f6'
const SHAPE_COLOR = '#374151'
// Raster size for an SVG that reports no intrinsic size (ours are 437).
const SOURCE_FALLBACK = 437

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** Bounding box of the non-transparent pixels, so the shape can be
 *  scaled up to fill the tile — the SVGs leave a wide empty margin
 *  that would shrink the track to a speck at 16px. */
function opaqueBounds(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const { data } = ctx.getImageData(0, 0, w, h)
  let minX = w, minY = h, maxX = -1, maxY = -1
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] === 0) continue
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  if (maxX < 0) return { x: 0, y: 0, w, h }
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 }
}

/** PNG data URL of the track shape on its tile, or the raw SVG URL when
 *  canvas isn't available. */
export async function renderTrackFavicon(src: string): Promise<string> {
  const tile = document.createElement('canvas')
  tile.width = tile.height = SIZE
  const ctx = tile.getContext('2d')
  if (!ctx) return src

  const img = await loadImage(src)

  // Paint the shape at full size, then keep SHAPE_COLOR only where it has
  // alpha (the canvas twin of TrackIcon's CSS mask).
  const w = img.naturalWidth || SOURCE_FALLBACK
  const h = img.naturalHeight || SOURCE_FALLBACK
  const shape = document.createElement('canvas')
  shape.width = w
  shape.height = h
  const shapeCtx = shape.getContext('2d', { willReadFrequently: true })
  if (!shapeCtx) return src
  shapeCtx.drawImage(img, 0, 0, w, h)
  shapeCtx.globalCompositeOperation = 'source-in'
  shapeCtx.fillStyle = SHAPE_COLOR
  shapeCtx.fillRect(0, 0, w, h)
  const box = opaqueBounds(shapeCtx, w, h)

  ctx.fillStyle = TILE_COLOR
  ctx.beginPath()
  ctx.roundRect(0, 0, SIZE, SIZE, RADIUS)
  ctx.fill()
  // Fit the cropped shape inside the padding, centered, aspect kept.
  const inner = SIZE - PADDING * 2
  const scale = inner / Math.max(box.w, box.h)
  const dw = box.w * scale
  const dh = box.h * scale
  // Stamp it in a small ring to thicken the hairline outlines, which
  // otherwise thin out to nothing once the browser shrinks this to 16px.
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const ox = Math.cos(a) * BOLDEN
    const oy = Math.sin(a) * BOLDEN
    ctx.drawImage(shape, box.x, box.y, box.w, box.h, (SIZE - dw) / 2 + ox, (SIZE - dh) / 2 + oy, dw, dh)
  }
  return tile.toDataURL('image/png')
}

function iconLink(): HTMLLinkElement | null {
  return document.head.querySelector<HTMLLinkElement>('link[rel~="icon"]')
}

/**
 * While `trackId` has a real icon, use it as the page's favicon; put
 * back whatever was there before (or nothing) when it changes or the
 * page goes away.
 */
export function useTrackFavicon(trackId: string | undefined) {
  useEffect(() => {
    const src = trackIconSrc(trackId)
    if (!src) return

    let cancelled = false
    const existing = iconLink()
    const previousHref = existing?.getAttribute('href') ?? null
    const link = existing ?? document.createElement('link')
    let applied = false

    function apply(href: string) {
      if (cancelled) return
      link.rel = 'icon'
      link.setAttribute('href', href)
      if (!existing) document.head.appendChild(link)
      applied = true
    }

    renderTrackFavicon(src).then(apply, () => apply(src))

    return () => {
      cancelled = true
      if (!applied) return
      if (!existing) link.remove()
      else if (previousHref !== null) existing.setAttribute('href', previousHref)
      else existing.removeAttribute('href')
    }
  }, [trackId])
}
