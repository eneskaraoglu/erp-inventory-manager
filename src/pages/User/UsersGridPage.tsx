import { useState, useMemo, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AgGridReact } from 'ag-grid-react'
import type { ColDef, ICellRendererParams, RowClickedEvent } from 'ag-grid-community'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'
import { useUsers } from '../../context/UserContext'
import type { User } from '../../types'

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule])

function UsersGridPage() {
  const { users, loading, error } = useUsers()
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Column Definitions
  const columnDefs = useMemo<ColDef<User>[]>(() => [
    { 
      field: 'id', 
      headerName: 'ID',
      width: 80,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'username', 
      headerName: 'Username',
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
      field: 'full_name', 
      headerName: 'Full Name',
      flex: 1,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value || 'N/A'
    },
    { 
      field: 'role', 
      headerName: 'Role',
      width: 120,
      filter: 'agTextColumnFilter',
      // Custom cell style based on role
      cellStyle: (params): { backgroundColor: string; color: string; fontWeight?: string } | null => {
        switch (params.value) {
          case 'admin': return { backgroundColor: '#fee2e2', color: '#dc2626', fontWeight: 'bold' }
          case 'manager': return { backgroundColor: '#dbeafe', color: '#2563eb', fontWeight: 'bold' }
          default: return { backgroundColor: '#f3f4f6', color: '#4b5563' }
        }
      }
    },
    { 
      field: 'is_active', 
      headerName: 'Status',
      width: 100,
      filter: 'agTextColumnFilter',
      valueFormatter: (params) => params.value ? 'Active' : 'Inactive',
      cellStyle: (params) => ({
        color: params.value ? 'green' : 'red',
        fontWeight: 'bold'
      })
    },
    { 
      field: 'created_at', 
      headerName: 'Created',
      width: 120,
      filter: 'agDateColumnFilter',
      valueFormatter: (params) => {
        if (!params.value) return 'N/A'
        return new Date(params.value).toLocaleDateString()
      }
    },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: 200,
      sortable: false,
      filter: false,
      cellRenderer: UserActionRenderer
    }
  ], [])

  // Default column settings
  const defaultColDef = useMemo<ColDef>(() => ({
    sortable: true,
    resizable: true,
  }), [])

  // Filter users
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users
    const term = searchTerm.toLowerCase()
    return users.filter(u => 
      u.username.toLowerCase().includes(term) ||
      u.email.toLowerCase().includes(term) ||
      (u.full_name && u.full_name.toLowerCase().includes(term)) ||
      u.role.toLowerCase().includes(term)
    )
  }, [users, searchTerm])

  // Row click handler
  const onRowClicked = useCallback((event: RowClickedEvent<User>) => {
    // Ignore clicks on buttons (Actions column)
    const target = event.event?.target as HTMLElement
    if (target?.closest('button') || !event.data) return
    navigate(`/users/${event.data.id}`)
  }, [navigate])

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600 font-medium mb-2">Error loading users</p>
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
        <h1 className="text-3xl font-bold text-gray-800">Users (AG Grid)</h1>
        <div className="flex gap-2">
          <Link 
            to="/users" 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Card View
          </Link>
          <Link 
            to="/users/new" 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            + Add User
          </Link>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by username, email, name or role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* AG Grid Table */}
      <div style={{ height: 500, width: '100%' }}>
        <AgGridReact<User>
          rowData={filteredUsers}
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
        Showing {filteredUsers.length} of {users.length} users
      </div>
    </div>
  )
}

// Custom Action Cell Renderer
function UserActionRenderer(props: ICellRendererParams<User>) {
  const { deleteUser } = useUsers()
  const navigate = useNavigate()
  const user = props.data

  if (!user) return null

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/users/edit/${user.id}`)
  }

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(`Delete ${user.username}?`)) return
    try {
      await deleteUser(user.id)
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

export default UsersGridPage
