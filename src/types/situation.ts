/** Категория ситуации */
export enum SituationCategory {
  STUDY = 'STUDY',
  DAILY_ROUTINE = 'DAILY_ROUTINE',
  GADGETS = 'GADGETS',
  EMOTIONS = 'EMOTIONS',
  CONFLICTS = 'CONFLICTS',
  FRIENDS = 'FRIENDS',
  HEALTH = 'HEALTH',
  OTHER = 'OTHER',
}

/** Статус обсуждения */
export enum SituationStatus {
  OPEN = 'OPEN',
  IN_DISCUSSION = 'IN_DISCUSSION',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

/** Статус AI-рекомендации */
export enum RecommendationStatus {
  GENERATED = 'GENERATED',
  BLOCKED_SENSITIVE = 'BLOCKED_SENSITIVE',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
}

/** Участник ситуации */
export interface SituationParticipant {
  id: string
  userId: string
  userName: string
  description: string | null
  consentedToAi: boolean
  hasSubmitted: boolean
  submittedAt: string | null
}

/** Ситуация (список и детали) */
export interface Situation {
  id: string
  familyId: string
  createdBy: string
  createdByName: string
  title: string
  category: SituationCategory
  status: SituationStatus
  sensitive: boolean
  participantsCount: number
  submittedDescriptionsCount: number
  hasRecommendation: boolean
  createdAt: string
  resolvedAt: string | null
  participants?: SituationParticipant[]
}

/** AI-рекомендация */
export interface Recommendation {
  id: string
  status: RecommendationStatus
  content: string
  resources: string
  modelVersion: string
  safetyFlag: boolean
  generatedAt: string
}
