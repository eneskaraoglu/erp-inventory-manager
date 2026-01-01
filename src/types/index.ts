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
