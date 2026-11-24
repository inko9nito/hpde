import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

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
 * Split View (#483), as BEI's bill review has it: the screenshots a form was
 * filled in from beside the form, to check one against the other. On a
 * phone they're over it, the divider between dragged to give either more
 * room; on a wide screen, side by side. Each scrolls on its own. The
 * screenshots fit the pane's width and zoom: pinch, double-tap, or pinch on
 * a trackpad. On, it fills what it's in: give that a height. Off, it's
 * just the form — the same form, not one made anew, so nothing in it is
 * lost going in or out.
 */
export function ScreenshotSplitView({ on, shots, onClose, children }: {
  on: boolean
  shots: Shot[]
  onClose: () => void
  /** The form. */
  children: ReactNode
}) {
  const [pct, setPct] = useState(SPLIT_START_PCT)
  const splitRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y: number; pct: number } | null>(null)

  return (
    <div ref={splitRef} className={on ? 'flex min-h-0 flex-1 flex-col md:flex-row' : undefined} data-split-view={on || undefined}>
      {on && <ScreenshotPane shots={shots} onClose={onClose} style={{ flexBasis: `${pct}%` }} />}
      {/* The divider: a phone's only. */}
      {on && <div
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
      </div>}
      <div className={on ? 'min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain md:w-[28rem] md:flex-none md:border-l md:border-gray-200' : undefined} data-split-form={on || undefined}>
        {children}
      </div>
    </div>
  )
}

/**
 * The screenshots, one under another — a long card's parts — at the pane's
 * width, zoomed by `zoom`. Its own touches: a pinch zooms about the
 * fingers, a double tap zooms in there (or back out), and one finger
 * scrolls, never dragging the sheet it's in.
 */
function ScreenshotPane({ shots, onClose, style }: { shots: Shot[]; onClose: () => void; style: React.CSSProperties }) {
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
    <section aria-label="Screenshots" className="relative min-h-0 shrink-0 bg-gray-950 md:!basis-auto md:flex-1" style={style}>
      <div
        ref={paneRef}
        className="absolute inset-0 overflow-auto overscroll-contain [touch-action:pan-x_pan-y]"
        data-own-gestures
        data-split-screenshots
      >
        {/* The pane's width — at most a phone's, on a wide screen — times the zoom. */}
        <div ref={contentRef} className="mx-auto flex flex-col gap-1" style={{ width: widthAt(1) }}>
          {shots.map(shot => <img key={shot.url} src={shot.url} alt={shot.name} draggable={false} className="block w-full select-none" />)}
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Split View"
        className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
      >
        <X size={16} strokeWidth={2.5} aria-hidden="true" />
      </button>
    </section>
  )
}
