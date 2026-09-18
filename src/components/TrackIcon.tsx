/**
 * Track-shape icons shown next to event names in the header and the
 * event picker dropdown (#145). Each icon is a single-line centerline
 * traced from the reference maps in that issue, rendered with a
 * consistent square container and a thick round stroke.
 *
 * MSRC's three configurations share the same source coordinate space,
 * so 1.7 and 1.3 draw a gray full 3.1 shape underneath and paint the
 * portion being run in the darker highlight on top.
 */

import {
  MSRC_VIEWBOX,
  ECR_VIEWBOX,
  MSRC_3_1_PATH,
  MSRC_1_7_PATH,
  MSRC_1_3_PATH,
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

// The source images have different aspect ratios; render each into the
// same square container so icons line up in a list. Track paths are
// drawn at ~4% of the viewBox height, tuned to read at 28px.
const STROKE_FRACTION = 0.055

export function TrackIcon({ trackId, size = 28, className = '', title }: Props) {
  const label = title ?? (trackId ? `${trackId} track` : 'Track')

  if (trackId === 'msrc-3-1') return <MsrcIcon config="full" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-7') return <MsrcIcon config="oneSeven" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-3') return <MsrcIcon config="oneThree" size={size} className={className} label={label} />
  if (trackId === 'ecr') return <TrackShape size={size} className={className} label={label}
    viewBox={ECR_VIEWBOX} paths={[{ d: ECR_PATH, stroke: HIGHLIGHT_STROKE }]} />
  return <PlaceholderIcon size={size} className={className} label={label} />
}

interface MsrcProps { config: 'full' | 'oneSeven' | 'oneThree'; size: number; className: string; label: string }

function MsrcIcon({ config, size, className, label }: MsrcProps) {
  const paths =
    config === 'full'
      ? [{ d: MSRC_3_1_PATH, stroke: HIGHLIGHT_STROKE }]
      : [
          { d: MSRC_3_1_PATH, stroke: BASE_STROKE },
          { d: config === 'oneSeven' ? MSRC_1_7_PATH : MSRC_1_3_PATH, stroke: HIGHLIGHT_STROKE },
        ]
  return <TrackShape size={size} className={className} label={label} viewBox={MSRC_VIEWBOX} paths={paths} />
}

interface TrackShapeProps {
  size: number
  className: string
  label: string
  viewBox: { w: number; h: number }
  paths: { d: string; stroke: string }[]
}

function TrackShape({ size, className, label, viewBox, paths }: TrackShapeProps) {
  // Consistent square container — the track shape is scaled to fit inside.
  const strokeWidth = viewBox.h * STROKE_FRACTION
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
          fillRule="evenodd"
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
