import { cn } from '@/lib/utils'
import type { MoodType } from '@/types/mood'
import { MOOD_BG_VARS, MOOD_EMOJI } from '@/features/mood/constants'

type MoodEmojiSize = 'sm' | 'md' | 'lg'

interface MoodEmojiProps {
  type: MoodType
  size?: MoodEmojiSize
  className?: string
}

const SIZE_CLASSES: Record<MoodEmojiSize, string> = {
  sm: 'h-9 w-9 text-lg',
  md: 'h-11 w-11 text-xl',
  lg: 'h-14 w-14 text-2xl',
}

export function MoodEmoji({ type, size = 'md', className }: MoodEmojiProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full shadow-sm',
        SIZE_CLASSES[size],
        className
      )}
      style={{ backgroundColor: MOOD_BG_VARS[type] }}
      role="img"
      aria-label={type}
    >
      {MOOD_EMOJI[type]}
    </span>
  )
}
