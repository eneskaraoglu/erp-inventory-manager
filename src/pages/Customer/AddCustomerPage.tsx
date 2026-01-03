import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NewCustomer } from '../../types'

interface AddCustomerPageProps {
  onAdd: (customer: NewCustomer) => void
}

function AddCustomerPage({ onAdd }: AddCustomerPageProps) {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [taxNumber, setTaxNumber] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !code) return

    onAdd({
      name,
      code,
      address,
      phone,
      taxNumber: parseInt(taxNumber) || 0
    })

    navigate('/customers')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Customer</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Customer Name *</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Code *</label>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Tax Number</label>
          <input type="number" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium">
            Add Customer
          </button>
          <button type="button" onClick={() => navigate('/customers')} className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomerPage
