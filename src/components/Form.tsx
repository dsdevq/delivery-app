import { useState } from 'react'
import { useShoppingCart } from '../context/DeliveryAppContext'
import data from '../data/items.json'
import './Form.scss'

type TotalProp = {
  total: number
}

export const Form = ({ total }: TotalProp) => {

  const {
    shop,
    selectedProducts
  } = useShoppingCart()

  const [order, setOrder] = useState({})

  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    // Get form data
    const formValues = Object.fromEntries(Array.from(e.target).map((x: any) => ([x.id, x.value])))
    // Remove null properties
    const filtered = Object.fromEntries(Object.entries(formValues).filter(([key]) => key !== ''));


    // Get products
    const needeed = data.find((item) => item.id === shop)?.menu
    // Get product by id, get it data and filter odd items
    const final = needeed?.map((product: { id: number }) => {
      const searching = selectedProducts.find((item) => item.id === product.id)?.quantity
      if (searching) {
        return { ...product, quantity: searching }
      }
    }).filter((item) => item !== undefined)
    // Spread product value + form value into another obj
    setOrder({ products: { ...[final] }, total, formData: { ...filtered } })
  }

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
      {
        order && (
          <p className='order'> Order : {JSON.stringify(order)}</p>
        )
      }
    </>
  )
}
