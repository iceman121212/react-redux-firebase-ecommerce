import cartTypes from "./cart.types";
import { handleAddToCart, handleDecrementCartItem, handleIncrementCartItem, handleRemoveCartItem } from "./cart.utils";

const INITIAL_STATE = {
  cartItems: [],
}

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload,
        })
      }
    case cartTypes.REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: handleRemoveCartItem({
          prevCartItems: state.cartItems,
          cartItemToRemove: action.payload,
        })
      }
    case cartTypes.INCREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: handleIncrementCartItem({
          prevCartItems: state.cartItems,
          cartItemToIncrement: action.payload,
        })
      }
    case cartTypes.DECREMENT_CART_ITEM:
      return {
        ...state,
        cartItems: handleDecrementCartItem({
          prevCartItems: state.cartItems,
          cartItemToDecrement: action.payload,
        })
      }
    default:
      return state
  }
}

export default cartReducer