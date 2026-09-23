import { useEffect } from 'react'

// Browser chrome tint (#245). Safari colours the status bar / top toolbar
// from the page itself: older versions read <meta name="theme-color">,
// Safari 26 dropped that and samples the background of whatever sits at
// the top edge — a fixed element if there is one, else the body. The
// event page's header is white while the rest of the app is gray-50, so
// on event pages both signals are switched to white; index.html's meta
// and the body's gray-50 are the default everywhere else.

/** White, for pages whose top edge is the white event header. */
export const HEADER_CHROME_COLOR = '#ffffff'

function themeColorMeta(): HTMLMetaElement {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'theme-color'
    document.head.appendChild(meta)
  }
  return meta
}

/** Tints the browser chrome `color` while mounted with one; `null`
 *  leaves the page's default in place. */
export function useChromeColor(color: string | null) {
  useEffect(() => {
    if (!color) return
    const meta = themeColorMeta()
    const prevMeta = meta.content
    const prevBody = document.body.style.backgroundColor
    meta.content = color
    document.body.style.backgroundColor = color
    return () => {
      meta.content = prevMeta
      document.body.style.backgroundColor = prevBody
    }
  }, [color])
}
