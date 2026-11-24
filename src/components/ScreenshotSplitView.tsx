import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { PAGE_HEADER_PX } from './PageHeader'
import { PushPage } from './PushPage'

/** A screenshot to show: its object URL, and its file's name. */
export interface Shot { url: string; name: string }

// How tall the screenshots' pane is on a phone, as a share of the split: as
// it opens, and as far as the divider goes either way.
export const SPLIT_START_PCT = 42
const SPLIT_MIN_PCT = 20
const SPLIT_MAX_PCT = 75
// How far it zooms in, and to what a double tap takes it.
const MAX_ZOOM = 4
const TAP_ZOOM = 2.5

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const widthAt = (zoom: number) => `calc(min(100%, 36rem) * ${zoom})`

/**
 * Split View (#483), as BEI's bill review has it: a page sheet of its own,
 * stacked over the sheet whose form it shows, with the screenshots the
 * form was filled in from, to check one against the other. On a phone the
 * screenshots are over the form, the divider between dragged to give
 * either more room; on a wide screen, side by side. Each scrolls on its
 * own. The screenshots fit the pane's width and zoom: pinch, double-tap,
 * or pinch on a trackpad. Done, Escape or a drag down by its toolbar
 * takes it back down to the sheet, whose Save saves.
 */
export function ScreenshotSplitView({ shots, onClose, children }: {
  shots: Shot[]
  /** Once it's slid away. */
  onClose: () => void
  /** The form. */
  children: ReactNode
}) {
  const [open, setOpen] = useState(true)
  const [pct, setPct] = useState(SPLIT_START_PCT)
  const splitRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y: number; pct: number } | null>(null)
  const close = () => setOpen(false)

  // Escape takes it down, not the sheet under it.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      setOpen(false)
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [])

  return createPortal(
    <PushPage open={open} onExited={onClose} onDismiss={close} raised from="bottom" sheet>
      {/* On its way out once closed: gone to a screen reader, and to taps. */}
      <div role="dialog" aria-label="Review import" aria-hidden={!open || undefined} inert={!open || undefined} className="flex h-full flex-col bg-white" data-split-view>
      {/* Not the sheet's own name again: what this one's for. Held to drag it down. */}
      <div className="shrink-0 border-b border-gray-500/20 bg-white" data-sheet-grab>
        <div className="mx-auto grid max-w-lg grid-cols-[minmax(5rem,1fr)_minmax(0,max-content)_minmax(5rem,1fr)] items-center gap-2 px-2" style={{ height: PAGE_HEADER_PX }}>
          <span />
          <h2 className="truncate text-center text-[17px] font-semibold leading-[22px] text-gray-900">
            Review import
          </h2>
          <button
            type="button"
            onClick={close}
            className="justify-self-end rounded-lg px-2 py-2 text-[17px] font-semibold text-blue-600 hover:text-blue-700"
          >
            Done
          </button>
        </div>
      </div>
      <div ref={splitRef} className="flex min-h-0 flex-1 flex-col md:flex-row">
        <ScreenshotPane shots={shots} style={{ flexBasis: `${pct}%` }} />
        {/* The divider: a phone's only. */}
        <div
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize Split View"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={SPLIT_MIN_PCT}
          aria-valuemax={SPLIT_MAX_PCT}
          tabIndex={0}
          data-own-gestures
          data-split-divider
          className="flex h-7 shrink-0 cursor-row-resize touch-none select-none items-center justify-center border-y border-gray-700 bg-gray-900 md:hidden"
          onPointerDown={e => {
            drag.current = { y: e.clientY, pct }
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={e => {
            const start = drag.current
            const height = splitRef.current?.clientHeight
            if (!start || !height) return
            setPct(clamp(start.pct + ((e.clientY - start.y) / height) * 100, SPLIT_MIN_PCT, SPLIT_MAX_PCT))
          }}
          onPointerUp={() => { drag.current = null }}
          onPointerCancel={() => { drag.current = null }}
          onKeyDown={e => {
            const step = e.key === 'ArrowUp' ? -5 : e.key === 'ArrowDown' ? 5 : 0
            if (!step) return
            e.preventDefault()
            setPct(p => clamp(p + step, SPLIT_MIN_PCT, SPLIT_MAX_PCT))
          }}
        >
          <span className="h-1 w-10 rounded-full bg-gray-500" />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain md:w-[28rem] md:flex-none md:border-l md:border-gray-200" data-split-form>
          {children}
        </div>
      </div>
      </div>
    </PushPage>,
    document.body,
  )
}

/**
 * The screenshots, a page each, swiped left and right between — a long
 * card's parts, in the order they were picked. With more than one, a badge
 * says which this is ("2 of 3") and dots under it say there are more; a
 * dot taps to its page.
 */
function ScreenshotPane({ shots, style }: { shots: Shot[]; style: React.CSSProperties }) {
  const [page, setPage] = useState(0)
  const pagerRef = useRef<HTMLDivElement>(null)
  const many = shots.length > 1
  const go = (i: number) => {
    const pager = pagerRef.current
    if (pager) pager.scrollTo({ left: i * pager.clientWidth, behavior: 'smooth' })
  }

  return (
    <section aria-label="Screenshots" className="relative min-h-0 shrink-0 bg-gray-950 md:!basis-auto md:flex-1" style={style}>
      <div
        ref={pagerRef}
        className="absolute inset-0 flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={e => {
          const el = e.currentTarget
          if (el.clientWidth) setPage(clamp(Math.round(el.scrollLeft / el.clientWidth), 0, shots.length - 1))
        }}
        data-split-pager
      >
        {shots.map((shot, i) => <ZoomPage key={shot.url} shot={shot} label={many ? `Screenshot ${i + 1} of ${shots.length}` : undefined} />)}
      </div>
      {many && (<>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur" aria-live="polite" data-split-page>
          {page + 1} of {shots.length}
        </span>
        <div className="absolute inset-x-0 bottom-3 flex justify-center" data-split-dots>
          <div className="flex items-center gap-2 rounded-full bg-black/50 px-2.5 py-1.5 backdrop-blur">
            {shots.map((shot, i) => (
              <button
                key={shot.url}
                type="button"
                onClick={() => go(i)}
                aria-label={`Screenshot ${i + 1}`}
                aria-current={i === page || undefined}
                className={`h-2 w-2 rounded-full transition-colors ${i === page ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </>)}
    </section>
  )
}

/**
 * One screenshot, at the pane's width, zoomed by `zoom`: it scrolls up and
 * down, and once zoomed, across too, till its edge, where a swipe goes on
 * to the next. A pinch zooms about the fingers, a double tap zooms in
 * there (or back out).
 */
function ZoomPage({ shot, label }: { shot: Shot; label?: string }) {
  const paneRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  // Kept off React's state: a pinch sets it every frame.
  const zoom = useRef(1)

  useEffect(() => {
    const pane = paneRef.current
    const content = contentRef.current
    if (!pane || !content) return

    /** Zooms to `z`, keeping what's at (x, y) in the pane — from its top left — where it is. */
    const zoomTo = (z: number, x: number, y: number, from = { z: zoom.current, left: pane.scrollLeft, top: pane.scrollTop }) => {
      const next = clamp(z, 1, MAX_ZOOM)
      const cx = (from.left + x) / from.z
      const cy = (from.top + y) / from.z
      zoom.current = next
      content.style.width = widthAt(next)
      pane.scrollLeft = cx * next - x
      pane.scrollTop = cy * next - y
    }
    const at = (t: { clientX: number; clientY: number }) => {
      const r = pane.getBoundingClientRect()
      return { x: t.clientX - r.left, y: t.clientY - r.top }
    }

    let pinch: { d: number; x: number; y: number; from: { z: number; left: number; top: number } } | null = null
    let lastTap = { t: 0, x: 0, y: 0 }
    const spread = (ts: TouchList) => Math.hypot(ts[0].clientX - ts[1].clientX, ts[0].clientY - ts[1].clientY)

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 2) return
      const mid = at({ clientX: (e.touches[0].clientX + e.touches[1].clientX) / 2, clientY: (e.touches[0].clientY + e.touches[1].clientY) / 2 })
      pinch = { d: spread(e.touches), ...mid, from: { z: zoom.current, left: pane.scrollLeft, top: pane.scrollTop } }
    }
    const onMove = (e: TouchEvent) => {
      if (!pinch || e.touches.length !== 2) return
      if (e.cancelable) e.preventDefault()
      zoomTo(pinch.from.z * (spread(e.touches) / pinch.d), pinch.x, pinch.y, pinch.from)
    }
    const onEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinch = null
      // A second tap, soon and near the first: in there, or back out.
      if (e.touches.length || e.changedTouches.length !== 1) return
      const t = e.changedTouches[0]
      const near = Math.hypot(t.clientX - lastTap.x, t.clientY - lastTap.y) < 30
      if (e.timeStamp - lastTap.t < 300 && near) {
        const { x, y } = at(t)
        zoomTo(zoom.current > 1 ? 1 : TAP_ZOOM, x, y)
        lastTap = { t: 0, x: 0, y: 0 }
        if (e.cancelable) e.preventDefault()
      } else lastTap = { t: e.timeStamp, x: t.clientX, y: t.clientY }
    }
    // Safari's own pinch would zoom the whole page.
    const noPageZoom = (e: Event) => e.preventDefault()
    // A trackpad's pinch comes as a wheel with Ctrl held.
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      const { x, y } = at(e)
      zoomTo(zoom.current * Math.exp(-e.deltaY / 100), x, y)
    }
    const onDouble = (e: MouseEvent) => {
      const { x, y } = at(e)
      zoomTo(zoom.current > 1 ? 1 : TAP_ZOOM, x, y)
    }

    pane.addEventListener('touchstart', onStart, { passive: true })
    pane.addEventListener('touchmove', onMove, { passive: false })
    pane.addEventListener('touchend', onEnd, { passive: false })
    pane.addEventListener('touchcancel', onEnd)
    pane.addEventListener('gesturestart', noPageZoom)
    pane.addEventListener('wheel', onWheel, { passive: false })
    pane.addEventListener('dblclick', onDouble)
    return () => {
      pane.removeEventListener('touchstart', onStart)
      pane.removeEventListener('touchmove', onMove)
      pane.removeEventListener('touchend', onEnd)
      pane.removeEventListener('touchcancel', onEnd)
      pane.removeEventListener('gesturestart', noPageZoom)
      pane.removeEventListener('wheel', onWheel)
      pane.removeEventListener('dblclick', onDouble)
    }
  }, [])

  return (
    <div
      ref={paneRef}
      role="group"
      aria-label={label}
      className="h-full w-full shrink-0 snap-center snap-always overflow-auto overscroll-y-contain [touch-action:pan-x_pan-y]"
      data-own-gestures
      data-split-screenshots
    >
      {/* The pane's width — at most a phone's, on a wide screen — times the zoom. */}
      <div ref={contentRef} className="mx-auto" style={{ width: widthAt(1) }}>
        <img src={shot.url} alt={shot.name} draggable={false} className="block w-full select-none" />
      </div>
    </div>
  )
}
