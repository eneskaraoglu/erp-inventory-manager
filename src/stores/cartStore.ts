// ============================================
// CART STORE - Zustand
// Replaces: CartContext + cartReducer + types
// ============================================

import { create } from 'zustand'

/**
 * ZUSTAND vs CONTEXT + useReducer
 * 
 * BEFORE (Context):
 * - CartContext.tsx (50+ lines)
 * - cartReducer.ts (100+ lines)
 * - types/cart.ts (50+ lines)
 * - Provider wrapper in AppProviders.tsx
 * Total: ~200+ lines
 * 
 * AFTER (Zustand):
 * - This single file (~60 lines)
 * - No Provider needed!
 * 
 * JAVA COMPARISON:
 * Like a singleton @Service with @Autowired everywhere
 */

// ============================================
// TYPES
// ============================================
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface CartStore {
  // State
  items: CartItem[]
  
  // Computed (getters)
  getTotal: () => number
  getItemCount: () => number
  
  // Actions
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

// ============================================
// CREATE STORE
// ============================================
export const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  items: [],

  // Computed values (like Java getters)
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },

  // Actions (like Java methods)
  addItem: (item) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        // Increase quantity
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      } else {
        // Add new item
        return {
          items: [...state.items, { ...item, quantity: 1 }],
        }
      }
    })
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((item) => item.id !== id) }
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      }
    })
  },

  clearCart: () => {
    set({ items: [] })
  },
}))

/**
 * HOW TO USE:
 * 
 * // In any component (no Provider needed!)
 * import { useCartStore } from '../stores/cartStore'
 * 
 * function MyComponent() {
 *   // Get what you need
 *   const items = useCartStore((state) => state.items)
 *   const addItem = useCartStore((state) => state.addItem)
 *   const total = useCartStore((state) => state.getTotal())
 *   
 *   // Or get everything
 *   const { items, addItem, clearCart } = useCartStore()
 * }
 */
