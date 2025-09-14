import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../api'

const fetchProducts = async () => {
  const { data } = await axiosInstance.get('/product')
  return data.data.products
}

const deleteProduct = async (id: string) => {
  const { data } = await axiosInstance.delete(`/product/${id}`)
  return data
}

const ProductList = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // Fetch products
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  // Delete mutation
  const { mutate: deleteProductMutation, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success('Product deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['products'] }) // refresh list
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to delete product')
    },
  })

  if (isLoading) return <p>Loading products...</p>
  if (isError) return <p>Failed to load products</p>

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: any) => (
            <tr key={product.id} className="border-t">
              <td className="p-3 border">
                <img
                  src={product.imageUrl[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-3 border">{product.name}</td>
              <td className="p-3 border">${product.price}</td>
              <td className="p-3 border">{product.stock}</td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProductMutation(product.id)}
                  disabled={isPending}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  {isPending ? 'Deleting...' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList
