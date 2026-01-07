import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useForm } from '../hooks'

/**
 * EditProductPage - Edit existing product
 * 
 * KEY LEARNING: Pre-filling forms with existing data
 * 
 * FLOW:
 * 1. Get product ID from URL (/products/edit/123)
 * 2. Find product in context
 * 3. Pre-fill form with product data
 * 4. On submit, update product
 * 
 * JAVA COMPARISON:
 * Like a Swing JDialog that receives an entity to edit:
 * 
 * ProductDialog dialog = new ProductDialog(existingProduct);
 * dialog.setVisible(true);
 */
function EditProductPage() {
  const { id } = useParams()  // Get ID from URL
  const navigate = useNavigate()
  const { products, updateProduct } = useProducts()

  // Find the product to edit
  const product = products.find(p => p.id === Number(id))

  // Initialize form with empty values (will be filled by useEffect)
  const { values, handleChange, setAllValues } = useForm({
    name: '',
    price: '',
    quantity: ''
  })

  // ✨ KEY CONCEPT: Pre-fill form when product is found
  useEffect(() => {
    if (product) {
      setAllValues({
        name: product.name,
        price: product.price.toString(),
        quantity: product.quantity.toString()
      })
    }
  }, [product])  // Run when product changes

  // Handle case where product doesn't exist
  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Product Not Found</h1>
        <p className="text-gray-600 mt-2">The product you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/products')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!values.name || !values.price || !values.quantity) return

    // Update the product
    updateProduct(product.id, {
      name: values.name,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity)
    })

    navigate('/products')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input 
            type="text" 
            name="name"
            value={values.name} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
          <input 
            type="number" 
            step="0.01" 
            name="price"
            value={values.price} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Quantity</label>
          <input 
            type="number" 
            name="quantity"
            value={values.quantity} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium"
          >
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/products')} 
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditProductPage
