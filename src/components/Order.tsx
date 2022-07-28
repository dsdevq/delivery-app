import './Order.scss'

interface OrderProps {
  products: any
  total: number,
  formData: any,
  createdAt: string
  restaurant: string
}

export const Order = ({ products, total, formData, createdAt, restaurant }: OrderProps) => {
  return (
    <li className="order">
      <article className="order__details">
        <p className="order__address">
          {formData.address}
        </p>
        <p >
          {formData.tel}
        </p>
      </article>
      <h5 className="order__title">{restaurant}</h5>
      <ul className="order__products">
        {
          products.map((product: any) => (
            <li className="order__product" key={product.id}>
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
      <article className="order__summary">
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
