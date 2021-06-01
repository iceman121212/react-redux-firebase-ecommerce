import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { signUpUserStart } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'

import './styles.scss'

const initialState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: []
}

const Signup = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [state, setState] = useState({
    ...initialState
  })
  const currentUser = useSelector(state => state.user.currentUser)
  const userErr = useSelector(state => state.user.userErr)

  useEffect(() => {
    if (currentUser) { //checking if user has signed up successfully
      setState({ ...initialState })
      history.push('/')
    }
  }, [currentUser, dispatch, history])

  useEffect(() => { //checking for errors after user submitted sign-up information
    if (Array.isArray(userErr) && userErr.length > 0) {
      setState({ ...state, errors: userErr })
    }
  }, [state, userErr])

  const handleChange = event => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    dispatch(signUpUserStart({
      ...state
    }))
  }
  const configAuthWrapper = {
    headline: 'Registration'
  }
  return (
    <AuthWrapper {...configAuthWrapper}>
      {state.errors.length > 0 && (
        <ul>
          {state.errors.map((err, index) => {
            return (
              <li key={index}>
                {err}
              </li>
            )
          })}
        </ul>
      )}

      <div className="formWrap">
        <form onSubmit={handleFormSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={state.displayName}
            placeholder="Full name"
            handleChange={handleChange}
          />
          <FormInput
            type="email"
            name="email"
            value={state.email}
            placeholder="Email address"
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={state.password}
            placeholder="Password"
            handleChange={handleChange}
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={state.confirmPassword}
            placeholder="Confirm Password"
            handleChange={handleChange}
          />
          <Button type="submit">
            Register
            </Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default Signup