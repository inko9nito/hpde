import '@testing-library/jest-dom'

// jsdom doesn't implement scrollIntoView. The timeline calls it 150ms after
// showing today's schedule, so a test that keeps a live event on screen
// that long threw an unhandled error after it had already passed.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

// No weather near the track (#347) unless a test stubs fetch: never the real
// Open-Meteo, whose answers change from run to run.
const realFetch = globalThis.fetch
if (realFetch) {
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) =>
    String(input instanceof Request ? input.url : input).includes('open-meteo.com')
      ? Promise.reject(new TypeError('No weather in tests'))
      : realFetch(input, init)) as typeof fetch
}
