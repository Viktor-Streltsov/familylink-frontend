import { create } from 'zustand'
import type { User } from '@/types/user'

const TOKEN_KEY = 'familylink_token'

interface AuthState {
  token: string | null
  currentUser: User | null
  login: (token: string, user: Omit<User, 'avatarUrl' | 'createdAt'> & { avatarUrl?: string | null; createdAt?: string }) => void
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(TOKEN_KEY),
  currentUser: null,

  login: (token, userData) => {
    localStorage.setItem(TOKEN_KEY, token)
    const user: User = {
      avatarUrl: null,
      createdAt: new Date().toISOString(),
      ...userData,
    }
    set({ token, currentUser: user })
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY)
    set({ token: null, currentUser: null })
  },

  setUser: (user) => set({ currentUser: user }),
}))
