import { useEffect, useState } from 'react'
import './ShoppingCart.scss'
import { Form } from '../components/Form'
import { useShoppingCart } from '../context/DeliveryAppContext'
import { ShoppingCartItem } from '../components/ShoppingCartItem'
import data from '../data/items.json'


export const ShoppingCart = () => {

  const {
    shop,
    selectedProducts
  } = useShoppingCart()

  const [total, setTotal] = useState(0)

  const neededShop = data.find((item) => item.id === shop)
  useEffect(() => {
    // ! FIX
    const neededShop = data.find((item) => item.id === shop)
    // Getting array with total price for each product
    const variable = selectedProducts.map((product) => {
      const item = neededShop?.menu.find((i) => i.id === product.id)
      if (item?.price) {
        return item?.price * product.quantity
      }
      else return 0
    })

    // Sum this array
    if (variable.length) {
      const sum = variable.reduce((prev, curr) => {
        if (prev && curr) {
          return prev + curr
        }
        else return 0
      })
      setTotal(sum)
      // !!!!!!!!!!!!!!!!!!!!!
    } else setTotal(0)


  }, [selectedProducts])

  return (
    <>
      <main className="shopping-cart">
        <section className="shopping-cart__form">
          <Form total={total} />
        </section>
        <section className="shopping-cart__list list">
          <h1 className='list__title'>Selected shop: {neededShop?.name}</h1>
          <ul className="list__menu">
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
      <div>
        <p>
          Total {total}
        </p>
        <button
          // disabled={!selectedProducts.length ? true : false} 
          form='Form' type='submit'>
          Submit
        </button>
      </div>
    </>

  )
}
