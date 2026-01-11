import { Link } from 'react-router-dom'

interface UserCardProps {
  id: number
  username: string
  email: string
  full_name?: string
  is_active: boolean
  role: string
  created_at: string
  onDelete: (id: number) => void
  isDeleting?: boolean
}

function UserCard({ 
  id, 
  username, 
  full_name,
  email, 
  role,
  is_active,
  onDelete,
  isDeleting = false 
}: UserCardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow ${isDeleting ? 'opacity-50' : ''}`}>
      <div className="flex justify-between items-start">
        <Link to={`/users/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            {username}
          </h3>
        </Link>
        
        {/* Active/Inactive badge */}
        <span className={`text-xs px-2 py-1 rounded ${
          is_active 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {is_active ? 'Active' : 'Inactive'}
        </span>
      </div>
      
      {/* Role badge */}
      <span className={`inline-block text-xs px-2 py-1 rounded mt-2 ${
        role === 'admin' 
          ? 'bg-purple-100 text-purple-800'
          : role === 'manager'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
      }`}>
        {role}
      </span>
      
      {full_name && <p className="text-gray-600 mt-2">{full_name}</p>}
      <p className="text-gray-500 text-sm">{email}</p>
      
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
