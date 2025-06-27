import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosPrivate } from '@/lib/api/axios'

type UpdateProfileInput = {
  name: string
  phoneNumber?: string
  dexp?: string
  rexp?: string
}

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (err: Error) => void
}) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (values: UpdateProfileInput) => {
      const res = await axiosPrivate.patch('/api/profile', values)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
      onSuccess?.()
    },
    onError: (err) => {
      onError?.(err)
    },
  })
}
