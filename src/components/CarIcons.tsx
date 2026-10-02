import type { SVGProps } from 'react'

// The car and Garage icons (#417), from sets with more car to them than
// Lucide's: each takes Lucide's `size`, filled with the text color. Their
// paths are copied as published; credit for the race car is in the footer.

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'> & { size?: number }

/** A car with no photo: Game Icons' "Race car" by Skoll (CC BY 3.0),
 *  framed to its width so it fills `size` across as Lucide's car did. */
export function RaceCarIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="21 21 470 470" fill="currentColor" {...props}>
      <path d="M408.29 262.879a35.125 35.125 0 1 0 35.125 35.125a35.17 35.17 0 0 0-35.125-35.125m0 62.873a27.736 27.736 0 1 1 27.736-27.737a27.736 27.736 0 0 1-27.736 27.748zm8.876-27.737a8.876 8.876 0 1 1-8.876-8.875a8.876 8.876 0 0 1 8.876 8.875m-265.538 0a35.125 35.125 0 1 0-35.126 35.126a35.17 35.17 0 0 0 35.126-35.126m-35.126 27.737a27.736 27.736 0 1 1 27.737-27.737a27.736 27.736 0 0 1-27.737 27.748zm345.452-21.823a53.997 53.997 0 1 0-107.617-5.925a53.7 53.7 0 0 0 5.447 23.61H165.008a53.986 53.986 0 1 0-101.849-15.211C37.542 295.64 21 278.033 21 250.186c0-28.846 86.87-69.418 142.122-71.327v34.094a24.83 24.83 0 0 0 24.83 24.83h47.517a24.774 24.774 0 0 0 24.409-20.758s-1.62-21.668-6.813-25.518l3.407-2.54l24.474 28.08h94.104c63.994-.022 115.95 23.42 115.95 52.266c0 13.314-10.973 25.396-29.046 34.616m-336.576-5.925a8.876 8.876 0 1 1-8.876-8.876a8.876 8.876 0 0 1 8.876 8.887z" />
    </svg>
  )
}

/** The Garage: Material Design Icons' "car-wrench" (Apache 2.0). */
export function GarageIcon({ size = 24, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.96 16.45c.01-.15.04-.3.04-.45v.5zM11 16c0 .71.15 1.39.42 2H6v1c0 .55-.45 1-1 1H4c-.55 0-1-.45-1-1v-8l2.08-6c.2-.58.76-1 1.42-1h11c.66 0 1.22.42 1.42 1L21 11v5c0-2.76-2.24-5-5-5s-5 2.24-5 5m-3-2.5c0-.83-.67-1.5-1.5-1.5S5 12.67 5 13.5S5.67 15 6.5 15S8 14.33 8 13.5M19 10l-1.5-4.5h-11L5 10zm3.87 11.19l-4.11-4.11c.41-1.04.18-2.26-.68-3.11c-.9-.91-2.25-1.09-3.34-.59l1.94 1.94l-1.35 1.36l-1.99-1.95c-.54 1.09-.29 2.44.59 3.35a2.91 2.91 0 0 0 3.12.68l4.11 4.1c.18.19.45.19.63 0l1.04-1.03c.22-.18.22-.5.04-.64" />
    </svg>
  )
}
