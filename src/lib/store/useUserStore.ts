import { create } from 'zustand'

type UserState = {
  user: null | { id: String; name: String }
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
