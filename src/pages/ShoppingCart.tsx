import { useEffect } from 'react'
import { Form } from '../components/Form'
import { useShoppingCart } from '../context/DeliveryAppContext'
import { ShoppingCartItem } from '../components/ShoppingCartItem'
import data from '../data/items.json'


export const ShoppingCart = () => {

  const {
    shop,
    selectedProducts,
    calculateTotal,
    total
  } = useShoppingCart()

  const findShop = data.find((item) => item.id === shop)

  useEffect(() => {
    calculateTotal()
  }, [calculateTotal, selectedProducts])

  return (
    <div className='flex flex-col'>
      <main className="flex flex-wrap py-4 gap-4">
        <section className="border-solid border-black border-2 rounded-2xl flex-1 basis-2/5 min-w-max">
          <Form />
        </section>
        <section className="flex-1 basis-2/5 overflow-auto min-w-max border-black border-solid border-2 rounded-2xl">
          <h1 className='py-4 pl-4'>Selected shop: {findShop?.name}</h1>
          <ul className="flex gap-4 flex-col overflow-auto p-4">
            {
              selectedProducts.length ? selectedProducts
                .map((item) => (
                  <ShoppingCartItem key={item.id} {...item} />
                )
                )
                :
                <p>No products selected yet</p>
            }
          </ul>
        </section>
      </main>
      <div className='flex p-2 self-end rounded-lg bg-red-400 flex-col gap-2'>
        <p className='text-4xl font-semibold'>
          Total {total}UAH
        </p>
        <button
          className='p-2 text-2xl bg-gray-500 text-white'
          disabled={!selectedProducts.length ? true : false}
          form='Form' type='submit'>
          Submit
        </button>
      </div>
    </div>

  )
}
