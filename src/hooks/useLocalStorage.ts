import { useState, useEffect } from 'react'

/**
 * useLocalStorage - Custom Hook for localStorage with React state
 * 
 * JAVA COMPARISON:
 * ----------------
 * Think of this like a utility class that wraps SharedPreferences (Android)
 * or a DAO pattern for browser storage.
 * 
 * public class LocalStorageUtil<T> {
 *     private String key;
 *     private T defaultValue;
 *     
 *     public T getValue() { ... }
 *     public void setValue(T value) { ... }
 * }
 * 
 * WHY THIS HOOK?
 * --------------
 * 1. Syncs React state with localStorage automatically
 * 2. Handles JSON parsing/stringify
 * 3. Handles errors gracefully
 * 4. Reusable across any component!
 * 
 * USAGE:
 * ------
 * const [name, setName] = useLocalStorage('userName', 'Guest')
 * // Works just like useState, but persists to localStorage!
 */

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  
  // ===========================================
  // STEP 1: Initialize state from localStorage
  // ===========================================
  // Lazy initialization - only runs once on mount
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      // If item exists, parse it. Otherwise use initial value
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error (e.g., invalid JSON), use initial value
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // ===========================================
  // STEP 2: Sync to localStorage when value changes
  // ===========================================
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // ===========================================
  // STEP 3: Return just like useState!
  // ===========================================
  // Returns [value, setValue] - same API as useState
  return [storedValue, setStoredValue]
}

export default useLocalStorage
