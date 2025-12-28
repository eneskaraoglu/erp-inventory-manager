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
  return(
  <div>
    <h1>ERP Inventory Manager</h1>
    <input 
      type='text' 
      placeholder='SEARCH Product'
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value) }
    ></input>
    {
      filteredProducts.map(product => (
        <ProductCard
        key={product.id}
        name={product.name}
        price={product.price}
        quantity={product.quantity}
        />
      ))
    }
  </div>
  )
}

export default App
