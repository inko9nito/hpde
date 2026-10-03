import { ChevronRight, ClipboardCheck, Disc3, Timer, Waves } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { formatTime, formatAmPm } from '../utils/time'
import { conditionsText, skyOf } from '../utils/conditions'
import type { SessionConditions } from '../utils/conditions'
import type { SessionActivity, RunGroupConfig } from '../types'

interface Props {
  activity: SessionActivity
  runGroups: RunGroupConfig[]
  past?: boolean
  /**
   * Signed in: the on-track row opens this session's lap times (#210).
   * Not set, the card is just the schedule.
   */
  onOpenLaps?: () => void
  /** Laps are saved for this session: shows the timer. */
  hasLaps?: boolean
  /** An instructor's evaluation is saved for it (#340): shows the clipboard. */
  hasEvaluation?: boolean
  /** Tire pressures are saved for it (#344): shows a tire. */
  hasPressures?: boolean
  /** The track conditions they recorded for it (#347): shown under the groups. */
  conditions?: SessionConditions
}

function resolveGroups(ids: string[], configs: RunGroupConfig[]): RunGroupConfig[] {
  return ids.flatMap(id => {
    const found = configs.find(g => g.id === id)
    return found ? [found] : []
  })
}

export function SessionCard({ activity, runGroups, past, onOpenLaps, hasLaps, hasEvaluation, hasPressures, conditions }: Props) {
  const conditionsLine = conditions && conditionsText(conditions)
  const ConditionsIcon = conditions?.sky ? skyOf(conditions.sky).icon : Waves
  const onTrack = resolveGroups(activity.onTrack, runGroups)
  const inClass = resolveGroups(activity.inClass ?? [], runGroups)

  const onTrackRow = (
    <>
      <span className="w-16 shrink-0 text-xs text-gray-900">On track</span>
      <div className="flex flex-1 flex-wrap gap-1.5">
        {onTrack.map(g => <GroupBadge key={g.id} group={g} />)}
      </div>
    </>
  )

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${past ? 'opacity-60' : ''}`}>
      <div className="flex gap-4">
        <div className="flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
          {formatTime(activity.time)}
          <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(activity.time)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {onTrack.length > 0 && (onOpenLaps ? (
            <button
              onClick={onOpenLaps}
              aria-label={`Lap times: ${formatTime(activity.time)} ${formatAmPm(activity.time)}, ${onTrack.map(g => g.label).join(', ')}${hasLaps ? ' (saved)' : ''}${hasEvaluation ? ' (evaluated)' : ''}${hasPressures ? ' (tire pressures)' : ''}`}
              // The highlight reaches 6px past the row on every side, 10px
              // short of the card's edge. A divider or note below sits only
              // 12px away, not 16, so there the row keeps 4px more room. On its
              // own, the row grows to the time's height, so it stays centred.
              className={`-mx-1.5 ${inClass.length > 0 || activity.note ? '-mb-0.5 -mt-1.5' : '-my-1.5 grow'} flex flex-wrap items-center gap-x-3 gap-y-2 rounded-lg p-1.5 text-left transition-colors hover:bg-gray-50`}
            >
              {onTrackRow}
              {hasLaps && <Timer size={16} className="shrink-0 text-gray-500" aria-hidden="true" data-has-laps />}
              {hasEvaluation && <ClipboardCheck size={16} className="shrink-0 text-gray-500" aria-hidden="true" data-has-evaluation />}
              {hasPressures && <Disc3 size={16} className="shrink-0 text-gray-500" aria-hidden="true" data-has-pressures />}
              <ChevronRight size={16} className="shrink-0 text-gray-300" aria-hidden="true" />
              {conditionsLine && (
                <span className="flex basis-full items-center gap-1.5 rounded-lg bg-gray-50 px-2 py-1.5 text-xs text-gray-700" data-session-conditions>
                  <ConditionsIcon size={15} className="shrink-0 text-gray-500" aria-hidden="true" />
                  <span className="truncate">{conditionsLine}</span>
                </span>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-3">{onTrackRow}</div>
          ))}
          {inClass.length > 0 && (
            <>
              {onTrack.length > 0 && <div className="border-t border-gray-100" />}
              <div className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs text-gray-900">In class</span>
                <div className="flex flex-wrap gap-1.5">
                  {inClass.map(g => <GroupBadge key={g.id} group={g} />)}
                </div>
              </div>
            </>
          )}
          {activity.note && (
            <p className="text-xs italic text-gray-500">{activity.note}</p>
          )}
        </div>
      </div>
    </div>
  )
}
