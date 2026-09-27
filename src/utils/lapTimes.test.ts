import { describe, it, expect } from 'vitest'
import {
  parseLapTimes,
  formatLapTime,
  formatAverage,
  lapStats,
  lapLabels,
  lapsToText,
  cleanSessionLaps,
  sessionKey,
} from './lapTimes'

const ms = (text: string) => parseLapTimes(text).laps.map(l => l.ms)

// Shaped like a driver's own timing sheet (#210), copied out of Google
// Sheets: a title, a description, a header, the laps and a summary row,
// tab-separated. The times and notes are made up.
const SHEET_SESSION = [
  'SESSION 2 — Started 11:46:32 AM\t\t\t\t',
  'Outlap began behind a slow car; passed it on the back straight.\t\t\t\t',
  'Lap\tStart Crossing\tFinish Crossing\tLap Time\tNotes',
  'Out\t11:46:32 AM\t11:48:51 AM\t2:19\tOutlap — traffic the whole lap',
  '1\t11:48:51 AM\t11:50:47 AM\t1:56\tPassed on the back straight',
  '2\t11:50:47 AM\t11:52:31 AM\t1:44\t',
  '3\t11:52:31 AM\t11:54:16 AM\t1:45\tTraffic',
  '\t\t\t\tMore laps can be added here',
  'Laps\t3\tBest\t1:44\tAverage: 1:48.3',
].join('\n')

describe('parseLapTimes (#210)', () => {
  it('reads a comma-separated list', () => {
    expect(ms('1:39.42, 1:38.91, 1:39.08')).toEqual([99_420, 98_910, 99_080])
  })

  it('reads a column, with blank lines and stray spaces', () => {
    expect(ms('1:56\n\n 1:48 \n1:49\r\n')).toEqual([116_000, 108_000, 109_000])
  })

  it('reads a list separated by spaces, semicolons or bars', () => {
    expect(ms('1:39.42 1:38.91')).toEqual([99_420, 98_910])
    expect(ms('1:39.42; 1:38.91')).toEqual([99_420, 98_910])
    expect(ms('1:39.42 | 1:38.91')).toEqual([99_420, 98_910])
  })

  it('reads tenths, thousandths and bare seconds', () => {
    expect(ms('1:51.0, 1:24.123, 58.31, 1:02.5')).toEqual([111_000, 84_123, 58_310, 62_500])
  })

  it('reads a whole session copied from a timing sheet, passing over its title, header and summary', () => {
    const { laps, errors, skipped, summary } = parseLapTimes(SHEET_SESSION)
    expect(errors).toEqual([])
    expect(laps).toEqual([
      { ms: 139_000, kind: 'out', start: '11:46:32 AM', end: '11:48:51 AM', note: 'Outlap — traffic the whole lap' },
      { ms: 116_000, start: '11:48:51 AM', end: '11:50:47 AM', note: 'Passed on the back straight' },
      { ms: 104_000, start: '11:50:47 AM', end: '11:52:31 AM' },
      { ms: 105_000, start: '11:52:31 AM', end: '11:54:16 AM', note: 'Traffic' },
    ])
    expect(skipped.map(s => s.line)).toEqual([1, 3, 8, 9])
    // The words under the title are the session's summary.
    expect(summary).toBe('Outlap began behind a slow car; passed it on the back straight.')
  })

  it('takes every line of words before the laps as the summary', () => {
    const text = 'SESSION 3 — Started ~2:30 PM\nNo outlap included;\tsome laps had traffic.\nTires were hot.\nLap  Start  Finish  Lap Time  Notes\n1  1:42\nLaps  1  Best  1:42'
    expect(parseLapTimes(text).summary).toBe('No outlap included; some laps had traffic. Tires were hot.')
  })

  it('has no summary without words before the laps', () => {
    expect(parseLapTimes('Lap\tTime\n1\t1:42\nGreat session').summary).toBeUndefined()
    expect(parseLapTimes('1:42, 1:44').summary).toBeUndefined()
  })

  it('keeps approximate (~) crossing times as written', () => {
    const { laps, errors } = parseLapTimes('1\t~2:32:44 PM\t~2:34:26 PM\t1:42\t\n2\t~2:34:26 PM\t~2:36:10 PM\t1:44\t')
    expect(errors).toEqual([])
    expect(laps[0]).toEqual({ ms: 102_000, start: '~2:32:44 PM', end: '~2:34:26 PM' })
  })

  it('works out a lap from its crossings when the row has no lap time', () => {
    const { laps, errors } = parseLapTimes('1\t9:52:49 AM\t9:54:45 AM\n2\t9:54:45 AM\t9:56:33 AM\tTied for best')
    expect(errors).toEqual([])
    expect(laps).toEqual([
      { ms: 116_000, start: '9:52:49 AM', end: '9:54:45 AM' },
      { ms: 108_000, start: '9:54:45 AM', end: '9:56:33 AM', note: 'Tied for best' },
    ])
  })

  it('takes the written lap time over the crossings, which may be rounded', () => {
    expect(ms('1\t9:52:49 AM\t9:54:45 AM\t1:55.87')).toEqual([115_870])
  })

  it('reads start/finish pairs, one lap a line', () => {
    const { laps, errors } = parseLapTimes('9:52:49 AM, 9:54:45 AM\n9:54:45 AM, 9:56:33 AM')
    expect(errors).toEqual([])
    expect(laps.map(l => [l.ms, l.start, l.end])).toEqual([
      [116_000, '9:52:49 AM', '9:54:45 AM'],
      [108_000, '9:54:45 AM', '9:56:33 AM'],
    ])
  })

  it('reads a run of crossing times as laps, across noon', () => {
    const { laps, errors } = parseLapTimes('11:57:49 AM\n11:59:30 AM\n12:01:17 PM')
    expect(errors).toEqual([])
    expect(laps).toEqual([
      { ms: 101_000, start: '11:57:49 AM', end: '11:59:30 AM' },
      { ms: 107_000, start: '11:59:30 AM', end: '12:01:17 PM' },
    ])
  })

  it('reads h:mm:ss video timestamps as crossings', () => {
    expect(ms('0:02:13, 0:04:09, 0:05:57.5')).toEqual([116_000, 108_500])
  })

  it('reads m:ss video timestamps that run past any lap as crossings', () => {
    const parsed = parseLapTimes('2:13, 4:09, 5:57, 7:46, 9:35, 11:21')
    expect(parsed.readAs).toBe('timestamps')
    expect(parsed.ambiguous).toBe(true)
    expect(parsed.errors).toEqual([])
    expect(parsed.laps.map(l => l.ms)).toEqual([116_000, 108_000, 109_000, 109_000, 106_000])
  })

  it('reads increasing m:ss values as lap times, but says they could be timestamps', () => {
    const parsed = parseLapTimes('1:40, 1:41, 1:43')
    expect(parsed.readAs).toBe('laps')
    expect(parsed.ambiguous).toBe(true)
    expect(parsed.laps.map(l => l.ms)).toEqual([100_000, 101_000, 103_000])

    const asTimestamps = parseLapTimes('1:40, 1:41, 1:43', 'timestamps')
    expect(asTimestamps.readAs).toBe('timestamps')
    // 1-second gaps are too short for laps.
    expect(asTimestamps.errors).toHaveLength(2)
  })

  it('isn’t ambiguous when the times go up and down', () => {
    const parsed = parseLapTimes('1:40, 1:38, 1:43', 'timestamps')
    expect(parsed.ambiguous).toBe(false)
    expect(parsed.readAs).toBe('laps')
    expect(parsed.laps.map(l => l.ms)).toEqual([100_000, 98_000, 103_000])
  })

  it('marks out and in laps however they’re written', () => {
    const { laps } = parseLapTimes('Out lap\t2:19\nOL\t2:20\n1\t1:44\nIn\t2:30\nin-lap\t2:31')
    expect(laps.map(l => l.kind)).toEqual(['out', 'out', undefined, 'in', 'in'])
  })

  it('reads "Lap 3" and "#3" as lap numbers', () => {
    expect(ms('Lap 3\t1:44\n#4\t1:45\n5.\t1:46')).toEqual([104_000, 105_000, 106_000])
  })

  it('flags what it can’t read, by line, and keeps the rest', () => {
    const { laps, errors } = parseLapTimes('1:39.42, fast, 1:38.91\n1:40\n0:04\n25:00\n1\t\tNo time here')
    expect(laps.map(l => l.ms)).toEqual([100_000])
    expect(errors.map(e => [e.line, e.message])).toEqual([
      [1, 'Couldn’t read “fast” as a time.'],
      [3, '0:04 is too short for a lap.'],
      [4, '25:00 is too long for a lap.'],
      [5, 'No lap time on this line.'],
    ])
  })

  it('flags a mistyped time rather than passing it over', () => {
    const { errors, skipped } = parseLapTimes('1:44\n1:4x\n1;45')
    expect(errors.map(e => e.line)).toEqual([2, 3])
    expect(skipped).toEqual([])
  })

  it('flags a row with two lap times, and crossings that go backwards', () => {
    expect(parseLapTimes('1\t1:44\t1:45').errors[0].message).toBe('More than one lap time on this line.')
    expect(parseLapTimes('9:54:45 AM\n9:52:49 AM').errors[0].message).toBe('This time is before the one above it.')
  })

  it('needs two crossings to make a lap', () => {
    expect(parseLapTimes('9:52:49 AM').errors[0].message).toMatch(/One crossing time isn’t a lap/)
  })

  it('asks for one session at a time', () => {
    const two = `${SHEET_SESSION}\n${SHEET_SESSION.replace('SESSION 2', 'SESSION 3')}`
    expect(parseLapTimes(two).errors.map(e => e.message)).toContain(
      'That looks like more than one session. Paste one session at a time.',
    )
  })

  it('reads nothing from an empty paste', () => {
    expect(parseLapTimes('  \n\n')).toMatchObject({ laps: [], errors: [], skipped: [] })
  })
})

// Laps as a Garmin Catalyst records them (#298), copied from a driver's
// spreadsheet — lap, record class, lap time, top and average speed — with
// its header row. The laps are made up.
const GARMIN_LAPS = [
  'Lap #\tRecord class\tLap time\tTop speed (mph)\tAvg speed (mph)',
  '1\tAveraged lap\t1:40.071\t92.0\t61.7',
  '2\tAveraged lap\t1:28.551\t102.3\t69.6',
  '3\tAveraged lap\t1:26.989\t103.5\t70.8',
].join('\n')

describe('parseLapTimes: speeds (#298)', () => {
  const laps = (text: string) => parseLapTimes(text).laps

  it('reads the top and average speed after a row’s lap time', () => {
    expect(laps('1\t1:40.071\t92.0\t61.7\n2\t1:28.551\t102.3\t69.6')).toEqual([
      { ms: 100_071, topMph: 92, avgMph: 61.7 },
      { ms: 88_551, topMph: 102.3, avgMph: 69.6 },
    ])
    // Whole numbers, and a row split by spaces.
    expect(laps('Out 2:19 88 55\n1 1:56 104 72')).toEqual([
      { ms: 139_000, kind: 'out', topMph: 88, avgMph: 55 },
      { ms: 116_000, topMph: 104, avgMph: 72 },
    ])
  })

  it('reads rows copied from a lap timer’s export, with its header', () => {
    const { laps, errors, skipped } = parseLapTimes(GARMIN_LAPS)
    expect(errors).toEqual([])
    expect(skipped.map(s => s.line)).toEqual([1])
    expect(laps[0]).toEqual({ ms: 100_071, topMph: 92, avgMph: 61.7, note: 'Averaged lap' })
  })

  it('reads laps Garmin numbers -1 and 0 as laps like the rest', () => {
    const { laps, errors } = parseLapTimes([
      'Lap #\tLap time\tTop speed (mph)\tAvg speed (mph)',
      '-1\t1:26.846\t102.2\t70.9',
      '0\t1:24.082\t103.9\t73.1',
      '1\t1:40.071\t92.0\t61.7',
    ].join('\n'))
    expect(errors).toEqual([])
    expect(laps).toEqual([
      { ms: 86_846, topMph: 102.2, avgMph: 70.9 },
      { ms: 84_082, topMph: 103.9, avgMph: 73.1 },
      { ms: 100_071, topMph: 92, avgMph: 61.7 },
    ])
    expect(lapStats(laps).best).toBe(84_082)
  })

  it('takes one speed as the top speed', () => {
    expect(laps('1\t1:56\t104.2\tTraffic')).toEqual([{ ms: 116_000, topMph: 104.2, note: 'Traffic' }])
  })

  it('keeps crossings, speeds and a note apart', () => {
    expect(laps('1\t11:48:51 AM\t11:50:47 AM\t1:56\t104.2\t70.1\tPassed on the back straight')).toEqual([
      { ms: 116_000, start: '11:48:51 AM', end: '11:50:47 AM', topMph: 104.2, avgMph: 70.1, note: 'Passed on the back straight' },
    ])
  })

  it('follows a header that has the average first', () => {
    expect(laps('Lap\tTime\tAvg mph\tTop mph\n1\t1:56\t70.1\t104.2')).toEqual([{ ms: 116_000, topMph: 104.2, avgMph: 70.1 }])
    expect(laps('Lap  Time  Avg  Top\n1  1:56  70.1  104.2')).toEqual([{ ms: 116_000, topMph: 104.2, avgMph: 70.1 }])
    // Only an average named: the one speed is the average.
    expect(laps('Lap\tLap time\tAverage speed\n1\t1:56\t70.1')).toEqual([{ ms: 116_000, avgMph: 70.1 }])
  })

  it('reads a lap time and its speeds without a lap number once a header names them', () => {
    expect(laps('Lap time\tTop speed (mph)\tAvg speed (mph)\n1:40.071\t92.0\t61.7\n1:28.551\t102.3\t69.6')).toEqual([
      { ms: 100_071, topMph: 92, avgMph: 61.7 },
      { ms: 88_551, topMph: 102.3, avgMph: 69.6 },
    ])
  })

  it('reads speeds marked mph anywhere', () => {
    expect(laps('1:56 104.2 mph 70.1mph')).toEqual([{ ms: 116_000, topMph: 104.2, avgMph: 70.1 }])
    expect(laps('1 1:56 104.2 70.1 mph')).toEqual([{ ms: 116_000, topMph: 104.2, avgMph: 70.1 }])
  })

  it('reads a dash as no top speed', () => {
    expect(laps('1\t1:56\t–\t70.1')).toEqual([{ ms: 116_000, avgMph: 70.1 }])
  })

  it('still reads a plain list of lap times, bare seconds included, as laps', () => {
    expect(laps('1:02.3, 59.8, 1:01.4')).toEqual([{ ms: 62_300 }, { ms: 59_800 }, { ms: 61_400 }])
    expect(laps('1:02.3\t59.8\t1:01.4')).toEqual([{ ms: 62_300 }, { ms: 59_800 }, { ms: 61_400 }])
    // A sub-minute lap in a row is still the lap time.
    expect(laps('1\t58.31\t55.2')).toEqual([{ ms: 58_310, topMph: 55.2 }])
  })

  it('keeps a number after the note in the note', () => {
    expect(laps('3 1:56 behind car 21')).toEqual([{ ms: 116_000, note: 'behind car 21' }])
  })

  it('doesn’t take a sentence about speed, or a totals row, as a header', () => {
    const text = 'SESSION 1\nTop speed was down; tires were hot.\nLap\tTime\n1\t1:56\t104\t70\nLaps\t1\tBest\t1:56\tAverage: 1:56'
    const { laps, summary } = parseLapTimes(text)
    expect(summary).toBe('Top speed was down; tires were hot.')
    expect(laps).toEqual([{ ms: 116_000, topMph: 104, avgMph: 70 }])
  })

  it('flags speeds that can’t be right', () => {
    const { laps, errors } = parseLapTimes('1\t1:56\t70.1\t104.2\n2\t1:57\t300\t70\n3\t1:58\t104\t3\n4\t1:59\t104\t70\t69\n5\t2:00\t104\t70')
    expect(errors.map(e => [e.line, e.message])).toEqual([
      [1, 'The average speed is above the top speed.'],
      [2, '300 mph is too fast for a top speed.'],
      [3, '3 mph is too slow for an average speed.'],
      [4, 'More than a top and an average speed on this line.'],
    ])
    expect(laps).toEqual([{ ms: 120_000, topMph: 104, avgMph: 70 }])
  })
})

describe('formatLapTime', () => {
  it('shows whole seconds as m:ss, and fractions as written', () => {
    expect(formatLapTime(116_000)).toBe('1:56')
    expect(formatLapTime(99_420)).toBe('1:39.42')
    expect(formatLapTime(84_123)).toBe('1:24.123')
    expect(formatLapTime(62_500)).toBe('1:02.5')
    expect(formatLapTime(58_310)).toBe('0:58.31')
  })

  it('rounds to a fixed number of decimals, carrying into the minutes', () => {
    expect(formatLapTime(111_000, 1)).toBe('1:51.0')
    expect(formatLapTime(119_960, 1)).toBe('2:00.0')
    expect(formatLapTime(99_137, 2)).toBe('1:39.14')
  })
})

describe('lapStats', () => {
  it('leaves out and in laps out of the best and the average', () => {
    const laps = parseLapTimes(SHEET_SESSION).laps
    const stats = lapStats(laps)
    expect(stats).toEqual({ count: 3, best: 104_000, bestIndex: 2, average: (116_000 + 104_000 + 105_000) / 3 })
    expect(formatAverage(laps, stats.average!)).toBe('1:48.3')
  })

  it('has no best without a lap that counts', () => {
    expect(lapStats([{ ms: 139_000, kind: 'out' }])).toEqual({ count: 0 })
  })

  it('averages to one decimal more than the laps have', () => {
    const laps = parseLapTimes('1:39.42, 1:38.91').laps
    expect(formatAverage(laps, lapStats(laps).average!)).toBe('1:39.165')
  })
})

describe('lapLabels', () => {
  it('numbers the laps that count, and names the rest', () => {
    expect(lapLabels(parseLapTimes(SHEET_SESSION).laps)).toEqual(['Out', '1', '2', '3'])
  })
})

describe('lapsToText', () => {
  it('writes plain laps as a list', () => {
    expect(lapsToText(parseLapTimes('1:39.42\n1:38.91\n1:39.08').laps)).toBe('1:39.42, 1:38.91, 1:39.08')
  })

  it('writes laps with more to them as rows that read back the same', () => {
    const { laps } = parseLapTimes(SHEET_SESSION)
    const text = lapsToText(laps)
    expect(text.split('\n')[0]).toBe('Out\t11:46:32 AM\t11:48:51 AM\t2:19\tOutlap — traffic the whole lap')
    expect(parseLapTimes(text)).toMatchObject({ laps, errors: [], skipped: [] })
  })

  it('round-trips laps with only some of the details', () => {
    const laps = [{ ms: 116_000 }, { ms: 108_000, note: 'Traffic' }, { ms: 109_500, start: '0:05:57' }, { ms: 140_000, kind: 'in' as const }]
    expect(parseLapTimes(lapsToText(laps)).laps).toEqual(laps)
  })

  it('writes speeds after the lap time, and reads them back (#298)', () => {
    const laps = [
      { ms: 139_000, kind: 'out' as const, topMph: 88, avgMph: 55.5, note: 'Traffic' },
      { ms: 116_000, topMph: 104.2 },
      { ms: 108_000, avgMph: 70.1 },
      { ms: 109_000 },
      { ms: 110_000, start: '11:48:51 AM', topMph: 103.9, avgMph: 70.8 },
    ]
    const text = lapsToText(laps)
    expect(text.split('\n')).toEqual([
      'Out\t\t\t2:19\t88\t55.5\tTraffic',
      '1\t\t\t1:56\t104.2',
      '2\t\t\t1:48\t–\t70.1',
      '3\t\t\t1:49',
      '4\t11:48:51 AM\t\t1:50\t103.9\t70.8',
    ])
    expect(parseLapTimes(text)).toMatchObject({ laps, errors: [], skipped: [] })
    expect(parseLapTimes(lapsToText(parseLapTimes(GARMIN_LAPS).laps)).laps).toEqual(parseLapTimes(GARMIN_LAPS).laps)
  })
})

describe('cleanSessionLaps', () => {
  const valid = { date: '2026-09-13', time: '09:50', group: 'blue', sessionNumber: 1, laps: [{ ms: 116_000 }] }

  it('keeps a valid session, keyed by day, time and group, with only the known fields', () => {
    const result = cleanSessionLaps({ ...valid, key: 'ignored', extra: 1, laps: [{ ms: 116_000, note: ' Traffic ', bogus: true }] })
    expect(result).toEqual({
      session: {
        key: sessionKey('2026-09-13', '09:50', 'blue'),
        date: '2026-09-13',
        time: '09:50',
        group: 'blue',
        sessionNumber: 1,
        laps: [{ ms: 116_000, note: 'Traffic' }],
      },
    })
  })

  it('keeps a lap’s speeds (#298)', () => {
    expect(cleanSessionLaps({ ...valid, laps: [{ ms: 116_000, topMph: 104.2, avgMph: 70.1 }, { ms: 117_000, avgMph: 70 }] }))
      .toMatchObject({ session: { laps: [{ ms: 116_000, topMph: 104.2, avgMph: 70.1 }, { ms: 117_000, avgMph: 70 }] } })
  })

  it('refuses speeds that can’t be right', () => {
    for (const lap of [
      { ms: 116_000, topMph: '104' },
      { ms: 116_000, topMph: 999 },
      { ms: 116_000, avgMph: 1 },
      { ms: 116_000, avgMph: Number.NaN },
      { ms: 116_000, topMph: 70, avgMph: 104 },
    ]) expect(cleanSessionLaps({ ...valid, laps: [lap] })).toHaveProperty('error')
  })

  it('keeps a summary, trimmed, and drops a blank one', () => {
    expect(cleanSessionLaps({ ...valid, summary: ' Hot tires. ' })).toMatchObject({ session: { summary: 'Hot tires.' } })
    expect(cleanSessionLaps({ ...valid, summary: '  ' })).not.toHaveProperty('session.summary')
  })

  it('refuses anything that isn’t a session of laps', () => {
    const bad = [
      null,
      { ...valid, date: '9/13/2026' },
      { ...valid, time: '9:50' },
      { ...valid, group: '../other-user' },
      { ...valid, sessionNumber: 1.5 },
      { ...valid, laps: [] },
      { ...valid, laps: [{ ms: 5 }] },
      { ...valid, laps: [{ ms: 116_000.5 }] },
      { ...valid, laps: [{ ms: 116_000, kind: 'warmup' }] },
      { ...valid, laps: [{ ms: 116_000, note: 'x'.repeat(501) }] },
      { ...valid, laps: Array(201).fill({ ms: 116_000 }) },
      { ...valid, summary: 'x'.repeat(1001) },
      { ...valid, summary: 5 },
    ]
    for (const b of bad) expect(cleanSessionLaps(b)).toHaveProperty('error')
  })
})
