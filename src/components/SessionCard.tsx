import { GroupBadge } from './GroupBadge'
import { formatTime } from '../utils/time'
import type { SessionEvent, RunGroupConfig } from '../types'

interface Props {
  event: SessionEvent
  runGroups: RunGroupConfig[]
  past?: boolean
}

function resolveGroups(ids: string[], configs: RunGroupConfig[]): RunGroupConfig[] {
  return ids.flatMap(id => {
    const found = configs.find(g => g.id === id)
    return found ? [found] : []
  })
}

export function SessionCard({ event, runGroups, past }: Props) {
  const onTrack = resolveGroups(event.onTrack, runGroups)
  const inClass = resolveGroups(event.inClass ?? [], runGroups)

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${past ? 'opacity-40' : ''}`}>
      <div className="flex gap-4">
        <div className="w-16 shrink-0 font-mono text-lg font-semibold text-gray-900">
          {formatTime(event.time)}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {onTrack.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-xs text-gray-400">On track</span>
              <div className="flex flex-wrap gap-1.5">
                {onTrack.map(g => <GroupBadge key={g.id} group={g} />)}
              </div>
            </div>
          )}
          {inClass.length > 0 && (
            <>
              <div className="border-t border-gray-100" />
              <div className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs text-gray-400">In class</span>
                <div className="flex flex-wrap gap-1.5">
                  {inClass.map(g => <GroupBadge key={g.id} group={g} />)}
                </div>
              </div>
            </>
          )}
          {event.note && (
            <>
              <div className="border-t border-gray-100" />
              <span className="text-xs text-gray-400">{event.note}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
