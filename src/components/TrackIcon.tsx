import msrc31 from '../data/track-icons/msrc-3-1.svg'
import msrc17 from '../data/track-icons/msrc-1-7.svg'
import msrc13 from '../data/track-icons/msrc-1-3.svg'
import ecr27 from '../data/track-icons/ecr-2-7.svg'
import checkeredFlag from '../assets/checkered-flag.svg'

// Stylized track-shape icons keyed by the schedule's `trackId` field.
// New tracks add a file under `src/data/track-icons/` and a row here.
// A row that isn't listed here (or a missing trackId) renders the
// checkered-flag placeholder below.
const TRACK_ICONS: Record<string, string> = {
  'msrc-3-1': msrc31,
  'msrc-1-7': msrc17,
  'msrc-1-3': msrc13,
  'ecr-2-7':  ecr27,
}

/** Every trackId that has a real icon (the New event form matches these). */
export const TRACK_ICON_IDS = Object.keys(TRACK_ICONS)

/** URL of a track's raw (black-fill) SVG, or undefined when there's no
 *  real icon for it. */
export function trackIconSrc(trackId?: string): string | undefined {
  return trackId ? TRACK_ICONS[trackId] : undefined
}

type TrackIconTone = 'default' | 'selected' | 'dark'

interface Props {
  trackId?: string
  /** Rendered pixel size for the inner icon; the tinted container adds
   *  `padding` on each side. */
  size?: number
  /** Container padding on each side, in px. */
  padding?: number
  /**
   * Whether to mute (fade) the icon — mirrors the muted state passed to
   * the surrounding event card for past events.
   */
  muted?: boolean
  /** Color scheme. 'selected' tints the container and the shape blue
   *  so it reads as the active item in a list; 'dark' is the white-on-
   *  near-black tile in the event page header (#216). */
  tone?: TrackIconTone
  /** Container corner radius class. */
  radius?: string
  className?: string
}

/**
 * Small square icon that shows an event's track, wrapped in a tinted
 * rounded container so the shape doesn't hover in negative space.
 * Falls back to the checkered flag (the same glyph as the timeline's
 * "No more events today" state) for unknown / unset trackIds, so a
 * brand-new event still slots into the layout while its real icon is
 * being added.
 *
 * The real SVGs ship with a fixed black fill, so the shape is
 * recoloured with a CSS mask instead of an <img>: the `<span>` paints
 * a solid `bg-current` block, then the SVG mask cuts it to the track
 * outline. That lets the shape take its tone from the surrounding
 * text color.
 */
const TONE_CLASSES: Record<TrackIconTone, { container: string; placeholder: string }> = {
  default:  { container: 'bg-gray-100 text-gray-700', placeholder: 'text-black' },
  selected: { container: 'bg-blue-100 text-blue-600', placeholder: 'text-black' },
  dark:     { container: 'bg-gray-900 text-white',    placeholder: 'text-white' },
}

export function TrackIcon({
  trackId,
  size = 28,
  padding = 4,
  muted = false,
  tone = 'default',
  radius = 'rounded-lg',
  className,
}: Props) {
  const src = trackIconSrc(trackId)
  const toneCls = TONE_CLASSES[tone]
  const containerCls = `inline-grid shrink-0 place-items-center ${radius} ${toneCls.container} ${
    muted ? 'opacity-70' : ''
  } ${className ?? ''}`.trim()
  const boxSize = size + padding * 2
  // Quoted: Vite inlines small SVGs as data URIs with single quotes in
  // them, which an unquoted url() doesn't allow.
  const mask = `url("${src ?? checkeredFlag}")`

  return (
    <span
      className={containerCls}
      style={{ width: boxSize, height: boxSize }}
      aria-hidden="true"
    >
      {/* The placeholder flag is a 15% watermark in the tile's contrasting
          color (white on dark, black on light), so it reads as "not yet
          added" rather than as a real track. */}
      <span
        data-track-icon={src ? trackId : 'placeholder'}
        className={`block bg-current ${src ? '' : toneCls.placeholder}`.trim()}
        style={{
          width: size,
          height: size,
          WebkitMaskImage: mask,
          maskImage: mask,
          // The flag is a quiet watermark, not a stand-in shape: small and
          // faint (15%).
          WebkitMaskSize: src ? 'contain' : '56.25%',
          maskSize: src ? 'contain' : '56.25%',
          opacity: src ? undefined : 0.15,
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </span>
  )
}

// The widget's featured cards crop every track SVG (all drawn in the
// same 437-unit frame) to this window: the band the shapes sit in.
// Same numbers as TRACK_SHAPE_WINDOW in scripts/hpde-widget.js.
const TRACK_FRAME = 437
export const TRACK_WINDOW = { x: 45, y: 146, w: 347, h: 145 }

// The widget's Medium countdown card (#292, HPDE Figma 2069:8118, its
// FEATURED_TRACK.medium): where the track sits as fractions of the card
// (x and w of its width, y of its height), and its diagonal fade — the
// ground laid over the shape at alpha a·u + b·v + c, u and v running
// 0–1 across and down the track's window.
export const FADED_TRACK = { x: 0.3184, y: 0.1658, w: 0.7155 }
export const FADED_TRACK_FADE = { a: -1.0417, b: 0.5806, c: 0.9411 }

/** The fade as a CSS mask gradient over the track's window: opaque
 *  where the widget's ground overlay is 0, gone where it reaches 1.
 *  The overlay is linear across the window, so it's one linear
 *  gradient, at the angle its slope points and with stops where it
 *  crosses 0 and 1 between the window's lowest and highest corners. */
export function fadedTrackMask(fade = FADED_TRACK_FADE, win = TRACK_WINDOW): string {
  const { a, b, c } = fade
  // Slope in the window's own units (y down); CSS 0deg points up.
  const angle = (Math.atan2(a / win.w, -(b / win.h)) * 180) / Math.PI
  const corners = [c, a + c, b + c, a + b + c]
  const lo = Math.min(...corners)
  const hi = Math.max(...corners)
  const at = (f: number) => `${(((f - lo) / (hi - lo)) * 100).toFixed(1)}%`
  return `linear-gradient(${((angle + 360) % 360).toFixed(1)}deg, #000 ${at(0)}, transparent ${at(1)})`
}

/**
 * The featured card's track (#292): large, behind the card's text,
 * running off its right edge and fading along a diagonal — all there at
 * its top right, gone by its bottom left — as on the widget's Medium
 * countdown. Fills its (relative, overflow-hidden) card; the shape is
 * the widget's track color, #646872, at 50% rather than the widget's
 * 35%: a touch stronger on the app's darker ground. An event with no
 * track icon gets the checkered flag, in the same color, as the widget
 * does.
 */
export function FadedTrack({ trackId }: { trackId?: string }) {
  const src = trackIconSrc(trackId)
  const shape = `url("${src ?? checkeredFlag}")`
  const fade = fadedTrackMask()
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: `${FADED_TRACK.x * 100}%`,
        top: `${FADED_TRACK.y * 100}%`,
        width: `${FADED_TRACK.w * 100}%`,
        aspectRatio: `${TRACK_WINDOW.w} / ${TRACK_WINDOW.h}`,
        // Also clips the shape to the window (a mask hides what's outside
        // its box): some tracks' other configuration runs past it.
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
    >
      {/* The whole 437-unit frame, placed so the window fills the box. */}
      <span
        data-track-icon={src ? trackId : 'placeholder'}
        className="absolute block bg-[#646872]/50"
        style={{
          left: `${(-TRACK_WINDOW.x / TRACK_WINDOW.w) * 100}%`,
          top: `${(-TRACK_WINDOW.y / TRACK_WINDOW.h) * 100}%`,
          width: `${(TRACK_FRAME / TRACK_WINDOW.w) * 100}%`,
          height: `${(TRACK_FRAME / TRACK_WINDOW.h) * 100}%`,
          WebkitMaskImage: shape,
          maskImage: shape,
          // The flag is 56.25% of the frame, centered, as in TrackIcon.
          WebkitMaskSize: src ? '100% 100%' : '56.25%',
          maskSize: src ? '100% 100%' : '56.25%',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </span>
  )
}
