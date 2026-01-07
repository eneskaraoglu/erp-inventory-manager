import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCustomers } from '../../context/CustomerContext'
import { useForm } from '../../hooks'

/**
 * EditProductPage - Edit existing product
 * 
 * KEY LEARNING: Pre-filling forms with existing data
 * 
 * FLOW:
 * 1. Get product ID from URL (/products/edit/123)
 * 2. Find product in context
 * 3. Pre-fill form with product data
 * 4. On submit, update product
 * 
 * JAVA COMPARISON:
 * Like a Swing JDialog that receives an entity to edit:
 * 
 * ProductDialog dialog = new ProductDialog(existingProduct);
 * dialog.setVisible(true);
 */
function EditCustomerPage() {
  const { id } = useParams()  // Get ID from URL
  const navigate = useNavigate()
  const { customers, updateCustomer } = useCustomers()

  // Find the product to edit
  const customer = customers.find(p => p.id === Number(id))

  // Initialize form with empty values (will be filled by useEffect)
  const { values, handleChange, setAllValues } = useForm({
    name: '',
    code: '',
    phone: '',
    address: '',
    taxNumber: ''
  })

  // ✨ KEY CONCEPT: Pre-fill form when product is found
  useEffect(() => {
    if (customer) {
      setAllValues({
        name: customer.name,
        address: customer.address,
        code: customer.code.toString(),
        taxNumber: customer.taxNumber.toString(),
        phone: customer.phone.toString()
      })
    }
  }, [customer])  // Run when product changes

  // Handle case where product doesn't exist
  if (!customer) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-red-600">Costumer Not Found</h1>
        <p className="text-gray-600 mt-2">The customer you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/products')}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!values.name || !values.code || !values.taxNumber || !values.phone) return

    // Update the product
    updateCustomer(customer.id, {
      name: values.name,
      address: values.address,
      code: values.code,
      phone: values.phone,
      taxNumber: parseFloat(values.taxNumber)
    })

    navigate('/customers')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Customer</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Customer Name</label>
          <input 
            type="text" 
            name="name"
            value={values.name} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Customer Code</label>
          <input 
            type="text" 
            step="0.01" 
            name="code"
            value={values.code} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Adress</label>
          <input 
            type="text" 
            name="address"
            value={values.address} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>

        <div className="mb-6">
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
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-medium"
          >
            Save Changes
          </button>
          <button 
            type="button" 
            onClick={() => navigate('/products')} 
            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCustomerPage
