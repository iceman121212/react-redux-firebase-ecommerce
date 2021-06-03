import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router';
import './default.scss'
import HomepageLayout from './layouts/HomepageLayout';
import MainLayout from './layouts/MainLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { useDispatch } from 'react-redux';
import { checkUserSesion } from './redux/User/user.actions';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';
import WithAuth from './hoc/withAuth'
import Admin from './pages/Admin';
import WithAdminAuth from './hoc/withAdminAuth';
import AdminToolbar from './components/AdminToolbar';
import AdminLayout from './layouts/AdminLayout';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

const App = props => {
  console.log('App component rendered')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkUserSesion())
  }, [dispatch])

  return (
    <div className="App">
      <AdminToolbar />
      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route path='/search/:filterType' render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route exact path='/search' render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path='/registration' render={() => (
          <MainLayout>
            <Registration />
          </MainLayout>
        )} />
        <Route path='/login'
          render={() => (
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
        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
        <Route path='/product/:productID' render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        <Route path='/cart' render={() => (
          <MainLayout>
            <Cart />
          </MainLayout>
        )} />
      </Switch>
    </div>
  )
}

export default App;
