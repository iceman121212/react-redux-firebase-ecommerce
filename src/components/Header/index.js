import React from 'react'
import './styles.scss'
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'
import { selectCartItemsCount } from '../../redux/Cart/cart.selectors'

const Header = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)
  const totalNumCartItems = useSelector(state => selectCartItemsCount(state))
  // const cartItemCount = useSelector(state => state.cartData.cartItems)
  // .reduce((acc, item) => item.quantity + acc, 0)

  const signOut = () => {
    console.log('signOut function called')
    dispatch(signOutUserStart())
  }
  console.log('Header component')
  console.log({ currentUser })

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="SimpleTut LOGO" /></Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/">
                Home
              </Link>
            </li>
            <li>
              <Link to="/search">
                Search
              </Link>
            </li>
          </ul>
        </nav>

        <div className="callToActions">
          <ul>
            <li>
              <Link to="/cart">
                {`Your Cart (${totalNumCartItems})`}
              </Link>
            </li>

            {currentUser && [
              <li>
                <Link to="/dashboard">
                  My Account
                </Link>
              </li>,
              <span onClick={() => signOut()}>
                <li>
                  <Link to="/">LogOut</Link>
                </li>
              </span>

            ]}

            {!currentUser && [

              <li>
                <Link to="/registration">
                  Register
                </Link>
              </li>,
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
            ]}
          </ul>
        </div>
      </div >
    </header >
  )
}

Header.defaultProps = {
  currentUser: null
}

export default Header