import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'

function UserDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { users, deleteUser, loading, error } = useUsers()
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
        <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Users
        </Link>
      </div>
    )
  }

  const user = users.find(u => u.id === Number(id))

  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Not Found</h1>
        <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Users
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete user "${user.username}"?`)) return
    
    try {
      setDeleting(true)
      await deleteUser(user.id)
      navigate('/users')
    } catch (err) {
      console.error('Delete failed:', err)
      setDeleting(false)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/users" className="hover:text-blue-500">Users</Link>
        <span className="mx-2">/</span>
        <span>{user.username}</span>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
              {user.full_name && (
                <p className="text-gray-600 mt-1">{user.full_name}</p>
              )}
              <div className="flex gap-2 mt-3">
                {/* Role badge */}
                <span className={`inline-block text-sm px-3 py-1 rounded ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800'
                    : user.role === 'manager'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.role}
                </span>
                {/* Active badge */}
                <span className={`inline-block text-sm px-3 py-1 rounded ${
                  user.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {user.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-gray-500 text-sm">User ID</div>
              <div className="text-2xl font-bold text-gray-700">#{user.id}</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-500 text-sm">Email</div>
            <div className="text-lg">{user.email}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Role</div>
            <div className="text-lg capitalize">{user.role}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Status</div>
            <div className={`text-lg ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
              {user.is_active ? 'Active' : 'Inactive'}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Created At</div>
            <div className="text-lg">{formatDate(user.created_at)}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-gray-50 p-6 border-t flex gap-4">
          <Link 
            to={`/users/edit/${user.id}`} 
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
          <Link to="/users" className="flex-1 bg-gray-300 text-gray-700 py-2 rounded text-center hover:bg-gray-400">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
