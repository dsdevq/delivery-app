interface OrderProps {
  products: any
  total: number,
  formData: any,
  createdAt: string
  restaurant: string
}

export const Order = ({ products, total, formData, createdAt, restaurant }: OrderProps) => {
  return (
    <li className="flex gap-1 flex-col p-3 bg-red-400 rounded-xl">
      <article className="font-semibold text-xl">
        <p>
          {formData.address}
        </p>
        <p>
          {formData.tel}
        </p>
      </article>
      <h5 className="text-center text-xl">{restaurant}</h5>
      <ul className="flex gap-2 flex-col flex-grow">
        {
          products.map((product: any) => (
            <li className="p-1 bg-red-600 rounded-md" key={product.id}>
              <p>
                {product.name}
              </p>
              <p>
                {product.price}UAH - x{product.quantity}
              </p>
              <p>
              </p>
            </li>
          ))
        }
      </ul>
      <article>
        <p>
          Summary: {total}UAH
        </p>
        <p>
          {createdAt}
        </p>
      </article>
    </li>
  )
}
