import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Customer } from '../../types'

interface CustomerDetailPageProps {
  customers: Customer[]
  onDelete: (id: number) => void
}

function CustomerDetailPage({ customers, onDelete }: CustomerDetailPageProps) {
  const { id } = useParams()
  const navigate = useNavigate()

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

  const handleDelete = () => {
    if (window.confirm(`Delete "${customer.name}"?`)) {
      onDelete(customer.id)
      navigate('/customers')
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
          <span className="text-gray-500">{customer.code}</span>
        </div>

        <div className="p-6 grid grid-cols-2 gap-6">
          <div>
            <div className="text-gray-500 text-sm">Address</div>
            <div className="text-lg">{customer.address}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Phone</div>
            <div className="text-lg">{customer.phone}</div>
          </div>
          <div>
            <div className="text-gray-500 text-sm">Tax Number</div>
            <div className="text-lg">{customer.taxNumber}</div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t flex gap-4">
          <Link to={`/customers/${customer.id}/edit`} className="flex-1 bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600">
            Edit
          </Link>
          <button onClick={handleDelete} className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600">
            Delete
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
