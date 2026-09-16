import { Image, Video, Link as LinkIcon } from 'lucide-react'
import type { MediaLink } from '../types'

const KIND_ICON = {
  photos: Image,
  video: Video,
  other: LinkIcon,
}

interface Props {
  media: MediaLink[]
}

export function MediaLinks({ media }: Props) {
  if (media.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {media.map((link, idx) => {
        const Icon = KIND_ICON[link.kind] ?? LinkIcon
        return (
          <a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400"
          >
            <Icon size={12} className="text-gray-400" />
            {link.label}
          </a>
        )
      })}
    </div>
  )
}
