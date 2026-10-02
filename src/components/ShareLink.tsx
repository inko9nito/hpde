import { useEffect, useState } from 'react'
import { Check, Copy, Share } from 'lucide-react'
import QRCode from 'qrcode'

/**
 * A link to share, as every share sheet lays it out (#411): a code to scan
 * on top, then the link to copy, then Send the link (where the phone can).
 */
export function ShareLink({ url, shareTitle, note }: {
  url: string
  /** What the phone's share sheet calls it. */
  shareTitle: string
  /** Under it, until it's copied. */
  note?: string
}) {
  const [qr, setQr] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    QRCode.toDataURL(url, { margin: 1, width: 240 }).then(setQr, () => setQr(null))
  }, [url])

  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  async function copy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const footnote = copied ? 'Copied.' : note

  return (<>
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
      <span className="truncate text-sm text-gray-800" data-share-link>{url}</span>
      {copied
        ? <Check size={16} className="shrink-0 text-green-600" aria-hidden="true" />
        : <Copy size={16} className="shrink-0 text-gray-400" aria-hidden="true" />}
    </button>
    {canShare && (
      <button
        onClick={() => navigator.share({ title: shareTitle, url }).catch(() => {})}
        className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
      >
        <Share size={16} aria-hidden="true" />
        Send the link
      </button>
    )}
    {footnote && <p className="mt-3 text-center text-xs text-gray-500">{footnote}</p>}
  </>)
}
