import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCustomers } from '../../context/CustomerContext'
import CustomerCard from '../../components/customer/CustomerCard'

function CustomersPage() {
  const { customers, loading, error, deleteCustomer } = useCustomers()
  const [searchTerm, setSearchTerm] = useState('')
  const [deleting, setDeleting] = useState<number | null>(null)

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this customer?')) return
    
    try {
      setDeleting(id)
      await deleteCustomer(id)
    } catch (err) {
      console.error('Delete failed:', err)
    } finally {
      setDeleting(null)
    }
  }

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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <div className="flex gap-2">
          <Link to="/customers/grid" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            📊 Grid View
          </Link>
          <Link to="/customers/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            + Add Customer
          </Link>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by name, email or company..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'No customers found' : 'No customers yet. Add your first customer!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map(customer => (
            <CustomerCard 
              key={customer.id} 
              {...customer} 
              onDelete={handleDelete}
              isDeleting={deleting === customer.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomersPage
