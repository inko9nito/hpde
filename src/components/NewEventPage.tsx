import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useEvents, CREATED_EVENTS_URL } from '../data/EventsContext'
import { SignInPrompt } from './SignInPrompt'
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

const inputClass =
  'mt-1 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-base text-gray-900 shadow-sm focus:border-gray-400 focus:outline-none sm:text-sm'

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
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
  const { allEvents, addEvent } = useEvents()
  const [form, setForm] = useState<FormState>(EMPTY)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function set<K extends keyof FormState>(key: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)
    try {
      const res = await authedFetch(CREATED_EVENTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: form, takenIds: allEvents.map(ev => ev.id) }),
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
              <input required type="date" value={form.startDate} onChange={set('startDate')} className={inputClass} />
            </Field>
            <Field label="End date" hint="Leave blank for one day">
              <input type="date" value={form.endDate} min={form.startDate || undefined} onChange={set('endDate')} className={inputClass} />
            </Field>
          </div>
          <Field label="Organizer">
            <input value={form.organizer} onChange={set('organizer')} className={inputClass} placeholder="Texas Region SCCA" />
          </Field>
        </div>

        <div className="space-y-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <Field label="Location">
            <input value={form.track} onChange={set('track')} className={inputClass} placeholder="Motorsport Ranch - Cresson" />
          </Field>
          <Field label="City">
            <input value={form.city} onChange={set('city')} className={inputClass} placeholder="Cresson, TX" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Track configuration">
              <input value={form.configuration} onChange={set('configuration')} className={inputClass} placeholder="1.7" />
            </Field>
            <Field label="Direction">
              <select value={form.direction} onChange={set('direction')} className={inputClass}>
                <option value="">—</option>
                <option value="Clockwise">Clockwise</option>
                <option value="Counter-clockwise">Counter-clockwise</option>
              </select>
            </Field>
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
