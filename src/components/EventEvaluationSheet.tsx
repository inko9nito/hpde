import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ChevronRight, ImagePlus, LoaderCircle, Rows2 } from 'lucide-react'
import { PushPage } from './PushPage'
import { PageHeader } from './PageHeader'
import { GroupBadge } from './GroupBadge'
import { RunGroupSelect } from './RunGroupSelect'
import { ReportCardSwitch } from './ReportCardSwitch'
import { recommendableGroups } from './EventEvaluationCard'
import { inputClass } from './SessionEvaluationForm'
import { ScreenshotViewer } from './LapImportPage'
import { ScreenshotSplitView } from './ScreenshotSplitView'
import type { Shot } from './ScreenshotSplitView'
import { MAX_EVALUATION_SCREENSHOTS } from '../data/evaluationImport'
import {
  INSTRUCTED, MAX_NAME, MAX_NOTES, NEXT_GROUPS, NEXT_HOW, TDE_CARDS,
  cardById, cardForGroup, cardOf, cleanEventEvaluation, isTdeEvent,
} from '../utils/evaluation'
import type { CardId, EventEvaluation, Instructed, NextGroupId, NextHow } from '../utils/evaluation'
import type { EventConfig, RunGroupConfig } from '../types'

/** What the form holds: every field as typed, numbers too. */
export interface Draft {
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

export function draftFrom(e: EventEvaluation | undefined, card: CardId): Draft {
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

/**
 * The draft with what was read off a screenshot filled in (#483): on the
 * card it was read off, if that's known, and each field the screenshot
 * answers; the rest left as they were. A recommended group read comes with
 * its how and its "or", or none.
 */
export function fillDraft(d: Draft, read: EventEvaluation): Draft {
  const r = draftFrom(read, read.card ?? d.card)
  const has = <K extends keyof EventEvaluation>(k: K) => read[k] !== undefined
  return {
    card: r.card,
    instructor: has('instructor') ? r.instructor : d.instructor,
    instructed: has('instructed') ? r.instructed : d.instructed,
    car: has('car') ? r.car : d.car,
    escTc: has('escTc') ? r.escTc : d.escTc,
    next: byLine(id => (read.next?.[id] ? r.next[id] : d.next[id])),
    nextHow: byLine(id => (read.next?.[id] ? r.nextHow[id] : d.nextHow[id])),
    nextOr: byLine(id => (read.next?.[id] ? r.nextOr[id] : d.nextOr[id])),
    skills: Object.fromEntries(Object.entries(d.skills).map(([id, v]) => [id, read.skills?.[id] !== undefined ? r.skills[id] : v])),
    aggressivenessIsSkill: has('aggressivenessIsSkill') ? r.aggressivenessIsSkill : d.aggressivenessIsSkill,
    carAidsPct: has('carAidsPct') ? r.carAidsPct : d.carAidsPct,
    soloQualified: has('soloQualified') ? r.soloQualified : d.soloQualified,
    notes: has('notes') ? r.notes : d.notes,
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
export function EventEvaluationSheet({ event, events, existing, runGroup, lastCard, readScreenshots, onSave, onRemove, onClosed }: {
  /** A TDE event (isTdeEvent) gets the report card's fields. */
  event: EventConfig
  /** Every event, to color the groups as the app does. */
  events: EventConfig[]
  existing?: EventEvaluation
  /** The group they drove in at this event, if the app knows it. */
  runGroup?: RunGroupConfig | null
  /** The card their latest TDE evaluation elsewhere was on, once it's known. */
  lastCard?: CardId
  /** Reads a report card off its screenshots (#483); none, and the form's only typed in. */
  readScreenshots?: (files: File[]) => Promise<EventEvaluation>
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
  // The screenshots it was imported from (#483), and whether they're beside the form, in Split View.
  const [shots, setShots] = useState<Shot[]>([])
  const [split, setSplit] = useState(false)
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
    <PushPage open={open} onExited={onClosed} onDismiss={close} raised from="bottom" sheet>
      {/* On its way out once closed: gone to a screen reader, and to taps. */}
      {/* In Split View, as tall as the sheet: the screenshots and the form scroll each on its own. */}
      <div role="dialog" aria-label="Instructor evaluation" aria-hidden={!open || undefined} inert={!open || undefined} className={split && shots.length > 0 ? 'flex h-full flex-col bg-white' : 'min-h-full bg-white'} data-evaluation-sheet>
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
      <ScreenshotSplitView on={split && shots.length > 0} shots={shots} onClose={() => setSplit(false)}>{form()}</ScreenshotSplitView>
      </div>
    </PushPage>,
    document.body,
  )

  function form() {
    return (
      <div className="mx-auto flex max-w-lg flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-1 [&>*]:shrink-0">
      {/* Imported from screenshots of the card (#483). */}
      {tde && readScreenshots && (
        <ScreenshotFill
          read={readScreenshots}
          disabled={!!busy}
          shots={shots}
          onShots={setShots}
          split={split}
          onSplit={setSplit}
          onRead={read => {
            if (read.card) setCardPicked(true)
            setDraft(d => fillDraft(d, read))
            setConfirmingRemove(false)
          }}
        />
      )}

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
      </div>
      </div>
    )
  }
}

/**
 * Fills the form in from screenshots of the report card (#483), as it's
 * emailed: one, or up to three of a long one, read together. While they're
 * read, and after, they're shown small — tap one for full size, or once
 * read, to see them beside the form in Split View and check one against
 * the other. Nothing's saved till Save.
 */
function ScreenshotFill({ read, disabled, shots, onShots, split, onSplit, onRead }: {
  read: (files: File[]) => Promise<EventEvaluation>
  disabled: boolean
  /** The screenshots picked; held by the sheet, for Split View. Their URLs are let go here. */
  shots: Shot[]
  onShots: (shots: Shot[]) => void
  split: boolean
  onSplit: (on: boolean) => void
  onRead: (evaluation: EventEvaluation) => void
}) {
  const [status, setStatus] = useState<'idle' | 'reading' | 'read' | 'failed'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [shown, setShown] = useState<Shot | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  // Which pick is being read: a newer one's answer is the one that counts.
  const pick = useRef(0)
  const urls = useRef<string[]>([])
  useEffect(() => () => {
    pick.current = -1
    urls.current.forEach(url => URL.revokeObjectURL(url))
  }, [])

  async function choose(list: FileList | null) {
    const files = [...list ?? []]
    if (!files.length) return
    if (files.length > MAX_EVALUATION_SCREENSHOTS) {
      setError(`Pick up to ${MAX_EVALUATION_SCREENSHOTS} screenshots of one evaluation.`)
      setStatus('failed')
      return
    }
    urls.current.forEach(url => URL.revokeObjectURL(url))
    const next = files.map(file => ({ url: URL.createObjectURL(file), name: file.name }))
    urls.current = next.map(s => s.url)
    onShots(next)
    setStatus('reading')
    setError(null)
    const mine = ++pick.current
    try {
      const evaluation = await read(files)
      if (pick.current !== mine) return
      onRead(evaluation)
      setStatus('read')
    } catch (err) {
      if (pick.current !== mine) return
      setError((err as Error).message)
      setStatus('failed')
    }
  }

  const input = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      multiple
      className="sr-only"
      tabIndex={-1}
      aria-hidden="true"
      data-evaluation-import-files
      onChange={e => { choose(e.target.files); e.target.value = '' }}
    />
  )
  const pickAgain = () => inputRef.current?.click()

  if (status === 'idle') {
    return (
      <div className="mt-3">
        {input}
        <button
          type="button"
          onClick={pickAgain}
          disabled={disabled}
          className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-3 text-left transition-colors hover:bg-gray-50"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
            <ImagePlus size={18} aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-gray-900">Import from a screenshot</span>
            <span className="mt-0.5 block text-xs text-gray-500">Of your report card as it was sent to you. A long one can take up to {MAX_EVALUATION_SCREENSHOTS}.</span>
          </span>
          <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
        </button>
      </div>
    )
  }

  return (
    <section aria-label="Import from a screenshot" aria-busy={status === 'reading' || undefined} className="mt-3 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-3" data-evaluation-import>
      {input}
      {shots.length > 0 && (
        <div className="flex shrink-0 gap-1.5">
          {shots.map(shot => (
            <button
              key={shot.url}
              type="button"
              // Read, they open beside the form; else full size.
              onClick={() => (status === 'read' ? onSplit(true) : setShown(shot))}
              aria-label={status === 'read' ? `Compare ${shot.name} in Split View` : `Show ${shot.name}`}
              className="h-20 w-12 overflow-hidden rounded-md border border-gray-200 bg-white"
            >
              <img src={shot.url} alt="" className={`h-full w-full object-cover object-top ${status === 'reading' ? 'opacity-60' : ''}`} />
            </button>
          ))}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col items-start text-sm" aria-live="polite">
        {status === 'reading' && (
          <p className="flex items-center gap-2 text-gray-700">
            <LoaderCircle size={16} className="shrink-0 animate-spin text-gray-400" aria-hidden="true" />
            Reading your report card…
          </p>
        )}
        {status === 'read' && (
          <>
            <p className="font-semibold text-gray-900" data-evaluation-import-done>Imported from your screenshot.</p>
            <button
              type="button"
              onClick={() => onSplit(!split)}
              aria-pressed={split}
              className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              <Rows2 size={15} aria-hidden="true" />
              {split ? 'Close Split View' : 'Compare in Split View'}
            </button>
          </>
        )}
        {status === 'failed' && <p role="alert" className="text-red-700">{error}</p>}
        {status !== 'reading' && (
          <button type="button" onClick={pickAgain} disabled={disabled} className="mt-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-300">
            {status === 'read' ? 'Use another screenshot' : 'Try another screenshot'}
          </button>
        )}
      </div>
      {shown && <ScreenshotViewer url={shown.url} name={shown.name} onClose={() => setShown(null)} />}
    </section>
  )
}
