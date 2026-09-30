import { buildEvent } from './newEvent.mjs'
import { applySchedule, deriveGroups, suggestColor } from '../../src/utils/scheduleEditor.ts'

// Past events added once, after the fact (#310), so laps from them have
// somewhere to go. Without the organizer's schedule, one lists only the
// sessions of the one run group we know about, at the times its laps
// started (to the 5 minutes before), numbered in order. Oct 4–5 has the
// organizer's schedule now (#339; see ensurePastSchedules).
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
    // The organizer's schedule (#339), in place of the one run group's
    // sessions it was added with; its groups in the order they go out.
    groups: ['Instructors', 'Red', 'Green', 'Yellow', 'Blue'],
    schedule: `## Saturday | 2025-10-04
6:30 AM general | Track gates open
7:15 AM general | Drivers sign in | 7:15 – 7:45 AM
7:30 AM general | Instructor meeting | Upstairs, clubhouse
8:00 AM general | Drivers meeting | Downstairs, clubhouse
8:30 AM general | Track goes hot | Times may vary

8:30 AM session 1 | track: Instructors | class: Green
8:55 AM session 1 | track: Red | class: Blue
9:20 AM session 1 | track: Green
9:45 AM session 1 | track: Yellow | class: Green
10:10 AM session 1 | track: Blue | class: Yellow, Red
break | Break (5 min)
10:40 AM session 2 | track: Instructors
11:05 AM session 2 | track: Red
11:30 AM session 2 | track: Green
11:55 AM session 2 | track: Yellow | class: Green
12:20 PM session 2 | track: Blue

12:45 PM lunch | Lunch / Lead-follow laps

1:15 PM session 3 | track: Red | class: Blue | note: Change in order
1:40 PM session 3 | track: Green
2:05 PM session 3 | track: Yellow | class: Green
2:30 PM session 3 | track: Blue | class: Yellow, Red
2:55 PM session 3 | track: Instructors
break | Break (5 min)
3:25 PM session 4 | track: Red
3:50 PM session 4 | track: Green
4:15 PM session 4 | track: Yellow
4:40 PM session 4 | track: Blue
5:05 PM session 4 | track: Instructors | note: Change in order
5:30 PM general | Track cold

## Sunday | 2025-10-05
6:30 AM general | Track gates open
7:10 AM general | Church service
7:30 AM general | Instructor meeting
8:00 AM general | Drivers meeting
8:30 AM general | Track goes hot | Times may vary

8:30 AM session 1 | track: Instructors | class: Green
8:55 AM session 1 | track: Red | class: Blue
9:20 AM session 1 | track: Green
9:45 AM session 1 | track: Yellow | class: Green
10:10 AM session 1 | track: Blue | class: Yellow, Red
break | Break (5 min)
10:40 AM session 2 | track: Instructors
11:05 AM session 2 | track: Red
11:30 AM session 2 | track: Green
11:55 AM session 2 | track: Yellow
12:20 PM session 2 | track: Blue

12:45 PM lunch | Lunch / Lead-follow laps

1:15 PM session 3 | track: Instructors
1:40 PM session 3 | track: Red | class: Blue
2:05 PM session 3 | track: Green
2:30 PM session 3 | track: Yellow | class: Green
2:55 PM session 3 | track: Blue | class: Yellow, Red
break | Break (5 min)
3:25 PM session 4 | track: Red
3:45 PM session 4 | track: Green
4:05 PM session 4 | track: Yellow
4:30 PM session 4 | track: Blue
`,
  },
]

// Set once the past events have been written into a store.
export const IMPORTED_KEY = 'imported-past-events'

/** The past events as stored: built and checked like the app's own. */
export function buildPastEvents() {
  return PAST_EVENTS.map(({ details, groups = [], schedule }) => {
    const built = buildEvent(details)
    if (built.error) throw new Error(`${details.name}: ${built.error}`)
    // Named groups keep the order given, and take an id from their name.
    const order = groups.map(label => ({ id: label.toLowerCase(), label, bgClass: suggestColor(label) }))
    const result = applySchedule(built.event, deriveGroups(schedule, order), schedule)
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

// The past events whose schedule was filled in after they were added, and
// the issue that did it: a store that already has one of them gets the new
// schedule once (see ensurePastSchedules).
export const SCHEDULES_ADDED = [{ id: '2025-10-04_tde-at-ecr-2-7-ccw', issue: 339 }]

// Set once a store's event has had its schedule added.
export const scheduleAddedKey = ({ id, issue }) => `past-schedule:${id}:${issue}`

/**
 * Gives a past event already in the store the organizer's schedule found
 * since (SCHEDULES_ADDED), once: its run groups and days, the rest as it
 * is — kept first in the history store, as an edit in the app would be.
 * Only while it's as it was added: one edited in the app since keeps its
 * edits, and one deleted stays deleted. The record of it lists which.
 */
export async function ensurePastSchedules(stores) {
  const built = new Map(buildPastEvents().map(e => [e.id, e]))
  for (const added of SCHEDULES_ADDED) {
    const { id } = added
    const doneKey = scheduleAddedKey(added)
    if (await stores.meta.get(doneKey, { type: 'json' })) continue
    const at = new Date().toISOString()
    const current = await stores.events.get(id, { type: 'json' })
    const { runGroups, days } = built.get(id)
    let outcome = 'missing'
    if (current?.updatedAt) outcome = 'edited'
    else if (current && JSON.stringify([current.runGroups, current.days]) === JSON.stringify([runGroups, days])) outcome = 'current'
    else if (current) {
      await stores.history.setJSON(`${id}/${at}`, current)
      await stores.events.setJSON(id, { ...current, runGroups, days, scheduleAddedAt: at })
      outcome = 'updated'
    }
    await stores.meta.setJSON(doneKey, { at, outcome })
  }
}
