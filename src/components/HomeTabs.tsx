import type { ComponentType, CSSProperties, ReactNode } from 'react'
import { CalendarDays, ClipboardCheck, Ellipsis, Route, Share, Smartphone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GarageIcon } from './CarIcons'
import { AccountButton } from './AccountButton'
import { BackButton } from './EventHeader'
import { Footer } from './Footer'
import { SHARE_HASH } from './ShareSheet'

// The app's top-level sections (#274): Events (the list of events), Tracks
// (lap times by track layout) and More (#345), picked from a tab bar along
// the bottom, as in an iOS app. More is the rest — Instructor evaluations
// and the Garage, each of which slides in over it, as pushed pages — an
// event, a track — slide in over the tabs; and Share and the iOS widget
// (#416), which slide up — as tiles.

export type HomeTab = 'events' | 'tracks' | 'more'

export const HOME_TAB_HASH: Record<HomeTab, string> = {
  events: '#/',
  tracks: '#/tracks',
  more: '#/more',
}

/** The pages the More tab lists (#345). */
export type MorePage = 'evaluations' | 'garage'

export const MORE_PAGE_HASH: Record<MorePage, string> = {
  evaluations: '#/evaluations',
  garage: '#/garage',
}

/** The More page a hash is; null for anything else. */
export function morePageFromHash(hash: string): MorePage | null {
  const page = (Object.keys(MORE_PAGE_HASH) as MorePage[]).find(p => MORE_PAGE_HASH[p] === hash)
  return page ?? null
}

/** The tab a hash is the page of; null for anything else. */
export function homeTabFromHash(hash: string): HomeTab | null {
  const tab = (Object.keys(HOME_TAB_HASH) as HomeTab[]).find(t => HOME_TAB_HASH[t] === hash)
  return tab ?? null
}

/** The tab bar's height, above the safe area; pages leave this much room at the bottom. */
export const TAB_BAR_PX = 56

const TABS: readonly { id: HomeTab; label: string; Icon: LucideIcon }[] = [
  { id: 'events', label: 'Events', Icon: CalendarDays },
  { id: 'tracks', label: 'Tracks', Icon: Route },
  { id: 'more', label: 'More', Icon: Ellipsis },
]

export function TabBar({ active, style }: { active: HomeTab; style?: CSSProperties }) {
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      style={style}
    >
      <div className="mx-auto flex max-w-lg" style={{ height: TAB_BAR_PX }}>
        {TABS.map(({ id, label, Icon }) => {
          const current = id === active
          return (
            <a
              key={id}
              href={HOME_TAB_HASH[id]}
              aria-current={current ? 'page' : undefined}
              className={`relative flex flex-1 flex-col items-center justify-center gap-1 font-rubik text-[11px] transition-colors ${
                current ? 'font-medium text-red-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {/* The current tab is red, with a line along the top over the bar's border (#371). */}
              {current && <span className="absolute inset-x-2 -top-px h-0.5 bg-red-600" aria-hidden="true" />}
              <Icon size={22} strokeWidth={current ? 2.25 : 2} aria-hidden="true" />
              {label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

/**
 * A tab's title, with the account button across from it — its menu has
 * Edit profile, Switch driver and Log out (#416); `children` go under it.
 */
export function HomeHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-rubik text-2xl font-bold leading-tight text-gray-900">{title}</h1>
        <AccountButton reserveSpace={false} />
      </div>
      {children}
    </div>
  )
}

/**
 * A page pushed over a tab (#345): Back at the top, as on an event's page,
 * in a bar that stays there; and under it the page's title, as big and
 * where a tab's is (Tracks), so it reads as a page of its own.
 */
export function SubPageHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <div className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur">
        <div className="mx-auto flex h-[52px] max-w-lg items-center px-4">
          <BackButton onClick={onBack} />
        </div>
      </div>
      <div className="mx-auto max-w-lg px-3 sm:px-4">
        <h1 className="font-rubik text-2xl font-bold leading-tight text-gray-900">{title}</h1>
      </div>
    </>
  )
}

/** A Lucide icon, or one of the car icons (#417) that take its props. */
type TileIcon = ComponentType<{ size?: number; strokeWidth?: number; className?: string; 'aria-hidden'?: 'true' }>

const MORE_ITEMS: readonly { href: string; label: string; Icon: TileIcon }[] = [
  { href: MORE_PAGE_HASH.evaluations, label: 'Instructor evaluations', Icon: ClipboardCheck },
  { href: MORE_PAGE_HASH.garage, label: 'Garage', Icon: GarageIcon },
  // From the menu that was beside the account button (#416): a sheet (#411)
  // and a page sheet (#415), both up from the bottom.
  { href: SHARE_HASH, label: 'Share', Icon: Share },
  { href: '#/widget-setup', label: 'iOS widget', Icon: Smartphone },
]

/**
 * The More tab (#345): the rest of the app, as tiles (#371) — each opening
 * its page over it — with outlined icons, as in the tab bar it's the
 * overflow of (white on black is for tracks). The build date under them
 * (#395), out of the way of the events list.
 */
export function MoreTab() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-3 py-4 sm:px-4 sm:py-6">
        <HomeHeader title="More" />
        <ul className="grid grid-cols-2 gap-3" aria-label="More">
          {MORE_ITEMS.map(({ href, label, Icon }) => (
            <li key={href} className="flex">
              <a
                href={href}
                className="flex min-h-[112px] w-full flex-col items-center gap-2.5 rounded-2xl border border-gray-200 bg-white px-3 py-5 text-center transition-colors hover:bg-gray-50 active:bg-gray-100"
              >
                <Icon size={28} strokeWidth={1.75} className="shrink-0 text-gray-700" aria-hidden="true" />
                <span className="font-rubik text-[15px] leading-tight text-gray-900">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}
