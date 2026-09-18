/**
 * Track-shape icons shown next to event names in the header and the
 * event picker dropdown (#145). Each icon is a hand-traced racing line
 * from the reference maps in that issue, rendered with a consistent
 * square container and a thick round stroke.
 *
 * MSRC 3.1 is composed of four sub-shapes (east lobe, west lobe, Toilet
 * Bowl inner loop, and middle Rattlesnake/Wagon Wheel/Ricochet
 * connector) in one shared coordinate space. The 1.7 icon paints the
 * east lobe darker over a gray full-3.1 base; the 1.3 icon does the
 * same but repaints west + Toilet Bowl.
 */

import {
  MSRC_VIEWBOX,
  ECR_VIEWBOX,
  MSRC_EAST_PATH,
  MSRC_WEST_PATH,
  MSRC_TOILET_BOWL_PATH,
  MSRC_MIDDLE_PATH,
  ECR_PATH,
} from './trackPaths'

interface Props {
  trackId?: string
  size?: number
  className?: string
  title?: string
}

const BASE_STROKE = '#d1d5db' // gray-300 — the "unused" portion of a multi-config MSRC track
const HIGHLIGHT_STROKE = 'currentColor'

// Stroke width as a fraction of the larger viewBox dimension so MSRC
// (tall) and ECR (wide) render at the same visible thickness at any
// given icon size.
const STROKE_FRACTION = 0.055

const MSRC_PIECES = [MSRC_EAST_PATH, MSRC_WEST_PATH, MSRC_TOILET_BOWL_PATH, MSRC_MIDDLE_PATH]
const MSRC_1_7_HIGHLIGHTED = [MSRC_EAST_PATH]
const MSRC_1_3_HIGHLIGHTED = [MSRC_WEST_PATH, MSRC_TOILET_BOWL_PATH]

export function TrackIcon({ trackId, size = 28, className = '', title }: Props) {
  const label = title ?? (trackId ? `${trackId} track` : 'Track')

  if (trackId === 'msrc-3-1') {
    return (
      <TrackShape size={size} className={className} label={label} viewBox={MSRC_VIEWBOX}
        paths={MSRC_PIECES.map(d => ({ d, stroke: HIGHLIGHT_STROKE }))} />
    )
  }
  if (trackId === 'msrc-1-7' || trackId === 'msrc-1-3') {
    const highlighted = trackId === 'msrc-1-7' ? MSRC_1_7_HIGHLIGHTED : MSRC_1_3_HIGHLIGHTED
    return (
      <TrackShape size={size} className={className} label={label} viewBox={MSRC_VIEWBOX}
        paths={[
          ...MSRC_PIECES.map(d => ({ d, stroke: BASE_STROKE })),
          ...highlighted.map(d => ({ d, stroke: HIGHLIGHT_STROKE })),
        ]} />
    )
  }
  if (trackId === 'ecr') {
    return (
      <TrackShape size={size} className={className} label={label} viewBox={ECR_VIEWBOX}
        paths={[{ d: ECR_PATH, stroke: HIGHLIGHT_STROKE }]} />
    )
  }
  return <PlaceholderIcon size={size} className={className} label={label} />
}

interface TrackShapeProps {
  size: number
  className: string
  label: string
  viewBox: { w: number; h: number }
  paths: { d: string; stroke: string }[]
}

function TrackShape({ size, className, label, viewBox, paths }: TrackShapeProps) {
  const strokeWidth = Math.max(viewBox.w, viewBox.h) * STROKE_FRACTION
  return (
    <svg
      viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
      width={size}
      height={size}
      className={className}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label}
    >
      {paths.map(({ d, stroke }, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

// ── Placeholder ─────────────────────────────────────────────────────
interface PlaceholderProps { size: number; className: string; label: string }

function PlaceholderIcon({ size, className, label }: PlaceholderProps) {
  return (
    <svg
      viewBox="0 0 48 32"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      stroke={BASE_STROKE}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray="3 3"
      role="img"
      aria-label={label}
    >
      <path d="M 8 16 C 8 6 22 4 28 10 C 34 16 40 12 40 20 C 40 28 26 30 20 24 C 14 18 8 26 8 16 Z" />
    </svg>
  )
}
