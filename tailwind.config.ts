import type { Config } from 'tailwindcss'
import { runGroupColors } from './src/theme/runGroupColors'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,md}'],
  theme: {
    extend: {
      colors: {
        // Run group colors — see src/theme/runGroupColors.ts. Each key
        // becomes a `bg-<key>-500` class referenced from schedule MD
        // files' `## groups` tables.
        ...Object.fromEntries(
          Object.entries(runGroupColors).map(([name, hex]) => [name, { 500: hex }])
        ),
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config
