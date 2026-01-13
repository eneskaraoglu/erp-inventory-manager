import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, ICellRendererParams, RowClickedEvent } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { useCustomers } from '../../context/CustomerContext'
import type { Customer } from '../../types'

// ============================================
// AG Grid v35+ requires module registration
// ============================================
ModuleRegistry.registerModules([AllCommunityModule])

// ============================================
// CONCEPT: AG Grid Column Definitions
// Java Equivalent: TableColumn[] in JTable
// ============================================

function CustomersGridPage() {
  const { customers, loading, error } = useCustomers()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // ============================================
  // CONCEPT: Column Definitions (ColDef)
  // - field: which data property to show
  // - headerName: column header text
  // - sortable: enable sorting
  // - filter: enable filtering
  // - cellRenderer: custom cell content
  // ============================================
  const columnDefs = useMemo<ColDef<Customer>[]>(() => [
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
      field: 'email', 
      headerName: 'Email',
      flex: 1,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'phone', 
      headerName: 'Phone',
      width: 150,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'company', 
      headerName: 'Company',
      flex: 1,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value || 'N/A'
    },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: ActionCellRenderer
    }
  ], [])

  // ============================================
  // CONCEPT: Default Column Settings
  // Applied to all columns unless overridden
  // ============================================
  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
  }), [])

  // ============================================
  // CONCEPT: Quick Filter
  // Filters all columns based on search text
  // ============================================
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers
    const term = searchTerm.toLowerCase()
    return customers.filter(c => 
      c.name.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      (c.company && c.company.toLowerCase().includes(term))
    )
  }, [customers, searchTerm])

  // ============================================
  // CONCEPT: Row Click Handler
  // Navigate to detail page when row clicked
  // ============================================
  const onRowClicked = useCallback((event: RowClickedEvent<Customer>) => {
    // Ignore clicks on buttons (Actions column)
    const target = event.event?.target as HTMLElement
    if (target?.closest('button') || !event.data) return
    navigate(`/customers/${event.data.id}`)
  }, [navigate])

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading customers...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium mb-2">Error loading customers</p>
        <p className="text-red-500 text-sm mb-4">{error}</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Customers (AG Grid)</h1>
        <div className="flex gap-2">
          <Link 
            to="/customers" 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Card View
          </Link>
          <Link 
            to="/customers/new" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add Customer
          </Link>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* AG Grid Table */}
      <div style={{ height: 500, width: '100%' }}>
        <AgGridReact<Customer>
          rowData={filteredCustomers}
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
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>
    </div>
  )
}

// ============================================
// CONCEPT: Custom Cell Renderer
// Java Equivalent: TableCellRenderer
// Renders custom content in a cell
// ============================================
function ActionCellRenderer(props: ICellRendererParams<Customer>) {
  const { deleteCustomer } = useCustomers()
  const navigate = useNavigate()
  const customer = props.data

  if (!customer) return null

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/customers/${customer.id}/edit`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(`Delete ${customer.name}?`)) return
    try {
      await deleteCustomer(customer.id)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  return (
    <div className="flex gap-2 py-1">
      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )
}

export default CustomersGridPage
