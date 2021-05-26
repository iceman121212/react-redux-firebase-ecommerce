import React, { useState } from 'react'
import { auth, signInWithGoogleCustom } from '../../firebase/utils'
import Buttons from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const SignIn = props => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    try {
      await auth.signInWithEmailAndPassword(email, password)
      setemail('')
      setpassword('')

    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailChange = e => {
    setemail(e.target.value)
  }

  const handlePasswordChange = e => {
    setpassword(e.target.value)
  }

  return (
    <div className="signin" >
      <div className="wrap">
        <h2>LogIn page</h2>

        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={handleEmailChange}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={handlePasswordChange}
            />
            <Buttons type="submit">
              Login
              </Buttons>

            <div className="socialSignin">
              <div className="row">
                <Buttons onClick={signInWithGoogleCustom}>
                  Sign in with Google
                </Buttons>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div >
  )
}

export default SignIn