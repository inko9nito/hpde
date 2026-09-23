export type EventTabId = 'schedule' | 'notes' | 'info'

interface Tab { id: EventTabId; label: string }

const TABS: readonly Tab[] = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'notes', label: 'My notes' },
  { id: 'info', label: 'Info' },
]

/**
 * Guard for tab ids read back from localStorage, where a value written by
 * an older build (or hand-edited) could otherwise leave the event page
 * with a selected tab that renders no panel at all.
 */
export function isEventTabId(value: unknown): value is EventTabId {
  return TABS.some(tab => tab.id === value)
}

interface Props {
  active: EventTabId
  onChange: (id: EventTabId) => void
}

/**
 * Segmented top-level tabs for the event page (Schedule / My notes / Info).
 * Visual language matches the multi-day day tabs: pill inside a white
 * rounded card, active segment is a dark-gray filled pill.
 */
export function EventTabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Event section"
      className="flex gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm"
    >
      {TABS.map(tab => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`event-tabpanel-${tab.id}`}
            id={`event-tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-gray-900 text-white'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
