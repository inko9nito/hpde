import { groupNamed } from './EventEvaluationCard'
import type { CardId, TdeCard } from '../utils/evaluation'
import type { EventConfig } from '../types'

/**
 * Which run group's report card (#350): Green · Blue, each with its
 * group's color, as the form's Yes · No are drawn, on the form: the card
 * being filled in. (Instructor evaluations shows each group's apart, and
 * its run group filter picks one, #401.)
 */
export function ReportCardSwitch({ cards, value, onChange, events, label = 'Report card' }: {
  cards: readonly TdeCard[]
  value: CardId
  onChange: (id: CardId) => void
  /** Every event, to color each card's group as the app does. */
  events: EventConfig[]
  label?: string
}) {
  return (
    <div className="flex shrink-0 rounded-lg bg-gray-100 p-0.5" role="group" aria-label={label}>
      {cards.map(card => {
        const on = card.id === value
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onChange(card.id)}
            aria-pressed={on}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium ${on ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
          >
            <span aria-hidden="true" className={`h-2 w-2 rounded-full ${groupNamed(card.group, events).bgClass}`} />
            {card.group}
          </button>
        )
      })}
    </div>
  )
}
