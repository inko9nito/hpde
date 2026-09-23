import { UserRound } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

/**
 * Header account control. Signed out → "Sign in" (Google). Signed in → the
 * user's avatar/initial, which opens the Identity account panel (shows who's
 * signed in, with Log out). While loading, a dimmed person icon holds the
 * spot. Where sign-in isn't available it renders an equally sized empty box
 * so headers that rely on it for symmetry (the event page's centered
 * picker) don't shift — or nothing, when `reserveSpace` is false.
 */
export function AccountButton({ reserveSpace = true }: { reserveSpace?: boolean }) {
  const { status, user, signIn, openAccount } = useAuth()
  const base =
    'inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors'

  if (status === 'signed-in' && user) {
    const initial = (user.name ?? user.email).trim().charAt(0).toUpperCase()
    return (
      <button
        onClick={openAccount}
        aria-label={`Account: ${user.email}`}
        className={`${base} hover:bg-gray-100`}
      >
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt=""
            referrerPolicy="no-referrer"
            className="h-7 w-7 rounded-full"
          />
        ) : (
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gray-900 text-xs font-semibold text-white">
            {initial}
          </span>
        )}
      </button>
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
