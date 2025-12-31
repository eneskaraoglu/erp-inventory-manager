interface ProductCardProps {
  id: number
  name: string
  price: number
  quantity: number
  onDelete: (id: number) => void
}

function ProductCard({ id, name, price, quantity, onDelete }: ProductCardProps)  {
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
      <button
        onClick={() => onDelete(id)}
        className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  )
}

export default ProductCard