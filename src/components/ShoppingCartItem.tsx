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
    shop,
  } = useShoppingCart()

  const [product, setProduct] = useState<MenuProps>()


  useEffect(() => {
    // Get selected shop by id
    const neededShop = data.find((shops) => shops.id === shop)
    // Get selected products by id 
    const neededProduct = neededShop?.menu.find((product) => product.id === id)
    // Set product, so it will appear
    setProduct(neededProduct)
  }, [])

  return (
    <>
      {
        product && (
          <li key={id} className="list__item">
            <img className='list__image' src={product.imgUrl} alt='image' />
            <div className="list__details">
              <p className='list__name'>{product.name}</p>
              <p className='list__price'>Price: {product.price}UAH </p>
              <p className='list__quantity'>Quantity: {quantity}</p>
              <button className='list__button' onClick={() => increaseCartQuantity(id)}>Increase</button>
              <button className='list__button' onClick={() => decreaseCartQuantity(id)}>{quantity !== 1 ? 'Decrease' : 'Remove'}</button>
            </div>
          </li>
        )
      }
    </>
  )
}
