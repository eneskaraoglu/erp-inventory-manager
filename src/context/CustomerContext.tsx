import { createContext, useContext, useState, useEffect } from 'react'
import type { Customer, CustomerCreate } from '../types'
import { customerApi } from '../services'

// ============================================
// 1. DEFINE WHAT THE CONTEXT PROVIDES
// ============================================
interface CustomerContextType {
  // Data
  customers: Customer[]
  
  // Loading & Error states
  loading: boolean
  error: string | null
  
  // Actions
  addCustomer: (customer: CustomerCreate) => Promise<void>
  deleteCustomer: (id: number) => Promise<void>
  updateCustomer: (id: number, customer: Partial<CustomerCreate>) => Promise<void>
  refreshCustomers: () => Promise<void>
}

// ============================================
// 2. CREATE THE CONTEXT
// ============================================
const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

// ============================================
// 3. CREATE THE PROVIDER COMPONENT
// ============================================
export function CustomerProvider({ children }: { children: React.ReactNode }) {
  // State
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ============================================
  // FETCH CUSTOMERS FROM API
  // ============================================
  const refreshCustomers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await customerApi.getAll()
      setCustomers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch customers')
      console.error('Error fetching customers:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount
  useEffect(() => {
    refreshCustomers()
  }, [])

  // ============================================
  // ADD CUSTOMER
  // ============================================
  const addCustomer = async (customer: CustomerCreate) => {
    try {
      setError(null)
      const newCustomer = await customerApi.create(customer)
      setCustomers(prev => [...prev, newCustomer])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add customer')
      throw err
    }
  }

  // ============================================
  // DELETE CUSTOMER
  // ============================================
  const deleteCustomer = async (id: number) => {
    try {
      setError(null)
      await customerApi.delete(id)
      setCustomers(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete customer')
      throw err
    }
  }

  // ============================================
  // UPDATE CUSTOMER
  // ============================================
  const updateCustomer = async (id: number, customer: Partial<CustomerCreate>) => {
    try {
      setError(null)
      const updatedCustomer = await customerApi.update(id, customer)
      setCustomers(prev => prev.map(c => 
        c.id === id ? updatedCustomer : c
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update customer')
      throw err
    }
  }

  return (
    <CustomerContext.Provider value={{ 
      customers, 
      loading, 
      error, 
      addCustomer, 
      deleteCustomer, 
      updateCustomer,
      refreshCustomers 
    }}>
      {children}
    </CustomerContext.Provider>
  )
}

// ============================================
// 4. CUSTOM HOOK FOR EASY ACCESS
// ============================================
export function useCustomers() {
  const context = useContext(CustomerContext)
  
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider')
  }
  
  return context
}
