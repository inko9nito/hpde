// Renders the site-wide app icon (#237) from hpde-monogram.svg into the
// PNGs index.html links to. Re-run after changing the SVG:
//   npm run icons:generate
// (pass PLAYWRIGHT_EXECUTABLE_PATH=/opt/pw-browsers/chromium if Chromium's
// default binary isn't installed).
//
// PNG only, no SVG <link>: event pages swap these links for the event's
// track icon by rel + sizes (src/utils/trackFavicon.ts), and browsers that
// prefer an SVG favicon would keep showing it instead.
//
// Also public/favicon.ico (#270), with no <link>: Safari's tab overview on
// iOS reads /favicon.ico, and without one Netlify answers with its own logo.
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

// Frames packed into public/favicon.ico.
const ICO_SIZES = [16, 32, 48]

/** An .ico holding each PNG as-is (PNG-compressed entries, which every
 *  current browser reads). */
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length)
  header.writeUInt16LE(0, 0)            // reserved
  header.writeUInt16LE(1, 2)            // type: icon
  header.writeUInt16LE(pngs.length, 4)
  let offset = header.length
  pngs.forEach(({ size, png }, i) => {
    const entry = 6 + 16 * i
    header.writeUInt8(size, entry)      // width (all < 256)
    header.writeUInt8(size, entry + 1)  // height
    header.writeUInt16LE(1, entry + 4)  // color planes
    header.writeUInt16LE(32, entry + 6) // bits per pixel
    header.writeUInt32LE(png.length, entry + 8)
    header.writeUInt32LE(offset, entry + 12)
    offset += png.length
  })
  return Buffer.concat([header, ...pngs.map(({ png }) => png)])
}

const svg = await readFile(here('./hpde-monogram.svg'), 'utf8')
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
})
const page = await browser.newPage()
async function render(size) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  )
  return page.screenshot({ omitBackground: false })
}
for (const { file, size } of ICONS) {
  await writeFile(OUT(file), await render(size))
  console.log(`wrote public/${file} (${size}px)`)
}
const frames = []
for (const size of ICO_SIZES) frames.push({ size, png: await render(size) })
await writeFile(OUT('favicon.ico'), ico(frames))
console.log(`wrote public/favicon.ico (${ICO_SIZES.join(', ')}px)`)
await browser.close()
