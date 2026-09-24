import type { ReactNode } from 'react'
import { formatLapTime, formatAverage, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

/** The best lap's time in a dark chip, so it stands out from the rest (#210). */
export function BestChip({ ms }: { ms: number }) {
  return (
    <span className="inline-block rounded-md bg-gray-900 px-1.5 py-0.5 font-mono font-bold tabular-nums text-white" data-best-lap>
      {formatLapTime(ms)}
    </span>
  )
}

/**
 * Laps, average and best — worked out from the laps, never typed in
 * (#210). Out and in laps don't count.
 */
export function LapFigures({ laps }: { laps: Lap[] }) {
  const stats = lapStats(laps)
  const figures: { label: string; value: ReactNode }[] = [
    { label: 'Laps', value: String(stats.count) },
    { label: 'Average', value: stats.average !== undefined ? formatAverage(laps, stats.average) : '—' },
    { label: 'Best', value: stats.best !== undefined ? <BestChip ms={stats.best} /> : '—' },
  ]
  return (
    <dl className="grid flex-1 grid-cols-3 gap-2" aria-label="Session figures">
      {figures.map(f => (
        <div key={f.label} className="min-w-0 rounded-lg bg-gray-50 px-2.5 py-2">
          <dt className="text-[11px] font-medium text-gray-500">{f.label}</dt>
          <dd className="mt-0.5 font-mono text-base font-semibold tabular-nums text-gray-900">{f.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/**
 * A session's laps, one row each, in the order a timing sheet has them
 * (#210): lap, start, finish, lap time, note. The crossing and note columns
 * only show when some lap has them. The best lap's time is in a chip; out
 * and in laps are dimmed, since they don't count.
 */
export function LapTable({ laps }: { laps: Lap[] }) {
  const labels = lapLabels(laps)
  const { bestIndex } = lapStats(laps)
  const starts = laps.some(lap => lap.start)
  const finishes = laps.some(lap => lap.end)
  const notes = laps.some(lap => lap.note)
  const crossing = 'whitespace-nowrap py-1.5 pr-2 font-mono text-[11px] tabular-nums text-gray-500'
  return (
    <table className="w-full border-collapse text-left text-xs" aria-label="Laps">
      <thead className="whitespace-nowrap text-[10px] uppercase tracking-wide text-gray-400">
        <tr>
          <th scope="col" className="w-8 py-1 pr-2 font-medium">Lap</th>
          {starts && <th scope="col" className="py-1 pr-2 font-medium">Start</th>}
          {finishes && <th scope="col" className="py-1 pr-2 font-medium">Finish</th>}
          <th scope="col" className="py-1 pr-2 font-medium">Lap time</th>
          {notes && <th scope="col" className="py-1 font-medium">Note</th>}
        </tr>
      </thead>
      <tbody>
        {laps.map((lap, i) => (
          <tr key={i} className={`border-t border-gray-100 align-top ${lap.kind ? 'text-gray-400' : 'text-gray-700'}`}>
            <th scope="row" className="py-1.5 pr-2 font-normal">{labels[i]}</th>
            {starts && <td className={crossing}>{lap.start}</td>}
            {finishes && <td className={crossing}>{lap.end}</td>}
            <td className="whitespace-nowrap py-1 pr-2 text-sm">
              {i === bestIndex
                ? <BestChip ms={lap.ms} />
                : <span className={`font-mono tabular-nums ${lap.kind ? '' : 'text-gray-900'}`}>{formatLapTime(lap.ms)}</span>}
            </td>
            {notes && <td className="py-1.5">{lap.note}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
