import type { RunGroupConfig } from '../types'

interface Props {
  group: RunGroupConfig
  size?: 'sm' | 'md'
  dim?: boolean
}

export function GroupBadge({ group, size = 'md', dim }: Props) {
  const padding = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${group.bgClass} ${group.textClass} ${padding} ${dim ? 'opacity-40' : ''}`}>
      {group.label}
    </span>
  )
}
