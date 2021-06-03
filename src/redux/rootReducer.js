import { combineReducers } from "redux";
import cartReducer from "./Cart/cart.reducer";
import productsReducer from "./Products/products.reducer";
import userReducer from "./User/user.reducer";

export default combineReducers({
  user: userReducer,
  productsData: productsReducer,
  cartData: cartReducer,
})