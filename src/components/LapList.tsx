import { formatLapTime, formatAverage, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

/**
 * A session's laps as chips, in order (#210). The best lap is marked; out
 * and in laps are labelled and dimmed, since they don't count.
 */
export function LapChips({ laps }: { laps: Lap[] }) {
  const { bestIndex } = lapStats(laps)
  const labels = lapLabels(laps)
  return (
    <ul className="flex flex-wrap gap-1.5" aria-label="Laps">
      {laps.map((lap, i) => {
        const best = i === bestIndex
        return (
          <li
            key={i}
            aria-label={`${lap.kind ? `${labels[i]} lap` : `Lap ${labels[i]}`}: ${formatLapTime(lap.ms)}${best ? ', best' : ''}`}
            className={`rounded-md px-2 py-1 font-mono text-xs tabular-nums ${
              best ? 'bg-gray-900 font-semibold text-white'
              : lap.kind ? 'bg-gray-50 text-gray-400'
              : 'bg-gray-100 text-gray-800'
            }`}
          >
            {lap.kind && <span className="mr-1 font-sans text-[10px] uppercase tracking-wide">{labels[i]}</span>}
            {formatLapTime(lap.ms)}
          </li>
        )
      })}
    </ul>
  )
}

/** "10 laps · Best 1:48 · Avg 1:51.0", plus the out and in laps left out of it. */
export function LapStatsLine({ laps }: { laps: Lap[] }) {
  const stats = lapStats(laps)
  const extra = laps.length - stats.count
  const parts = [`${stats.count} ${stats.count === 1 ? 'lap' : 'laps'}`]
  if (stats.best !== undefined) parts.push(`Best ${formatLapTime(stats.best)}`)
  if (stats.average !== undefined && stats.count > 1) parts.push(`Avg ${formatAverage(laps, stats.average)}`)
  if (extra) parts.push(`+ ${extra} out/in`)
  return <p className="text-xs text-gray-500">{parts.join(' · ')}</p>
}

/**
 * Each lap's crossings and note, when the laps have any — the rest of what
 * a timing sheet holds. Collapsed, so the chips stay the headline.
 */
export function LapDetails({ laps }: { laps: Lap[] }) {
  if (!laps.some(lap => lap.start || lap.end || lap.note)) return null
  const labels = lapLabels(laps)
  const { bestIndex } = lapStats(laps)
  return (
    <details className="group text-xs">
      <summary className="cursor-pointer select-none text-gray-500 hover:text-gray-700">Lap details</summary>
      <table className="mt-2 w-full border-collapse text-left">
        <thead className="text-[10px] uppercase tracking-wide text-gray-400">
          <tr>
            <th className="py-1 pr-2 font-medium">Lap</th>
            <th className="py-1 pr-2 font-medium">Time</th>
            <th className="py-1 pr-2 font-medium">Crossings</th>
            <th className="py-1 font-medium">Note</th>
          </tr>
        </thead>
        <tbody>
          {laps.map((lap, i) => (
            <tr key={i} className="border-t border-gray-100 align-top">
              <td className={`py-1 pr-2 ${lap.kind ? 'text-gray-400' : 'text-gray-600'}`}>{labels[i]}</td>
              <td className={`py-1 pr-2 font-mono tabular-nums ${i === bestIndex ? 'font-semibold text-gray-900' : 'text-gray-800'}`}>
                {formatLapTime(lap.ms)}
              </td>
              <td className="whitespace-nowrap py-1 pr-2 font-mono tabular-nums text-gray-500">
                {lap.start && <div>{lap.start}</div>}
                {lap.end && <div>{lap.end}</div>}
              </td>
              <td className="py-1 text-gray-600">{lap.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  )
}
