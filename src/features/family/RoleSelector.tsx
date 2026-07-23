import { cn } from '@/lib/utils'
import type { FamilyRole } from '@/types/family'
import { FAMILY_ROLE_LABELS } from '@/types/family'

const ROLE_OPTIONS: { value: FamilyRole; emoji: string }[] = [
  { value: 'PARENT',   emoji: '👨‍👩‍👧' },
  { value: 'CHILD',    emoji: '🧒'     },
  { value: 'GUARDIAN', emoji: '🤝'     },
  { value: 'OTHER',    emoji: '👤'     },
]

interface RoleSelectorProps {
  value: FamilyRole | ''
  onChange: (role: FamilyRole) => void
  error?: string
}

export function RoleSelector({ value, onChange, error }: RoleSelectorProps) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {ROLE_OPTIONS.map(({ value: role, emoji }) => {
          const selected = value === role
          return (
            <button
              key={role}
              type="button"
              onClick={() => onChange(role)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-3 text-sm transition-all duration-150',
                selected
                  ? 'border-[var(--color-brand)] bg-[var(--color-brand-light)] text-[var(--color-brand-hover)] font-semibold'
                  : 'border-[var(--color-border)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand-light)]'
              )}
            >
              <span className="text-2xl">{emoji}</span>
              <span>{FAMILY_ROLE_LABELS[role]}</span>
            </button>
          )
        })}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-[var(--color-error)]">{error}</p>
      )}
    </div>
  )
}
