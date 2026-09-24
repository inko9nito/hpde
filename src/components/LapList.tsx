import { formatLapTime, formatAverage, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

/**
 * Laps, best and average — worked out from the laps, never typed in
 * (#210). Out and in laps are listed but don't count.
 */
export function LapFigures({ laps }: { laps: Lap[] }) {
  const stats = lapStats(laps)
  const extra = laps.length - stats.count
  const figures = [
    { label: 'Laps', value: String(stats.count), note: extra ? `+ ${extra} out/in` : null },
    { label: 'Best', value: stats.best !== undefined ? formatLapTime(stats.best) : '—', note: null },
    { label: 'Average', value: stats.average !== undefined ? formatAverage(laps, stats.average) : '—', note: null },
  ]
  return (
    <dl className="grid grid-cols-3 gap-2" aria-label="Session figures">
      {figures.map(f => (
        <div key={f.label} className="min-w-0">
          <dt className="text-[11px] font-medium text-gray-500">{f.label}</dt>
          <dd className="font-mono text-base font-semibold tabular-nums text-gray-900">
            {f.value}
            {f.note && <span className="ml-1 font-sans text-[10px] font-normal text-gray-400">{f.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * A session's laps, one row each (#210): lap, time, and the crossings and
 * note when there are any. The best lap is marked; out and in laps are
 * dimmed, since they don't count.
 */
export function LapTable({ laps }: { laps: Lap[] }) {
  const labels = lapLabels(laps)
  const { bestIndex } = lapStats(laps)
  const crossings = laps.some(lap => lap.start || lap.end)
  const notes = laps.some(lap => lap.note)
  return (
    <table className="w-full border-collapse text-left text-xs" aria-label="Laps">
      <thead className="text-[10px] uppercase tracking-wide text-gray-400">
        <tr>
          <th scope="col" className="w-10 py-1 pr-2 font-medium">Lap</th>
          <th scope="col" className="py-1 pr-3 font-medium">Time</th>
          {crossings && <th scope="col" className="py-1 pr-3 font-medium">Start – finish</th>}
          {notes && <th scope="col" className="py-1 font-medium">Note</th>}
        </tr>
      </thead>
      <tbody>
        {laps.map((lap, i) => {
          const best = i === bestIndex
          return (
            <tr key={i} className={`border-t border-gray-100 align-top ${lap.kind ? 'text-gray-400' : 'text-gray-700'}`}>
              <th scope="row" className="py-1.5 pr-2 font-normal">{labels[i]}</th>
              <td className="whitespace-nowrap py-1.5 pr-3">
                <span className={`font-mono text-sm tabular-nums ${best ? 'font-bold text-gray-900' : lap.kind ? '' : 'text-gray-900'}`}>
                  {formatLapTime(lap.ms)}
                </span>
                {best && <span className="ml-1.5 rounded bg-gray-900 px-1 py-px text-[9px] font-semibold uppercase tracking-wide text-white">Best</span>}
              </td>
              {crossings && (
                <td className="whitespace-nowrap py-1.5 pr-3 font-mono tabular-nums text-gray-500">
                  {lap.start && <div>{lap.start}</div>}
                  {lap.end && <div>{lap.end}</div>}
                </td>
              )}
              {notes && <td className="py-1.5">{lap.note}</td>}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
