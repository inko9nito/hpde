import '@testing-library/jest-dom'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, renderHook, screen, fireEvent, act } from '@testing-library/react'
import { PagedSheet, Sheet, useBottomSheetOpen } from './Sheet'
import { PullToRefresh } from './PullToRefresh'
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

  it('says it’s up, for the status bar to dim with the page, till it starts sliding away (#445)', () => {
    const open = renderHook(() => useBottomSheetOpen())
    expect(open.result.current).toBe(false)
    renderSheet()
    expect(open.result.current).toBe(true)
    fireEvent.click(screen.getByRole('button', { name: 'Close' }))
    expect(open.result.current).toBe(false)
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

describe('a sheet with a page pushed in it (#445)', () => {
  afterEach(() => vi.useRealTimers())

  function renderPaged(onBack = vi.fn()) {
    const onClose = vi.fn()
    render(
      <PagedSheet
        label="8:30 AM"
        heading={<h2>8:30 AM</h2>}
        onClose={onClose}
        page={{ label: 'Lap times, 8:30 AM', open: true, onExited: () => {}, onBack, children: <h1>Lap times</h1> }}
      >
        <nav aria-label="Session info">The list</nav>
      </PagedSheet>,
    )
    return { onClose, onBack, dialog: screen.getByRole('dialog', { name: 'Lap times, 8:30 AM' }) }
  }

  it('is named for the page, with the list under it hidden', () => {
    const { dialog } = renderPaged()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Lap times')
    expect(screen.queryByRole('navigation', { name: 'Session info' })).not.toBeInTheDocument()
    expect(dialog.querySelector('[data-sheet-page]')).toBeInTheDocument()
  })

  it('dragged down far enough, goes back a page rather than closing, as its Cancel does', () => {
    vi.useFakeTimers()
    const { onClose, onBack, dialog } = renderPaged()
    drag(dialog.querySelector('[data-sheet-handle]')!, 150)
    expect(onBack).toHaveBeenCalledTimes(1)
    // Up it springs, as the page slides out.
    expect(dialog.style.transform).toBe('')
    act(() => { vi.advanceTimersByTime(SETTLE_MS) })
    expect(onClose).not.toHaveBeenCalled()
  })

  it('goes back a page on Escape', () => {
    const { onClose, onBack } = renderPaged()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onBack).toHaveBeenCalledTimes(1)
    expect(onClose).not.toHaveBeenCalled()
  })
})

describe('pull to refresh', () => {
  // A finger pulling down from the top of whatever's under it.
  function pull(el: Element) {
    fireEvent.touchStart(el, { touches: [{ clientX: 100, clientY: 100 }] })
    const move = new Event('touchmove', { bubbles: true, cancelable: true })
    Object.assign(move, { touches: [{ clientX: 100, clientY: 200 }] })
    el.dispatchEvent(move)
    fireEvent.touchEnd(el, { touches: [] })
    return move.defaultPrevented
  }

  it('leaves a page sheet’s drag down to the sheet: it doesn’t reload the page under it (#445)', () => {
    render(
      <PullToRefresh>
        <p>The page</p>
        <div data-page-sheet><p>A page sheet</p></div>
      </PullToRefresh>,
    )
    expect(pull(screen.getByText('A page sheet'))).toBe(false)
    expect(pull(screen.getByText('The page'))).toBe(true)
  })
})
