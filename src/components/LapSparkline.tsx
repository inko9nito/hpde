import { INK, SERIES } from './LapTrendChart'
import { formatLapTime, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

// A session's laps in miniature, on its card beside the average and best
// (#477): the chart that opens below the card (#475), small enough to read
// at a glance. Each lap that counts is a point on the blue line, slower
// laps higher, as on that chart, so a lap lost to traffic spikes up. The
// best is a black dot and the average a dashed gray line, in the colors
// that chart gives them. Out and in laps aren't drawn, as they don't count
// in either.

const PAD = 3.5

export function LapSparkline({ laps, width = 80, height = 22 }: { laps: Lap[]; width?: number; height?: number }) {
  const points = laps.filter(lap => !lap.kind).map(lap => lap.ms)
  const { best, average } = lapStats(laps)
  if (best === undefined || average === undefined) return null
  const lo = Math.min(...points)
  const hi = Math.max(...points)
  const x = (i: number) => PAD + (points.length === 1 ? (width - 2 * PAD) / 2 : (i * (width - 2 * PAD)) / (points.length - 1))
  // Slower laps sit higher. All the same time, they run along the middle.
  const y = (ms: number) => (hi === lo ? height / 2 : PAD + ((hi - ms) / (hi - lo)) * (height - 2 * PAD))
  const path = points.map((ms, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(ms).toFixed(1)}`).join(' ')
  const bestAt = points.indexOf(best)
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="block shrink-0 overflow-visible"
      role="img"
      aria-label={`Each lap’s time: ${points.map(ms => formatLapTime(ms)).join(', ')}`}
      data-lap-sparkline
    >
      <line x1={0} x2={width} y1={y(average)} y2={y(average)} stroke={SERIES.average.color} strokeWidth={1} strokeDasharray="3 2.5" data-series="average" />
      <path d={path} fill="none" stroke={SERIES.speed.color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" data-series="lap" />
      {points.map((ms, i) => i !== bestAt && (
        <circle key={i} cx={x(i)} cy={y(ms)} r={1.75} fill={SERIES.speed.color} />
      ))}
      <circle cx={x(bestAt)} cy={y(best)} r={2.75} fill={INK} stroke="#ffffff" strokeWidth={1.25} data-series="best" />
    </svg>
  )
}
