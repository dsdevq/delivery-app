import { Order } from '../components/Order'
import { useShoppingCart } from '../context/DeliveryAppContext'
import './Orders.scss'

export const Orders = () => {
  const { orders } = useShoppingCart()
  return (
    <ul className="orders">
      {
        orders.length ? orders.map((order: any) => <Order key={order.id} {...order} />) : <p> No orders yet</p>
      }
    </ul>
  )
}
