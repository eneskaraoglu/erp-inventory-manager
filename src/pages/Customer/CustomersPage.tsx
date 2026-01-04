import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Customer } from '../../types'
import CustomerCard from '../../components/customer/CustomerCard'

interface CustomersPageProps {
  customers: Customer[]
  onDelete: (id: number) => void
  resetCustomer: () => void
}

function CustomersPage({ customers, onDelete , resetCustomer}: CustomersPageProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Filter customers based on search (by name or code)
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.code.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      {/* Header with title and Add button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
        <Link
          to="/customers/new"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Customer
        </Link>
        <button
          onClick={() => resetCustomer()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset Customer
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name or code..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Customers Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {searchTerm ? 'No customers found' : 'No customers yet. Add your first customer!'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map(customer => (
            <CustomerCard
              adress={customer.address} number={customer.phone} vkno={customer.taxNumber} key={customer.id}
              {...customer}
              onDelete={onDelete}            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomersPage
