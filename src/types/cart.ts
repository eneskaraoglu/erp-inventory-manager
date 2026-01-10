// ============================================
// CART TYPES
// ============================================

/**
 * A single item in the cart
 */
export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}

/**
 * The complete cart state
 * 
 * JAVA COMPARISON:
 * Like a DTO/VO that holds all cart-related data
 * 
 * public class CartState {
 *     private List<CartItem> items;
 *     private double total;
 *     private int itemCount;
 * }
 */
export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

/**
 * ACTIONS - Describe WHAT can happen to the cart
 * 
 * JAVA COMPARISON:
 * Like Command Pattern with different command types:
 * 
 * interface CartCommand { String getType(); }
 * class AddItemCommand implements CartCommand { ... }
 * class RemoveItemCommand implements CartCommand { ... }
 * 
 * TypeScript uses "discriminated unions" for this!
 * The 'type' field tells us which action it is.
 */
export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }

/**
 * WHY USE type: 'ACTION_NAME'?
 * 
 * 1. Self-documenting - You know exactly what's happening
 * 2. Predictable - All state changes go through reducer
 * 3. Debuggable - Can log every action
 * 4. Testable - Test reducer with different actions
 * 
 * Convention: ACTION_NAMES are SCREAMING_SNAKE_CASE
 */
