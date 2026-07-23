import { apiClient } from './client'
import type { Family, FamilyMember, FamilyRole } from '@/types/family'

/* ─── Запросы ─── */

export interface CreateFamilyRequest {
  name: string
  creatorRole: FamilyRole
}

export interface JoinFamilyRequest {
  inviteCode: string
  role: FamilyRole
}

/* ─── API-функции ─── */

/** POST /api/families — создать семью */
export async function createFamily(data: CreateFamilyRequest): Promise<Family> {
  const response = await apiClient.post<Family>('/api/families', data)
  return response.data
}

/** POST /api/families/join — вступить по коду */
export async function joinFamily(data: JoinFamilyRequest): Promise<Family> {
  const response = await apiClient.post<Family>('/api/families/join', data)
  return response.data
}

/** GET /api/families/my — мои семьи */
export async function getMyFamilies(): Promise<Family[]> {
  const response = await apiClient.get<Family[]>('/api/families/my')
  return response.data
}

/** GET /api/families/:familyId/members — участники семьи */
export async function getFamilyMembers(familyId: string): Promise<FamilyMember[]> {
  const response = await apiClient.get<FamilyMember[]>(`/api/families/${familyId}/members`)
  return response.data
}
