import { PreferenceStore } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
      mode: 'light',
      toggleMode: () =>
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
        })),
    }),
    {
      name: 'preference-store', // key for localStorage or AsyncStorage
    }
  )
)
