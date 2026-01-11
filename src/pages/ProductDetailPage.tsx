import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const { products, deleteProduct, loading, error } = useProducts()
  const [deleting, setDeleting] = useState(false)

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Products
        </Link>
      </div>
    )
  }

  const product = products.find(p => p.id === Number(id))

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Products
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${product.name}"?`)) return
    
    try {
      setDeleting(true)
      await deleteProduct(product.id)
      navigate('/products')
    } catch (err) {
      console.error('Delete failed:', err)
      setDeleting(false)
    }
  }

  const stockStatus = product.stock < 50 
    ? { text: 'Low Stock', color: 'text-red-600 bg-red-100' }
    : { text: 'In Stock', color: 'text-green-600 bg-green-100' }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/products" className="hover:text-blue-500">Products</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              {product.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded mt-2 mr-2">
                  {product.category}
                </span>
              )}
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${product.price.toFixed(2)}</div>
              <div className="text-gray-500">per unit</div>
            </div>
          </div>
        </div>

        {/* Description */}
        {product.description && (
          <div className="p-6 border-b">
            <div className="text-gray-500 text-sm mb-1">Description</div>
            <p className="text-gray-700">{product.description}</p>
          </div>
        )}

        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-500 text-sm">Product ID</div>
            <div className="text-xl font-semibold">{product.id}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Stock</div>
            <div className={`text-xl font-semibold ${product.stock < 50 ? 'text-red-600' : ''}`}>
              {product.stock} units
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Total Value</div>
            <div className="text-xl font-semibold">${(product.price * product.stock).toFixed(2)}</div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t flex gap-4">
          <Link 
            to={`/products/edit/${product.id}`} 
            className="flex-1 bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600"
          >
            Edit
          </Link>
          <button 
            onClick={handleDelete} 
            disabled={deleting}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <Link to="/products" className="flex-1 bg-gray-300 text-gray-700 py-2 rounded text-center hover:bg-gray-400">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
