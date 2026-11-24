import { INK, SERIES } from './LapTrendChart'
import { formatLapTime, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

// A session's laps in miniature, on its card beside the average and best
// (#477): the chart that opens below the card (#475), small enough to read
// at a glance. Each lap that counts is a point on the blue line, slower
// laps higher, as on that chart, so a lap lost to traffic spikes up. The
// best is a black dot and the average a dashed gray line, in the colors
// that chart gives them. Out and in laps follow the driver's choices
// (#480), as on that chart: drawn only when shown, as hollow dots off the
// line, since they don't count in the best; in the average only when
// counted there.

const PAD = 3.5

export function LapSparkline({ laps, outLapsInAverage = false, showOutLaps = false, width = 80, height = 22 }: {
  laps: Lap[]
  /** Out and in laps counted in the average line, as the driver chose (#480). */
  outLapsInAverage?: boolean
  /** Out and in laps drawn too, as hollow dots off the line, as the session chart draws them (#480). */
  showOutLaps?: boolean
  width?: number
  height?: number
}) {
  const labels = lapLabels(laps)
  const points = laps.flatMap((lap, i) => (lap.kind && !showOutLaps ? [] : [{ ms: lap.ms, kind: lap.kind, label: labels[i] }]))
  const { best, average } = lapStats(laps, { outLapsInAverage })
  if (best === undefined || average === undefined) return null
  // The average too: with a slow out lap counted, it can be above every lap.
  const lo = Math.min(...points.map(p => p.ms), average)
  const hi = Math.max(...points.map(p => p.ms), average)
  const x = (i: number) => PAD + (points.length === 1 ? (width - 2 * PAD) / 2 : (i * (width - 2 * PAD)) / (points.length - 1))
  // Slower laps sit higher. All the same time, they run along the middle.
  const y = (ms: number) => (hi === lo ? height / 2 : PAD + ((hi - ms) / (hi - lo)) * (height - 2 * PAD))
  // Through the laps that count; an out or in lap sits off it.
  const path = points.flatMap((p, i) => (p.kind ? [] : [[x(i), y(p.ms)]]))
    .map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)},${py.toFixed(1)}`).join(' ')
  const bestAt = points.findIndex(p => !p.kind && p.ms === best)
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block shrink-0 overflow-visible"
      role="img"
      aria-label={`Each lap’s time: ${points.map(p => (p.kind ? `${p.label} ${formatLapTime(p.ms)}` : formatLapTime(p.ms))).join(', ')}`}
      data-lap-sparkline
    >
      <line x1={0} x2={width} y1={y(average)} y2={y(average)} stroke={SERIES.average.color} strokeWidth={1} strokeDasharray="3 2.5" data-series="average" />
      <path d={path} fill="none" stroke={SERIES.speed.color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" data-series="lap" />
      {points.map((p, i) => !p.kind && i !== bestAt && (
        <circle key={i} cx={x(i)} cy={y(p.ms)} r={1.75} fill={SERIES.speed.color} />
      ))}
      {points.some(p => p.kind) && (
        <g data-series="out-in">
          {points.map((p, i) => p.kind && (
            <circle key={i} cx={x(i)} cy={y(p.ms)} r={2} fill="#ffffff" stroke={SERIES.average.color} strokeWidth={1.25} />
          ))}
        </g>
      )}
      <circle cx={x(bestAt)} cy={y(best)} r={2.75} fill={INK} stroke="#ffffff" strokeWidth={1.25} data-series="best" />
    </svg>
  )
}
