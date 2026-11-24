import { useSyncExternalStore } from 'react'

// How a driver likes their out and in laps shown (#480): listed in the lap
// tables and plotted on the session charts, or left off both; and counted
// in the average lap, or not. One choice for the device, kept between
// visits, so every page — My notes, the track page — reads the same.

export interface LapView {
  /** Out and in laps in the lap tables and on the session charts. */
  showOutLaps: boolean
  /** Out and in laps counted in the average lap. Never in the best. */
  outLapsInAverage: boolean
}

export const LAP_VIEW_KEY = 'hpde:lapView'

/** Off and out: an out lap skews a chart's scale and the average (#480). */
export const DEFAULT_LAP_VIEW: LapView = { showOutLaps: false, outLapsInAverage: false }

const listeners = new Set<() => void>()
let cached: { raw: string | null; view: LapView } | null = null

function read(): LapView {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(LAP_VIEW_KEY)
  } catch {
    // No storage (private browsing): the defaults.
  }
  if (cached && cached.raw === raw) return cached.view
  let view = DEFAULT_LAP_VIEW
  try {
    const saved = raw === null ? null : JSON.parse(raw)
    if (saved && typeof saved === 'object') {
      view = {
        showOutLaps: typeof saved.showOutLaps === 'boolean' ? saved.showOutLaps : DEFAULT_LAP_VIEW.showOutLaps,
        outLapsInAverage: typeof saved.outLapsInAverage === 'boolean' ? saved.outLapsInAverage : DEFAULT_LAP_VIEW.outLapsInAverage,
      }
    }
  } catch {
    // Not ours, or garbled: the defaults.
  }
  cached = { raw, view }
  return view
}

/** Changes one or both, everywhere they're shown. */
export function setLapView(change: Partial<LapView>): void {
  const next = { ...read(), ...change }
  try {
    localStorage.setItem(LAP_VIEW_KEY, JSON.stringify(next))
  } catch {
    // Kept for this visit only.
    cached = { raw: cached?.raw ?? null, view: next }
  }
  listeners.forEach(l => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  // Changed in another tab.
  const onStorage = (e: StorageEvent) => { if (e.key === LAP_VIEW_KEY) listener() }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

/** The driver's choice, kept up to date. */
export function useLapView(): LapView {
  return useSyncExternalStore(subscribe, read, () => DEFAULT_LAP_VIEW)
}
