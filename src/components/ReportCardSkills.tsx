import { useState } from 'react'
import { useWidth } from './LapTrendChart'
import { cardOf } from '../utils/evaluation'
import type { EventEvaluation, TdeCard, TdeSkill } from '../utils/evaluation'

// How the driver's TDE report cards have come along (#345), on the
// Instructor evaluations page — the run group picked there's (#401), since
// each group's card has its own skills (#350) — in two cards:
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

type Skill = TdeSkill

const scoreOf = (card: ReportCardPoint, id: string) => card.evaluation.skills?.[id]

/**
 * The cards of one kind (`kind`: Green's, Blue's — #350) with a core skill
 * scored, oldest first; and the skills any of them scores, in the card's
 * order.
 */
export function scoredCards(points: ReportCardPoint[], kind: TdeCard): { cards: ReportCardPoint[]; skills: Skill[] } {
  const cards = points
    .filter(p => cardOf(p.evaluation).id === kind.id && kind.skills.some(s => scoreOf(p, s.id) !== undefined))
    .sort((a, b) => a.date.localeCompare(b.date) || a.key.localeCompare(b.key))
  const skills = kind.skills.filter(s => cards.some(c => scoreOf(c, s.id) !== undefined))
  return { cards, skills }
}

/** A skill's score on each card that scored it, oldest first, with the change from the one before. */
export function skillHistory(skill: string, cards: ReportCardPoint[]): { card: ReportCardPoint; score: number; change?: number }[] {
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
export function skillMoves(cards: ReportCardPoint[], kind: TdeCard, count = 3): { improved: SkillMove[]; needsWork: SkillMove[] } {
  const moves = kind.skills.flatMap((skill): SkillMove[] => {
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

/** A card's title, over it in the page's space rather than in it (#401). */
function CardHead({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3 px-1">
      <h3 className="text-[15px] font-semibold text-gray-900">{title}</h3>
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
    <section aria-label={title} className="min-w-0 p-4">
      {/* Its headline, over a rule, then its list. */}
      <div className="border-b border-gray-100 pb-2">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-400">{caption ?? '\u00a0'}</p>
      </div>
      {moves.length ? (
        <ol className="mt-3 flex flex-col gap-2">
          {moves.map(m => (
            <li key={m.skill.id} className="flex items-baseline justify-between gap-2 text-sm" title={m.skill.label}>
              <span className="min-w-0 truncate text-gray-900">{m.skill.short}</span>
              <span className="shrink-0 font-semibold tabular-nums text-gray-900">{value(m)}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-3 text-xs text-gray-400">{empty}</p>
      )}
    </section>
  )
}

/** The overview (#345): the skills most improved since the first report card of this kind, and those that need the most work. */
export function SkillOverview({ points, kind }: { points: ReportCardPoint[]; kind: TdeCard }) {
  const { cards } = scoredCards(points, kind)
  if (!cards.length) return null
  const { improved, needsWork } = skillMoves(cards, kind)
  const [first, latest] = [cards[0], cards[cards.length - 1]]
  return (
    <section aria-label="Report card overview">
      <CardHead title="At a glance" meta={`${cards.length} ${cards.length === 1 ? 'report card' : 'report cards'}`} />
      {/* Two columns, a rule between them. */}
      <div className="grid grid-cols-2 divide-x divide-gray-100 rounded-2xl border border-gray-200 bg-white">
        <MoveList
          title="Most improved"
          caption={cards.length > 1 ? `Since ${day(first.date)}` : undefined}
          moves={improved}
          value={m => signed(m.gain!)}
          empty={cards.length > 1 ? 'No gains yet.' : `Add another ${kind.group} report card to see what’s improved.`}
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
// the four newest of the cards shown each get a marker at their points
// (●, ■, ▲, ◆) and a solid line, by one rule the page says — newer is
// darker: the newest black and shaded, the others lighter grays. (Broken
// lines, which an older card had at first, read as meaning something of
// their own.) More than four can't be told apart, however they're drawn
// (a driver may have 20 cards), so any older card shown is a thin light
// line behind them: the history, not one to pick out. Hide newer ones to
// bring an older one forward. Not by hue: every hue is a run group's
// somewhere in the app, and the one color here (green and rose) means up
// or down.
const INK = '#111827'
const RING = '#eceef1'
type Shape = 'circle' | 'square' | 'triangle' | 'diamond'
const SHAPES: Shape[] = ['circle', 'square', 'triangle', 'diamond']
const LINES = [
  { stroke: INK, width: 2, fill: 'rgba(17, 24, 39, 0.07)' },
  { stroke: '#4b5563', width: 1.75, fill: 'none' },
  { stroke: '#8b93a1', width: 1.75, fill: 'none' },
  { stroke: '#b5bbc5', width: 1.75, fill: 'none' },
]
const BACKGROUND = { stroke: '#d9dce1', width: 1, fill: 'none' }

export interface CardLook {
  stroke: string
  width: number
  fill: string
  /** None for an older card, drawn behind the four newest. */
  shape: Shape | null
  /** Newest first among the cards shown. */
  rank: number
}

/** How each card shown is drawn, by its place among them, newest first. */
export function cardLooks(cards: ReportCardPoint[], shown: ReadonlySet<string>): Map<string, CardLook> {
  const newestFirst = [...cards].reverse().filter(c => shown.has(c.key))
  return new Map(newestFirst.map((c, rank) => [
    c.key,
    rank < SHAPES.length ? { ...LINES[rank], shape: SHAPES[rank], rank } : { ...BACKGROUND, shape: null, rank },
  ]))
}

/** A card's marker at (x, y), `r` from its middle to its edge. */
function Marker({ shape, x, y, r, color, outline = '#ffffff' }: { shape: Shape; x: number; y: number; r: number; color: string; outline?: string }) {
  const paint = { fill: color, stroke: outline, strokeWidth: 1.25 }
  if (shape === 'circle') return <circle cx={x} cy={y} r={r} {...paint} />
  if (shape === 'square') return <rect x={x - r * 0.85} y={y - r * 0.85} width={r * 1.7} height={r * 1.7} {...paint} />
  if (shape === 'triangle') {
    const h = r * 1.15
    return <polygon points={`${x},${y - h} ${x + h},${y + h * 0.75} ${x - h},${y + h * 0.75}`} {...paint} />
  }
  return <polygon points={`${x},${y - r * 1.2} ${x + r * 1.2},${y} ${x},${y + r * 1.2} ${x - r * 1.2},${y}`} {...paint} />
}

/**
 * A card's line with its marker on it, for a skill's list — or, `onDark`,
 * in white, for its chip when it's picked; room for one, for a card not
 * shown.
 */
function CardKey({ look, onDark = false }: { look?: CardLook; onDark?: boolean }) {
  if (!look) return <span aria-hidden="true" className="inline-block w-5 shrink-0" />
  const color = onDark ? (look.shape ? '#ffffff' : 'rgba(255, 255, 255, 0.5)') : look.stroke
  return (
    <svg aria-hidden="true" width={20} height={10} className="shrink-0 overflow-visible" data-shape={look.shape ?? 'line'}>
      <line x1={0} x2={20} y1={5} y2={5} stroke={color} strokeWidth={look.shape ? 2 : 1.5} />
      {look.shape && <Marker shape={look.shape} x={10} y={5} r={3.5} color={color} outline={onDark ? INK : '#ffffff'} />}
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
 * The skills wheel (#345): a spoke for each core skill scored on one run
 * group's card (#350), 0% at the middle and 100% at the rim. Each report card is a shape on it — all of
 * them at first. Its chip, in a row that scrolls sideways, newest first,
 * hides or shows it; All, before them, shows every one (or, with every one
 * shown, just the newest). Tap a skill's name for its score at each event,
 * listed under the wheel, newest first.
 */
export function SkillsWheel({ points, kind }: { points: ReportCardPoint[]; kind: TdeCard }) {
  const [ref, measured] = useWidth()
  const width = measured || 300
  const { cards, skills } = scoredCards(points, kind)
  const n = cards.length
  const [picked, setPicked] = useState<string | null>(null)
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
  const allShown = shown.size === n
  const looks = cardLooks(cards, shown)
  // Drawn oldest first, so the newest is on top.
  const drawn = [...cards].filter(c => shown.has(c.key)).sort((a, b) => looks.get(b.key)!.rank - looks.get(a.key)!.rank)
  // Picked, filled black, as a picked skill's name is.
  const chip = (on: boolean) => `inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
    on ? 'border-gray-900 bg-gray-900 font-semibold text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-400'
  }`
  const pickedSkill = skills.find(s => s.id === picked)
  const pickedIndex = skills.findIndex(s => s.id === picked)
  const history = pickedSkill ? skillHistory(pickedSkill.id, cards) : []

  return (
    <section aria-label="Skills wheel">
      <CardHead title="Skills wheel" meta="0% at the middle, 100% at the rim" />
      <div className={CARD}>
        {n > 1 && (
          <div className="-mx-4 mb-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max gap-1.5 pb-0.5" role="group" aria-label="Report cards shown">
              <button
                type="button"
                aria-pressed={allShown}
                onClick={() => setPicks(new Set(allShown ? [cards[n - 1].key] : cards.map(c => c.key)))}
                className={chip(allShown)}
              >
                All
              </button>
              {[...cards].reverse().map(c => {
                const on = shown.has(c.key)
                return (
                  <button key={c.key} type="button" aria-pressed={on} title={c.title} onClick={() => toggle(c.key)} className={chip(on)}>
                    {on && <CardKey look={looks.get(c.key)} onDark />}
                    {day(c.date)}
                    {/* The year, where it isn't the newest card's. */}
                    {c.date.slice(0, 4) !== cards[n - 1].date.slice(0, 4) && <span className="font-normal opacity-60">’{c.date.slice(2, 4)}</span>}
                  </button>
                )
              })}
            </div>
          </div>
        )}
        {shown.size > 1 && (
          <p className="text-[11px] text-gray-400">
            Newer events are darker{shown.size > SHAPES.length ? `; the ${SHAPES.length} newest shown have a marker each` : ''}.
          </p>
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
            {drawn.map(c => {
              const style = looks.get(c.key)!
              const pts = skills.flatMap((s, i) => {
                const v = scoreOf(c, s.id)
                return v === undefined ? [] : [at(i, v).join(',')]
              })
              return (
                <g key={c.key} data-card={c.key}>
                  <polygon points={pts.join(' ')} fill={style.fill} stroke={style.stroke} strokeWidth={style.width} strokeLinejoin="round" />
                  {style.shape && skills.map((s, i) => {
                    const v = scoreOf(c, s.id)
                    if (v === undefined) return null
                    const [x, y] = at(i, v)
                    return <Marker key={s.id} shape={style.shape!} x={x} y={y} r={i === pickedIndex ? 4.5 : 3.25} color={style.stroke} />
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
                data-spoke={s.id}
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
              <h4 className="text-sm font-semibold text-gray-900">{pickedSkill.label}</h4>
              <ul className="mt-1 divide-y divide-gray-100">
                {[...history].reverse().map(({ card, score, change }) => {
                  return (
                    <li key={card.key} className="py-2.5" data-skill-score={card.key}>
                      <div className="flex items-center gap-3">
                        <CardKey look={looks.get(card.key)} />
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
              {n > 1 ? 'Tap a skill for its score at each event.' : `Tap a skill for its score. Add another ${kind.group} report card to see how it changes.`}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
