// ============================================
// AUTH STORE - Zustand store for authentication
// Like SecurityContextHolder in Spring Security
// ============================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser, LoginRequest } from '../types'
import { authApi } from '../services/api'

// ============================================
// STATE TYPE
// ============================================

interface AuthState {
  // State
  user: AuthUser | null      // Current logged-in user
  token: string | null       // JWT token
  isAuthenticated: boolean   // Quick check
  isLoading: boolean         // For login process
  error: string | null       // Login error message

  // Actions
  login: (credentials: LoginRequest) => Promise<boolean>
  logout: () => void
  clearError: () => void
  checkAuth: () => Promise<void>  // Verify token on app load
}

// ============================================
// STORE CREATION
// persist middleware = saves to localStorage automatically!
// ============================================

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // ============================================
      // INITIAL STATE
      // ============================================
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ============================================
      // LOGIN ACTION
      // ============================================
      login: async (credentials: LoginRequest): Promise<boolean> => {
        /**
         * Login user and store token
         * 
         * JAVA EQUIVALENT:
         * public boolean login(String username, String password) {
         *   try {
         *     Authentication auth = authManager.authenticate(
         *       new UsernamePasswordAuthenticationToken(username, password)
         *     );
         *     SecurityContextHolder.getContext().setAuthentication(auth);
         *     return true;
         *   } catch (AuthenticationException e) {
         *     return false;
         *   }
         * }
         */
        set({ isLoading: true, error: null })

        try {
          const response = await authApi.login(credentials)
          
          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          })

          return true
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Login failed'
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: message,
          })
          return false
        }
      },

      // ============================================
      // LOGOUT ACTION
      // ============================================
      logout: () => {
        /**
         * Clear authentication state
         * 
         * JAVA EQUIVALENT:
         * public void logout() {
         *   SecurityContextHolder.clearContext();
         *   session.invalidate();
         * }
         */
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      },

      // ============================================
      // CLEAR ERROR
      // ============================================
      clearError: () => {
        set({ error: null })
      },

      // ============================================
      // CHECK AUTH ON APP LOAD
      // ============================================
      checkAuth: async () => {
        /**
         * Verify token is still valid when app loads
         * 
         * JAVA EQUIVALENT:
         * @PostConstruct
         * public void checkAuth() {
         *   String token = getTokenFromStorage();
         *   if (token != null && jwtService.isValid(token)) {
         *     User user = jwtService.getUserFromToken(token);
         *     SecurityContextHolder.getContext().setAuthentication(user);
         *   }
         * }
         */
        const token = get().token

        if (!token) {
          set({ isAuthenticated: false, user: null })
          return
        }

        try {
          // Verify token by calling /auth/me
          const user = await authApi.getMe(token)
          set({ user, isAuthenticated: true })
        } catch {
          // Token invalid or expired - clear auth
          set({
            user: null,
            token: null,
            isAuthenticated: false,
          })
        }
      },
    }),
    {
      name: 'auth-storage',  // localStorage key
      // Only persist token and user, not loading/error states
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// ============================================
// SELECTOR HOOKS (for convenience)
// ============================================

// Get current user
export const useCurrentUser = () => useAuthStore((state) => state.user)

// Check if authenticated
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)

// Get token for API calls
export const useAuthToken = () => useAuthStore((state) => state.token)
