import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useChromeColor } from './chromeColor'

function themeColor() {
  return document.head.querySelector('meta[name="theme-color"]')?.getAttribute('content') ?? null
}

describe('useChromeColor (#245)', () => {
  beforeEach(() => {
    document.head.querySelectorAll('meta[name="theme-color"]').forEach(m => m.remove())
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = '#f9fafb'
    document.head.appendChild(meta)
    document.body.style.backgroundColor = ''
  })

  it('tints theme-color and the body, and restores both on unmount', () => {
    const { unmount } = renderHook(() => useChromeColor('#ffffff'))
    expect(themeColor()).toBe('#ffffff')
    expect(document.body.style.backgroundColor).toBe('rgb(255, 255, 255)')
    unmount()
    expect(themeColor()).toBe('#f9fafb')
    expect(document.body.style.backgroundColor).toBe('')
  })

  it('leaves the defaults alone when given null', () => {
    renderHook(() => useChromeColor(null))
    expect(themeColor()).toBe('#f9fafb')
    expect(document.body.style.backgroundColor).toBe('')
  })

  it('switches back when the page stops asking for a tint', () => {
    const { rerender } = renderHook(({ color }) => useChromeColor(color), {
      initialProps: { color: '#ffffff' as string | null },
    })
    expect(themeColor()).toBe('#ffffff')
    rerender({ color: null })
    expect(themeColor()).toBe('#f9fafb')
  })
})
