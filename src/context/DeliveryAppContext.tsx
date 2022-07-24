import React, { createContext, ReactNode, useContext, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
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
  selectedProducts: CartItem[]
}


type CartItem = {
  id: number,
  quantity: number
}

const DeliveryAppContext = createContext({} as DeliveryAppContext)

export function useShoppingCart() {
  return useContext(DeliveryAppContext)
}


export function DeliveryAppProvider({ children }: DeliveryAppProviderProps) {


  const [shop, setShop] = useLocalStorage<number>('delivery-shop', (0))
  const [selectedProducts, setSelectedProducts] = useLocalStorage<CartItem[]>('delivery-app', [])

  const chooseShop = (id: number) => setShop(id)


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
        chooseShop
      }}>
      {children}
    </DeliveryAppContext.Provider>

  )
}