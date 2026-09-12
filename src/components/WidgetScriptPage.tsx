import { useState, useEffect } from 'react'
import { Check, Copy, X } from 'lucide-react'
import widgetScript from '../../scripts/hpde-widget.js?raw'

export function WidgetScriptPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  async function handleCopy() {
    await navigator.clipboard.writeText(widgetScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">Widget script</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400"
            >
              {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a
              href="#/"
              aria-label="Close"
              className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700"
              style={{ minWidth: 36, minHeight: 36 }}
            >
              <X size={18} />
            </a>
          </div>
        </div>
        <p className="mb-3 text-sm text-gray-500">
          Paste this into Scriptable on your iPhone. See{' '}
          <a href="https://github.com/inko9nito/hpde/blob/main/scripts/README.md" className="underline">
            scripts/README.md
          </a>{' '}
          for install steps.
        </p>
        <pre className="overflow-x-auto rounded-2xl border border-gray-200 bg-white p-3 text-xs text-gray-800 shadow-sm">
          <code>{widgetScript}</code>
        </pre>
      </div>
    </div>
  )
}
