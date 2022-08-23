import { Order } from '../components/Order'
import { useShoppingCart } from '../context/DeliveryAppContext'

export const Orders = () => {
  const { orders } = useShoppingCart()
  return (
    <ul className="flex p-4 basis-1/5 bg-red-300 gap-4 items-start
    ">
      {
        orders.length ? orders.map((order: any) => <Order key={order.id} {...order} />) : <p> No orders yet</p>
      }
    </ul>

  )
}
