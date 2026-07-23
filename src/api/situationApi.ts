import { apiClient } from './client'
import type { Situation, SituationCategory, Recommendation } from '@/types/situation'

export interface CreateSituationRequest {
  title: string
  category: SituationCategory
}

export interface SubmitDescriptionRequest {
  description: string
  consentToAiAnalysis: boolean
}

/** POST /api/families/:familyId/situations */
export async function createSituation(
  familyId: string,
  data: CreateSituationRequest
): Promise<Situation> {
  const response = await apiClient.post<Situation>(
    `/api/families/${familyId}/situations`,
    data
  )
  return response.data
}

/** GET /api/families/:familyId/situations */
export async function getFamilySituations(familyId: string): Promise<Situation[]> {
  const response = await apiClient.get<Situation[]>(
    `/api/families/${familyId}/situations`
  )
  return response.data
}

/** GET /api/situations/:situationId */
export async function getSituation(situationId: string): Promise<Situation> {
  const response = await apiClient.get<Situation>(
    `/api/situations/${situationId}`
  )
  return response.data
}

/** POST /api/situations/:situationId/join */
export async function joinSituation(situationId: string): Promise<Situation> {
  const response = await apiClient.post<Situation>(
    `/api/situations/${situationId}/join`
  )
  return response.data
}

/** POST /api/situations/:situationId/description */
export async function submitSituationDescription(
  situationId: string,
  data: SubmitDescriptionRequest
): Promise<Situation> {
  const response = await apiClient.post<Situation>(
    `/api/situations/${situationId}/description`,
    data
  )
  return response.data
}

/** POST /api/situations/:situationId/recommendation */
export async function requestSituationRecommendation(
  situationId: string
): Promise<Recommendation> {
  const response = await apiClient.post<Recommendation>(
    `/api/situations/${situationId}/recommendation`
  )
  return response.data
}
