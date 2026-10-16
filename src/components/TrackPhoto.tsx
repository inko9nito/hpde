import { BackButton } from './EventHeader'
import { trackIconSrc } from './TrackIcon'

// Every track SVG is drawn in the same 437-unit square, its shape a band
// 341 units across (#346): sized by that band, the square is 437/341 of it.
const SHAPE_FRAME = 437 / 341

/**
 * A track's shape in white over its photo (#346): the app's own icon,
 * with the design's glow and shadow (HPDE Figma 2079:1128, its "M3
 * Elevation Light/3"). `width` is the shape's, not its square's; `fill`,
 * how white it is. Nothing for a track with no icon yet.
 */
export function TrackShape({ trackId, width, className = '', fill = 'bg-white/80' }: { trackId?: string; width: number; className?: string; fill?: string }) {
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
        className={`block ${fill}`}
        style={{ width: box, height: box, WebkitMaskImage: mask, maskImage: mask, WebkitMaskSize: 'contain', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskRepeat: 'no-repeat', WebkitMaskPosition: 'center', maskPosition: 'center' }}
      />
    </span>
  )
}

/** The top bar's height, as on every page pushed from the right (EventHeader, CarPage). */
export const TOP_BAR_PX = 52

/**
 * The top bar over a track page's dark header (#346), as on the app's
 * other pages: Back alone, then — once the page's title has scrolled up
 * under it (`collapsed`) — the page's name in the middle, on the pages'
 * own gray-50, as iOS's large title folds into its bar. Clear and white
 * over the photo till then. The header goes under it, from the top.
 */
export function TrackTopBar({ title, collapsed, onBack }: {
  title: string
  collapsed: boolean
  onBack: () => void
}) {
  return (
    // No room of its own for the status bar: the other pages' bars have
    // none, and iOS puts the page under it the same for all of them.
    <div className={`sticky top-0 z-20 transition-colors duration-200 ${collapsed ? 'bg-gray-50' : 'bg-transparent'}`}>
      <div
        className="mx-auto grid max-w-lg grid-cols-[minmax(max-content,1fr)_minmax(0,max-content)_minmax(max-content,1fr)] items-center gap-2 px-4"
        style={{ height: TOP_BAR_PX }}
      >
        <div className="justify-self-start"><BackButton onClick={onBack} onDark={!collapsed} /></div>
        {/* The title's echo, once it's scrolled away: fades in, but hides
            at once — hidden from assistive tech, so the name isn't
            announced twice. */}
        <span
          aria-hidden="true"
          className={`truncate text-center font-rubik text-[15px] font-semibold text-gray-900 ${
            collapsed ? 'opacity-100 transition-opacity duration-200' : 'opacity-0'
          }`}
        >
          {title}
        </span>
        <div />
      </div>
    </div>
  )
}

/** Pulls a header up under the TrackTopBar before it, to the top of the screen. */
export const UNDER_BAR = { marginTop: -TOP_BAR_PX }
