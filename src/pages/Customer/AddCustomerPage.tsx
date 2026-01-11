import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers } from '../../context/CustomerContext'
import { useFormWithValidation } from '../../hooks'
import { customerSchema, type CustomerFormData } from '../../validation/schemas'

/**
 * AddCustomerPage - WITH API INTEGRATION & VALIDATION
 */
function AddCustomerPage() {
  const navigate = useNavigate()
  const { addCustomer, error: contextError } = useCustomers()
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    values,
    handleChange,
    handleBlur,
    validate,
    getError,
  } = useFormWithValidation<CustomerFormData>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      company: ''
    },
    schema: customerSchema,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validate()) return

    try {
      setSubmitting(true)
      setSubmitError(null)

      await addCustomer({
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        address: values.address || undefined,
        company: values.company || undefined
      })

      navigate('/customers')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to add customer')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Customer</h1>

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
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('name') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
          />
          {getError('name') && (
            <p className="text-red-500 text-sm mt-1">{getError('name')}</p>
          )}
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
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('email') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
          />
          {getError('email') && (
            <p className="text-red-500 text-sm mt-1">{getError('email')}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input 
            type="text" 
            name="phone"
            value={values.phone} 
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('phone') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
          />
          {getError('phone') && (
            <p className="text-red-500 text-sm mt-1">{getError('phone')}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Address</label>
          <textarea 
            name="address"
            value={values.address} 
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            rows={2}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('address') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
          />
          {getError('address') && (
            <p className="text-red-500 text-sm mt-1">{getError('address')}</p>
          )}
        </div>

        {/* Company */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input 
            type="text" 
            name="company"
            value={values.company} 
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={submitting}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('company') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100`}
          />
          {getError('company') && (
            <p className="text-red-500 text-sm mt-1">{getError('company')}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium disabled:opacity-50"
          >
            {submitting ? 'Adding...' : 'Add Customer'}
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

export default AddCustomerPage
