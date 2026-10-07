export type EventsFilter = 'all' | 'mine'

/**
 * Every event, or only theirs: on the Events tab (#235) and Tracks (#385),
 * signed in. `mineLabel` names theirs: My events, or Mine where the page
 * says what of (#385).
 */
export function EventsFilterToggle({ filter, onChange, label = 'Which events', mineLabel = 'My events' }: {
  filter: EventsFilter
  onChange: (f: EventsFilter) => void
  /** What it picks between, for its name. */
  label?: string
  mineLabel?: string
}) {
  const options: { id: EventsFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'mine', label: mineLabel },
  ]
  return (
    <div role="group" aria-label={label} className="inline-flex shrink-0 gap-1 rounded-lg bg-gray-100 p-1">
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
