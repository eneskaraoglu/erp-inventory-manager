import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// Single import for all providers!
import { AppProviders } from './context/AppProviders'

// Error Boundary
import ErrorBoundary from './components/ErrorBoundary'

// Protected Route
import ProtectedRoute from './components/ProtectedRoute'

// Layout - Always loaded (needed for shell)
import Layout from './components/layout/Layout'

// Login Page - Always loaded (entry point)
import LoginPage from './pages/LoginPage'

// Dashboard - Always loaded (main page)
import Dashboard from './pages/Dashboard'

// ============================================
// LAZY LOADED PAGES - Code Splitting!
// These are only loaded when the route is visited
// Like Java's lazy initialization or module loading
// ============================================

// Products - Lazy loaded
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductsGridPage = lazy(() => import('./pages/ProductsGridPage'))  // AG Grid version
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const AddProductPage = lazy(() => import('./pages/AddProductPage'))
const EditProductPage = lazy(() => import('./pages/EditProductPage'))

// Customers - Lazy loaded
const CustomersPage = lazy(() => import('./pages/Customer/CustomersPage'))
const CustomersGridPage = lazy(() => import('./pages/Customer/CustomersGridPage'))  // AG Grid version
const CustomerDetailPage = lazy(() => import('./pages/Customer/CustomerDetailPage'))
const AddCustomerPage = lazy(() => import('./pages/Customer/AddCustomerPage'))
const EditCustomerPage = lazy(() => import('./pages/Customer/EditCustomerPage'))

// Users - Lazy loaded
const UsersPage = lazy(() => import('./pages/User/UsersPage'))
const UsersGridPage = lazy(() => import('./pages/User/UsersGridPage'))  // AG Grid version
const UserDetailPage = lazy(() => import('./pages/User/UserDetailPage'))
const AddUserPage = lazy(() => import('./pages/User/AddUserPage'))
const EditUserPage = lazy(() => import('./pages/User/EditUserPage'))

// Cart - Lazy loaded
const CartPage = lazy(() => import('./pages/CartPage'))

// Practice Pages - Lazy loaded
const UseEffectPractice = lazy(() => import('./pages/practice/UseEffectPractice'))
const UseStatePractice = lazy(() => import('./pages/practice/UseStatePractice'))
const UseTogglePractice = lazy(() => import('./pages/practice/UseTogglePractice'))
const UseRefPractice = lazy(() => import('./pages/practice/UseRefPractice'))
const PerformancePractice = lazy(() => import('./pages/practice/PerformancePractice'))

// ============================================
// LOADING FALLBACK - Shows while lazy component loads
// ============================================

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

// ============================================
// APP COMPONENT
// ============================================

function App() {
  return (
    // Error Boundary wraps everything
    <ErrorBoundary>
      <AppProviders>
        <BrowserRouter>
          <Layout>
            {/* Suspense wraps lazy-loaded routes */}
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* ============================================ */}
                {/* PUBLIC ROUTES - No authentication needed */}
                {/* ============================================ */}
                <Route path="/login" element={<LoginPage />} />

                {/* ============================================ */}
                {/* PROTECTED ROUTES - Require authentication */}
                {/* ============================================ */}
                
                {/* Dashboard - Not lazy (main entry) */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* Product Routes - Lazy loaded */}
                <Route path="/products" element={
                  <ProtectedRoute>
                    <ProductsPage />
                  </ProtectedRoute>
                } />
                {/* AG Grid version of products */}
                <Route path="/products/grid" element={
                  <ProtectedRoute>
                    <ProductsGridPage />
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

                {/* Customer Routes - Lazy loaded */}
                <Route path="/customers" element={
                  <ProtectedRoute>
                    <CustomersPage />
                  </ProtectedRoute>
                } />
                {/* AG Grid version of customers */}
                <Route path="/customers/grid" element={
                  <ProtectedRoute>
                    <CustomersGridPage />
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

                {/* User Routes - Admin only! Lazy loaded */}
                <Route path="/users" element={
                  <ProtectedRoute requiredRoles={['admin', 'manager']}>
                    <UsersPage />
                  </ProtectedRoute>
                } />
                {/* AG Grid version of users */}
                <Route path="/users/grid" element={
                  <ProtectedRoute requiredRoles={['admin', 'manager']}>
                    <UsersGridPage />
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

                {/* Cart Route - Lazy loaded */}
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                } />

                {/* 🎯 Practice Routes (for learning) - Lazy loaded */}
                <Route path="/practice/usestate" element={<UseStatePractice />} />
                <Route path="/practice/useeffect" element={<UseEffectPractice />} />
                <Route path="/practice/usetoggle" element={<UseTogglePractice />} />
                <Route path="/practice/useref" element={<UseRefPractice />} />
                <Route path="/practice/performance" element={<PerformancePractice />} />
              </Routes>
            </Suspense>
          </Layout>
        </BrowserRouter>
      </AppProviders>
    </ErrorBoundary>
  )
}

export default App
