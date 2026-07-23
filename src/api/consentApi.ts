import { apiClient } from './client'
import type { Consent, ConsentType } from '@/types/consent'

export interface GrantConsentRequest {
  consentType: ConsentType
  granted: boolean
}

/** POST /api/consents */
export async function grantConsent(data: GrantConsentRequest): Promise<Consent> {
  const response = await apiClient.post<Consent>('/api/consents', data)
  return response.data
}

/** DELETE /api/consents/:type */
export async function revokeConsent(consentType: ConsentType): Promise<void> {
  await apiClient.delete(`/api/consents/${consentType}`)
}

/** GET /api/consents/my */
export async function getMyConsents(): Promise<Consent[]> {
  const response = await apiClient.get<Consent[]>('/api/consents/my')
  return response.data
}
