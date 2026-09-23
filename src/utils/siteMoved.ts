// The app moved from GitHub Pages to Netlify (#246). The GitHub Pages copy
// keeps deploying — the iOS widget still reads api/events.json from it — but
// its pages now only point visitors at the new address.
export const NEW_SITE_URL = 'https://myhpde.netlify.app/'

type SiteLocation = Pick<Location, 'hostname' | 'pathname' | 'search'>

/**
 * True on the old GitHub Pages site. PR previews live on GitHub Pages too
 * (under /pr-preview/) and keep showing the app; `?moved` forces the notice
 * anywhere, so it can be previewed.
 */
export function isOldSite(loc: SiteLocation): boolean {
  if (new URLSearchParams(loc.search).has('moved')) return true
  return loc.hostname.endsWith('github.io') && !loc.pathname.includes('/pr-preview/')
}

/** Same page on the new site: a bookmarked event opens that event there. */
export function newSiteUrl(hash: string): string {
  return hash && hash !== '#' ? `${NEW_SITE_URL}${hash}` : NEW_SITE_URL
}
