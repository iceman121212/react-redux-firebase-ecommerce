import React from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalValue } from '../../redux/Cart/cart.selectors'
import './styles.scss'
import { createStructuredSelector } from 'reselect'
import Button from '../forms/Button'
import Item from './Item'
import { useHistory } from 'react-router'

const mapState = createStructuredSelector({
  cartItems: selectCartItems
})

const Checkout = ({ }) => {
  const history = useHistory()
  const { cartItems } = useSelector(mapState)
  const totalCartValue = useSelector(state => selectCartTotalValue(state))
  console.log({ cartItems })

  return (
    <div className="checkout">
      <h1>
        CHECKOUT
      </h1>
      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th>
                          Product
                    </th>
                        <th>
                          Description
                    </th>
                        <th>
                          Quantity
                    </th>
                        <th>
                          Price
                    </th>
                        <th>
                          Remove
                    </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <table border="0" cellPadding="0" cellSpacing="0">
                  <tbody>
                    {cartItems.map((item, pos) => {
                      return (
                        <tr key={pos}>
                          <td>
                            <Item {...item} />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </tr>
              <tr>
                <table align="right" border="0" cellPadding="10" cellSpacing="0" >
                  <tr align="right">
                    <td>
                      <h3>
                        Total: ${`${totalCartValue}`}
                      </h3>
                    </td>
                  </tr>
                  <tr>
                    <table table border="0" cellPadding="10" cellSpacing="0">
                      <tbody>
                        <tr>
                          <td>
                            <Button onClick={() => history.goBack()}>
                              Continue Shopping
                          </Button>
                          </td>
                          <td>
                            <Button onClick={() => history.push('/payment')}>
                              Checkout
                          </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </tr>
                </table>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>
            You have no items in your cart
          </p>
        )}

      </div>
    </div >
  )
}


export default Checkout