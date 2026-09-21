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

interface Props {
  trackId?: string
  /** Rendered pixel size for the (square) icon. */
  size?: number
  /**
   * Whether to mute (fade) the icon — mirrors the muted state passed to
   * the surrounding event card for past events.
   */
  muted?: boolean
  className?: string
}

/**
 * Small square icon that shows an event's track. Falls back to a
 * neutral dashed loop for unknown / unset trackIds so a brand-new
 * event still slots into the layout while its real icon is being
 * added.
 */
export function TrackIcon({ trackId, size = 28, muted = false, className }: Props) {
  const src = trackId ? TRACK_ICONS[trackId] : undefined
  const cls = `shrink-0 ${muted ? 'opacity-60' : ''} ${className ?? ''}`.trim()

  if (src) {
    return (
      <img
        src={src}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className={cls}
      />
    )
  }

  // Placeholder: neutral dashed loop. Uses currentColor so it inherits
  // the surrounding text color and mutes with it.
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      className={`${cls} text-gray-300`}
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
  )
}
