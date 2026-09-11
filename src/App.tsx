import { useState, useEffect } from 'react'
import { Calendar, Map } from 'lucide-react'
import { Timeline } from './components/Timeline'
import { RunGroupFilter } from './components/RunGroupFilter'
import { EventPicker } from './components/EventPicker'
import { Toggle } from './components/Toggle'
import { PullToRefresh } from './components/PullToRefresh'
import { Legend } from './components/Legend'
import { EVENTS } from './data'
import { todayLocalISO, nowMinutes, parseMinutes } from './utils/time'
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
  const today = todayLocalISO()
  return event.days.find(d => d.date === today)
}

function defaultDay(event: EventConfig): DaySchedule {
  return findTodayDay(event) ?? event.days[0]
}

export default function App() {
  const [view, setView] = useState<View>('schedule')
  const [activeEventId, setActiveEventId] = useLocalStorage<string>('hpde:activeEvent', EVENTS[0].id)
  const [activeDayId, setActiveDayId] = useLocalStorage<string | null>('hpde:activeDay', null)
  const [selectedGroups, setSelectedGroups] = useLocalStorage<string[]>('hpde:groups', [])
  const [hidePast, setHidePast] = useLocalStorage<boolean>('hpde:hidePast', false)

  const activeEvent = EVENTS.find(e => e.id === activeEventId) ?? EVENTS[0]
  const activeDay = activeEvent.days.find(d => d.id === activeDayId) ?? defaultDay(activeEvent)

  const todayDay = findTodayDay(activeEvent)
  const isToday = activeDay.date === todayLocalISO()
  const multiDay = activeEvent.days.length > 1

  const [, setTick] = useState(0)
  useEffect(() => {
    if (!isToday) return
    const id = setInterval(() => setTick(t => t + 1), 60000)
    return () => clearInterval(id)
  }, [isToday])

  const hasPastEvents = isToday
    && activeDay.events.some(e => e.type !== 'break' && parseMinutes(e.time) < nowMinutes())

  function switchEvent(event: EventConfig) {
    setActiveEventId(event.id)
    setActiveDayId(defaultDay(event).id)
    setSelectedGroups([])
  }

  return (
    <PullToRefresh>
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">

        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <EventPicker events={EVENTS} active={activeEvent} onChange={switchEvent} />
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1 shrink-0 self-start">
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
                      onClick={() => setActiveDayId(day.id)}
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
                  onClick={() => todayDay && setActiveDayId(todayDay.id)}
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
              {hasPastEvents && (
                <Toggle
                  checked={hidePast}
                  onChange={() => setHidePast(h => !h)}
                  label="Hide past events"
                />
              )}
            </div>

            <Timeline
              events={activeDay.events}
              runGroups={activeEvent.runGroups}
              isToday={isToday}
              selectedGroups={selectedGroups}
              hidePast={hidePast}
            />

            <Legend groups={activeEvent.runGroups} />
          </>
        )}

        {view === 'map' && (
          activeEvent.mapImage ? (
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <img
                src={activeEvent.mapImage}
                alt={`${activeEvent.name} track map`}
                className="block w-full h-auto"
              />
            </div>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-400 shadow-sm">
              <div className="text-center">
                <Map size={40} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Track map coming soon</p>
              </div>
            </div>
          )
        )}

      </div>
      <div className="pb-6 text-center font-mono text-[10px] text-gray-300">
        build {__BUILD_SHA__}
      </div>
    </div>
    </PullToRefresh>
  )
}
