import { Link } from 'react-router-dom'

interface ProductCardProps {
  id: number
  name: string
  price: number
  stock: number           // Changed from 'quantity' to match backend
  description?: string    // Optional
  category?: string       // Optional
  onDelete: (id: number) => void
  isDeleting?: boolean    // NEW: Show loading state during delete
}

function ProductCard({ 
  id, 
  name, 
  price, 
  stock, 
  description,
  category,
  onDelete,
  isDeleting = false 
}: ProductCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isDeleting ? 'opacity-50' : ''}`}>
      {/* Clickable product name - links to detail page */}
      <Link to={`/products/${id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {name}
        </h3>
      </Link>
      
      {/* Category badge */}
      {category && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-1">
          {category}
        </span>
      )}
      
      {/* Description */}
      {description && (
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">{description}</p>
      )}
      
      <p className="text-gray-600 mt-2">Price: ${price.toFixed(2)}</p>
      <p className="text-gray-600">
        Stock:{" "}
        <span className={stock < 50 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
          {stock}
        </span>
      </p>
      
      <div className="mt-3 flex gap-2">
        <Link
          to={`/products/${id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
        >
          View
        </Link>
        <button
          onClick={() => onDelete(id)}
          disabled={isDeleting}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
