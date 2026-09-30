import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { Sheet } from './Sheet'
import { GroupBadge } from './GroupBadge'
import { RunGroupSelect } from './RunGroupSelect'
import { recommendableGroups } from './EventEvaluationCard'
import { inputClass } from './SessionEvaluationForm'
import { MAX_NAME, MAX_NOTES, NEXT_GROUPS, TDE_SKILLS, cleanEventEvaluation, isTdeEvent } from '../utils/evaluation'
import type { EventEvaluation, NextGroupId, TdeSkillId } from '../utils/evaluation'
import { driverName } from '../data/drivers'
import type { Driver } from '../data/drivers'
import type { EventConfig, RunGroupConfig } from '../types'

/** What the form holds: every field as typed, numbers too. */
interface Draft {
  instructor: string
  car: string
  next: Record<NextGroupId, string>
  skills: Record<TdeSkillId, string>
  aggressivenessIsSkill: boolean | null
  carAidsPct: string
  notes: string
}

function draftFrom(e: EventEvaluation | undefined): Draft {
  const pct = (n: number | undefined) => (n === undefined ? '' : String(n))
  return {
    instructor: e?.instructor ?? '',
    car: e?.car ?? '',
    next: Object.fromEntries(NEXT_GROUPS.map(g => [g.id, e?.next?.[g.id] ?? ''])) as Record<NextGroupId, string>,
    skills: Object.fromEntries(TDE_SKILLS.map(s => [s.id, pct(e?.skills?.[s.id])])) as Record<TdeSkillId, string>,
    aggressivenessIsSkill: e?.aggressivenessIsSkill ?? null,
    carAidsPct: pct(e?.carAidsPct),
    notes: e?.notes ?? '',
  }
}

const number = (t: string) => (t.trim() === '' ? undefined : Number(t))

function toEvaluation(d: Draft): unknown {
  return {
    instructor: d.instructor,
    car: d.car,
    next: d.next,
    skills: Object.fromEntries(TDE_SKILLS.map(s => [s.id, number(d.skills[s.id])])),
    aggressivenessIsSkill: d.aggressivenessIsSkill ?? undefined,
    carAidsPct: number(d.carAidsPct),
    notes: d.notes,
  }
}

/** A percentage as typed: digits only, at most 100. */
function pctInput(t: string): string {
  const digits = t.replace(/\D/g, '').slice(0, 3)
  return digits === '' ? '' : String(Math.min(100, Number(digits)))
}

const label = 'text-xs font-medium text-gray-700'
const sectionHead = 'mt-6 text-sm font-semibold text-gray-900'
const pctClass = 'w-14 rounded-lg border border-gray-300 px-2 py-1 text-right text-base font-semibold tabular-nums text-gray-900 placeholder:font-normal placeholder:text-gray-300 focus:border-gray-900 focus:outline-none sm:text-sm'

/** A line item: what it is, and its answer on the right — as on the report card. */
function Row({ label: text, id, htmlFor, children }: { label: string; id?: string; htmlFor?: string; children: ReactNode }) {
  const Label = htmlFor ? 'label' : 'span'
  return (
    <div className="flex min-h-12 items-center justify-between gap-3 border-b border-gray-100 py-2 last:border-b-0">
      <Label id={id} htmlFor={htmlFor} className="text-sm text-gray-900">{text}</Label>
      {children}
    </div>
  )
}

/**
 * The instructor's evaluation of the whole event (#340): who they were and
 * their notes. On a TDE event, it's filled in from their paper report card,
 * which also has the car, the run group they recommend next and a score for
 * each core skill. Everything's optional; save what the card has. The group
 * they drove in is the event's, shown to confirm, not picked here.
 */
export function EventEvaluationSheet({ event, events, existing, runGroup, driver = null, onSave, onRemove, onClose }: {
  /** A TDE event (isTdeEvent) gets the report card's fields. */
  event: EventConfig
  /** Every event, to color the groups as the app does. */
  events: EventConfig[]
  existing?: EventEvaluation
  /** The group they drove in at this event, if the app knows it. */
  runGroup?: RunGroupConfig | null
  /** Whose: another driver's, for an admin (#288); null for your own. */
  driver?: Driver | null
  onSave: (evaluation: EventEvaluation) => Promise<void>
  onRemove: () => Promise<void>
  onClose: () => void
}) {
  const [draft, setDraft] = useState(() => draftFrom(existing))
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()
  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))

  const tde = isTdeEvent(event)
  const groups = recommendableGroups(event, events)
  const cleaned = cleanEventEvaluation(toEvaluation(draft))

  async function run(what: 'saving' | 'removing', action: () => Promise<void>) {
    setBusy(what)
    setFailure(null)
    try {
      await action()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  return (
    <Sheet
      label="Instructor evaluation"
      busy={!!busy}
      onClose={onClose}
      data-evaluation-sheet
      heading={<>
        <p className="text-xs text-gray-500">{event.name}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">Instructor evaluation</h2>
      </>}
    >
      <label htmlFor={`${id}-instructor`} className={`mt-4 ${label}`}>Instructor</label>
      <input
        id={`${id}-instructor`}
        value={draft.instructor}
        onChange={e => set({ instructor: e.target.value })}
        maxLength={MAX_NAME}
        autoComplete="off"
        placeholder="Their name"
        className={inputClass}
      />

      {/* The rest of TDE's paper report card. */}
      {tde && (<>
        <label htmlFor={`${id}-car`} className={`mt-4 ${label}`}>Car</label>
        <input
          id={`${id}-car`}
          value={draft.car}
          onChange={e => set({ car: e.target.value })}
          maxLength={MAX_NAME}
          autoComplete="off"
          placeholder="Make and model"
          className={inputClass}
        />

        <div className="mt-3">
          <Row label={driver ? `${driverName(driver)} drove in` : 'You drove in'}>
            {runGroup
              ? <GroupBadge group={runGroup} size="sm" />
              : <span className="text-right text-xs text-gray-500">Answer “Did you drive?” at the top</span>}
          </Row>
        </div>

        <h3 className={sectionHead}>Recommended run group</h3>
        <div className="mt-1">
          {NEXT_GROUPS.map(g => {
            const picked = groups.find(group => group.label.toLowerCase() === draft.next[g.id].toLowerCase())
            return (
              <Row key={g.id} label={g.label}>
                <RunGroupSelect
                  groups={groups}
                  value={picked?.id ?? null}
                  onChange={groupId => set({ next: { ...draft.next, [g.id]: groups.find(group => group.id === groupId)?.label ?? '' } })}
                  label={g.label}
                />
              </Row>
            )
          })}
        </div>

        <h3 className={sectionHead}>Core skills</h3>
        {/* Each skill over its bar, the score beside the bar it goes with. */}
        <ul className="mt-3 flex flex-col gap-4">
          {TDE_SKILLS.map(s => {
            const value = draft.skills[s.id]
            return (
              <li key={s.id}>
                <label htmlFor={`${id}-skill-${s.id}`} className="text-sm text-gray-900">{s.label}</label>
                <div className="mt-1 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-gray-100" aria-hidden="true">
                    <div className="h-full rounded-full bg-gray-900 transition-[width]" style={{ width: `${value === '' ? 0 : Number(value)}%` }} />
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-sm text-gray-500">
                    <input
                      id={`${id}-skill-${s.id}`}
                      value={value}
                      onChange={e => set({ skills: { ...draft.skills, [s.id]: pctInput(e.target.value) } })}
                      inputMode="numeric"
                      placeholder="—"
                      className={pctClass}
                    />
                    %
                  </span>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-3">
          <Row label="Aggressiveness = skill" id={`${id}-aggr`}>
            <div className="flex shrink-0 rounded-lg bg-gray-100 p-0.5" role="group" aria-labelledby={`${id}-aggr`}>
              {([true, false] as const).map(v => (
                <button
                  key={String(v)}
                  // Tapped again, it's unanswered: not every card says.
                  onClick={() => set({ aggressivenessIsSkill: draft.aggressivenessIsSkill === v ? null : v })}
                  aria-pressed={draft.aggressivenessIsSkill === v}
                  className={`rounded-md px-3.5 py-1 text-sm font-medium ${draft.aggressivenessIsSkill === v ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
                >
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Car aids over activated" htmlFor={`${id}-aids`}>
            <span className="flex shrink-0 items-center gap-1 text-sm text-gray-500">
              <input
                id={`${id}-aids`}
                value={draft.carAidsPct}
                onChange={e => set({ carAidsPct: pctInput(e.target.value) })}
                inputMode="numeric"
                placeholder="—"
                className={pctClass}
              />
              %
            </span>
          </Row>
        </div>
      </>)}

      <label htmlFor={`${id}-notes`} className={`${tde ? 'mt-6' : 'mt-4'} ${label}`}>Instructor notes</label>
      <textarea
        id={`${id}-notes`}
        value={draft.notes}
        onChange={e => set({ notes: e.target.value })}
        rows={6}
        maxLength={MAX_NOTES}
        placeholder="What went well, and what to work on next time…"
        className={`${inputClass} resize-y`}
      />

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          onClick={() => 'value' in cleaned && run('saving', () => onSave(cleaned.value))}
          disabled={!('value' in cleaned) || !!busy}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {busy === 'saving' ? 'Saving…' : 'Save evaluation'}
        </button>
        {existing && !confirmingRemove && (
          <button onClick={() => setConfirmingRemove(true)} disabled={!!busy} className="text-sm text-red-600 hover:text-red-700">
            Remove evaluation
          </button>
        )}
        {existing && confirmingRemove && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-700">Remove this evaluation?</span>
            <button onClick={() => run('removing', onRemove)} disabled={!!busy} className="font-semibold text-red-600 hover:text-red-700">
              {busy === 'removing' ? 'Removing…' : 'Remove'}
            </button>
            <button onClick={() => setConfirmingRemove(false)} disabled={!!busy} className="text-gray-500 hover:text-gray-700">
              Keep
            </button>
          </div>
        )}
        <p className="flex items-center gap-1 text-[11px] text-gray-400">
          <Lock size={11} aria-hidden="true" />
          {driver ? `Only ${driverName(driver)} and admins can see these notes.` : 'Only you and admins can see your notes.'}
        </p>
      </div>
    </Sheet>
  )
}
