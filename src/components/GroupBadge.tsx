import type { RunGroupConfig } from '../types'

interface Props {
  group: RunGroupConfig
  size?: 'sm' | 'md'
  dim?: boolean
  /** Placed against something: a driver's picture over its left end (#410). */
  className?: string
}

export function GroupBadge({ group, size = 'md', dim, className = '' }: Props) {
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${group.bgClass} ${group.textClass} ${padding} ${dim ? 'opacity-40' : ''} ${className}`}>
      {group.label}
    </span>
  )
}
