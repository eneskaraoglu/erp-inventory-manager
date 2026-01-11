import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCustomers } from '../../context/CustomerContext'
import { useForm } from '../../hooks'

/**
 * EditCustomerPage - Edit existing customer with API integration
 */
function EditCustomerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { customers, updateCustomer, loading, error: contextError } = useCustomers()
  
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const customer = customers.find(c => c.id === Number(id))

  const { values, handleChange, setAllValues } = useForm({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: ''
  })

  // Pre-fill form when customer is found
  useEffect(() => {
    if (customer) {
      setAllValues({
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        address: customer.address || '',
        company: customer.company || ''
      })
    }
  }, [customer])

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Handle case where customer doesn't exist
  if (!customer) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Customer Not Found</h1>
        <p className="text-gray-600 mt-2">The customer you're looking for doesn't exist.</p>
        <Link 
          to="/customers"
          className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Customers
        </Link>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!values.name || !values.email) return

    try {
      setSubmitting(true)
      setSubmitError(null)

      await updateCustomer(customer.id, {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        address: values.address || undefined,
        company: values.company || undefined
      })

      navigate('/customers')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to update customer')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Customer</h1>

      {/* Error Message */}
      {(submitError || contextError) && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {submitError || contextError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Customer Name <span className="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            name="name"
            value={values.name} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input 
            type="email" 
            name="email"
            value={values.email} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input 
            type="text" 
            name="phone"
            value={values.phone} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea 
            name="address"
            value={values.address} 
            onChange={handleChange}
            disabled={submitting}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        {/* Company */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input 
            type="text" 
            name="company"
            value={values.company} 
            onChange={handleChange}
            disabled={submitting}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" 
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={submitting}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium disabled:opacity-50"
          >
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/customers')}
            disabled={submitting}
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCustomerPage
