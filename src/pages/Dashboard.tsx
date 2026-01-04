import { Link } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'

function Dashboard() {
  // Get products from context - like @Autowired!
  const { products } = useProducts()

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
  const lowStockCount = products.filter(p => p.quantity < 50).length

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Total Products</div>
          <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Total Inventory Value</div>
          <div className="text-3xl font-bold text-green-600">${totalValue.toFixed(2)}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-gray-500 text-sm">Low Stock Items</div>
          <div className="text-3xl font-bold text-red-600">{lowStockCount}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link to="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            View All Products
          </Link>
          <Link to="/products/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
