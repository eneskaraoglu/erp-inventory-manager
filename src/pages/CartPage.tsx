// ✨ NEW: Import Zustand store instead of Context
import { useCartStore } from '../stores'

// Still using React Query for products
import { useProductsQuery } from '../hooks'

/**
 * CART PAGE - WITH ZUSTAND! ✨
 * 
 * Changes:
 * - useCartStore() instead of useCart()
 * - No Provider needed!
 * - Simpler API
 */

function CartPage() {
  // ✨ Zustand store - no Provider needed!
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)
  const getTotal = useCartStore((state) => state.getTotal)
  const getItemCount = useCartStore((state) => state.getItemCount)
  
  // React Query for products
  const { data: products = [] } = useProductsQuery()
  
  // Get computed values
  const total = getTotal()
  const itemCount = getItemCount()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🛒 Shopping Cart (Zustand Demo)</h1>

      {/* ==================== PRODUCTS TO ADD ==================== */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-gray-600">${product.price.toFixed(2)}</p>
              <button
                onClick={() => addItem({ 
                  id: product.id, 
                  name: product.name, 
                  price: product.price 
                })}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== CART ITEMS ==================== */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Cart Items ({itemCount} items)
          </h2>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="text-gray-500">Cart is empty. Add some products!</p>
        ) : (
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Subtotal */}
                  <div className="w-24 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ==================== TOTAL ==================== */}
      {items.length > 0 && (
        <section className="border-t pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </section>
      )}

      {/* ==================== EXPLANATION ==================== */}
      <section className="mt-8 p-4 bg-green-50 rounded border border-green-200">
        <h3 className="font-semibold mb-2">✨ Now Using Zustand!</h3>
        <ul className="text-sm space-y-1">
          <li>• No Provider wrapper needed</li>
          <li>• Simpler code (~60 lines vs ~200 lines)</li>
          <li>• Selective re-renders (better performance)</li>
          <li>• State persists across page navigation</li>
        </ul>
      </section>
    </div>
  )
}

export default CartPage
