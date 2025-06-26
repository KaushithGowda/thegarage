import { useAuthStore } from '@/store/useAuthStore'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'

import * as Google from 'expo-auth-session/providers/google'
import { axiosPublic } from '@/lib/api/axios'

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    redirectUri: 'com.thegarage.app:/oauth2redirect',
  })

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const authenticate = async () => {
    if (response?.type === 'success') {
      setIsLoading(true)
      setError(null)
      setSuccess(null)

      const googleAccessToken = response.authentication?.accessToken

      try {
        
        const res = await axiosPublic.post('/api/mobile-login/google', {
          token: googleAccessToken,
        })

        const data = res.data

        useAuthStore.getState().setAuth(data.token, data.user)
        setSuccess('Login successful')
        router.replace('/(tabs)/home')
      } catch (err: any) {
        console.error('Google login error:',err,)
        setError(err?.response?.data?.error || 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    authenticate()
  }, [response])

  return { promptAsync, request, error, success, isLoading }
}
