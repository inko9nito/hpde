import { useEffect } from 'react'
import { FlaskConical } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { driverName } from '../data/drivers'
import { Avatar } from './Avatar'

// How tall the banner is, under the status bar's inset: two lines (#416).
export const ACTING_BANNER_PX = 44

/**
 * While an admin is acting as another driver or the test account (#396),
 * a strip across the top of every page saying so — amber, as the account
 * button's badge — with the way back to themselves. Plain that it's
 * someone else's app they're in (#416): that driver's picture and name,
 * and that everything shows and saves as them. Everything starts below
 * it: the page (body's padding) and the pages pushed over it (PushPage),
 * by --acting-h. Acting as themselves, there's none.
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
  const name = driverName(actingAs)
  return (
    <section
      aria-label="Acting as"
      data-acting-banner
      className="fixed inset-x-0 top-0 z-[55] bg-amber-400 pt-[env(safe-area-inset-top)] text-gray-900"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2.5 px-4" style={{ height: ACTING_BANNER_PX }}>
        {testAccount
          ? <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gray-900 text-amber-400"><FlaskConical size={14} strokeWidth={2.25} aria-hidden="true" /></span>
          : <Avatar name={name} url={actingAs.avatar} size={28} className="ring-2 ring-gray-900" />}
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13px]">
            {testAccount ? <>On the <strong className="font-semibold">test account</strong></> : <>Acting as <strong className="font-semibold">{name}</strong></>}
          </p>
          <p className="truncate text-[11px] text-gray-900/70">
            {testAccount ? 'Everything shows and saves to it' : 'Everything shows and saves as them'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActingAs(null)}
          className="shrink-0 rounded-full bg-gray-900 px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Switch back
        </button>
      </div>
    </section>
  )
}
