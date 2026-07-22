import { apiClient } from './client'
import type { AuthResponse } from '@/types/user'

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/api/auth/register', data)
  return response.data
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/api/auth/login', data)
  return response.data
}
