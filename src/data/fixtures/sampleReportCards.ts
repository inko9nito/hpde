import type { EventEvaluation } from '../../utils/evaluation'

// The sample laps' driver's two report cards (#350), from the same track
// history sheet: the Blue run group's cards from Nov 3 and Dec 7, 2024, at
// the events added for them (#373). The notes function fills them into
// that driver's own account once, so Blue's card and its skills wheel have
// cards to show (see ensureOwnReportCards).
//
// Scores and fields only: this repository is public, so the instructors'
// names and their notes stay out of it. Add those in the app.
export const SAMPLE_REPORT_CARDS: readonly { eventId: string; evaluation: EventEvaluation }[] = [
  {
    eventId: '2024-11-02_tde-at-msrc-3-1-ccw',
    evaluation: {
      card: 'blue',
      instructed: 'fullTime',
      car: 'Porsche Cayman GTS',
      escTc: 'Comp Mode',
      next: { sameTrack: 'Blue', newDirection: 'Blue', newTrack: 'Blue' },
      nextHow: { sameTrack: 'fullTime', newDirection: 'fullTime', newTrack: 'fullTime' },
      skills: {
        flags: 65, passing: 95, inputs: 95, references: 80, consistency: 95,
        carControl: 95, exits: 80, carAids: 95, pace: 95, offline: 95,
      },
      aggressivenessIsSkill: true,
      // "Never".
      carAidsPct: 0,
      soloQualified: false,
    },
  },
  {
    eventId: '2024-12-07_tde-at-msrc-1-7-cw',
    evaluation: {
      card: 'blue',
      instructed: 'partTime',
      car: 'Porsche Cayman GTS',
      escTc: 'On',
      // New track: "Blue Part-time Solo or Yellow".
      next: { sameTrack: 'Yellow', newDirection: 'Yellow', newTrack: 'Blue' },
      nextHow: { newTrack: 'partTime' },
      nextOr: { newTrack: 'Yellow' },
      skills: {
        flags: 95, passing: 95, inputs: 80, references: 95, consistency: 80,
        carControl: 95, exits: 95, carAids: 95, pace: 95, offline: 95,
      },
      aggressivenessIsSkill: 'tooAggressive',
      carAidsPct: 25,
      soloQualified: true,
    },
  },
]
