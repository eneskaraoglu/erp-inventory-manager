import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useForm } from '../hooks'  // ✨ Our new custom hook!

/**
 * AddProductPage - Refactored with useForm hook
 * 
 * BEFORE: 3 separate useState calls + 3 separate onChange handlers
 * AFTER:  1 useForm call + 1 shared handleChange
 * 
 * Notice how much cleaner this is!
 */
function AddProductPage() {
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  // ✨ ONE hook handles ALL form fields!
  const { values, handleChange, resetForm } = useForm({
    name: '',
    price: '',
    quantity: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!values.name || !values.price || !values.quantity) return

    // Add product
    addProduct({
      name: values.name,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity)
    })

    // Navigate back
    navigate('/products')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        
        {/* 
          ✨ KEY CHANGE: Each input has a "name" attribute
          that matches the key in our form state!
          
          name="name"     → updates values.name
          name="price"    → updates values.price
          name="quantity" → updates values.quantity
        */}
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Product Name</label>
          <input 
            type="text" 
            name="name"                    // ✨ Must match form state key!
            value={values.name} 
            onChange={handleChange}        // ✨ Same handler for all!
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price ($)</label>
          <input 
            type="number" 
            step="0.01" 
            name="price"                   // ✨ Must match form state key!
            value={values.price} 
            onChange={handleChange}        // ✨ Same handler for all!
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Quantity</label>
          <input 
            type="number" 
            name="quantity"                // ✨ Must match form state key!
            value={values.quantity} 
            onChange={handleChange}        // ✨ Same handler for all!
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
          >
            Add Product
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

export default AddProductPage
