import { ProductProvider } from './ProductContext'
import { CustomerProvider } from './CustomerContext'
import { UserProvider } from './UserContext'
// ✨ CartProvider REMOVED - Now using Zustand (no provider needed!)

// Combine all providers into one
// Like Spring's @Configuration class that defines multiple beans

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ProductProvider>
      <CustomerProvider>
        <UserProvider>
          {children}
        </UserProvider>
      </CustomerProvider>
    </ProductProvider>
  )
}

/**
 * ✨ SESSION 6 NOTE:
 * 
 * CartProvider was REMOVED because Cart now uses Zustand!
 * Zustand doesn't need a Provider wrapper - it just works.
 * 
 * Eventually, you could migrate ALL contexts to either:
 * - React Query (for server state - API data)
 * - Zustand (for client state - UI state, cart, etc.)
 * 
 * Then AppProviders.tsx won't be needed at all!
 */
