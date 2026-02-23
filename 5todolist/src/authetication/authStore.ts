import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  isAuthenticated: boolean
  provider: 'email' | 'kakao' | null
  login: (provider?: 'email' | 'kakao') => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      provider: null,
      login: (provider = 'email') => set({ isAuthenticated: true, provider }),
      logout: () => set({ isAuthenticated: false, provider: null }),
    }),
    { name: 'five-auth-store' },
  ),
)
