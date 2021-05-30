import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { resetAllAuthForms, signUpUser } from '../../redux/User/user.actions'
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
  const [state, setState] = useState({
    ...initialState
  })
  const signUpSuccess = useSelector(state => state.user.signUpSuccess)
  const signUpError = useSelector(state => state.user.signUpError)
  const dispatch = useDispatch()

  useEffect(() => {
    if (signUpSuccess) {
      setState({ ...initialState })
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }
  }, [signUpSuccess])

  useEffect(() => {
    if (Array.isArray(signUpError) && signUpError.length > 0) {
      setState({ ...state, errors: signUpError })
    }
  }, [signUpError])

  const handleChange = event => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    dispatch(signUpUser({
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

export default withRouter(Signup)