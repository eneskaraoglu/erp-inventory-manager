import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCustomers } from '../../context/CustomerContext'

function CustomerDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { customers, deleteCustomer, loading, error } = useCustomers()
  const [deleting, setDeleting] = useState(false)

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/customers" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Customers
        </Link>
      </div>
    )
  }

  const customer = customers.find(c => c.id === Number(id))

  if (!customer) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Customer Not Found</h1>
        <Link to="/customers" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Customers
        </Link>
      </div>
    )
  }

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${customer.name}"?`)) return
    
    try {
      setDeleting(true)
      await deleteCustomer(customer.id)
      navigate('/customers')
    } catch (err) {
      console.error('Delete failed:', err)
      setDeleting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/customers" className="hover:text-blue-500">Customers</Link>
        <span className="mx-2">/</span>
        <span>{customer.name}</span>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gray-50 p-6 border-b">
          <h1 className="text-3xl font-bold text-gray-800">{customer.name}</h1>
          {customer.company && (
            <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded mt-2">
              {customer.company}
            </span>
          )}
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-500 text-sm">Email</div>
            <div className="text-lg">{customer.email}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Phone</div>
            <div className="text-lg">{customer.phone || '-'}</div>
          </div>
          <div className="col-span-2">
            <div className="text-gray-500 text-sm">Address</div>
            <div className="text-lg">{customer.address || '-'}</div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t flex gap-4">
          <Link 
            to={`/customers/edit/${customer.id}`} 
            className="flex-1 bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600"
          >
            Edit
          </Link>
          <button 
            onClick={handleDelete} 
            disabled={deleting}
            className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 disabled:opacity-50"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
          <Link to="/customers" className="flex-1 bg-gray-300 text-gray-700 py-2 rounded text-center hover:bg-gray-400">
            Back
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CustomerDetailPage
