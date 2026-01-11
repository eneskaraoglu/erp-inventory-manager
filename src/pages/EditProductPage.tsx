import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useForm } from '../hooks'

/**
 * EditProductPage - Edit existing product with API integration
 */
function EditProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { products, updateProduct, loading, error: contextError } = useProducts()
  
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Find the product to edit
  const product = products.find(p => p.id === Number(id))

  // Initialize form with empty values (will be filled by useEffect)
  const { values, handleChange, setAllValues } = useForm({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: ''
  })

  // Pre-fill form when product is found
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
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
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

    try {
      setSubmitting(true)
      setSubmitError(null)

      await updateProduct(product.id, {
        name: values.name,
        description: values.description || undefined,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        category: values.category || undefined
      })

      navigate('/products')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to update product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h1>

      {/* Error Message */}
      {(submitError || contextError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {submitError || contextError}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
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
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={submitting}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/products')}
            disabled={submitting}
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
