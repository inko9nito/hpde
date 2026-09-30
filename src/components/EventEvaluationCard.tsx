import type { ReactNode } from 'react'
import { CarFront, ClipboardCheck, Flag, UserRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GroupBadge } from './GroupBadge'
import { NEXT_GROUPS, TDE_GROUP_NAMES, TDE_SKILLS } from '../utils/evaluation'
import type { EventEvaluation } from '../utils/evaluation'
import { suggestColor } from '../utils/scheduleEditor'
import type { EventConfig, RunGroupConfig } from '../types'

const isInstructors = (g: RunGroupConfig) => /instructor/i.test(g.label)

/**
 * A run group by its name ("Blue"), colored as the app colors it: the
 * group of that name in these events, or failing that, the palette's color
 * for the name.
 */
export function groupNamed(name: string, events: EventConfig[]): RunGroupConfig {
  const key = name.trim().toLowerCase()
  const found = events.flatMap(e => e.runGroups).find(g => g.label.toLowerCase() === key)
  return found ?? { id: key, label: name, bgClass: suggestColor(name), textClass: 'text-white' }
}

/**
 * The run groups a report card can recommend (#340): the ones TDE runs and
 * this event's, in the palette's order, colored as the app colors them.
 * Never Instructors.
 */
export function recommendableGroups(event: EventConfig, events: EventConfig[]): RunGroupConfig[] {
  const own = event.runGroups.filter(g => !isInstructors(g))
  const others = TDE_GROUP_NAMES
    .filter(n => !own.some(g => g.label.toLowerCase() === n.toLowerCase()))
    .map(n => groupNamed(n, [event, ...events]))
  const order = (g: RunGroupConfig) => {
    const i = TDE_GROUP_NAMES.findIndex(n => n.toLowerCase() === g.label.toLowerCase())
    return i === -1 ? TDE_GROUP_NAMES.length : i
  }
  return [...own, ...others].sort((a, b) => order(a) - order(b))
}

/** A label and its value, a line to itself — as on the Details tab. */
function Row({ icon: Icon, label, children }: { icon?: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-3 border-b border-gray-100 py-2 last:border-b-0">
      <dt className="flex items-center gap-2.5 text-[13px] font-medium text-gray-500">
        {Icon && <Icon size={14} className="shrink-0 text-gray-400" aria-hidden="true" />}
        {label}
      </dt>
      <dd className="min-w-0 text-right text-sm text-gray-900">{children}</dd>
    </div>
  )
}

/**
 * The Drivers Edge's report card for the whole event (#340), on My notes:
 * who the instructor was, the run group they drove in and the ones the
 * instructor recommends next, a score for each core skill and their notes
 * — in black, not TDE's red, which reads as bad marks.
 */
export function EventEvaluationCard({ evaluation, runGroup, events, onEdit }: {
  evaluation: EventEvaluation
  /** The group they drove in at this event, if the app knows it. */
  runGroup?: RunGroupConfig | null
  /** Every event, to color the recommended groups as the app does. */
  events: EventConfig[]
  onEdit?: () => void
}) {
  const { instructor, car, next, skills, aggressivenessIsSkill, carAidsPct, notes } = evaluation
  const scored = TDE_SKILLS.filter(s => skills?.[s.id] !== undefined)
  const recommended = NEXT_GROUPS.filter(g => next?.[g.id])
  return (
    <section aria-label="Instructor evaluation" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" data-event-evaluation>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-gray-900">Instructor evaluation</h3>
        <ClipboardCheck size={18} className="mt-1 shrink-0 text-gray-900" aria-hidden="true" />
      </div>

      {(instructor || car || runGroup) && (
        <dl className="mt-2">
          {instructor && <Row icon={UserRound} label="Instructor">{instructor}</Row>}
          {car && <Row icon={CarFront} label="Car">{car}</Row>}
          {runGroup && <Row icon={Flag} label="Run group"><GroupBadge group={runGroup} size="sm" /></Row>}
        </dl>
      )}

      {recommended.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900">Recommended run group</h4>
          <dl className="mt-1">
            {recommended.map(g => (
              <Row key={g.id} label={g.label}>
                <GroupBadge group={groupNamed(next![g.id]!, events)} size="sm" />
              </Row>
            ))}
          </dl>
        </div>
      )}

      {scored.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900">Core skills</h4>
          <ul className="mt-2 flex flex-col gap-2.5" aria-label="Core skills">
            {scored.map(({ id, label }) => {
              const pct = skills![id]!
              return (
                <li key={id} aria-label={`${label}: ${pct}%`}>
                  <div className="flex items-baseline justify-between gap-3 text-sm text-gray-900">
                    <span>{label}</span>
                    <span className="font-semibold tabular-nums">{pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                    <div className="h-full rounded-full bg-gray-900" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {(aggressivenessIsSkill !== undefined || carAidsPct !== undefined) && (
        <dl className="mt-3">
          {aggressivenessIsSkill !== undefined && (
            <Row label="Aggressiveness = skill">{aggressivenessIsSkill ? 'Yes' : 'No'}</Row>
          )}
          {carAidsPct !== undefined && (
            <Row label="Car aids over activated"><span className="tabular-nums">{carAidsPct}%</span></Row>
          )}
        </dl>
      )}

      {notes && (
        <div className="mt-5">
          <h4 className="text-sm font-semibold text-gray-900">Instructor notes</h4>
          <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-gray-900">{notes}</p>
        </div>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="mt-5 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
        >
          Edit evaluation
        </button>
      )}
    </section>
  )
}

/** A TDE event with no report card yet (#340): what it's for, and the way to add it. */
export function AddEventEvaluation({ onAdd }: { onAdd: () => void }) {
  return (
    <section aria-label="Instructor evaluation" className="rounded-2xl border border-dashed border-gray-300 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-900">Instructor evaluation</h3>
        <ClipboardCheck size={18} className="mt-1 shrink-0 text-gray-400" aria-hidden="true" />
      </div>
      <p className="mt-1 text-sm text-gray-500">
        Add your TDE report card: the run group your instructor recommends, your core skill scores and their notes.
      </p>
      <button
        onClick={onAdd}
        className="mt-4 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
      >
        Add evaluation
      </button>
    </section>
  )
}
