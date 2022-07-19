import React, { useEffect, useState } from 'react'
import './Shop.scss'
import data from '../data/items.json'

interface MenuProps {
  id: number,
  name: string,
  imgUrl: string,
  price: string
}

export const Shop = () => {

  const [shop, setShop] = useState(0)
  const [menu, setMenu] = useState<MenuProps[] | undefined>([])

  useEffect(() => {
    const founded = data.find((menu) => menu.id === shop)
    setMenu(founded?.menu)

  }, [shop])

  return (
    <main className="shop">
      <section className="shop__shops shops-items">
        {/* Shop list */}
        <h1>Shops:</h1>
        <ul className="shops-items__list">
          {
            data ? data.map((shop) => (
              <li key={shop.id} className="shops-items__shop" onClick={() => setShop(shop.id)}>
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
            menu ? menu.map((item: MenuProps) => (
              <li key={item.id} className="shop-menu__item">
                <img className='shop-menu__image' src={item.imgUrl} alt="foodImage" />
                <div className='shop-menu__information'>
                  <p className='shop-menu__name'>
                    {item.name}
                  </p>
                  <button className='shop-menu__button'>add to Cart</button>
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
