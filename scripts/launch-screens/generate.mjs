// Renders the Home Screen app's launch images (#365) into public/launch/,
// one per iPhone screen in devices.mjs. Re-run after changing the loader in
// index.html, or the list:
//   npm run launch-screens:generate
// (pass PLAYWRIGHT_EXECUTABLE_PATH=/opt/pw-browsers/chromium if Chromium's
// default binary isn't installed).
//
// iOS shows one while the app opens, before the page has loaded — the
// blank screen #365 was about. Each is index.html's own loader, rendered at
// that screen's size, held at the pulse's middle: the checkers are there
// from the moment the app opens, and the page's loader takes over in the
// same place.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { LAUNCH_SCREENS, launchScreenPath } from './devices.mjs'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))

const html = await readFile(here('../../index.html'), 'utf8')
const style = html.match(/<style>[\s\S]*?<\/style>/)[0]
const loader = html.match(/<div id="root">([\s\S]*?)<\/div><\/div>/)[0] + '</div>'
// Still, at the pulse's middle.
const still = '<style>.boot-loader svg { animation: none !important; opacity: var(--boot-still) !important; }</style>'

await mkdir(here('../../public/launch'), { recursive: true })
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
})
for (const screen of LAUNCH_SCREENS) {
  const page = await browser.newPage({
    viewport: { width: screen.width, height: screen.height },
    deviceScaleFactor: screen.ratio,
  })
  await page.setContent(`<!doctype html><html><head>${style}${still}</head><body>${loader}</body></html>`)
  const file = `public${launchScreenPath(screen)}`
  await writeFile(here(`../../${file}`), await page.screenshot())
  console.log(`wrote ${file} (${screen.width * screen.ratio}×${screen.height * screen.ratio})`)
  await page.close()
}
await browser.close()
