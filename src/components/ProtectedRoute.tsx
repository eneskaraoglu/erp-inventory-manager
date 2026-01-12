// ============================================
// PROTECTED ROUTE - Route guard component
// Like @PreAuthorize or Spring Security filter
// ============================================

import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../stores'

/**
 * ProtectedRoute Component
 * 
 * Wraps routes that require authentication.
 * Redirects to login if not authenticated.
 * 
 * JAVA EQUIVALENT:
 * @PreAuthorize("isAuthenticated()")
 * public class ProtectedController { ... }
 * 
 * OR
 * 
 * public class SecurityFilter extends OncePerRequestFilter {
 *   protected void doFilterInternal(...) {
 *     if (!isAuthenticated()) {
 *       response.sendRedirect("/login");
 *     }
 *   }
 * }
 */

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]  // Optional: specific roles required
}

export default function ProtectedRoute({ 
  children, 
  requiredRoles 
}: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()
  const location = useLocation()

  // Not logged in? Redirect to login
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // Role check (if requiredRoles specified)
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = user && requiredRoles.includes(user.role)
    
    if (!hasRequiredRole) {
      // User doesn't have required role - show unauthorized
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <p className="text-sm text-gray-500">
              Required role: {requiredRoles.join(' or ')}
            </p>
            <p className="text-sm text-gray-500">
              Your role: {user?.role || 'none'}
            </p>
          </div>
        </div>
      )
    }
  }

  // Authenticated (and has required role if specified)
  return <>{children}</>
}

/**
 * USAGE EXAMPLES:
 * 
 * 1. Basic protection (any logged-in user):
 * <Route path="/dashboard" element={
 *   <ProtectedRoute>
 *     <Dashboard />
 *   </ProtectedRoute>
 * } />
 * 
 * 2. Role-based protection:
 * <Route path="/admin" element={
 *   <ProtectedRoute requiredRoles={['admin']}>
 *     <AdminPanel />
 *   </ProtectedRoute>
 * } />
 * 
 * 3. Multiple roles allowed:
 * <Route path="/manage" element={
 *   <ProtectedRoute requiredRoles={['admin', 'manager']}>
 *     <ManagementPanel />
 *   </ProtectedRoute>
 * } />
 */
