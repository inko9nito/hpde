import { getStore, getDeployStore } from '@netlify/blobs'
import { jsonResponse as json } from './auth.mjs'
import { isAdmin } from './newEvent.mjs'
import { findDriver } from './drivers.mjs'
import { TEST_DRIVER_ID } from '../../src/data/testAccount.ts'

// What a driver keeps for themselves, one record per event — their laps
// (#210), their notes (#340) — shared by the functions that keep them:
// whose records a request reaches, and which store they're in.

export type Store = ReturnType<typeof getStore>

export interface StoreDeps {
  getStore?: typeof getStore
  getDeployStore?: typeof getDeployStore
  identity?: Parameters<typeof findDriver>[1]
}

export interface DriverStores {
  records: Store
  meta: Store
  /** On a preview: the live records, only ever read from, to copy the driver's in. */
  live?: Store
}

/**
 * Production reads and writes the live records. Anything else (a deploy
 * preview, a branch deploy) gets stores of its own for that deploy; `live`
 * is only read from, to copy the driver's records in (ensureCopied).
 */
export function openStores(context: unknown, deps: StoreDeps, name: string, metaName: string): DriverStores {
  const deployContext = (context as { deploy?: { context?: string } } | undefined)?.deploy?.context
  const site = (n: string) => (deps.getStore ?? getStore)({ name: n, consistency: 'strong' })
  const deploy = (n: string) => (deps.getDeployStore ?? getDeployStore)({ name: n, consistency: 'strong' })
  if (!deployContext || deployContext === 'production') return { records: site(name), meta: site(metaName) }
  return { records: deploy(name), meta: deploy(metaName), live: site(name) }
}

/**
 * On a preview, copies the driver's live records (as they are at that
 * moment) into the deploy's own store the first time they're used there,
 * and records that it did, so records removed on the preview don't come
 * back. Production has nothing to copy. Each copy only writes a record
 * that isn't there yet, so one saved on the preview meanwhile is kept.
 */
export async function ensureCopied({ records, meta, live }: DriverStores, driverId: string) {
  if (!live) return
  if (await meta.get(driverId, { type: 'json' })) return
  const { blobs } = await live.list({ prefix: `${driverId}/` })
  for (const { key } of blobs) {
    const record = await live.get(key, { type: 'json' })
    if (record) await records.setJSON(key, record, { onlyIfNew: true })
  }
  await meta.setJSON(driverId, { at: new Date().toISOString() })
}

/**
 * Whose records a request reaches: the signed-in driver's own — or, for an
 * admin, the driver named by `driver=<user id>` (#288), checked against
 * Identity, or the test account (#309). A Response to send instead when
 * the request can't have them. `what` names the records in messages.
 */
export async function whoseRecords(
  user: { id: string; email?: string },
  asked: string | null,
  what: string,
  identity?: StoreDeps['identity'],
): Promise<{ driverId: string; driverEmail?: string } | Response> {
  if (asked === TEST_DRIVER_ID) {
    if (!isAdmin(user)) return json(403, { error: 'Only admins can use the test account.' })
    return { driverId: TEST_DRIVER_ID }
  }
  if (!asked || asked === user.id) return { driverId: user.id, driverEmail: user.email }
  if (!isAdmin(user)) return json(403, { error: `Only admins can log ${what} for other drivers.` })
  let driver
  try {
    driver = await findDriver(asked, identity)
  } catch (err) {
    console.error(`${what}: looking up the driver failed:`, err)
    return json(502, { error: 'Couldn’t check that driver. Try again in a moment.' })
  }
  if (!driver) return json(404, { error: 'There’s no driver with that id.' })
  return { driverId: driver.id, driverEmail: driver.email }
}
