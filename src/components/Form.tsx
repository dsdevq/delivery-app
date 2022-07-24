import React from 'react'
import { useShoppingCart } from '../context/DeliveryAppContext'
import './Form.scss'

export const Form = () => {

  const {
    shop,
    selectedProducts
  } = useShoppingCart()

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    // Get form data
    const data = Object.fromEntries(Array.from(e.target).map((x: any) => ([x.id, x.value])))
    // Remove null properties
    const filtered = Object.fromEntries(Object.entries(data).filter(([key]) => key !== ''));
    // console.log(filtered)
    // console.log(selectedProducts)

  }

  return (
    <>
      <form onSubmit={handleOnSubmit} id='Form' className='form'>
        <div className='form__item'>
          <label className='label' htmlFor="name">Name:</label>
          <input className='input'
            // required 
            type="text" id='name' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="email">Email:</label>
          <input className='input'
            // required 
            type="email" id='email' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="tel">Phone:</label>
          <input className='input'
            // required 
            type="tel" id='tel' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="address">Address:</label>
          <input className='input'
            // required 
            type="text" id='address' />
        </div>
      </form>
    </>
  )
}
