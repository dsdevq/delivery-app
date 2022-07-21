import React, { useEffect, useState } from 'react'
import './Shop.scss'
import data from '../data/items.json'
import { Products } from '../App'

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
  price: string
}



export const Shop = ({ selectedProducts, setSelectedProducts }: Products) => {

  const [shop, setShop] = useState<ShopProps>()
  const [menu, setMenu] = useState<MenuProps[] | undefined>([])

  const onAdd = (menuItem: MenuProps) => {
    setMenu(prevState => prevState?.filter((item: MenuProps) => item.id !== menuItem.id))
    setSelectedProducts([...selectedProducts, { ...menuItem, quantity: 1 }])
  }

  useEffect(() => {
    setSelectedProducts([])
    // Products that exist
    const founded = data.find((menu) => menu.id === shop?.id)
    // Remove selected products
    const available = founded?.menu.filter((item: any) => item.id !== selectedProducts.find((product: any) => product.id == item.id))
    setMenu(available)

  }, [shop])

  return (
    <main className="shop">
      <section className="shop__shops shops-items">
        {/* Shop list */}
        <h1>Selected shop: {shop?.name}</h1>
        <ul className="shops-items__list">
          {
            data ? data.map((shop) => (
              <li key={shop.id} className="shops-items__shop" onClick={
                () => setShop(shop)
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
            menu?.length ? menu.map((item: MenuProps) => (
              <li key={item.id} className="shop-menu__item">
                <img className='shop-menu__image' src={item.imgUrl} alt="foodImage" />
                <div className='shop-menu__information'>
                  <p className='shop-menu__name'>
                    {item.name}
                  </p>
                  <button className='shop-menu__button' onClick={() => onAdd(item)}>add to Cart</button>
                </div>
              </li>
            ))
              :
              (
                <p className='error'> choose shop</p>
              )
          }
        </ul>
      </section>
    </main>
  )
}
