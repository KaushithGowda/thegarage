import { useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuthStore } from '@/store/useAuthStore'
import { axiosPublic } from '@/lib/api/axios'

export const useCredentialsLogin = () => {
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    console.log(email,password);
    console.log(`${process.env.EXPO_PUBLIC_API_URL}/api/mobile-login`);

    try {
      const res = await axiosPublic.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/mobile-login`,
        { email, password }
      )

      console.log(res);
      
      const token = res.data?.token || null
      const user = res.data?.user || null

      if (token && user) {
        setSuccess('Login successful')
        useAuthStore.getState().setAuth(token, user)
        router.replace('/(tabs)/home')
        return { success: true }
      }

      setError('Invalid credentials')
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return { login, success, error, isLoading }
}
