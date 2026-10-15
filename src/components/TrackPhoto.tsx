import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import { BackButton } from './EventHeader'
import { trackIconSrc } from './TrackIcon'

// Every track SVG is drawn in the same 437-unit square, its shape a band
// 341 units across (#346): sized by that band, the square is 437/341 of it.
const SHAPE_FRAME = 437 / 341

/**
 * A track's shape in white over its photo (#346): the app's own icon,
 * with the design's glow and shadow (HPDE Figma 2079:1128, its "M3
 * Elevation Light/3"). `width` is the shape's, not its square's. Nothing
 * for a track with no icon yet.
 */
export function TrackShape({ trackId, width, className = '' }: { trackId?: string; width: number; className?: string }) {
  const src = trackIconSrc(trackId)
  if (!src) return null
  const box = Math.round(width * SHAPE_FRAME)
  // Quoted: Vite inlines small SVGs as data URIs with single quotes in them.
  const mask = `url("${src}")`
  return (
    // The shadow on a wrapper: on the masked element itself, the mask would cut it off.
    <span
      aria-hidden="true"
      data-track-shape={trackId}
      className={`pointer-events-none grid place-items-center ${className}`.trim()}
      style={{ width: box, height: box, filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))' }}
    >
      <span
        className="block bg-white/80"
        style={{ width: box, height: box, WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
      />
    </span>
  )
}

/** The bar's height under the status bar: the design's 36 pt controls. */
const BAR_PX = 36

/**
 * Back over a track page's dark header (#346), sticky at the top: clear
 * over the photo, then black with the page's name once `compact` (the
 * header has scrolled up under it), as iOS's large title folds into its
 * bar. The header goes under it, from the top of the screen.
 */
export function DarkPageBar({ title, compact, onBack, barRef }: {
  title: string
  compact: boolean
  onBack: () => void
  barRef: RefObject<HTMLDivElement | null>
}) {
  return (
    <div
      ref={barRef}
      className="sticky top-0 z-20 transition-colors duration-200"
      style={{ paddingTop: 'env(safe-area-inset-top)', backgroundColor: compact ? '#000' : 'transparent' }}
    >
      <div className="relative mx-auto flex max-w-lg items-center px-6" style={{ height: BAR_PX }}>
        <BackButton onClick={onBack} onDark />
        <p
          aria-hidden={!compact}
          className="pointer-events-none absolute inset-x-16 truncate text-center font-rubik text-[17px] font-semibold text-white transition-opacity duration-200"
          style={{ opacity: compact ? 1 : 0 }}
        >
          {title}
        </p>
      </div>
    </div>
  )
}

/** Pulls a header up under the DarkPageBar before it, to the top of the screen. */
export const UNDER_BAR = { marginTop: `calc(-1 * (env(safe-area-inset-top) + ${BAR_PX}px))` }

/**
 * Whether `target` has scrolled up under the bar: its bottom edge above
 * the bar's. False until both are on the page.
 */
export function useScrolledUnder(target: RefObject<HTMLElement | null>, bar: RefObject<HTMLElement | null>): boolean {
  const [under, setUnder] = useState(false)
  useEffect(() => {
    const el = target.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setUnder(!entry.isIntersecting && entry.boundingClientRect.top < (bar.current?.getBoundingClientRect().bottom ?? 0)),
      { rootMargin: `-${bar.current?.offsetHeight ?? 0}px 0px 0px 0px` },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, bar])
  return under
}
