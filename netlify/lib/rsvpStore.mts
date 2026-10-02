import { getStore, getDeployStore } from '@netlify/blobs'
import { LAPS_META_STORE, LAPS_STORE, ensureCopied, isSampleDriver, openStores } from './driverStore.mts'
import { buildPastEvents } from './pastEvents.mjs'
import { droveIn } from '../../src/utils/rsvp.ts'
import type { Rsvp, Rsvps } from '../../src/utils/rsvp.ts'
import type { SessionLaps } from '../../src/utils/lapTimes.ts'
import { TEST_DRIVER_ID } from '../../src/data/testAccount.ts'
import { TEST_ACCOUNT_LAPS } from '../../src/data/fixtures/testAccountLaps.ts'

// A driver's answers to "are you going?" (#235), as the rsvps function
// keeps them: one record per driver, keyed by user id. A deploy preview
// gets a store of its own, which starts as a copy of the driver's live
// answers the first time they're used there.
//
// Shared with the laps function, since laps answer for a driver too
// (#377): with laps at an event, they drove it — "I drove", in the run
// group of their last session there (droveIn), replacing whatever they'd
// answered. Saving laps answers so; laps saved before that are answered
// for once (ensureDrove). An answer they give afterwards stands, until
// they save laps there again.

export const RSVPS_STORE = 'rsvps'
// On a preview: which drivers' live answers have been copied in. Anywhere:
// whose laps have been answered for (ensureDrove).
export const RSVPS_META_STORE = 'rsvps-meta'

type Store = ReturnType<typeof getStore>

export interface RsvpStores {
  rsvps: Store
  meta: Store
  /** On a preview: the live answers, only ever read from, to copy the driver's in. */
  live?: Store
}

export interface RsvpDeps {
  getStore?: typeof getStore
  getDeployStore?: typeof getDeployStore
}

export interface DriverRsvps {
  events: Rsvps
}

/** An event they drove, and the run group they drove in there, if it has any. */
export interface Drove {
  eventId: string
  runGroup?: string
}

export function openRsvpStores(context: unknown, deps: RsvpDeps): RsvpStores {
  const deployContext = (context as { deploy?: { context?: string } } | undefined)?.deploy?.context
  const site = (name: string) => (deps.getStore ?? getStore)({ name, consistency: 'strong' })
  const deploy = (name: string) => (deps.getDeployStore ?? getDeployStore)({ name, consistency: 'strong' })
  if (!deployContext || deployContext === 'production') return { rsvps: site(RSVPS_STORE), meta: site(RSVPS_META_STORE) }
  return { rsvps: deploy(RSVPS_STORE), meta: deploy(RSVPS_META_STORE), live: site(RSVPS_STORE) }
}

/**
 * On a preview, copies the driver's live answers into the deploy's own
 * store the first time they're used there, once, so an answer taken back
 * on the preview doesn't come back.
 */
export async function ensureRsvpsCopied({ rsvps, meta, live }: RsvpStores, driverId: string) {
  if (!live) return
  if (await meta.get(driverId, { type: 'json' })) return
  const record = await live.get(driverId, { type: 'json' })
  if (record) await rsvps.setJSON(driverId, record, { onlyIfNew: true })
  await meta.setJSON(driverId, { at: new Date().toISOString() })
}

/**
 * Answers "I drove" for them at each of these events, in the group given,
 * replacing whatever they'd answered there. Returns their answer at each.
 */
export async function markDrove(stores: RsvpStores, driverId: string, drove: Drove[]): Promise<Rsvps> {
  await ensureRsvpsCopied(stores, driverId)
  const record = (await stores.rsvps.get(driverId, { type: 'json' })) as DriverRsvps | null
  const events: Rsvps = { ...record?.events }
  const at = new Date().toISOString()
  const answers: Rsvps = {}
  let changed = false
  for (const { eventId, runGroup } of drove) {
    const current = events[eventId]
    if (current?.status === 'going' && current.runGroup === runGroup) {
      answers[eventId] = current
      continue
    }
    const rsvp: Rsvp = { status: 'going', ...(runGroup ? { runGroup } : {}), updatedAt: at }
    events[eventId] = answers[eventId] = rsvp
    changed = true
  }
  if (changed) await stores.rsvps.setJSON(driverId, { events })
  return answers
}

/** Every event they've laps at, from their laps in this store — the test account's are its sample's. */
async function lapsOf(context: unknown, deps: RsvpDeps, driverId: string): Promise<{ eventId: string; sessions: Record<string, SessionLaps> }[]> {
  if (driverId === TEST_DRIVER_ID) return TEST_ACCOUNT_LAPS
  const laps = openStores(context, deps, LAPS_STORE, LAPS_META_STORE)
  await ensureCopied(laps, driverId)
  const { blobs } = await laps.records.list({ prefix: `${driverId}/` })
  const records = await Promise.all(blobs.map(b => laps.records.get(b.key, { type: 'json' })))
  return records.filter((r): r is { eventId: string; sessions: Record<string, SessionLaps> } => !!r)
}

/**
 * Once per driver in this store (production's, or a preview's own): "I
 * drove" at every event they'd saved laps at before laps answered for them
 * (#377) — putting right a run group they'd answered that their laps don't
 * bear out. And for Jason, at the events in Jason's track history from
 * before those laps (#373), in the last of each one's run groups: where
 * Jason ended up. The record of it lists the events.
 */
export async function ensureDrove(
  context: unknown,
  deps: RsvpDeps,
  stores: RsvpStores,
  driverId: string,
  driverEmail?: string,
  sampleDriverSha256?: string,
) {
  const doneKey = `drove:${driverId}`
  if (await stores.meta.get(doneKey, { type: 'json' })) return
  const drove: Drove[] = (await lapsOf(context, deps, driverId))
    .filter(record => Object.keys(record.sessions).length > 0)
    .map(record => ({ eventId: record.eventId, runGroup: droveIn(Object.values(record.sessions)) }))
  if (isSampleDriver(driverEmail, sampleDriverSha256)) {
    for (const event of buildPastEvents(373)) drove.push({ eventId: event.id, runGroup: event.runGroups.at(-1)?.id })
  }
  if (drove.length) await markDrove(stores, driverId, drove)
  await stores.meta.setJSON(doneKey, { at: new Date().toISOString(), drove: drove.map(d => d.eventId) })
}
