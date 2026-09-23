import { Lock } from 'lucide-react'
import { useAuth } from '../auth/AuthContext'

interface Props {
  // What signing in unlocks, e.g. "keep private notes for each event".
  reason: string
}

/**
 * Stand-in for personal features (notes, garage) when nobody's signed in.
 * The rest of the app stays public; only private data needs an account.
 */
export function SignInPrompt({ reason }: Props) {
  const { status, signIn } = useAuth()

  if (status === 'loading') {
    return <div className="h-40" aria-busy="true" />
  }

  return (
    <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-12 text-center">
      <Lock size={20} className="mx-auto text-gray-400" aria-hidden="true" />
      <p className="mt-2 text-sm font-medium text-gray-700">Sign in to {reason}</p>
      <p className="mt-1 text-xs text-gray-400">Only you can see what you save.</p>
      {status === 'unavailable' ? (
        <p className="mt-4 text-xs text-gray-400">
          Sign-in isn't available on this version of the site.
        </p>
      ) : (
        <button
          onClick={signIn}
          className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Sign in with Google
        </button>
      )}
    </div>
  )
}
