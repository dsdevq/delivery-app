import React, { useEffect, useState } from 'react'
import './Shop.scss'
import data from '../data/items.json'

interface MenuProps {
  id: number,
  name: string,
  imgUrl: string,
  price: string
}

export const Shop = ({ selectedProducts, setSelectedShop, setSelectedProducts }: any) => {

  const [shop, setShop] = useState(0)
  const [menu, setMenu] = useState<MenuProps[] | undefined>([])

  const onAdd = (menuItem: any) => {
    const product = selectedProducts.find((item: any) => item.id === menuItem.id)
    setMenu(prevState => prevState?.filter((item: any) => item.id !== menuItem.id))
    setSelectedProducts([...selectedProducts, { ...menuItem, quantity: 1 }])
  }

  useEffect(() => {
    setSelectedProducts([])

    // Products that exist
    const founded = data.find((menu) => menu.id === shop)
    const available = founded?.menu.filter((item) => item.id !== selectedProducts.find((product: any) => product.id === item.id))
    setMenu(available)

  }, [shop])

  return (
    <main className="shop">
      <section className="shop__shops shops-items">
        {/* Shop list */}
        <h1>Shops:</h1>
        <ul className="shops-items__list">
          {
            data ? data.map((shop) => (
              <li key={shop.id} className="shops-items__shop" onClick={
                () => setShop(shop.id)
                // () => setSelectedShop(shop)
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
