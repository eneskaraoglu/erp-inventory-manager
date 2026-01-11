// ============================================
// PRODUCT TYPES - Aligned with FastAPI backend
// ============================================

export type Product = {
  id: number
  name: string
  description?: string    // Optional - matches backend
  price: number
  stock: number           // Changed from 'quantity' to match backend
  category?: string       // Optional - matches backend
}

// For creating new products (no id yet)
export type ProductCreate = Omit<Product, 'id'>

// For updating products (all fields optional)
export type ProductUpdate = Partial<ProductCreate>

// ============================================
// CUSTOMER TYPES - Aligned with FastAPI backend
// ============================================

export type Customer = {
  id: number
  name: string
  email: string           // Required in backend
  phone?: string          // Optional
  address?: string        // Optional
  company?: string        // Optional
}

// For creating new customers
export type CustomerCreate = Omit<Customer, 'id'>

// For updating customers (all fields optional)
export type CustomerUpdate = Partial<CustomerCreate>


// ============================================
// CUSTOMER TYPES - Aligned with FastAPI backend
// ============================================

export type User = {
  id: number
  username: string
  email: string           // Required in backend
  password_hash?: string          // Optional
  full_name?: string        // Optional
  is_active?: number        // Optional
  role?: string        // Optional
  created_at?: string        // Optional
}

// For creating new customers
export type UserCreate = Omit<User, 'id'>

// For updating customers (all fields optional)
export type UserUpdate = Partial<UserCreate>
