/** Данные пользователя из GET /api/users/me */
export interface User {
  id: string
  email: string
  name: string
  avatarUrl: string | null
  createdAt: string
}

/** Ответ на регистрацию/вход */
export interface AuthResponse {
  token: string
  tokenType: string
  expiresInMs: number
  userId: string
  email: string
  name: string
}
