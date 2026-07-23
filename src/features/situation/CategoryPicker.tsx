import { cn } from '@/lib/utils'
import type { SituationCategory } from '@/types/situation'
import { SituationCategoryIcon } from '@/components/shared/SituationCategoryIcon'
import {
  SITUATION_CATEGORY_ORDER,
  SITUATION_CATEGORY_LABELS,
} from '@/features/situation/constants'

interface CategoryPickerProps {
  value: SituationCategory | null
  onChange: (category: SituationCategory) => void
  className?: string
}

export function CategoryPicker({ value, onChange, className }: CategoryPickerProps) {
  return (
    <div
      className={cn('grid grid-cols-2 gap-3', className)}
      role="radiogroup"
      aria-label="Выберите категорию"
    >
      {SITUATION_CATEGORY_ORDER.map((category) => {
        const selected = value === category
        return (
          <button
            key={category}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(category)}
            className={cn(
              'flex flex-col items-center gap-2 rounded-2xl border bg-white p-3 text-center transition-all duration-200',
              selected
                ? 'border-[var(--color-brand)] ring-2 ring-[var(--color-brand)]/30'
                : 'border-[var(--color-border)] hover:border-[var(--color-border-strong)]'
            )}
          >
            <SituationCategoryIcon category={category} size="md" />
            <span className="text-xs font-medium leading-tight text-[var(--color-text-secondary)]">
              {SITUATION_CATEGORY_LABELS[category]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
