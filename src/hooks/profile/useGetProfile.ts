import { useQuery } from '@tanstack/react-query'
import { axiosPrivate } from '@/lib/api/axios'

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
       try {
        const res = await axiosPrivate.get('/api/profile')
        return res.data
      } catch (error: any) {
        console.error('API error:', error?.response?.data || error.message)
        throw error
      }
    },
  })
}