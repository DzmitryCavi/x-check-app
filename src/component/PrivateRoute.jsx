/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { notification } from 'antd'

const PrivateRoute = ({ component: Component, isLoggedIn, user, allowedRoles, ...rest }) => {
  const isAuth = isLoggedIn && user
  const isAccess = isAuth && (allowedRoles.includes(user.role) || !allowedRoles.length)

  const ResultComponent = (props) => {
    useEffect(() => {
      if (!isAccess) {
        notification.error({
          className: 'app-notification app-notification--error',
          message: 'Error',
          description: 'What are you doing... You do not have access to this page!',
        })
      }
    }, [])

    if (!isAuth) return <Redirect to="/login" />
    if (!isAccess) return <Redirect to={{ pathname: '/', state: { isNotAccess: true } }} />
    return <Component {...props} />
  }

  return <Route {...rest} component={ResultComponent} />
}

PrivateRoute.defaultProps = {
  allowedRoles: [],
}

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.instanceOf(Object).isRequired,
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps, null)(PrivateRoute)
