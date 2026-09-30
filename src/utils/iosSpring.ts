/**
 * iOS's push, pop and sheet animation (#367), measured frame by frame off
 * screen recordings of iOS 26 — a GitHub issue opening and closing, and its
 * Edit sheet sliding up. All three follow one critically damped spring from
 * rest, ω ≈ 18.3 rad/s: halfway in 0.1 s, 88% of the way in 0.2 s, and
 * settled by 0.5 s.
 */
export const IOS_SPRING_OMEGA = 18.3

/** Long enough to settle: by then it's within 0.1% of the end. */
export const IOS_SPRING_MS = 500

/** How far along the spring is (0 to 1), `ms` after it starts. */
export function iosSpring(ms: number): number {
  if (ms >= IOS_SPRING_MS) return 1
  const t = (IOS_SPRING_OMEGA * Math.max(ms, 0)) / 1000
  return 1 - (1 + t) * Math.exp(-t)
}

// CSS has no spring timing function, so it's sampled every 10 ms into a
// linear() easing — which Safari has had since 17.2.
const SAMPLES = 50
export const IOS_SPRING_LINEAR = `linear(${Array.from(
  { length: SAMPLES + 1 },
  (_, i) => +iosSpring((i / SAMPLES) * IOS_SPRING_MS).toFixed(4),
).join(', ')})`

// Within 3% of it, for a browser without linear().
const IOS_SPRING_BEZIER = 'cubic-bezier(0.32, 0.6, 0.05, 0.98)'

/** The spring as a CSS easing, for `IOS_SPRING_MS`. */
export const IOS_SPRING_EASING =
  typeof CSS !== 'undefined' && CSS.supports?.('transition-timing-function', IOS_SPRING_LINEAR)
    ? IOS_SPRING_LINEAR
    : IOS_SPRING_BEZIER
