import { useState } from 'react'
import { Check, Lock } from 'lucide-react'
import { Sheet } from './Sheet'
import { TrackIcon } from './TrackIcon'
import { useEvents } from '../data/EventsContext'
import { useRsvps } from '../data/RsvpsContext'
import { carName, eventsToDriveAt } from '../utils/garage'
import type { Car, Garage } from '../utils/garage'
import { formatDateRange } from '../utils/time'

/**
 * Adds a car to events from its page (#344): the events it isn't at yet —
 * all but those the driver said they didn't go to, or aren't going to — to
 * pick one by one or all at once. One with another car on it says so, and picking it puts this
 * car there instead (its tire pressures stay).
 */
export function DriveAtSheet({ car, garage, onSave, onClose }: {
  car: Car
  garage: Garage
  onSave: (eventIds: string[]) => Promise<void>
  onClose: () => void
}) {
  // The events the app lists — not the fixtures, reachable only by URL.
  const { events } = useEvents()
  const { status, rsvps } = useRsvps()
  const choices = eventsToDriveAt(car.id, garage, events, rsvps)
  const [picked, setPicked] = useState<Set<string>>(() => new Set())
  const [busy, setBusy] = useState(false)
  const [failure, setFailure] = useState<string | null>(null)
  const chosen = choices.filter(c => picked.has(c.event.id))
  const replacing = [...new Set(chosen.flatMap(c => (c.now ? [carName(c.now)] : [])))]
  const allPicked = choices.length > 0 && chosen.length === choices.length

  function toggle(id: string) {
    setPicked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function save() {
    setBusy(true)
    setFailure(null)
    try {
      await onSave(chosen.map(c => c.event.id))
    } catch (err) {
      setFailure((err as Error).message)
      setBusy(false)
    }
  }

  return (
    <Sheet
      label="Add to events"
      busy={busy}
      onClose={onClose}
      data-drive-at-sheet
      heading={<>
        <p className="text-xs text-gray-500">{carName(car)}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">Add to events</h2>
      </>}
    >
      {status === 'loading' ? (
        <div className="mt-4 h-24 animate-pulse rounded-xl bg-gray-100" aria-busy="true" aria-label="Loading your events" />
      ) : status === 'error' ? (
        <p className="mt-4 text-sm text-gray-700">Couldn’t load your events. Check your connection and try again.</p>
      ) : choices.length === 0 ? (
        <p className="mt-4 text-sm text-gray-700">
          This car’s already added to all your events.
        </p>
      ) : (<>
        <div className="mt-4 flex items-baseline justify-between">
          <p className="text-xs font-medium text-gray-700">Events</p>
          <button
            onClick={() => setPicked(allPicked ? new Set() : new Set(choices.map(c => c.event.id)))}
            disabled={busy}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {allPicked ? 'Clear all' : 'Select all'}
          </button>
        </div>
        <ul className="mt-2 flex flex-col gap-2" aria-label="Events">
          {choices.map(({ event, now }) => {
            const on = picked.has(event.id)
            return (
              <li key={event.id}>
                <button
                  role="checkbox"
                  aria-checked={on}
                  onClick={() => toggle(event.id)}
                  disabled={busy}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${on ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <TrackIcon trackId={event.trackId} tone="dark" size={32} padding={0} radius="rounded-lg" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-gray-900">{event.name}</span>
                    <span className="block truncate text-xs text-gray-500">
                      {formatDateRange(event.days)}
                      {now && <span className="text-amber-700"> · Now in {carName(now)}</span>}
                    </span>
                  </span>
                  <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border ${on ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'}`} aria-hidden="true">
                    {on && <Check size={12} strokeWidth={3} />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </>)}

      {replacing.length > 0 && (
        <p className="mt-3 text-xs text-gray-600">
          {carName(car)} takes {replacing.join(' and ')}’s place there. Tire pressures stay.
        </p>
      )}
      {failure && <p role="alert" className="mt-3 text-xs text-red-700">{failure}</p>}

      <div className="mt-5 flex flex-col items-center gap-3">
        {choices.length > 0 && (
          <button
            onClick={save}
            disabled={chosen.length === 0 || busy}
            className="w-full rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
          >
            {busy ? 'Saving…' : chosen.length > 1 ? `Add to ${chosen.length} events` : 'Add to event'}
          </button>
        )}
        <p className="flex items-center gap-1 text-[11px] text-gray-400">
          <Lock size={11} aria-hidden="true" />
          Only you and admins can see your garage.
        </p>
      </div>
    </Sheet>
  )
}
