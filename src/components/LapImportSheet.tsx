import { useEffect, useId, useRef, useState } from 'react'
import { ImagePlus } from 'lucide-react'
import { Sheet } from './Sheet'
import { GroupBadge } from './GroupBadge'
import { groupFor, shortDate } from './LapTimesSheet'
import { plural, sessionTitle } from './LapSessions'
import { inputClass } from './SessionEvaluationForm'
import { formatAmPm, formatTime } from '../utils/time'
import { formatLapTime, lapStats } from '../utils/lapTimes'
import type { SessionLaps } from '../utils/lapTimes'
import { lapsFromRead, matchSession, slotsOn } from '../utils/lapImport'
import type { ImportSlot, Match, ScreenshotRead } from '../utils/lapImport'
import type { EventConfig } from '../types'

/** One screenshot in the sheet: being read, read, or not. */
interface Item {
  id: number
  name: string
  status: 'reading' | 'read' | 'failed'
  error?: string
  read?: ScreenshotRead
  /** Why it matched no session, when it didn't. */
  reason?: Exclude<Match, { slot: ImportSlot }>['reason']
  /** Its session was another screenshot's already. */
  duplicate?: boolean
  /** The session its laps go in; '' for none — left out. */
  slotKey: string
}

// How many screenshots are read at once.
const AT_ONCE = 3

const REASON: Record<NonNullable<Item['reason']>, string> = {
  'no-date': 'The screenshot shows no date. Pick its session.',
  'no-start': 'The screenshot shows no start time. Pick its session.',
  'not-this-event': 'Its date isn’t a day of this event.',
  'no-session': 'No session was on track then. Lead-follow or lunch laps? Pick a session to keep them anyway.',
}

const time = (t: string) => `${formatTime(t)} ${formatAmPm(t)}`

/**
 * Imports laps from a lap timer's screenshots (#472): any number at once,
 * from My notes. Each is read (see useScreenshotReader), matched to the
 * session on track when the timer started (matchSession), and listed for
 * the driver to check — its laps, and its session, which they can change
 * or leave out — before anything is saved. A session that already has
 * laps is marked: importing replaces them.
 */
export function LapImportSheet({ event, groups, saved, showDate, read, onImport, onClose }: {
  event: EventConfig
  /** The driver's run groups at the event, to match a shared session line by. */
  groups: string[]
  saved: (key: string) => SessionLaps | undefined
  /** Show the day too — the event runs more than one. */
  showDate: boolean
  read: (file: File) => Promise<ScreenshotRead>
  /** Saves them, one session at a time. Throws with a message to show. */
  onImport: (sessions: Omit<SessionLaps, 'key' | 'updatedAt'>[]) => Promise<void>
  onClose: () => void
}) {
  const [items, setItems] = useState<Item[]>([])
  const [saving, setSaving] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(0)
  const queue = useRef<{ id: number; file: File }[]>([])
  const running = useRef(0)
  const mounted = useRef(true)
  useEffect(() => () => { mounted.current = false }, [])

  const update = (id: number, change: (item: Item) => Item) =>
    setItems(prev => prev.map(item => (item.id === id ? change(item) : item)))

  function pump() {
    while (running.current < AT_ONCE && queue.current.length) {
      const { id, file } = queue.current.shift()!
      running.current++
      read(file)
        .then(result => {
          if (!mounted.current) return
          const match = matchSession(event, result, groups)
          setItems(prev => {
            // A session another screenshot already has is left out of this one.
            const taken = 'slot' in match && prev.some(other => other.id !== id && other.slotKey === match.slot.key)
            return prev.map(item => (item.id !== id ? item : {
              ...item,
              status: 'read',
              read: result,
              ...('slot' in match ? { slotKey: taken ? '' : match.slot.key, duplicate: taken } : { reason: match.reason, slotKey: '' }),
            }))
          })
        })
        .catch((err: Error) => {
          if (mounted.current) update(id, item => ({ ...item, status: 'failed', error: err.message }))
        })
        .finally(() => {
          running.current--
          if (mounted.current) pump()
        })
    }
  }

  function add(files: FileList | null) {
    if (!files?.length) return
    const added = [...files].map(file => ({ id: nextId.current++, file }))
    setItems(prev => [...prev, ...added.map(({ id, file }): Item => ({ id, name: file.name, status: 'reading', slotKey: '' }))])
    queue.current.push(...added)
    setFailure(null)
    pump()
  }

  const allSlots = event.days.flatMap(day => slotsOn(event, day.date))
  const slotByKey = new Map(allSlots.map(s => [s.key, s]))
  const chosen = items.filter(item => item.status === 'read' && item.slotKey)
  const reading = items.some(item => item.status === 'reading')

  async function save() {
    setSaving(true)
    setFailure(null)
    try {
      await onImport(chosen.map(item => {
        const { key: _key, ...slot } = slotByKey.get(item.slotKey)!
        return { ...slot, laps: lapsFromRead(item.read!.laps) }
      }))
    } catch (err) {
      setFailure((err as Error).message)
      setSaving(false)
    }
  }

  const choose = (
    <>
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
      <button
        onClick={() => inputRef.current?.click()}
        disabled={saving}
        className={items.length
          ? 'flex items-center justify-center gap-1.5 self-center text-sm font-medium text-blue-600 hover:text-blue-700 disabled:text-gray-300'
          : 'mt-4 flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100'}
      >
        <ImagePlus size={items.length ? 16 : 24} className={items.length ? '' : 'text-gray-400'} aria-hidden="true" />
        {items.length ? 'Add more screenshots' : 'Choose screenshots'}
      </button>
    </>
  )

  return (
    <Sheet
      label="Import laps from screenshots"
      busy={saving}
      onClose={onClose}
      data-lap-import-sheet
      heading={(
        <div>
          <h2 className="font-rubik text-lg font-semibold text-gray-900">Import laps</h2>
          <p className="mt-0.5 text-xs text-gray-500">From your lap timer’s screenshots of each session’s laps</p>
        </div>
      )}
    >
      {items.length === 0 && (
        <p className="mt-3 text-sm text-gray-600">
          Each screenshot is read for its date, start time and lap times, and matched to the session on track then.
          Check them before they’re saved.
        </p>
      )}
      {items.length > 0 && (
        <ul className="mt-4 flex flex-col gap-3" aria-label="Screenshots">
          {items.map(item => (
            <ImportRow
              key={item.id}
              item={item}
              event={event}
              showDate={showDate}
              saved={saved}
              takenBy={key => items.some(other => other.id !== item.id && other.slotKey === key)}
              slots={item.read?.date && event.days.some(d => d.date === item.read!.date) ? slotsOn(event, item.read.date) : allSlots}
              onPick={slotKey => update(item.id, it => ({ ...it, slotKey }))}
              disabled={saving}
            />
          ))}
        </ul>
      )}
      <div className="mt-4 flex flex-col">{choose}</div>

      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 pb-1">
        <button
          onClick={save}
          disabled={!chosen.length || reading || saving}
          className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
        >
          {saving ? 'Importing…' : reading ? 'Reading screenshots…' : chosen.length ? `Import ${plural(chosen.length, 'session', 'sessions')}` : 'Import'}
        </button>
      </div>
    </Sheet>
  )
}

/** One screenshot: what was read off it, and the session it goes in. */
function ImportRow({ item, event, showDate, saved, takenBy, slots, onPick, disabled }: {
  item: Item
  event: EventConfig
  showDate: boolean
  saved: (key: string) => SessionLaps | undefined
  takenBy: (key: string) => boolean
  slots: ImportSlot[]
  onPick: (slotKey: string) => void
  disabled: boolean
}) {
  const selectId = useId()
  const box = 'rounded-2xl border border-gray-200 bg-white p-3'
  if (item.status === 'reading') {
    return (
      <li className={`${box} text-sm text-gray-500`} aria-busy="true">
        <p className="truncate">Reading {item.name}…</p>
      </li>
    )
  }
  if (item.status === 'failed') {
    return (
      <li className={box}>
        <p className="truncate text-sm font-medium text-gray-700">{item.name}</p>
        <p className="mt-0.5 text-xs text-red-700">{item.error}</p>
      </li>
    )
  }

  const read = item.read!
  const laps = lapsFromRead(read.laps)
  const { count, best } = lapStats(laps)
  const slot = slots.find(s => s.key === item.slotKey)
  const existing = slot && saved(slot.key)
  const timer = [read.start && `Started ${time(read.start)}`, read.date && shortDate(read.date)].filter(Boolean).join(' · ')
  const label = (s: ImportSlot) =>
    [showDate || slots.some(o => o.date !== s.date) ? shortDate(s.date) : null, sessionTitle(s), time(s.time), groupFor(s.group, event.runGroups).label]
      .filter(Boolean).join(' · ')

  return (
    <li className={`${box} ${slot ? '' : 'bg-gray-50'}`} data-import-row>
      <div className="flex items-center gap-2">
        <p className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
          {slot ? `${sessionTitle(slot)} · ${time(slot.time)}` : 'Not imported'}
        </p>
        {slot && <GroupBadge group={groupFor(slot.group, event.runGroups)} size="sm" />}
      </div>
      <p className="mt-0.5 text-xs text-gray-500">
        {[timer || 'No date or time shown', `${plural(count, 'lap', 'laps')}`, best !== undefined ? `best ${formatLapTime(best, 2)}` : null].filter(Boolean).join(' · ')}
      </p>
      <p className="mt-1.5 text-xs tabular-nums text-gray-700" aria-label="Laps read">
        {laps.map((lap, i) => (
          <span key={i} className={lap.kind ? 'text-gray-400' : ''}>
            {i > 0 && <span className="text-gray-300"> · </span>}
            {formatLapTime(lap.ms, 2)}{lap.kind ? ` (${lap.kind})` : ''}
          </span>
        ))}
      </p>

      {!slot && item.reason && <p className="mt-2 text-xs text-gray-500">{REASON[item.reason]}</p>}
      {!slot && item.duplicate && <p className="mt-2 text-xs text-gray-500">Another screenshot has this session. Pick one to import this into.</p>}
      {existing && (
        <p className="mt-2 text-xs text-amber-700">
          Replaces the {plural(existing.laps.length, 'lap', 'laps')} saved for this session.
        </p>
      )}

      <label htmlFor={selectId} className="sr-only">Session for {item.name}</label>
      <select
        id={selectId}
        value={item.slotKey}
        onChange={e => onPick(e.target.value)}
        disabled={disabled}
        className={`${inputClass} mt-2 py-1.5 text-sm`}
      >
        <option value="">Don’t import</option>
        {slots.map(s => (
          <option key={s.key} value={s.key} disabled={s.key !== item.slotKey && takenBy(s.key)}>{label(s)}</option>
        ))}
      </select>
    </li>
  )
}
