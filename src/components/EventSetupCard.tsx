import { CarFront, ChevronRight } from 'lucide-react'
import { CONSUMABLES, carName, carTitle } from '../utils/garage'
import type { Car, EventSetup } from '../utils/garage'

/** A label and its value, a line to itself — as on the report card. */
export function SetupRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-10 items-center justify-between gap-3 border-b border-gray-100 py-2 last:border-b-0">
      <dt className="shrink-0 text-[13px] font-medium text-gray-500">{label}</dt>
      <dd className="min-w-0 text-right text-sm text-gray-900">{value}</dd>
    </div>
  )
}

/** The consumables a setup names, as rows of a list. */
export function ConsumableRows({ setup }: { setup: EventSetup }) {
  return <>{CONSUMABLES.filter(c => setup[c.id]).map(c => <SetupRow key={c.id} label={c.label} value={setup[c.id]!} />)}</>
}

/**
 * The car an event ran on (#344), on My notes: which it was, its lug nut
 * torque (to hand at the track) and the consumables on it. Only what's
 * filled in shows.
 */
export function EventSetupCard({ setup, car, onEdit }: {
  setup: EventSetup
  /** The car, if the setup names one still in the garage. */
  car?: Car
  onEdit?: () => void
}) {
  return (
    <section aria-label="Car and consumables" className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" data-event-setup>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-bold text-gray-900">{car ? carName(car) : 'Car and consumables'}</h3>
          {car?.nickname && <p className="truncate text-sm text-gray-500">{carTitle(car)}</p>}
        </div>
        <CarFront size={18} className="mt-1 shrink-0 text-gray-900" aria-hidden="true" />
      </div>
      <dl className="mt-2">
        {car?.lugNutTorque !== undefined && <SetupRow label="Lug nut torque" value={`${car.lugNutTorque} ft·lb`} />}
        <ConsumableRows setup={setup} />
      </dl>
      {onEdit && (
        <button
          onClick={onEdit}
          className="mt-4 w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
        >
          Edit car and consumables
        </button>
      )}
    </section>
  )
}

/** An event with no car yet (#344): one row, like Add instructor evaluation's. */
export function AddEventSetup({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      onClick={onAdd}
      className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-gray-300 bg-white p-3 text-left transition-colors hover:bg-gray-50"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gray-100 text-gray-700">
        <CarFront size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900">Add your car</span>
        <span className="mt-0.5 block text-xs text-gray-500">The car you’re bringing, and its tires and brakes</span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
    </button>
  )
}
