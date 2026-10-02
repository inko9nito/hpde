import { useEffect, useState } from 'react'
import { Check, Copy, Share } from 'lucide-react'
import QRCode from 'qrcode'
import { Sheet } from './Sheet'
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
  const [qr, setQr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
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

  useEffect(() => {
    if (!link) return
    QRCode.toDataURL(link.url, { margin: 1, width: 240 }).then(setQr, () => setQr(null))
  }, [link])

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  async function copy() {
    if (!link) return
    await navigator.clipboard.writeText(link.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Sheet
      label="Share this car"
      onClose={onClose}
      data-share-car-sheet
      heading={<>
        <p className="text-xs text-gray-500">{carName(car)}</p>
        <h2 className="mt-0.5 text-lg font-bold text-gray-900">Share this car</h2>
      </>}
    >
      <p className="mt-2 text-sm text-gray-600">
        Send this link to someone else who drives it. Once they open it and join, you both keep up its details, photo and change log, and each of you adds it to your own events.
      </p>

      {failure ? (
        <div className="mt-4 rounded-xl border border-dashed border-gray-200 px-4 py-6 text-center">
          <p role="alert" className="text-sm text-red-700">{failure}</p>
          <button onClick={() => setAttempt(a => a + 1)} className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
            Try again
          </button>
        </div>
      ) : !link ? (
        <div className="mt-4 h-[300px] animate-pulse rounded-xl bg-gray-100" aria-busy="true" aria-label="Making the link" />
      ) : (<>
        <div className="mt-4 flex justify-center">
          {qr
            ? <img src={qr} alt="Code to scan for the link" width={180} height={180} className="rounded-lg border border-gray-200" />
            : <div className="h-[180px] w-[180px] rounded-lg bg-gray-100" aria-hidden="true" />}
        </div>
        <button
          onClick={copy}
          aria-label="Copy link"
          className="mt-4 flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-left transition-colors hover:border-gray-400"
        >
          <span className="truncate text-sm text-gray-800" data-invite-link>{link.url}</span>
          {copied
            ? <Check size={16} className="shrink-0 text-green-600" aria-hidden="true" />
            : <Copy size={16} className="shrink-0 text-gray-400" aria-hidden="true" />}
        </button>
        {canShare && (
          <button
            onClick={() => navigator.share({ title: `Join ${carName(car)}`, url: link.url }).catch(() => {})}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
          >
            <Share size={16} aria-hidden="true" />
            Send the link
          </button>
        )}
        <p className="mt-3 text-center text-xs text-gray-500">
          {copied ? 'Copied.' : `Works once, until ${formatDay(link.expires.slice(0, 10))}.`}
        </p>
      </>)}
    </Sheet>
  )
}
