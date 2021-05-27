import React, { useState } from 'react'
import { useHistory, withRouter } from 'react-router'
import { auth } from '../../firebase/utils'
import AuthWrapper from '../AuthWrapper'
import Button from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const EmailPassword = prosp => {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState([])

  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()
    //to add code for emailing password

    try {
      const config = {
        url: 'http://localhost:3000/login'
      }
      await auth.sendPasswordResetEmail(email, config)
      history.push('/login')
    } catch (err) {
      setErrors(['Email not found. Please try again'])
      console.log(err);
    }
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