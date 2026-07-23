import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  GraduationCap,
  Heart,
  MoreHorizontal,
  Smartphone,
  Sun,
  Users,
  Zap,
} from 'lucide-react'

import { cn } from '@/lib/utils'
import { SituationCategory } from '@/types/situation'
import {
  SITUATION_CATEGORY_ICON_BG,
  SITUATION_CATEGORY_ICON_COLOR,
} from '@/features/situation/constants'

type IconSize = 'sm' | 'md' | 'lg'

interface SituationCategoryIconProps {
  category: SituationCategory
  size?: IconSize
  className?: string
}

const CATEGORY_ICONS: Record<SituationCategory, LucideIcon> = {
  [SituationCategory.STUDY]: GraduationCap,
  [SituationCategory.DAILY_ROUTINE]: Sun,
  [SituationCategory.GADGETS]: Smartphone,
  [SituationCategory.EMOTIONS]: Heart,
  [SituationCategory.CONFLICTS]: Zap,
  [SituationCategory.FRIENDS]: Users,
  [SituationCategory.HEALTH]: Activity,
  [SituationCategory.OTHER]: MoreHorizontal,
}

const SIZE_CLASSES: Record<IconSize, { box: string; icon: number }> = {
  sm: { box: 'h-9 w-9', icon: 16 },
  md: { box: 'h-11 w-11', icon: 20 },
  lg: { box: 'h-14 w-14', icon: 24 },
}

export function SituationCategoryIcon({
  category,
  size = 'md',
  className,
}: SituationCategoryIconProps) {
  const Icon = CATEGORY_ICONS[category]
  const { box, icon } = SIZE_CLASSES[size]

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-xl',
        box,
        className
      )}
      style={{
        backgroundColor: SITUATION_CATEGORY_ICON_BG[category],
        color: SITUATION_CATEGORY_ICON_COLOR[category],
      }}
    >
      <Icon size={icon} strokeWidth={2} aria-hidden />
    </span>
  )
}
