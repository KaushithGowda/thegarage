import { setupAxiosAuthInterceptor } from '@/lib/api/axios'
import { useAuthStore } from '@/store/useAuthStore'
import { Redirect } from 'expo-router'
import { useRef, useEffect } from 'react'

export default function Page() {
  const { token, hasHydrated } = useAuthStore()
  const interceptorSetupRef = useRef(false)

  useEffect(() => {
    const unsub = useAuthStore.subscribe((state) => {
      if (state.hasHydrated && state.token && !interceptorSetupRef.current) {
        setupAxiosAuthInterceptor()
        interceptorSetupRef.current = true
      }
    })
    return () => unsub()
  }, [])

  if (!hasHydrated) return null
  if (!token) return <Redirect href='/(auth)/login' />
  return <Redirect href='/(tabs)/maps' />
}
