import { useShoppingCart } from '../context/DeliveryAppContext'


export const Form = () => {

  const {
    handleOnSubmit
  } = useShoppingCart()

  return (
    <>
      <form onSubmit={handleOnSubmit} id='Form' className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2 max-w-lg px-4 pt-8'>
          <label className='text-lg font-semibold' htmlFor="name">Name:</label>
          <input className='text-center text-sm p-2 border-solid border-black border-2 focus:ring-2 focus:ring-blue-200 focus:outline-none'
            required
            type="text" id='name' />
        </div>
        <div className='flex flex-col gap-2 max-w-lg px-4'>
          <label className='text-lg font-semibold' htmlFor="email">Email:</label>
          <input className='text-center text-sm p-2 border-solid border-black border-2 focus:ring-2 focus:ring-blue-200 focus:outline-none'
            required
            type="email" id='email' />
        </div>
        <div className='flex flex-col gap-2 max-w-lg px-4'>
          <label className='text-lg font-semibold' htmlFor="tel">Phone:</label>
          <input className='text-center text-sm p-2 border-solid border-black border-2 focus:ring-2 focus:ring-blue-200 focus:outline-none'
            required
            type="tel" id='tel' />
        </div>
        <div className='flex flex-col gap-2 max-w-lg px-4 pb-8'>
          <label className='text-lg font-semibold' htmlFor="address">Address:</label>
          <input className='text-center text-sm p-2 border-solid border-black border-2 focus:ring-2 focus:ring-blue-200 focus:outline-none'
            required
            type="text" id='address' />
        </div>
      </form>
    </>
  )
}
