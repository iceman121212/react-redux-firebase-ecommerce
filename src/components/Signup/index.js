import React, { useState } from 'react'
import { auth, handleUserProfile } from '../../firebase/utils'
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
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="signup">
      <div className="wrap">
        <h2>
          Signup
        </h2>
        {console.log(typeof (state.errors))}
        {console.log(typeof (state.errors.length))}
        {console.log({ state })}
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
              onChange={handleChange}
            />
            <FormInput
              type="email"
              name="email"
              value={state.email}
              placeholder="Email address"
              onChange={handleChange}
            />
            <FormInput
              type="password"
              name="password"
              value={state.password}
              placeholder="Password"
              onChange={handleChange}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              value={state.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <Buttons type="submit">
              Register
            </Buttons>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup