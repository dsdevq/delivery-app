import { useEffect, useState } from 'react'
import './ShoppingCart.scss'
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
  }, [selectedProducts])

  return (
    <>
      <main className="shopping-cart">
        <section className="shopping-cart__form">
          <Form />
        </section>
        <section className="shopping-cart__list list">
          <h1 className='list__title'>Selected shop: {findShop?.name}</h1>
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
      <div className='submit'>
        <p className='submit__total'>
          Total {total}UAH
        </p>
        <button
          className='submit__button'
          disabled={!selectedProducts.length ? true : false}
          form='Form' type='submit'>
          Submit
        </button>
      </div>
    </>

  )
}
