import { Link } from 'react-router-dom'

interface ProductCardProps {
  id: number
  name: string
  price: number
  quantity: number
  onDelete: (id: number) => void
}

function ProductCard({ id, name, price, quantity, onDelete }: ProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Clickable product name - links to detail page */}
      <Link to={`/products/${id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {name}
        </h3>
      </Link>
      
      <p className="text-gray-600 mt-2">Price: ${price.toFixed(2)}</p>
      <p className="text-gray-600">
        Quantity:{" "}
        <span className={quantity < 50 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
          {quantity}
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
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductCard
