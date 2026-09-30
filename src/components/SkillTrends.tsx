import { labelled, useScrub, useWidth } from './LapTrendChart'
import { TDE_SKILLS } from '../utils/evaluation'
import type { EventEvaluation } from '../utils/evaluation'

// How the driver's TDE report cards have come along (#345): each core
// skill's score at every TDE event they've a card for, oldest to newest.
// (Car aids over activated is a percentage too, but of something else —
// lower is better — so it isn't one of these lines; it's on each event's
// card.)
//
// Nine scores on one plot would be a tangle, so it's small multiples: a
// line of its own for each, stacked like the report card's bars (the name
// over it, the score beside it), all on one scale so a steeper line is a
// bigger change, and one row of dates under them all. One series per line,
// so it's black like the best lap, and needs no legend. A tap or scrub
// picks a report card for every line at once; the scores beside the lines
// are that card's (the latest's until then), with the change from the card
// before it — in gray, not green or red, as the card's own bars are black.

/** One TDE event's report card, as the chart takes it. */
export interface ReportCardPoint {
  key: string
  /** The event's first day, ISO. */
  date: string
  /** The event's name. */
  title: string
  evaluation: EventEvaluation
}

/** One of the card's scores, and where to find it on a card. */
export interface ScoreRow {
  id: string
  label: string
  score: (e: EventEvaluation) => number | undefined
}

export const SCORE_ROWS: ScoreRow[] = TDE_SKILLS.map(({ id, label }) => ({ id, label, score: (e: EventEvaluation) => e.skills?.[id] }))

/** The cards with a score in them, oldest first; and the rows any of them scores. */
export function scoredCards(points: ReportCardPoint[]): { cards: ReportCardPoint[]; rows: ScoreRow[] } {
  const cards = points
    .filter(p => SCORE_ROWS.some(r => r.score(p.evaluation) !== undefined))
    .sort((a, b) => a.date.localeCompare(b.date) || a.key.localeCompare(b.key))
  const rows = SCORE_ROWS.filter(r => cards.some(c => r.score(c.evaluation) !== undefined))
  return { cards, rows }
}

/**
 * The one scale every line shares: from the lowest score down to a ten,
 * to the highest up to one, and never less than 20 points tall — so a
 * point or two doesn't read as a cliff.
 */
export function scoreScale(scores: number[]): { min: number; max: number } {
  let min = Math.floor(Math.min(...scores) / 10) * 10
  let max = Math.ceil(Math.max(...scores) / 10) * 10
  while (max - min < 20) {
    if (max < 100) max += 10
    else min -= 10
  }
  return { min: Math.max(0, min), max: Math.min(100, max) }
}

/** A row's score on card `i`, and the change from the last card before it with one. */
export function scoreAt(row: ScoreRow, cards: ReportCardPoint[], i: number): { score?: number; change?: number; since?: ReportCardPoint } {
  const score = row.score(cards[i].evaluation)
  if (score === undefined) return {}
  for (let j = i - 1; j >= 0; j--) {
    const before = row.score(cards[j].evaluation)
    if (before !== undefined) return { score, change: score - before, since: cards[j] }
  }
  return { score }
}

const INK = '#111827'
const MUTED = '#6b7280'
// The band each line runs in, from the scale's bottom to its top.
const BAND = '#f3f4f6'
const CROSSHAIR = '#d1d5db'
const LINE_H = 36
// Keeps the first and last points off the edges, with room for a dot.
const INSET = 12

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const day = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}`
const fullDay = (iso: string) => `${day(iso)}, ${iso.slice(0, 4)}`

function signed(n: number): string {
  return n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '±0'
}

/** Every report card's scores, a line for each (#345). */
export function SkillTrends({ points }: { points: ReportCardPoint[] }) {
  const [ref, measured] = useWidth()
  const width = measured || 300
  const { cards, rows } = scoredCards(points)
  const n = cards.length
  const x = (i: number) => INSET + (n === 1 ? (width - 2 * INSET) / 2 : (i * (width - 2 * INSET)) / (n - 1))
  const { active, handlers } = useScrub(n, x)
  if (n === 0) return null

  const { min, max } = scoreScale(rows.flatMap(r => cards.map(c => r.score(c.evaluation)).filter((s): s is number => s !== undefined)))
  const y = (score: number) => LINE_H - ((score - min) / (max - min)) * LINE_H
  const shown = active ?? n - 1
  const card = cards[shown]
  const ticks = labelled(cards.map((_, i) => x(i)), cards.map(c => day(c.date)))

  return (
    <div>
      <div className="mb-3 min-h-9" role="status" aria-live="polite">
        <p className="truncate text-sm font-semibold text-gray-900">{card.title}</p>
        <p className="truncate text-xs text-gray-500">
          {fullDay(card.date)}{active === null && n > 1 ? ' · latest' : ''}
        </p>
      </div>
      <div
        ref={ref}
        className="relative touch-pan-y select-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        tabIndex={0}
        role="group"
        aria-label={`Report card scores at each TDE event, oldest to newest, on a scale of ${min} to ${max}%: ${n} ${n === 1 ? 'report card' : 'report cards'}. Left and right arrows step through them.`}
        {...handlers}
      >
        <ul className="flex flex-col gap-3" aria-label="Scores">
          {rows.map(row => {
            const { score, change, since } = scoreAt(row, cards, shown)
            const scored = cards.flatMap((c, i) => {
              const s = row.score(c.evaluation)
              return s === undefined ? [] : [{ i, s }]
            })
            const path = scored.map(({ i, s }, k) => `${k ? 'L' : 'M'}${x(i)},${y(s)}`).join(' ')
            return (
              <li
                key={row.id}
                data-score={row.id}
                aria-label={`${row.label}: ${score !== undefined ? `${score}%` : 'not scored'}${change !== undefined && since ? `, ${signed(change)} since ${day(since.date)}` : ''}`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 text-sm text-gray-900">{row.label}</p>
                  <p className="flex shrink-0 items-baseline gap-1.5 tabular-nums">
                    {change !== undefined && <span className="text-xs text-gray-500" data-change>{signed(change)}</span>}
                    <span className="w-12 text-right text-sm font-semibold text-gray-900">{score !== undefined ? `${score}%` : '—'}</span>
                  </p>
                </div>
                <svg width={width} height={LINE_H} className="mt-1 block overflow-visible" aria-hidden="true">
                  <rect x={0} y={0} width={width} height={LINE_H} rx={4} fill={BAND} />
                  {active !== null && (
                    <line x1={x(active)} x2={x(active)} y1={0} y2={LINE_H} stroke={CROSSHAIR} strokeWidth={1} shapeRendering="crispEdges" />
                  )}
                  <path d={path} fill="none" stroke={INK} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                  {scored.map(({ i, s }) => (
                    <circle key={i} cx={x(i)} cy={y(s)} r={i === shown ? 4.5 : 3.5} fill={INK} stroke="#ffffff" strokeWidth={2} />
                  ))}
                </svg>
              </li>
            )
          })}
        </ul>
        <svg width={width} height={28} className="mt-1 block overflow-visible" aria-hidden="true">
          {ticks.map((i, k) => {
            const year = cards[i].date.slice(0, 4)
            const newYear = k === 0 || year !== cards[ticks[k - 1]].date.slice(0, 4)
            return (
              <text key={cards[i].key} x={x(i)} y={11} textAnchor="middle" fontSize={10} fill={i === shown ? INK : MUTED} fontWeight={i === shown ? 600 : 400} className="tabular-nums">
                {day(cards[i].date)}
                {newYear && <tspan x={x(i)} dy={12} fontWeight={400} fill={MUTED}>{year}</tspan>}
              </text>
            )
          })}
        </svg>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        {n === 1
          ? 'Add a report card from another TDE event to see how your scores change.'
          : `Every line runs ${min}% to ${max}%. Tap or slide across them for each report card.`}
      </p>
    </div>
  )
}
