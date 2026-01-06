import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../context/CustomerContext'
import { useForm } from '../../hooks'  // ✨ Our new custom hook!

/**
 * AddCustomerPage - Refactored with useForm hook
 * 
 * BEFORE: 5 separate useState calls 😫
 * AFTER:  1 useForm call 😎
 */
function AddCustomerPage() {
  const navigate = useNavigate()
  const { addCustomer } = useCustomers()

  // ✨ ONE hook handles ALL 5 form fields!
  const { values, handleChange, resetForm } = useForm({
    name: '',
    code: '',
    address: '',
    phone: '',
    taxNumber: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.name || !values.code) return

    addCustomer({
      name: values.name,
      code: values.code,
      address: values.address,
      phone: values.phone,
      taxNumber: parseInt(values.taxNumber) || 0
    })

    navigate('/customers')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Customer</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Customer Name *</label>
          <input 
            type="text" 
            name="name"
            value={values.name} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Code *</label>
          <input 
            type="text" 
            name="code"
            value={values.code} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <input 
            type="text" 
            name="address"
            value={values.address} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input 
            type="text" 
            name="phone"
            value={values.phone} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Tax Number</label>
          <input 
            type="number" 
            name="taxNumber"
            value={values.taxNumber} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
          >
            Add Customer
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/customers')} 
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCustomerPage
