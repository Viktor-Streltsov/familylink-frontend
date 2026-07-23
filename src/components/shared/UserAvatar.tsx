import { cn } from '@/lib/utils'

type AvatarSize = 'sm' | 'md' | 'lg'

interface UserAvatarProps {
  name: string
  avatarUrl?: string | null
  size?: AvatarSize
  className?: string
}

const SIZE_CLASSES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

/** Возвращает до двух инициалов из имени */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/** Детерминированный тёплый цвет фона по первой букве имени */
const WARM_PALETTES = [
  { bg: '#F5D0BF', text: '#C86544' }, // терракотовый
  { bg: '#D8E8CB', text: '#4E6B38' }, // зелёный
  { bg: '#F5E8D0', text: '#9A6E35' }, // золотой
  { bg: '#DFD8F0', text: '#5B4E8B' }, // лавандовый
  { bg: '#FAE0D5', text: '#B85450' }, // красноватый
  { bg: '#D5E8E0', text: '#3A7A62' }, // бирюзовый
]

function getPalette(name: string) {
  const code = name.charCodeAt(0) || 0
  return WARM_PALETTES[code % WARM_PALETTES.length]
}

export function UserAvatar({ name, avatarUrl, size = 'md', className }: UserAvatarProps) {
  const palette = getPalette(name)

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={cn(
          'rounded-full object-cover flex-shrink-0',
          SIZE_CLASSES[size],
          className
        )}
      />
    )
  }

  return (
    <div
      className={cn(
        'flex flex-shrink-0 items-center justify-center rounded-full font-semibold select-none',
        SIZE_CLASSES[size],
        className
      )}
      style={{ backgroundColor: palette.bg, color: palette.text }}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  )
}
