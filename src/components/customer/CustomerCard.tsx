import { Link } from 'react-router-dom'

interface CustomerCardProps {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  company?: string
  onDelete: (id: number) => void
  isDeleting?: boolean
}

function CustomerCard({ 
  id, 
  name, 
  email, 
  phone, 
  address, 
  company, 
  onDelete,
  isDeleting = false 
}: CustomerCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isDeleting ? 'opacity-50' : ''}`}>
      <Link to={`/customers/${id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {name}
        </h3>
      </Link>
      
      {company && (
        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-1">
          {company}
        </span>
      )}
      
      <p className="text-gray-600 mt-2">{email}</p>
      {phone && <p className="text-gray-500 text-sm">{phone}</p>}
      {address && <p className="text-gray-500 text-sm mt-1 line-clamp-1">{address}</p>}
      
      <div className="mt-3 flex gap-2">
        <Link
          to={`/customers/${id}`}
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

export default CustomerCard
