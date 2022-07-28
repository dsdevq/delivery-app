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
          <li key={id} className="list__item">
            <img className='list__image' src={neededProduct.imgUrl} alt='image' />
            <div className="list__details">
              <p className='list__name'>{neededProduct.name}</p>
              <p className='list__price'>Price: {neededProduct.price}UAH </p>
              <p className='list__quantity'>Quantity: {quantity}</p>
              {quantity &&
                <p>Total: {quantity * neededProduct.price}</p>
              }
              <div className="list__buttons">
                <button className='list__button' onClick={() => increaseCartQuantity(id)}>Increase</button>
                <button className='list__button' onClick={() => decreaseCartQuantity(id)}>{quantity !== 1 ? 'Decrease' : 'Remove'}</button>
                <button className='list__button close' onClick={() => removeFromCart(id)}> &times; </button>
              </div>
            </div>
          </li>
        )
      }
    </>
  )
}
