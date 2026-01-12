// ============================================
// API SERVICE - Centralized HTTP calls
// Like a Java @Service class
// ============================================

import type { Product, ProductCreate, Customer, CustomerCreate, User, UserCreate, LoginRequest, LoginResponse, AuthUser } from '../types'

// Base URL for API - from environment variable
// In development: http://localhost:8000/api
// In production: your deployed API URL
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// ============================================
// TOKEN HELPER
// Gets token from localStorage (set by Zustand persist)
// ============================================

function getAuthToken(): string | null {
  try {
    const authStorage = localStorage.getItem('auth-storage')
    if (authStorage) {
      const parsed = JSON.parse(authStorage)
      return parsed.state?.token || null
    }
  } catch {
    return null
  }
  return null
}

// ============================================
// GENERIC FETCH WRAPPER
// Handles errors consistently + adds auth token
// ============================================

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  
  // Get auth token if available
  const token = getAuthToken()
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      // Add Authorization header if token exists
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options?.headers,
    },
    ...options,
  })

  // Handle 401 Unauthorized - redirect to login
  if (response.status === 401) {
    // Clear auth storage and redirect
    localStorage.removeItem('auth-storage')
    window.location.href = '/login'
    throw new Error('Session expired. Please log in again.')
  }

  // Handle HTTP errors
  if (!response.ok) {
    // Try to get error message from response
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || `HTTP Error: ${response.status}`)
  }

  // Handle 204 No Content (for DELETE)
  if (response.status === 204) {
    return null as T
  }

  return response.json()
}

// ============================================
// PRODUCT API
// ============================================

export const productApi = {
  // GET /api/products
  getAll: () => 
    fetchApi<Product[]>('/products'),

  // GET /api/products/:id
  getById: (id: number) => 
    fetchApi<Product>(`/products/${id}`),

  // POST /api/products
  create: (product: ProductCreate) =>
    fetchApi<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  // PUT /api/products/:id
  update: (id: number, product: Partial<ProductCreate>) =>
    fetchApi<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  // DELETE /api/products/:id
  delete: (id: number) =>
    fetchApi<void>(`/products/${id}`, {
      method: 'DELETE',
    }),
}

// ============================================
// CUSTOMER API
// ============================================

export const customerApi = {
  // GET /api/customers
  getAll: () => 
    fetchApi<Customer[]>('/customers'),

  // GET /api/customers/:id
  getById: (id: number) => 
    fetchApi<Customer>(`/customers/${id}`),

  // POST /api/customers
  create: (customer: CustomerCreate) =>
    fetchApi<Customer>('/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    }),

  // PUT /api/customers/:id
  update: (id: number, customer: Partial<CustomerCreate>) =>
    fetchApi<Customer>(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(customer),
    }),

  // DELETE /api/customers/:id
  delete: (id: number) =>
    fetchApi<void>(`/customers/${id}`, {
      method: 'DELETE',
    }),
    
}

// ============================================
// USER API
// ============================================

export const userApi = {
  // GET /api/users
  getAll: () => 
    fetchApi<User[]>('/users'),

  // GET /api/users/:id
  getById: (id: number) => 
    fetchApi<User>(`/users/${id}`),

  // POST /api/users
  create: (user: UserCreate) =>
    fetchApi<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),

  // PUT /api/users/:id
  update: (id: number, user: Partial<UserCreate>) =>
    fetchApi<User>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),

  // DELETE /api/users/:id
  delete: (id: number) =>
    fetchApi<void>(`/users/${id}`, {
      method: 'DELETE',
    }),
    
}

// ============================================
// AUTH API
// Like AuthenticationService in Java
// ============================================

export const authApi = {
  // POST /api/auth/login
  login: (credentials: LoginRequest) =>
    fetchApi<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  // GET /api/auth/me (requires token in header)
  getMe: (token: string) =>
    fetchApi<AuthUser>('/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }),

  // POST /api/auth/logout
  logout: () =>
    fetchApi<{ message: string }>('/auth/logout', {
      method: 'POST',
    }),
}