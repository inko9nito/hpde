/**
 * Stylized track-shape icons shown next to event names in the header
 * and the event picker dropdown (#145). The icons don't include
 * corner labels or passing zones — just the shape. MSRC's three
 * configurations share one base outline, and the shorter configs
 * paint their portion darker over the full 3.1-mile shape in gray.
 */

interface Props {
  trackId?: string
  size?: number
  className?: string
  title?: string
}

const BASE_STROKE = '#d1d5db' // gray-300 — the "unused" portion of a multi-config track
const HIGHLIGHT_STROKE = 'currentColor'

export function TrackIcon({ trackId, size = 28, className = '', title }: Props) {
  const label = title ?? (trackId ? `${trackId} track` : 'Track')

  if (trackId === 'msrc-3-1') return <MsrcIcon config="full" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-7') return <MsrcIcon config="east" size={size} className={className} label={label} />
  if (trackId === 'msrc-1-3') return <MsrcIcon config="west" size={size} className={className} label={label} />
  if (trackId === 'ecr') return <EcrIcon size={size} className={className} label={label} />
  return <PlaceholderIcon size={size} className={className} label={label} />
}

// ── MSRC ────────────────────────────────────────────────────────────
// Motorsport Ranch Cresson: a large west "Roller Coaster" loop with a
// small nested "Toilet Bowl" inner loop, connected via a middle
// Sling Shot → Rattlesnake S-curve to an east loop with a distinctive
// Horseshoe / Boot Hill hairpin dip on the bottom right.
//
// The three configurations reuse this outline:
//   3.1 → whole thing darker
//   1.7 → east loop + connector darker, west loop grayed out
//   1.3 → west loop darker, east loop + connector grayed out
//
// All coordinates on a 100 × 50 viewBox.

// West loop: rounded almost-oval opening to the right at (32, 24).
const MSRC_WEST_LOOP =
  'M 32 24 ' +
  'C 32 10 20 6 12 12 ' +
  'C 2 20 2 32 12 40 ' +
  'C 22 46 32 40 32 26 Z'

// Small "Toilet Bowl" nested loop inside the west loop.
const MSRC_TOILET_BOWL =
  'M 18 20 ' +
  'C 12 20 12 32 18 32 ' +
  'C 24 32 24 20 18 20 Z'

// East loop: rounded shape with an inward hairpin (Horseshoe) on the
// bottom right. Traced clockwise from the left connection point at
// (60, 24), closing back to it.
const MSRC_EAST_LOOP =
  'M 60 24 ' +
  'C 60 10 72 4 82 8 ' +
  'C 94 12 96 24 90 30 ' +
  'C 92 38 82 42 76 36 ' +
  'L 76 32 ' +
  'C 76 26 68 26 68 32 ' +
  'L 68 38 ' +
  'C 68 44 60 42 60 30 Z'

// Middle S-connector between the two loops.
const MSRC_CONNECTOR = 'M 32 24 C 42 16 50 32 60 24'

interface MsrcProps { config: 'full' | 'east' | 'west'; size: number; className: string; label: string }

function MsrcIcon({ config, size, className, label }: MsrcProps) {
  const westActive = config !== 'east'
  const eastActive = config !== 'west'
  const westStroke = westActive ? HIGHLIGHT_STROKE : BASE_STROKE
  const eastStroke = eastActive ? HIGHLIGHT_STROKE : BASE_STROKE
  const connectorStroke = config === 'full' || config === 'east' ? HIGHLIGHT_STROKE : BASE_STROKE
  return (
    <svg
      viewBox="0 0 100 50"
      width={(size * 100) / 50}
      height={size}
      className={className}
      fill="none"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      <path d={MSRC_WEST_LOOP} stroke={westStroke} />
      <path d={MSRC_TOILET_BOWL} stroke={westStroke} strokeWidth={2} />
      <path d={MSRC_CONNECTOR} stroke={connectorStroke} />
      <path d={MSRC_EAST_LOOP} stroke={eastStroke} />
    </svg>
  )
}

// ── ECR ─────────────────────────────────────────────────────────────
// Eagles Canyon Raceway: a wide, angular closed loop with a
// characteristic pointed dogleg on the lower right.
const ECR_PATH =
  'M 12 20 ' +
  'C 4 18 4 6 14 6 ' +
  'C 26 6 34 14 42 10 ' +
  'C 52 4 66 6 72 14 ' +
  'C 76 20 84 20 90 26 ' +
  'C 94 32 90 40 82 38 ' +
  'L 70 34 ' +
  'L 84 46 ' +
  'C 88 52 78 54 70 50 ' +
  'L 44 38 ' +
  'C 34 34 22 40 16 40 ' +
  'C 8 40 6 32 10 26 ' +
  'C 10 24 10 22 12 20 Z'

interface EcrProps { size: number; className: string; label: string }

function EcrIcon({ size, className, label }: EcrProps) {
  return (
    <svg
      viewBox="0 0 100 58"
      width={(size * 100) / 58}
      height={size}
      className={className}
      fill="none"
      stroke={HIGHLIGHT_STROKE}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      <path d={ECR_PATH} />
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
