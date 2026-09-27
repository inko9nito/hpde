import { useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { formatLapTime, formatSpeed } from '../utils/lapTimes'

// The driver's best and average lap, point by point, so they can see how
// they've come along (#274): at each event on a track page, oldest to
// newest, and in each session on an event's My notes. One axis (both are
// lap times); lower is faster.
//
// Best leads, in black like the best-lap chip everywhere else; the average
// is context, in a quieter gray. Checked with the data-viz palette
// validator on the white card: 45 ΔE apart for every kind of color vision
// (they differ in lightness, which no color blindness takes away), both
// at least 3:1 against the card. Every value is also on the cards below
// it, so the tooltip never holds anything back.
//
// With speeds logged (#298), the top speed rides along on a second axis, on
// the right, in mph — higher is faster there, the other way round from the
// laps. So it can't be mistaken for a lap time it's blue, not gray or
// black, and dashed; the legend says which axis it's on; and its ticks sit
// on the lap times' grid lines, so there's one grid, not two. The blue
// passed the validator against both grays: ΔE 20 or more for every kind of
// color vision, at least 3:1 against the card.

export interface TrendPoint {
  key: string
  /** Under the point: "Sep 13", "S2". */
  tick: string
  /** Under that, on the first tick and wherever it changes: the year, the day. */
  tickGroup?: string
  /** The readout's heading and the line under it. */
  title: string
  subtitle: string
  best: number
  average: number
  /** The average as the card below shows it: "1:40.697". */
  averageText: string
  /** The fastest the driver went there, in mph (#298). */
  topSpeed?: number
}

/** `{ topSpeed }` when there is one: nothing otherwise. */
export function withTopSpeed(topSpeed: number | undefined): Pick<TrendPoint, 'topSpeed'> {
  return topSpeed !== undefined ? { topSpeed } : {}
}

const SERIES = {
  best: { label: 'Best', color: '#111827' },
  average: { label: 'Average', color: '#8b93a1' },
  speed: { label: 'Top speed', color: '#2563eb' },
} as const
const SPEED_DASH = '4 3'
const GRID = '#e5e7eb'
const CROSSHAIR = '#d1d5db'
const INK = '#111827'
const MUTED = '#6b7280'

const PLOT_HEIGHT = 136
// Room under the plot for one line of ticks, or two with their groups.
const X_AXIS = 22
const X_AXIS_GROUPED = 34
const LEFT = 38
// Room for the end values, "1:38.54" — and past them, the speed axis's ticks.
const RIGHT = 50
const SPEED_AXIS = 28
// Keeps the first and last points off the plot's edges.
const INSET = 10
const TICK_STEPS = [500, 1000, 2000, 5000, 10_000, 15_000, 30_000, 60_000]

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "Sep 13". */
export function dayLabel(iso: string): string {
  const [, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}`
}

/** "Sep 13, 2025". */
export function fullDate(iso: string): string {
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

const SPEED_STEPS = [1, 2, 5, 10, 20, 50]

/**
 * The speed axis's ticks, one on each of the lap axis's `intervals` + 1
 * grid lines: the least clean step that spans the speeds, centered on
 * them, and never below zero.
 */
export function speedTicks(lo: number, hi: number, intervals: number): { ticks: number[]; min: number; max: number } {
  const steps = SPEED_STEPS.map(step => {
    const min = Math.max(0, Math.floor(((lo + hi) / 2 - (intervals * step) / 2) / step) * step)
    return { step, min }
  })
  const { step, min } = steps.find(({ step, min }) => min <= lo && min + intervals * step >= hi)
    ?? { step: SPEED_STEPS[SPEED_STEPS.length - 1], min: Math.floor(lo / 50) * 50 }
  const ticks = Array.from({ length: intervals + 1 }, (_, i) => min + i * step)
  return { ticks, min, max: min + intervals * step }
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

function LineKey({ color, dashed }: { color: string; dashed?: boolean }) {
  if (dashed) {
    return (
      <svg aria-hidden="true" width={12} height={2} className="shrink-0">
        <line x1={0} x2={12} y1={1} y2={1} stroke={color} strokeWidth={2} strokeDasharray="3 2" />
      </svg>
    )
  }
  return <span aria-hidden="true" className="inline-block h-0.5 w-3 shrink-0 rounded-full" style={{ backgroundColor: color }} />
}

/**
 * `label` says what each point is ("…at each event, oldest to newest"),
 * and `noun` counts them, for the chart's accessible name.
 */
export function LapTrendChart({ points, label, noun }: {
  points: TrendPoint[]
  label: string
  noun: [one: string, many: string]
}) {
  const [ref, measured] = useWidth()
  // Before it's measured (or where nothing can be, as in tests), a phone's width.
  const width = measured || 300
  const [active, setActive] = useState<number | null>(null)

  const n = points.length
  const hasSpeed = points.some(p => p.topSpeed !== undefined)
  const right = RIGHT + (hasSpeed ? SPEED_AXIS : 0)
  const plotW = width - LEFT - right
  const x = (i: number) => LEFT + INSET + (n === 1 ? (plotW - 2 * INSET) / 2 : (i * (plotW - 2 * INSET)) / (n - 1))
  const { ticks, min, max } = lapTicks(Math.min(...points.map(p => p.best)), Math.max(...points.map(p => p.average)))
  const y = (ms: number) => ((ms - min) / (max - min)) * -PLOT_HEIGHT + PLOT_HEIGHT
  const path = (key: 'best' | 'average') => points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p[key])}`).join(' ')
  // Top speed, on its own scale; a point without one is stepped over.
  const speeds = points.flatMap((p, i) => (p.topSpeed !== undefined ? [{ i, mph: p.topSpeed, key: p.key }] : []))
  const speedAxis = hasSpeed
    ? speedTicks(Math.min(...speeds.map(s => s.mph)), Math.max(...speeds.map(s => s.mph)), ticks.length - 1)
    : null
  const ySpeed = (mph: number) => (speedAxis ? PLOT_HEIGHT - ((mph - speedAxis.min) / (speedAxis.max - speedAxis.min)) * PLOT_HEIGHT : 0)
  const speedPath = speeds.map((s, k) => `${k ? 'L' : 'M'}${x(s.i)},${ySpeed(s.mph)}`).join(' ')
  const shownTicks = labelled(points.map((_, i) => x(i)), points.map(p => p.tick))
  // A tick's group goes under the first tick shown, and wherever it changes.
  const groups = new Map(shownTicks.map((i, k) => {
    const group = points[i].tickGroup
    return [i, group && (k === 0 || group !== points[shownTicks[k - 1]].tickGroup) ? group : null]
  }))
  const xAxis = points.some(p => p.tickGroup) ? X_AXIS_GROUPED : X_AXIS

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
  // Wider with a speed in it, so "mph top speed" keeps to one line.
  const TOOLTIP_W = hasSpeed ? 184 : 168
  const tooltipLeft = active !== null ? Math.max(0, Math.min(width - TOOLTIP_W, x(active) - TOOLTIP_W / 2)) : 0

  return (
    <div>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-gray-500">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {(['best', 'average'] as const).map(key => (
            <span key={key} className="flex items-center gap-1.5">
              <LineKey color={SERIES[key].color} />
              {SERIES[key].label}
            </span>
          ))}
          {hasSpeed && (
            <span className="flex items-center gap-1.5" data-legend="speed">
              <LineKey color={SERIES.speed.color} dashed />
              Top speed, mph (right)
            </span>
          )}
        </div>
        <span className="text-gray-400">{hasSpeed ? 'Lap times: lower is faster' : 'Lower is faster'}</span>
      </div>
      <div
        ref={ref}
        className="relative touch-pan-y select-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        tabIndex={0}
        role="group"
        aria-label={`${label}${hasSpeed ? ', with top speed in mph on the right' : ''}: ${n} ${n === 1 ? noun[0] : noun[1]}. Left and right arrows step through them.`}
        onPointerMove={pick}
        onPointerDown={pick}
        onPointerLeave={e => { if (e.pointerType === 'mouse') setActive(null) }}
        onKeyDown={onKeyDown}
        onFocus={() => setActive(a => a ?? n - 1)}
        onBlur={() => setActive(null)}
      >
        <svg width={width} height={PLOT_HEIGHT + xAxis} className="block overflow-visible" aria-hidden="true">
          {ticks.map(t => (
            <g key={t}>
              <line x1={LEFT} x2={width - right} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={1} shapeRendering="crispEdges" />
              <text x={LEFT - 6} y={y(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={MUTED} className="tabular-nums">
                {formatLapTime(t)}
              </text>
            </g>
          ))}
          {speedAxis?.ticks.map(t => (
            <text key={`mph-${t}`} x={width - 2} y={ySpeed(t)} dy="0.32em" textAnchor="end" fontSize={10} fill={MUTED} className="tabular-nums" data-speed-tick>
              {t}
            </text>
          ))}
          {points.map((p, i) => groups.has(i) && (
            <text key={p.key} x={x(i)} y={PLOT_HEIGHT + 15} textAnchor="middle" fontSize={10} fill={MUTED} className="tabular-nums">
              {p.tick}
              {groups.get(i) && <tspan x={x(i)} dy={12}>{groups.get(i)}</tspan>}
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
          {hasSpeed && (
            <g data-series="speed">
              <path d={speedPath} fill="none" stroke={SERIES.speed.color} strokeWidth={2} strokeDasharray={SPEED_DASH} strokeLinejoin="round" strokeLinecap="round" />
              {speeds.map(s => (
                <circle key={s.key} cx={x(s.i)} cy={ySpeed(s.mph)} r={active === s.i ? 5 : 4} fill={SERIES.speed.color} stroke="#ffffff" strokeWidth={2} />
              ))}
            </g>
          )}
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
              <p className="truncate font-medium text-gray-900">{shown.title}</p>
              <p className="truncate text-gray-500">{shown.subtitle}</p>
              {(['best', 'average'] as const).map(key => (
                <p key={key} className="mt-1 flex items-center gap-1.5">
                  <LineKey color={SERIES[key].color} />
                  <span className="font-mono font-semibold tabular-nums text-gray-900">
                    {key === 'average' ? shown.averageText : formatLapTime(shown.best)}
                  </span>
                  <span className="text-gray-500">{SERIES[key].label}</span>
                </p>
              ))}
              {shown.topSpeed !== undefined && (
                <p className="mt-1 flex items-center gap-1.5">
                  <LineKey color={SERIES.speed.color} dashed />
                  <span className="font-mono font-semibold tabular-nums text-gray-900">{formatSpeed(shown.topSpeed)}</span>
                  <span className="whitespace-nowrap text-gray-500">mph top speed</span>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
