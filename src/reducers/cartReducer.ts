import type { CartState, CartAction } from '../types/cart'

/**
 * CART REDUCER
 * 
 * JAVA COMPARISON:
 * ----------------
 * This is like a CommandHandler or State Machine:
 * 
 * public class CartReducer {
 *     public CartState reduce(CartState currentState, CartCommand action) {
 *         switch (action.getType()) {
 *             case "ADD_ITEM":
 *                 return handleAddItem(currentState, action);
 *             case "REMOVE_ITEM":
 *                 return handleRemoveItem(currentState, action);
 *             default:
 *                 return currentState;
 *         }
 *     }
 * }
 * 
 * KEY RULES:
 * ----------
 * 1. PURE FUNCTION - Same input = Same output (no randomness, no API calls)
 * 2. NO MUTATIONS - Never modify state directly, return NEW object
 * 3. RETURN STATE - Always return the new state (or current if no change)
 */

// Helper function to calculate totals
function calculateTotals(items: CartState['items']) {
  return {
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
  }
}

// The REDUCER function
export function cartReducer(state: CartState, action: CartAction): CartState {
  
  switch (action.type) {
    
    // =========================================
    // ADD_ITEM
    // =========================================
    case 'ADD_ITEM': {
      // Check if item already exists
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      let newItems: CartState['items']
      
      if (existingItem) {
        // Item exists → increase quantity
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // New item → add with quantity 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }
      
      // Return NEW state object (never mutate!)
      return {
        items: newItems,
        ...calculateTotals(newItems),
      }
    }
    
    // =========================================
    // REMOVE_ITEM
    // =========================================
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload.id)
      
      return {
        items: newItems,
        ...calculateTotals(newItems),
      }
    }
    
    // =========================================
    // UPDATE_QUANTITY
    // =========================================
    case 'UPDATE_QUANTITY': {
      // If quantity is 0 or less, remove the item
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter(item => item.id !== action.payload.id)
        return {
          items: newItems,
          ...calculateTotals(newItems),
        }
      }
      
      // Update the quantity
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      
      return {
        items: newItems,
        ...calculateTotals(newItems),
      }
    }
    
    // =========================================
    // CLEAR_CART
    // =========================================
    case 'CLEAR_CART': {
      return {
        items: [],
        total: 0,
        itemCount: 0,
      }
    }
    
    // =========================================
    // DEFAULT - Unknown action, return current state
    // =========================================
    default:
      return state
  }
}

/**
 * INITIAL STATE
 * 
 * Starting state for the cart (empty)
 */
export const initialCartState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}
