/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import publicRoutes from './routes/public'
import authorRoutes from './routes/author'

import DefaultLayout from '../layouts/Default'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path={publicRoutes.login.path} component={publicRoutes.login.component} />

        <Route>
          <DefaultLayout>
            <Switch>
              <PrivateRoute
                path={publicRoutes.home.path}
                component={publicRoutes.home.component}
                exact
              />

              {/* Author */}
              {authorRoutes.map((route) => (
                <PrivateRoute key={route.path} {...route} allowedRoles={['author']} />
              ))}

              <Route
                path={publicRoutes.notFound.path}
                component={publicRoutes.notFound.component}
              />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRoutes
