import React, { useEffect, useState } from 'react'
import './ShoppingCart.scss'
import { Form } from '../components/Form'
import { MenuProps } from './Shop'

export const ShoppingCart = ({ selectedProducts, setSelectedProducts }: any) => {

  const [total, setTotal] = useState(0)

  useEffect(() => {
    const variable = selectedProducts.map((product: any) => product?.quantity ? product.quantity * +product.price : 0)
    const sum = variable.reduce((prev: any, curr: any) => prev + curr, 0)
    setTotal(sum)
  }, [selectedProducts])

  const increaseQuantity = (clicked: MenuProps) => {
    setSelectedProducts((selectedProducts: any) => {
      return selectedProducts.map((item: MenuProps) => {
        if (item.id === clicked.id && item.quantity) {
          return { ...item, quantity: item?.quantity + 1 }
        }
        else {
          return item
        }
      })
    })
  }

  const decreaseQuantity = (clicked: MenuProps) => {
    setSelectedProducts((selectedProducts: any) => {
      if (selectedProducts.find((item: MenuProps) => item.id === clicked.id)?.quantity === 1) {
        return selectedProducts.filter((item: MenuProps) => item.id !== clicked.id)
      }
      else {
        return selectedProducts.map((item: MenuProps) => {
          if (item.id === clicked.id && item.quantity) {
            return { ...item, quantity: item?.quantity - 1 }
          }
          else {
            return item
          }
        })
      }
    })
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
              selectedProducts.length ? selectedProducts
                .map((item: MenuProps) => (
                  <li key={item.id} className="list__item">
                    <img className='list__image' src={item.imgUrl} alt='image' />
                    <div className="list__details">
                      <p className='list__name'>{item.name}</p>
                      <p className='list__price'>Price: {item.price}UAH </p>
                      <p className='list__quantity'>Quantity: {item.quantity}</p>
                      <button className='list__button' onClick={() => increaseQuantity(item)}>Increase</button>
                      <button className='list__button' onClick={() => decreaseQuantity(item)}>Decrease</button>
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
