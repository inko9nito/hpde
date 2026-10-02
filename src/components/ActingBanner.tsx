import { useEffect } from 'react'
import { FlaskConical, UserRound } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { driverName } from '../data/drivers'

// How tall the banner is, under the status bar's inset.
export const ACTING_BANNER_PX = 36

/**
 * While an admin is acting as another driver or the test account (#396),
 * a strip across the top of every page saying who — amber, as the account
 * button's badge — with the way back to themselves. Everything starts
 * below it: the page (body's padding) and the pages pushed over it
 * (PushPage), by --acting-h. Acting as themselves, there's none.
 */
export function ActingBanner() {
  const { actingAs, setActingAs, testAccount } = useAuth()

  useEffect(() => {
    if (!actingAs) return
    const root = document.documentElement
    root.style.setProperty('--acting-h', `calc(${ACTING_BANNER_PX}px + env(safe-area-inset-top))`)
    return () => { root.style.removeProperty('--acting-h') }
  }, [actingAs])

  if (!actingAs) return null
  const Icon = testAccount ? FlaskConical : UserRound
  return (
    <section
      aria-label="Acting as"
      data-acting-banner
      className="fixed inset-x-0 top-0 z-[55] bg-amber-400 pt-[env(safe-area-inset-top)] text-gray-900"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2 px-4" style={{ height: ACTING_BANNER_PX }}>
        <Icon size={15} strokeWidth={2.25} aria-hidden="true" className="shrink-0" />
        <p className="min-w-0 flex-1 truncate text-[13px]">
          {testAccount ? <>On the <strong className="font-semibold">test account</strong></> : <>Acting as <strong className="font-semibold">{driverName(actingAs)}</strong></>}
        </p>
        <button
          type="button"
          onClick={() => setActingAs(null)}
          className="shrink-0 rounded-full bg-gray-900/10 px-3 py-1 text-[13px] font-semibold transition-colors hover:bg-gray-900/20"
        >
          Switch back
        </button>
      </div>
    </section>
  )
}
