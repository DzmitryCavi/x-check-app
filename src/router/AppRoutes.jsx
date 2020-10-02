/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import RouteController from './RouteController'

import publicRoutes from './routes/public'
import authorRoutes from './routes/author'
import supervisorRoutes from './routes/supervisor'
import courseManagerRoutes from './routes/courseManager'
import studentRoutes from './routes/student'

const AppRoutes = ({ user }) => {
  return (
    <Router>
      <Switch>
        {user && user.role === 'superadmin' ? (
          <>
            {/* SuperAdmin */}
            {[...authorRoutes, ...studentRoutes, ...supervisorRoutes, ...courseManagerRoutes].map(
              (route) => (
                <RouteController key={route.path} {...route} allowedRoles={['superadmin']} />
              ),
            )}
            {/* Public */}
            {publicRoutes.map((route) => (
              <RouteController key={route.path} {...route} />
            ))}
          </>
        ) : (
          <>
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
            {/* Student */}
            {studentRoutes.map((route) => (
              <RouteController key={route.path} {...route} allowedRoles={['student']} />
            ))}
            {/* Public */}
            {publicRoutes.map((route) => (
              <RouteController key={route.path} {...route} />
            ))}
          </>
        )}
      </Switch>
    </Router>
  )
}

AppRoutes.defaultProps = {
  user: null,
}

AppRoutes.propTypes = {
  user: PropTypes.instanceOf(Object),
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(AppRoutes)
