import { apiClient } from './client'
import type { User } from '@/types/user'

export async function getMe(): Promise<User> {
  const response = await apiClient.get<User>('/api/users/me')
  return response.data
}
