// src/store/useAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'
import { setupAxiosAuthInterceptor } from '@/lib/api/axios'

type AuthStore = {
  token: string | null
  user: { id: string; email: string } | null
  hasHydrated: boolean
  setAuth: (token: string, user: AuthStore['user']) => void
  logout: () => void
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      hasHydrated: false,
      setAuth: (token, user) => {
        set({ token, user })
        setupAxiosAuthInterceptor()
      },
      logout: () => set({ token: null, user: null }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: {
        getItem: async (name) => {
          const value = await SecureStore.getItemAsync(name)
          return value ? JSON.parse(value) : null
        },
        setItem: async (name, value) => {
          await SecureStore.setItemAsync(name, JSON.stringify(value))
        },
        removeItem: async (name) => {
          await SecureStore.deleteItemAsync(name)
        },
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)

        // Setup interceptor if token exists after rehydration
        if (state?.token) {
          setupAxiosAuthInterceptor()
        }
      },
    }
  )
)
