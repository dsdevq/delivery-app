import React, { useEffect, useState } from 'react'
import './ShoppingCart.scss'
import { Form } from '../components/Form'

export const ShoppingCart = ({ selectedProducts }: any) => {

  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const variable = products.map((product: any) => product.quantity * +product.price)
    const sum = variable.reduce((prev, curr) => prev + curr, 0)
    setTotal(sum)
  }, [products])

  useEffect(() => {
    setProducts(selectedProducts)
  }, [])


  const onChangeQuantity = (clicked: any) => {
    setProducts(
      selectedProducts.map((item: any) =>
        item.id === clicked.id ? { ...clicked, quantity: clicked.quantity + 1 } : item
      )
    )
  }



  return (
    <>
      <main className="shopping-cart">
        <section className="shopping-cart__form">
          <Form />
        </section>
        <section className="shopping-cart__list list">
          <ul className="list__menu">
            {
              products.length ? products
                .map((item: any) => (
                  <li key={item.id} className="list__item">
                    <img className='list__image' src={item.imgUrl} alt='image' />
                    <div className="list__details">
                      <p className='list__name'>{item.name}</p>
                      <p className='list__price'>price: {item.price} </p>
                      <p className='list__quantity'>quantity: {item.quantity}</p>
                      <button className='list__button' onClick={() => onChangeQuantity(item)}>plus/minus</button>
                    </div>
                  </li>
                ))
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
        <button form='Form' type='submit'>
          Submit
        </button>
      </div>
    </>

  )
}
