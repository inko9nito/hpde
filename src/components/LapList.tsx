import { Timer } from 'lucide-react'
import { formatLapTime, formatAverage, formatSpeed, lapLabels, lapSpeeds, lapStats } from '../utils/lapTimes'
import type { Lap } from '../utils/lapTimes'

const chip = 'inline-flex items-center gap-1 rounded-md bg-gray-900 px-1.5 py-0.5 font-mono font-bold tabular-nums text-white'

/**
 * The best lap's time in a dark chip, so it stands out from the rest (#210).
 * In a table it's pulled left by its own padding (`aligned`), so its digits
 * line up with the plain times above and below it. A timer inside marks the
 * all-time best on this track layout.
 */
export function BestChip({ ms, allTime, aligned }: { ms: number; allTime?: boolean; aligned?: boolean }) {
  return (
    <span
      className={`${aligned ? '-ml-1.5 ' : ''}${chip}`}
      data-best-lap
      {...(allTime ? { 'data-all-time-best': true, title: 'All time best' } : {})}
    >
      {formatLapTime(ms)}
      {allTime && <Timer size={12} strokeWidth={2.5} aria-label="All time best" />}
    </span>
  )
}

/**
 * Heads a session's figures (#324): its laps that count, and whether its
 * speeds are in too. Out and in laps don't count.
 */
export function LapsHeading({ laps }: { laps: Lap[] }) {
  const { count } = lapStats(laps)
  const { top, average } = lapSpeeds(laps)
  return (
    <p className="flex items-center gap-1.5 text-xs text-gray-500">
      <Timer size={13} aria-hidden="true" />
      {top !== undefined || average !== undefined ? 'Laps & speeds' : 'Lap times'} · {count} {count === 1 ? 'lap' : 'laps'}
    </p>
  )
}

/** In line with the heading's text, past its timer: the figures and a note under it. */
export const FIGURES_INDENT = 'pl-[19px]'

/**
 * A session's figures (#324), in a small table: the average and best
 * lap, and under them the average and top speed when they're logged
 * (#298). The best lap and the top speed are in chips, pulled left so
 * their digits line up with the column's heading. Out and in laps don't
 * count; `allTimeBest` marks the best lap when it's the best on this layout
 * too. The columns are the same widths on every card, so they line up down
 * the page.
 */
export function SessionFigures({ laps, allTimeBest }: { laps: Lap[]; allTimeBest?: number }) {
  const stats = lapStats(laps)
  const speeds = lapSpeeds(laps)
  const hasSpeeds = speeds.top !== undefined || speeds.average !== undefined
  const figure = 'py-0.5 font-mono font-semibold tabular-nums text-gray-900'
  return (
    <table className="w-full table-fixed text-left text-xs" aria-label="Session figures">
      <colgroup>
        <col className="w-[4.5rem]" />
        <col />
        <col />
      </colgroup>
      <thead className="text-[11px] text-gray-500">
        <tr>
          <td />
          <th scope="col" className="pb-1 font-medium">Average</th>
          <th scope="col" className="pb-1 font-medium">{hasSpeeds ? 'Best / top' : 'Best'}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" className="py-0.5 font-normal text-gray-500">Lap time</th>
          <td className={figure}>{stats.average !== undefined ? formatAverage(laps, stats.average) : '—'}</td>
          <td className={figure}>
            {stats.best !== undefined ? <BestChip ms={stats.best} allTime={stats.best === allTimeBest} aligned /> : '—'}
          </td>
        </tr>
        {hasSpeeds && (
          <tr data-speed-figures>
            <th scope="row" className="py-0.5 font-normal text-gray-500">Speed</th>
            <td className={figure}>{speeds.average !== undefined ? <Mph mph={speeds.average} /> : '—'}</td>
            <td className={figure}>{speeds.top !== undefined ? <Mph mph={speeds.top} top /> : '—'}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

function Mph({ mph, top }: { mph: number; top?: boolean }) {
  return (
    <>
      {top ? <span className={`-ml-1.5 ${chip}`} data-top-speed>{formatSpeed(mph)}</span> : formatSpeed(mph)}
      {' '}<span className="font-sans font-normal text-gray-400">mph</span>
    </>
  )
}

/** Which of the optional columns a table shows. */
export interface LapColumns {
  start: boolean
  finish: boolean
  /** Top and average speed (#298). */
  top: boolean
  avg: boolean
  note: boolean
}

/** The columns any of these laps need — pass every session's, so all their tables line up. */
export function lapColumns(laps: Lap[]): LapColumns {
  return {
    start: laps.some(lap => lap.start),
    finish: laps.some(lap => lap.end),
    top: laps.some(lap => lap.topMph !== undefined),
    avg: laps.some(lap => lap.avgMph !== undefined),
    note: laps.some(lap => lap.note),
  }
}

/**
 * A session's laps, one row each, in the order a timing sheet has them
 * (#210): lap, from and to (the start and finish crossings, stacked in one
 * column, leaving room for notes), lap time, top and average speed in mph
 * (#298), note. Every column has a fixed width, so tables for
 * different sessions line up down the page, and there's a gap before the
 * lap time so it stands apart from the crossings. The best lap's time is
 * in a chip; out and in laps are dimmed, since they don't count.
 *
 * Beside the crossings, which make every row two lines tall already, the
 * top and average speed stack in one column too, so a phone still has room
 * for notes. Without notes, an empty last column takes the spare width, so
 * the speeds stay by the lap time.
 */
export function LapTable({ laps, columns = lapColumns(laps), allTimeBest }: {
  laps: Lap[]
  columns?: LapColumns
  allTimeBest?: number
}) {
  const labels = lapLabels(laps)
  const { bestIndex } = lapStats(laps)
  const crossings = columns.start || columns.finish
  const crossingsLabel = columns.start && columns.finish ? 'From / To' : columns.start ? 'From' : 'To'
  const stacked = crossings && columns.top && columns.avg
  const filler = (columns.top || columns.avg) && !columns.note
  return (
    <table className="w-full table-fixed border-collapse text-left text-xs" aria-label="Laps">
      <colgroup>
        <col className="w-8" />
        {/* Wider screens spread the from/to times away from the lap time. */}
        {crossings && <col className="w-20 min-[480px]:w-36" />}
        <col className={crossings ? 'w-[5.75rem]' : 'w-[4.75rem]'} />
        {stacked ? <col className="w-12" /> : <>
          {columns.top && <col className="w-12" />}
          {columns.avg && <col className="w-12" />}
        </>}
        {(columns.note || filler) && <col />}
      </colgroup>
      <thead className="text-[10px] uppercase tracking-wide text-gray-400">
        <tr>
          <th scope="col" className="whitespace-nowrap py-1 pr-2 align-bottom font-medium">Lap</th>
          {crossings && <th scope="col" className="whitespace-nowrap py-1 pr-2 align-bottom font-medium">{crossingsLabel}</th>}
          <th scope="col" className={`whitespace-nowrap py-1 pr-2 align-bottom font-medium ${crossings ? 'pl-4' : ''}`}>Lap time</th>
          {stacked ? <SpeedHeader lines={['Top', 'Avg']} title="Top and average speed, mph" /> : <>
            {columns.top && <SpeedHeader lines={['Top', 'mph']} title="Top speed, mph" />}
            {columns.avg && <SpeedHeader lines={['Avg', 'mph']} title="Average speed, mph" />}
          </>}
          {columns.note && <th scope="col" className="py-1 align-bottom font-medium">Note</th>}
          {filler && <td aria-hidden="true" />}
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
            {stacked ? (
              <td className={`py-1.5 pr-2 text-right font-mono leading-4 tabular-nums ${lap.kind ? '' : 'text-gray-900'}`}>
                <Speed mph={lap.topMph} />
                <Speed mph={lap.avgMph} />
              </td>
            ) : <>
              {columns.top && <td className={speedCell(lap)}><Speed mph={lap.topMph} /></td>}
              {columns.avg && <td className={speedCell(lap)}><Speed mph={lap.avgMph} /></td>}
            </>}
            {columns.note && <td className="py-1.5">{lap.note}</td>}
            {filler && <td aria-hidden="true" />}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** A speed column's heading, on two lines: its name over the unit, or top over average. */
function SpeedHeader({ lines, title }: { lines: [string, string]; title: string }) {
  return (
    <th scope="col" className="py-1 pr-2 text-right align-bottom font-medium" aria-label={title} title={title}>
      {lines.map(line => <span key={line} className={`block ${line === 'mph' ? 'normal-case' : ''}`}>{line}</span>)}
    </th>
  )
}

// Level with the lap time beside it.
const speedCell = (lap: Lap) => `whitespace-nowrap py-1 pr-2 text-right font-mono leading-4 tabular-nums ${lap.kind ? '' : 'text-gray-900'}`

/** A speed on a line of its own, which keeps its height without one. */
function Speed({ mph }: { mph?: number }) {
  return <span className="block h-4" data-speed>{mph !== undefined ? formatSpeed(mph) : ''}</span>
}
