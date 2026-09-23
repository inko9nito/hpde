import { useState, useEffect } from 'react'
import { Check, Copy, X, Bell, RefreshCw, WifiOff } from 'lucide-react'
import loaderScript from '../../scripts/hpde-widget-loader.js?raw'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-gray-400">
      {children}
    </h2>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {children}
    </div>
  )
}

function Chip({ children }: { children: string }) {
  return (
    <code className="rounded bg-gray-900 px-2 py-1 text-xs font-semibold text-white">
      {children}
    </code>
  )
}

function ParamOption({
  title,
  description,
  examples,
}: {
  title: string
  description: string
  examples: string[]
}) {
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-medium text-gray-400">Examples:</span>
        {examples.map(e => <Chip key={e}>{e}</Chip>)}
      </div>
    </li>
  )
}

export function WidgetSetupPage() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  async function handleCopy() {
    await navigator.clipboard.writeText(loaderScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Not a real `#anchor` link — this is a hash-routed page (App.tsx reads
  // window.location.hash to decide what to render), so changing the hash
  // here would navigate away instead of just scrolling.
  function scrollToParams() {
    document.getElementById('widget-parameter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h1 className="text-lg font-semibold text-gray-900">iOS widget</h1>
          <a
            href="#/"
            aria-label="Close"
            className="flex shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-2 text-gray-500 shadow-sm transition-colors hover:border-gray-400 hover:text-gray-700"
            style={{ minWidth: 36, minHeight: 36 }}
          >
            <X size={18} />
          </a>
        </div>

        <p className="mb-5 text-sm text-gray-600">
          Put today's schedule on your iPhone Home Screen with{' '}
          <a
            href="https://apps.apple.com/app/scriptable/id1405459188"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            Scriptable
          </a>{' '}
          (free), a scripting app that can render Home Screen widgets. No account, no extra app to check.
        </p>

        <div className="flex flex-col gap-5">
          <section>
            <SectionHeading>Setup</SectionHeading>
            <Card>
              <ol className="flex flex-col gap-2.5 text-sm text-gray-700">
                <li className="flex gap-2.5">
                  <span className="shrink-0 font-semibold text-gray-400">1</span>
                  <span>
                    Install{' '}
                    <a
                      href="https://apps.apple.com/app/scriptable/id1405459188"
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Scriptable
                    </a>{' '}
                    from the App Store.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 font-semibold text-gray-400">2</span>
                  <span>
                    Open Scriptable → <strong>+</strong> → paste the script below → title it{' '}
                    <strong>HPDE</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 font-semibold text-gray-400">3</span>
                  <span>
                    Long-press your Home Screen → <strong>Add Widget</strong> →{' '}
                    <strong>Scriptable</strong> → pick <strong>Medium</strong> or{' '}
                    <strong>Large</strong> → Add.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 font-semibold text-gray-400">4</span>
                  <span>
                    Tap the widget → <strong>Edit Widget</strong> → set <strong>Script</strong> to{' '}
                    <strong>HPDE</strong>.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 font-semibold text-gray-400">5</span>
                  <span>
                    Optional: set <strong>Parameter</strong> to filter to your run group and set
                    the alert lead time — see{' '}
                    <button
                      onClick={scrollToParams}
                      className="underline decoration-dotted underline-offset-2"
                    >
                      Widget parameter
                    </button>{' '}
                    below.
                  </span>
                </li>
              </ol>
            </Card>
          </section>

          <section>
            <div className="mb-2 flex items-center justify-between gap-3">
              <SectionHeading>
                <span>The script</span>
              </SectionHeading>
              <button
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <Card>
              <pre className="max-h-40 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-2.5 text-[11px] leading-relaxed text-gray-700">
                <code>{loaderScript}</code>
              </pre>
            </Card>
          </section>

          <section id="widget-parameter">
            <SectionHeading>Widget parameter</SectionHeading>
            <Card>
              <p className="mb-3 text-sm text-gray-600">
                Long-press the widget → <strong>Edit Widget</strong> →{' '}
                <strong>Parameter</strong>. You can adjust two things:
              </p>
              <ul className="divide-y divide-gray-100">
                <ParamOption
                  title="Run group"
                  description="Show only your group's sessions and alerts. Leave blank for all groups."
                  examples={['blue', 'blue,orange']}
                />
                <ParamOption
                  title="Alert lead time"
                  description="How many minutes before each activity you're alerted. Default is 10."
                  examples={['5m', '15m']}
                />
                <ParamOption
                  title="Both"
                  description="Separate them with a vertical bar."
                  examples={['blue|15m']}
                />
              </ul>
            </Card>
          </section>

          <section>
            <SectionHeading>Notifications</SectionHeading>
            <Card>
              <div className="flex gap-2.5">
                <Bell size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <p className="text-sm text-gray-600">
                  You'll get an alert before each of your sessions and every all-drivers activity
                  (meetings, lunch). Allow notifications when Scriptable asks. Alerts appear under
                  Scriptable's icon.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <SectionHeading>Good to know</SectionHeading>
            <Card>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li className="flex gap-2.5">
                  <RefreshCw size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <span>
                    Updates every few minutes, not live — iOS decides exactly when.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <WifiOff size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <span>
                    Works offline, showing the last schedule it loaded.
                  </span>
                </li>
              </ul>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
