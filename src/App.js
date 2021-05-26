import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import './default.scss'
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { auth, handleUserProfile } from './firebase/utils'

const initialState = {
  currentUser: null
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })
    })
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path='/registration' render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout currentUser={currentUser}>
              <Registration />
            </MainLayout>
          )} />
          <Route path='/login'
            render={() => currentUser ? <Redirect to="/" /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
        </Switch>
      </div>
    )
  }
}

export default App;
