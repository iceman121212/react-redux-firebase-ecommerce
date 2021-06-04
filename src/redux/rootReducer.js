import { combineReducers } from "redux";
import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export const rootReducer = combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
})

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData'],
}

export default persistReducer(configStorage, rootReducer)