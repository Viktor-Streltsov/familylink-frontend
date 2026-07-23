import { cn } from '@/lib/utils'
import type { SituationStatus } from '@/types/situation'
import {
  SITUATION_STATUS_LABELS,
  SITUATION_STATUS_STYLES,
} from '@/features/situation/constants'

interface SituationStatusBadgeProps {
  status: SituationStatus
  className?: string
}

export function SituationStatusBadge({
  status,
  className,
}: SituationStatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        SITUATION_STATUS_STYLES[status],
        className
      )}
    >
      {SITUATION_STATUS_LABELS[status]}
    </span>
  )
}
