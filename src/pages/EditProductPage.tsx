import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from '../hooks'

// ✨ NEW: Import React Query hooks
import { useProductQuery, useUpdateProduct } from '../hooks'

/**
 * EditProductPage - WITH REACT QUERY! ✨
 * 
 * Changes:
 * - Uses useProductQuery to fetch single product
 * - Uses useUpdateProduct mutation
 * - No manual loading/error state needed
 */
function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)

  // ✨ React Query - fetch single product
  const { 
    data: product, 
    isLoading, 
    error: fetchError 
  } = useProductQuery(productId)

  // ✨ React Query - update mutation
  const updateMutation = useUpdateProduct()

  // Initialize form with empty values (will be filled by useEffect)
  const { values, handleChange, setAllValues } = useForm({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  })

  // Pre-fill form when product is loaded
  useEffect(() => {
    if (product) {
      setAllValues({
        name: product.name,
        description: product.description || '',
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category || ''
      })
    }
  }, [product])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Fetch error
  if (fetchError) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Product</h1>
        <p className="text-gray-600 mt-2">{fetchError.message}</p>
        <Link 
          to="/products"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  // Handle case where product doesn't exist
  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        <Link 
          to="/products"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!values.name || !values.price || !values.stock) return

    updateMutation.mutate(
      {
        id: product.id,
        product: {
          name: values.name,
          description: values.description || undefined,
          price: parseFloat(values.price),
          stock: parseInt(values.stock),
          category: values.category || undefined
        }
      },
      {
        onSuccess: () => {
          navigate('/products')
        }
      }
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h1>

      {/* Mutation Error Message */}
      {updateMutation.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {updateMutation.error.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            value={values.name} 
            onChange={handleChange}
            disabled={updateMutation.isPending}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea 
            name="description"
            value={values.description} 
            onChange={handleChange}
            disabled={updateMutation.isPending}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input 
            type="number" 
            step="0.01" 
            name="price"
            value={values.price} 
            onChange={handleChange}
            disabled={updateMutation.isPending}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input 
            type="number" 
            name="stock"
            value={values.stock} 
            onChange={handleChange}
            disabled={updateMutation.isPending}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Category</label>
          <input 
            type="text" 
            name="category"
            value={values.category} 
            onChange={handleChange}
            disabled={updateMutation.isPending}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={updateMutation.isPending}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium disabled:opacity-50"
          >
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/products')}
            disabled={updateMutation.isPending}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage
