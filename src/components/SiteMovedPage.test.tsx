import { describe, it, expect, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteMovedPage } from './SiteMovedPage'

describe('SiteMovedPage', () => {
  afterEach(() => {
    window.location.hash = ''
  })

  it('tells visitors to update bookmarks and links to the new site without redirecting', () => {
    window.location.hash = '#/event/abc'
    const before = window.location.href
    render(<SiteMovedPage />)

    expect(screen.getByRole('heading', { name: 'HPDE Events has moved' })).toBeInTheDocument()
    expect(screen.getByText(/update your bookmarks/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /go to the new site/i }))
      .toHaveAttribute('href', 'https://myhpde.netlify.app/#/event/abc')
    expect(window.location.href).toBe(before)
  })
})
