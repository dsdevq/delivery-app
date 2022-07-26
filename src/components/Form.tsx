import { useState } from 'react'
import { useShoppingCart } from '../context/DeliveryAppContext'
import data from '../data/items.json'
import './Form.scss'


export const Form = () => {

  const {
    handleOnSubmit
  } = useShoppingCart()

  return (
    <>
      <form onSubmit={handleOnSubmit} id='Form' className='form'>
        <div className='form__item'>
          <label className='label' htmlFor="name">Name:</label>
          <input className='input'
            required
            type="text" id='name' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="email">Email:</label>
          <input className='input'
            required
            type="email" id='email' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="tel">Phone:</label>
          <input className='input'
            required
            type="tel" id='tel' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="address">Address:</label>
          <input className='input'
            required
            type="text" id='address' />
        </div>
      </form>
    </>
  )
}
