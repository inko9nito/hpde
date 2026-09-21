import msrc31 from '../data/track-icons/msrc-3-1.svg'
import msrc17 from '../data/track-icons/msrc-1-7.svg'
import msrc13 from '../data/track-icons/msrc-1-3.svg'
import ecr27 from '../data/track-icons/ecr-2-7.svg'

// Stylized track-shape icons keyed by the schedule's `trackId` field.
// New tracks add a file under `src/data/track-icons/` and a row here.
// A row that isn't listed here (or a missing trackId) renders the
// placeholder loop below.
const TRACK_ICONS: Record<string, string> = {
  'msrc-3-1': msrc31,
  'msrc-1-7': msrc17,
  'msrc-1-3': msrc13,
  'ecr-2-7':  ecr27,
}

type TrackIconTone = 'default' | 'selected'

interface Props {
  trackId?: string
  /** Rendered pixel size for the inner icon; the tinted container adds
   *  4px of padding on each side. */
  size?: number
  /**
   * Whether to mute (fade) the icon — mirrors the muted state passed to
   * the surrounding event card for past events.
   */
  muted?: boolean
  /** Color scheme. 'selected' tints the container and the shape blue
   *  so it reads as the active item in the picker dropdown. */
  tone?: TrackIconTone
  className?: string
}

/**
 * Small square icon that shows an event's track, wrapped in a tinted
 * rounded container so the shape doesn't hover in negative space.
 * Falls back to a neutral dashed loop for unknown / unset trackIds so
 * a brand-new event still slots into the layout while its real icon
 * is being added.
 *
 * The real SVGs ship with a fixed black fill, so the shape is
 * recoloured with a CSS mask instead of an <img>: the `<span>` paints
 * a solid `bg-current` block, then the SVG mask cuts it to the track
 * outline. That lets the shape take its tone from the surrounding
 * text color.
 */
export function TrackIcon({ trackId, size = 28, muted = false, tone = 'default', className }: Props) {
  const src = trackId ? TRACK_ICONS[trackId] : undefined
  const toneCls = tone === 'selected'
    ? 'bg-blue-100 text-blue-600'
    : 'bg-gray-100 text-gray-700'
  const containerCls = `inline-grid shrink-0 place-items-center rounded-lg ${toneCls} ${
    muted ? 'opacity-70' : ''
  } ${className ?? ''}`.trim()
  // Fixed 4px padding all around: container box is size + 8.
  const boxSize = size + 8

  return (
    <span
      className={containerCls}
      style={{ width: boxSize, height: boxSize }}
      aria-hidden="true"
    >
      {src ? (
        <span
          className="block bg-current"
          style={{
            width: size,
            height: size,
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      ) : (
        // Placeholder loop uses its own lighter tone so it clearly
        // reads as "not yet added" rather than as a real track.
        <svg
          viewBox="0 0 32 32"
          width={size}
          height={size}
          className={`block ${tone === 'selected' ? 'text-blue-300' : 'text-gray-300'}`}
          fill="none"
        >
          <path
            d="M6 16 C6 9 12 5 17 6 C24 7 27 12 27 17 C27 23 22 27 15 27 C9 27 6 22 6 16 Z"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
        </svg>
      )}
    </span>
  )
}
