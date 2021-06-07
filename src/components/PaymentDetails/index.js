import React, { useState, useEffect } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import './styles.scss'
import { apiInstance } from '../../Utils'
import { selectCartItems, selectCartItemsCount, selectCartTotal } from '../../redux/Cart/cart.selectors'
import { createStructuredSelector } from 'reselect'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/Cart/cart.actions'
import { useHistory } from 'react-router'
import { saveOrderHistory } from '../../redux/Orders/orders.actions'


const initialAddressState = {
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '',
}
const mapState = createStructuredSelector({
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
  cartItems: selectCartItems,
});
const PaymentDetails = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const stripe = useStripe()
  const { total, itemCount, cartItems } = useSelector(mapState);
  const elements = useElements()
  const [billingAddress, setBillingAddress] = useState({ ...initialAddressState })
  const [shippingAddress, setShippingAddress] = useState({ ...initialAddressState })
  const [recipientName, setRecipientName] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')

  useEffect(() => {
    if (itemCount < 1) {
      history.push('/dashboard')
    }
  }, [history, itemCount])

  const handleShipping = event => {
    const { name, value } = event.target
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    })
  }
  const handleBilling = event => {
    const { name, value } = event.target
    setBillingAddress({
      ...billingAddress,
      [name]: value,
    })
  }

  const handleFormSubmit = async event => {
    event.preventDefault()
    console.log('Pay now clicked')
    const cardElement = elements.getElement('card')
    if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postal_code || !shippingAddress.country)
      return

    if (!billingAddress.line1 || !billingAddress.city || !billingAddress.state || !billingAddress.postal_code || !billingAddress.country)
      return

    if (!recipientName || !nameOnCard)
      return
    console.log({ total })
    apiInstance.post('/payments/create', {
      amount: total * 100,
      shipping: {
        name: recipientName,
        address: {
          ...shippingAddress
        }
      }
    }).then(({ data: clientSecret }) => {
      console.log('reached first then')
      stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: nameOnCard,
          address: {
            ...billingAddress
          }
        }
      }).then(({ paymentMethod }) => {

        stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id
        })
          .then(({ paymentIntent }) => {
            dispatch(
              clearCart()
            )
            const configOrder = {
              orderTotal: total,
              orderItems: cartItems.map(item => {
                const { documentID, productThumbnail, productName,
                  productPrice, quantity } = item;

                return {
                  documentID,
                  productThumbnail,
                  productName,
                  productPrice,
                  quantity
                };
              })
            }
            dispatch(
              saveOrderHistory(configOrder)
            );
          });

      })


    });
  }

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '16px'
      }
    },
    hidePostalCode: true,
  }

  return (
    <div className="paymentDetails">
      <form onSubmit={handleFormSubmit}>
        <div className="group">
          <h2>
            Shipping Address
          </h2>
          <FormInput
            required
            type="text"
            placeholder="Recipient Name"
            name="recipientName"
            value={recipientName}
            handleChange={(event) => setRecipientName(event.target.value)}
          />
          <FormInput
            required
            type="text"
            placeholder="Line 1"
            name="line1"
            value={shippingAddress.line1}
            handleChange={(event) => handleShipping(event)}
          />
          <FormInput
            type="text"
            name="line2"
            placeholder="Line 2"
            value={shippingAddress.line2}
            handleChange={(event) => handleShipping(event)}
          />
          <FormInput
            required
            type="text"
            name="city"
            placeholder="City"
            value={shippingAddress.city}
            handleChange={(event) => handleShipping(event)}
          />
          <FormInput
            required
            type="text"
            name="state"
            placeholder="State"
            value={shippingAddress.state}
            handleChange={(event) => handleShipping(event)}
          />
          <FormInput
            required
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={shippingAddress.postal_code}
            handleChange={(event) => handleShipping(event)}
          />

          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              value={shippingAddress.country}
              onChange={(value) => handleShipping({
                target: {
                  name: 'country',
                  value: value,
                }
              })}
            />
          </div>
        </div>
        <div className="group">
          <h2>
            Billing Address
          </h2>
          <FormInput
            required
            type="text"
            name="nameOnCard"
            placeholder="Name on Card"
            value={nameOnCard}
            handleChange={(event) => setNameOnCard(event.target.value)}
          />
          <FormInput
            required
            type="text"
            name="line1"
            placeholder="Line 1"
            value={billingAddress.line1}
            handleChange={(event) => handleBilling(event)}
          />
          <FormInput
            type="text"
            name="line2"
            placeholder="Line 2"
            value={billingAddress.line2}
            handleChange={(event) => handleBilling(event)}
          />
          <FormInput
            required
            type="text"
            name="city"
            placeholder="City"
            value={billingAddress.city}
            handleChange={(event) => handleBilling(event)}
          />
          <FormInput
            required
            type="text"
            name="state"
            placeholder="State"
            value={billingAddress.state}
            handleChange={(event) => handleBilling(event)}
          />
          <FormInput
            required
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={billingAddress.postal_code}
            handleChange={(event) => handleBilling(event)}
          />
          <div className="formRow checkoutInput">
            <CountryDropdown
              required
              valueType="short"
              value={billingAddress.country}
              onChange={(value) => handleBilling({
                target: {
                  name: 'country',
                  value: value,
                }
              })}
            />
          </div>
        </div>
        <div className="group">
          <h2>
            Card Details
          </h2>
          <CardElement
            options={configCardElement} />
        </div>
        <Button type="submit">
          Pay Now
        </Button>
      </form>

    </div>
  )
}

export default PaymentDetails