import { z } from 'zod'

/**
 * PRODUCT VALIDATION SCHEMA
 * 
 * Aligned with FastAPI backend:
 * - name: str (required, 1-100 chars)
 * - description: Optional[str] (max 500 chars)
 * - price: float (required, > 0)
 * - stock: int (required, >= 0)
 * - category: Optional[str] (max 50 chars)
 */

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional()
    .or(z.literal('')),  // Allow empty string
  
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)), 'Price must be a number')
    .refine((val) => Number(val) > 0, 'Price must be greater than 0'),
  
  stock: z
    .string()
    .min(1, 'Stock is required')
    .refine((val) => !isNaN(Number(val)), 'Stock must be a number')
    .refine((val) => Number(val) >= 0, 'Stock cannot be negative')
    .refine((val) => Number.isInteger(Number(val)), 'Stock must be a whole number'),
  
  category: z
    .string()
    .max(50, 'Category must be less than 50 characters')
    .optional()
    .or(z.literal('')),
})

export type ProductFormData = z.infer<typeof productSchema>

/**
 * CUSTOMER VALIDATION SCHEMA
 * 
 * Aligned with FastAPI backend:
 * - name: str (required, 1-100 chars)
 * - email: EmailStr (required)
 * - phone: Optional[str] (max 20 chars)
 * - address: Optional[str] (max 200 chars)
 * - company: Optional[str] (max 100 chars)
 */

export const customerSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email format'),
  
  phone: z
    .string()
    .max(20, 'Phone must be less than 20 characters')
    .optional()
    .or(z.literal('')),
  
  address: z
    .string()
    .max(200, 'Address must be less than 200 characters')
    .optional()
    .or(z.literal('')),
  
  company: z
    .string()
    .max(100, 'Company must be less than 100 characters')
    .optional()
    .or(z.literal('')),
})

export type CustomerFormData = z.infer<typeof customerSchema>
