import { useState, type ChangeEvent } from 'react'

/**
 * useForm - Custom Hook for form state management
 * 
 * JAVA COMPARISON:
 * ----------------
 * Like a FormBean or DTO with automatic binding:
 * 
 * public class ProductForm {
 *     private Map<String, Object> fields;
 *     
 *     public void setField(String name, Object value) {
 *         fields.put(name, value);
 *     }
 *     
 *     public Object getField(String name) {
 *         return fields.get(name);
 *     }
 *     
 *     public void reset() {
 *         fields.clear();
 *     }
 * }
 * 
 * WHY THIS HOOK?
 * --------------
 * 1. One state object for ALL form fields
 * 2. One onChange handler for ALL inputs
 * 3. Easy reset functionality
 * 4. Type-safe with TypeScript generics!
 * 
 * USAGE:
 * ------
 * const { values, handleChange, resetForm } = useForm({
 *   name: '',
 *   price: '',
 *   quantity: ''
 * })
 * 
 * <input name="name" value={values.name} onChange={handleChange} />
 */

// Generic type T allows any shape of form data
function useForm<T extends Record<string, any>>(initialValues: T) {
  
  // ===========================================
  // STEP 1: Single state for ALL form fields
  // ===========================================
  const [values, setValues] = useState<T>(initialValues)

  // ===========================================
  // STEP 2: Generic change handler
  // ===========================================
  // Works with input, select, textarea - anything with name & value
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    
    setValues(prev => ({
      ...prev,        // Keep all other fields
      [name]: value   // Update just this field
    }))
  }

  // ===========================================
  // STEP 3: Reset form to initial values
  // ===========================================
  const resetForm = () => {
    setValues(initialValues)
  }

  // ===========================================
  // STEP 4: Set a single field programmatically
  // ===========================================
  const setField = (name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ===========================================
  // STEP 5: Set all values at once (useful for edit forms)
  // ===========================================
  const setAllValues = (newValues: T) => {
    setValues(newValues)
  }

  // Return everything the component needs
  return {
    values,         // Current form values
    handleChange,   // Attach to onChange
    resetForm,      // Reset to initial
    setField,       // Set one field
    setAllValues,   // Set all fields (for edit mode)
  }
}

export default useForm
