import { todayLocalISO } from '../../utils/time'
import type { EventConfig } from '../../types'

// Hidden from the event picker (see EVENTS vs ALL_EVENTS in ./index.ts) —
// reachable only via its unique URL. Its single day always resolves to
// "today" so it's a standing fixture for testing today/live-only UI
// (the live badge, the past-event banner, etc.) without waiting for a
// real event day.
const today = todayLocalISO()

const event: EventConfig = {
  // A stable id (rather than date-prefixed) so this fixture's URL never
  // changes — its "date" is always today, whenever that is.
  id: 'test-live',
  name: 'Test Event',
  subtitle: 'Test data, not a real event',
  runGroups: [
    { id: 'red', label: 'Red', bgClass: 'bg-runred-500', textClass: 'text-white', description: 'Time Trial' },
    { id: 'green', label: 'Green', bgClass: 'bg-rungreen-500', textClass: 'text-white', description: 'Track Day' },
  ],
  days: [
    {
      id: 'today',
      label: 'Today',
      date: today,
      events: [
        { time: '07:00', type: 'general', label: 'Gates open' },
        { time: '08:00', type: 'general', label: 'Registration / check-in opens' },
        { time: '08:30', type: 'general', label: 'Instructor’s meeting', subtitle: 'In clubhouse' },
        { time: '09:00', type: 'session', sessionNumber: 1, onTrack: ['red'] },
        { time: '09:20', type: 'session', sessionNumber: 1, onTrack: ['green'] },
        { time: '12:00', type: 'lunch', label: 'Lunch break' },
        { time: '13:00', type: 'session', sessionNumber: 2, onTrack: ['red'] },
        { time: '13:20', type: 'session', sessionNumber: 2, onTrack: ['green'] },
        { time: '17:00', type: 'general', label: 'Gates close' },
      ],
    },
  ],
}

export default event
