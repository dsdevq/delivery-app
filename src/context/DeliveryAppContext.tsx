import { createContext, ReactNode, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import data from '../data/items.json'
type DeliveryAppProviderProps = {
  children: ReactNode
}

type DeliveryAppContext = {
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  clearState: () => void
  shop: number
  chooseShop: (id: number) => void
  cartQuantity: number
  selectedProducts: CartItem[],
  calculateTotal: () => void,
  handleOnSubmit: (e: any) => void
  total: number
  orders: any
}


type CartItem = {
  id: number,
  quantity: number
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
const DeliveryAppContext = createContext({} as DeliveryAppContext)

export function useShoppingCart() {
  return useContext(DeliveryAppContext)
}


export function DeliveryAppProvider({ children }: DeliveryAppProviderProps) {


  const [total, setTotal] = useState(0)
  const [shop, setShop] = useLocalStorage<number>('delivery-shop', (0))
  const [selectedProducts, setSelectedProducts] = useLocalStorage<CartItem[]>('delivery-app', [])
  const [orders, setOrders] = useLocalStorage<any[]>('delivery-orders', [])


  const findShop = data.find((item) => item.id === shop)

  const chooseShop = (id: number) => {
    if (selectedProducts.length > 0 && shop !== id) {
      window.confirm('You can order only from 1 restaurant. Confirm change ?') && setShop(id)
    }
    else setShop(id)
  }

  const cartQuantity = selectedProducts.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  // is item ==> item.id === id, then return item.quantity, or 0
  const getItemQuantity = (id: number) => {
    return selectedProducts.find(item => item.id === id)?.quantity || 0
  }

  const increaseCartQuantity = (id: number) => {
    setSelectedProducts(currItems => {
      // If we dont have this item in array
      if (currItems.find(item => item.id === id) == null) {
        // Then we need to add it
        return [...currItems, { id, quantity: 1 }]
      }
      else {
        // If item exists
        return currItems.map((item) => {
          if (item.id === id) {
            // Return old item, but increment quantity
            return { ...item, quantity: item.quantity + 1 }
          }
          else {
            // or just return item
            return item
          }
        })
      }
    })
  }

  const decreaseCartQuantity = (id: number) => {
    setSelectedProducts(currItems => {
      // If item quantity is just 1
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        // Then remove this item by using filter
        return currItems.filter((item) => item.id !== id)
      }
      else {
        // Or if its > 1
        return currItems.map((item) => {
          if (item.id === id) {
            // Return old item, but decrement quantity
            return { ...item, quantity: item.quantity - 1 }
          }
          else {
            // or just return item
            return item
          }
        })
      }
    })
  }

  const removeFromCart = (id: number) => {
    setSelectedProducts(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  const clearState = () => setSelectedProducts([])

  const currentData = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); //Day
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //Month
    const yyyy = today.getFullYear(); // Year
    const hh = today.getHours() < 10 ? "0" + today.getHours() : today.getHours() // Hours
    const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes() // Minutes
    return `${dd}/${mm}/${yyyy} ${hh}:${minutes}`
  }
  const handleOnSubmit = (e: any) => {
    e.preventDefault()
    // Get form data
    const formValues = Object.fromEntries(Array.from(e.target).map((x: any) => ([x.id, x.value])))
    // Remove null properties
    const filtered = Object.fromEntries(Object.entries(formValues).filter(([key]) => key !== ''));
    // Get products
    const needeed = findShop?.menu
    // Get product by id, get it data and filter odd items
    // eslint-disable-next-line array-callback-return
    const final = needeed?.map((product: { id: number }) => {
      const searching = selectedProducts.find((item) => item.id === product.id)?.quantity
      if (searching) {
        return { ...product, quantity: searching }
      }
    }).filter((item) => item !== undefined)
    // Spread product value + form value into another obj
    const obj = { id: Date.now(), createdAt: currentData(), restaurant: findShop?.name, products: final, total: total, formData: filtered }

    new Promise((resolve) => {
      resolve(
        setOrders(
          orders => {
            return [...orders, obj]
          }
        )
      )
    }).then(() => {
      clearState()
      e.target.reset()
    })
  }



  const calculateTotal = () => {
    const variable = selectedProducts.map((product) => {
      const item = findShop?.menu.find((i) => i.id === product.id)
      if (item) {
        return item?.price * product.quantity
      }
      else return 0
    })
    // Sum this array if it has values
    if (variable.length) {
      const sum = variable.reduce((prev, curr) => {
        return prev + curr
      })
      setTotal(sum)
    } else setTotal(0)
  }


  return (
    <DeliveryAppContext.Provider
      value={{
        clearState,
        increaseCartQuantity,
        decreaseCartQuantity,
        getItemQuantity,
        removeFromCart,
        selectedProducts,
        cartQuantity,
        shop,
        chooseShop,
        calculateTotal,
        handleOnSubmit,
        total,
        orders
      }}>
      {children}
    </DeliveryAppContext.Provider>

  )
}