import { cn } from '@/lib/utils'
import type { MoodType } from '@/types/mood'
import {
  MOOD_TYPE_ORDER,
  MOOD_TYPE_LABELS,
  MOOD_EMOJI,
  MOOD_BG_VARS,
} from '@/features/mood/constants'

interface MoodPickerProps {
  value: MoodType | null
  onChange: (type: MoodType) => void
  className?: string
}

export function MoodPicker({ value, onChange, className }: MoodPickerProps) {
  return (
    <div
      className={cn('flex flex-wrap justify-center gap-3 sm:gap-4', className)}
      role="radiogroup"
      aria-label="Выберите настроение"
    >
      {MOOD_TYPE_ORDER.map((type) => {
        const selected = value === type
        return (
          <button
            key={type}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(type)}
            className="flex w-[4.25rem] flex-col items-center gap-1.5 sm:w-[4.5rem]"
          >
            <span
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full text-xl transition-all duration-200',
                selected
                  ? 'ring-2 ring-[var(--color-brand)] ring-offset-2 ring-offset-[var(--color-background)]'
                  : 'ring-1 ring-transparent'
              )}
              style={{ backgroundColor: MOOD_BG_VARS[type] }}
            >
              {MOOD_EMOJI[type]}
            </span>
            <span className="text-center text-xs leading-tight text-[var(--color-text-secondary)]">
              {MOOD_TYPE_LABELS[type]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
