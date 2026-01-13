import { useState, type ChangeEvent } from 'react'
import { z } from 'zod'

/**
 * useFormWithValidation - Form hook with Zod validation
 * 
 * JAVA COMPARISON:
 * ----------------
 * Like a Spring @Valid controller with BindingResult:
 * 
 * @PostMapping("/products")
 * public ResponseEntity create(
 *     @Valid @RequestBody ProductDTO product,
 *     BindingResult result  // Contains validation errors
 * ) {
 *     if (result.hasErrors()) {
 *         return ResponseEntity.badRequest().body(result.getAllErrors());
 *     }
 *     // ... save product
 * }
 * 
 * This hook provides:
 * - values (form data)
 * - errors (validation errors, like BindingResult)
 * - handleChange (updates values)
 * - validate (runs validation)
 * - isValid (quick check)
 */

interface UseFormWithValidationOptions<T> {
  initialValues: T
  schema: z.ZodSchema<T>
}

function useFormWithValidation<T extends Record<string, any>>({
  initialValues,
  schema,
}: UseFormWithValidationOptions<T>) {
  
  // Form values
  const [values, setValues] = useState<T>(initialValues)
  
  // Validation errors (field name -> error message)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  
  // Has the form been touched/submitted?
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    
    setValues(prev => ({
      ...prev,
      [name]: value,
    }))
    
    // Mark field as touched
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof T]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  // Validate single field
  const validateField = (name: keyof T): boolean => {
    try {
      // Create partial schema for single field
      const fieldSchema = z.object({ [name]: (schema as any).shape[name] })
      fieldSchema.parse({ [name]: values[name] })
      
      setErrors(prev => ({ ...prev, [name]: undefined }))
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.issues[0]?.message
        setErrors(prev => ({ ...prev, [name]: fieldError }))
      }
      return false
    }
  }

  // Validate all fields
  const validate = (): boolean => {
    try {
      schema.parse(values)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof T, string>> = {}
        
        error.issues.forEach((err) => {
          const field = err.path[0] as keyof T
          if (!newErrors[field]) {
            newErrors[field] = err.message
          }
        })
        
        setErrors(newErrors)
      }
      return false
    }
  }

  // Handle blur (validate on blur)
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    validateField(name as keyof T)
  }

  // Reset form
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  // Set all values (for edit mode)
  const setAllValues = (newValues: T) => {
    setValues(newValues)
    setErrors({})
  }

  // Check if form is valid (without setting errors)
  const isValid = (): boolean => {
    try {
      schema.parse(values)
      return true
    } catch {
      return false
    }
  }

  // Get error for field (only if touched)
  const getError = (name: keyof T): string | undefined => {
    return touched[name] ? errors[name] : undefined
  }

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    validateField,
    resetForm,
    setAllValues,
    isValid,
    getError,
  }
}

export default useFormWithValidation
