import { all, call } from 'redux-saga/effects'

import userSagas from './User/user.sagas'
import productSagas from './Products/products.sagas'
import orderSagas from './Orders/orders.sagas'

export default function* rootSaga() {
  yield all([
    call(userSagas),
    call(productSagas),
    call(orderSagas),
  ])
}