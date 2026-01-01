import { Link, useLocation } from 'react-router-dom'

// Layout component - wraps all pages
// Like a JSF template or Swing JFrame with menu bar

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()  // Gets current URL path
  
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
