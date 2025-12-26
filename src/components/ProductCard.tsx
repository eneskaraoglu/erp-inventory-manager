interface ProductCardProps{
    name: string
    price: number
    quantity: number
}


function ProductCard({name, price, quantity}:ProductCardProps){
    return(
        <div>
            <h3>{name}</h3>
            <p>Price: {price}</p>
            <p>Quantity: {quantity}</p>
        </div>
    )
}
export default ProductCard