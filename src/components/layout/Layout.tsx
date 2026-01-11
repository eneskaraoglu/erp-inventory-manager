import { Link, useLocation } from 'react-router-dom'

// ✨ NEW: Zustand store instead of Context
import { useCartStore } from '../../stores'

// Layout component - wraps all pages
// Like a JSF template or Swing JFrame with menu bar

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  
  // ✨ Zustand - get only what we need (selective subscription)
  const itemCount = useCartStore((state) => state.getItemCount())
  
  // Helper to check if link is active
  const isActive = (path: string) => {
    return location.pathname === path
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

            {/* Navigation Links */}
            <div className="flex gap-4">
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
            </div>
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
