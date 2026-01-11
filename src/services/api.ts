// ============================================
// API SERVICE - Centralized HTTP calls
// Like a Java @Service class
// ============================================

import type { Product, ProductCreate, Customer, CustomerCreate, User, UserCreate  } from '../types'

// Base URL for API
const API_BASE = 'http://localhost:8000/api'

// ============================================
// GENERIC FETCH WRAPPER
// Handles errors consistently
// ============================================

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE}${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

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