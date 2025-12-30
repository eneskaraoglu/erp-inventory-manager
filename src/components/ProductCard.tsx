interface ProductCardProps {
  name: string
  price: number
  quantity: number
}

function ProductCard({ name, price, quantity }: ProductCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-gray-600 mt-2">Price: ${price.toFixed(2)}</p>
      <p className="text-gray-600">
        Quantity: 
        <span className={quantity < 50 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
          {" "}{quantity}
        </span>
      </p>
    </div>
  )
}

export default ProductCard