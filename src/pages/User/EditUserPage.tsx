import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'

/**
 * EditUserPage - Edit existing user
 */
function EditUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { users, updateUser, loading, error: contextError } = useUsers()
  
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  // Form state
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',        // Optional for update
    full_name: '',
    role: 'user',
    is_active: true
  })

  const user = users.find(u => u.id === Number(id))

  // Pre-fill form when user is found
  useEffect(() => {
    if (user) {
      setValues({
        username: user.username,
        email: user.email,
        password: '',      // Don't pre-fill password
        full_name: user.full_name || '',
        role: user.role,
        is_active: user.is_active
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setValues(prev => ({ ...prev, [name]: checked }))
    } else {
      setValues(prev => ({ ...prev, [name]: value }))
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // User not found
  if (!user) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">User Not Found</h1>
        <p className="text-gray-600 mt-2">The user you're looking for doesn't exist.</p>
        <Link 
          to="/users"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Users
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!values.username || !values.email) return

    try {
      setSubmitting(true)
      setSubmitError(null)

      // Build update object - only include password if provided
      const updateData: Record<string, unknown> = {
        username: values.username,
        email: values.email,
        full_name: values.full_name || undefined,
        role: values.role,
        is_active: values.is_active
      }

      // Only include password if user entered a new one
      if (values.password) {
        updateData.password = values.password
      }

      await updateUser(user.id, updateData)
      navigate('/users')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to update user')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit User</h1>

      {/* Error Message */}
      {(submitError || contextError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {submitError || contextError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Username <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="username"
            value={values.username} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            name="email"
            value={values.email} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Password (Optional for update) */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            New Password <span className="text-gray-400 text-sm">(leave blank to keep current)</span>
          </label>
          <input 
            type="password" 
            name="password"
            value={values.password} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Enter new password (optional)"
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input 
            type="text" 
            name="full_name"
            value={values.full_name} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Role
          </label>
          <select 
            name="role"
            value={values.role} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Is Active */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              name="is_active"
              checked={values.is_active}
              onChange={handleChange}
              disabled={submitting}
              className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700 font-medium">Active User</span>
          </label>
          <p className="text-gray-500 text-sm mt-1">Inactive users cannot log in</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={submitting}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/users')}
            disabled={submitting}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUserPage
