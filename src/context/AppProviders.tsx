import { ProductProvider } from './ProductContext'
import { CustomerProvider } from './CustomerContext'
import { CartProvider } from './CartContext'  // ✨ NEW!

// Combine all providers into one
// Like Spring's @Configuration class that defines multiple beans

interface AppProvidersProps {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ProductProvider>
      <CustomerProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </CustomerProvider>
    </ProductProvider>
  )
}

// Now App.tsx is clean!
