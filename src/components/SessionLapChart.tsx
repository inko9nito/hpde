import { CROSSHAIR, GRID, INK, INSET, LEFT, LineKey, MUTED, PLOT_HEIGHT, RIGHT, SERIES, X_AXIS, labelled, lapTicks, useReadout, useWidth } from './LapTrendChart'
import { formatGap, formatLapTime, lapDecimals, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

// One session's laps, lap by lap (#475): each lap's time, against the
// session's best and average — or, switched, the whole event's — as flat
// lines across it, so a lap lost to traffic stands out as a spike above
// them. Out and in laps aren't charted, as they don't count in either.
//
// The laps are the data here, so they're the solid line, with a dot on
// each. Best and average keep the colors they have on the chart of every
// session above (black and gray) but are dashed, being one value each, not
// a line through points. The laps take the blue that chart gives top
// speed, which the data-viz validator passed against both: ΔE 20 or more
// for every kind of color vision, at least 3:1 against the card.

const LAP = { label: 'Lap', color: SERIES.speed.color }
const REF_DASH = '5 4'
const TOOLTIP_W = 176

/** What the flat lines are: this session's best and average, or the event's. */
export type LapChartScope = 'session' | 'event'

export interface Reference {
  best: number
  average: number
}

/** The event's best and average lap, over every lap that counts in it. */
export function eventReference(sessions: { laps: Lap[] }[]): Reference | undefined {
  const { best, average } = lapStats(sessions.flatMap(s => s.laps))
  return best !== undefined && average !== undefined ? { best, average } : undefined
}

/**
 * Session / Event, as the app's other switches are drawn: which best and
 * average the session charts draw their lines at. One for the page, so
 * every session's chart switches together.
 */
export function ScopeSwitch({ scope, onChange }: { scope: LapChartScope; onChange: (scope: LapChartScope) => void }) {
  const options: { id: LapChartScope; label: string }[] = [
    { id: 'session', label: 'Session' },
    { id: 'event', label: 'Event' },
  ]
  return (
    <div className="flex shrink-0 rounded-lg bg-gray-100 p-0.5" role="group" aria-label="Lines at the best and average of the" data-scope-switch>
      {options.map(o => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={scope === o.id}
          className={`rounded-md px-2.5 py-0.5 text-xs font-medium ${scope === o.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/**
 * The chart, for `title`'s laps. `event` is the event's best and average,
 * when there's more of the event than this session to switch to; `scope`
 * says which the lines are at.
 */
export function SessionLapChart({ laps, title, scope, event, onScope }: {
  laps: Lap[]
  title: string
  scope: LapChartScope
  event?: Reference
  onScope: (scope: LapChartScope) => void
}) {
  const [ref, measured] = useWidth()
  const width = measured || 300

  const labels = lapLabels(laps)
  const points = laps.flatMap((lap, i) => (lap.kind ? [] : [{ ms: lap.ms, label: labels[i], index: i }]))
  const own = lapStats(laps)
  const reference: Reference = scope === 'event' && event
    ? event
    : { best: own.best!, average: own.average! }
  const ofEvent = scope === 'event' && event !== undefined
  const decimals = lapDecimals(laps)

  const n = points.length
  const plotW = width - LEFT - RIGHT
  const x = (i: number) => LEFT + INSET + (n === 1 ? (plotW - 2 * INSET) / 2 : (i * (plotW - 2 * INSET)) / (n - 1))
  const { ticks, min, max } = lapTicks(
    Math.min(reference.best, ...points.map(p => p.ms)),
    Math.max(reference.average, ...points.map(p => p.ms)),
  )
  const y = (ms: number) => PLOT_HEIGHT - ((ms - min) / (max - min)) * PLOT_HEIGHT
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i)},${y(p.ms)}`).join(' ')
  const shownTicks = new Set(labelled(points.map((_, i) => x(i)), points.map(p => p.label)))
  // The lines' values at their right ends: the best always, the average
  // too unless the two would collide.
  const showAverageEnd = Math.abs(y(reference.average) - y(reference.best)) >= 13
  const { active, handlers } = useReadout(n, x)

  // The readout spells out whose.
  const bestLabel = ofEvent ? 'event best' : 'best'
  const averageLabel = ofEvent ? 'event average' : 'average'
  const shown = active !== null ? points[active] : null
  const tooltipLeft = active !== null ? Math.max(0, Math.min(width - TOOLTIP_W, x(active) - TOOLTIP_W / 2)) : 0

  return (
    <div data-session-chart>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><LineKey color={LAP.color} />{LAP.label}</span>
          {/* The switch beside them says whose: the same words either way, so nothing moves. */}
          <span className="flex items-center gap-1.5"><LineKey color={SERIES.best.color} dashed />{SERIES.best.label}</span>
          <span className="flex items-center gap-1.5"><LineKey color={SERIES.average.color} dashed />{SERIES.average.label}</span>
        </div>
        {event && <ScopeSwitch scope={scope} onChange={onScope} />}
      </div>
      <div
        ref={ref}
        className="relative touch-pan-y select-none rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
        tabIndex={0}
        role="group"
        aria-label={`Each lap’s time in ${title}, against the ${ofEvent ? 'event’s' : 'session’s'} best and average: ${n} ${n === 1 ? 'lap' : 'laps'}. Left and right arrows step through them.`}
        {...handlers}
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
          {points.map((p, i) => shownTicks.has(i) && (
            <text key={p.index} x={x(i)} y={PLOT_HEIGHT + 15} textAnchor="middle" fontSize={10} fill={MUTED} className="tabular-nums">
              {p.label}
            </text>
          ))}
          {active !== null && (
            <line x1={x(active)} x2={x(active)} y1={0} y2={PLOT_HEIGHT} stroke={CROSSHAIR} strokeWidth={1} shapeRendering="crispEdges" />
          )}
          {(['average', 'best'] as const).map(key => (
            <line
              key={key}
              data-series={key}
              x1={LEFT}
              x2={width - RIGHT}
              y1={y(reference[key])}
              y2={y(reference[key])}
              stroke={SERIES[key].color}
              strokeWidth={1.5}
              strokeDasharray={REF_DASH}
            />
          ))}
          <g data-series="lap">
            <path d={path} fill="none" stroke={LAP.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            {points.map((p, i) => (
              <circle key={p.index} cx={x(i)} cy={y(p.ms)} r={active === i ? 5 : 4} fill={LAP.color} stroke="#ffffff" strokeWidth={2} />
            ))}
          </g>
          <text x={width - RIGHT + 6} y={y(reference.best)} dy="0.32em" fontSize={11} fontWeight={600} fill={INK} className="font-mono tabular-nums" data-end-label="best">
            {formatLapTime(reference.best)}
          </text>
          {showAverageEnd && (
            <text x={width - RIGHT + 6} y={y(reference.average)} dy="0.32em" fontSize={11} fill={MUTED} className="font-mono tabular-nums" data-end-label="average">
              {formatLapTime(reference.average, Math.min(2, decimals))}
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
              <p className="truncate font-medium text-gray-900">Lap {shown.label}</p>
              <p className="mt-1 flex items-center gap-1.5">
                <LineKey color={LAP.color} />
                <span className="font-mono font-semibold tabular-nums text-gray-900">{formatLapTime(shown.ms)}</span>
              </p>
              {(['best', 'average'] as const).map(key => (
                <p key={key} className="mt-1 flex items-center gap-1.5">
                  <LineKey color={SERIES[key].color} dashed />
                  <span className="font-mono font-semibold tabular-nums text-gray-900">{formatGap(shown.ms - reference[key], decimals)}</span>
                  <span className="truncate text-gray-500">vs {key === 'best' ? bestLabel : averageLabel}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
