import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import uploadFile from '../api/upload'

export const useUploadImages = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const { mutate: uploadSingleFile, isPending } = useMutation({
    mutationFn: async (file: File) => {
      return await uploadFile(file)
    },
    onSuccess: (data) => {
      console.log("📦 Upload response:", data)

      if (imageUrls.length >= 9) {
        toast.error('You can upload up to 9 images only.')
        return
      }



    setImageUrls((prev) => [...prev, data[0].secure_url])
      toast.success('Image uploaded successfully!')
      console.log('✅ Uploaded image:', data[0].secure_url)
    },
    
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to upload image')
    },
    
  })
  const clearImages = () => setImageUrls([])

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return { imageUrls, uploadSingleFile, isPending, removeImage, clearImages }
}
