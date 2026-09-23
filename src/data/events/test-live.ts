import { parseScheduleMD } from '../../utils/parseSchedule'
import { todayLocalISO } from '../../utils/time'
import type { EventConfig } from '../../types'
import src from '../fixtures/test-live.md?raw'

// Hidden from the event picker (see EVENTS vs ALL_EVENTS in ./index.ts) —
// reachable only via its unique URL. The schedule below runs a full day
// (including pre-dawn and after-hours sessions) so there's always
// something "current" to look at; the day's date is overridden to
// today (whatever today is) so it's a standing fixture for testing
// today/live-only UI — the LIVE badge, the
// now-line — without waiting for a real event day.
const parsed = parseScheduleMD('test-live', src)

const event: EventConfig = {
  ...parsed,
  days: parsed.days.map(day => ({ ...day, date: todayLocalISO() })),
}

export default event
