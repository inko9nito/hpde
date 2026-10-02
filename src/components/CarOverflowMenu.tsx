import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Archive, Ellipsis, Pencil, Trash2 } from 'lucide-react'
import { useGarage } from '../data/GarageContext'
import { carName, isShared, othersText } from '../utils/garage'
import type { Car } from '../utils/garage'
import { ICON_BUTTON } from './iconButton'

/**
 * What Archive asks first (#410): an archived car stays on the events it
 * went to, and with its other drivers, and can be put back.
 */
function archiveText(others: string | null, events: number): string {
  const went = events === 1 ? 'the event you drove it at' : `the ${events} events you drove it at`
  if (others) {
    return events
      ? `It stays in ${others}’s garage, and ${went} ${events === 1 ? 'keeps' : 'keep'} it as it is now. You can put it back.`
      : `It stays in ${others}’s garage. You can put it back.`
  }
  return events
    ? `It leaves your garage but stays on ${went}, with its history. You can put it back.`
    : 'It leaves your garage, with its history. You can put it back.'
}

/** What Delete asks first: what goes with it, of what it has. */
function deleteText(car: Car): string {
  const gone = [car.photo && 'photo', car.log?.length && 'change log'].filter(Boolean)
  const what = gone.length ? `Its ${gone.join(' and ')} ${gone.length > 1 ? 'go' : 'goes'} with it. ` : ''
  return `${what}This can’t be undone.`
}

const ITEM = 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-gray-50'

/**
 * The "…" at the top right of a car's page (#423), as on an event's: Edit,
 * Archive — any car, kept out of the garage, to be put back (#410) — and,
 * for one that never went to an event and isn't shared, Delete. Each asks
 * first.
 */
export function CarOverflowMenu({ car, events, onEdit, onRemoved }: {
  car: Car
  /** How many events it's been to, so Archive can say. */
  events: number
  onEdit: () => void
  /** Once it's archived (true) or deleted. */
  onRemoved: (archived: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const [confirming, setConfirming] = useState<'archive' | 'delete' | null>(null)
  // Driven at events, or shared: only archived, never deleted.
  const shared = isShared(car)
  const deletable = !events && !shared

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="relative shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="More actions"
        aria-haspopup="menu"
        aria-expanded={open}
        className={ICON_BUTTON}
      >
        <Ellipsis size={22} strokeWidth={2.25} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            role="menu"
            aria-label="Car actions"
            className="absolute right-2 top-full z-40 mt-2 min-w-[200px] rounded-xl border border-gray-200 bg-white p-1 shadow-xl"
          >
            <button role="menuitem" onClick={() => { setOpen(false); onEdit() }} className={`${ITEM} text-gray-900`}>
              <Pencil size={16} aria-hidden="true" className="shrink-0" />
              Edit
            </button>
            <div role="separator" className="mx-3 my-1 h-px bg-gray-100" />
            <button role="menuitem" onClick={() => { setOpen(false); setConfirming('archive') }} className={`${ITEM} text-gray-900`}>
              <Archive size={16} aria-hidden="true" className="shrink-0" />
              Archive
            </button>
            {deletable && (
              <button role="menuitem" onClick={() => { setOpen(false); setConfirming('delete') }} className={`${ITEM} text-red-600 hover:bg-red-50`}>
                <Trash2 size={16} aria-hidden="true" className="shrink-0" />
                Delete
              </button>
            )}
          </div>
        </>
      )}

      {confirming && (
        <RemoveCarDialog
          car={car}
          archives={confirming === 'archive'}
          text={confirming === 'archive' ? archiveText(shared ? othersText(car) : null, events) : deleteText(car)}
          onCancel={() => setConfirming(null)}
          onRemoved={() => {
            setConfirming(null)
            onRemoved(confirming === 'archive')
          }}
        />
      )}
    </div>
  )
}

function RemoveCarDialog({ car, archives, text, onCancel, onRemoved }: {
  car: Car
  archives: boolean
  text: string
  onCancel: () => void
  onRemoved: () => void
}) {
  const garage = useGarage()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function remove() {
    setError(null)
    setBusy(true)
    try {
      await garage.removeCar(car.id, { archive: archives })
      onRemoved()
    } catch (err) {
      setError((err as Error).message)
      setBusy(false)
    }
  }

  const verb = archives ? 'Archive' : 'Delete'
  // Portalled: the car's page sits in transformed wrappers (PushPage), which
  // would pin a `fixed` overlay to the scrolling content, not the screen.
  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 px-6">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="remove-car-title"
        aria-describedby="remove-car-text"
        className="w-full max-w-sm rounded-2xl bg-white p-5 text-left shadow-xl"
      >
        <p id="remove-car-title" className="text-base font-semibold text-gray-900">
          {verb} “{carName(car)}”?
        </p>
        <p id="remove-car-text" className="mt-1 text-sm text-gray-600">{text}</p>
        {error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}
        <div className="mt-5 flex gap-2">
          <button
            onClick={onCancel}
            disabled={busy}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={remove}
            disabled={busy}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50 ${
              archives ? 'bg-gray-900 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {busy ? (archives ? 'Archiving…' : 'Deleting…') : verb}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
