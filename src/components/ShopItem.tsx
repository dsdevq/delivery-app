import React from 'react'
import { useShoppingCart } from '../context/DeliveryAppContext'
import { MenuProps } from '../pages/Shop'

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

export const ShopItem = ({ id, name, price, imgUrl }: StoreItemProps) => {

  const {
    getItemQuantity,
    increaseCartQuantity,
    removeFromCart
  } = useShoppingCart()

  const quantity = getItemQuantity(id)
  return (
    <li key={id} className="shop-menu__item">
      <img className='shop-menu__image' src={imgUrl} alt="foodImage" />
      <div className='shop-menu__information'>
        <p className='shop-menu__name'>
          {name}
        </p>
        <p>
          {price}UAH
        </p>
        {
          !quantity
            ?
            <button className='shop-menu__button' onClick={() => increaseCartQuantity(id)}>+ add to Cart</button>
            :
            <button onClick={() => removeFromCart(id)}>Remove</button>
        }
      </div>
    </li>
  )
}
