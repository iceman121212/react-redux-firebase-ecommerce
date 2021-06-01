import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { emailSignInStart, googleSignInStart } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const SignIn = props => {
  const dispatch = useDispatch()
  const history = useHistory()

  const currentUser = useSelector(state => state.user.currentUser)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const resetForm = () => {
    setemail('')
    setpassword('')
  }

  useEffect(() => {
    if (currentUser) {
      console.log('signinsuccess useeffect hook reached')
      resetForm()
      history.push('/')
    }
  }, [currentUser, history])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    dispatch(emailSignInStart({ email, password }))
  }

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart())
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
              <Button onClick={handleGoogleSignIn}>
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