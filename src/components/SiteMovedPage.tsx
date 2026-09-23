import { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { NEW_SITE_URL, newSiteUrl } from '../utils/siteMoved'

const NEW_SITE_HOST = new URL(NEW_SITE_URL).host

/**
 * Shown instead of the app on the old GitHub Pages site (#246). Nothing
 * redirects on its own — the visitor taps through, having just been told
 * to update their bookmark.
 */
export function SiteMovedPage() {
  useEffect(() => {
    document.title = 'HPDE Events has moved'
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white px-6 py-10 text-center shadow-[0_1px_2px_rgba(17,24,39,0.04),0_4px_12px_rgba(17,24,39,0.05)]">
        <img
          src={`${import.meta.env.BASE_URL}icon-192.png`}
          alt=""
          width={64}
          height={64}
          className="mx-auto rounded-2xl"
        />
        <h1 className="mt-5 font-rubik text-xl font-semibold text-gray-900">
          HPDE Events has moved
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          The site now lives at{' '}
          <span className="font-medium text-gray-900">{NEW_SITE_HOST}</span>.
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Please update your bookmarks and Home Screen shortcuts.
        </p>
        <a
          href={newSiteUrl(window.location.hash)}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
        >
          Go to the new site
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </main>
  )
}
