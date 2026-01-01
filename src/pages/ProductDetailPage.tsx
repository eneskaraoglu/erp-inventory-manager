import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Product } from '../types'

interface ProductDetailPageProps {
  products: Product[]
  onDelete: (id: number) => void
}

function ProductDetailPage({ products, onDelete }: ProductDetailPageProps) {
  // useParams gets URL parameters
  // URL: /products/123 → id = "123"
  // Like: request.getParameter("id") in Java Servlet
  const { id } = useParams()
  const navigate = useNavigate()

  // Find the product by ID
  const product = products.find(p => p.id === Number(id))

  // Handle product not found
  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link
          to="/products"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Products
        </Link>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product.id)
      navigate('/products')  // Go back to list after delete
    }
  }

  // Calculate stock status
  const stockStatus = product.quantity < 50 
    ? { text: 'Low Stock', color: 'text-red-600 bg-red-100' }
    : { text: 'In Stock', color: 'text-green-600 bg-green-100' }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/products" className="hover:text-blue-500">Products</Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      {/* Product Detail Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                ${product.price.toFixed(2)}
              </div>
              <div className="text-gray-500">per unit</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-gray-500 text-sm">Product ID</div>
              <div className="text-xl font-semibold">{product.id}</div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Quantity in Stock</div>
              <div className={`text-xl font-semibold ${product.quantity < 50 ? 'text-red-600' : ''}`}>
                {product.quantity} units
              </div>
            </div>
            <div>
              <div className="text-gray-500 text-sm">Total Value</div>
              <div className="text-xl font-semibold">
                ${(product.price * product.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 p-6 border-t flex gap-4">
          <Link
            to={`/products/${product.id}/edit`}
            className="flex-1 bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600"
          >
            Edit Product
          </Link>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            Delete Product
          </button>
          <Link
            to="/products"
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded text-center hover:bg-gray-400"
          >
            Back to List
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
