import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import './default.scss'
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { auth, handleUserProfile } from './firebase/utils'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from './redux/User/user.actions';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import WithAuth from './hoc/withAuth'

const App = props => {

  const currentUser = useSelector(state => state.user.currentUser)
  console.log('App component')
  console.log({ currentUser })
  const dispatch = useDispatch()

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth)
        userRef.onSnapshot(snapshot => {
          const user = {
            id: snapshot.id,
            ...snapshot.data()
          }
          dispatch(setCurrentUser(user))
        })
      } else {
        dispatch(setCurrentUser(userAuth))
      }
    })
    return () => {
      authListener()
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route path='/registration' render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
        <Route path='/login'
          render={() => currentUser ? <Redirect to="/" /> : (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path='/recovery' render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />
        <Route path='/dashboard' render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
      </Switch>
    </div>
  )
}

export default App;
