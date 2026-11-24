import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { PAGE_HEADER_PX } from './PageHeader'

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
// How long it takes to slide up, or down.
const SLIDE_MS = 300

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))
const widthAt = (zoom: number) => `calc(min(100%, 36rem) * ${zoom})`

/**
 * Split View (#483), as BEI's bill review has it: a screen of its own, over
 * the sheet, with the screenshots a form was filled in from and the form,
 * to check one against the other. On a phone the screenshots are over the
 * form, the divider between dragged to give either more room; on a wide
 * screen, side by side. Each scrolls on its own. The screenshots fit the
 * pane's width and zoom: pinch, double-tap, or pinch on a trackpad. It
 * slides up, as a full-screen cover does on iOS, and Done (or Escape)
 * slides it back down to the sheet, whose Save saves.
 */
export function ScreenshotSplitView({ shots, title, subtitle, onClose, children }: {
  shots: Shot[]
  title: string
  subtitle?: string
  /** Once it's slid away. */
  onClose: () => void
  /** The form. */
  children: ReactNode
}) {
  const [pct, setPct] = useState(SPLIT_START_PCT)
  const [up, setUp] = useState(false)
  const [closing, setClosing] = useState(false)
  const splitRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLButtonElement>(null)
  const drag = useRef<{ y: number; pct: number } | null>(null)
  const latest = useRef(onClose)
  latest.current = onClose
  const close = useRef(() => {})
  close.current = () => {
    if (closing) return
    setClosing(true)
    // Down it slides, then it's gone: by the clock, as it may not have got all the way up.
    setTimeout(() => latest.current(), SLIDE_MS)
  }

  // Up it slides once it's on screen, and Escape takes it down, not the sheet under it.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setUp(true))
    doneRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.stopImmediatePropagation()
      close.current()
    }
    window.addEventListener('keydown', onKey, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('keydown', onKey, true)
    }
  }, [])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Split View"
      className="fixed inset-0 z-[60] flex flex-col bg-white pt-[env(safe-area-inset-top)] ease-out"
      style={{ transform: up && !closing ? 'translateY(0)' : 'translateY(100%)', transition: `transform ${SLIDE_MS}ms` }}
      data-split-view
    >
      <div className="shrink-0 border-b border-gray-500/20 bg-white">
        <div className="mx-auto grid max-w-lg grid-cols-[minmax(5rem,1fr)_minmax(0,max-content)_minmax(5rem,1fr)] items-center gap-2 px-2" style={{ height: PAGE_HEADER_PX }}>
          <span />
          <div className="min-w-0 text-center">
            <h2 className="truncate text-[17px] font-semibold leading-[22px] text-gray-900">{title}</h2>
            {subtitle && <p className="truncate text-[13px] leading-4 text-gray-500">{subtitle}</p>}
          </div>
          <button
            ref={doneRef}
            type="button"
            onClick={() => close.current()}
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
    </div>,
    document.body,
  )
}

/**
 * The screenshots, one under another — a long card's parts — at the pane's
 * width, zoomed by `zoom`. Its own touches: a pinch zooms about the
 * fingers, a double tap zooms in there (or back out), and one finger
 * scrolls.
 */
function ScreenshotPane({ shots, style }: { shots: Shot[]; style: React.CSSProperties }) {
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
        data-split-screenshots
      >
        {/* The pane's width — at most a phone's, on a wide screen — times the zoom. */}
        <div ref={contentRef} className="mx-auto flex flex-col gap-1" style={{ width: widthAt(1) }}>
          {shots.map(shot => <img key={shot.url} src={shot.url} alt={shot.name} draggable={false} className="block w-full select-none" />)}
        </div>
      </div>
    </section>
  )
}
