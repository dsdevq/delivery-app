import { useEffect } from 'react'
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
    <main className="flex gap-4 pt-4 pb-4">
      <section className="border-solid border-4 rounded-sm border-gray-600 flex-1 basis-1/4">
        {/* Shop list */}
        <h1 className='text-lg'>Selected shop: {item?.name}</h1>
        <ul className="flex flex-col items-center gap-4 text-center py-8 px-2 ">
          {
            data ? data.map((shop) => (
              <li key={shop.id} className="border-solid cursor-pointer py-4 px-2 border-4 border-gray-900 min-w-max w-full transition-all duration-150 hover:text-red-800 hover:scale-95" onClick={
                () => chooseShop(shop.id)
              }>
                {shop.name}
              </li>
            ))
              :
              <p className='text-4xl text-center'> No shops </p>
          }
        </ul>
      </section>
      {/* Items from shop list */}
      <section className="flex-1 border-solid border-2 border-gray-900 basis-2/3">
        <ul className="flex flex-wrap justify-center bg-red-400 p-4 gap-4">
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
