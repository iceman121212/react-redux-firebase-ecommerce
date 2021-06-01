import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { resetPasswordStart, resetUserState } from '../../redux/User/user.actions'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const EmailPassword = props => {
  const dispatch = useDispatch()
  const history = useHistory()
  const resetPasswordSuccess = useSelector(state => state.user.resetPasswordSuccess)
  const userErr = useSelector(state => state.user.userErr)


  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState())
      history.push('/login')
    }
  }, [resetPasswordSuccess, dispatch, history])

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr)
    }
  }, [userErr])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(resetPasswordStart({ email }))
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

export default EmailPassword