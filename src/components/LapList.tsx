import { Fragment } from 'react'
import type { ReactNode } from 'react'
import { Timer } from 'lucide-react'
import { formatLapTime, formatAverage, lapLabels, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

/**
 * The best lap's time in a dark chip, so it stands out from the rest (#210).
 * Pulled left by its own padding, so its digits line up with the plain
 * times above and below it. A timer inside marks the all-time best on this
 * track layout.
 */
export function BestChip({ ms, allTime }: { ms: number; allTime?: boolean }) {
  return (
    <span
      className="-ml-1.5 inline-flex items-center gap-1 rounded-md bg-gray-900 px-1.5 py-0.5 font-mono font-bold tabular-nums text-white"
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
 * (#210): lap, start, finish, lap time, note. Every column has a fixed
 * width, so tables for different sessions line up down the page. The best
 * lap's time is in a chip; out and in laps are dimmed, since they don't
 * count. With start and finish times there's a gap before the lap time, so
 * it stands apart from them — and on a phone that leaves too little room
 * for a note column, so each note goes on a line of its own under its lap.
 */
export function LapTable({ laps, columns = lapColumns(laps), allTimeBest }: {
  laps: Lap[]
  columns?: LapColumns
  allTimeBest?: number
}) {
  const labels = lapLabels(laps)
  const { bestIndex } = lapStats(laps)
  const crossings = columns.start || columns.finish
  const stacked = columns.note && crossings
  // Shown on wider screens only when notes are stacked on a phone.
  const noteColumn = stacked ? 'hidden sm:table-cell' : ''
  const crossing = 'truncate py-1.5 pr-2 font-mono text-[10px] tabular-nums text-gray-500'
  return (
    <table className="w-full table-fixed border-collapse text-left text-xs" aria-label="Laps">
      <colgroup>
        <col className="w-8" />
        {columns.start && <col className="w-20" />}
        {columns.finish && <col className="w-20" />}
        {/* With notes stacked on a phone, the lap time takes what's left there. */}
        <col className={crossings ? (stacked ? 'sm:w-[5.75rem]' : 'w-[5.75rem]') : 'w-[4.75rem]'} />
        {columns.note && <col className={stacked ? 'hidden sm:table-column' : ''} />}
      </colgroup>
      <thead className="whitespace-nowrap text-[10px] uppercase tracking-wide text-gray-400">
        <tr>
          <th scope="col" className="py-1 pr-2 font-medium">Lap</th>
          {columns.start && <th scope="col" className="py-1 pr-2 font-medium">Start</th>}
          {columns.finish && <th scope="col" className="py-1 pr-2 font-medium">Finish</th>}
          <th scope="col" className={`py-1 pr-2 font-medium ${crossings ? 'pl-4' : ''}`}>Lap time</th>
          {columns.note && <th scope="col" className={`py-1 font-medium ${noteColumn}`}>Note</th>}
        </tr>
      </thead>
      <tbody>
        {laps.map((lap, i) => {
          const dim = lap.kind ? 'text-gray-400' : 'text-gray-700'
          const noteBelow = stacked && !!lap.note
          return (
            <Fragment key={i}>
              <tr className={`border-t border-gray-100 align-top ${dim}`}>
                <th scope="row" className="py-1.5 pr-2 font-normal">{labels[i]}</th>
                {columns.start && <td className={crossing}>{lap.start}</td>}
                {columns.finish && <td className={crossing}>{lap.end}</td>}
                <td className={`whitespace-nowrap py-1 pr-2 text-[13px] ${crossings ? 'pl-4' : ''}`}>
                  {i === bestIndex
                    ? <BestChip ms={lap.ms} allTime={lap.ms === allTimeBest} />
                    : <span className={`font-mono tabular-nums ${lap.kind ? '' : 'text-gray-900'}`}>{formatLapTime(lap.ms)}</span>}
                </td>
                {columns.note && <td className={`py-1.5 ${noteColumn}`}>{lap.note}</td>}
              </tr>
              {noteBelow && (
                <tr className={`sm:hidden ${dim}`} data-note-row>
                  <td />
                  <td colSpan={(columns.start ? 1 : 0) + (columns.finish ? 1 : 0) + 1} className="pb-1.5">
                    {lap.note}
                  </td>
                </tr>
              )}
            </Fragment>
          )
        })}
      </tbody>
    </table>
  )
}
