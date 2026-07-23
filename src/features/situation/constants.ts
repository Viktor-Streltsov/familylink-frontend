import { SituationCategory, SituationStatus } from '@/types/situation'

export const SITUATION_CATEGORY_ORDER: SituationCategory[] = [
  SituationCategory.STUDY,
  SituationCategory.DAILY_ROUTINE,
  SituationCategory.GADGETS,
  SituationCategory.EMOTIONS,
  SituationCategory.CONFLICTS,
  SituationCategory.FRIENDS,
  SituationCategory.HEALTH,
  SituationCategory.OTHER,
]

export const SITUATION_CATEGORY_LABELS: Record<SituationCategory, string> = {
  [SituationCategory.STUDY]: 'Учёба',
  [SituationCategory.DAILY_ROUTINE]: 'Быт и режим',
  [SituationCategory.GADGETS]: 'Гаджеты',
  [SituationCategory.EMOTIONS]: 'Эмоции',
  [SituationCategory.CONFLICTS]: 'Конфликты',
  [SituationCategory.FRIENDS]: 'Друзья',
  [SituationCategory.HEALTH]: 'Здоровье',
  [SituationCategory.OTHER]: 'Другое',
}

export const SITUATION_STATUS_LABELS: Record<SituationStatus, string> = {
  [SituationStatus.OPEN]: 'Открыта',
  [SituationStatus.IN_DISCUSSION]: 'В обсуждении',
  [SituationStatus.RESOLVED]: 'Решена',
  [SituationStatus.CLOSED]: 'Закрыта',
}

/** Цвета фона для иконок категорий */
export const SITUATION_CATEGORY_ICON_BG: Record<SituationCategory, string> = {
  [SituationCategory.STUDY]: '#F5E8D0',
  [SituationCategory.DAILY_ROUTINE]: '#FAE8D8',
  [SituationCategory.GADGETS]: '#DFD8F0',
  [SituationCategory.EMOTIONS]: '#F5D0BF',
  [SituationCategory.CONFLICTS]: '#FDE8E8',
  [SituationCategory.FRIENDS]: '#D8E8CB',
  [SituationCategory.HEALTH]: '#D8E8D0',
  [SituationCategory.OTHER]: '#EDE8E3',
}

export const SITUATION_CATEGORY_ICON_COLOR: Record<SituationCategory, string> = {
  [SituationCategory.STUDY]: '#9A6E35',
  [SituationCategory.DAILY_ROUTINE]: '#C99574',
  [SituationCategory.GADGETS]: '#5B4E8B',
  [SituationCategory.EMOTIONS]: '#C86544',
  [SituationCategory.CONFLICTS]: '#B85450',
  [SituationCategory.FRIENDS]: '#4E6B38',
  [SituationCategory.HEALTH]: '#3A7A62',
  [SituationCategory.OTHER]: '#6B5544',
}

export const SITUATION_STATUS_STYLES: Record<SituationStatus, string> = {
  [SituationStatus.OPEN]:
    'bg-[#F5E8D0] text-[#9A6E35]',
  [SituationStatus.IN_DISCUSSION]:
    'bg-[#F5D0BF] text-[#C86544]',
  [SituationStatus.RESOLVED]:
    'bg-[#D8E8CB] text-[#4E6B38]',
  [SituationStatus.CLOSED]:
    'bg-[#EDE8E3] text-[#6B5544]',
}
