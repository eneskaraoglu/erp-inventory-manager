import { createContext, useContext } from 'react'
import type { Product, NewProduct } from '../types'
import { useLocalStorage } from '../hooks'  // ✨ Our custom hook!

// ============================================
// 1. DEFINE WHAT THE CONTEXT PROVIDES
// ============================================
interface ProductContextType {
  products: Product[]
  addProduct: (product: NewProduct) => void
  deleteProduct: (id: number) => void
  updateProduct: (id: number, product: NewProduct) => void
}

// ============================================
// 2. CREATE THE CONTEXT
// ============================================
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// ============================================
// 3. INITIAL DATA
// ============================================
const initialProducts: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, quantity: 25 },
  { id: 2, name: "Mouse", price: 29.99, quantity: 150 },
  { id: 3, name: "Keyboard", price: 79.99, quantity: 75 },
  { id: 4, name: "Monitor", price: 349.99, quantity: 40 },
  { id: 5, name: "Webcam", price: 89.99, quantity: 5 },
]

// ============================================
// 4. CREATE THE PROVIDER COMPONENT
// ============================================
export function ProductProvider({ children }: { children: React.ReactNode }) {
  
  // ✨ BEFORE: useState + useEffect (8 lines)
  // ✨ AFTER:  useLocalStorage (1 line!)
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts)

  // All handler functions remain the same
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

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  )
}

// ============================================
// 5. CUSTOM HOOK FOR EASY ACCESS
// ============================================
export function useProducts() {
  const context = useContext(ProductContext)
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  
  return context
}
