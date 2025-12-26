import './App.css'
import ProductCard from './components/ProductCard'

function App() {
  return(
  <div>
    <h1>ERP Inventory Manager</h1>
    <ProductCard name="Laptıp" price={999.99} quantity={21} />
    <ProductCard name="Mouse" price={4.99} quantity={100} />
    <ProductCard name="Table" price={99.99} quantity={5} />
  </div>
  )
}

export default App
