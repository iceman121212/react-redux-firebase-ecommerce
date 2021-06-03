export const existingCartItem = ({
  prevCartItems,
  nextCartItem,
}) => {
  return prevCartItems.find(
    cartItem => cartItem.documentID === nextCartItem.documentID
  )
}

export const handleAddToCart = ({
  prevCartItems,
  nextCartItem,
}) => {
  const quantityIncrement = 1
  const cartItemExists = existingCartItem({
    prevCartItems, nextCartItem,
  })

  if (cartItemExists) {
    return prevCartItems.map(cartItem =>
      cartItem.documentID === nextCartItem.documentID
        ? {
          ...cartItem,
          quantity: cartItem.quantity + quantityIncrement,
        }
        : cartItem
    )
  }

  return [
    ...prevCartItems,
    {
      ...nextCartItem,
      quantity: quantityIncrement,
    }
  ]
}

export const handleRemoveCartItem = ({
  prevCartItems,
  cartItemToRemove,
}) => {
  return prevCartItems.filter((item) => cartItemToRemove.documentID !== item.documentID)
}

export const handleIncrementCartItem = ({
  prevCartItems,
  cartItemToIncrement,
}) => {
  return prevCartItems.map((item) => {
    if (item.documentID === cartItemToIncrement.documentID)
      return {
        ...item,
        quantity: item.quantity + 1,
      }
    return item
  })
}

export const handleDecrementCartItem = ({
  prevCartItems,
  cartItemToDecrement,
}) => {

  const existingCartItem = prevCartItems.find(item => item.documentID === cartItemToDecrement.documentID)

  if (existingCartItem.quantity === 1) {
    return prevCartItems.filter(item => item.documentID !== cartItemToDecrement.documentID)
  }

  return prevCartItems.map((item) => {
    if (item.documentID === cartItemToDecrement.documentID) {
      return {
        ...item,
        quantity: item.quantity - 1,
      }
    }
    return item
  })
}