import { sessionKey } from '../../utils/lapTimes'
import type { Lap, SessionLaps } from '../../utils/lapTimes'

// The test account's laps (#309): what an admin sees after "Switch to test
// account" in the menu. Anonymous sample laps from a lap timer, each with
// its top and average speed (#298), in the Orange (Yellow in Nov 2025)
// sessions of five events. A one-time fill for testing, not kept in step
// with anything.
//
// The laps function writes these into the test account the first time it's
// used, and again whenever TEST_ACCOUNT_VERSION goes up — so bump it after
// changing anything here.
export const TEST_ACCOUNT_VERSION = 1

interface FixtureEvent {
  eventId: string
  sessions: (Omit<SessionLaps, 'key' | 'laps'> & { laps: Lap[] })[]
}

const EVENTS: FixtureEvent[] = [
  {
    eventId: '2025-11-07_msrc-3-1',
    sessions: [
      {
        date: '2025-11-08', time: '09:45', group: 'yellow', sessionNumber: 1,
        laps: [
          { ms: 192915, topMph: 105.0, avgMph: 56.4 },
          { ms: 289638, topMph: 108.7, avgMph: 40.0, kind: 'in' },
          { ms: 157616, topMph: 109.0, avgMph: 68.9 },
          { ms: 167981, topMph: 109.5, avgMph: 64.7 },
          { ms: 189381, topMph: 87.8, avgMph: 57.4 },
        ],
      },
      {
        date: '2025-11-08', time: '11:55', group: 'yellow', sessionNumber: 2,
        laps: [
          { ms: 158092, topMph: 108.8, avgMph: 68.7 },
          { ms: 156933, topMph: 108.0, avgMph: 69.1 },
          { ms: 154505, topMph: 109.7, avgMph: 70.3 },
          { ms: 156665, topMph: 110.1, avgMph: 69.4 },
          { ms: 156963, topMph: 109.8, avgMph: 69.2 },
          { ms: 164529, topMph: 109.7, avgMph: 66.1 },
          { ms: 158657, topMph: 109.1, avgMph: 68.5 },
          { ms: 183121, topMph: 106.4, avgMph: 59.5 },
        ],
      },
      {
        date: '2025-11-08', time: '14:05', group: 'yellow', sessionNumber: 3,
        laps: [
          { ms: 167594, topMph: 109.2, avgMph: 64.6 },
          { ms: 160710, topMph: 109.2, avgMph: 67.5 },
          { ms: 156537, topMph: 109.4, avgMph: 69.3 },
          { ms: 160102, topMph: 109.4, avgMph: 67.9 },
          { ms: 212985, topMph: 107.6, avgMph: 51.1 },
        ],
      },
      {
        date: '2025-11-09', time: '09:45', group: 'yellow', sessionNumber: 1,
        laps: [
          { ms: 173304, topMph: 106.8, avgMph: 62.5 },
          { ms: 168743, topMph: 105.3, avgMph: 64.2 },
          { ms: 162793, topMph: 109.6, avgMph: 66.6 },
          { ms: 180795, topMph: 109.5, avgMph: 60.1 },
          { ms: 169006, topMph: 107.6, avgMph: 64.3 },
          { ms: 172890, topMph: 105.0, avgMph: 62.8 },
        ],
      },
      {
        date: '2025-11-09', time: '11:55', group: 'yellow', sessionNumber: 2,
        laps: [
          { ms: 151948, topMph: 113.5, avgMph: 71.3 },
          { ms: 149226, topMph: 117.1, avgMph: 72.7 },
          { ms: 149481, topMph: 114.2, avgMph: 72.6 },
          { ms: 160035, topMph: 115.3, avgMph: 67.9 },
          { ms: 150607, topMph: 115.7, avgMph: 72.0 },
          { ms: 151210, topMph: 114.2, avgMph: 71.8 },
          { ms: 184439, topMph: 115.7, avgMph: 59.0 },
        ],
      },
      {
        date: '2025-11-09', time: '14:30', group: 'yellow', sessionNumber: 3,
        laps: [
          { ms: 151915, topMph: 113.1, avgMph: 71.3 },
          { ms: 157305, topMph: 113.9, avgMph: 69.0 },
        ],
      },
      {
        date: '2025-11-09', time: '16:05', group: 'yellow', sessionNumber: 4,
        laps: [
          { ms: 152667, topMph: 116.0, avgMph: 71.1 },
          { ms: 153355, topMph: 111.8, avgMph: 70.8 },
          { ms: 153190, topMph: 114.4, avgMph: 70.8 },
          { ms: 152996, topMph: 111.9, avgMph: 70.9 },
          { ms: 151988, topMph: 114.9, avgMph: 71.5 },
          { ms: 180688, topMph: 113.5, avgMph: 60.2 },
        ],
      },
    ],
  },
  {
    eventId: '2026-05-30_ecr-2-7',
    sessions: [
      {
        date: '2026-05-30', time: '09:50', group: 'orange', sessionNumber: 1,
        laps: [
          { ms: 163228, topMph: 107.5, avgMph: 58.1 },
          { ms: 153659, topMph: 104.7, avgMph: 61.7 },
          { ms: 146443, topMph: 99.2, avgMph: 64.7 },
          { ms: 152217, topMph: 97.7, avgMph: 62.1 },
          { ms: 164854, topMph: 113.7, avgMph: 57.8, kind: 'in' },
          { ms: 164470, topMph: 102.8, avgMph: 57.5 },
          { ms: 146414, topMph: 107.9, avgMph: 64.7 },
        ],
      },
      {
        date: '2026-05-30', time: '11:45', group: 'orange', sessionNumber: 2,
        laps: [
          { ms: 147296, topMph: 112.1, avgMph: 64.3 },
          { ms: 142155, topMph: 107.2, avgMph: 66.6 },
          { ms: 138096, topMph: 115.0, avgMph: 68.5 },
          { ms: 140794, topMph: 105.9, avgMph: 67.1 },
          { ms: 140566, topMph: 108.0, avgMph: 67.2 },
          { ms: 139366, topMph: 113.6, avgMph: 67.8 },
          { ms: 139711, topMph: 106.4, avgMph: 67.7 },
          { ms: 148876, topMph: 104.7, avgMph: 63.4 },
        ],
      },
      {
        date: '2026-05-30', time: '14:00', group: 'orange', sessionNumber: 3,
        laps: [
          { ms: 135743, topMph: 113.3, avgMph: 69.6 },
          { ms: 213190, topMph: 104.2, avgMph: 44.9, kind: 'in' },
          { ms: 153205, topMph: 108.2, avgMph: 61.8 },
          { ms: 139977, topMph: 105.3, avgMph: 67.4 },
          { ms: 137325, topMph: 111.7, avgMph: 68.8 },
          { ms: 138118, topMph: 109.3, avgMph: 68.4 },
          { ms: 138922, topMph: 112.1, avgMph: 68.0 },
          { ms: 147529, topMph: 103.0, avgMph: 64.2 },
        ],
      },
    ],
  },
  {
    eventId: '2026-06-06_msrc-1-7',
    sessions: [
      {
        date: '2026-06-06', time: '08:50', group: 'orange', sessionNumber: 1,
        laps: [
          { ms: 117885, topMph: 91.9, avgMph: 52.6 },
          { ms: 111035, topMph: 100.9, avgMph: 55.8 },
          { ms: 108047, topMph: 100.8, avgMph: 57.5 },
          { ms: 99120, topMph: 106.2, avgMph: 62.4 },
          { ms: 98200, topMph: 107.1, avgMph: 63.2 },
          { ms: 99546, topMph: 105.4, avgMph: 62.3 },
          { ms: 98197, topMph: 104.6, avgMph: 63.1 },
          { ms: 101915, topMph: 98.6, avgMph: 60.9 },
          { ms: 102048, topMph: 101.9, avgMph: 60.8 },
          { ms: 117796, topMph: 104.9, avgMph: 52.8 },
        ],
      },
      {
        date: '2026-06-06', time: '10:10', group: 'orange', sessionNumber: 2,
        laps: [
          { ms: 94596, topMph: 102.1, avgMph: 65.2 },
          { ms: 91823, topMph: 106.9, avgMph: 67.4 },
          { ms: 88509, topMph: 109.7, avgMph: 69.8 },
          { ms: 89881, topMph: 109.8, avgMph: 68.6 },
          { ms: 92780, topMph: 110.1, avgMph: 66.4 },
          { ms: 94289, topMph: 103.6, avgMph: 65.2 },
          { ms: 87797, topMph: 107.4, avgMph: 70.2 },
          { ms: 89013, topMph: 107.6, avgMph: 69.4 },
          { ms: 88053, topMph: 109.3, avgMph: 70.3 },
          { ms: 91181, topMph: 109.2, avgMph: 67.6 },
          { ms: 88132, topMph: 109.3, avgMph: 70.1 },
          { ms: 91233, topMph: 109.9, avgMph: 67.9 },
          { ms: 87825, topMph: 109.2, avgMph: 70.2 },
          { ms: 87751, topMph: 109.3, avgMph: 70.4 },
          { ms: 116036, topMph: 110.3, avgMph: 53.5 },
        ],
      },
      {
        date: '2026-06-06', time: '11:30', group: 'orange', sessionNumber: 3,
        laps: [
          { ms: 96246, topMph: 110.9, avgMph: 64.2 },
          { ms: 85360, topMph: 113.1, avgMph: 72.5 },
          { ms: 84603, topMph: 110.0, avgMph: 72.9 },
          { ms: 85027, topMph: 111.6, avgMph: 72.6 },
          { ms: 84067, topMph: 113.1, avgMph: 73.4 },
          { ms: 86561, topMph: 112.4, avgMph: 71.5 },
          { ms: 85049, topMph: 112.6, avgMph: 72.6 },
          { ms: 84960, topMph: 112.1, avgMph: 72.7 },
          { ms: 93850, topMph: 112.6, avgMph: 66.2 },
          { ms: 94075, topMph: 110.0, avgMph: 65.7 },
          { ms: 85891, topMph: 110.0, avgMph: 71.8 },
          { ms: 88054, topMph: 112.0, avgMph: 70.2 },
          { ms: 84757, topMph: 110.4, avgMph: 73.0 },
          { ms: 92306, topMph: 111.0, avgMph: 67.1 },
          { ms: 92547, topMph: 106.9, avgMph: 66.7 },
          { ms: 89077, topMph: 108.3, avgMph: 69.4 },
          { ms: 85288, topMph: 111.0, avgMph: 72.4 },
          { ms: 87525, topMph: 110.7, avgMph: 70.6 },
          { ms: 84866, topMph: 109.8, avgMph: 72.8 },
          { ms: 85280, topMph: 112.4, avgMph: 72.4 },
          { ms: 88712, topMph: 108.2, avgMph: 69.6 },
          { ms: 113739, topMph: 100.0, avgMph: 54.4 },
        ],
      },
      {
        date: '2026-06-06', time: '13:35', group: 'orange', sessionNumber: 4,
        laps: [
          { ms: 121224, topMph: 75.6, avgMph: 50.8 },
          { ms: 102981, topMph: 98.1, avgMph: 59.8 },
          { ms: 95484, topMph: 100.2, avgMph: 64.5 },
          { ms: 93303, topMph: 100.6, avgMph: 65.9 },
          { ms: 94255, topMph: 102.9, avgMph: 65.4 },
          { ms: 91597, topMph: 102.3, avgMph: 67.3 },
          { ms: 89891, topMph: 101.1, avgMph: 68.3 },
          { ms: 91895, topMph: 99.8, avgMph: 66.8 },
          { ms: 89757, topMph: 102.4, avgMph: 68.6 },
          { ms: 90165, topMph: 101.8, avgMph: 68.3 },
          { ms: 92256, topMph: 98.2, avgMph: 66.9 },
          { ms: 89162, topMph: 103.0, avgMph: 69.2 },
          { ms: 90975, topMph: 100.8, avgMph: 68.0 },
          { ms: 93299, topMph: 98.0, avgMph: 66.1 },
          { ms: 136736, topMph: 98.7, avgMph: 43.6, kind: 'in' },
        ],
      },
    ],
  },
  {
    eventId: '2026-09-11_msrc-1-7',
    sessions: [
      {
        date: '2026-09-12', time: '09:30', group: 'orange', sessionNumber: 1,
        laps: [
          { ms: 119230, topMph: 80.6, avgMph: 51.7 },
          { ms: 104394, topMph: 90.0, avgMph: 59.0 },
          { ms: 99473, topMph: 93.1, avgMph: 61.9 },
          { ms: 89188, topMph: 102.7, avgMph: 69.2 },
          { ms: 91790, topMph: 103.7, avgMph: 67.3 },
          { ms: 88674, topMph: 103.5, avgMph: 69.5 },
          { ms: 88503, topMph: 104.0, avgMph: 69.6 },
          { ms: 91843, topMph: 101.5, avgMph: 67.2 },
          { ms: 91760, topMph: 103.3, avgMph: 67.2 },
          { ms: 92154, topMph: 100.2, avgMph: 67.0 },
          { ms: 99432, topMph: 102.5, avgMph: 62.1 },
          { ms: 101599, topMph: 100.8, avgMph: 60.6 },
          { ms: 90403, topMph: 103.4, avgMph: 68.2 },
          { ms: 91524, topMph: 102.5, avgMph: 67.4 },
          { ms: 128493, topMph: 98.8, avgMph: 46.5, kind: 'in' },
        ],
      },
      {
        date: '2026-09-12', time: '11:15', group: 'orange', sessionNumber: 2,
        laps: [
          { ms: 87753, topMph: 101.1, avgMph: 70.2 },
          { ms: 91543, topMph: 101.0, avgMph: 67.5 },
          { ms: 88758, topMph: 101.6, avgMph: 69.6 },
          { ms: 90042, topMph: 99.4, avgMph: 68.6 },
          { ms: 89011, topMph: 100.6, avgMph: 69.5 },
          { ms: 91686, topMph: 98.8, avgMph: 67.5 },
          { ms: 91613, topMph: 98.8, avgMph: 67.4 },
          { ms: 90101, topMph: 99.6, avgMph: 68.4 },
          { ms: 90264, topMph: 100.0, avgMph: 68.4 },
          { ms: 92634, topMph: 100.3, avgMph: 66.4 },
          { ms: 132355, topMph: 101.4, avgMph: 45.2, kind: 'in' },
        ],
      },
      {
        date: '2026-09-12', time: '13:50', group: 'orange', sessionNumber: 3,
        laps: [
          { ms: 114251, topMph: 83.9, avgMph: 54.0 },
          { ms: 93034, topMph: 102.0, avgMph: 66.2 },
          { ms: 89329, topMph: 103.7, avgMph: 69.1 },
          { ms: 87285, topMph: 104.5, avgMph: 70.7 },
          { ms: 91170, topMph: 102.1, avgMph: 67.5 },
          { ms: 90909, topMph: 101.8, avgMph: 67.9 },
          { ms: 90198, topMph: 103.0, avgMph: 68.3 },
          { ms: 88312, topMph: 102.5, avgMph: 69.8 },
          { ms: 89844, topMph: 102.2, avgMph: 68.6 },
          { ms: 88711, topMph: 101.6, avgMph: 69.6 },
          { ms: 90531, topMph: 100.3, avgMph: 68.1 },
          { ms: 90655, topMph: 102.4, avgMph: 68.1 },
          { ms: 87752, topMph: 101.9, avgMph: 70.3 },
          { ms: 88568, topMph: 103.3, avgMph: 69.8 },
          { ms: 87509, topMph: 103.2, avgMph: 70.6 },
          { ms: 140328, topMph: 102.7, avgMph: 42.6, kind: 'in' },
        ],
      },
    ],
  },
  {
    eventId: '2026-09-13_msr-scca',
    sessions: [
      {
        date: '2026-09-13', time: '09:30', group: 'orange', sessionNumber: 1,
        laps: [
          { ms: 100071, topMph: 92.0, avgMph: 61.7 },
          { ms: 88551, topMph: 102.3, avgMph: 69.6 },
          { ms: 86989, topMph: 103.5, avgMph: 70.8 },
          { ms: 86780, topMph: 103.9, avgMph: 70.9 },
          { ms: 87715, topMph: 103.5, avgMph: 70.1 },
          { ms: 87759, topMph: 103.9, avgMph: 70.1 },
          { ms: 88261, topMph: 102.6, avgMph: 69.4 },
          { ms: 85729, topMph: 103.1, avgMph: 71.6 },
          { ms: 86457, topMph: 103.6, avgMph: 71.2 },
          { ms: 89227, topMph: 103.0, avgMph: 69.0 },
          { ms: 88255, topMph: 101.7, avgMph: 69.7 },
          { ms: 90302, topMph: 101.5, avgMph: 68.3 },
          { ms: 191014, topMph: 102.8, avgMph: 31.7, kind: 'in' },
        ],
      },
      {
        date: '2026-09-13', time: '11:25', group: 'orange', sessionNumber: 2,
        laps: [
          { ms: 115977, topMph: 87.4, avgMph: 52.9 },
          { ms: 91687, topMph: 104.0, avgMph: 67.0 },
          { ms: 90375, topMph: 105.0, avgMph: 68.1 },
          { ms: 84072, topMph: 106.3, avgMph: 73.0 },
          { ms: 89014, topMph: 106.2, avgMph: 69.1 },
          { ms: 84150, topMph: 104.8, avgMph: 73.1 },
          { ms: 84364, topMph: 106.2, avgMph: 73.0 },
          { ms: 86357, topMph: 105.2, avgMph: 71.1 },
          { ms: 84435, topMph: 105.9, avgMph: 72.9 },
          { ms: 84241, topMph: 105.5, avgMph: 73.0 },
          { ms: 85927, topMph: 104.2, avgMph: 71.8 },
          { ms: 128296, topMph: 105.3, avgMph: 46.3, kind: 'in' },
        ],
      },
      {
        date: '2026-09-13', time: '14:10', group: 'orange', sessionNumber: 3,
        laps: [
          { ms: 85468, topMph: 105.3, avgMph: 71.9 },
          { ms: 141350, topMph: 106.6, avgMph: 44.6, kind: 'in' },
          { ms: 94341, topMph: 101.5, avgMph: 65.3 },
          { ms: 86848, topMph: 103.4, avgMph: 70.8 },
          { ms: 85303, topMph: 105.1, avgMph: 72.3 },
          { ms: 85188, topMph: 105.5, avgMph: 72.3 },
          { ms: 86834, topMph: 103.7, avgMph: 71.0 },
          { ms: 88248, topMph: 105.2, avgMph: 69.8 },
          { ms: 86013, topMph: 105.0, avgMph: 71.8 },
          { ms: 135367, topMph: 103.5, avgMph: 44.1, kind: 'in' },
        ],
      },
      {
        date: '2026-09-13', time: '16:05', group: 'orange', sessionNumber: 4,
        laps: [
          { ms: 85857, topMph: 104.9, avgMph: 71.7 },
          { ms: 85930, topMph: 105.7, avgMph: 71.6 },
          { ms: 86659, topMph: 104.7, avgMph: 71.1 },
          { ms: 85780, topMph: 105.0, avgMph: 71.9 },
          { ms: 85797, topMph: 105.1, avgMph: 71.9 },
          { ms: 85542, topMph: 105.1, avgMph: 72.2 },
          { ms: 86165, topMph: 105.1, avgMph: 71.5 },
          { ms: 86220, topMph: 105.8, avgMph: 71.5 },
          { ms: 86316, topMph: 105.0, avgMph: 71.4 },
          { ms: 86663, topMph: 105.0, avgMph: 71.2 },
          { ms: 133721, topMph: 105.3, avgMph: 44.7, kind: 'in' },
        ],
      },
    ],
  },
]

/** Each event's record, as the laps function stores it. */
export const TEST_ACCOUNT_LAPS: { eventId: string; sessions: Record<string, SessionLaps> }[] = EVENTS.map(event => ({
  eventId: event.eventId,
  sessions: Object.fromEntries(event.sessions.map(s => {
    const key = sessionKey(s.date, s.time, s.group)
    return [key, { key, ...s }]
  })),
}))
