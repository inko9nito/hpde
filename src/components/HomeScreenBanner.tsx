import { useState } from 'react'
import { Ellipsis, Share, X } from 'lucide-react'

// The Add to Home Screen banner (#379). iOS has no native one for a site
// (Chrome's install prompt is Android and desktop only), and no way for a
// page to add itself, so this strip points the way: Share, then Add to Home
// Screen. Since #378 that gives an app that opens full screen.
//
// It looks like the App Store's banner at the top of a site (✕, icon, name),
// with the steps in place of the store's button: there's no button that
// could add the app, only Safari's Share menu.
//
// Inside the Home Screen app the strip never shows. In Safari it can't tell
// whether the app is already on the Home Screen (the two keep separate
// storage, and iOS doesn't say), so ✕ puts it away for good in that browser.

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

/**
 * Safari on an iPhone running iOS 26 or later, whose toolbar keeps Share
 * under ⋯. Its user agent still says iOS 18, so go by Safari's version.
 * Chrome and the other iOS browsers name themselves and keep Share in view.
 */
export function shareIsUnderMore(userAgent = navigator.userAgent): boolean {
  if (!/iPhone/.test(userAgent) || /CriOS|FxiOS|EdgiOS|OPiOS/.test(userAgent)) return false
  const version = /Version\/(\d+)/.exec(userAgent)
  return version !== null && Number(version[1]) >= 26
}

function wasDismissed(): boolean {
  try {
    return localStorage.getItem(DISMISSED_KEY) !== null
  } catch {
    return false
  }
}

// In iOS's blue, as Safari draws the Share button: the glyph to look for in
// the toolbar.
function ShareGlyph({ named }: { named: boolean }) {
  return (
    <Share
      size={15}
      strokeWidth={2.25}
      className="inline align-[-2px] text-[#0A84FF]"
      {...(named ? { 'aria-label': 'Share' } : { 'aria-hidden': true })}
    />
  )
}

export function HomeScreenBanner() {
  const [shown, setShown] = useState(() => isIos() && !isHomeScreenApp() && !wasDismissed())
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
    <section aria-label="Add to Home Screen" className="bg-gray-900 pt-[env(safe-area-inset-top)] text-white">
      <div className="mx-auto flex max-w-lg items-center gap-2.5 py-3 pl-1 pr-3 sm:pr-4">
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-gray-500 transition-colors hover:text-gray-300"
        >
          <X size={18} />
        </button>
        <img
          src="/apple-touch-icon.png"
          alt=""
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-[13px] ring-1 ring-white/15"
        />
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-tight">Get the HPDE app</p>
          <p className="mt-1 text-[13px] leading-snug text-gray-400">
            {shareIsUnderMore() ? (
              <>
                Tap <Ellipsis size={15} strokeWidth={2.25} className="inline align-[-3px] text-white" aria-label="More" />,
                then <ShareGlyph named={false} /> <span className="text-white">Share</span>,
                then <span className="text-white">“Add to Home Screen”</span>
              </>
            ) : (
              <>
                Tap <ShareGlyph named /> then <span className="text-white">“Add to Home Screen”</span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
