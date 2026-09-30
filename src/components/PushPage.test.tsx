import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, act } from '@testing-library/react'
import { PushPage, useUnderPushedPages } from './PushPage'
import { IOS_SPRING_MS } from '../utils/iosSpring'

function slideEnd(el: HTMLElement) {
  // jsdom's TransitionEvent lacks propertyName, so build it by hand.
  const e = new Event('transitionend', { bubbles: true })
  Object.defineProperty(e, 'propertyName', { value: 'transform' })
  fireEvent(el, e)
}

describe('PushPage entered state (#245)', () => {
  it('reports entered only once the slide-in finishes, and not while leaving', async () => {
    const onEnteredChange = vi.fn()
    const { container, rerender } = render(
      <PushPage open onEnteredChange={onEnteredChange}><div /></PushPage>,
    )
    const page = container.lastElementChild as HTMLElement
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    expect(onEnteredChange).toHaveBeenLastCalledWith(false)
    expect(page.className).toContain('bg-gray-50')

    slideEnd(page)
    expect(onEnteredChange).toHaveBeenLastCalledWith(true)
    expect(page.className).toContain('bg-white')

    rerender(<PushPage open={false} onEnteredChange={onEnteredChange}><div /></PushPage>)
    expect(onEnteredChange).toHaveBeenLastCalledWith(false)
    expect(page.className).toContain('bg-gray-50')
  })

  it('ignores transitions bubbling up from its content', async () => {
    const onEnteredChange = vi.fn()
    const { getByTestId } = render(
      <PushPage open onEnteredChange={onEnteredChange}><div data-testid="child" /></PushPage>,
    )
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    slideEnd(getByTestId('child'))
    expect(onEnteredChange).not.toHaveBeenCalledWith(true)
  })

  it('counts as entered straight away when it skips the slide-in', () => {
    const onEnteredChange = vi.fn()
    render(<PushPage open skipEnterAnimation onEnteredChange={onEnteredChange}><div /></PushPage>)
    expect(onEnteredChange).toHaveBeenLastCalledWith(true)
  })
})

describe('PushPage after a swipe the browser animated (#355)', () => {
  it('closes in place, gone at once rather than sliding out again', async () => {
    const onExited = vi.fn()
    const onEnteredChange = vi.fn()
    const { container, rerender } = render(<PushPage open onExited={onExited} onEnteredChange={onEnteredChange}><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    slideEnd(page)
    expect(onEnteredChange).toHaveBeenLastCalledWith(true)

    rerender(<PushPage open={false} instant onExited={onExited} onEnteredChange={onEnteredChange}><div /></PushPage>)
    expect(page.style.transform).toBe('translateX(100%)')
    expect(page.style.transition).toBe('none')
    expect(onEnteredChange).toHaveBeenLastCalledWith(false)
    expect(onExited).toHaveBeenCalledTimes(1)
  })

  it('opens in place, rather than sliding in after the browser has', () => {
    const onEnteredChange = vi.fn()
    const { container } = render(<PushPage open instant onEnteredChange={onEnteredChange}><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    expect(page.style.transform).toBe('translateX(0)')
    expect(page.style.transition).toBe('none')
    expect(onEnteredChange).toHaveBeenLastCalledWith(true)
  })

  it('reopens in place too, when swiped forward to while still mounted', async () => {
    const { container, rerender } = render(<PushPage open={false}><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    rerender(<PushPage open instant><div /></PushPage>)
    expect(page.style.transform).toBe('translateX(0)')
  })

  it('still slides for any other move', async () => {
    const onExited = vi.fn()
    const { container, rerender } = render(<PushPage open instant onExited={onExited}><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    rerender(<PushPage open={false} onExited={onExited}><div /></PushPage>)
    expect(page.style.transform).toBe('translateX(100%)')
    expect(page.style.transition).toContain('transform')
    expect(onExited).not.toHaveBeenCalled()
    slideEnd(page)
    expect(onExited).toHaveBeenCalled()
  })
})

describe('PushPage timing (#367)', () => {
  it('slides with iOS’s spring', () => {
    const { container } = render(<PushPage open><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    expect(page.style.transition).toContain(`transform ${IOS_SPRING_MS}ms`)
  })

  it('keeps the page under it still until it has slid all the way out', async () => {
    const lock = () => document.documentElement.classList.contains('push-page-open')
    const { container, rerender, unmount } = render(<PushPage open><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    expect(lock()).toBe(true)
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    slideEnd(page)

    rerender(<PushPage open={false}><div /></PushPage>)
    expect(lock()).toBe(true)
    slideEnd(page)
    expect(lock()).toBe(false)
    unmount()
  })

  it('is done at once when closed before it ever slid in', () => {
    const onExited = vi.fn()
    const lock = () => document.documentElement.classList.contains('push-page-open')
    const { rerender, unmount } = render(<PushPage open onExited={onExited}><div /></PushPage>)
    rerender(<PushPage open={false} onExited={onExited}><div /></PushPage>)
    expect(onExited).toHaveBeenCalledTimes(1)
    expect(lock()).toBe(false)
    unmount()
  })

  it('is done at once when swiped away while sliding out (#355)', async () => {
    const onExited = vi.fn()
    const { container, rerender, unmount } = render(<PushPage open onExited={onExited}><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    slideEnd(page)
    rerender(<PushPage open={false} onExited={onExited}><div /></PushPage>)
    expect(onExited).not.toHaveBeenCalled()
    rerender(<PushPage open={false} instant onExited={onExited}><div /></PushPage>)
    expect(onExited).toHaveBeenCalledTimes(1)
    unmount()
  })
})

describe('what a page is pushed over (#367)', () => {
  const nextFrame = () => act(() => new Promise(r => requestAnimationFrame(() => r(null))))

  // The tabs, and two pages pushed from the right over them, each with its
  // own open state.
  function Stack({ first, second, instant = false, secondFrom = 'right' }: { first: boolean; second: boolean; instant?: boolean; secondFrom?: 'right' | 'bottom' }) {
    const tabs = useUnderPushedPages(instant)
    return (
      <>
        <div data-testid="tabs" style={tabs} />
        <div data-testid="first"><PushPage open={first} instant={instant}><div /></PushPage></div>
        <div data-testid="second"><PushPage open={second} instant={instant} from={secondFrom}><div /></PushPage></div>
      </>
    )
  }
  const pageIn = (el: HTMLElement) => el.lastElementChild as HTMLElement
  const dimIn = (el: HTMLElement) => el.querySelector<HTMLElement>('[data-covering-dim]')!

  it('slides the tabs a little way left, and darkens them, as a page covers them', async () => {
    const { getByTestId, rerender } = render(<Stack first={false} second={false} />)
    expect(getByTestId('tabs').style.transform).toBe('')

    rerender(<Stack first second={false} />)
    await nextFrame()
    expect(getByTestId('tabs').style.transform).toBe('translateX(-30%)')
    expect(getByTestId('tabs').style.transition).toContain(`transform ${IOS_SPRING_MS}ms`)
    expect(dimIn(getByTestId('first')).style.opacity).toBe('0.1')
  })

  it('does the same to a page when another is pushed over it, and back as that one goes', async () => {
    const { getByTestId, rerender } = render(<Stack first second={false} />)
    await nextFrame()
    const first = pageIn(getByTestId('first'))
    expect(first.style.transform).toBe('translateX(0)')

    rerender(<Stack first second />)
    await nextFrame()
    expect(first.style.transform).toBe('translateX(-30%)')
    expect(getByTestId('tabs').style.transform).toBe('translateX(-30%)')

    rerender(<Stack first second={false} />)
    expect(first.style.transform).toBe('translateX(0)')
    expect(dimIn(getByTestId('second')).style.opacity).toBe('0')
  })

  it('moves them at once when swiped (#355)', async () => {
    const { getByTestId, rerender } = render(<Stack first second />)
    await nextFrame()
    rerender(<Stack first second={false} instant />)
    expect(pageIn(getByTestId('first')).style.transform).toBe('translateX(0)')
    expect(pageIn(getByTestId('first')).style.transition).toBe('none')
    expect(getByTestId('tabs').style.transition).toBe('none')
  })

  it('leaves them be for a page that slides up', async () => {
    const { getByTestId } = render(<Stack first second secondFrom="bottom" />)
    await nextFrame()
    expect(pageIn(getByTestId('first')).style.transform).toBe('translateX(0)')
    expect(getByTestId('second').querySelector('[data-covering-dim]')).toBeNull()
  })

  it('lets a page closed under the page over it go at once, as that one slides away', async () => {
    const onExited = vi.fn()
    function Two({ open }: { open: boolean }) {
      return (
        <>
          <PushPage open={open} onExited={onExited}><div /></PushPage>
          <div data-testid="top"><PushPage open={open}><div /></PushPage></div>
        </>
      )
    }
    const { getByTestId, rerender } = render(<Two open />)
    await nextFrame()
    rerender(<Two open={false} />)
    expect(onExited).toHaveBeenCalledTimes(1)
    expect(pageIn(getByTestId('top')).style.transform).toBe('translateX(100%)')
  })
})

describe('PushPage direction (#278)', () => {
  it('pushes in from the right by default', async () => {
    const { container, rerender } = render(<PushPage open><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    expect(page.style.transform).toBe('translateX(100%)')
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    expect(page.style.transform).toBe('translateX(0)')
    rerender(<PushPage open={false}><div /></PushPage>)
    expect(page.style.transform).toBe('translateX(100%)')
  })

  it('slides up from the bottom, and back down, as a modal page', async () => {
    const onExited = vi.fn()
    const { container, rerender } = render(<PushPage open from="bottom" onExited={onExited}><div /></PushPage>)
    const page = container.lastElementChild as HTMLElement
    expect(page.style.transform).toBe('translateY(100%)')
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    expect(page.style.transform).toBe('translateY(0)')

    rerender(<PushPage open={false} from="bottom" onExited={onExited}><div /></PushPage>)
    expect(page.style.transform).toBe('translateY(100%)')
    slideEnd(page)
    expect(onExited).toHaveBeenCalled()
  })
})
