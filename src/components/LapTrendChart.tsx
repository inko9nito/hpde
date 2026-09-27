import { useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { formatLapTime } from '../utils/lapTimes'

// A track page's progress chart (#274): the driver's best and average lap
// at each event on the layout, oldest to newest, one point per event — so
// they can see how they've come along. One axis (both are lap times);
// lower is faster.
//
// Best leads, in the accent (violet: "fastest" on a timing screen); the
// average is context, in a quieter gray. Checked with the data-viz palette
// validator on the white card: 24+ ΔE apart for every kind of color
// vision, both at least 3:1 against the card. Every value is also on the
// event cards below, so the tooltip never holds anything back.

export interface TrendPoint {
  /** The event's id. */
  key: string
  name: string
  /** Its first day, "YYYY-MM-DD". */
  date: string
  best: number
  average: number
  /** The average as the event's card shows it: "1:40.697". */
  averageText: string
}

const SERIES = {
  best: { label: 'Best', color: '#4a3aa7' },
  average: { label: 'Average', color: '#8b93a1' },
} as const
const GRID = '#e5e7eb'
const CROSSHAIR = '#d1d5db'
const INK = '#111827'
const MUTED = '#6b7280'

const PLOT_HEIGHT = 136
// Two lines of dates: the day, then the year where it changes.
const X_AXIS = 34
const LEFT = 38
// Room for the end values, "1:38.54".
const RIGHT = 50
// Keeps the first and last points off the plot's edges.
const INSET = 10
const TICK_STEPS = [500, 1000, 2000, 5000, 10_000, 15_000, 30_000, 60_000]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "Sep 13". */
export function dayLabel(iso: string): string {
  const [, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}`
}

/** "Sep 13, 2025": the tooltip's. */
function fullDate(iso: string): string {
  return `${dayLabel(iso)}, ${iso.slice(0, 4)}`
}

/** Clean ticks spanning the times, three to five of them, and the range they cover. */
export function lapTicks(lo: number, hi: number): { ticks: number[]; min: number; max: number } {
  // Never narrower than two seconds, so near-equal times don't read as a cliff.
  const mid = (lo + hi) / 2
  const span = Math.max(hi - lo, 2000)
  const [a, b] = [mid - span / 2, mid + span / 2]
  const step = TICK_STEPS.find(s => (b - a) / s <= 4) ?? TICK_STEPS[TICK_STEPS.length - 1]
  const min = Math.floor(a / step) * step
  const max = Math.ceil(b / step) * step
  const ticks: number[] = []
  for (let t = min; t <= max; t += step) ticks.push(t)
  return { ticks, min, max }
}

// About how wide a 10px date is, per character, and the least gap between two.
const CHAR_PX = 6
const LABEL_GAP = 8

/**
 * Which points get a date under them: every one there's room for, left to
 * right, and always the latest.
 */
export function labelled(xs: number[], texts: string[]): number[] {
  const half = (i: number) => (texts[i].length * CHAR_PX) / 2
  const clear = (a: number, b: number) => xs[b] - half(b) >= xs[a] + half(a) + LABEL_GAP
  const taken: number[] = []
  xs.forEach((_, i) => {
    if (!taken.length || clear(taken[taken.length - 1], i)) taken.push(i)
  })
  const latest = xs.length - 1
  if (taken[taken.length - 1] !== latest) {
    while (taken.length && !clear(taken[taken.length - 1], latest)) taken.pop()
    taken.push(latest)
  }
  return taken
}

function useWidth() {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    setWidth(el.clientWidth)
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => setWidth(el.clientWidth))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, width] as const
}

function LineKey({ color }: { color: string }) {
  return <span aria-hidden="true" className="inline-block h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
}

export function LapTrendChart({ points }: { points: TrendPoint[] }) {
  const [ref, measured] = useWidth()
  // Before it's measured (or where nothing can be, as in tests), a phone's width.
  const width = measured || 300
  const [active, setActive] = useState<number | null>(null)

  const n = points.length
  const plotW = width - LEFT - RIGHT
  const x = (i: number) => LEFT + INSET + (n === 1 ? (plotW - 2 * INSET) / 2 : (i * (plotW - 2 * INSET)) / (n - 1))
  const { ticks, min, max } = lapTicks(Math.min(...points.map(p => p.best)), Math.max(...points.map(p => p.average)))
  const y = (ms: number) => ((ms - min) / (max - min)) * -PLOT_HEIGHT + PLOT_HEIGHT
  const path = (key: 'best' | 'average') => points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p[key])}`).join(' ')
  const shownDates = labelled(points.map((_, i) => x(i)), points.map(p => dayLabel(p.date)))
  // The year goes under the first date shown, and wherever it changes.
  const years = new Map(shownDates.map((i, k) => {
    const year = points[i].date.slice(0, 4)
    return [i, k === 0 || year !== points[shownDates[k - 1]].date.slice(0, 4) ? year : null]
  }))

  // End values: the best always; the average too, unless the two would collide.
  const last = points[n - 1]
  const showAverageEnd = Math.abs(y(last.average) - y(last.best)) >= 13

  function pick(e: PointerEvent<HTMLDivElement>) {
    const box = e.currentTarget.getBoundingClientRect()
    const px = e.clientX - box.left
    let nearest = 0
    points.forEach((_, i) => { if (Math.abs(x(i) - px) < Math.abs(x(nearest) - px)) nearest = i })
    setActive(nearest)
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      const from = active ?? n - 1
      setActive(Math.max(0, Math.min(n - 1, from + (e.key === 'ArrowLeft' ? -1 : 1))))
    } else if (e.key === 'Escape') {
      setActive(null)
    }
  }

  const shown = active !== null ? points[active] : null
  const TOOLTIP_W = 168
  const tooltipLeft = active !== null ? Math.max(0, Math.min(width - TOOLTIP_W, x(active) - TOOLTIP_W / 2)) : 0

  return (
    <div className="mt-4 border-t border-gray-100 pt-3">
      <div className="mb-2 flex items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          {(['best', 'average'] as const).map(key => (
            <span key={key} className="flex items-center gap-1.5">
              <LineKey color={SERIES[key].color} />
              {SERIES[key].label}
            </span>
          ))}
        </div>
        <span className="text-gray-400">Lower is faster</span>
      </div>
      <div
        ref={ref}
        className="relative touch-pan-y select-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        tabIndex={0}
        role="group"
        aria-label={`Best and average lap at each event, oldest to newest: ${n} events. Left and right arrows step through them.`}
        onPointerMove={pick}
        onPointerDown={pick}
        onPointerLeave={e => { if (e.pointerType === 'mouse') setActive(null) }}
        onKeyDown={onKeyDown}
        onFocus={() => setActive(a => a ?? n - 1)}
        onBlur={() => setActive(null)}
      >
        <svg width={width} height={PLOT_HEIGHT + X_AXIS} className="block overflow-visible" aria-hidden="true">
          {ticks.map(t => (
            <g key={t}>
              <line x1={LEFT} x2={width - RIGHT} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} shapeRendering="crispEdges" />
              <text x={LEFT - 6} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={MUTED} className="tabular-nums">
                {formatLapTime(t)}
              </text>
            </g>
          ))}
          {points.map((p, i) => years.has(i) && (
            <text key={p.key} x={x(i)} y={PLOT_HEIGHT + 15} textAnchor="middle" fontSize={10} fill={MUTED} className="tabular-nums">
              {dayLabel(p.date)}
              {years.get(i) && <tspan x={x(i)} dy={12}>{years.get(i)}</tspan>}
            </text>
          ))}
          {active !== null && (
            <line x1={x(active)} x2={x(active)} y1={0} y2={PLOT_HEIGHT} stroke={CROSSHAIR} strokeWidth={1} shapeRendering="crispEdges" />
          )}
          {(['average', 'best'] as const).map(key => (
            <g key={key} data-series={key}>
              <path d={path(key)} fill="none" stroke={SERIES[key].color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              {points.map((p, i) => (
                <circle
                  key={p.key}
                  cx={x(i)}
                  cy={y(p[key])}
                  r={active === i ? 5 : 4}
                  fill={SERIES[key].color}
                  stroke="#ffffff"
                  strokeWidth={2}
                />
              ))}
            </g>
          ))}
          <text x={x(n - 1) + 9} y={y(last.best)} dy="0.32em" fontSize={11} fontWeight={600} fill={INK} className="font-mono tabular-nums" data-end-label="best">
            {formatLapTime(last.best)}
          </text>
          {showAverageEnd && (
            <text x={x(n - 1) + 9} y={y(last.average)} dy="0.32em" fontSize={11} fill={MUTED} className="font-mono tabular-nums" data-end-label="average">
              {last.averageText}
            </text>
          )}
        </svg>
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none absolute bottom-full z-10 mb-1"
          style={{ left: tooltipLeft, width: TOOLTIP_W }}
        >
          {shown && (
            <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs shadow-lg">
              <p className="truncate font-medium text-gray-900">{shown.name}</p>
              <p className="text-gray-500">{fullDate(shown.date)}</p>
              {(['best', 'average'] as const).map(key => (
                <p key={key} className="mt-1 flex items-center gap-1.5">
                  <LineKey color={SERIES[key].color} />
                  <span className="font-mono font-semibold tabular-nums text-gray-900">
                    {key === 'average' ? shown.averageText : formatLapTime(shown.best)}
                  </span>
                  <span className="text-gray-500">{SERIES[key].label}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
