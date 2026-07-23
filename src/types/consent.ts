/** Тип согласия на обработку данных */
export enum ConsentType {
  MOOD_TRACKING = 'MOOD_TRACKING',
  AI_ANALYSIS = 'AI_ANALYSIS',
  DATA_SHARING_WITH_FAMILY = 'DATA_SHARING_WITH_FAMILY',
}

/** Запись согласия из API */
export interface Consent {
  id: string
  consentType: ConsentType
  granted: boolean
  grantedAt: string
  revokedAt: string | null
  consentVersion: string
}
