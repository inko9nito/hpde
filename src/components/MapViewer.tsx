import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { REST, clampView, distance, pinch, toggleZoom, zoomAt } from '../utils/zoom'
import type { Bounds, Point, View } from '../utils/zoom'

interface Props {
  src: string
  alt: string
  onClose: () => void
}

/** How far a finger may drift and still count as a tap. */
const TAP_SLOP = 8
const DOUBLE_TAP_MS = 300

interface Pinch { ids: [number, number]; start: [Point, Point]; view: View }
interface Tap { start: Point; onImage: boolean; moved: boolean }

/**
 * Full-screen track map that zooms on its own (#259): pinch, drag, double-tap
 * and trackpad / ctrl-wheel zoom move the map, never the page. Without this
 * a pinch zoomed the whole app, and closing the map left it zoomed in.
 */
export function MapViewer({ src, alt, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [view, setView] = useState<View>(REST)
  const [animate, setAnimate] = useState(false)
  // Gesture state lives in refs: pointer events arrive faster than renders.
  const viewRef = useRef<View>(REST)
  const pointers = useRef(new Map<number, Point>())
  const pinchRef = useRef<Pinch | null>(null)
  const tapRef = useRef<Tap | null>(null)
  const lastTap = useRef<{ time: number; at: Point } | null>(null)

  function apply(next: View, animated: boolean) {
    viewRef.current = next
    setView(next)
    setAnimate(animated)
  }

  /** A point relative to the stage's center, where the fitted map sits. */
  function toStage(e: { clientX: number; clientY: number }): Point {
    const r = stageRef.current!.getBoundingClientRect()
    return { x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 }
  }

  function bounds(): Bounds {
    const stage = stageRef.current!
    const img = imgRef.current!
    // offsetWidth/Height: the map's fitted size, before the zoom transform.
    return {
      imageWidth: img.offsetWidth,
      imageHeight: img.offsetHeight,
      stageWidth: stage.clientWidth,
      stageHeight: stage.clientHeight,
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current!
    const stage = stageRef.current!
    const previousFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    // `touch-action: none` keeps Safari from zooming the page; its own
    // gesture events are cancelled too, for older iOS. The touchmove
    // cancel also stops the page behind from scrolling.
    const cancel = (e: Event) => e.preventDefault()
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Trackpad pinches arrive as ctrl+wheel, in small steps.
      const pixels = e.deltaY * (e.deltaMode === 1 ? 16 : 1)
      const factor = Math.exp(-pixels * (e.ctrlKey ? 0.01 : 0.002))
      apply(zoomAt(viewRef.current, factor, toStage(e), bounds()), false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const onResize = () => apply(clampView(viewRef.current, bounds()), false)

    for (const type of ['gesturestart', 'gesturechange', 'touchmove']) {
      dialog.addEventListener(type, cancel, { passive: false })
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      for (const type of ['gesturestart', 'gesturechange', 'touchmove']) {
        dialog.removeEventListener(type, cancel)
      }
      stage.removeEventListener('wheel', onWheel)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      previousFocus?.focus?.()
    }
    // Set up once; handlers read the latest view from viewRef.
  }, [])

  function onPointerDown(e: ReactPointerEvent) {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    // Keep getting this pointer's moves when it leaves the map. Throws for
    // a pointer the browser doesn't know (e.g. a synthetic one).
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch { /* fine */ }
    const at = toStage(e)
    pointers.current.set(e.pointerId, at)
    if (pointers.current.size === 1) {
      tapRef.current = { start: at, onImage: e.target === imgRef.current, moved: false }
    } else if (pointers.current.size === 2) {
      tapRef.current = null
      const [a, b] = [...pointers.current.entries()]
      pinchRef.current = { ids: [a[0], b[0]], start: [a[1], b[1]], view: viewRef.current }
    }
  }

  function onPointerMove(e: ReactPointerEvent) {
    const previous = pointers.current.get(e.pointerId)
    if (!previous) return
    const at = toStage(e)
    pointers.current.set(e.pointerId, at)
    const tap = tapRef.current
    if (tap && distance(at, tap.start) > TAP_SLOP) tap.moved = true

    const p = pinchRef.current
    if (p) {
      const now = p.ids.map(id => pointers.current.get(id)!) as [Point, Point]
      apply(pinch(p.view, p.start, now, bounds()), false)
    } else if (pointers.current.size === 1 && viewRef.current.scale > 1) {
      const v = viewRef.current
      apply(clampView({ ...v, x: v.x + at.x - previous.x, y: v.y + at.y - previous.y }, bounds()), false)
    }
  }

  function onPointerEnd(e: ReactPointerEvent) {
    if (!pointers.current.delete(e.pointerId)) return
    // Lifting one finger of a pinch leaves the other dragging the map.
    if (pinchRef.current?.ids.includes(e.pointerId)) pinchRef.current = null
    if (pointers.current.size > 0) return
    const tap = tapRef.current
    tapRef.current = null
    if (e.type !== 'pointerup' || !tap || tap.moved) return

    if (!tap.onImage) {
      onClose()
      return
    }
    const at = toStage(e)
    const last = lastTap.current
    if (last && e.timeStamp - last.time < DOUBLE_TAP_MS && distance(at, last.at) < TAP_SLOP * 4) {
      lastTap.current = null
      apply(toggleZoom(viewRef.current, at, bounds()), true)
    } else {
      lastTap.current = { time: e.timeStamp, at }
    }
  }

  const zoomed = view.scale > 1
  // Portalled: the event page sits inside transformed wrappers (PushPage,
  // PullToRefresh), which would pin a `fixed` overlay to the scrolling
  // content instead of the viewport.
  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[60] touch-none select-none overscroll-none bg-black/90"
    >
      <div
        ref={stageRef}
        data-map-stage
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        className="absolute inset-0 flex items-center justify-center overflow-hidden p-4"
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          draggable={false}
          onTransitionEnd={() => setAnimate(false)}
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transition: animate ? 'transform 200ms ease-out' : 'none',
          }}
          className={`max-h-full max-w-full rounded-lg [-webkit-touch-callout:none] ${zoomed ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
        />
      </div>
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Close map"
        // Dark chip, like the thumbnail's expand button: stays visible over a
        // zoomed-in (mostly white) map.
        className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] inline-grid h-10 w-10 place-items-center rounded-full bg-black/60 text-white ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/80"
      >
        <X size={20} />
      </button>
    </div>,
    document.body,
  )
}
