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

const App = props => {
  console.log("App rendered");
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.currentUser)

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
        dispatch(setCurrentUser(null))
      }
    })
    return () => {
      authListener()
    }
  }, [auth])


  console.log(currentUser);

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

export default App;
