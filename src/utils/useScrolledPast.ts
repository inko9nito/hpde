import { useEffect, useState } from 'react'

/**
 * Whether the page's title has scrolled up under the top bar — the cue
 * for the bar's own copy of the name, as on iOS.
 */
export function useScrolledPast(el: HTMLElement | null, offset: number): boolean {
  const [past, setPast] = useState(false)
  useEffect(() => {
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setPast(!entry.isIntersecting && entry.boundingClientRect.top < (entry.rootBounds?.top ?? offset)),
      { rootMargin: `-${offset}px 0px 0px 0px` },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [el, offset])
  return past
}
