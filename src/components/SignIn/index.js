import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { resetAllAuthForms, signInUser, signInWithGoogle } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const SignIn = props => {
  const dispatch = useDispatch()
  const signInSuccess = useSelector(state => state.signInSuccess)
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  const resetForm = () => {
    setemail('')
    setpassword('')
  }

  useEffect(() => {
    if (signInSuccess) {
      resetForm()
      console.log('signinsuccess useeffect hook reached')
      dispatch(resetAllAuthForms())
      props.history.push('/')
    }
  }, [signInSuccess])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    dispatch(signInUser({ email, password }))
  }

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle())
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

export default withRouter(SignIn)