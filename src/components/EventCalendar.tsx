import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { todayLocalISO } from '../utils/time'
import type { EventConfig } from '../types'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Monday-first column labels.
const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

interface Props {
  events: EventConfig[]
  onOpenEvent: (event: EventConfig) => void
}

// Column index (0=Mon..6=Sun) for a JS Date; JS getDay() returns 0=Sun..6=Sat.
function mondayCol(date: Date): number {
  return (date.getDay() + 6) % 7
}

function isoFor(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export function EventCalendar({ events, onOpenEvent }: Props) {
  const now = new Date()
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() })
  const todayISO = todayLocalISO()

  const byDate = new Map<string, EventConfig[]>()
  for (const event of events) {
    for (const day of event.days) {
      const arr = byDate.get(day.date) ?? []
      arr.push(event)
      byDate.set(day.date, arr)
    }
  }

  const firstOfMonth = new Date(cursor.year, cursor.month, 1)
  const leadingDays = mondayCol(firstOfMonth)
  const lastOfMonth = new Date(cursor.year, cursor.month + 1, 0)
  const trailingDays = 6 - mondayCol(lastOfMonth)
  const totalCells = leadingDays + lastOfMonth.getDate() + trailingDays
  const gridStart = new Date(cursor.year, cursor.month, 1 - leadingDays)

  const cells: { date: Date; iso: string; inMonth: boolean }[] = []
  for (let i = 0; i < totalCells; i++) {
    const d = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i)
    cells.push({
      date: d,
      iso: isoFor(d.getFullYear(), d.getMonth(), d.getDate()),
      inMonth: d.getMonth() === cursor.month,
    })
  }

  function prevMonth() {
    setCursor(c => (c.month === 0 ? { year: c.year - 1, month: 11 } : { year: c.year, month: c.month - 1 }))
  }
  function nextMonth() {
    setCursor(c => (c.month === 11 ? { year: c.year + 1, month: 0 } : { year: c.year, month: c.month + 1 }))
  }
  function goToday() {
    setCursor({ year: now.getFullYear(), month: now.getMonth() })
  }

  const isCurrentMonth = cursor.year === now.getFullYear() && cursor.month === now.getMonth()

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            aria-label="Previous month"
            className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextMonth}
            aria-label="Next month"
            className="grid h-9 w-9 place-items-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-400"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {MONTHS[cursor.month]} {cursor.year}
        </div>
        <button
          onClick={goToday}
          disabled={isCurrentMonth}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            isCurrentMonth
              ? 'border-gray-100 bg-white text-gray-300 cursor-default'
              : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400'
          }`}
        >
          Today
        </button>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
        <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          {DAY_LABELS.map(l => (
            <div key={l} className="py-1">{l}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, i) => {
            const dayEvents = byDate.get(cell.iso) ?? []
            const isToday = cell.iso === todayISO
            return (
              <div
                key={i}
                className={`min-h-[76px] rounded-lg border p-1 ${
                  cell.inMonth ? 'border-gray-100 bg-white' : 'border-transparent bg-gray-50/60'
                }`}
              >
                <div
                  className={`mb-1 text-right text-[10px] font-medium ${
                    !cell.inMonth ? 'text-gray-300' : isToday ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  {cell.date.getDate()}
                </div>
                <div className="space-y-0.5">
                  {dayEvents.map((event, idx) => (
                    <button
                      key={`${event.id}-${idx}`}
                      onClick={() => onOpenEvent(event)}
                      className="block w-full truncate rounded bg-blue-50 px-1 py-0.5 text-left text-[10px] font-medium text-blue-700 transition-colors hover:bg-blue-100"
                      title={event.name}
                    >
                      {event.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
