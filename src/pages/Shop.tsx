import React, { useEffect, useRef } from 'react'
import './Shop.scss'
import data from '../data/items.json'
import { ShopItem } from '../components/ShopItem'
import { useShoppingCart } from '../context/DeliveryAppContext'

export interface ShopProps {
  id: number,
  name: string,
  menu: MenuProps[],
}

export interface MenuProps {
  id: number,
  name: string,
  quantity?: number,
  imgUrl: string,
  price: number
}

export const Shop = () => {

  const {
    clearState,
    shop,
    chooseShop
  } = useShoppingCart()


  const item = data.find((item) => item.id === shop)

  useEffect(() => {
    clearState()
  }, [shop])

  return (
    <main className="shop">
      <section className="shop__shops shops-items">
        {/* Shop list */}
        <h1>Selected shop: {item?.name}</h1>
        <ul className="shops-items__list">
          {
            data ? data.map((shop) => (
              <li key={shop.id} className="shops-items__shop" onClick={
                () => chooseShop(shop.id)
              }>
                {shop.name}
              </li>
            ))
              :
              <p className='error'> No shops </p>
          }
        </ul>
      </section>
      {/* Items from shop list */}
      <section className="shop__items shop-menu">
        <ul className="shop-menu__list">
          {
            item?.menu.length ? item?.menu.map((item: MenuProps) => (
              <ShopItem key={item.id} {...item} />
            ))
              :
              (
                <p className='error'> Choose shop</p>
              )
          }
        </ul>
      </section>
    </main>
  )
}
