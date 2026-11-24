import { useEffect, useId, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { ImagePlus, Trash2, X } from 'lucide-react'
import { PushPage } from './PushPage'
import { PageHeader } from './PageHeader'
import { GroupBadge } from './GroupBadge'
import { RunGroupSelect } from './RunGroupSelect'
import { groupFor } from './LapTimesSheet'
import { plural, sessionTitle } from './LapSessions'
import { inputClass } from './SessionEvaluationForm'
import { formatAmPm, formatTime } from '../utils/time'
import { formatLapTime, lapStats } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import { lapsFromRead, matchSession, minutesOff, slotsOn } from '../utils/lapImport'
import type { ImportSlot, Match, ScreenshotRead } from '../utils/lapImport'
import type { EventConfig } from '../types'

/** One screenshot on the page: being read, read, or not. */
interface Item {
  id: number
  name: string
  /** The screenshot itself, to show: an object URL, let go once it's removed. */
  url: string
  status: 'reading' | 'read' | 'failed'
  error?: string
  read?: ScreenshotRead
  /** The session the driver picked for it ('' for none); unset, it's matched. */
  pick?: string
}

/** Where each screenshot's laps go, worked out: its session, or why none. */
interface Placed {
  slot?: ImportSlot
  reason?: Exclude<Match, { slot: ImportSlot }>['reason'] | 'duplicate' | 'left-out'
}

// How many screenshots are read at once.
const AT_ONCE = 3

const REASON: Record<NonNullable<Placed['reason']>, string> = {
  'no-date': 'The screenshot shows no date. Pick the session it’s from.',
  'no-start': 'The screenshot shows no start time. Pick the session it’s from.',
  'not-this-event': 'Its date isn’t a day of this event. Pick a session, or remove it.',
  'no-session': 'None of your group’s sessions started near then. Pick the session it’s from.',
  duplicate: 'Another screenshot is already going in this session. Pick another one, or remove one.',
  'left-out': 'Left out: its laps won’t be imported.',
}

const time = (t: string) => `${formatTime(t)} ${formatAmPm(t)}`

function dayName(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

/** When the timer started against the session's time on the schedule. */
function timing(slot: ImportSlot, start: string): string {
  const off = minutesOff(slot, start)
  const at = time(slot.time)
  if (Math.abs(off) <= 2) return `On time: ${at} on the schedule`
  return off < 0 ? `${-off} min before its ${at} start` : `${off} min after its ${at} start`
}

/** In the order they were driven: by the date and start time read off them, then as added. */
function inOrder(items: Item[]): Item[] {
  // Read with a date and time first, by them; the rest after, as added.
  const when = (item: Item) => (item.read?.date && item.read.start ? `${item.read.date} ${item.read.start}` : null)
  return [...items].sort((a, b) => {
    const [x, y] = [when(a), when(b)]
    if (x !== y) return x === null ? 1 : y === null ? -1 : x < y ? -1 : 1
    return a.id - b.id
  })
}

/**
 * Where each screenshot's laps go: the session the driver picked, else the
 * one its date and start time match in their group (matchSession), in the
 * order they were driven. A session goes to one screenshot only: the
 * driver's pick, else the first matched.
 */
function place(items: Item[], event: EventConfig, group: string | null): Map<number, Placed> {
  const placed = new Map<number, Placed>()
  const taken = new Set(items.flatMap(item => (item.status === 'read' && item.pick ? [item.pick] : [])))
  const slots = new Map(event.days.flatMap(day => slotsOn(event, day.date)).map(s => [s.key, s]))
  for (const item of inOrder(items)) {
    if (item.status !== 'read') continue
    if (item.pick !== undefined) {
      const slot = slots.get(item.pick)
      placed.set(item.id, slot ? { slot } : { reason: 'left-out' })
      continue
    }
    const match = matchSession(event, item.read!, group ? [group] : [])
    if (!('slot' in match)) placed.set(item.id, { reason: match.reason })
    else if (taken.has(match.slot.key)) placed.set(item.id, { reason: 'duplicate' })
    else {
      taken.add(match.slot.key)
      placed.set(item.id, { slot: match.slot })
    }
  }
  return placed
}

/**
 * Imports laps from a lap timer's screenshots (#472), from My notes: a page
 * that slides up, as the Cancel pages do (#356). The driver's run group at
 * the top; then each screenshot, in the order they were driven, beside
 * what was read off it — its date, start time and every lap — and the
 * session on the schedule it goes in: their group's that started nearest
 * the timer, early or late, or lunch for lead-follow laps. They can pick
 * another, another group's, or none, and remove a screenshot, before
 * anything is saved. A session that already has laps says importing
 * replaces them.
 */
export function LapImportPage({ event, groups, saved, read, onImport, onClosed }: {
  event: EventConfig
  /** The driver's run groups at the event, theirs first: their answer to "Did you drive?", then their laps'. */
  groups: string[]
  saved: (key: string) => SessionLaps | undefined
  read: (file: File) => Promise<ScreenshotRead>
  /** Saves them, one session at a time. Throws with a message to show; the page then slides away. */
  onImport: (sessions: Omit<SessionLaps, 'key' | 'updatedAt'>[]) => Promise<void>
  /** Once it's slid away. */
  onClosed: () => void
}) {
  const [open, setOpen] = useState(true)
  const [items, setItems] = useState<Item[]>([])
  const [group, setGroup] = useState<string | null>(() => groups.find(g => event.runGroups.some(r => r.id === g)) ?? null)
  const [saving, setSaving] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  // The screenshot shown full size, by its id.
  const [shown, setShown] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)
  const queue = useRef<{ id: number; file: File }[]>([])
  const running = useRef(0)
  const mounted = useRef(true)
  // Every screenshot's URL, to let go of them all once the page is gone.
  const urls = useRef(new Set<string>())
  useEffect(() => () => {
    mounted.current = false
    urls.current.forEach(url => URL.revokeObjectURL(url))
  }, [])

  const close = () => setOpen(false)
  const savingRef = useRef(saving)
  savingRef.current = saving
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && !savingRef.current) setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const update = (id: number, change: (item: Item) => Item) =>
    setItems(prev => prev.map(item => (item.id === id ? change(item) : item)))

  function pump() {
    while (running.current < AT_ONCE && queue.current.length) {
      const { id, file } = queue.current.shift()!
      running.current++
      read(file)
        .then(result => { if (mounted.current) update(id, item => ({ ...item, status: 'read', read: result })) })
        .catch((err: Error) => { if (mounted.current) update(id, item => ({ ...item, status: 'failed', error: err.message })) })
        .finally(() => {
          running.current--
          if (mounted.current) pump()
        })
    }
  }

  function add(files: FileList | null) {
    if (!files?.length) return
    const added = [...files].map(file => ({ id: nextId.current++, file, url: URL.createObjectURL(file) }))
    added.forEach(({ url }) => urls.current.add(url))
    setItems(prev => [...prev, ...added.map(({ id, file, url }): Item => ({ id, name: file.name, url, status: 'reading' }))])
    queue.current.push(...added)
    setFailure(null)
    pump()
  }

  /** Takes a screenshot out: not read if it's still waiting, and its laps not imported. */
  function remove(item: Item) {
    queue.current = queue.current.filter(q => q.id !== item.id)
    setItems(prev => prev.filter(it => it.id !== item.id))
    URL.revokeObjectURL(item.url)
    urls.current.delete(item.url)
    if (shown === item.id) setShown(null)
  }

  const placed = place(items, event, group)
  const going = inOrder(items).filter(item => placed.get(item.id)?.slot)
  const reading = items.filter(item => item.status === 'reading').length
  const shownItem = items.find(item => item.id === shown)

  async function save() {
    setSaving(true)
    setFailure(null)
    try {
      await onImport(going.map(item => {
        const { key: _key, ...slot } = placed.get(item.id)!.slot!
        return { ...slot, laps: lapsFromRead(item.read!.laps) }
      }))
      close()
    } catch (err) {
      setFailure((err as Error).message)
      setSaving(false)
    }
  }

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept="image/*"
      multiple
      className="sr-only"
      tabIndex={-1}
      aria-hidden="true"
      data-lap-import-files
      onChange={e => { add(e.target.files); e.target.value = '' }}
    />
  )

  return createPortal(
    <PushPage open={open} onExited={onClosed} onDismiss={close} raised from="bottom" sheet>
      {/* On its way out once closed: gone to a screen reader, and to taps. */}
      <div role="dialog" aria-label="Import laps" aria-hidden={!open || undefined} inert={!open || undefined} className="min-h-full bg-gray-50" data-lap-import>
        <PageHeader
          title="Import laps"
          subtitle={event.name}
          onCancel={close}
          cancelDisabled={saving}
          save={{
            label: saving ? 'Importing…' : 'Import',
            disabled: !going.length || reading > 0 || saving,
            onClick: save,
          }}
        />
        <div className="mx-auto flex max-w-lg flex-col px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-4 [&>*]:shrink-0">
          {fileInput}
          <section className="rounded-2xl border border-gray-200 bg-white p-4" aria-label="Your run group">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-gray-900">Your run group</p>
              <RunGroupSelect groups={event.runGroups} value={group} onChange={setGroup} label="Your run group" />
            </div>
            <p className="mt-1.5 text-xs text-gray-500">
              Each screenshot goes in this group’s session that started nearest the time on it, even one let out early or late, or lunch for lead-follow laps.
            </p>
          </section>

          {items.length === 0 ? (
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-4 flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <ImagePlus size={24} className="text-gray-400" aria-hidden="true" />
              Choose screenshots
              <span className="max-w-xs text-xs font-normal text-gray-500">
                Your lap timer’s lap table for each session, with its date and start time. Pick as many as you like.
              </span>
            </button>
          ) : (
            <>
              <p className="mt-5 px-1 text-xs font-medium text-gray-500" aria-live="polite" data-import-summary>
                {reading
                  ? `Reading ${plural(reading, 'screenshot', 'screenshots')}…`
                  : `${plural(going.length, 'session', 'sessions')} to import, from ${plural(items.length, 'screenshot', 'screenshots')}`}
              </p>
              <ol className="mt-2 flex flex-col gap-4" aria-label="Screenshots">
                {inOrder(items).map(item => (
                  <ImportCard
                    key={item.id}
                    item={item}
                    placed={placed.get(item.id)}
                    event={event}
                    group={group}
                    saved={saved}
                    taken={key => going.some(other => other.id !== item.id && placed.get(other.id)?.slot?.key === key)}
                    onPick={pick => update(item.id, it => ({ ...it, pick }))}
                    onShow={() => setShown(item.id)}
                    onRemove={() => remove(item)}
                    disabled={saving}
                  />
                ))}
              </ol>
              <button
                onClick={() => inputRef.current?.click()}
                disabled={saving}
                className="mt-4 flex items-center justify-center gap-1.5 self-center text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-300"
              >
                <ImagePlus size={16} aria-hidden="true" />
                Add more screenshots
              </button>
            </>
          )}

          {failure && <p role="alert" className="mt-4 text-sm text-red-700">{failure}</p>}
        </div>
      </div>
      {shownItem && <ScreenshotViewer url={shownItem.url} name={shownItem.name} onClose={() => setShown(null)} />}
    </PushPage>,
    document.body,
  )
}

/**
 * One screenshot, beside what was read off it, and the session on the
 * schedule its laps go in.
 */
function ImportCard({ item, placed, event, group, saved, taken, onPick, onShow, onRemove, disabled }: {
  item: Item
  placed?: Placed
  event: EventConfig
  group: string | null
  saved: (key: string) => SessionLaps | undefined
  /** Whether another screenshot is going in that session. */
  taken: (key: string) => boolean
  onPick: (key: string) => void
  onShow: () => void
  onRemove: () => void
  disabled: boolean
}) {
  const selectId = useId()
  const read = item.read
  const slot = placed?.slot
  const existing = slot && saved(slot.key)
  const laps = read ? lapsFromRead(read.laps) : []
  const { best } = lapStats(laps)

  const heading = slot
    ? <>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium text-gray-500">{dayName(slot.date)}</span>
          <span className="block truncate text-base font-semibold text-gray-900">{sessionTitle(slot)} · {time(slot.time)}</span>
        </span>
        <GroupBadge group={groupFor(slot.group, event.runGroups)} size="sm" />
      </>
    : <span className="min-w-0 flex-1 truncate text-base font-semibold text-gray-500">
        {item.status === 'reading' ? 'Reading…' : item.status === 'failed' ? 'Couldn’t read it' : 'Not imported'}
      </span>

  return (
    <li className={`overflow-hidden rounded-2xl border bg-white ${slot ? 'border-gray-200' : 'border-dashed border-gray-300'}`} aria-label={item.name} aria-busy={item.status === 'reading' || undefined} data-import-card>
      <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2.5">
        {heading}
        <button
          onClick={onRemove}
          disabled={disabled}
          aria-label={`Remove ${item.name}`}
          className="-mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex gap-3 p-3">
        {/* The screenshot, to check what was read against: tap for full size. */}
        <button onClick={onShow} aria-label={`Show ${item.name}`} className="w-[42%] shrink-0 self-start overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
          {/* Its top, where a lap timer has the date, time and laps: no taller than a phone's half. */}
          <img src={item.url} alt="" className={`block max-h-[22rem] w-full object-cover object-top ${item.status === 'reading' ? 'opacity-60' : ''}`} />
        </button>
        <div className="min-w-0 flex-1 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Read from it</p>
          {item.status === 'reading' && <p className="mt-1 text-gray-500">Reading the laps…</p>}
          {item.status === 'failed' && <p className="mt-1 text-red-700">{item.error}</p>}
          {read && (
            <>
              <p className="mt-1 font-medium text-gray-900">{read.date ? dayName(read.date) : 'No date'}</p>
              <p className="text-gray-700">{read.start ? `Started ${time(read.start)}` : 'No start time'}</p>
              {slot && read.start && <p className="mt-0.5 text-xs text-gray-500" data-timing>{timing(slot, read.start)}</p>}
              <ol className="mt-2 flex flex-col gap-0.5 tabular-nums" aria-label="Laps read">
                {laps.map((lap, i) => (
                  <li key={i} className={`flex justify-between gap-2 ${lap.kind ? 'text-gray-400' : 'text-gray-900'}`}>
                    <span className="text-gray-400">{i + 1}</span>
                    <span>
                      {formatLapTime(lap.ms, 2)}
                      {lap.kind && <span className="ml-1 text-[11px]">left out</span>}
                    </span>
                  </li>
                ))}
              </ol>
              {best !== undefined && <p className="mt-1.5 text-xs text-gray-500">Best {formatLapTime(best, 2)} · {plural(lapStats(laps).count, 'lap', 'laps')}</p>}
            </>
          )}
        </div>
      </div>

      {read && (
        <div className="border-t border-gray-100 px-3 pb-3 pt-2.5">
          {placed?.reason && <p className="mb-2 text-xs text-gray-600">{REASON[placed.reason]}</p>}
          {existing && (
            <p className="mb-2 text-xs text-amber-700">
              This session already has {plural(existing.laps.length, 'lap', 'laps')} saved: importing replaces them.
            </p>
          )}
          <label htmlFor={selectId} className="text-xs font-medium text-gray-700">Goes in</label>
          <SessionSelect id={selectId} event={event} group={group} date={read.date} value={slot?.key ?? ''} taken={taken} onChange={onPick} disabled={disabled} />
        </div>
      )}
    </li>
  )
}

/**
 * The session a screenshot goes in: their group's on its day first —
 * sessions and lunch — then their group's other days, then the other
 * groups' sessions that day.
 */
function SessionSelect({ id, event, group, date, value, taken, onChange, disabled }: {
  id: string
  event: EventConfig
  group: string | null
  date?: string
  value: string
  taken: (key: string) => boolean
  onChange: (key: string) => void
  disabled: boolean
}) {
  const days = event.days.map(d => d.date)
  const day = date && days.includes(date) ? date : null
  const mine = (s: ImportSlot) => group === null || s.group === group
  const groupLabel = (g: string) => groupFor(g, event.runGroups).label
  const option = (s: ImportSlot, withDay: boolean, withGroup: boolean) => (
    <option key={s.key} value={s.key} disabled={s.key !== value && taken(s.key)}>
      {[withDay ? dayName(s.date) : null, sessionTitle(s), time(s.time), withGroup ? groupLabel(s.group) : null].filter(Boolean).join(' · ')}
    </option>
  )
  const sections: { label: string; options: ReactElement[] }[] = []
  for (const d of day ? [day, ...days.filter(x => x !== day)] : days) {
    const slots = slotsOn(event, d).filter(mine)
    if (!slots.length) continue
    const head = group ? `${groupLabel(group)} · ${dayName(d)}` : dayName(d)
    sections.push({ label: head, options: slots.map(s => option(s, d !== day, group === null)) })
  }
  if (group && day) {
    const others = slotsOn(event, day).filter(s => s.group !== group && !s.label)
    if (others.length) sections.push({ label: `Other groups · ${dayName(day)}`, options: others.map(s => option(s, false, true)) })
  }
  return (
    <select id={id} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} className={`${inputClass} mt-1 py-2 text-sm`}>
      <option value="">Don’t import</option>
      {sections.map(section => <optgroup key={section.label} label={section.label}>{section.options}</optgroup>)}
    </select>
  )
}

/**
 * A screenshot full size, over everything: to check what was read off it.
 * A tap anywhere, ✕ or Escape closes it — Escape not the page under it too.
 */
export function ScreenshotViewer({ url, name, onClose }: { url: string; name: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const latest = useRef(onClose)
  latest.current = onClose
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      latest.current()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 pt-[max(3.5rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      data-screenshot-viewer
    >
      <img src={url} alt={name} className="max-h-full max-w-full rounded-lg object-contain" />
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-[max(0.75rem,env(safe-area-inset-top))] grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
      >
        <X size={18} strokeWidth={2.5} />
      </button>
    </div>,
    document.body,
  )
}
