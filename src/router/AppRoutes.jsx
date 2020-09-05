import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import DefaultLayout from '../layouts/Default'

import Home from '../page/Home'
import Login from '../page/Login'
import NotFound from '../page/NotFound'

import Tasks from '../page/Tasks'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />

        <Route>
          <DefaultLayout>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />

              {/* Author */}
              <PrivateRoute path="/tasks" component={Tasks} allowedRoles={['author']} />

              <Route path="*" component={NotFound} />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRoutes
