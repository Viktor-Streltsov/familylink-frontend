import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getMyConsents,
  grantConsent,
  revokeConsent,
} from '@/api/consentApi'
import { ConsentType } from '@/types/consent'
import { isConsentActive } from './constants'

export const consentKeys = {
  my: ['consents', 'my'] as const,
}

export function useMyConsents() {
  return useQuery({
    queryKey: consentKeys.my,
    queryFn: getMyConsents,
    staleTime: 60 * 1000,
  })
}

export function useGrantConsent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (consentType: ConsentType) =>
      grantConsent({ consentType, granted: true }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: consentKeys.my })
    },
  })
}

export function useRevokeConsent() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (consentType: ConsentType) => revokeConsent(consentType),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: consentKeys.my })
    },
  })
}

export function useHasConsent(consentType: ConsentType): boolean {
  const { data: consents } = useMyConsents()
  return isConsentActive(consents, consentType)
}
