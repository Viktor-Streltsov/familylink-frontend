import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTodayMoods,
  getMyMoodHistory,
  createMood,
  deleteAllMoodData,
  type CreateMoodRequest,
} from '@/api/moodApi'

export const moodKeys = {
  all: ['mood'] as const,
  today: (familyId: string) => ['mood', familyId, 'today'] as const,
  myHistory: (familyId: string) => ['mood', familyId, 'my'] as const,
}

export function useTodayMoods(familyId: string) {
  return useQuery({
    queryKey: moodKeys.today(familyId),
    queryFn: () => getTodayMoods(familyId),
    enabled: !!familyId,
    staleTime: 60 * 1000,
  })
}

export function useMyMoodHistory(familyId: string) {
  return useQuery({
    queryKey: moodKeys.myHistory(familyId),
    queryFn: () => getMyMoodHistory(familyId),
    enabled: !!familyId,
    staleTime: 2 * 60 * 1000,
  })
}

export function useCreateMood(familyId: string) {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateMoodRequest) => createMood(familyId, data),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: moodKeys.today(familyId) })
      void qc.invalidateQueries({ queryKey: moodKeys.myHistory(familyId) })
    },
  })
}

export function useDeleteAllMoodData() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: deleteAllMoodData,
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: moodKeys.all })
    },
  })
}
