import { apiClient } from './client'
import type { Mood, MoodType } from '@/types/mood'

export interface CreateMoodRequest {
  moodType: MoodType
  note?: string
  visibleToFamily: boolean
}

export interface DeleteAllMoodDataResponse {
  deletedCount: number
  message: string
}

/** POST /api/families/:familyId/mood */
export async function createMood(
  familyId: string,
  data: CreateMoodRequest
): Promise<Mood> {
  const response = await apiClient.post<Mood>(
    `/api/families/${familyId}/mood`,
    data
  )
  return response.data
}

/** GET /api/families/:familyId/mood/today */
export async function getTodayMoods(familyId: string): Promise<Mood[]> {
  const response = await apiClient.get<Mood[]>(
    `/api/families/${familyId}/mood/today`
  )
  return response.data
}

/** GET /api/families/:familyId/mood/my */
export async function getMyMoodHistory(familyId: string): Promise<Mood[]> {
  const response = await apiClient.get<Mood[]>(
    `/api/families/${familyId}/mood/my`
  )
  return response.data
}

/** DELETE /api/mood/my/all */
export async function deleteAllMoodData(): Promise<DeleteAllMoodDataResponse> {
  const response = await apiClient.delete<DeleteAllMoodDataResponse>(
    '/api/mood/my/all'
  )
  return response.data
}
