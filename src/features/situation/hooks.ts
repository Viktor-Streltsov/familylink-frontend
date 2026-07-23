import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFamilySituations,
  getSituation,
  createSituation,
  joinSituation,
  type CreateSituationRequest,
} from '@/api/situationApi'

export const situationKeys = {
  all: ['situations'] as const,
  familyList: (familyId: string) => ['situations', 'family', familyId] as const,
  detail: (situationId: string) => ['situations', situationId] as const,
}

export function useFamilySituations(familyId: string) {
  return useQuery({
    queryKey: situationKeys.familyList(familyId),
    queryFn: () => getFamilySituations(familyId),
    enabled: !!familyId,
    staleTime: 60 * 1000,
  })
}

export function useSituation(situationId: string) {
  return useQuery({
    queryKey: situationKeys.detail(situationId),
    queryFn: () => getSituation(situationId),
    enabled: !!situationId,
    staleTime: 30 * 1000,
  })
}

export function useCreateSituation(familyId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSituationRequest) =>
      createSituation(familyId, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: situationKeys.familyList(familyId) })
    },
  })
}

export function useJoinSituation(situationId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: () => joinSituation(situationId),
    onSuccess: (situation) => {
      void qc.invalidateQueries({
        queryKey: situationKeys.detail(situationId),
      })
      void qc.invalidateQueries({
        queryKey: situationKeys.familyList(situation.familyId),
      })
    },
  })
}
