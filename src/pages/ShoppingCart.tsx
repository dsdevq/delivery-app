import React from 'react'
import './ShoppingCart.scss'
import { Form } from '../components/Form'

export const ShoppingCart = () => {

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <>
      <main className="shopping-cart">
        <section className="shopping-cart__form">
          <Form />
        </section>
        <section className="shopping-cart__list list">
          <ul className="list__menu">
            <li className="list__item">
              <img src="" alt='image' />
              <div className="list__details">
                <p>name</p>
                <p>price: </p>
                <p>quantity</p>
                <button>plus/minus</button>
              </div>
            </li>
          </ul>
        </section>
      </main>
      <div>
        <p>
          Total
        </p>
        <button form='Form' onSubmit={handleOnSubmit} type='submit'>
          Submit
        </button>
      </div>
    </>

  )
}
