import { useState } from 'react'
import { FlaskConical, UserRound } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'
import { driverName } from '../data/drivers'
import { Avatar } from './Avatar'
import { AccountMenu } from './AccountMenu'
import { EditProfilePage } from './EditProfilePage'
import { SwitchDriverSheet } from './SwitchDriverSheet'

/**
 * Header account control. Signed out → "Sign in" (Google). Signed in → the
 * user's avatar/initial, which opens their menu (#416): Edit profile,
 * Switch driver for admins, and Log out. While loading, a dimmed person icon holds the
 * spot. Where sign-in isn't available it renders an equally sized empty box
 * so headers that rely on it for symmetry (the event page's centered
 * picker) don't shift — or nothing, when `reserveSpace` is false.
 */
export function AccountButton({ reserveSpace = true }: { reserveSpace?: boolean }) {
  const { status, user, signIn, actingAs, testAccount } = useAuth()
  // What's open from it: its menu, and what the menu opens.
  const [open, setOpen] = useState<'menu' | 'profile' | 'switch' | null>(null)
  const base =
    'inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors'

  if (status === 'signed-in' && user) {
    return (
      <>
      <button
        onClick={() => setOpen('menu')}
        aria-haspopup="dialog"
        aria-expanded={open === 'menu'}
        aria-label={testAccount ? `Account: ${user.email}, on the test account` : actingAs ? `Account: ${user.email}, acting as ${driverName(actingAs)}` : `Account: ${user.email}`}
        className={`${base} relative hover:bg-gray-100`}
      >
        <Avatar name={user.name ?? user.email} url={user.avatarUrl} size={28} />
        {/* Acting as the test account (#309) or another driver (#396): theirs is what's showing. */}
        {actingAs && (
          <span
            className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-amber-400 text-gray-900 ring-2 ring-white"
            data-test-account={testAccount || undefined}
            title={driverName(actingAs)}
          >
            {testAccount
              ? <FlaskConical size={10} strokeWidth={2.5} aria-hidden="true" />
              : <UserRound size={10} strokeWidth={2.5} aria-hidden="true" />}
          </span>
        )}
      </button>
      {open === 'menu' && (
        <AccountMenu
          onClose={() => setOpen(null)}
          onEditProfile={() => setOpen('profile')}
          onSwitchDriver={() => setOpen('switch')}
        />
      )}
      {open === 'profile' && <EditProfilePage onClosed={() => setOpen(null)} />}
      {open === 'switch' && <SwitchDriverSheet onClose={() => setOpen(null)} />}
      </>
    )
  }

  if (status === 'signed-out') {
    return (
      <button
        onClick={signIn}
        aria-label="Sign in"
        className={`${base} text-gray-500 hover:bg-gray-100 hover:text-gray-900`}
      >
        <UserRound size={18} />
      </button>
    )
  }

  // Still finding out (the widget loads after the page, and on the way back
  // from Google the login takes a moment): show the same person icon the
  // signed-out button uses, so the avatar replaces it in place instead of
  // popping in and shoving the header over (#231).
  if (status === 'loading') {
    return (
      <div aria-hidden="true" className={`${base} text-gray-300`}>
        <UserRound size={18} />
      </div>
    )
  }

  return reserveSpace ? <div className="h-9 w-9 shrink-0" aria-hidden="true" /> : null
}
