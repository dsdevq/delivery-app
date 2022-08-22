import { useEffect, useState } from 'react'
import { useShoppingCart } from '../context/DeliveryAppContext'
import data from '../data/items.json'
import { MenuProps } from '../pages/Shop'

type ShoppingCartItemProps = {
  id: number,
  quantity: number,
}

export const ShoppingCartItem = ({ id, quantity }: ShoppingCartItemProps) => {

  const {
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    shop,
  } = useShoppingCart()

  const [product, setProduct] = useState<MenuProps>()


  useEffect(() => {
    // Get selected shop by id
    // Get selected products by id 
    const neededProduct = neededShop?.menu.find((product) => product.id === id)
    // Set product, so it will appear
    setProduct(neededProduct)
  }, [])
  const neededShop = data.find((shops) => shops.id === shop)
  const neededProduct = neededShop?.menu.find((product) => product.id === id)


  return (
    <>
      {
        neededProduct && (
          <li key={id} className="flex flex-wrap gap-4 relative p-2 rounded-lg bg-red-300 border-2 border-solid border-black justify-center items-center">
            <img className='rounded-lg w-52' src={neededProduct.imgUrl} alt='Product' />
            <div className="flex gap-1 flex-col flex-grow text-xl">
              <p className='font-semibold bg-green-300 self-start border-2 border-solid border-green-600 p-4'>{neededProduct.name}</p>
              <p>Price: {neededProduct.price}UAH </p>
              <p>Quantity: {quantity}</p>
              {quantity &&
                <p>Total: {quantity * neededProduct.price}UAH</p>
              }
              <div className="flex gap-1">
                <button className='text-2xl self-start bg-green-600 text-white' onClick={() => increaseCartQuantity(id)}>Increase</button>
                <button className='text-2xl self-start bg-red-600 text-white' onClick={() => decreaseCartQuantity(id)}>{quantity !== 1 ? 'Decrease' : 'Remove'}</button>
                <button className='text-2xl self-start absolute top-1 right-1' onClick={() => removeFromCart(id)}> &times; </button>
              </div>
            </div>
          </li>
        )
      }
    </>
  )
}
