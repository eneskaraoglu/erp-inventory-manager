import './App.css'
import ProductCard from './components/ProductCard'
import { useState } from 'react'

  const products = [
  { id: 1, name: "Laptop", price: 999.99, quantity: 25 },
  { id: 2, name: "Mouse", price: 29.99, quantity: 150 },
  { id: 3, name: "Keyboard", price: 79.99, quantity: 75 },
  { id: 4, name: "Monitor", price: 349.99, quantity: 40 },
  { id: 5, name: "Webcam", price: 89.99, quantity: 60 },
]

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ) 
  
return (
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        ERP Inventory Manager
      </h1>
      
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
          />
        ))}
      </div>
    </div>
  </div>
)
}

export default App
