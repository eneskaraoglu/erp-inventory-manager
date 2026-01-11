import { Link } from 'react-router-dom'

interface UserCardProps {
  id: number
  username: string
  email: string           // Required in backend
  password_hash?: string          // Optional
  full_name?: string        // Optional
  is_active?: number        // Optional
  role?: string        // Optional
  created_at?: string        // Optional
  onDelete: (id: number) => void
  isDeleting?: boolean
}

function UserCard({ 
  id, 
  username, 
  full_name,
  email, 
  role, 
  onDelete,
  isDeleting = false 
}: UserCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isDeleting ? 'opacity-50' : ''}`}>
      <Link to={`/users/${id}`}>
        <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
          {username}
        </h3>
      </Link>
      
      {role && (
        <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded mt-1">
          {role}
        </span>
      )}
      
      <p className="text-gray-600 mt-2">{full_name}</p>
      {email && <p className="text-gray-500 text-sm">{email}</p>}
      {role && <p className="text-gray-500 text-sm mt-1 line-clamp-1">{role}</p>}
      
      <div className="mt-3 flex gap-2">
        <Link
          to={`/users/${id}`}
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

export default UserCard
