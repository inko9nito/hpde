import { describe, it, expect } from 'vitest'
import { isOldSite, newSiteUrl, SITE_URL } from './siteMoved'

function loc(url: string) {
  const { hostname, pathname, search } = new URL(url)
  return { hostname, pathname, search }
}

describe('isOldSite', () => {
  it('is true on the GitHub Pages site', () => {
    expect(isOldSite(loc('https://inko9nito.github.io/hpde/'))).toBe(true)
    expect(isOldSite(loc('https://inko9nito.github.io/hpde/#/event/abc'))).toBe(true)
  })

  it('is false on Netlify, locally, and on GitHub Pages PR previews', () => {
    expect(isOldSite(loc('https://myhpde.netlify.app/'))).toBe(false)
    expect(isOldSite(loc('https://deploy-preview-12--myhpde.netlify.app/'))).toBe(false)
    expect(isOldSite(loc('http://localhost:5173/hpde/'))).toBe(false)
    expect(isOldSite(loc('https://inko9nito.github.io/hpde/pr-preview/pr-12/'))).toBe(false)
  })

  it('can be forced with ?moved for previewing', () => {
    expect(isOldSite(loc('https://myhpde.netlify.app/?moved'))).toBe(true)
    expect(isOldSite(loc('https://inko9nito.github.io/hpde/pr-preview/pr-12/?moved'))).toBe(true)
  })
})

describe('newSiteUrl', () => {
  it('points at the new site root when there is no route', () => {
    expect(newSiteUrl('')).toBe(SITE_URL)
    expect(newSiteUrl('#')).toBe(SITE_URL)
  })

  it('keeps the route, so a bookmarked event opens that event', () => {
    expect(newSiteUrl('#/event/abc')).toBe('https://myhpde.netlify.app/#/event/abc')
  })
})
