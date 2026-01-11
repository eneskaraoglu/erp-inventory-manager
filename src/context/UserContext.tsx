import { createContext, useContext, useState, useEffect } from 'react'
import type { User, UserCreate } from '../types'
import { userApi } from '../services'

// ============================================
// 1. DEFINE WHAT THE CONTEXT PROVIDES
// ============================================
interface UserContextType {
  // Data
  users: User[]
  
  // Loading & Error states
  loading: boolean
  error: string | null
  
  // Actions
  addUser: (user: UserCreate) => Promise<void>
  deleteUser: (id: number) => Promise<void>
  updateUser: (id: number, user: Partial<UserCreate>) => Promise<void>
  refreshUsers: () => Promise<void>
}

// ============================================
// 2. CREATE THE CONTEXT
// ============================================
const UserContext = createContext<UserContextType | undefined>(undefined)

// ============================================
// 3. CREATE THE PROVIDER COMPONENT
// ============================================
export function UserProvider({ children }: { children: React.ReactNode }) {
  // State
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ============================================
  // FETCH CUSTOMERS FROM API
  // ============================================
  const refreshUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await userApi.getAll()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on mount
  useEffect(() => {
    refreshUsers()
  }, [])

  // ============================================
  // ADD User
  // ============================================
  const addUser = async (user: UserCreate) => {
    try {
      setError(null)
      const newCustomer = await userApi.create(user)
      setUsers(prev => [...prev, newCustomer])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add user')
      throw err
    }
  }

  // ============================================
  // DELETE User
  // ============================================
  const deleteUser = async (id: number) => {
    try {
      setError(null)
      await userApi.delete(id)
      setUsers(prev => prev.filter(c => c.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user')
      throw err
    }
  }

  // ============================================
  // UPDATE User
  // ============================================
  const updateUser = async (id: number, user: Partial<UserCreate>) => {
    try {
      setError(null)
      const updatedCustomer = await userApi.update(id, user)
      setUsers(prev => prev.map(c => 
        c.id === id ? updatedCustomer : c
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
      throw err
    }
  }

  return (
    <UserContext.Provider value={{ 
      users, 
      loading, 
      error, 
      addUser, 
      deleteUser, 
      updateUser,
      refreshUsers 
    }}>
      {children}
    </UserContext.Provider>
  )
}

// ============================================
// 4. CUSTOM HOOK FOR EASY ACCESS
// ============================================
export function useUsers() {
  const context = useContext(UserContext)
  
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider')
  }
  
  return context
}
