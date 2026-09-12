import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import widgetScript from '../../scripts/hpde-widget.js?raw'

export function WidgetScriptPage() {
  const [copied, setCopied] = useState(false)

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
          <button
            onClick={handleCopy}
            className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400"
          >
            {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
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
        <div className="pb-2 pt-4 text-center">
          <a href="#/" className="text-sm text-gray-500 underline">
            Back to schedule
          </a>
        </div>
      </div>
    </div>
  )
}
