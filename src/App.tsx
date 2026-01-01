import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import type { Product, NewProduct } from './types'

// Layout
import Layout from './components/layout/Layout'

// Pages
import Dashboard from './pages/Dashboard'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AddProductPage from './pages/AddProductPage'

// Initial mock data
const initialProducts: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, quantity: 25 },
  { id: 2, name: "Mouse", price: 29.99, quantity: 150 },
  { id: 3, name: "Keyboard", price: 79.99, quantity: 75 },
  { id: 4, name: "Monitor", price: 349.99, quantity: 40 },
  { id: 5, name: "Webcam", price: 89.99, quantity: 5 },
]

function App() {
  // Load products from localStorage or use initial data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products')
    if (saved) {
      return JSON.parse(saved)
    }
    return initialProducts
  })

  // Save to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  // Handler functions
  const handleAddProduct = (product: NewProduct) => {
    const newProduct: Product = {
      ...product,
      id: Date.now()  // Simple ID generation
    }
    setProducts([...products, newProduct])
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    // BrowserRouter enables routing - wraps entire app
    // Like: Application context in Java
    <BrowserRouter>
      <Layout>
        {/* Routes defines the URL → Component mapping */}
        {/* Like: web.xml servlet mappings */}
        <Routes>
          {/* Dashboard - home page */}
          <Route 
            path="/" 
            element={<Dashboard products={products} />} 
          />
          
          {/* Products list */}
          <Route 
            path="/products" 
            element={
              <ProductsPage 
                products={products} 
                onDelete={handleDeleteProduct} 
              />
            } 
          />
          
          {/* Add new product */}
          <Route 
            path="/products/new" 
            element={<AddProductPage onAdd={handleAddProduct} />} 
          />
          
          {/* Product detail - :id is a URL parameter */}
          {/* URL: /products/123 → id = "123" */}
          <Route 
            path="/products/:id" 
            element={
              <ProductDetailPage 
                products={products} 
                onDelete={handleDeleteProduct} 
              />
            } 
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
