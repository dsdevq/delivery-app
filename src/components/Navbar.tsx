import { Link } from 'react-router-dom'
import { useShoppingCart } from '../context/DeliveryAppContext'

export const Navbar = () => {

  const { cartQuantity } = useShoppingCart()

  return (
    <nav className='navbar flex bg-slate-300 items-center gap-2 py-4 px-2'>
      <Link className='text-2xl text-gray-800 font-semibold' to='/shop'>SHOP</Link>
      <Link className="text-2xl text-gray-800 font-semibold" to='/shopping-cart'>SHOPPING-CART {cartQuantity ? cartQuantity : ''}</Link>
      <Link className='text-2xl text-gray-800 font-semibold' to='/orders'>ORDERS</Link>
    </nav>
  )
}