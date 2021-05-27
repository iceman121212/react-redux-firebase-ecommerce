import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { auth, handleUserProfile } from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import Buttons from '../forms/Button'
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

  const handleChange = event => {
    const { name, value } = event.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleFormSubmit = async event => {
    event.preventDefault()

    if (state.password !== state.confirmPassword) {
      const err = ['Passwords do not match']
      setState({
        ...state,
        errors: err
      })
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(state.email, state.password)
      await handleUserProfile(user, { displayName: state.displayName })
      setState({
        ...initialState
      })
      props.history.push('/')
    } catch (err) {
      console.log(err)
    }

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