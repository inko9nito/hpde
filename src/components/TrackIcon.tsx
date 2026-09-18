/**
 * Track-shape icons shown next to event names in the header and the
 * event picker dropdown (#145). Each icon is a single-line centerline
 * traced from the reference maps in that issue, rendered with a
 * consistent square container and a thick round stroke.
 *
 * MSRC 3.1 is one traced centerline; the 1.7 and 1.3 configs re-use
 * that same trace and highlight only the portion each one runs, so
 * they overlay exactly on the gray 3.1 base.
 */

import {
  MSRC_VIEWBOX,
  ECR_VIEWBOX,
  MSRC_FULL_PATH,
  MSRC_ONE_SEVEN_PATH,
  MSRC_ONE_THREE_PATH,
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

// Stroke width as a fraction of the LARGER viewBox dimension. Tuned so
// the ribbon reads as a real track at 28px and stays clean up to 240px+,
// and so tall (MSRC) and short (ECR) source viewBoxes render at the
// same visible thickness at any given icon size.
const STROKE_FRACTION = 0.055

export function TrackIcon({ trackId, size = 28, className = '', title }: Props) {
  const label = title ?? (trackId ? `${trackId} track` : 'Track')

  if (trackId === 'msrc-3-1') return <MsrcIcon config="full" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-7') return <MsrcIcon config="oneSeven" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-3') return <MsrcIcon config="oneThree" size={size} className={className} label={label} />
  if (trackId === 'ecr') {
    return (
      <TrackShape
        size={size}
        className={className}
        label={label}
        viewBox={ECR_VIEWBOX}
        paths={[{ d: ECR_PATH, stroke: HIGHLIGHT_STROKE, closed: true }]}
      />
    )
  }
  return <PlaceholderIcon size={size} className={className} label={label} />
}

interface MsrcProps { config: 'full' | 'oneSeven' | 'oneThree'; size: number; className: string; label: string }

function MsrcIcon({ config, size, className, label }: MsrcProps) {
  const paths =
    config === 'full'
      ? [{ d: MSRC_FULL_PATH, stroke: HIGHLIGHT_STROKE, closed: true }]
      : [
          { d: MSRC_FULL_PATH, stroke: BASE_STROKE, closed: true },
          {
            d: config === 'oneSeven' ? MSRC_ONE_SEVEN_PATH : MSRC_ONE_THREE_PATH,
            stroke: HIGHLIGHT_STROKE,
            closed: true,
          },
        ]
  return <TrackShape size={size} className={className} label={label} viewBox={MSRC_VIEWBOX} paths={paths} />
}

interface TrackShapeProps {
  size: number
  className: string
  label: string
  viewBox: { w: number; h: number }
  paths: { d: string; stroke: string; closed: boolean }[]
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
// Shown for events whose track we don't have a shape for yet.
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
