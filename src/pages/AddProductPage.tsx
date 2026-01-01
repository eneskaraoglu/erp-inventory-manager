import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NewProduct } from '../types'

interface AddProductPageProps {
  onAdd: (product: NewProduct) => void
}

function AddProductPage({ onAdd }: AddProductPageProps) {
  const navigate = useNavigate()  // Hook for programmatic navigation
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()  // Prevent page reload
    
    if (!name || !price || !quantity) return

    onAdd({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    })

    // Navigate back to products list after adding
    // Like response.sendRedirect("/products") in Java
    navigate('/products')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="0"
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
