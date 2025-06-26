import { PreferenceStore } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as SecureStore from 'expo-secure-store'

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
      mode: 'light',
      hasHydrated: false,
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
      })),
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: 'preference-store', // key for localStorage or AsyncStorage
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
      },
    }
  )
)
