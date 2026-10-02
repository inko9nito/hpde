import type { ComponentType, ReactNode } from 'react'
import { ChevronRight, ClipboardCheck, Flag, UserRound } from 'lucide-react'
import { CarIcon } from './CarIcons'
import { GroupBadge } from './GroupBadge'
import { INSTRUCTED, NEXT_GROUPS, NEXT_HOW, TDE_GROUP_NAMES, aggressivenessText, carAidsText, cardOf } from '../utils/evaluation'
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
function Row({ icon: Icon, label, children }: {
  /** A Lucide icon, or the app's car (#417). */
  icon?: ComponentType<{ size?: number; className?: string; 'aria-hidden'?: 'true' }>
  label: string
  children: ReactNode
}) {
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
 * The instructor's evaluation of the whole event (#340), on My notes: who
 * they were and their notes. On a TDE event it's The Drivers Edge's report
 * card — the run group's card it was entered on (#350), in that card's
 * words — which also has the car, the run group they drove in and the ones
 * the instructor recommends next, and a score for each core skill — in
 * black, not TDE's red, which reads as bad marks. Only what's filled in
 * shows.
 */
export function EventEvaluationCard({ evaluation, tde = false, runGroup, events, onEdit }: {
  evaluation: EventEvaluation
  /** A TDE event's: which run group's report card it's on. */
  tde?: boolean
  /** The group they drove in at this event, if the app knows it. */
  runGroup?: RunGroupConfig | null
  /** Every event, to color the recommended groups as the app does. */
  events: EventConfig[]
  onEdit?: () => void
}) {
  const { instructor, instructed, car, escTc, next, nextHow, nextOr, skills, aggressivenessIsSkill, carAidsPct, soloQualified, notes } = evaluation
  const card = cardOf(evaluation)
  const scored = card.skills.filter(s => skills?.[s.id] !== undefined)
  const recommended = NEXT_GROUPS.filter(g => next?.[g.id])
  return (
    <section aria-label="Instructor evaluation" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" data-event-evaluation>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-bold text-gray-900">Instructor evaluation</h3>
        <ClipboardCheck size={18} className="mt-1 shrink-0 text-gray-900" aria-hidden="true" />
      </div>

      {(tde || instructor || car || runGroup) && (
        <dl className="mt-2">
          {tde && <Row icon={ClipboardCheck} label="Report card"><GroupBadge group={groupNamed(card.group, events)} size="sm" /></Row>}
          {instructor && <Row icon={UserRound} label="Instructor">{instructor}</Row>}
          {instructed && <Row label="Instructed">{INSTRUCTED.find(i => i.id === instructed)?.label}</Row>}
          {car && <Row icon={CarIcon} label="Car">{car}</Row>}
          {escTc && <Row label="ESP / traction control">{escTc}</Row>}
          {runGroup && <Row icon={Flag} label="Run group"><GroupBadge group={runGroup} size="sm" /></Row>}
        </dl>
      )}

      {recommended.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900">Recommended run group</h4>
          <dl className="mt-1">
            {recommended.map(g => {
              const how = NEXT_HOW.find(h => h.id === nextHow?.[g.id])
              const or = nextOr?.[g.id]
              return (
                <Row key={g.id} label={g.label}>
                  {/* "Blue · Part-time solo, or Yellow" (#350). */}
                  <span className="flex flex-wrap items-center justify-end gap-x-1.5 gap-y-1">
                    <GroupBadge group={groupNamed(next![g.id]!, events)} size="sm" />
                    {how && <span className="text-sm text-gray-900">{how.label}</span>}
                    {or && (<>
                      <span className="text-xs text-gray-500">or</span>
                      <GroupBadge group={groupNamed(or, events)} size="sm" />
                    </>)}
                  </span>
                </Row>
              )
            })}
          </dl>
        </div>
      )}

      {scored.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-900">Core skills</h4>
          {/* Each skill over its bar, the score beside the bar it goes with. */}
          <ul className="mt-3 flex flex-col gap-4" aria-label="Core skills">
            {scored.map(({ id, label }) => {
              const pct = skills![id]!
              return (
                <li key={id} aria-label={`${label}: ${pct}%`}>
                  <p className="text-sm text-gray-900">{label}</p>
                  <div className="mt-1 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                      <div className="h-full rounded-full bg-gray-900" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-11 shrink-0 text-right text-sm font-semibold tabular-nums text-gray-900">{pct}%</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {(aggressivenessIsSkill !== undefined || carAidsPct !== undefined || soloQualified !== undefined) && (
        <dl className="mt-3">
          {aggressivenessIsSkill !== undefined && (
            <Row label="Aggressiveness = skill">{aggressivenessText(aggressivenessIsSkill)}</Row>
          )}
          {carAidsPct !== undefined && (
            <Row label={card.carAidsLabel}><span className="tabular-nums">{carAidsText(carAidsPct, card)}</span></Row>
          )}
          {soloQualified !== undefined && (
            <Row label={`${card.group} part-time solo qualified`}>{soloQualified ? 'Yes' : 'No'}</Row>
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

/**
 * An event with no evaluation yet (#340): one row, like the session sheet's
 * (#205), saying what it's for — kept short so the laps below stay in view.
 */
export function AddEventEvaluation({ tde, onAdd }: { tde: boolean; onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-3 text-left transition-colors hover:bg-gray-50"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
        <ClipboardCheck size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900">Add instructor evaluation</span>
        <span className="mt-0.5 block text-xs text-gray-500">
          {tde ? 'Your TDE report card: run groups, skills and notes' : 'What your instructor said about the whole event'}
        </span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
    </button>
  )
}
