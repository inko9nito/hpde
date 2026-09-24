import { parseScheduleMD } from '../utils/parseSchedule'
import type { EventConfig } from '../types'

// Made-up events for tests. The real ones live in the events store (#232),
// so the app ships none — tests hand these to <EventsProvider initialEvents>.
const ALPHA = `# Alpha Track Day

- organizer: Test Club
- track: Alpha Raceway
- city: Testville, TX
- configuration: 2.0 mile
- direction: Clockwise
- trackId: msrc-1-7

## groups
red | Red | bg-red-500 | text-white | Advanced
blue | Blue | bg-blue-500 | text-white | Novice

## Saturday | 2026-03-07
07:30 general | Drivers meeting
08:00 session 1 | track: red | class: blue
08:30 session 1 | track: blue
12:00 lunch | Lunch
`

const BRAVO = `# Bravo HPDE

- organizer: Other Club
- track: Bravo Circuit
- city: Elsewhere, TX
- trackId: ecr-2-7

## groups
red | Red | bg-red-500 | text-white

## Sunday | 2026-02-01
08:00 session 1 | track: red
`

// Newest first, as the app lists them.
export const TEST_EVENTS: EventConfig[] = [
  parseScheduleMD('2026-03-07_alpha', ALPHA),
  parseScheduleMD('2026-02-01_bravo', BRAVO),
]
