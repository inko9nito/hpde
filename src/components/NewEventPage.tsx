import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAuth, SignedOutError } from '../auth/AuthContext'
import { useEvents, EVENTS_URL } from '../data/EventsContext'
import { SignInPrompt } from './SignInPrompt'
import { PageHeader } from './PageHeader'
import { Notice } from './Notice'
import { SuggestInput } from './SuggestInput'
import { TrackIcon, TRACK_ICON_IDS } from './TrackIcon'
import { collectOptions, findExact, resolveTrackId } from '../utils/fieldOptions'
import type { SuggestField } from '../utils/fieldOptions'
import { retimeDays } from '../utils/eventDetails'
import type { EventConfig } from '../types'

// Must match ADMIN_ROLE in netlify/lib/newEvent.mjs — the function is what
// actually enforces it; this only decides whether to show the form.
export const ADMIN_ROLE = 'admin'

interface FormState {
  name: string
  startDate: string
  // Defaults to (and moves with) the start date; same as start = one day.
  endDate: string
  organizer: string
  track: string
  city: string
  configuration: string
  direction: string
  link: string
}

const EMPTY: FormState = {
  name: '',
  startDate: '',
  endDate: '',
  organizer: '',
  track: '',
  city: '',
  configuration: '',
  direction: '',
  link: '',
}

// An event's details as the form shows them.
function formFrom(event: EventConfig): FormState {
  return {
    name: event.name,
    startDate: event.days[0]?.date ?? '',
    endDate: event.days[event.days.length - 1]?.date ?? '',
    organizer: event.organizer ?? '',
    track: event.track ?? '',
    city: event.city ?? '',
    configuration: event.configuration ?? '',
    direction: event.direction ?? '',
    link: event.link ?? '',
  }
}

function sameForm(a: FormState, b: FormState): boolean {
  return (Object.keys(a) as (keyof FormState)[]).every(k => a[k].trim() === b[k].trim())
}

// An edit in progress, kept for this tab only (sessionStorage) so signing
// in again — which goes to Google and back, reloading the app — doesn't
// lose it. Leaving the page in the app drops it. `base` is the event as
// the edit started from; a draft of an older version is ignored.
const DRAFT_KEY_PREFIX = 'hpde:detailsDraft:'

function readDraft(eventId: string, base: FormState): FormState | null {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY_PREFIX + eventId) ?? 'null')
    return draft && sameForm(draft.base, base) ? { ...base, ...draft.form } : null
  } catch {
    return null
  }
}

function writeDraft(eventId: string, draft: { form: FormState; base: FormState } | null) {
  try {
    if (draft) sessionStorage.setItem(DRAFT_KEY_PREFIX + eventId, JSON.stringify(draft))
    else sessionStorage.removeItem(DRAFT_KEY_PREFIX + eventId)
  } catch {
    // Storage blocked — the form still works, just without the safety net.
  }
}

// "2026-10-04" → "Oct 4"
function shortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
}

// Fixed height + appearance-none: iOS Safari otherwise gives selects a
// shorter native height than the text inputs beside them.
const fieldBase =
  'mt-1 block w-full min-w-0 appearance-none rounded-lg border border-gray-200 bg-white px-3 text-base text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none sm:text-sm'
const inputClass = `${fieldBase} h-11`
// iOS pins a date input's value to the top of a tall content box. Padding
// + line height make the content box exactly one line (44 = 9 + 24 + 9 +
// 2 border), so the date sits centered; h-11 still caps it where Chromium
// adds a couple of internal pixels.
const dateInputClass = `${fieldBase} h-11 py-[9px] leading-6 [&::-webkit-date-and-time-value]:min-h-6 [&::-webkit-date-and-time-value]:text-left`

/** Whole days from `a` to `b` ("YYYY-MM-DD"); UTC, so no DST drift. */
function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000)
}

function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block min-w-0">
      <span className="text-[13px] font-medium text-gray-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-gray-400">{hint}</span>}
    </label>
  )
}

/**
 * An event's details (#229): title, dates, organizer, track and link — the
 * schedule has its own editor. Blank for a new event; filled in, and
 * saved in place, to edit one (#232). Admins only; the events function
 * enforces it.
 */
export function EventDetailsForm({ event, onDone }: { event?: EventConfig; onDone: (event: EventConfig) => void }) {
  const { authedFetch } = useAuth()
  const { events, allEvents, addEvent } = useEvents()
  const [saved] = useState<FormState>(() => (event ? formFrom(event) : EMPTY))
  const [form, setForm] = useState<FormState>(() => (event && readDraft(event.id, saved)) || saved)

  useEffect(() => {
    if (!event) return
    writeDraft(event.id, sameForm(form, saved) ? null : { form, base: saved })
  }, [form])
  useEffect(() => {
    if (event) return () => writeDraft(event.id, null)
  }, [])
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function set<K extends keyof FormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  // Suggestions come from the listed events (not the hidden test fixture).
  // Once the location is a known track, only its configurations are offered.
  const knownTrack = findExact(form.track, collectOptions(events, 'track'))
  const sameTrack = (e: EventConfig) => !!knownTrack && findExact(e.track ?? '', [knownTrack]) !== null
  const options: Record<SuggestField, string[]> = {
    organizer: collectOptions(events, 'organizer'),
    track: collectOptions(events, 'track'),
    city: collectOptions(events, 'city'),
    configuration: knownTrack
      ? collectOptions(events, 'configuration', sameTrack)
      : collectOptions(events, 'configuration'),
  }

  function suggest(key: SuggestField) {
    return (value: string) => setForm(f => {
      const next = { ...f, [key]: value }
      // Picking a known track fills in its city, unless one's already set.
      const track = key === 'track' ? findExact(value, options.track) : null
      if (track && !next.city) {
        const past = events.filter(e => e.track && findExact(e.track, [track]))
        next.city = collectOptions(past, 'city')[0] ?? ''
      }
      return next
    })
  }

  // Icon from past events at this track/configuration (e.g. ECR 2.7). An
  // event being edited keeps its own while its track stays the same.
  const keepsTrack = !!event && form.track.trim() === saved.track.trim() && form.configuration.trim() === saved.configuration.trim()
  const trackId = resolveTrackId(events, form.track, form.configuration, TRACK_ICON_IDS)
    ?? (keepsTrack ? event?.trackId : undefined)

  const endBeforeStart = !!form.startDate && !!form.endDate && form.endDate < form.startDate
  const unchanged = !!event && sameForm(form, saved)

  // Schedules on days the new dates leave out (see retimeDays).
  const dropped = event && form.startDate && form.endDate && !endBeforeStart
    ? retimeDays(event.days, form.startDate, form.endDate).dropped
    : []

  // End date follows the start date, keeping the event's length: it starts
  // equal to the start (one day), and moving the start shifts the end too.
  function setStartDate(e: React.ChangeEvent<HTMLInputElement>) {
    const startDate = e.target.value
    setForm(f => {
      if (!startDate) return { ...f, startDate }
      const length = f.startDate && f.endDate ? Math.max(0, daysBetween(f.startDate, f.endDate)) : 0
      return { ...f, startDate, endDate: addDays(startDate, length) }
    })
  }

  // Final pass so a re-spelling of an existing value is never saved as new.
  function canonical(f: FormState): FormState {
    const out = { ...f }
    for (const key of Object.keys(options) as SuggestField[]) {
      out[key] = findExact(f[key], options[key]) ?? f[key].trim()
    }
    return out
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (endBeforeStart || unchanged) return
    setError(null)
    setSaving(true)
    const details = { ...canonical(form), trackId }
    try {
      const res = event
        ? await authedFetch(`${EVENTS_URL}?id=${encodeURIComponent(event.id)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ details }),
        })
        : await authedFetch(EVENTS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: details, takenIds: allEvents.map(ev => ev.id) }),
        })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.event) {
        setError(body.error ?? (event ? 'Couldn’t save the details. Try again.' : 'Couldn’t create the event. Try again.'))
        return
      }
      addEvent(body.event)
      onDone(body.event)
    } catch (err) {
      // Signed out: the page says so, with a way back in.
      if (err instanceof SignedOutError) return
      const reason = err instanceof Error && err.message ? ` (${err.message})` : ''
      setError(`Couldn’t reach the server. Check your connection and try again.${reason}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <Field label="Title">
          <input required value={form.name} onChange={set('name')} className={inputClass} placeholder="SCCA at MSRC 1.7 CW" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Start date">
            <input required type="date" value={form.startDate} onChange={setStartDate} className={dateInputClass} />
          </Field>
          <div className="min-w-0">
            <Field label="End date">
              <input
                required
                type="date"
                value={form.endDate}
                min={form.startDate || undefined}
                onChange={set('endDate')}
                aria-invalid={endBeforeStart}
                className={`${dateInputClass} ${endBeforeStart ? 'border-red-300' : ''}`}
              />
            </Field>
            {endBeforeStart && (
              <span role="alert" className="mt-1 block text-xs text-red-600">Ends before it starts</span>
            )}
          </div>
        </div>
        {dropped.length > 0 && (
          <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {dropped.map(d => `${d.label}, ${shortDate(d.date)},`).join(' and ')}
            {dropped.length === 1 ? ' has a schedule' : ' have schedules'} that saving removes.
          </p>
        )}
        <Field label="Organizer">
          <SuggestInput value={form.organizer} onChange={suggest('organizer')} options={options.organizer} className={inputClass} placeholder="Texas Region SCCA" />
        </Field>
      </div>

      <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <Field label="Location">
          <SuggestInput value={form.track} onChange={suggest('track')} options={options.track} className={inputClass} placeholder="Motorsport Ranch - Cresson" />
        </Field>
        <Field label="City">
          <SuggestInput value={form.city} onChange={suggest('city')} options={options.city} className={inputClass} placeholder="Cresson, TX" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Track configuration">
            <SuggestInput value={form.configuration} onChange={suggest('configuration')} options={options.configuration} className={inputClass} placeholder="1.7 mile" />
          </Field>
          <Field label="Direction">
            <div className="relative">
              <select value={form.direction} onChange={set('direction')} className={`${inputClass} pr-8`}>
                <option value="">—</option>
                <option value="Clockwise">Clockwise</option>
                <option value="Counter-clockwise">Counter-clockwise</option>
              </select>
              <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-gray-400" />
            </div>
          </Field>
        </div>
        <div className="flex items-center gap-3" data-testid="track-icon-preview">
          <TrackIcon trackId={trackId} size={32} />
          <span className="text-xs text-gray-500">
            {trackId
              ? 'Track icon matched from past events'
              : 'No track icon yet — pick a known location and configuration to match one'}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <Field label="Event page" hint="Registration or event page URL">
          <input type="url" value={form.link} onChange={set('link')} className={inputClass} />
        </Field>
      </div>

      {error && (
        <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving || unchanged}
        className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
      >
        {event ? (saving ? 'Saving…' : 'Save') : (saving ? 'Creating…' : 'Create event')}
      </button>
      <p className="text-center text-xs text-gray-400">
        {event
          ? 'Changing the dates moves the schedule with them.'
          : 'The schedule can be added after the event is created.'}
      </p>
    </form>
  )
}

/** Page shell shared with the details editor: title bar, then the form. */
export function FormPage({ title, subtitle, onClose, children }: {
  title: string
  subtitle?: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 pb-8 pt-3 sm:px-4 sm:pt-5">
        <PageHeader title={title} subtitle={subtitle} onClose={onClose} />
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}

/** "New event" (#229): the details form, blank. */
export function NewEventPage({ onCreated, onClose }: { onCreated: (event: EventConfig) => void; onClose: () => void }) {
  const { status, user } = useAuth()
  let content: React.ReactNode
  if (status !== 'signed-in') {
    content = <SignInPrompt reason="add events" />
  } else if (!user?.roles.includes(ADMIN_ROLE)) {
    content = <Notice title="Only admins can add events." detail={`Signed in as ${user?.email}`} />
  } else {
    content = <EventDetailsForm onDone={onCreated} />
  }
  return <FormPage title="New event" onClose={onClose}>{content}</FormPage>
}
