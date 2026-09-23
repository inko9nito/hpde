import { useState, useEffect } from 'react'
import { Check, Copy, X } from 'lucide-react'
import QRCode from 'qrcode'
import { SITE_URL } from '../utils/siteMoved'

// Always the live site, even when opened on a deploy preview or localhost.
const shareUrl = SITE_URL

export function SharePage() {
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    QRCode.toDataURL(shareUrl, { margin: 1, width: 240 })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null))
  }, [])

  async function handleCopy() {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Share</h1>
          <a
            href="#/"
            aria-label="Close"
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <X size={18} />
          </a>
        </div>

        <p className="mb-3 text-sm text-gray-500">
          Share this link so others can view the schedule.
        </p>

        <button
          onClick={handleCopy}
          className="mb-4 flex w-full items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition-colors hover:border-gray-400"
        >
          <span className="truncate text-sm text-gray-800">{shareUrl}</span>
          {copied ? (
            <Check size={16} className="shrink-0 text-green-600" />
          ) : (
            <Copy size={16} className="shrink-0 text-gray-400" />
          )}
        </button>

        <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          {qrDataUrl && (
            <img src={qrDataUrl} alt="QR code for schedule link" width={240} height={240} />
          )}
        </div>
      </div>
    </div>
  )
}
