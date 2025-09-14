import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createProduct as createProductAPI } from '../../api/product/createProduct'

interface ProductData {
  name: string
  description: string
  price: number
  stock: number
  imageUrl: string[]
}

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (data: ProductData) => {
      return await createProductAPI(data)
    },
    onSuccess: (data) => {
      toast.success('Product created successfully!')
      console.log('�� Created product:', data)
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create product')
    },
  })
}
