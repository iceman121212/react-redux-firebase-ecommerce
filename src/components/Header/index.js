import React from 'react'
import './styles.scss'
import Logo from './../../assets/logo.png'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/utils'
import { useSelector } from 'react-redux'

const Header = props => {
  const currentUser = useSelector(state => state.user.currentUser)
  console.log('Header component')
  console.log({ currentUser })

  const logOut = () => {
    auth.signOut()
    console.log({ currentUser })
  }

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="SimpleTut LOGO" /></Link>
        </div>
        <div className="callToActions">
          {currentUser && (
            <ul>
              <li>
                <span onClick={logOut}>
                  <li>
                    <Link to="/dashboard">
                      Dashboard
                </Link>
                  </li>
                  <Link to="/">LogOut</Link>

                </span>
              </li>
            </ul>
          )}
          {!currentUser && (
            <ul>
              <li>
                <Link to="/dashboard">
                  Dashboard
                </Link>
              </li>
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
      </div>
    </header>
  )
}

Header.defaultProps = {
  currentUser: null
}

export default Header