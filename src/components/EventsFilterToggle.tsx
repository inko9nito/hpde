export type EventsFilter = 'all' | 'mine'

/** Every event, or only theirs: on the Events tab (#235) and Tracks (#385), signed in. */
export function EventsFilterToggle({ filter, onChange }: { filter: EventsFilter; onChange: (f: EventsFilter) => void }) {
  const options: { id: EventsFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'mine', label: 'My events' },
  ]
  return (
    <div role="group" aria-label="Which events" className="inline-flex shrink-0 gap-1 rounded-lg bg-gray-100 p-1">
      {options.map(o => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          aria-pressed={filter === o.id}
          className={`rounded-md px-3 font-rubik text-sm transition-colors ${
            filter === o.id ? 'bg-white font-medium text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
          }`}
          style={{ minHeight: 36 }}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
