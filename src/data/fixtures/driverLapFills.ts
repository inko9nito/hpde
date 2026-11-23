import { sessionKey } from '../../utils/lapTimes'
import type { Lap, SessionLaps } from '../../utils/lapTimes'

// Laps filled into one driver's own account, once, from their lap timer's
// screens — sessions they asked to have added for them rather than paste
// one at a time. The laps function adds each fill the first time that
// driver's laps are used (see ensureLapFills there); a session they already
// have is kept as it is, and laps removed afterwards stay removed.
//
// A driver is named by the SHA-256 of their sign-in email (lowercased), as
// the sample laps' driver is, so the address isn't written here.

export interface LapFill {
  /** Names the fill in the record that it was done: one per driver per id. */
  id: string
  emailSha256: string
  eventId: string
  sessions: Record<string, SessionLaps>
}

type FillSession = Omit<SessionLaps, 'key'> & { laps: Lap[] }

function fill(id: string, emailSha256: string, eventId: string, sessions: FillSession[]): LapFill {
  return {
    id,
    emailSha256,
    eventId,
    sessions: Object.fromEntries(sessions.map(s => {
      const key = sessionKey(s.date, s.time, s.group)
      return [key, { key, ...s }]
    })),
  }
}

/**
 * TDE at MSR 3.1 CCW, Green: Saturday's sessions 1 and 2 and Sunday's
 * session 1, from the timer's lap tables. Its start times (9:21, 11:32 and
 * 9:24 AM) put each in the Green session that starts just before. Saturday
 * session 1's second lap is one the timer left out of its count; it's an
 * in lap here, so it stays out of the best and the average too. The
 * lead-follow laps at lunch have no run group's session to go in, and are
 * left out.
 */
const MSR_NOV_2026 = fill(
  'msr-3-1-ccw-2026-11',
  'c272af4f63ed8df38c2d77bf1078a9a4886ecafbf22cdb1d5cc0968ee696ed20',
  '2026-11-20_tde-at-msr-3-1-ccw',
  [
    {
      date: '2026-11-21', time: '09:20', group: 'green', sessionNumber: 1,
      laps: [
        { ms: 233_160 },
        { ms: 338_570, kind: 'in', note: 'Left out by the lap timer' },
        { ms: 220_960 },
        { ms: 221_830 },
      ],
    },
    {
      date: '2026-11-21', time: '11:30', group: 'green', sessionNumber: 2,
      laps: [
        { ms: 193_930 },
        { ms: 194_880 },
        { ms: 179_130 },
        { ms: 177_630 },
        { ms: 180_370 },
        { ms: 184_890 },
      ],
    },
    {
      date: '2026-11-22', time: '09:20', group: 'green', sessionNumber: 1,
      laps: [
        { ms: 187_800 },
        { ms: 180_360 },
        { ms: 180_170 },
        { ms: 175_900 },
        { ms: 172_430 },
        { ms: 188_930 },
      ],
    },
  ],
)

export const LAP_FILLS: LapFill[] = [MSR_NOV_2026]
