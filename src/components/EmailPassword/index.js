import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, withRouter } from 'react-router'
import { resetAllAuthForms, resetPassword } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const EmailPassword = props => {
  const resetPasswordSuccess = useSelector(state => state.user.resetPasswordSuccess)
  const resetPasswordError = useSelector(state => state.user.resetPasswordError)

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms())
      props.history.push('/login')
    }
  }, [resetPasswordSuccess])

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError)
    }
  }, [resetPasswordError])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(resetPassword({ email }))
  }

  const configAuthWrapper = {
    headline: 'Email Password'
  }

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (<li key={index}>{e}</li>)
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          >
          </FormInput>
          <Button type="submit">
            Login
          </Button>
        </form>
      </div>
    </AuthWrapper>
  )
}

export default withRouter(EmailPassword)