import { useEffect, useState } from 'react'
import { Sheet } from './Sheet'
import { ShareLink } from './ShareLink'
import { carName, formatDay } from '../utils/garage'
import type { Car } from '../utils/garage'

const JOIN_CAR_PREFIX = '#/join-car/'

/** The page that takes an invite to share a car (#398). */
export function joinCarHash(token: string): string {
  return `${JOIN_CAR_PREFIX}${encodeURIComponent(token)}`
}

export function inviteFromHash(hash: string): string | null {
  if (!hash.startsWith(JOIN_CAR_PREFIX)) return null
  return decodeURIComponent(hash.slice(JOIN_CAR_PREFIX.length)) || null
}

/**
 * The link to an invite, on the site it was made on: an invite made on a
 * deploy preview is kept there, and only works there.
 */
function inviteUrl(token: string): string {
  return `${window.location.origin}${window.location.pathname}${joinCarHash(token)}`
}

/**
 * Sharing a car with another driver (#398) — Jason's dad, who drives the
 * same Mustang: a link to send them, or a code to scan. Once they've taken
 * it, the car's in their garage too, and its details, photo and change log
 * are both of theirs to keep up.
 */
export function ShareCarSheet({ car, invite, onClose }: {
  car: Car
  invite: (carId: string) => Promise<{ token: string; expires: string }>
  onClose: () => void
}) {
  const [link, setLink] = useState<{ url: string; expires: string } | null>(null)
  const [failure, setFailure] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false
    setFailure(null)
    invite(car.id).then(
      ({ token, expires }) => { if (!cancelled) setLink({ url: inviteUrl(token), expires }) },
      err => { if (!cancelled) setFailure((err as Error).message) },
    )
    return () => { cancelled = true }
  }, [car.id, attempt])

  return (
    <Sheet
      label="Share this car"
      onClose={onClose}
      data-share-car-sheet
      heading={<h2 className="mt-0.5 text-lg font-bold text-gray-900">Share this car</h2>}
    >
      {failure ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center">
          <p role="alert" className="text-sm text-red-700">{failure}</p>
          <button onClick={() => setAttempt(a => a + 1)} className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
            Try again
          </button>
        </div>
      ) : !link ? (
        <div className="mt-4 h-[300px] animate-pulse rounded-xl bg-gray-100" aria-busy="true" aria-label="Making the link" />
      ) : (
        <ShareLink
          url={link.url}
          shareTitle={`Join ${carName(car)}`}
          note={`Works once, until ${formatDay(link.expires.slice(0, 10))}.`}
        />
      )}
    </Sheet>
  )
}
