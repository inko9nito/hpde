import { ChevronRight, Timer } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { formatTime, formatAmPm } from '../utils/time'
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
}

function resolveGroups(ids: string[], configs: RunGroupConfig[]): RunGroupConfig[] {
  return ids.flatMap(id => {
    const found = configs.find(g => g.id === id)
    return found ? [found] : []
  })
}

export function SessionCard({ activity, runGroups, past, onOpenLaps, hasLaps }: Props) {
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
              aria-label={`Lap times: ${formatTime(activity.time)} ${formatAmPm(activity.time)}, ${onTrack.map(g => g.label).join(', ')}${hasLaps ? ' (saved)' : ''}`}
              // The highlight reaches 6px past the row on every side, 10px
              // short of the card's edge. A divider or note below sits only
              // 12px away, not 16, so there the row keeps 4px more room. On its
              // own, the row grows to the time's height, so it stays centred.
              className={`-mx-1.5 ${inClass.length > 0 || activity.note ? '-mb-0.5 -mt-1.5' : '-my-1.5 grow'} flex items-center gap-3 rounded-lg p-1.5 text-left transition-colors hover:bg-gray-50`}
            >
              {onTrackRow}
              {hasLaps && <Timer size={16} className="shrink-0 text-gray-500" aria-hidden="true" data-has-laps />}
              <ChevronRight size={16} className="shrink-0 text-gray-300" aria-hidden="true" />
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
