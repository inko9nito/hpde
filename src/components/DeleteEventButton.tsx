import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useEvents, CREATED_EVENTS_URL } from '../data/EventsContext'
import { ADMIN_ROLE } from './NewEventPage'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  onDeleted: () => void
}

/**
 * "Delete event" at the bottom of the Info tab (#229). Admins only, and
 * only for events created in the app — built-in events live in src/data.
 * Asks for confirmation inline before calling the function.
 */
export function DeleteEventButton({ event, onDeleted }: Props) {
  const { user, authedFetch } = useAuth()
  const { isCreated, removeEvent } = useEvents()
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!user?.roles.includes(ADMIN_ROLE) || !isCreated(event.id)) return null

  async function handleDelete() {
    setError(null)
    setDeleting(true)
    try {
      const res = await authedFetch(`${CREATED_EVENTS_URL}?id=${encodeURIComponent(event.id)}`, {
        method: 'DELETE',
      })
      // 404: already gone (e.g. deleted from another device) — same outcome.
      if (!res.ok && res.status !== 404) {
        const body = await res.json().catch(() => ({}))
        setError(body.error ?? 'Couldn’t delete the event. Try again.')
        return
      }
      removeEvent(event.id)
      onDeleted()
    } catch {
      setError('Couldn’t reach the server. Check your connection and try again.')
    } finally {
      setDeleting(false)
    }
  }

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 size={16} aria-hidden="true" />
        Delete event
      </button>
    )
  }

  return (
    <div role="alertdialog" aria-labelledby="delete-event-title" className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">
      <p id="delete-event-title" className="text-sm font-semibold text-gray-900">
        Delete “{event.name}”?
      </p>
      <p className="mt-1 text-sm text-gray-600">
        It’s removed for everyone. This can’t be undone.
      </p>
      {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => {
            setConfirming(false)
            setError(null)
          }}
          disabled={deleting}
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
