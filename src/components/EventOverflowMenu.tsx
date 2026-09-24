import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Ellipsis, Trash2 } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { useEvents, EVENTS_URL } from '../data/EventsContext'
import { ADMIN_ROLE } from './NewEventPage'
import type { EventConfig } from '../types'

interface Props {
  event: EventConfig
  onDeleted: () => void
}

/**
 * The "…" button at the right of the event header (#216). Admins only.
 * Holds Delete for now (Edit comes later). Every stored event can be
 * deleted (#232); the test fixtures that ship with the app can't, so on
 * those the item is shown disabled with the reason, rather than leaving an
 * admin wondering where it went.
 */
export function EventOverflowMenu({ event, onDeleted }: Props) {
  const { user } = useAuth()
  const { isStored } = useEvents()
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!user?.roles.includes(ADMIN_ROLE)) return null
  const deletable = isStored(event.id)

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
      >
        <Ellipsis size={18} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            role="menu"
            aria-label="Event actions"
            className="absolute right-0 top-full z-40 mt-2 min-w-[220px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl"
          >
            <button
              role="menuitem"
              disabled={!deletable}
              onClick={() => {
                setOpen(false)
                setConfirming(true)
              }}
              className="flex w-full items-start gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-default disabled:text-gray-400 disabled:hover:bg-transparent"
            >
              <Trash2 size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
              <span>
                Delete event
                {!deletable && (
                  <span className="block text-xs font-normal text-gray-400">
                    Test events can’t be deleted
                  </span>
                )}
              </span>
            </button>
          </div>
        </>
      )}

      {confirming && (
        <DeleteEventDialog
          event={event}
          onCancel={() => setConfirming(false)}
          onDeleted={onDeleted}
        />
      )}
    </div>
  )
}

function DeleteEventDialog({
  event,
  onCancel,
  onDeleted,
}: {
  event: EventConfig
  onCancel: () => void
  onDeleted: () => void
}) {
  const { authedFetch } = useAuth()
  const { removeEvent } = useEvents()
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setError(null)
    setDeleting(true)
    try {
      const res = await authedFetch(`${EVENTS_URL}?id=${encodeURIComponent(event.id)}`, {
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

  // Portalled: the event page sits inside transformed wrappers (PushPage,
  // PullToRefresh), which would pin a `fixed` overlay to the scrolling
  // content instead of the viewport.
  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 px-6">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-event-title"
        className="w-full max-w-sm rounded-2xl bg-white p-5 text-left shadow-xl"
      >
        <p id="delete-event-title" className="text-base font-semibold text-gray-900">
          Delete “{event.name}”?
        </p>
        <p className="mt-1 text-sm text-gray-600">
          It’s removed for everyone. This can’t be undone.
        </p>
        {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
        <div className="mt-5 flex gap-2">
          <button
            onClick={onCancel}
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
    </div>,
    document.body,
  )
}
