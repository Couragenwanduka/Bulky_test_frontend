import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useUploadImages } from '../hook/upload'
import { useState } from 'react'
import { useCreateProduct } from '../hook/product/createProduct'

const ProductSchema = Yup.object().shape({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').positive(),
  stock: Yup.number().required('Stock is required').min(0),
  imageUrl: Yup.array().of(Yup.string().url()).min(1, 'At least one image is required')
})

const Product = () => {
  const navigate = useNavigate()
  const { imageUrls, uploadSingleFile, removeImage, isPending, clearImages } = useUploadImages()
  const [submitting, setSubmitting] = useState(false)
  const { mutate: createProductMutation } = useCreateProduct()

  const handleSubmit = async (values: any, { resetForm }: any) => {
    if (imageUrls.length === 0) {
      toast.error('Please upload at least one image')
      return
    }

    try {
      setSubmitting(true)
      const productData = { ...values, imageUrl: imageUrls }
     await createProductMutation(productData)
      toast.success('Product created successfully!')
      resetForm()
      clearImages()
      navigate('/admin/products')
    } catch (err: any) {
      console.error(err)
      toast.error(err?.response?.data?.message || 'Failed to create product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>
      <Formik
        initialValues={{ name: '', description: '', price: 0, stock: 0 }}
        validationSchema={ProductSchema}
        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
      >
        {({  }) => (
          <Form className="space-y-4">
            {/* Image Upload Section */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                Upload image first (Max 9)
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = e.target.files
                  if (!files) return
                  Array.from(files).forEach((file) => {
                    if (imageUrls.length < 9) uploadSingleFile(file)
                    else toast.error('Maximum 9 images allowed')
                  })
                }}
                className="mb-2"
              />

              {/* Previews */}
              <div className="flex gap-2 flex-wrap mt-2">
                {imageUrls.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} alt={`Upload ${i}`} className="w-24 h-24 object-cover rounded border" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute top-0 right-0 text-white bg-red-500 rounded-full px-1"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Form Fields */}
            <div>
              <label>Product Name</label>
              <Field name="name" type="text" className="w-full p-2 border rounded" />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>Description</label>
              <Field as="textarea" name="description" rows={4} className="w-full p-2 border rounded resize-none" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>Price</label>
              <Field name="price" type="number" step="0.01" className="w-full p-2 border rounded" />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label>Stock</label>
              <Field name="stock" type="number" className="w-full p-2 border rounded" />
              <ErrorMessage name="stock" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={submitting || isPending}
              className="bg-primary text-white py-2 px-4 rounded hover:bg-primary/90"
            >
              {submitting || isPending ? 'Creating...' : 'Create Product'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Product
