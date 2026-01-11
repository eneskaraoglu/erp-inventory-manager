import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useFormWithValidation } from '../hooks'
import { productSchema, type ProductFormData } from '../validation/schemas'

/**
 * AddProductPage - WITH API INTEGRATION! ✨
 * 
 * Changes from Session 4:
 * - Now sends data to FastAPI backend
 * - Shows loading state during submit
 * - Handles API errors
 * - Fields match backend schema
 */
function AddProductPage() {
  const navigate = useNavigate()
  const { addProduct, error: contextError } = useProducts()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    values,
    handleChange,
    handleBlur,
    validate,
    getError,
  } = useFormWithValidation<ProductFormData>({
    initialValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
    },
    schema: productSchema,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) {
      return
    }

    try {
      setSubmitting(true)
      setSubmitError(null)

      // Send to API (via context)
      await addProduct({
        name: values.name,
        description: values.description || undefined,
        price: parseFloat(values.price),
        stock: parseInt(values.stock),
        category: values.category || undefined,
      })

      navigate('/products')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to add product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      {/* API Error Message */}
      {(submitError || contextError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {submitError || contextError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('name') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter product name"
          />
          {getError('name') && (
            <p className="text-red-500 text-sm mt-1">{getError('name')}</p>
          )}
        </div>

        {/* Description (Optional) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            rows={3}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('description') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter product description (optional)"
          />
          {getError('description') && (
            <p className="text-red-500 text-sm mt-1">{getError('description')}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('price') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter price (e.g., 29.99)"
          />
          {getError('price') && (
            <p className="text-red-500 text-sm mt-1">{getError('price')}</p>
          )}
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="stock"
            value={values.stock}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('stock') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter stock quantity"
          />
          {getError('stock') && (
            <p className="text-red-500 text-sm mt-1">{getError('stock')}</p>
          )}
        </div>

        {/* Category (Optional) */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('category') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter category (e.g., Electronics)"
          />
          {getError('category') && (
            <p className="text-red-500 text-sm mt-1">{getError('category')}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Adding...' : 'Add Product'}
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

export default AddProductPage
