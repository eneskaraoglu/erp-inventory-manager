import { createContext, useContext, useState, useEffect } from 'react'
import type { Product, ProductCreate } from '../types'
import { productApi } from '../services'

// ============================================
// 1. DEFINE WHAT THE CONTEXT PROVIDES
// ============================================
interface ProductContextType {
  // Data
  products: Product[]
  
  // Loading & Error states (NEW!)
  loading: boolean
  error: string | null
  
  // Actions
  addProduct: (product: ProductCreate) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  updateProduct: (id: number, product: Partial<ProductCreate>) => Promise<void>
  refreshProducts: () => Promise<void>
}

// ============================================
// 2. CREATE THE CONTEXT
// ============================================
const ProductContext = createContext<ProductContextType | undefined>(undefined)

// ============================================
// 3. CREATE THE PROVIDER COMPONENT
// ============================================
export function ProductProvider({ children }: { children: React.ReactNode }) {
  // State
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)    // Start loading
  const [error, setError] = useState<string | null>(null)

  // ============================================
  // FETCH PRODUCTS FROM API
  // ============================================
  const refreshProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await productApi.getAll()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount
  useEffect(() => {
    refreshProducts()
  }, [])

  // ============================================
  // ADD PRODUCT
  // ============================================
  const addProduct = async (product: ProductCreate) => {
    try {
      setError(null)
      const newProduct = await productApi.create(product)
      setProducts(prev => [...prev, newProduct])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add product')
      throw err  // Re-throw so component knows it failed
    }
  }

  // ============================================
  // DELETE PRODUCT
  // ============================================
  const deleteProduct = async (id: number) => {
    try {
      setError(null)
      await productApi.delete(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
      throw err
    }
  }

  // ============================================
  // UPDATE PRODUCT
  // ============================================
  const updateProduct = async (id: number, product: Partial<ProductCreate>) => {
    try {
      setError(null)
      const updatedProduct = await productApi.update(id, product)
      setProducts(prev => prev.map(p => 
        p.id === id ? updatedProduct : p
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product')
      throw err
    }
  }

  return (
    <ProductContext.Provider value={{ 
      products, 
      loading, 
      error, 
      addProduct, 
      deleteProduct, 
      updateProduct,
      refreshProducts 
    }}>
      {children}
    </ProductContext.Provider>
  )
}

// ============================================
// 4. CUSTOM HOOK FOR EASY ACCESS
// ============================================
export function useProducts() {
  const context = useContext(ProductContext)
  
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider')
  }
  
  return context
}
