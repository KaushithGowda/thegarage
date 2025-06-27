import { useQuery } from '@tanstack/react-query'
import { axiosPrivate } from '@/lib/api/axios' // use axiosPrivate if auth is needed
import { useAuthStore } from '@/store/useAuthStore';

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
       try {
        console.log(useAuthStore.getState().token);
        const res = await axiosPrivate.get('/api/profile')
        console.log('here', res);
        console.log('✅ API response:', res.data)
        return res.data
      } catch (error: any) {
        console.error('❌ API error:', error?.response?.data || error.message)
        throw error
      }
    },
  })
}