import { useState, useEffect } from 'react'
import { Check, Copy, X, Bell, RefreshCw, WifiOff } from 'lucide-react'
import loaderScript from '../../scripts/hpde-widget-loader.js?raw'

const WIDGET_SCRIPT_URL = 'https://raw.githubusercontent.com/inko9nito/hpde/main/scripts/hpde-widget.js'
const README_URL = 'https://github.com/inko9nito/hpde/blob/main/scripts/README.md'

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

function ParamRow({ token, effect }: { token: string; effect: React.ReactNode }) {
  return (
    <li className="flex flex-col gap-0.5 py-2 first:pt-0 last:pb-0">
      <code className="w-fit rounded bg-gray-100 px-1.5 py-0.5 text-xs font-semibold text-gray-800">
        {token}
      </code>
      <span className="text-sm text-gray-600">{effect}</span>
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
                    Optional: set <strong>Parameter</strong> to filter to your run group or adjust
                    notifications — see below.
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
              <p className="mb-2 text-xs text-gray-500">
                This is what you paste into Scriptable in step 2. It's a small loader — it fetches
                the real widget on every run, so future updates show up on their own with nothing
                to re-paste. Shown here to read, or in case the copy button above misbehaves.
              </p>
              <pre className="max-h-40 overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 p-2.5 text-[11px] leading-relaxed text-gray-700">
                <code>{loaderScript}</code>
              </pre>
              <p className="mt-2 text-xs text-gray-400">
                Prefer a single self-contained script instead (no auto-updates)?{' '}
                <a href={WIDGET_SCRIPT_URL} className="underline" target="_blank" rel="noreferrer">
                  View hpde-widget.js
                </a>{' '}
                and paste that instead.
              </p>
            </Card>
          </section>

          <section>
            <SectionHeading>Widget parameter</SectionHeading>
            <Card>
              <p className="mb-2 text-sm text-gray-600">
                Long-press the widget → <strong>Edit Widget</strong> →{' '}
                <strong>Parameter</strong>. A small comma-separated string controls filtering and
                notification lead time.
              </p>
              <ul className="divide-y divide-gray-100">
                <ParamRow
                  token="<run group id>"
                  effect={
                    <>
                      Filter to this run group only — matches what's shown in the app's run-group
                      filter for your event (e.g. <code className="text-xs">orange</code>).
                    </>
                  }
                />
                <ParamRow
                  token="<N>m"
                  effect="Notification lead time in minutes. Default 10m."
                />
              </ul>
              <p className="mt-2 text-xs text-gray-500">
                Examples: <code className="text-xs">orange</code> (filter to orange, 10-min lead)
                · <code className="text-xs">orange,blue|15m</code> (filter to orange + blue,
                15-min lead) · <code className="text-xs">15m</code> (no filter, 15-min lead) ·
                blank (no filter, 10-min lead).
              </p>
              <p className="mt-2 text-xs text-gray-500">
                A typo surfaces as a small "⚠ invalid" note on the widget rather than failing
                silently.
              </p>
            </Card>
          </section>

          <section>
            <SectionHeading>Notifications</SectionHeading>
            <Card>
              <div className="flex gap-2.5">
                <Bell size={16} className="mt-0.5 shrink-0 text-gray-400" />
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  <p>
                    The widget schedules a notification a few minutes before each session your
                    filter matches, plus every all-drivers activity (meetings, lunch, etc.)
                    regardless of filter. The first run asks for notification permission — allow
                    it to get alerts.
                  </p>
                  <p>
                    They show up under <strong>Scriptable's</strong> app icon, not HPDE's — that's
                    an iOS/Scriptable limitation, not a bug. If you don't hear them, check
                    Settings → Notifications → Scriptable, and make sure Sounds is on there too.
                  </p>
                </div>
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
                    Not truly live — iOS decides when to actually rebuild the widget. It asks for
                    a refresh every 5 minutes on an event day, hourly otherwise, so it can lag a
                    bit behind what's happening on track. Force one by long-pressing the widget →
                    Edit Widget → toggle a setting.
                  </span>
                </li>
                <li className="flex gap-2.5">
                  <WifiOff size={16} className="mt-0.5 shrink-0 text-gray-400" />
                  <span>
                    Works offline — it caches the last successful schedule on your phone and shows
                    a small "offline" tag if the network is unreachable when it tries to refresh.
                  </span>
                </li>
              </ul>
            </Card>
          </section>

          <p className="text-center text-xs text-gray-400">
            Testing the fixtures or troubleshooting?{' '}
            <a href={README_URL} className="underline" target="_blank" rel="noreferrer">
              See the developer README
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
