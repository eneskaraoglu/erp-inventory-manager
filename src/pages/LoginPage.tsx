// ============================================
// LOGIN PAGE - Authentication form
// Like a Login.jsp or LoginController in Java
// ============================================

import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores'

export default function LoginPage() {
  // Form state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Router
  const navigate = useNavigate()
  const location = useLocation()

  // Auth store
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore()

  // Where to redirect after login (default: home)
  const from = (location.state as { from?: string })?.from || '/'

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  // Clear error when component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await login({ username, password })
    
    if (success) {
      // Redirect to original destination or home
      navigate(from, { replace: true })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">ERP Inventory</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Redirect message */}
        {location.state?.from && (
          <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            Please log in to access that page.
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
              autoComplete="username"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Demo Accounts:</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p><span className="font-mono bg-gray-200 px-1 rounded">admin</span> / <span className="font-mono bg-gray-200 px-1 rounded">admin123</span> (Admin)</p>
            <p><span className="font-mono bg-gray-200 px-1 rounded">manager</span> / <span className="font-mono bg-gray-200 px-1 rounded">manager123</span> (Manager)</p>
            <p><span className="font-mono bg-gray-200 px-1 rounded">johndoe</span> / <span className="font-mono bg-gray-200 px-1 rounded">password123</span> (User)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
