import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/configureStore'
import { setAuthToken } from './utils/setAuthToken'
import { loadUser } from './redux/actions/auth'

import './App.css'
import Navbar from './components/layout/Navbar'
import { Landing } from './components/layout/Landing'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

if (localStorage.token) {
   setAuthToken(localStorage.token)
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser())
   }, [])

   return (
      <Provider store={store}>
         <BrowserRouter>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <section className='container'>
               <Alert />
               <Switch>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/signup' component={Signup} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
               </Switch>
            </section>
         </BrowserRouter>
      </Provider>
   )
}

export default App
