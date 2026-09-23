// Renders the site-wide app icon (#237) from hpde-monogram.svg into the
// PNGs index.html links to. Re-run after changing the SVG:
//   npm run icons:generate
// (pass PLAYWRIGHT_EXECUTABLE_PATH=/opt/pw-browsers/chromium if Chromium's
// default binary isn't installed).
//
// PNG only, no SVG <link>: event pages swap these links for the event's
// track icon by rel + sizes (src/utils/trackFavicon.ts), and browsers that
// prefer an SVG favicon would keep showing it instead.
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const here = (p) => fileURLToPath(new URL(p, import.meta.url))
const OUT = (name) => here(`../../public/${name}`)

// Sizes must match the `sizes` attributes in index.html and the icon
// styles in src/utils/trackFavicon.ts.
const ICONS = [
  { file: 'favicon-64.png', size: 64 },          // browser tabs
  { file: 'apple-touch-icon.png', size: 180 },   // iOS Favorites / Home Screen
  { file: 'icon-192.png', size: 192 },           // Android Add to Home screen
]

const svg = await readFile(here('./hpde-monogram.svg'), 'utf8')
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
})
const page = await browser.newPage()
for (const { file, size } of ICONS) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  )
  await writeFile(OUT(file), await page.screenshot({ omitBackground: false }))
  console.log(`wrote public/${file} (${size}px)`)
}
await browser.close()
