import { useState } from 'react'

interface AddProductFormProps {
  onAdd: (product: { name: string; price: number; quantity: number }) => void
}

function AddProductForm({ onAdd }: AddProductFormProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  const handleSubmit = () => {
    if (!name || !price || !quantity) return
    
    onAdd({
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    })
    
    // Clear form
    setName('')
    setPrice('')
    setQuantity('')
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>
      <div className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 rounded w-24"
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-20"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default AddProductForm