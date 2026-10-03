import '@testing-library/jest-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { Sheet } from './Sheet'
import { SETTLE_MS } from './sheetGestures'

// A finger on the sheet (#387) or the page behind it (#432): touchstart,
// moves down `by` px in steps, then touchend. Whether the page was kept
// from scrolling: every move's default prevented.
function drag(el: Element, by: number, { steps = 5, end = true }: { steps?: number; end?: boolean } = {}) {
  const at = (y: number) => ({ touches: [{ clientX: 100, clientY: y }], changedTouches: [{ clientX: 100, clientY: y }] })
  fireEvent.touchStart(el, at(300))
  let prevented = true
  for (let i = 1; i <= steps; i++) {
    const move = new Event('touchmove', { bubbles: true, cancelable: true })
    Object.assign(move, at(300 + (by * i) / steps))
    el.dispatchEvent(move)
    prevented &&= move.defaultPrevented
  }
  if (end) fireEvent.touchEnd(el, { touches: [], changedTouches: [{ clientX: 100, clientY: 300 + by }] })
  return prevented
}

function renderSheet(props: Partial<React.ComponentProps<typeof Sheet>> = {}) {
  const onClose = vi.fn()
  render(
    <Sheet label="Test sheet" heading={<h2>Test sheet</h2>} onClose={onClose} {...props}>
      <p>What’s in it</p>
      <input aria-label="A box" />
    </Sheet>,
  )
  const dialog = screen.getByRole('dialog', { name: 'Test sheet' })
  return { onClose, dialog, handle: dialog.querySelector('[data-sheet-handle]')!, backdrop: dialog.previousElementSibling! }
}

describe('a sheet from the bottom', () => {
  afterEach(() => vi.useRealTimers())

  it('keeps the page behind it from scrolling while it’s open (#432)', () => {
    const { backdrop } = renderSheet()
    expect(document.documentElement).toHaveClass('bottom-sheet-open')
    // A finger on the dimmed page, either way.
    expect(drag(backdrop, 120)).toBe(true)
    expect(drag(backdrop, -120)).toBe(true)
    // And one running past the end of what's in the sheet, which doesn't scroll.
    expect(drag(screen.getByText('What’s in it'), -120)).toBe(true)
  })

  it('lets go of the page once it’s closed', () => {
    const { unmount } = render(<Sheet label="Test sheet" heading={<h2>Test sheet</h2>} onClose={() => {}}><p>In it</p></Sheet>)
    expect(document.documentElement).toHaveClass('bottom-sheet-open')
    unmount()
    expect(document.documentElement).not.toHaveClass('bottom-sheet-open')
  })

  it('drags down by its handle, and closes once let go far enough (#387)', () => {
    vi.useFakeTimers()
    const { onClose, dialog, handle, backdrop } = renderSheet()
    expect(drag(handle, 150, { end: false })).toBe(true)
    // It follows the finger, past a few px of give, and the page under it brightens.
    expect(dialog.style.transform).toBe('translateY(142px)')
    expect(Number((backdrop as HTMLElement).style.opacity)).toBeLessThan(1)
    fireEvent.touchEnd(handle, { touches: [], changedTouches: [{ clientX: 100, clientY: 450 }] })
    // Slides the rest of the way down, then closes.
    expect(onClose).not.toHaveBeenCalled()
    act(() => { vi.advanceTimersByTime(SETTLE_MS) })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('drags from what’s in it too, when that’s scrolled to the top', () => {
    vi.useFakeTimers()
    const { onClose } = renderSheet()
    drag(screen.getByText('What’s in it'), 150)
    act(() => { vi.advanceTimersByTime(SETTLE_MS) })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('springs back up when let go short of closing', () => {
    vi.useFakeTimers()
    const { onClose, dialog, handle } = renderSheet()
    // Taller than it's dragged: a third of it is further than that.
    Object.defineProperty(dialog, 'offsetHeight', { value: 600 })
    // Slowly: no flick.
    fireEvent.touchStart(handle, { touches: [{ clientX: 100, clientY: 300 }] })
    const move = new Event('touchmove', { bubbles: true, cancelable: true })
    Object.assign(move, { touches: [{ clientX: 100, clientY: 400 }] })
    handle.dispatchEvent(move)
    expect(dialog.style.transform).toBe('translateY(92px)')
    act(() => { vi.advanceTimersByTime(500) })
    fireEvent.touchEnd(handle, { touches: [] })
    expect(dialog.style.transform).toBe('')
    act(() => { vi.advanceTimersByTime(SETTLE_MS * 2) })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('leaves its text boxes alone', () => {
    vi.useFakeTimers()
    const { onClose, dialog } = renderSheet()
    expect(drag(screen.getByRole('textbox', { name: 'A box' }), 150)).toBe(false)
    expect(dialog.style.transform).toBe('')
    act(() => { vi.advanceTimersByTime(SETTLE_MS) })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('doesn’t drag while busy', () => {
    vi.useFakeTimers()
    const { onClose, dialog, handle } = renderSheet({ busy: true })
    // Still kept from scrolling the page.
    expect(drag(handle, 150)).toBe(true)
    expect(dialog.style.transform).toBe('')
    act(() => { vi.advanceTimersByTime(SETTLE_MS) })
    expect(onClose).not.toHaveBeenCalled()
  })
})
