import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Single import for all providers!
import { AppProviders } from './context/AppProviders'

// Layout
import Layout from './components/layout/Layout'

// Pages - Products
import Dashboard from './pages/Dashboard'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'  // ✨ NEW

// Pages - Customers
import CustomersPage from './pages/Customer/CustomersPage'
import CustomerDetailPage from './pages/Customer/CustomerDetailPage'
import AddCustomerPage from './pages/Customer/AddCustomerPage'
import EditCustomerPage from './pages/Customer/EditCustomerPage'

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            {/* Product Routes */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/new" element={<AddProductPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/products/edit/:id" element={<EditProductPage />} />  {/* ✨ NEW */}

            {/* Customer Routes */}
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/customers/new" element={<AddCustomerPage />} />
            <Route path="/customers/:id" element={<CustomerDetailPage />} />
            <Route path="/customers/edit/:id" element={<EditCustomerPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProviders>
  )
}

export default App
