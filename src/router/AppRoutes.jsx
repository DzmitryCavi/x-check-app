/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RouteController from './RouteController'

import publicRoutes from './routes/public'
import authorRoutes from './routes/author'
import supervisorRoutes from './routes/supervisor'
import courseManagerRoutes from './routes/courseManager'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        {/* Author */}
        {authorRoutes.map((route) => (
          <RouteController key={route.path} {...route} allowedRoles={['author']} />
        ))}

        {/* Supervisor */}
        {supervisorRoutes.map((route) => (
          <RouteController key={route.path} {...route} allowedRoles={['supervisor']} />
        ))}

        {/* Course Manager */}
        {courseManagerRoutes.map((route) => (
          <RouteController key={route.path} {...route} allowedRoles={['course_manager']} />
        ))}

        {/* Public */}
        {publicRoutes.map((route) => (
          <RouteController key={route.path} {...route} />
        ))}
      </Switch>
    </Router>
  )
}

export default AppRoutes
