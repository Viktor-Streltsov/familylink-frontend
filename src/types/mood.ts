/** Тип настроения */
export enum MoodType {
  GREAT = 'GREAT',
  GOOD = 'GOOD',
  NEUTRAL = 'NEUTRAL',
  TIRED = 'TIRED',
  SAD = 'SAD',
  ANGRY = 'ANGRY',
  ANXIOUS = 'ANXIOUS',
}

/** Запись настроения из API */
export interface Mood {
  id: string
  userId: string
  userName: string
  userAvatar: string | null
  moodType: MoodType
  note: string | null
  visibleToFamily: boolean
  createdAt: string
}
