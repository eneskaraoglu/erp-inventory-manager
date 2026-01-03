import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Product, NewProduct, Customer, NewCustomer } from './types'

// Layout
import Layout from './components/layout/Layout'

// Pages - Products
import Dashboard from './pages/Dashboard'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AddProductPage from './pages/AddProductPage'

// Pages - Customers
import CustomersPage from './pages/Customer/CustomersPage'
import CustomerDetailPage from './pages/Customer/CustomerDetailPage'
import AddCustomerPage from './pages/Customer/AddCustomerPage'

// Initial mock data
const initialProducts: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, quantity: 25 },
  { id: 2, name: "Mouse", price: 29.99, quantity: 150 },
  { id: 3, name: "Keyboard", price: 79.99, quantity: 75 },
  { id: 4, name: "Monitor", price: 349.99, quantity: 40 },
  { id: 5, name: "Webcam", price: 89.99, quantity: 5 },
]

const initialCustomers: Customer[] = [
  { id: 1, name: "Acme Corporation", code: "A100", address: "123 Main St, Texas, USA", phone: "555-0100", taxNumber: 123456789 },
  { id: 2, name: "TechStart Ltd", code: "T200", address: "456 Tech Ave, California, USA", phone: "555-0200", taxNumber: 987654321 },
  { id: 3, name: "Global Trade Co", code: "G300", address: "789 Trade Blvd, New York, USA", phone: "555-0300", taxNumber: 456789123 },
]

function App() {
  // ============ PRODUCTS STATE ============
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products')
    return saved ? JSON.parse(saved) : initialProducts
  })

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const handleAddProduct = (product: NewProduct) => {
    setProducts([...products, { ...product, id: Date.now() }])
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  // ============ CUSTOMERS STATE ============
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('customers')
    return saved ? JSON.parse(saved) : initialCustomers
  })

  useEffect(() => {
    localStorage.setItem('customers', JSON.stringify(customers))
  }, [customers])

  const handleAddCustomer = (customer: NewCustomer) => {
    setCustomers([...customers, { ...customer, id: Date.now() }])
  }

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard products={products} />} />

          {/* Products */}
          <Route path="/products" element={<ProductsPage products={products} onDelete={handleDeleteProduct} />} />
          <Route path="/products/new" element={<AddProductPage onAdd={handleAddProduct} />} />
          <Route path="/products/:id" element={<ProductDetailPage products={products} onDelete={handleDeleteProduct} />} />

          {/* Customers */}
          <Route path="/customers" element={<CustomersPage customers={customers} onDelete={handleDeleteCustomer} />} />
          <Route path="/customers/new" element={<AddCustomerPage onAdd={handleAddCustomer} />} />
          <Route path="/customers/:id" element={<CustomerDetailPage customers={customers} onDelete={handleDeleteCustomer} />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
