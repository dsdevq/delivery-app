import React from 'react'
import './Form.scss'

export const Form = () => {

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    const data = [(e.target)].map((target: any) => target)
    console.log(data)
    console.log(e.target)
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} id='Form' className='form'>
        <div className='form__item'>
          <label className='label' htmlFor="name">Name:</label>
          <input className='input' type="text" id='name' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="email">Email:</label>
          <input className='input' type="email" id='email' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="tel">Phone:</label>
          <input className='input' type="tel" id='tel' />
        </div>
        <div className='form__item'>
          <label className='label' htmlFor="address">Address:</label>
          <input className='input' type="text" id='address' />
        </div>
      </form>
    </>
  )
}
