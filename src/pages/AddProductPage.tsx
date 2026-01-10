import { useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductContext'
import { useFormWithValidation } from '../hooks'
import { productSchema, type ProductFormData } from '../validation/schemas'

/**
 * AddProductPage - WITH ZOD VALIDATION! ✨
 * 
 * JAVA COMPARISON:
 * ----------------
 * Like a JSF form with validation messages:
 * 
 * <h:inputText value="#{bean.name}" required="true">
 *     <f:validateLength minimum="2" maximum="100"/>
 * </h:inputText>
 * <h:message for="name" styleClass="error"/>
 * 
 * Now we have:
 * - Real-time validation as you type
 * - Error messages per field
 * - Submit blocked until valid
 */
function AddProductPage() {
  const navigate = useNavigate()
  const { addProduct } = useProducts()

  // ✨ Form with validation!
  const {
    values,
    handleChange,
    handleBlur,
    validate,
    getError,
    resetForm,
  } = useFormWithValidation<ProductFormData>({
    initialValues: {
      name: '',
      price: '',
      quantity: '',
    },
    schema: productSchema,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // ✨ Validate before submit
    if (!validate()) {
      return // Stop if validation fails
    }

    // Add product (convert strings to numbers)
    addProduct({
      name: values.name,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity),
    })

    // Navigate back
    navigate('/products')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        
        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}  // ✨ Validate on blur
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('name') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }`}
            placeholder="Enter product name"
          />
          {/* ✨ Error message */}
          {getError('name') && (
            <p className="text-red-500 text-sm mt-1">{getError('name')}</p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Price ($) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('price') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }`}
            placeholder="Enter price (e.g., 29.99)"
          />
          {getError('price') && (
            <p className="text-red-500 text-sm mt-1">{getError('price')}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="quantity"
            value={values.quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 
              ${getError('quantity') 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
              }`}
            placeholder="Enter quantity"
          />
          {getError('quantity') && (
            <p className="text-red-500 text-sm mt-1">{getError('quantity')}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-medium"
          >
            Add Product
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

      {/* Debug Info */}
      <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
        <p className="font-semibold mb-2">🎓 What's Happening:</p>
        <ul className="space-y-1 text-gray-600">
          <li>• Zod validates each field against schema</li>
          <li>• Errors show after you leave field (onBlur)</li>
          <li>• Red border indicates validation error</li>
          <li>• Submit button validates all fields</li>
        </ul>
      </div>
    </div>
  )
}

export default AddProductPage
