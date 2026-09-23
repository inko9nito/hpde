import { useEffect } from 'react'
import { trackIconSrc } from '../components/TrackIcon'

// Page icons for an event page (#233): the event's track shape, drawn to a
// canvas and handed over as PNGs. PNG because Safari ignores SVG favicons,
// and because the raw SVGs are plain black, which would vanish on a dark
// tab bar.
//
// - favicon: the rounded gray-100 / gray-700 tile TrackIcon draws in the
//   app, so it reads on light and dark tab bars.
// - apple-touch-icon: what iOS uses for Favorites and Add to Home Screen
//   (it never reads the favicon). Square and opaque, because iOS rounds
//   the corners itself and fills any transparency with black.
interface IconStyle {
  size: number
  padding: number
  /** Corner radius of the tile; 0 for a full-bleed square. */
  radius: number
  /** How far (in tile px) the shape is thickened; see the stamping loop. */
  bolden: number
  tileColor: string
}
const FAVICON: IconStyle = { size: 64, padding: 7, radius: 14, bolden: 1.5, tileColor: '#f3f4f6' }
// White like other Favorites tiles: gray-100 vanishes on iOS's gray sheet.
const TOUCH_ICON: IconStyle = { size: 180, padding: 30, radius: 0, bolden: 2, tileColor: '#ffffff' }
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
export async function renderTrackIcon(src: string, style: IconStyle = FAVICON): Promise<string> {
  const { size: SIZE, padding: PADDING, radius: RADIUS, bolden: BOLDEN } = style
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

  ctx.fillStyle = style.tileColor
  if (RADIUS > 0) {
    ctx.beginPath()
    ctx.roundRect(0, 0, SIZE, SIZE, RADIUS)
    ctx.fill()
  } else {
    ctx.fillRect(0, 0, SIZE, SIZE)
  }
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

/**
 * Point the page's `<link rel={rel}>` at `href`, creating the link if
 * there isn't one. Returns a function that puts back whatever was there
 * before (or removes the link it added).
 */
function swapLink(rel: string, href: string): () => void {
  const existing = document.head.querySelector<HTMLLinkElement>(`link[rel~="${rel}"]`)
  const previousHref = existing?.getAttribute('href') ?? null
  const link = existing ?? document.createElement('link')
  link.rel = rel
  link.setAttribute('href', href)
  if (!existing) document.head.appendChild(link)
  return () => {
    if (!existing) link.remove()
    else if (previousHref !== null) existing.setAttribute('href', previousHref)
    else existing.removeAttribute('href')
  }
}

/**
 * While `trackId` has a real icon, use it as the page's favicon and iOS
 * touch icon; put back whatever was there before (or nothing) when it
 * changes or the page goes away.
 */
export function useTrackFavicon(trackId: string | undefined) {
  useEffect(() => {
    const src = trackIconSrc(trackId)
    if (!src) return

    let cancelled = false
    const restores: (() => void)[] = []
    const icons: [rel: string, style: IconStyle][] = [
      ['icon', FAVICON],
      ['apple-touch-icon', TOUCH_ICON],
    ]
    for (const [rel, style] of icons) {
      const apply = (href: string) => {
        if (!cancelled) restores.push(swapLink(rel, href))
      }
      renderTrackIcon(src, style).then(apply, () => apply(src))
    }

    return () => {
      cancelled = true
      restores.forEach(restore => restore())
    }
  }, [trackId])
}

/** Use `title` as the document title while set; put the previous one
 *  back when it changes or the page goes away. */
export function useDocumentTitle(title: string | undefined) {
  useEffect(() => {
    if (!title) return
    const previous = document.title
    document.title = title
    return () => { document.title = previous }
  }, [title])
}
