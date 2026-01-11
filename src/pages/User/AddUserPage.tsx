import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsers } from '../../context/UserContext'

/**
 * AddUserPage - Create new user with password
 */
function AddUserPage() {
  const navigate = useNavigate()
  const { addUser, error: contextError } = useUsers()
  
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  
  // Form state
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    full_name: '',
    role: 'user'
  })
  
  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!values.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (values.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    }
    
    if (!values.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Invalid email format'
    }
    
    if (!values.password) {
      newErrors.password = 'Password is required'
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    try {
      setSubmitting(true)
      setSubmitError(null)

      await addUser({
        username: values.username,
        email: values.email,
        password: values.password,
        full_name: values.full_name || undefined,
        role: values.role
      })

      navigate('/users')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to create user')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New User</h1>

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
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.username 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
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
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.email 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password <span className="text-red-500">*</span>
          </label>
          <input 
            type="password" 
            name="password"
            value={values.password} 
            onChange={handleChange}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.password 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Enter password (min 6 characters)"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input 
            type="password" 
            name="confirmPassword"
            value={values.confirmPassword} 
            onChange={handleChange}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${errors.confirmPassword 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
            placeholder="Confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
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
            placeholder="Enter full name (optional)"
          />
        </div>

        {/* Role */}
        <div className="mb-6">
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

        {/* Buttons */}
        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create User'}
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

export default AddUserPage
