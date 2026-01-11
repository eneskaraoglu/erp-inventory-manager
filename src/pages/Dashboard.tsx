import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useCustomers } from '../context/CustomerContext'
import { useUsers } from '../context/UserContext'

function Dashboard() {
  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { customers, loading: customersLoading, error: customersError } = useCustomers()
  const { users, loading: usersLoading, error: usersError } = useUsers()

  const loading = productsLoading || customersLoading || usersLoading
  const error = productsError || customersError || usersError

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium mb-2">Error loading data</p>
        <p className="text-red-500 text-sm mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    )
  }

  // Calculate stats
  const totalProducts = products.length
  const totalCustomers = customers.length
  const totalUsers = users.length
  const activeUsers = users.filter(u => u.is_active).length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  const lowStockCount = products.filter(p => p.stock < 50).length

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* API Status Indicator */}
      <div className="mb-6 flex items-center gap-2 text-sm text-green-600">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        Connected to API (localhost:8000)
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Total Products</div>
          <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Total Customers</div>
          <div className="text-3xl font-bold text-purple-600">{totalCustomers}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Total Users</div>
          <div className="text-3xl font-bold text-indigo-600">{totalUsers}</div>
          <div className="text-xs text-gray-400 mt-1">{activeUsers} active</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Inventory Value</div>
          <div className="text-3xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Low Stock Items</div>
          <div className="text-3xl font-bold text-red-600">{lowStockCount}</div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="flex gap-4">
            <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View All
            </Link>
            <Link to="/products/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add New
            </Link>
          </div>
        </div>

        {/* Customers Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Customers</h2>
          <div className="flex gap-4">
            <Link to="/customers" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View All
            </Link>
            <Link to="/customers/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add New
            </Link>
          </div>
        </div>

        {/* Users Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="flex gap-4">
            <Link to="/users" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View All
            </Link>
            <Link to="/users/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Add New
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
