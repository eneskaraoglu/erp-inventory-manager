import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, ICellRendererParams, RowClickedEvent } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { useProductsQuery, useDeleteProduct } from '../hooks/useProductQueries'
import type { Product } from '../types'
import { useCartStore } from '../stores'

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])

function ProductsGridPage() {
  const { data: products = [], isLoading, error } = useProductsQuery()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Column Definitions
  const columnDefs = useMemo<ColDef<Product>[]>(() => [
    { 
      field: 'id', 
      headerName: 'ID',
      width: 80,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'name', 
      headerName: 'Name',
      flex: 1,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'category', 
      headerName: 'Category',
      width: 150,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value || 'N/A'
    },
    { 
      field: 'price', 
      headerName: 'Price',
      width: 120,
      filter: 'agNumberColumnFilter',
      valueFormatter: (params) => `$${params.value?.toFixed(2) || '0.00'}`
    },
    { 
      field: 'stock', 
      headerName: 'Stock',
      width: 100,
      filter: 'agNumberColumnFilter',
      // Color based on stock level
      cellStyle: (params): { color: string; fontWeight?: string } | null => {
        if (params.value <= 0) return { color: 'red', fontWeight: 'bold' }
        if (params.value < 10) return { color: 'orange' }
        return { color: 'green' }
      }
    },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: 280,
      sortable: false,
      filter: false,
      cellRenderer: ProductActionRenderer
    }
  ], [])

  // Default column settings
  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
  }), [])

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products
    const term = searchTerm.toLowerCase()
    return products.filter(p => 
      p.name.toLowerCase().includes(term) ||
      (p.category && p.category.toLowerCase().includes(term))
    )
  }, [products, searchTerm])

  // Row click handler
  const onRowClicked = useCallback((event: RowClickedEvent<Product>) => {
    // Ignore clicks on buttons (Actions column)
    const target = event.event?.target as HTMLElement
    if (target?.closest('button') || !event.data) return
    navigate(`/products/${event.data.id}`)
  }, [navigate])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium mb-2">Error loading products</p>
        <p className="text-red-500 text-sm mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products (AG Grid)</h1>
        <div className="flex gap-2">
          <Link 
            to="/products" 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Card View
          </Link>
          <Link 
            to="/products/new" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Product
          </Link>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* AG Grid Table */}
      <div style={{ height: 500, width: '100%' }}>
        <AgGridReact<Product>
          rowData={filteredProducts}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onRowClicked={onRowClicked}
          rowSelection="single"
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
        />
      </div>

      {/* Stats */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredProducts.length} of {products.length} products
      </div>
    </div>
  )
}

// Custom Action Cell Renderer
function ProductActionRenderer(props: ICellRendererParams<Product>) {
  const deleteProduct = useDeleteProduct()
  const addItem = useCartStore((state) => state.addItem)
  const navigate = useNavigate()
  const product = props.data

  if (!product) return null

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/products/edit/${product.id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(`Delete ${product.name}?`)) return
    try {
      await deleteProduct.mutateAsync(product.id)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price
    })
  }

  return (
    <div className="flex gap-2 py-1">
      <button
        onClick={handleAddToCart}
        className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600"
        disabled={product.stock <= 0}
      >
        🛒 Add
      </button>
      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )
}

export default ProductsGridPage
