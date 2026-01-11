// ============================================
// PRODUCT QUERIES - React Query Hooks
// Replaces useState + useEffect pattern
// ============================================

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productApi } from '../services'
import type { ProductCreate } from '../types'

// ============================================
// QUERY KEYS
// Like cache keys - used to identify & invalidate data
// ============================================
export const productKeys = {
  all: ['products'] as const,
  detail: (id: number) => ['products', id] as const,
}

// ============================================
// useProducts - GET all products
// Replaces: useState + useEffect + loading + error
// ============================================
export function useProductsQuery() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: productApi.getAll,
  })
}

// ============================================
// useProduct - GET single product
// ============================================
export function useProductQuery(id: number) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getById(id),
    enabled: id > 0,  // Only fetch if id is valid
  })
}

// ============================================
// useCreateProduct - POST new product
// ============================================
export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (product: ProductCreate) => productApi.create(product),
    
    // On success, invalidate the products list to refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}

// ============================================
// useUpdateProduct - PUT update product
// ============================================
export function useUpdateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<ProductCreate> }) => 
      productApi.update(id, product),
    
    onSuccess: (_, variables) => {
      // Invalidate both list and detail
      queryClient.invalidateQueries({ queryKey: productKeys.all })
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) })
    },
  })
}

// ============================================
// useDeleteProduct - DELETE product
// ============================================
export function useDeleteProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productApi.delete(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all })
    },
  })
}
