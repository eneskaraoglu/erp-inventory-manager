import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Single import for all providers!
import { AppProviders } from './context/AppProviders'

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary'

// ✨ NEW: Protected Route
import ProtectedRoute from './components/ProtectedRoute'

// Layout
import Layout from './components/layout/Layout'

// ✨ NEW: Login Page
import LoginPage from './pages/LoginPage'

// Pages - Products
import Dashboard from './pages/Dashboard'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'

// Pages - Customers
import CustomersPage from './pages/Customer/CustomersPage'
import CustomerDetailPage from './pages/Customer/CustomerDetailPage'
import AddCustomerPage from './pages/Customer/AddCustomerPage'
import EditCustomerPage from './pages/Customer/EditCustomerPage'

// Pages - Users
import UsersPage from './pages/User/UsersPage'
import UserDetailPage from './pages/User/UserDetailPage'
import AddUserPage from './pages/User/AddUserPage'
import EditUserPage from './pages/User/EditUserPage'

// Pages - Cart (now using Zustand!)
import CartPage from './pages/CartPage'

// Practice Pages (for learning exercises)
import UseEffectPractice from './pages/practice/UseEffectPractice'
import UseStatePractice from './pages/practice/UseStatePractice'
import UseTogglePractice from './pages/practice/UseTogglePractice'
import UseRefPractice from './pages/practice/UseRefPractice'

function App() {
  return (
    // Error Boundary wraps everything
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* ============================================ */}
              {/* PUBLIC ROUTES - No authentication needed */}
              {/* ============================================ */}
              <Route path="/login" element={<LoginPage />} />

              {/* ============================================ */}
              {/* PROTECTED ROUTES - Require authentication */}
              {/* ============================================ */}
              
              {/* Dashboard */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Product Routes */}
              <Route path="/products" element={
                <ProtectedRoute>
                  <ProductsPage />
                </ProtectedRoute>
              } />
              <Route path="/products/new" element={
                <ProtectedRoute>
                  <AddProductPage />
                </ProtectedRoute>
              } />
              <Route path="/products/:id" element={
                <ProtectedRoute>
                  <ProductDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/products/edit/:id" element={
                <ProtectedRoute>
                  <EditProductPage />
                </ProtectedRoute>
              } />

              {/* Customer Routes */}
              <Route path="/customers" element={
                <ProtectedRoute>
                  <CustomersPage />
                </ProtectedRoute>
              } />
              <Route path="/customers/new" element={
                <ProtectedRoute>
                  <AddCustomerPage />
                </ProtectedRoute>
              } />
              <Route path="/customers/:id" element={
                <ProtectedRoute>
                  <CustomerDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/customers/edit/:id" element={
                <ProtectedRoute>
                  <EditCustomerPage />
                </ProtectedRoute>
              } />

              {/* User Routes - Admin only! */}
              <Route path="/users" element={
                <ProtectedRoute requiredRoles={['admin', 'manager']}>
                  <UsersPage />
                </ProtectedRoute>
              } />
              <Route path="/users/new" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <AddUserPage />
                </ProtectedRoute>
              } />
              <Route path="/users/:id" element={
                <ProtectedRoute requiredRoles={['admin', 'manager']}>
                  <UserDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/users/edit/:id" element={
                <ProtectedRoute requiredRoles={['admin']}>
                  <EditUserPage />
                </ProtectedRoute>
              } />

              {/* Cart Route */}
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />

              {/* 🎯 Practice Routes (for learning exercises) */}
              <Route path="/practice/usestate" element={<UseStatePractice />} />
              <Route path="/practice/useeffect" element={<UseEffectPractice />} />
              <Route path="/practice/usetoggle" element={<UseTogglePractice />} />
              <Route path="/practice/useref" element={<UseRefPractice />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
