import { createContext, useContext, useReducer } from 'react'
import type { CartState, CartItem } from '../types/cart'
import { cartReducer, initialCartState } from '../reducers/cartReducer'

/**
 * CART CONTEXT WITH useReducer
 * 
 * JAVA COMPARISON:
 * ----------------
 * This is like a Service class that:
 * 1. Holds state (CartState)
 * 2. Provides methods to modify state (addItem, removeItem, etc.)
 * 3. Is available via dependency injection (useCart hook)
 * 
 * @Service
 * public class CartService {
 *     private CartState state;
 *     private CartReducer reducer;
 *     
 *     public void addItem(Product product) {
 *         state = reducer.reduce(state, new AddItemAction(product));
 *     }
 *     
 *     public CartState getState() {
 *         return state;
 *     }
 * }
 */

// ============================================
// 1. DEFINE CONTEXT TYPE
// ============================================
interface CartContextType {
  // State
  items: CartItem[]
  total: number
  itemCount: number
  
  // Actions (wrapped dispatch calls)
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
}

// ============================================
// 2. CREATE CONTEXT
// ============================================
const CartContext = createContext<CartContextType | undefined>(undefined)

// ============================================
// 3. PROVIDER COMPONENT
// ============================================
export function CartProvider({ children }: { children: React.ReactNode }) {
  
  /**
   * useReducer HOOK
   * 
   * Instead of: const [state, setState] = useState(initialState)
   * We use:     const [state, dispatch] = useReducer(reducer, initialState)
   * 
   * - state: Current state (same as useState)
   * - dispatch: Function to send actions to reducer (replaces setState)
   */
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // ==========================================
  // WRAP DISPATCH IN FRIENDLY FUNCTIONS
  // ==========================================
  // This gives components a nice API instead of raw dispatch
  
  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  // ==========================================
  // PROVIDE STATE AND ACTIONS
  // ==========================================
  const value: CartContextType = {
    // Spread state
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    
    // Actions
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// ============================================
// 4. CUSTOM HOOK FOR EASY ACCESS
// ============================================
export function useCart() {
  const context = useContext(CartContext)
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  
  return context
}
