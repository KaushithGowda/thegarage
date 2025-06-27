import { useAuthStore } from '@/store/useAuthStore'
import { Redirect } from 'expo-router'

export default function Page() {
  const { token, hasHydrated } = useAuthStore()

  if (!hasHydrated) return null
  if (!token) return <Redirect href='/(auth)/login' />
  return <Redirect href='/(tabs)/maps' />
}
