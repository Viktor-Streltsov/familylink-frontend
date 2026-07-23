import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyFamilies,
  getFamilyMembers,
  createFamily,
  joinFamily,
  type CreateFamilyRequest,
  type JoinFamilyRequest,
} from '@/api/familyApi'

/* ─── Query keys ─── */
export const familyKeys = {
  all:     ['families'] as const,
  myList:  ['families', 'my'] as const,
  members: (familyId: string) => ['families', familyId, 'members'] as const,
}

/* ─── Хуки ─── */

/** Список моих семей */
export function useMyFamilies() {
  return useQuery({
    queryKey: familyKeys.myList,
    queryFn:  getMyFamilies,
    staleTime: 2 * 60 * 1000, // 2 минуты
  })
}

/** Участники конкретной семьи */
export function useFamilyMembers(familyId: string) {
  return useQuery({
    queryKey: familyKeys.members(familyId),
    queryFn:  () => getFamilyMembers(familyId),
    enabled:  !!familyId,
    staleTime: 2 * 60 * 1000,
  })
}

/** Создать семью */
export function useCreateFamily() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateFamilyRequest) => createFamily(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: familyKeys.myList })
    },
  })
}

/** Вступить по коду */
export function useJoinFamily() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: JoinFamilyRequest) => joinFamily(data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: familyKeys.myList })
    },
  })
}
