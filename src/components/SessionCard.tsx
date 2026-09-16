import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { TirePressureGrid } from './TirePressureGrid'
import { InstructorEvalCard } from './InstructorEvalCard'
import { MediaLinks } from './MediaLinks'
import { formatTime, formatAmPm } from '../utils/time'
import type { SessionEvent, RunGroupConfig, SessionLog } from '../types'

interface Props {
  event: SessionEvent
  runGroups: RunGroupConfig[]
  past?: boolean
  log?: SessionLog
}

function resolveGroups(ids: string[], configs: RunGroupConfig[]): RunGroupConfig[] {
  return ids.flatMap(id => {
    const found = configs.find(g => g.id === id)
    return found ? [found] : []
  })
}

function hasLogContent(log?: SessionLog): log is SessionLog {
  if (!log) return false
  return !!(log.notes || log.instructorEval || log.tirePressures || log.carAids || (log.media && log.media.length))
}

export function SessionCard({ event, runGroups, past, log }: Props) {
  const [expanded, setExpanded] = useState(false)
  const onTrack = resolveGroups(event.onTrack, runGroups)
  const inClass = resolveGroups(event.inClass ?? [], runGroups)
  const expandable = hasLogContent(log)

  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-opacity ${past ? 'opacity-60' : ''}`}>
      <div className="flex gap-4">
        <div className="flex w-20 shrink-0 items-baseline gap-0.5 font-mono text-lg font-semibold text-gray-900">
          {formatTime(event.time)}
          <span className="font-sans text-[10px] font-normal text-gray-400">{formatAmPm(event.time)}</span>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {onTrack.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="w-16 shrink-0 text-xs text-gray-900">On track</span>
              <div className="flex flex-wrap gap-1.5">
                {onTrack.map(g => <GroupBadge key={g.id} group={g} />)}
              </div>
            </div>
          )}
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
          {event.note && (
            <p className="text-xs italic text-gray-500">{event.note}</p>
          )}
        </div>
        {expandable && (
          <button
            onClick={() => setExpanded(e => !e)}
            aria-label={expanded ? 'Hide session details' : 'Show session details'}
            className="flex h-6 w-6 shrink-0 items-center justify-center self-start rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <ChevronDown size={16} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {expandable && expanded && (
        <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-3">
          {log.notes && <p className="text-xs text-gray-600">{log.notes}</p>}
          {log.carAids && (
            <p className="text-xs text-gray-500"><span className="font-medium text-gray-700">Car aids:</span> {log.carAids}</p>
          )}
          {log.tirePressures && <TirePressureGrid pressures={log.tirePressures} />}
          {log.instructorEval && (
            <div>
              <div className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Instructor evaluation</div>
              <InstructorEvalCard evaluation={log.instructorEval} />
            </div>
          )}
          {log.media && log.media.length > 0 && <MediaLinks media={log.media} />}
        </div>
      )}
    </div>
  )
}
