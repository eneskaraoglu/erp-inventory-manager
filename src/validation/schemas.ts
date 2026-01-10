import { z } from 'zod'

/**
 * PRODUCT VALIDATION SCHEMA
 * 
 * JAVA COMPARISON:
 * ----------------
 * This is like Bean Validation annotations:
 * 
 * public class ProductDTO {
 *     @NotBlank(message = "Name is required")
 *     @Size(min = 2, max = 100, message = "Name must be 2-100 characters")
 *     private String name;
 *     
 *     @NotNull(message = "Price is required")
 *     @DecimalMin(value = "0.01", message = "Price must be at least 0.01")
 *     private BigDecimal price;
 *     
 *     @NotNull(message = "Quantity is required")
 *     @Min(value = 0, message = "Quantity cannot be negative")
 *     private Integer quantity;
 * }
 * 
 * Zod does the SAME thing but for TypeScript!
 */

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')                    // @NotBlank
    .min(2, 'Name must be at least 2 characters')  // @Size(min=2)
    .max(100, 'Name must be less than 100 characters'), // @Size(max=100)
  
  price: z
    .string()
    .min(1, 'Price is required')
    .refine((val) => !isNaN(Number(val)), 'Price must be a number')
    .refine((val) => Number(val) > 0, 'Price must be greater than 0'),
  
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .refine((val) => !isNaN(Number(val)), 'Quantity must be a number')
    .refine((val) => Number(val) >= 0, 'Quantity cannot be negative')
    .refine((val) => Number.isInteger(Number(val)), 'Quantity must be a whole number'),
})

/**
 * TypeScript type inferred from schema!
 * 
 * This creates:
 * type ProductFormData = {
 *   name: string
 *   price: string
 *   quantity: string
 * }
 */
export type ProductFormData = z.infer<typeof productSchema>

/**
 * CUSTOMER VALIDATION SCHEMA
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
    .email('Invalid email format'),  // Built-in email validation!
  
  phone: z
    .string()
    .min(1, 'Phone is required')
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone format'),
})

export type CustomerFormData = z.infer<typeof customerSchema>
