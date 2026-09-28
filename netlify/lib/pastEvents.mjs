import { buildEvent } from './newEvent.mjs'
import { applySchedule, deriveGroups } from '../../src/utils/scheduleEditor.ts'

// Past events added once, after the fact (#310), so laps from them have
// somewhere to go. There's no organizer's schedule for them: each lists
// only the sessions of the one run group we know about, at the times its
// laps started (to the 5 minutes before), numbered in order.
//
// Written into the events store the first time the events are read (see
// ensurePastEvents), the way the repo's events were imported in #252 —
// then they're events like any other: edit or delete them in the app.
export const PAST_EVENTS = [
  {
    details: {
      name: 'TDE at ECR 2.7 CW', startDate: '2025-07-19',
      organizer: 'The Drivers Edge', track: 'Eagles Canyon Raceway', city: 'Decatur, TX',
      configuration: '2.7 mile', direction: 'Clockwise', trackId: 'ecr-2-7',
    },
    schedule: `## Saturday | 2025-07-19
9:20 AM session 1 | track: Orange
1:00 PM session 2 | track: Orange
3:25 PM session 3 | track: Orange
`,
  },
  {
    details: {
      name: 'TDE at MSRC 1.7 CCW', startDate: '2025-09-13',
      organizer: 'The Drivers Edge', track: 'Motorsport Ranch - Cresson', city: 'Cresson, TX',
      configuration: '1.7 mile', direction: 'Counter-clockwise', trackId: 'msrc-1-7',
    },
    schedule: `## Saturday | 2025-09-13
9:20 AM session 1 | track: Orange
11:10 AM session 2 | track: Orange
1:30 PM session 3 | track: Orange
3:15 PM session 4 | track: Orange
4:25 PM session 5 | track: Orange
`,
  },
  {
    details: {
      name: 'TDE at ECR 2.7 CCW', startDate: '2025-10-04', endDate: '2025-10-05',
      organizer: 'The Drivers Edge', track: 'Eagles Canyon Raceway', city: 'Decatur, TX',
      configuration: '2.7 mile', direction: 'Counter-clockwise', trackId: 'ecr-2-7',
    },
    schedule: `## Saturday | 2025-10-04
10:10 AM session 1 | track: Blue
12:25 PM session 2 | track: Blue
2:30 PM session 3 | track: Blue
4:40 PM session 4 | track: Blue

## Sunday | 2025-10-05
12:20 PM session 1 | track: Blue
2:55 PM session 2 | track: Blue
4:25 PM session 3 | track: Blue
`,
  },
]

// Set once the past events have been written into a store.
export const IMPORTED_KEY = 'imported-past-events'

/** The past events as stored: built and checked like the app's own. */
export function buildPastEvents() {
  return PAST_EVENTS.map(({ details, schedule }) => {
    const built = buildEvent(details)
    if (built.error) throw new Error(`${details.name}: ${built.error}`)
    const result = applySchedule(built.event, deriveGroups(schedule, []), schedule)
    if ('error' in result) throw new Error(`${details.name}: ${result.error}`)
    return result.event
  })
}

/**
 * Writes the past events into the store the first time it's used — each
 * only if its id is new — and records that it did, so one deleted
 * afterwards doesn't come back. A preview's store gets them after its
 * copy of the live events (ensureCopied), as the live site will.
 */
export async function ensurePastEvents(stores) {
  if (await stores.meta.get(IMPORTED_KEY, { type: 'json' })) return
  const importedAt = new Date().toISOString()
  const imported = []
  for (const event of buildPastEvents()) {
    const { modified } = await stores.events.setJSON(event.id, { ...event, importedAt }, { onlyIfNew: true })
    if (modified) imported.push(event.id)
  }
  await stores.meta.setJSON(IMPORTED_KEY, { at: importedAt, imported })
}
