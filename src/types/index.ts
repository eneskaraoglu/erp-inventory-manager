// Product interface - used across the application
// Like a Java DTO/Entity class

export type Product = {
  id: number
  name: string
  price: number
  quantity: number
}

// For creating new products (no id yet)
export type NewProduct = Omit<Product, 'id'>

// Customer interface
export type Customer = {
  id: number
  name: string
  code: string        // Customer code like "A100"
  address: string     // Fixed spelling
  phone: string       // Renamed from 'number' (clearer)
  taxNumber: number   // Renamed from 'vkno' (English + clearer)
}

export type NewCustomer = Omit<Customer, 'id'>
