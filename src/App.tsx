import { useState, useEffect } from 'react'
import { Calendar, Map } from 'lucide-react'
import { Timeline } from './components/Timeline'
import { RunGroupFilter } from './components/RunGroupFilter'
import { EventPicker } from './components/EventPicker'
import { Toggle } from './components/Toggle'
import { EVENTS } from './data'
import type { EventConfig, DaySchedule, View } from './types'

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : initial
    } catch {
      return initial
    }
  })
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue] as const
}

function findTodayDay(event: EventConfig): DaySchedule | undefined {
  const today = new Date().toISOString().split('T')[0]
  return event.days.find(d => d.date === today)
}

function defaultDay(event: EventConfig): DaySchedule {
  return findTodayDay(event) ?? event.days[0]
}

export default function App() {
  const [view, setView] = useState<View>('schedule')
  const [activeEvent, setActiveEvent] = useState<EventConfig>(EVENTS[0])
  const [activeDay, setActiveDay] = useState<DaySchedule>(() => defaultDay(EVENTS[0]))
  const [selectedGroups, setSelectedGroups] = useLocalStorage<string[]>('hpde:groups', [])
  const [hidePast, setHidePast] = useLocalStorage<boolean>('hpde:hidePast', false)

  const todayDay = findTodayDay(activeEvent)
  const isToday = activeDay.date === new Date().toISOString().split('T')[0]
  const multiDay = activeEvent.days.length > 1

  function switchEvent(event: EventConfig) {
    setActiveEvent(event)
    setActiveDay(defaultDay(event))
    setSelectedGroups([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">

        {/* Header */}
        <div className="mb-4 flex items-start justify-between rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
          <EventPicker events={EVENTS} active={activeEvent} onChange={switchEvent} />
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1 ml-3 shrink-0 self-start">
            <button
              onClick={() => setView('schedule')}
              className={`rounded-md p-2 transition-colors ${view === 'schedule' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <Calendar size={18} />
            </button>
            <button
              onClick={() => setView('map')}
              className={`rounded-md p-2 transition-colors ${view === 'map' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <Map size={18} />
            </button>
          </div>
        </div>

        {view === 'schedule' && (
          <>
            {/* Day tabs + Now — only shown for multi-day events */}
            {multiDay && (
              <div className="mb-3 flex items-center gap-2">
                <div className="flex flex-1 gap-1 rounded-lg bg-white border border-gray-200 p-1 shadow-sm min-w-0">
                  {activeEvent.days.map(day => (
                    <button
                      key={day.id}
                      onClick={() => setActiveDay(day)}
                      className={`flex-1 rounded-md py-2 text-sm font-medium capitalize transition-colors ${
                        activeDay.id === day.id
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => todayDay && setActiveDay(todayDay)}
                  disabled={isToday || !todayDay}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors shrink-0 ${
                    isToday || !todayDay
                      ? 'border-gray-100 bg-white text-gray-300 cursor-default'
                      : 'border-gray-200 bg-white text-gray-700 shadow-sm hover:border-gray-400'
                  }`}
                >
                  Now
                </button>
              </div>
            )}

            {/* Filters */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <RunGroupFilter
                groups={activeEvent.runGroups}
                selected={selectedGroups}
                onChange={setSelectedGroups}
              />
              <Toggle
                checked={hidePast}
                onChange={() => setHidePast(h => !h)}
                label="Hide past events"
              />
            </div>

            <Timeline
              events={activeDay.events}
              runGroups={activeEvent.runGroups}
              isToday={isToday}
              selectedGroups={selectedGroups}
              hidePast={hidePast}
            />
          </>
        )}

        {view === 'map' && (
          <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm">
            <div className="text-center">
              <Map size={40} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">Track map coming soon</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
