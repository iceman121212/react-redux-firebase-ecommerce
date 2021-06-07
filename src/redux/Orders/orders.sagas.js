import { takeLatest, call, all, put } from 'redux-saga/effects'
import { auth } from '../../firebase/utils'
import { clearCart } from '../Cart/cart.actions'
import { setOrderDetails, setUserOrderHistory } from './orders.actions'
import { handleGetOrderDetails, handleGetUserOrderHistory, handleSaveOrder } from './orders.helpers'
import orderTypes from './orders.types'

export function* getHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload)
    yield put(
      setUserOrderHistory(history)
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onGetUserOrderHistoryStart() {
  yield takeLatest(orderTypes.GET_USER_ORDER_HISTORY_START, getHistory)
}

export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date()
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps,
    })
    yield put(
      clearCart()
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onSaveOrderHistoryStart() {
  yield takeLatest(orderTypes.SAVE_ORDER_HISTORY_START, saveOrder)
}

export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrderDetails(payload)
    console.log({ order })
    yield put(
      setOrderDetails(order)
    )
  } catch (error) {
    console.log(error)
  }
}

export function* onGetOrderDetailsStart() {
  yield takeLatest(orderTypes.GET_ORDER_DETAILS_START, getOrderDetails)
}

export default function* orderSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
  ])
}