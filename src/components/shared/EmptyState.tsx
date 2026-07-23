import type { ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  subtitle?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'outline'
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  subtitle,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-warm)] px-6 py-10 text-center',
        className
      )}
    >
      {icon && (
        <div className="mb-4 text-4xl">{icon}</div>
      )}

      <p
        className="text-base font-semibold text-[var(--color-text-primary)]"
        style={{ fontFamily: 'Fraunces, serif' }}
      >
        {title}
      </p>

      {subtitle && (
        <p className="mt-1 text-sm text-[var(--color-text-muted)] max-w-xs">
          {subtitle}
        </p>
      )}

      {action && (
        <Button
          onClick={action.onClick}
          className={cn(
            'mt-5 rounded-xl',
            action.variant === 'outline'
              ? 'border-[var(--color-border)] text-[var(--color-text-secondary)]'
              : 'bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]'
          )}
          variant={action.variant === 'outline' ? 'outline' : 'default'}
        >
          {action.label}
        </Button>
      )}
    </div>
  )
}
