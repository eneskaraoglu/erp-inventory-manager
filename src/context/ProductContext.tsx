import { createContext, useContext, useState, useEffect } from 'react'
import type { Product, NewProduct } from '../types'

// ============================================
// 1. DEFINE WHAT THE CONTEXT PROVIDES
// ============================================
// Like a Java Interface - defines the contract
interface ProductContextType {
  products: Product[]
  addProduct: (product: NewProduct) => void
  deleteProduct: (id: number) => void
  updateProduct: (id: number, product: NewProduct) => void
}

// ============================================
// 2. CREATE THE CONTEXT
// ============================================
// Like creating a Spring Bean definition
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// ============================================
// 3. CREATE THE PROVIDER COMPONENT
// ============================================
// Like @Configuration class that provides beans
const initialProducts: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, quantity: 25 },
  { id: 2, name: "Mouse", price: 29.99, quantity: 150 },
  { id: 3, name: "Keyboard", price: 79.99, quantity: 75 },
  { id: 4, name: "Monitor", price: 349.99, quantity: 40 },
  { id: 5, name: "Webcam", price: 89.99, quantity: 5 },
]

export function ProductProvider({ children }: { children: React.ReactNode }) {
  // State lives HERE now, not in App.tsx
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products')
    return saved ? JSON.parse(saved) : initialProducts
  })

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  // All handler functions
  const addProduct = (product: NewProduct) => {
    setProducts([...products, { ...product, id: Date.now() }])
  }

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id))
  }

  const updateProduct = (id: number, product: NewProduct) => {
    setProducts(products.map(p => 
      p.id === id ? { ...product, id } : p
    ))
  }

  // Provide value to all children
  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

// ============================================
// 4. CREATE CUSTOM HOOK FOR EASY ACCESS
// ============================================
// Like a factory method to get the service
export function useProducts() {
  const context = useContext(ProductContext)
  
  // Safety check - must be used inside Provider
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  
  return context
}
