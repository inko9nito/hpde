import '@testing-library/jest-dom'

// jsdom doesn't implement scrollIntoView. The timeline calls it 150ms after
// showing today's schedule, so a test that keeps a live event on screen
// that long threw an unhandled error after it had already passed.
if (typeof Element !== 'undefined' && !Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}
