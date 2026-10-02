import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Lock } from 'lucide-react'
import { PushPage } from './PushPage'
import { PageHeader } from './PageHeader'
import { GroupBadge } from './GroupBadge'
import { RunGroupSelect } from './RunGroupSelect'
import { ReportCardSwitch } from './ReportCardSwitch'
import { recommendableGroups } from './EventEvaluationCard'
import { inputClass } from './SessionEvaluationForm'
import {
  INSTRUCTED, MAX_NAME, MAX_NOTES, NEXT_GROUPS, NEXT_HOW, TDE_CARDS,
  cardById, cardForGroup, cardOf, cleanEventEvaluation, isTdeEvent,
} from '../utils/evaluation'
import type { CardId, EventEvaluation, Instructed, NextGroupId, NextHow } from '../utils/evaluation'
import type { EventConfig, RunGroupConfig } from '../types'

/** What the form holds: every field as typed, numbers too. */
interface Draft {
  card: CardId
  instructor: string
  instructed: Instructed | null
  car: string
  escTc: string
  next: Record<NextGroupId, string>
  nextHow: Record<NextGroupId, NextHow | ''>
  nextOr: Record<NextGroupId, string>
  /** Every card's skills, by id, so a score carries over to the other card's skill of the same id. */
  skills: Record<string, string>
  aggressivenessIsSkill: boolean | 'tooAggressive' | null
  carAidsPct: string
  soloQualified: boolean | null
  notes: string
}

const byLine = <T,>(value: (id: NextGroupId) => T) =>
  Object.fromEntries(NEXT_GROUPS.map(g => [g.id, value(g.id)])) as Record<NextGroupId, T>

function draftFrom(e: EventEvaluation | undefined, card: CardId): Draft {
  const pct = (n: number | undefined) => (n === undefined ? '' : String(n))
  const skillIds = [...new Set(TDE_CARDS.flatMap(c => c.skills.map(s => s.id)))]
  return {
    card,
    instructor: e?.instructor ?? '',
    instructed: e?.instructed ?? null,
    car: e?.car ?? '',
    escTc: e?.escTc ?? '',
    next: byLine(id => e?.next?.[id] ?? ''),
    nextHow: byLine(id => e?.nextHow?.[id] ?? ''),
    nextOr: byLine(id => e?.nextOr?.[id] ?? ''),
    skills: Object.fromEntries(skillIds.map(id => [id, pct(e?.skills?.[id])])),
    aggressivenessIsSkill: e?.aggressivenessIsSkill ?? null,
    carAidsPct: pct(e?.carAidsPct),
    soloQualified: e?.soloQualified ?? null,
    notes: e?.notes ?? '',
  }
}

const number = (t: string) => (t.trim() === '' ? undefined : Number(t))

/** The evaluation the draft makes on its card: what that card doesn't have is left for cleanEventEvaluation to drop. */
function toEvaluation(d: Draft): unknown {
  const card = cardById(d.card)
  return {
    card: d.card,
    instructor: d.instructor,
    instructed: d.instructed ?? undefined,
    car: d.car,
    escTc: d.escTc,
    next: d.next,
    nextHow: d.nextHow,
    nextOr: d.nextOr,
    skills: Object.fromEntries(card.skills.map(s => [s.id, number(d.skills[s.id] ?? '')])),
    // "Too aggressive" is only some cards' answer: on another, unanswered.
    aggressivenessIsSkill: d.aggressivenessIsSkill === 'tooAggressive' && !card.has.tooAggressive ? undefined : d.aggressivenessIsSkill ?? undefined,
    carAidsPct: number(d.carAidsPct),
    soloQualified: d.soloQualified ?? undefined,
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
const selectClass = 'rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-base text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none sm:text-sm'

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

/** One of a few answers, as a segmented control; tapped again, it's unanswered — not every card says. */
function Choice<T extends string | boolean>({ options, value, onChange, labelledBy }: {
  options: readonly { value: T; label: string }[]
  value: T | null
  onChange: (v: T | null) => void
  labelledBy: string
}) {
  return (
    <div className="flex shrink-0 rounded-lg bg-gray-100 p-0.5" role="group" aria-labelledby={labelledBy}>
      {options.map(o => (
        <button
          key={String(o.value)}
          type="button"
          onClick={() => onChange(value === o.value ? null : o.value)}
          aria-pressed={value === o.value}
          className={`whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ${value === o.value ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

const YES_NO = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }] as const

/**
 * The instructor's evaluation of the whole event (#340): who they were and
 * their notes. On a TDE event, it's filled in from their paper report card,
 * which also has the car, the run group they recommend next and a score for
 * each core skill — and each run group has a card of its own (#350), so the
 * form shows the one picked at the top: the card it was saved on, else the
 * card for the group they drove in, else the one their latest evaluation
 * was on. Everything's optional; save what the card has. The group they
 * drove in is the event's, shown to confirm, not picked here.
 *
 * A page sheet, with Cancel and Save across its top (#415).
 */
export function EventEvaluationSheet({ event, events, existing, runGroup, lastCard, onSave, onRemove, onClosed }: {
  /** A TDE event (isTdeEvent) gets the report card's fields. */
  event: EventConfig
  /** Every event, to color the groups as the app does. */
  events: EventConfig[]
  existing?: EventEvaluation
  /** The group they drove in at this event, if the app knows it. */
  runGroup?: RunGroupConfig | null
  /** The card their latest TDE evaluation elsewhere was on, once it's known. */
  lastCard?: CardId
  /** Saves it, throwing with a message to show; the page then slides away. */
  onSave: (evaluation: EventEvaluation) => Promise<void>
  /** Removes it, likewise. */
  onRemove: () => Promise<void>
  /** Once it's slid away. */
  onClosed: () => void
}) {
  const [open, setOpen] = useState(true)
  const groupCard = cardForGroup(runGroup?.label)
  const [draft, setDraft] = useState(() =>
    draftFrom(existing, existing ? cardOf(existing).id : groupCard?.id ?? lastCard ?? TDE_CARDS[0].id))
  const [cardPicked, setCardPicked] = useState(false)
  const [busy, setBusy] = useState<'saving' | 'removing' | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [confirmingRemove, setConfirmingRemove] = useState(false)
  const id = useId()
  const set = (patch: Partial<Draft>) => setDraft(d => ({ ...d, ...patch }))

  // Their latest card arrives after the form opens: it's the one to start
  // on, unless something else already says which.
  useEffect(() => {
    if (existing || groupCard || cardPicked || !lastCard) return
    setDraft(d => ({ ...d, card: lastCard }))
  }, [existing, groupCard, cardPicked, lastCard])

  const tde = isTdeEvent(event)
  const card = cardById(draft.card)
  const groups = recommendableGroups(event, events)
  const cleaned = cleanEventEvaluation(toEvaluation(draft))
  const groupFor = (name: string) => groups.find(group => group.label.toLowerCase() === name.toLowerCase())
  const groupName = (groupId: string | null) => groups.find(group => group.id === groupId)?.label ?? ''

  const close = () => setOpen(false)
  const busyRef = useRef(busy)
  busyRef.current = busy
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !busyRef.current) setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  async function run(what: 'saving' | 'removing', action: () => Promise<void>) {
    setBusy(what)
    setFailure(null)
    try {
      await action()
      close()
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(null)
    }
  }

  return createPortal(
    <PushPage open={open} onExited={onClosed} raised from="bottom" sheet>
      {/* On its way out once closed: gone to a screen reader, and to taps. */}
      <div role="dialog" aria-label="Instructor evaluation" aria-hidden={!open || undefined} inert={!open || undefined} className="min-h-full bg-white" data-evaluation-sheet>
      <PageHeader
        title="Instructor evaluation"
        subtitle={event.name}
        onCancel={close}
        cancelDisabled={!!busy}
        save={{
          label: busy === 'saving' ? 'Saving…' : 'Save',
          disabled: !('value' in cleaned) || !!busy,
          onClick: () => { if ('value' in cleaned) run('saving', () => onSave(cleaned.value)) },
        }}
      />
      <div className="mx-auto flex max-w-lg flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-1 [&>*]:shrink-0">
      {/* Which run group's paper card it's filled in from (#350). */}
      {tde && (
        <div className="mt-3">
          <Row label="Report card" id={`${id}-card`}>
            <ReportCardSwitch
              cards={TDE_CARDS}
              value={draft.card}
              onChange={next => {
                setCardPicked(true)
                set({ card: next })
              }}
              events={events}
            />
          </Row>
        </div>
      )}

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
        {card.has.instructed && (
          <div className="mt-3">
            <Row label="Instructed" id={`${id}-instructed`}>
              <Choice
                options={INSTRUCTED.map(i => ({ value: i.id, label: i.label }))}
                value={draft.instructed}
                onChange={v => set({ instructed: v })}
                labelledBy={`${id}-instructed`}
              />
            </Row>
          </div>
        )}

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
          {card.has.escTc && (
            <Row label="ESP / traction control" htmlFor={`${id}-esc`}>
              <input
                id={`${id}-esc`}
                value={draft.escTc}
                onChange={e => set({ escTc: e.target.value })}
                maxLength={MAX_NAME}
                autoComplete="off"
                placeholder="e.g. Comp Mode"
                className="w-36 rounded-lg border border-gray-300 px-2 py-1 text-right text-base text-gray-900 placeholder:text-gray-300 focus:border-gray-900 focus:outline-none sm:text-sm"
              />
            </Row>
          )}
          <Row label="You drove in">
            {runGroup
              ? <GroupBadge group={runGroup} size="sm" />
              : <span className="text-right text-xs text-gray-500">Answer “Did you drive?” at the top</span>}
          </Row>
        </div>

        <h3 className={sectionHead}>Recommended run group</h3>
        <div className="mt-1">
          {NEXT_GROUPS.map(g => {
            const picked = groupFor(draft.next[g.id])
            const instead = groupFor(draft.nextOr[g.id])
            return (
              <div key={g.id} className="border-b border-gray-100 py-2 last:border-b-0" data-next={g.id}>
                <div className="flex min-h-8 items-center justify-between gap-3">
                  <span className="text-sm text-gray-900">{g.label}</span>
                  <RunGroupSelect
                    groups={groups}
                    value={picked?.id ?? null}
                    onChange={groupId => set({ next: { ...draft.next, [g.id]: groupName(groupId) } })}
                    label={g.label}
                  />
                </div>
                {/* Blue's card says how, and can name a second group: "Blue Part-time Solo or Yellow". */}
                {card.has.nextHow && picked && (
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <select
                      aria-label={`${g.label}: how`}
                      value={draft.nextHow[g.id]}
                      onChange={e => set({ nextHow: { ...draft.nextHow, [g.id]: e.target.value as NextHow | '' } })}
                      className={selectClass}
                    >
                      <option value="">How?</option>
                      {NEXT_HOW.map(h => <option key={h.id} value={h.id}>{h.label}</option>)}
                    </select>
                    <span className="text-xs text-gray-500">or</span>
                    <RunGroupSelect
                      groups={groups}
                      value={instead?.id ?? null}
                      onChange={groupId => set({ nextOr: { ...draft.nextOr, [g.id]: groupName(groupId) } })}
                      label={`${g.label}, or`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <h3 className={sectionHead}>Core skills</h3>
        {/* Each skill over its bar, the score beside the bar it goes with. */}
        <ul className="mt-3 flex flex-col gap-4">
          {card.skills.map(s => {
            const value = draft.skills[s.id] ?? ''
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
            <Choice
              options={card.has.tooAggressive ? [...YES_NO, { value: 'tooAggressive' as const, label: 'Too aggressive' }] : YES_NO}
              value={draft.aggressivenessIsSkill === 'tooAggressive' && !card.has.tooAggressive ? null : draft.aggressivenessIsSkill}
              onChange={v => set({ aggressivenessIsSkill: v })}
              labelledBy={`${id}-aggr`}
            />
          </Row>
          <Row label={card.carAidsLabel} htmlFor={`${id}-aids`}>
            <span className="flex shrink-0 items-center gap-1 text-sm text-gray-500">
              <input
                id={`${id}-aids`}
                value={draft.carAidsPct}
                onChange={e => set({ carAidsPct: pctInput(e.target.value) })}
                inputMode="numeric"
                placeholder={card.has.carAidsNever ? '0 = never' : '—'}
                className={card.has.carAidsNever ? `${pctClass} w-20` : pctClass}
              />
              %
            </span>
          </Row>
          {card.has.soloQualified && (
            <Row label={`${card.group} part-time solo qualified`} id={`${id}-solo`}>
              <Choice options={YES_NO} value={draft.soloQualified} onChange={v => set({ soloQualified: v })} labelledBy={`${id}-solo`} />
            </Row>
          )}
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
          Only you and admins can see your notes.
        </p>
      </div>
      </div>
      </div>
    </PushPage>,
    document.body,
  )
}
