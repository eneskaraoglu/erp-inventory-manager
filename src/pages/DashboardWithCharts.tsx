/**
 * SESSION 10: Dashboard with Charts
 * 
 * NEW CONCEPTS:
 * 1. Recharts - React charting library
 * 2. Data transformation - Reshape API data for charts
 * 3. useMemo - Cache expensive calculations (performance)
 * 
 * JAVA COMPARISON:
 * - Recharts = JFreeChart / JavaFX Charts
 * - useMemo = @Cacheable annotation
 * - Data transformation = DTO mapping in service layer
 */

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts'

// Import data hooks
import { useProductsQuery } from '../hooks'
import { useCustomers } from '../context/CustomerContext'
import { useUsers } from '../context/UserContext'

// ============================================
// CONCEPT 1: COLORS FOR CHARTS
// ============================================
// Define colors once, use everywhere (DRY principle)
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']

function DashboardWithCharts() {
  // ============================================
  // DATA FETCHING (Same as before)
  // ============================================
  const { data: products = [], isLoading: productsLoading } = useProductsQuery()
  const { customers, loading: customersLoading } = useCustomers()
  const { users, loading: usersLoading } = useUsers()

  // ============================================
  // CONCEPT 2: useMemo - CACHE EXPENSIVE CALCULATIONS
  // ============================================
  /**
   * WHY useMemo?
   * - Without: calculations run EVERY render (slow!)
   * - With: calculations only run when data changes
   * 
   * JAVA EQUIVALENT:
   * @Cacheable(value = "categoryStats", key = "#products")
   * public List<CategoryStat> getCategoryStats(List<Product> products)
   * 
   * RULE: Use useMemo when:
   * 1. Calculation is expensive (loops, aggregations)
   * 2. Result is used in render
   * 3. Dependencies don't change often
   */

  // Calculate stats - only recalculates when products change
  const stats = useMemo(() => {
    const totalProducts = products.length
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
    const lowStockCount = products.filter(p => p.stock < 10).length
    const outOfStock = products.filter(p => p.stock === 0).length
    const totalCustomers = customers.length
    const totalUsers = users.length
    const activeUsers = users.filter(u => u.is_active).length

    return {
      totalProducts,
      totalValue,
      lowStockCount,
      outOfStock,
      totalCustomers,
      totalUsers,
      activeUsers,
    }
  }, [products, customers, users])  // Dependencies: only recalculate when these change

  // ============================================
  // CONCEPT 3: DATA TRANSFORMATION FOR CHARTS
  // ============================================
  /**
   * Charts need data in specific format:
   * [{ name: 'Category', value: 10 }, ...]
   * 
   * We transform our Product[] into chart-friendly format.
   * 
   * JAVA EQUIVALENT:
   * products.stream()
   *   .collect(Collectors.groupingBy(Product::getCategory, Collectors.counting()))
   *   .entrySet().stream()
   *   .map(e -> new ChartData(e.getKey(), e.getValue()))
   *   .toList();
   */

  // Bar Chart Data: Products per Category
  const categoryData = useMemo(() => {
    // Group products by category
    const categoryMap = products.reduce((acc, product) => {
      const category = product.category || 'Uncategorized'
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Convert to array format for Recharts
    // { Electronics: 5, Clothing: 3 } → [{ name: 'Electronics', count: 5 }, ...]
    return Object.entries(categoryMap).map(([name, count]) => ({
      name,
      count,
    }))
  }, [products])

  // Pie Chart Data: Stock Distribution
  const stockDistribution = useMemo(() => {
    const outOfStock = products.filter(p => p.stock === 0).length
    const lowStock = products.filter(p => p.stock > 0 && p.stock < 10).length
    const normalStock = products.filter(p => p.stock >= 10 && p.stock < 50).length
    const highStock = products.filter(p => p.stock >= 50).length

    return [
      { name: 'Out of Stock', value: outOfStock },
      { name: 'Low (1-9)', value: lowStock },
      { name: 'Normal (10-49)', value: normalStock },
      { name: 'High (50+)', value: highStock },
    ].filter(item => item.value > 0)  // Remove zero values
  }, [products])

  // ============================================
  // 🎯 PRACTICE: Top Products by Inventory Value
  // ============================================
  // This shows top 5 products sorted by (price * stock)
  const topProductsByValue = useMemo(() => {
    return products
      .map(p => ({
        name: p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name,
        value: p.price * p.stock,
      }))
      .sort((a, b) => b.value - a.value)  // Sort descending
      .slice(0, 5)  // Take top 5
  }, [products])

  // Line Chart Data: Simulated Sales Trend (7 days)
  // In real app, this would come from API
  const salesTrend = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    // Simulate sales data based on product count
    const baseValue = products.length * 100
    return days.map((day, index) => ({
      day,
      sales: Math.floor(baseValue * (0.7 + Math.random() * 0.6)),
      orders: Math.floor(10 + Math.random() * 20),
    }))
  }, [products])

  // ============================================
  // LOADING STATE
  // ============================================
  if (productsLoading || customersLoading || usersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // ============================================
  // RENDER DASHBOARD
  // ============================================
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <Link 
          to="/dashboard-old" 
          className="text-blue-600 hover:underline text-sm"
        >
          View Simple Dashboard →
        </Link>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard 
          title="Products" 
          value={stats.totalProducts} 
          color="blue"
        />
        <StatCard 
          title="Customers" 
          value={stats.totalCustomers} 
          color="purple"
        />
        <StatCard 
          title="Users" 
          value={stats.totalUsers} 
          subtitle={`${stats.activeUsers} active`}
          color="indigo"
        />
        <StatCard 
          title="Inventory Value" 
          value={`$${stats.totalValue.toFixed(0)}`} 
          color="green"
        />
        <StatCard 
          title="Low Stock" 
          value={stats.lowStockCount} 
          color="orange"
        />
        <StatCard 
          title="Out of Stock" 
          value={stats.outOfStock} 
          color="red"
        />
      </div>

      {/* Charts Row 1: Bar + Pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: Products by Category */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Products by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No products to display
            </div>
          )}
        </div>

        {/* Pie Chart: Stock Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Stock Distribution</h2>
          {stockDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stockDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  dataKey="value"
                >
                  {stockDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-500">
              No stock data to display
            </div>
          )}
        </div>
      </div>

      {/* Charts Row 2: Top Products by Value */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Top 5 Products by Inventory Value</h2>
        {topProductsByValue.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsByValue} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `${value.toLocaleString()}`} />
              <YAxis type="category" dataKey="name" width={120} />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()}`} />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            No products to display
          </div>
        )}
      </div>

      {/* Charts Row 3: Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Weekly Sales Trend (Simulated)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="sales" 
              stroke="#3B82F6" 
              strokeWidth={2}
              name="Sales ($)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="orders" 
              stroke="#10B981" 
              strokeWidth={2}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2">
          * This is simulated data. In a real app, connect to sales API.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickActionCard 
          title="Products" 
          viewLink="/products" 
          addLink="/products/new" 
        />
        <QuickActionCard 
          title="Customers" 
          viewLink="/customers" 
          addLink="/customers/new" 
        />
        <QuickActionCard 
          title="Users" 
          viewLink="/users" 
          addLink="/users/new" 
        />
      </div>
    </div>
  )
}

// ============================================
// CONCEPT 4: COMPONENT COMPOSITION
// ============================================
/**
 * Break dashboard into smaller components.
 * Each component has ONE job (Single Responsibility)
 * 
 * JAVA EQUIVALENT:
 * - StatCard = StatCardPanel class
 * - QuickActionCard = QuickActionPanel class
 */

// Stat Card Component
interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  color: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'indigo'
}

function StatCard({ title, value, subtitle, color }: StatCardProps) {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    red: 'text-red-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600',
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  )
}

// Quick Action Card Component
interface QuickActionCardProps {
  title: string
  viewLink: string
  addLink: string
}

function QuickActionCard({ title, viewLink, addLink }: QuickActionCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex gap-4">
        <Link 
          to={viewLink} 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View All
        </Link>
        <Link 
          to={addLink} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New
        </Link>
      </div>
    </div>
  )
}

export default DashboardWithCharts
