import { useEffect } from 'react'
import { X } from 'lucide-react'
import { ServiceEntryRow } from './ServiceEntryRow'
import { CARS } from '../data/cars'

export function CarPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const car = CARS[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{car?.name ?? 'Car'}</h1>
            {car && (car.year || car.make || car.model || car.trim) && (
              <p className="text-xs text-gray-500">
                {[car.year, car.make, car.model, car.trim].filter(Boolean).join(' ')}
              </p>
            )}
          </div>
          <a
            href="#/"
            aria-label="Close"
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <X size={18} />
          </a>
        </div>

        <div className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
          Service log
        </div>

        {!car || car.services.length === 0 ? (
          <div className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-sm">
            <p className="text-sm font-medium text-gray-500">No service logged yet</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {car.services.map((entry, idx) => (
              <ServiceEntryRow key={idx} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
