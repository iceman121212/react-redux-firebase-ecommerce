import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OrderHistory from '../../components/OrderHistory'
import { getUserOrderHistory } from '../../redux/Orders/orders.actions'
import './styles.scss'

const Dashboard = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const orderHistory = useSelector(state => state.ordersData.orderHistory)
  useEffect(() => {
    dispatch(
      getUserOrderHistory(currentUser.id)
    )
  }, [dispatch, currentUser.id])
  return (
    <div>
      <h1>
        Dashboard
      </h1>
      {console.log({ orderHistory })}
      <OrderHistory orders={orderHistory.data} />
    </div>
  )
}

export default Dashboard