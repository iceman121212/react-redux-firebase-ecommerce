import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import OrderDetails from '../../components/OrderDetails'
import { getOrderDetailsStart } from '../../redux/Orders/orders.actions'

const Order = () => {
  const { orderID } = useParams()
  const dispatch = useDispatch()
  const orderDetails = useSelector(state => state.ordersData.orderDetails)
  const { orderTotal } = orderDetails
  console.log({ orderDetails })

  useEffect(() => {
    dispatch(
      getOrderDetailsStart(orderID)
    )
  }, [dispatch, orderID])

  return (
    <div>
      <h1>
        Order ID: {orderID}
      </h1>
      <OrderDetails order={orderDetails} />
      <h3>
        Total: {orderTotal}
      </h3>
    </div>
  )
}

export default Order