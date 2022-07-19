import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <Link className='navbar__item' to='/shop'>SHOP</Link>
      <Link className="navbar__item" to='/shopping-cart'>SHOPPING-CART</Link>
    </nav>
  )
}