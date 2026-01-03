import { Link } from 'react-router-dom'
import type { Customer } from '../../types'

// Props extends Customer and adds onDelete function
interface CustomerCardProps extends Customer {
  onDelete: (id: number) => void
}

function CustomerCard({ id, name, code, address, phone, taxNumber, onDelete }: CustomerCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Clickable name - links to detail page */}
      <Link to={`/customers/${id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {name}
        </h3>
      </Link>
      
      <p className="text-gray-500 text-sm">{code}</p>
      <p className="text-gray-600 mt-2">📍 {address}</p>
      <p className="text-gray-600">📞 {phone}</p>
      <p className="text-gray-600">🧾 Tax No: {taxNumber}</p>
      
      <div className="mt-3 flex gap-2">
        <Link
          to={`/customers/${id}`}
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

export default CustomerCard
