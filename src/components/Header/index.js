import React from 'react'
import './styles.scss'
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signOutUserStart } from '../../redux/User/user.actions'

const Header = props => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

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
          {currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">
                  My Account
                </Link>
              </li>
              <span onClick={() => signOut()}>
                <li>
                  <Link to="/">LogOut</Link>
                </li>
              </span>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/registration">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login">
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div >
    </header >
  )
}

Header.defaultProps = {
  currentUser: null
}

export default Header