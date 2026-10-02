export type EventTabId = 'schedule' | 'notes' | 'info'

interface Tab { id: EventTabId; label: string }

const TABS: readonly Tab[] = [
  { id: 'schedule', label: 'Schedule' },
  // Id stays 'info' so a tab saved in localStorage before the rename
  // (#216) still resolves.
  { id: 'info', label: 'Details' },
  { id: 'notes', label: 'My notes' },
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
  /** How many sessions have lap times saved: "My notes (1)" (#210). */
  notesCount?: number
}

/**
 * Top-level tabs for the event page (Schedule / Details / My notes),
 * sitting along the bottom edge of the event header (#216): three equal
 * columns, the active one marked by a heavier label and a dark bar
 * underneath.
 */
export function EventTabs({ active, onChange, notesCount }: Props) {
  return (
    <TabStrip
      tabs={TABS.map(tab => (tab.id === 'notes' && notesCount ? { ...tab, label: `${tab.label} (${notesCount})` } : tab))}
      active={active}
      onChange={onChange}
      label="Event section"
      idPrefix="event"
      className="pl-2 pr-0.5 pt-4"
    />
  )
}

/**
 * A page's tabs, in equal columns, the active one marked by a heavier
 * label and a dark bar under it: the event page's, and a car's (#410).
 * Each controls the panel `${idPrefix}-tabpanel-${id}`.
 */
export function TabStrip<T extends string>({ tabs, active, onChange, label, idPrefix, className = '' }: {
  tabs: readonly { id: T; label: string }[]
  active: T
  onChange: (id: T) => void
  label: string
  idPrefix: string
  className?: string
}) {
  return (
    <div role="tablist" aria-label={label} className={`flex ${className}`}>
      {tabs.map(tab => {
        const isActive = tab.id === active
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`${idPrefix}-tabpanel-${tab.id}`}
            id={`${idPrefix}-tab-${tab.id}`}
            onClick={() => onChange(tab.id)}
            className={`flex h-7 min-w-0 flex-1 flex-col items-center justify-between font-rubik text-sm text-gray-900 ${
              isActive ? 'font-medium' : 'font-normal hover:text-gray-600'
            }`}
          >
            <span className="truncate px-4 leading-none">{tab.label}</span>
            <span
              aria-hidden="true"
              className={`h-1 w-full rounded-t-sm ${isActive ? 'bg-gray-900' : ''}`}
            />
          </button>
        )
      })}
    </div>
  )
}
