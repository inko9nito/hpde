import type { Config } from 'tailwindcss'
import { runGroupColors, RUN_GROUP_BG_CLASSES, RUN_GROUP_TEXT_CLASSES } from './src/theme/runGroupColors'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,md}'],
  // Run groups come from the events store, not from files scanned above.
  safelist: [...RUN_GROUP_BG_CLASSES, ...RUN_GROUP_TEXT_CLASSES],
  theme: {
    extend: {
      colors: {
        // Run group colors — see src/theme/runGroupColors.ts. Each key
        // becomes a `bg-<key>-500` class, used by the `## groups` table of
        // an event's schedule.
        ...Object.fromEntries(
          Object.entries(runGroupColors).map(([name, hex]) => [name, { 500: hex }])
        ),
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // Display face from the Figma designs (#216) — event header title,
        // tabs and status badges. Self-hosted via @fontsource (main.tsx).
        rubik: ['"Rubik Variable"', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
