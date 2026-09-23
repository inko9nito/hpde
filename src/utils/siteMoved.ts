// The app moved from GitHub Pages to Netlify (#246), and GitHub Pages stopped
// deploying (#227). What's left there is the last build, whose pages only
// point visitors at the new address.
export const SITE_URL = 'https://myhpde.netlify.app/'

type SiteLocation = Pick<Location, 'hostname' | 'search'>

/** True on the old GitHub Pages site; `?moved` forces it anywhere, for previewing. */
export function isOldSite(loc: SiteLocation): boolean {
  if (new URLSearchParams(loc.search).has('moved')) return true
  return loc.hostname.endsWith('github.io')
}

/** Same page on the new site: a bookmarked event opens that event there. */
export function newSiteUrl(hash: string): string {
  return hash && hash !== '#' ? `${SITE_URL}${hash}` : SITE_URL
}
