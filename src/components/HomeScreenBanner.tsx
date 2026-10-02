import { useState } from 'react'
import type { ReactNode } from 'react'
import { Ellipsis, Share, SquarePlus, X } from 'lucide-react'
import { Sheet } from './Sheet'

// The Add to Home Screen banner (#379). iOS has no native one for a site
// (Chrome's install prompt is Android and desktop only), and no way for a
// page to add itself, so this card points the way: Share, then Add to Home
// Screen. Since #378 that gives an app that opens full screen.
//
// Inside the Home Screen app the card never shows. In Safari it can't tell
// whether the app is already on the Home Screen (the two keep separate
// storage, and iOS doesn't say), so it says what to do if it is, and ✕
// puts it away for good in that browser.

export const DISMISSED_KEY = 'hpde:homeScreenBannerDismissed'

/** In the Home Screen app: iOS's own flag, or the manifest's display mode. */
export function isHomeScreenApp(): boolean {
  if ((navigator as Navigator & { standalone?: boolean }).standalone === true) return true
  if (typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: fullscreen)').matches
}

/** iPhone or iPad, where Share → Add to Home Screen makes the app. */
export function isIos(userAgent = navigator.userAgent, maxTouchPoints = navigator.maxTouchPoints): boolean {
  if (/iPhone|iPad|iPod/.test(userAgent)) return true
  // iPadOS Safari asks for desktop sites as a Mac; only an iPad has touch.
  return /Macintosh/.test(userAgent) && maxTouchPoints > 1
}

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) !== null
  } catch {
    return false
  }
}

export function HomeScreenBanner() {
  const [shown, setShown] = useState(() => isIos() && !isHomeScreenApp() && !wasDismissed())
  const [howOpen, setHowOpen] = useState(false)
  if (!shown) return null

  function dismiss() {
    setShown(false)
    try {
      localStorage.setItem(DISMISSED_KEY, new Date().toISOString())
    } catch {
      // Private browsing can refuse storage; it's gone for this visit anyway.
    }
  }

  return (
    <section aria-label="Add to Home Screen" className="mb-8 flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-[0_1px_2px_rgba(17,24,39,0.04),0_4px_12px_rgba(17,24,39,0.05)]">
      <img src="/apple-touch-icon.png" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-[11px]" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-gray-900">Add HPDE to your Home Screen</p>
        <p className="mt-0.5 text-xs text-gray-500">
          It opens full screen, like an app. Already added it? Open it from your Home Screen.
        </p>
        <button
          onClick={() => setHowOpen(true)}
          className="mt-2 rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-gray-700"
        >
          Show me how
        </button>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
      >
        <X size={16} strokeWidth={2.5} />
      </button>
      {howOpen && (
        <Sheet
          label="Add to Home Screen"
          onClose={() => setHowOpen(false)}
          heading={<h2 className="text-lg font-bold text-gray-900">Add to Home Screen</h2>}
        >
          <ol className="mt-4 space-y-4 pb-2">
            <HowStep n={1} icon={<Share size={18} />}>
              Tap <strong>Share</strong>. In Safari on iOS 26, tap <Ellipsis size={14} className="inline align-[-2px]" aria-label="More" /> first.
            </HowStep>
            <HowStep n={2} icon={<SquarePlus size={18} />}>
              Tap <strong>Add to Home Screen</strong>. You may need to scroll down to find it.
            </HowStep>
            <HowStep n={3} icon={<img src="/apple-touch-icon.png" alt="" className="h-[18px] w-[18px] rounded-[4px]" />}>
              Tap <strong>Add</strong>, then open HPDE from your Home Screen.
            </HowStep>
          </ol>
        </Sheet>
      )}
    </section>
  )
}

function HowStep({ n, icon, children }: { n: number; icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-center gap-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gray-100 text-gray-700" aria-hidden="true">
        {icon}
      </span>
      <p className="text-sm text-gray-700">
        <span className="sr-only">Step {n}: </span>
        {children}
      </p>
    </li>
  )
}
