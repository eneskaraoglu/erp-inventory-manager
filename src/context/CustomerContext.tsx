import { createContext, useContext } from 'react'
import type { Customer, NewCustomer } from '../types'
import { useLocalStorage } from '../hooks'  // ✨ Our custom hook!

// 1. Define interface
interface CustomerContextType {
  customers: Customer[]
  addCustomer: (customer: NewCustomer) => void
  deleteCustomer: (id: number) => void
  updateCustomer: (id: number, customer: NewCustomer) => void
}

// 2. Create context
const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

// 3. Initial data
const initialCustomers: Customer[] = [
  { id: 1, name: "Acme Corporation", code: "A100", address: "123 Main St, Texas, USA", phone: "555-0100", taxNumber: 123456789 },
  { id: 2, name: "TechStart Ltd", code: "T200", address: "456 Tech Ave, California, USA", phone: "555-0200", taxNumber: 987654321 },
  { id: 3, name: "Global Trade Co", code: "G300", address: "789 Trade Blvd, New York, USA", phone: "555-0300", taxNumber: 456789123 },
]

// 4. Provider component
export function CustomerProvider({ children }: { children: React.ReactNode }) {
  
  // ✨ BEFORE: useState + useEffect (8 lines)
  // ✨ AFTER:  useLocalStorage (1 line!)
  const [customers, setCustomers] = useLocalStorage<Customer[]>('customers', initialCustomers)

  const addCustomer = (customer: NewCustomer) => {
    setCustomers([...customers, { ...customer, id: Date.now() }])
  }

  const deleteCustomer = (id: number) => {
    setCustomers(customers.filter(c => c.id !== id))
  }

  const updateCustomer = (id: number, customer: NewCustomer) => {
    setCustomers(customers.map(c => 
      c.id === id ? { ...customer, id } : c
    ))
  }

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, deleteCustomer, updateCustomer }}>
      {children}
    </CustomerContext.Provider>
  )
}

// 5. Custom hook
export function useCustomers() {
  const context = useContext(CustomerContext)
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider')
  }
  return context
}
