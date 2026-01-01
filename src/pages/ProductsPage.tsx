import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import ProductCard from '../components/ProductCard'

interface ProductsPageProps {
  products: Product[]
  onDelete: (id: number) => void
}

function ProductsPage({ products, onDelete }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter products based on search
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header with title and Add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>
        <Link
          to="/products/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'No products found' : 'No products yet. Add your first product!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsPage
