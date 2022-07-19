import React from 'react'

interface ShopItemProp {
  name: string
}

export const ShopItem = ({ name }: ShopItemProp) => {
  return (
    <div> {name}</div>
  )
}
