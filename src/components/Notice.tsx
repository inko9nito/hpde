import { useAuth } from '../auth/AuthContext'

/** Why an admin page can't show its form (not an admin, no such event…). */
export function Notice({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
      <p className="text-sm font-medium text-gray-700">{title}</p>
      <p className="mt-1 text-xs text-gray-400">{detail}</p>
    </div>
  )
}

/** The sign-in lapsed on an admin page, and couldn't be renewed. */
export function SignedOutNotice({ detail }: { detail: string }) {
  const { signIn } = useAuth()
  return (
    <div role="alert" className="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-8 text-center">
      <p className="text-sm font-semibold text-amber-900">You’ve been signed out</p>
      <p className="mt-1 text-sm text-amber-800">{detail}</p>
      <button
        onClick={signIn}
        className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
      >
        Sign in
      </button>
    </div>
  )
}
