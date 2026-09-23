import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useEvents, CREATED_EVENTS_URL } from '../data/EventsContext'
import { SignInPrompt } from './SignInPrompt'
import { SuggestInput } from './SuggestInput'
import { TrackIcon, TRACK_ICON_IDS } from './TrackIcon'
import { collectOptions, findExact, resolveTrackId } from '../utils/fieldOptions'
import type { SuggestField } from '../utils/fieldOptions'
import type { EventConfig } from '../types'

// Must match ADMIN_ROLE in netlify/lib/newEvent.mjs — the function is what
// actually enforces it; this only decides whether to show the form.
export const ADMIN_ROLE = 'admin'

interface Props {
  onCreated: (event: EventConfig) => void
}

interface FormState {
  name: string
  startDate: string
  // "1".."7" — a Days picker instead of an End date input: iOS can't clear
  // a date input ("Reset" restores it) and fills in today when opened, which
  // made end-before-start easy. A count can't be out of order.
  dayCount: string
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
  dayCount: '1',
  organizer: '',
  track: '',
  city: '',
  configuration: '',
  direction: '',
  link: '',
}

const MAX_DAYS = 7

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

/** "2026-10-03" + 2 → "2026-10-05" (calendar math in UTC, no DST drift). */
function addDays(iso: string, n: number): string {
  const d = new Date(`${iso}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

function formatShortDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC',
  })
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
 * "New event" form (#229): the event's details only — the schedule is
 * added separately. Admins only; the created-events function enforces it.
 */
export function NewEventPage({ onCreated }: Props) {
  const { status, user, authedFetch } = useAuth()
  const { events, allEvents, addEvent } = useEvents()
  const [form, setForm] = useState<FormState>(EMPTY)
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

  // Icon from past events at this track/configuration (e.g. ECR 2.7).
  const trackId = resolveTrackId(events, form.track, form.configuration, TRACK_ICON_IDS)

  const days = Number(form.dayCount) || 1
  const endDate = form.startDate ? addDays(form.startDate, days - 1) : ''

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
    setError(null)
    setSaving(true)
    try {
      const res = await authedFetch(CREATED_EVENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: { ...canonical(form), endDate, trackId }, takenIds: allEvents.map(ev => ev.id) }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.event) {
        setError(body.error ?? 'Couldn’t create the event. Try again.')
        return
      }
      addEvent(body.event)
      onCreated(body.event)
    } catch {
      setError('Couldn’t reach the server. Check your connection and try again.')
    } finally {
      setSaving(false)
    }
  }

  let content: React.ReactNode
  if (status !== 'signed-in') {
    content = <SignInPrompt reason="add events" />
  } else if (!user?.roles.includes(ADMIN_ROLE)) {
    content = (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
        <p className="text-sm font-medium text-gray-700">Only admins can add events.</p>
        <p className="mt-1 text-xs text-gray-400">Signed in as {user?.email}</p>
      </div>
    )
  } else {
    content = (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <Field label="Title">
            <input required value={form.name} onChange={set('name')} className={inputClass} placeholder="SCCA at MSRC 1.7 CW" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Start date">
              <input required type="date" value={form.startDate} onChange={set('startDate')} className={dateInputClass} />
            </Field>
            <Field
              label="Days"
              hint={days > 1 && endDate ? `Ends ${formatShortDate(endDate)}` : undefined}
            >
              <div className="relative">
                <select value={form.dayCount} onChange={set('dayCount')} className={`${inputClass} pr-8`}>
                  {Array.from({ length: MAX_DAYS }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n === 1 ? '1 day' : `${n} days`}</option>
                  ))}
                </select>
                <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 mt-0.5 -translate-y-1/2 text-gray-400" />
              </div>
            </Field>
          </div>
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
            <input type="url" value={form.link} onChange={set('link')} className={inputClass} placeholder="https://www.motorsportreg.com/…" />
          </Field>
        </div>

        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create event'}
        </button>
        <p className="text-center text-xs text-gray-400">The schedule can be added after the event is created.</p>
      </form>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">New event</h1>
          <a
            href="#/"
            aria-label="Close"
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <X size={18} />
          </a>
        </div>
        {content}
      </div>
    </div>
  )
}
