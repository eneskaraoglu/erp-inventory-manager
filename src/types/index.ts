// ============================================
// PRODUCT TYPES - Aligned with FastAPI backend
// ============================================

export type Product = {
  id: number
  name: string
  description?: string
  price: number
  stock: number
  category?: string
}

export type ProductCreate = Omit<Product, 'id'>
export type ProductUpdate = Partial<ProductCreate>

// ============================================
// CUSTOMER TYPES - Aligned with FastAPI backend
// ============================================

export type Customer = {
  id: number
  name: string
  email: string
  phone?: string
  address?: string
  company?: string
}

export type CustomerCreate = Omit<Customer, 'id'>
export type CustomerUpdate = Partial<CustomerCreate>

// ============================================
// USER TYPES - Aligned with FastAPI backend
// ============================================

export type User = {
  id: number
  username: string
  email: string
  full_name?: string
  is_active: boolean      // ✅ Fixed: boolean not number
  role: string
  created_at: string      // ISO date string
  // Note: password_hash is NEVER returned from API (security)
}

// For creating new users (password required)
export type UserCreate = {
  username: string
  email: string
  password: string        // Plain password, backend hashes it
  full_name?: string
  role?: string
}

// For updating users (all fields optional)
export type UserUpdate = Partial<UserCreate> & {
  is_active?: boolean
}

// ============================================
// AUTH TYPES - For authentication
// ============================================

export type LoginRequest = {
  username: string
  password: string
}

export type LoginResponse = {
  access_token: string
  token_type: string
  user: AuthUser
}

export type AuthUser = {
  id: number
  username: string
  email: string
  full_name?: string
  role: string
  is_active: boolean
}
