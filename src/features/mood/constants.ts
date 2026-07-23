import { MoodType } from '@/types/mood'

export const MOOD_TYPE_ORDER: MoodType[] = [
  MoodType.GREAT,
  MoodType.GOOD,
  MoodType.NEUTRAL,
  MoodType.TIRED,
  MoodType.SAD,
  MoodType.ANGRY,
  MoodType.ANXIOUS,
]

export const MOOD_TYPE_LABELS: Record<MoodType, string> = {
  [MoodType.GREAT]: 'Отлично',
  [MoodType.GOOD]: 'Хорошо',
  [MoodType.NEUTRAL]: 'Нейтрально',
  [MoodType.TIRED]: 'Устал(а)',
  [MoodType.SAD]: 'Грустно',
  [MoodType.ANGRY]: 'Злюсь',
  [MoodType.ANXIOUS]: 'Тревожно',
}

export const MOOD_BG_VARS: Record<MoodType, string> = {
  [MoodType.GREAT]: 'var(--color-mood-great)',
  [MoodType.GOOD]: 'var(--color-mood-good)',
  [MoodType.NEUTRAL]: 'var(--color-mood-neutral)',
  [MoodType.TIRED]: 'var(--color-mood-tired)',
  [MoodType.SAD]: 'var(--color-mood-sad)',
  [MoodType.ANGRY]: 'var(--color-mood-angry)',
  [MoodType.ANXIOUS]: 'var(--color-mood-anxious)',
}

export const MOOD_EMOJI: Record<MoodType, string> = {
  [MoodType.GREAT]: '😊',
  [MoodType.GOOD]: '🙂',
  [MoodType.NEUTRAL]: '😐',
  [MoodType.TIRED]: '😪',
  [MoodType.SAD]: '😢',
  [MoodType.ANGRY]: '😠',
  [MoodType.ANXIOUS]: '😰',
}
