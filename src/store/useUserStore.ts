import { create } from 'zustand'

export type User = {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  password?: string
  phoneNumber?: string
  dexp?: string
  rexp?: string
  createdAt?: string
  vehicles?: any[]
}

type UserState = {
  user: null | User
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))