import React, { Component } from 'react'
import { auth, signInWithGoogleCustom } from '../../firebase/utils'
import Buttons from '../forms/Button'
import FormInput from '../forms/FormInput'
import './styles.scss'

const initialState = {
  email: '',
  password: ''
}

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...initialState
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const { email, password } = this.state
    try {
      await auth.signInWithEmailAndPassword(email, password)
      this.setState({
        ...initialState
      })

    } catch (err) {
      console.log(err)
    }
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  render() {
    const { email, password } = this.state
    return (
      <div className="signin" >
        <div className="wrap">
          <h2>LogIn page</h2>

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                handleChange={this.handleChange}
              />
              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                handleChange={this.handleChange}
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

}

export default SignIn