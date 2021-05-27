import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, signInWithGoogleCustom } from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import Buttons from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const SignIn = props => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const resetForm = () => {
    setemail('')
    setpassword('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    try {
      await auth.signInWithEmailAndPassword(email, password)
      resetForm()
    } catch (err) {
      console.log(err)
    }
  }

  const handleEmailChange = e => setemail(e.target.value)
  const handlePasswordChange = e => setpassword(e.target.value)
  const configAuthWrapper = {
    headline: 'LogIn'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
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
          <Button type="submit">
            Login
          </Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={signInWithGoogleCustom}>
                Sign in with Google
                </Button>
            </div>
          </div>
          <div className="links">
            <Link to="/recovery">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default SignIn