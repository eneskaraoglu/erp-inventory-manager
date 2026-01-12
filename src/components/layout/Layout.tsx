import { Link, useLocation, useNavigate } from 'react-router-dom'

// Zustand stores
import { useCartStore, useAuthStore } from '../../stores'

// Layout component - wraps all pages
// Like a JSF template or Swing JFrame with menu bar

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Zustand - get only what we need (selective subscription)
  const itemCount = useCartStore((state) => state.getItemCount())
  
  // Auth state
  const { isAuthenticated, user, logout } = useAuthStore()
  
  // Helper to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path
  }

  // Handle logout
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Don't show layout on login page
  if (location.pathname === '/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link to="/" className="text-xl font-bold text-blue-600">
              📦 ERP Inventory
            </Link>

            {/* Navigation Links - only show if authenticated */}
            {isAuthenticated && (
              <div className="flex gap-4 items-center">
                <Link
                  to="/"
                  className={`px-3 py-2 rounded-md ${
                    isActive('/') 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                
                <Link
                  to="/products"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname.startsWith('/products')
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Products
                </Link>
                
                <Link
                  to="/customers"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname.startsWith('/customers')
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Customers
                </Link>

                <Link
                  to="/users"
                  className={`px-3 py-2 rounded-md ${
                    location.pathname.startsWith('/users')
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Users
                </Link>

                <Link
                  to="/cart"
                  className={`px-3 py-2 rounded-md relative ${
                    isActive('/cart')
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  🛒 Cart
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* User info & Logout */}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                  {/* User badge */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {user?.full_name || user?.username}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      user?.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : user?.role === 'manager'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {user?.role}
                    </span>
                  </div>
                  
                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout
