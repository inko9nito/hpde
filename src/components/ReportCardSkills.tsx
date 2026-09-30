import { useState } from 'react'
import { useWidth } from './LapTrendChart'
import { TDE_SKILLS } from '../utils/evaluation'
import type { EventEvaluation, TdeSkillId } from '../utils/evaluation'

// How the driver's TDE report cards have come along (#345), on the
// Instructor evaluations page, in two cards:
//   - an overview: the skills most improved since their first report card,
//     and the ones that need the most work on their latest;
//   - the skills wheel: a spoke for each core skill, and each card's scores
//     as a shape on it, so a bigger shape is a better card. Tap a skill for
//     its score at each event, as a list.
// Only the core skills: Car aids over activated is a percentage too, but
// of something else (lower is better), so it stays on each event's card.
// In black and grays, as the report card's own bars are: the latest card
// solid black, the first dashed gray, any between in a mid gray.

/** One TDE event's report card. */
export interface ReportCardPoint {
  key: string
  /** The event's first day, ISO. */
  date: string
  /** The event's name. */
  title: string
  evaluation: EventEvaluation
}

type Skill = typeof TDE_SKILLS[number]

const scoreOf = (card: ReportCardPoint, id: TdeSkillId) => card.evaluation.skills?.[id]

/** The cards with a core skill scored, oldest first; and the skills any of them scores. */
export function scoredCards(points: ReportCardPoint[]): { cards: ReportCardPoint[]; skills: Skill[] } {
  const cards = points
    .filter(p => TDE_SKILLS.some(s => scoreOf(p, s.id) !== undefined))
    .sort((a, b) => a.date.localeCompare(b.date) || a.key.localeCompare(b.key))
  const skills = TDE_SKILLS.filter(s => cards.some(c => scoreOf(c, s.id) !== undefined))
  return { cards, skills }
}

/** A skill's score on each card that scored it, oldest first, with the change from the one before. */
export function skillHistory(skill: TdeSkillId, cards: ReportCardPoint[]): { card: ReportCardPoint; score: number; change?: number }[] {
  const out: { card: ReportCardPoint; score: number; change?: number }[] = []
  for (const card of cards) {
    const score = scoreOf(card, skill)
    if (score === undefined) continue
    const before = out[out.length - 1]
    out.push({ card, score, ...(before ? { change: score - before.score } : {}) })
  }
  return out
}

export interface SkillMove {
  skill: Skill
  /** On the latest card that scored it. */
  latest: number
  /** Since the first card that scored it; none with only one. */
  gain?: number
}

/**
 * The overview's two lists, three skills each: the most improved (the
 * biggest gains since the first card, only ones that went up), and the
 * ones that need the most work (the lowest now, the least improved first
 * among equals).
 */
export function skillMoves(cards: ReportCardPoint[], count = 3): { improved: SkillMove[]; needsWork: SkillMove[] } {
  const moves = TDE_SKILLS.flatMap((skill): SkillMove[] => {
    const history = skillHistory(skill.id, cards)
    if (!history.length) return []
    const latest = history[history.length - 1].score
    return [{ skill, latest, ...(history.length > 1 ? { gain: latest - history[0].score } : {}) }]
  })
  const improved = moves
    .filter(m => (m.gain ?? 0) > 0)
    .sort((a, b) => b.gain! - a.gain! || b.latest - a.latest)
    .slice(0, count)
  const needsWork = [...moves]
    .sort((a, b) => a.latest - b.latest || (a.gain ?? 0) - (b.gain ?? 0))
    .slice(0, count)
  return { improved, needsWork }
}

// The wheel's scale: 0% at the middle, 100% at the rim, a ring every 20%.
// A middle above zero put a 50% score on the center point, where it read as
// no score at all.
const RINGS = [20, 40, 60, 80, 100]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const day = (iso: string) => `${MONTHS[Number(iso.slice(5, 7)) - 1]} ${Number(iso.slice(8, 10))}`
const fullDay = (iso: string) => `${day(iso)}, ${iso.slice(0, 4)}`

function signed(n: number): string {
  return n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '±0'
}

const CARD = 'rounded-2xl border border-gray-200 bg-white p-4'

function CardHead({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h2 className="text-[13px] font-semibold text-gray-500">{title}</h2>
      {meta && <span className="text-xs text-gray-400">{meta}</span>}
    </div>
  )
}

function MoveList({ title, caption, moves, value, empty }: {
  title: string
  caption?: string
  moves: SkillMove[]
  value: (m: SkillMove) => string
  empty: string
}) {
  return (
    <section aria-label={title} className="min-w-0">
      <h3 className="text-xs font-semibold text-gray-500">{title}</h3>
      {caption && <p className="text-[11px] text-gray-400">{caption}</p>}
      {moves.length ? (
        <ol className="mt-2 flex flex-col gap-2">
          {moves.map(m => (
            <li key={m.skill.id} className="flex items-baseline justify-between gap-2 text-sm" title={m.skill.label}>
              <span className="min-w-0 truncate text-gray-900">{m.skill.short}</span>
              <span className="shrink-0 font-semibold tabular-nums text-gray-900">{value(m)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-xs text-gray-400">{empty}</p>
      )}
    </section>
  )
}

/** The overview (#345): the skills most improved since the first report card, and those that need the most work. */
export function SkillOverview({ points }: { points: ReportCardPoint[] }) {
  const { cards } = scoredCards(points)
  if (!cards.length) return null
  const { improved, needsWork } = skillMoves(cards)
  const [first, latest] = [cards[0], cards[cards.length - 1]]
  return (
    <section aria-label="Report card overview" className={CARD}>
      <CardHead title="TDE report cards" meta={`${cards.length} ${cards.length === 1 ? 'event' : 'events'}`} />
      <div className="grid grid-cols-2 gap-4">
        <MoveList
          title="Most improved"
          caption={cards.length > 1 ? `Since ${day(first.date)}` : undefined}
          moves={improved}
          value={m => signed(m.gain!)}
          empty={cards.length > 1 ? 'No gains yet.' : 'Add a report card from another TDE event to see what’s improved.'}
        />
        <MoveList
          title="Needs work"
          caption={`On ${day(latest.date)}`}
          moves={needsWork}
          value={m => `${m.latest}%`}
          empty="Nothing scored yet."
        />
      </div>
    </section>
  )
}

// Which report card is which, on the wheel, its chips and a skill's list:
// a marker shape at its points (newest ●, then ■, ▲, ◆) and a line, newest
// solid black and shaded, older ones grayer and broken. Not by hue: every
// hue is a run group's somewhere in the app, and the one color here (green
// and rose) means up or down.
const INK = '#111827'
const RING = '#e5e7eb'
type Shape = 'circle' | 'square' | 'triangle' | 'diamond'
const SHAPES: Shape[] = ['circle', 'square', 'triangle', 'diamond']
const LINES = [
  { stroke: INK, dash: undefined, width: 2, fill: 'rgba(17, 24, 39, 0.07)' },
  { stroke: '#4b5563', dash: undefined, width: 1.75, fill: 'none' },
  { stroke: '#6b7280', dash: '5 3', width: 1.75, fill: 'none' },
  { stroke: '#9ca3af', dash: '1.5 3', width: 1.75, fill: 'none' },
]

/** Card `k` of `n` (oldest first): by how recent it is. Past the fourth newest, the shapes come round again, hollow. */
export function cardStyle(k: number, n: number) {
  const recency = n - 1 - k
  const line = LINES[Math.min(recency, LINES.length - 1)]
  return { ...line, shape: SHAPES[recency % SHAPES.length], hollow: recency >= SHAPES.length }
}

/** A card's marker at (x, y), `r` from its middle to its edge. */
function Marker({ shape, hollow, x, y, r, color }: { shape: Shape; hollow: boolean; x: number; y: number; r: number; color: string }) {
  const paint = { fill: hollow ? '#ffffff' : color, stroke: hollow ? color : '#ffffff', strokeWidth: 1.25 }
  if (shape === 'circle') return <circle cx={x} cy={y} r={r} {...paint} />
  if (shape === 'square') return <rect x={x - r * 0.85} y={y - r * 0.85} width={r * 1.7} height={r * 1.7} {...paint} />
  if (shape === 'triangle') {
    const h = r * 1.15
    return <polygon points={`${x},${y - h} ${x + h},${y + h * 0.75} ${x - h},${y + h * 0.75}`} {...paint} />
  }
  return <polygon points={`${x},${y - r * 1.2} ${x + r * 1.2},${y} ${x},${y + r * 1.2} ${x - r * 1.2},${y}`} {...paint} />
}

/** A card's line with its marker on it, for its chip and a skill's list. */
function CardKey({ k, n }: { k: number; n: number }) {
  const style = cardStyle(k, n)
  return (
    <svg aria-hidden="true" width={20} height={10} className="shrink-0 overflow-visible" data-shape={style.shape}>
      <line x1={0} x2={20} y1={5} y2={5} stroke={style.stroke} strokeWidth={2} strokeDasharray={style.dash} />
      <Marker shape={style.shape} hollow={style.hollow} x={10} y={5} r={3.5} color={style.stroke} />
    </svg>
  )
}

// A change from the event before, on a skill's bar, in soft green and rose
// — the only color here, and only for up and down: what it gained, hatched
// on the end of the bar; what it lost, hatched over the part of the bar it
// no longer fills.
const GAIN = 'repeating-linear-gradient(-45deg, #34d399 0 1.5px, #d1fae5 1.5px 3.5px)'
const LOSS = 'repeating-linear-gradient(-45deg, #fb7185 0 1.5px, #ffe4e6 1.5px 3.5px)'

function Swatch({ pattern }: { pattern: string }) {
  return <span aria-hidden="true" className="inline-block h-2 w-4 rounded-sm" style={{ background: pattern }} />
}

/** The change beside a score: green up, rose down, gray none. */
function Change({ change }: { change: number }) {
  const tone = change > 0 ? 'text-emerald-700' : change < 0 ? 'text-rose-700' : 'text-gray-500'
  return <span className={`shrink-0 text-xs font-medium tabular-nums ${tone}`}>{signed(change)}</span>
}

/**
 * A skill's score at one event, 0% to 100%, as the report card draws it:
 * black up to the score — or, after a gain, up to the score before it, and
 * hatched green on to the score; after a drop, black to the score, and the
 * part it lost hatched rose.
 */
export function ScoreBar({ score, change }: { score: number; change?: number }) {
  const before = change !== undefined ? score - change : score
  const solid = Math.min(score, before)
  const pct = (v: number) => `${Math.max(0, Math.min(100, v))}%`
  return (
    <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-gray-100" aria-hidden="true" data-bar>
      <div className="absolute inset-y-0 left-0 bg-gray-900" style={{ width: pct(solid) }} />
      {change !== undefined && change !== 0 && (
        <div
          className="absolute inset-y-0"
          style={{ left: pct(solid), width: pct(Math.abs(change)), background: change > 0 ? GAIN : LOSS }}
          data-change={change > 0 ? 'gain' : 'loss'}
        />
      )}
    </div>
  )
}

// Room for a spoke's name beside the rim, and the gap between them.
const LABEL_W = 64
const LABEL_GAP = 12

/**
 * The skills wheel (#345): a spoke for each core skill scored, 0% at the
 * middle and 100% at the rim. Each report card is a shape on it — all of
 * them at first; its chip hides or shows it. Tap a skill's name for its
 * score at each event, listed under the wheel, newest first.
 */
export function SkillsWheel({ points }: { points: ReportCardPoint[] }) {
  const [ref, measured] = useWidth()
  const width = measured || 300
  const { cards, skills } = scoredCards(points)
  const n = cards.length
  const [picked, setPicked] = useState<TdeSkillId | null>(null)
  // The cards picked; at first (or once none of them is left), all of them.
  const [picks, setPicks] = useState<ReadonlySet<string> | null>(null)
  if (!n || !skills.length) return null
  const kept = cards.filter(c => picks?.has(c.key)).map(c => c.key)
  const shown: ReadonlySet<string> = new Set(kept.length ? kept : cards.map(c => c.key))

  // As big as leaves room for the names across the widest spokes.
  const R = Math.max(60, Math.min(130, width / 2 - LABEL_W - LABEL_GAP))
  const height = 2 * (R + LABEL_GAP + 18)
  const [cx, cy] = [width / 2, height / 2]
  const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / skills.length
  const at = (i: number, score: number): [number, number] => {
    const r = (Math.max(0, Math.min(100, score)) / 100) * R
    return [cx + r * Math.cos(angle(i)), cy + r * Math.sin(angle(i))]
  }
  const toggle = (key: string) => {
    const next = new Set(shown)
    if (next.has(key)) {
      if (next.size > 1) next.delete(key)
    } else next.add(key)
    setPicks(next)
  }
  const pickedSkill = skills.find(s => s.id === picked)
  const pickedIndex = skills.findIndex(s => s.id === picked)
  const history = pickedSkill ? skillHistory(pickedSkill.id, cards) : []

  return (
    <section aria-label="Skills wheel" className={CARD}>
      <CardHead title="Skills wheel" meta="0% at the middle, 100% at the rim" />
      {n > 1 && (
        <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label="Report cards shown">
          {cards.map((c, i) => {
            const on = shown.has(c.key)
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                title={c.title}
                onClick={() => toggle(c.key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  on ? 'border-gray-900 font-semibold text-gray-900' : 'border-gray-200 text-gray-500 hover:border-gray-400'
                }`}
              >
                <CardKey k={i} n={n} />
                {day(c.date)}
              </button>
            )
          })}
        </div>
      )}
      <div ref={ref} className="relative" style={{ height }}>
        <svg width={width} height={height} className="block" aria-hidden="true">
          {RINGS.map(v => (
            <polygon key={v} points={skills.map((_, i) => at(i, v).join(',')).join(' ')} fill="none" stroke={RING} strokeWidth={1} />
          ))}
          {skills.map((s, i) => {
            const [x2, y2] = at(i, 100)
            return <line key={s.id} x1={cx} y1={cy} x2={x2} y2={y2} stroke={i === pickedIndex ? '#9ca3af' : RING} strokeWidth={1} />
          })}
          {cards.map((c, k) => {
            if (!shown.has(c.key)) return null
            const style = cardStyle(k, n)
            const pts = skills.flatMap((s, i) => {
              const v = scoreOf(c, s.id)
              return v === undefined ? [] : [at(i, v).join(',')]
            })
            return (
              <g key={c.key} data-card={c.key}>
                <polygon points={pts.join(' ')} fill={style.fill} stroke={style.stroke} strokeWidth={style.width} strokeDasharray={style.dash} strokeLinejoin="round" />
                {skills.map((s, i) => {
                  const v = scoreOf(c, s.id)
                  if (v === undefined) return null
                  const [x, y] = at(i, v)
                  return <Marker key={s.id} shape={style.shape} hollow={style.hollow} x={x} y={y} r={i === pickedIndex ? 4.5 : 3.25} color={style.stroke} />
                })}
              </g>
            )
          })}
        </svg>
        {skills.map((s, i) => {
          const [x, y] = [cx + (R + LABEL_GAP) * Math.cos(angle(i)), cy + (R + LABEL_GAP) * Math.sin(angle(i))]
          const shift = Math.abs(x - cx) < 8 ? '-50%' : x > cx ? '0%' : '-100%'
          const on = s.id === picked
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={on}
              aria-label={s.label}
              onClick={() => setPicked(on ? null : s.id)}
              className={`absolute whitespace-nowrap rounded-md px-1.5 py-1 text-[11px] leading-none transition-colors hover:text-gray-900 ${
                on ? 'bg-gray-900 font-semibold text-white hover:text-white' : 'text-gray-500'
              }`}
              style={{ left: x, top: y, transform: `translate(${shift}, -50%)` }}
            >
              {s.short}
            </button>
          )
        })}
      </div>
      <div aria-live="polite" className="mt-3 border-t border-gray-100 pt-3">
        {pickedSkill ? (
          <section aria-label={`${pickedSkill.label} at each event`}>
            <h3 className="text-sm font-semibold text-gray-900">{pickedSkill.label}</h3>
            <ul className="mt-1 divide-y divide-gray-100">
              {[...history].reverse().map(({ card, score, change }) => {
                const k = cards.indexOf(card)
                return (
                  <li key={card.key} className="py-2.5" data-skill-score={card.key}>
                    <div className="flex items-center gap-3">
                      <CardKey k={k} n={n} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-900">{fullDay(card.date)}</p>
                        <p className="truncate text-xs text-gray-500">{card.title}</p>
                      </div>
                      {change !== undefined && <Change change={change} />}
                      <span className="w-11 shrink-0 text-right text-sm font-semibold tabular-nums text-gray-900">{score}%</span>
                    </div>
                    <ScoreBar score={score} change={change} />
                  </li>
                )
              })}
            </ul>
            {history.some(h => h.change) && (
              <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
                {history.some(h => (h.change ?? 0) > 0) && (
                  <span className="flex items-center gap-1.5"><Swatch pattern={GAIN} /> Up since the event before</span>
                )}
                {history.some(h => (h.change ?? 0) < 0) && (
                  <span className="flex items-center gap-1.5"><Swatch pattern={LOSS} /> Down since the event before</span>
                )}
              </p>
            )}
          </section>
        ) : (
          <p className="text-xs text-gray-400">
            {n > 1 ? 'Tap a skill for its score at each event.' : 'Tap a skill for its score. Add a report card from another TDE event to see how it changes.'}
          </p>
        )}
      </div>
    </section>
  )
}
