// The iPhone screens a launch image is made for (#365): each size, in
// points, and its pixel ratio, portrait. iOS shows the image whose media
// query matches the phone exactly, and nothing (a blank screen) when none
// does — so a new iPhone size needs a row here, then
// `npm run launch-screens:generate`.
export const LAUNCH_SCREENS = [
  { width: 440, height: 956, ratio: 3 }, // 16 Pro Max, 17 Pro Max
  { width: 430, height: 932, ratio: 3 }, // 14 Pro Max, 15 Plus and Pro Max, 16 Plus
  { width: 428, height: 926, ratio: 3 }, // 12 and 13 Pro Max, 14 Plus
  { width: 420, height: 912, ratio: 3 }, // Air
  { width: 414, height: 896, ratio: 3 }, // XS Max, 11 Pro Max
  { width: 414, height: 896, ratio: 2 }, // XR, 11
  { width: 414, height: 736, ratio: 3 }, // 6s, 7 and 8 Plus
  { width: 402, height: 874, ratio: 3 }, // 16 Pro, 17, 17 Pro
  { width: 393, height: 852, ratio: 3 }, // 14 Pro, 15, 15 Pro, 16
  { width: 390, height: 844, ratio: 3 }, // 12, 13, 14, 16e
  { width: 375, height: 812, ratio: 3 }, // X, XS, 11 Pro, 12 and 13 mini
  { width: 375, height: 667, ratio: 2 }, // 6s, 7, 8, SE (2nd and 3rd)
  { width: 320, height: 568, ratio: 2 }, // SE (1st)
]

/** Where a launch image is published. */
export function launchScreenPath({ width, height, ratio }) {
  return `/launch/${width}x${height}@${ratio}x.png`
}

/** The <link> index.html has for it. */
export function launchScreenLink(screen) {
  const { width, height, ratio } = screen
  return `<link rel="apple-touch-startup-image" media="(device-width: ${width}px) and (device-height: ${height}px) and (-webkit-device-pixel-ratio: ${ratio}) and (orientation: portrait)" href="${launchScreenPath(screen)}" />`
}
