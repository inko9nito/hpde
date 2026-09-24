import type { ReactNode } from 'react'
import { Timer } from 'lucide-react'
import { formatLapTime, formatAverage, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

/**
 * The best lap's time in a dark chip, so it stands out from the rest (#210).
 * In a table it's pulled left by its own padding (`aligned`), so its digits
 * line up with the plain times above and below it. A timer inside marks the
 * all-time best on this track layout.
 */
export function BestChip({ ms, allTime, aligned }: { ms: number; allTime?: boolean; aligned?: boolean }) {
  return (
    <span
      className={`${aligned ? '-ml-1.5 ' : ''}inline-flex items-center gap-1 rounded-md bg-gray-900 px-1.5 py-0.5 font-mono font-bold tabular-nums text-white`}
      data-best-lap
      {...(allTime ? { 'data-all-time-best': true, title: 'All time best' } : {})}
    >
      {formatLapTime(ms)}
      {allTime && <Timer size={12} strokeWidth={2.5} aria-label="All time best" />}
    </span>
  )
}

/**
 * Laps, average and best — worked out from the laps, never typed in
 * (#210). Out and in laps don't count. `allTimeBest` is the best on this
 * layout across every event, to mark the best lap when it's that too.
 */
export function LapFigures({ laps, allTimeBest }: { laps: Lap[]; allTimeBest?: number }) {
  const stats = lapStats(laps)
  const figures: { label: string; value: ReactNode }[] = [
    { label: 'Laps', value: String(stats.count) },
    { label: 'Average', value: stats.average !== undefined ? formatAverage(laps, stats.average) : '—' },
    {
      label: 'Best',
      value: stats.best !== undefined ? <BestChip ms={stats.best} allTime={stats.best === allTimeBest} /> : '—',
    },
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

/** Which of the optional columns a table shows. */
export interface LapColumns {
  start: boolean
  finish: boolean
  note: boolean
}

/** The columns any of these laps need — pass every session's, so all their tables line up. */
export function lapColumns(laps: Lap[]): LapColumns {
  return {
    start: laps.some(lap => lap.start),
    finish: laps.some(lap => lap.end),
    note: laps.some(lap => lap.note),
  }
}

/**
 * A session's laps, one row each, in the order a timing sheet has them
 * (#210): lap, start and finish (stacked in one column, leaving room for
 * notes), lap time, note. Every column has a fixed width, so tables for
 * different sessions line up down the page, and there's a gap before the
 * lap time so it stands apart from the crossings. The best lap's time is
 * in a chip; out and in laps are dimmed, since they don't count.
 */
export function LapTable({ laps, columns = lapColumns(laps), allTimeBest }: {
  laps: Lap[]
  columns?: LapColumns
  allTimeBest?: number
}) {
  const labels = lapLabels(laps)
  const { bestIndex } = lapStats(laps)
  const crossings = columns.start || columns.finish
  const crossingsLabel = columns.start && columns.finish ? 'Start – Finish' : columns.start ? 'Start' : 'Finish'
  return (
    <table className="w-full table-fixed border-collapse text-left text-xs" aria-label="Laps">
      <colgroup>
        <col className="w-8" />
        {crossings && <col className="w-20" />}
        <col className={crossings ? 'w-[5.75rem]' : 'w-[4.75rem]'} />
        {columns.note && <col />}
      </colgroup>
      <thead className="text-[10px] uppercase tracking-wide text-gray-400">
        <tr>
          <th scope="col" className="whitespace-nowrap py-1 pr-2 align-bottom font-medium">Lap</th>
          {crossings && <th scope="col" className="py-1 pr-2 align-bottom font-medium">{crossingsLabel}</th>}
          <th scope="col" className={`whitespace-nowrap py-1 pr-2 align-bottom font-medium ${crossings ? 'pl-4' : ''}`}>Lap time</th>
          {columns.note && <th scope="col" className="py-1 align-bottom font-medium">Note</th>}
        </tr>
      </thead>
      <tbody>
        {laps.map((lap, i) => (
          <tr key={i} className={`border-t border-gray-100 align-top ${lap.kind ? 'text-gray-400' : 'text-gray-700'}`}>
            <th scope="row" className="py-1.5 pr-2 font-normal">{labels[i]}</th>
            {crossings && (
              <td className="py-1.5 pr-2 font-mono text-[10px] leading-4 tabular-nums text-gray-500">
                {columns.start && <span className="block truncate">{lap.start}</span>}
                {columns.finish && <span className="block truncate">{lap.end}</span>}
              </td>
            )}
            <td className={`whitespace-nowrap py-1 pr-2 text-[13px] ${crossings ? 'pl-4' : ''}`}>
              {i === bestIndex
                ? <BestChip ms={lap.ms} allTime={lap.ms === allTimeBest} aligned />
                : <span className={`font-mono tabular-nums ${lap.kind ? '' : 'text-gray-900'}`}>{formatLapTime(lap.ms)}</span>}
            </td>
            {columns.note && <td className="py-1.5">{lap.note}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
