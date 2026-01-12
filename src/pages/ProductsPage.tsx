import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

// ✨ NEW: Import React Query hooks instead of Context
import { useProductsQuery, useDeleteProduct } from '../hooks'

function ProductsPage() {
  // ============================================
  // REACT QUERY - Replaces useProducts() context
  // ============================================
  const { 
    data: products = [],  // Default to empty array
    isLoading,            // Was: loading
    error,                // Same name
    refetch               // Bonus: manual refetch function
  } = useProductsQuery()

  // Delete mutation
  const deleteMutation = useDeleteProduct()
  
  // Local state for search
  const [searchTerm, setSearchTerm] = useState('')

  // Filter products
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle delete - now uses mutation
  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return
    
    deleteMutation.mutate(id)
  }

  // ============================================
  // LOADING STATE
  // ============================================
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  // ============================================
  // ERROR STATE
  // ============================================
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium mb-2">Error loading products</p>
        <p className="text-red-500 text-sm mb-4">{error.message}</p>
        <button 
          onClick={() => refetch()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    )
  }

  // ============================================
  // NORMAL RENDER
  // ============================================
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <div className="flex gap-2">
          <Link to="/products/grid" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            📊 Grid View
          </Link>
          <Link to="/products/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            + Add Product
          </Link>
        </div>
      </div>

      {/* Show delete error if any */}
      {deleteMutation.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">Delete failed: {deleteMutation.error.message}</p>
        </div>
      )}

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'No products found' : 'No products yet. Add your first product!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              {...product}
              onDelete={handleDelete}
              isDeleting={deleteMutation.isPending && deleteMutation.variables === product.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
