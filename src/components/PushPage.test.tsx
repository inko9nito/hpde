import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, act } from '@testing-library/react'
import { PushPage } from './PushPage'

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
    const page = container.firstElementChild as HTMLElement
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

describe('PushPage direction (#278)', () => {
  it('pushes in from the right by default', async () => {
    const { container, rerender } = render(<PushPage open><div /></PushPage>)
    const page = container.firstElementChild as HTMLElement
    expect(page.style.transform).toBe('translateX(100%)')
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    expect(page.style.transform).toBe('translateX(0)')
    rerender(<PushPage open={false}><div /></PushPage>)
    expect(page.style.transform).toBe('translateX(100%)')
  })

  it('slides up from the bottom, and back down, as a modal page', async () => {
    const onExited = vi.fn()
    const { container, rerender } = render(<PushPage open from="bottom" onExited={onExited}><div /></PushPage>)
    const page = container.firstElementChild as HTMLElement
    expect(page.style.transform).toBe('translateY(100%)')
    await act(() => new Promise(r => requestAnimationFrame(() => r(null))))
    expect(page.style.transform).toBe('translateY(0)')

    rerender(<PushPage open={false} from="bottom" onExited={onExited}><div /></PushPage>)
    expect(page.style.transform).toBe('translateY(100%)')
    slideEnd(page)
    expect(onExited).toHaveBeenCalled()
  })
})
