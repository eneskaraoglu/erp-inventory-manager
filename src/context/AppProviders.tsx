import { ProductProvider } from './ProductContext'
import { CustomerProvider } from './CustomerContext'
import { CartProvider } from './CartContext'
import { UserProvider } from './UserContext'

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
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </CustomerProvider>
    </ProductProvider>
  )
}

// Now App.tsx is clean!
