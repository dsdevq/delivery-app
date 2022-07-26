import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useShoppingCart } from '../context/DeliveryAppContext'

export const Navbar = () => {

  const { cartQuantity } = useShoppingCart()

  return (
    <nav className='navbar'>
      <Link className='navbar__item' to='/shop'>SHOP</Link>
      <Link className="navbar__item" to='/shopping-cart'>SHOPPING-CART {cartQuantity ? cartQuantity : ''}</Link>
      <Link className='navbar__item' to='/orders'>ORDERS</Link>
    </nav>
  )
}