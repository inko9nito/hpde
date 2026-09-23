import { useState, useEffect } from 'react'
import { Check, Copy, X, Bell, RefreshCw, ArrowUpRight, Plus, ChevronDown } from 'lucide-react'
import loaderScript from '../../scripts/hpde-widget-loader.js?raw'
import widgetSmall from '../assets/widget-small.png'
import widgetMedium from '../assets/widget-medium.png'
import widgetLarge from '../assets/widget-large.png'
import { EVENTS } from '../data'
import { partitionEvents } from '../utils/eventClass'
import type { RunGroupConfig } from '../types'

const APP_STORE_URL = 'https://apps.apple.com/app/scriptable/id1405459188'

// Rendered from the real widget script by `npm run widget:showcase`, at
// WidgetKit point sizes (see scripts/widget-preview.mjs).
const PREVIEWS = [
  { id: 'small', label: 'Small', src: widgetSmall, width: 170 },
  { id: 'medium', label: 'Medium', src: widgetMedium, width: 364 },
  { id: 'large', label: 'Large', src: widgetLarge, width: 364 },
] as const
type PreviewId = (typeof PREVIEWS)[number]['id']

const DEFAULT_LEAD_MIN = 10
const LEAD_OPTIONS = [5, 10, 15, 20, 30]

// Run groups differ per event; offer the ones from the event a new user
// is most likely setting up for.
function relevantRunGroups(): RunGroupConfig[] {
  const { live, upcoming, past } = partitionEvents(EVENTS)
  const event = live[0] ?? upcoming[0] ?? past[0]
  return event?.runGroups ?? []
}

function useCopy(): [boolean, (text: string) => Promise<void>] {
  const [copied, setCopied] = useState(false)
  async function copy(text: string) {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return [copied, copy]
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
      {children}
    </h2>
  )
}

function Step({ n, title, last, children }: {
  n: number
  title: string
  last?: boolean
  children: React.ReactNode
}) {
  return (
    <li className="relative flex gap-3 pb-6 last:pb-0">
      {!last && <span className="absolute left-[13px] top-7 bottom-0 w-px bg-gray-200" aria-hidden="true" />}
      <span className="z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gray-200 bg-white text-xs font-semibold text-gray-700">
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <div className="mt-1 text-sm text-gray-600">{children}</div>
      </div>
    </li>
  )
}

function Accordion({ icon, title, children }: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <details className="group border-b border-gray-200 last:border-b-0">
      <summary className="flex cursor-pointer list-none items-center gap-3 py-3.5 text-sm font-medium text-gray-900 [&::-webkit-details-marker]:hidden">
        <span className="text-gray-400">{icon}</span>
        <span className="flex-1">{title}</span>
        <Plus size={16} className="text-gray-400 transition-transform group-open:rotate-45" />
      </summary>
      <div className="pb-4 pl-7 text-sm text-gray-600">{children}</div>
    </details>
  )
}

export function WidgetSetupPage() {
  const [preview, setPreview] = useState<PreviewId>('medium')
  const [showScript, setShowScript] = useState(false)
  const [scriptCopied, copyScript] = useCopy()
  const [paramCopied, copyParam] = useCopy()
  const [groups] = useState(relevantRunGroups)
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [leadMinutes, setLeadMinutes] = useState(DEFAULT_LEAD_MIN)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function toggleGroup(id: string) {
    setSelectedGroups(sel => (sel.includes(id) ? sel.filter(g => g !== id) : [...sel, id]))
  }

  // Selected groups in the event's own order, then the lead time — the
  // format parseWidgetParameter() in scripts/hpde-widget.js reads.
  const orderedGroups = groups.filter(g => selectedGroups.includes(g.id)).map(g => g.id)
  const parts = [
    orderedGroups.join(','),
    leadMinutes === DEFAULT_LEAD_MIN ? '' : `${leadMinutes}m`,
  ].filter(Boolean)
  const param = parts.join('|')

  const current = PREVIEWS.find(p => p.id === preview)!

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-4 py-4 sm:py-6">
        <div className="mb-3 flex items-center justify-between gap-3">
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

        <p className="mb-5 text-[15px] leading-relaxed text-gray-600">
          See what's next on track without opening the app. Set up the free Scriptable widget in a
          few minutes.
        </p>

        {/* Widget preview */}
        <div className="mb-8 rounded-3xl bg-gray-900 p-4">
          <div className="mb-4 flex gap-1 rounded-lg bg-white/10 p-1" role="tablist" aria-label="Widget size">
            {PREVIEWS.map(p => (
              <button
                key={p.id}
                role="tab"
                aria-selected={preview === p.id}
                onClick={() => setPreview(p.id)}
                className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
                  preview === p.id ? 'bg-white text-gray-900' : 'text-gray-300 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex min-h-[200px] items-center justify-center">
            <img
              key={current.id}
              src={current.src}
              alt={`${current.label} widget preview`}
              width={current.width}
              className="tab-fade h-auto max-w-full drop-shadow-lg"
            />
          </div>
          <p className="mt-3 text-center text-[11px] text-gray-400">
            Example preview · your event appears after setup
          </p>
        </div>

        {/* Setup */}
        <section className="mb-6">
          <SectionHeading>Set up</SectionHeading>
          <ol>
            <Step n={1} title="Get Scriptable">
              <p>Install the free app that powers the widget.</p>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:border-gray-400"
              >
                Open in App Store <ArrowUpRight size={14} />
              </a>
            </Step>
            <Step n={2} title="Add the HPDE script">
              <p>
                In Scriptable, tap <strong>+</strong>, paste the script, and name it{' '}
                <strong>HPDE</strong>.
              </p>
              <div className="mt-3 flex items-center gap-4">
                <button
                  onClick={() => copyScript(loaderScript)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-700"
                >
                  {scriptCopied ? <Check size={15} /> : <Copy size={15} />}
                  {scriptCopied ? 'Copied' : 'Copy script'}
                </button>
                <button
                  onClick={() => setShowScript(s => !s)}
                  aria-expanded={showScript}
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  {showScript ? 'Hide script' : 'View script'}
                  <ChevronDown size={14} className={`transition-transform ${showScript ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {showScript && (
                <pre className="mt-3 max-h-48 overflow-auto rounded-xl border border-gray-200 bg-white p-2.5 text-[11px] leading-relaxed text-gray-700">
                  <code>{loaderScript}</code>
                </pre>
              )}
              <p className="mt-2 text-xs text-gray-400">
                The script fetches the current widget; you only paste it once.
              </p>
            </Step>
            <Step n={3} title="Add the Home Screen widget" last>
              <p>
                Long-press your Home Screen → <strong>Add Widget</strong> →{' '}
                <strong>Scriptable</strong>. Choose <strong>Small</strong>, <strong>Medium</strong>{' '}
                or <strong>Large</strong>, then tap the widget → <strong>Edit Widget</strong> → set{' '}
                <strong>Script</strong> to <strong>HPDE</strong>.
              </p>
            </Step>
          </ol>
        </section>

        {/* Customize */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-semibold text-gray-900">Customize</h2>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Filter by run group and choose when alerts arrive.
          </p>

          <div className="mt-4 text-xs font-semibold text-gray-700">Run group</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedGroups([])}
              aria-pressed={selectedGroups.length === 0}
              className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                selectedGroups.length === 0
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              All groups
            </button>
            {groups.map(g => {
              const on = selectedGroups.includes(g.id)
              return (
                <button
                  key={g.id}
                  onClick={() => toggleGroup(g.id)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                    on
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${g.bgClass}`} aria-hidden="true" />
                  {g.label}
                </button>
              )
            })}
          </div>

          <label htmlFor="lead-time" className="mt-4 block text-xs font-semibold text-gray-700">
            Alert before activities
          </label>
          <div className="relative mt-2">
            <select
              id="lead-time"
              value={leadMinutes}
              onChange={e => setLeadMinutes(Number(e.target.value))}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-9 text-sm text-gray-900 hover:border-gray-400"
            >
              {LEAD_OPTIONS.map(n => (
                <option key={n} value={n}>
                  {n} minutes{n === DEFAULT_LEAD_MIN ? ' (default)' : ''}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3 py-2.5">
            <div className="min-w-0">
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Widget parameter
              </div>
              <div className="mt-0.5 truncate font-mono text-sm font-semibold text-gray-900">
                {param || 'Leave blank'}
              </div>
            </div>
            {param && (
              <button
                onClick={() => copyParam(param)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400"
              >
                {paramCopied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {paramCopied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Paste this in <strong className="text-gray-500">Edit Widget → Parameter</strong>.
            Select more than one group to combine them.
          </p>
        </section>

        {/* More info */}
        <div className="rounded-2xl border border-gray-200 bg-white px-4 shadow-sm">
          <Accordion icon={<Bell size={16} />} title="About notifications">
            You'll get an alert before each of your sessions and every all-drivers activity
            (meetings, lunch). Allow notifications when Scriptable asks. Alerts appear under
            Scriptable's icon.
          </Accordion>
          <Accordion icon={<RefreshCw size={16} />} title="Refresh and offline use">
            Updates every few minutes, not live — iOS decides exactly when. Works offline, showing
            the last schedule it loaded.
          </Accordion>
        </div>
      </div>
    </div>
  )
}
