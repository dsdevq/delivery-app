import { useShoppingCart } from '../context/DeliveryAppContext'

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

export const ShopItem = ({ id, name, price, imgUrl }: StoreItemProps) => {

  const {
    getItemQuantity,
    increaseCartQuantity,
    removeFromCart
  } = useShoppingCart()

  const quantity = getItemQuantity(id)

  return (
    <li key={id} className=" flex-1 basis-48 max-w-xs bg-orange-700 border-solid border-2 border-black p-4 rounded-lg">
      <img className='max-w-full aspect-square' src={imgUrl} alt="foodImage" />
      <div className='flex flex-wrap p-1 bg-orange-400 rounded-md flex-grow text-xl font-medium min-h-max whitespace-nowrap gap-2'>
        <p className='self-start'>
          {name}
        </p>
        <p className='underline font-semibold'>
          {price}UAH
        </p>
        {
          !quantity
            ?
            <button className='flex-grow items-end bg-slate-200 text-blue-900' onClick={() => increaseCartQuantity(id)}>+ add</button>
            :
            <button className='flex-grow items-end bg-red-700 text-white font-semibold' onClick={() => removeFromCart(id)}>Remove</button>
        }
      </div>
    </li>
  )
}
