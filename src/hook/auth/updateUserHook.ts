import { useMutation } from '@tanstack/react-query'
import updateUser from '../../api/auth/updateUserDetails'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { updateUserData } from '../../redux/authslice'

export const useUpdateUser = () => {
     const dispatch = useDispatch()
  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: any }) =>
      updateUser(userId, data),

    onSuccess: (response) => {
      toast.success('Profile updated successfully')
      dispatch(updateUserData(response))
      console.log('✅ Updated user:', response)
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to update profile')
      console.error('❌ Update failed:', error)
    },
  })
}
