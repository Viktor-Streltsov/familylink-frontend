import { cn } from '@/lib/utils'
import type { FamilyRole } from '@/types/family'
import { FAMILY_ROLE_LABELS } from '@/types/family'

interface RoleBadgeProps {
  role: FamilyRole
  className?: string
}

const ROLE_STYLES: Record<FamilyRole, string> = {
  PARENT:   'bg-[#F5D0BF] text-[#C86544]',          // терракотовый
  CHILD:    'bg-[#D8E8CB] text-[#4E6B38]',           // шалфейный зелёный
  GUARDIAN: 'bg-[#F5E8D0] text-[#9A6E35]',           // золотой
  OTHER:    'bg-[#EDE8E3] text-[#6B5544]',           // нейтральный
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        ROLE_STYLES[role],
        className
      )}
    >
      {FAMILY_ROLE_LABELS[role]}
    </span>
  )
}
