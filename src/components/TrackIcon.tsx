/**
 * Traced track-shape icons shown next to event names in the header
 * and the event picker dropdown (#145). The paths were traced with
 * potrace from the reference maps in that issue, then despeckled to
 * strip corner numbers and labels — see `trackPaths.ts`.
 *
 * MSRC's three configurations share the 3.1-mile viewBox and its
 * coordinate space: the shorter configs render the full 3.1 shape
 * in light gray and paint the portion being run darker on top of it.
 */

import { MSRC_3_1_PATH, MSRC_1_7_PATH, MSRC_1_3_PATH, ECR_PATH } from './trackPaths'

interface Props {
  trackId?: string
  size?: number
  className?: string
  title?: string
}

const BASE_FILL = '#e5e7eb' // gray-200 — the "unused" portion of a multi-config MSRC track
const HIGHLIGHT_FILL = 'currentColor'

// Source images were all traced at their native pixel dimensions.
const MSRC_W = 1536
const MSRC_H = 1117
const ECR_W = 1728
const ECR_H = 796

export function TrackIcon({ trackId, size = 28, className = '', title }: Props) {
  const label = title ?? (trackId ? `${trackId} track` : 'Track')

  if (trackId === 'msrc-3-1') return <MsrcIcon config="full" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-7') return <MsrcIcon config="oneSeven" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-3') return <MsrcIcon config="oneThree" size={size} className={className} label={label} />
  if (trackId === 'ecr') return <EcrIcon size={size} className={className} label={label} />
  return <PlaceholderIcon size={size} className={className} label={label} />
}

interface MsrcProps { config: 'full' | 'oneSeven' | 'oneThree'; size: number; className: string; label: string }

function MsrcIcon({ config, size, className, label }: MsrcProps) {
  const width = (size * MSRC_W) / MSRC_H
  return (
    <svg
      viewBox={`0 0 ${MSRC_W} ${MSRC_H}`}
      width={width}
      height={size}
      className={className}
      role="img"
      aria-label={label}
    >
      <g transform={`translate(0 ${MSRC_H}) scale(0.1 -0.1)`}>
        {config === 'full' ? (
          <path d={MSRC_3_1_PATH} fill={HIGHLIGHT_FILL} fillRule="evenodd" />
        ) : (
          <>
            <path d={MSRC_3_1_PATH} fill={BASE_FILL} fillRule="evenodd" />
            <path
              d={config === 'oneSeven' ? MSRC_1_7_PATH : MSRC_1_3_PATH}
              fill={HIGHLIGHT_FILL}
              fillRule="evenodd"
            />
          </>
        )}
      </g>
    </svg>
  )
}

interface EcrProps { size: number; className: string; label: string }

function EcrIcon({ size, className, label }: EcrProps) {
  const width = (size * ECR_W) / ECR_H
  return (
    <svg
      viewBox={`0 0 ${ECR_W} ${ECR_H}`}
      width={width}
      height={size}
      className={className}
      role="img"
      aria-label={label}
    >
      <g transform={`translate(0 ${ECR_H}) scale(0.1 -0.1)`}>
        <path d={ECR_PATH} fill={HIGHLIGHT_FILL} fillRule="evenodd" />
      </g>
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
      width={(size * 48) / 32}
      height={size}
      className={className}
      fill="none"
      stroke={BASE_FILL}
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
