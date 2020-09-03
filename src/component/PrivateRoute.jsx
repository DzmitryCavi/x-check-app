/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, isLoggedIn, user, allowedRoles, ...rest }) => {
  const isAuth = isLoggedIn && user
  const isAccess = isAuth && (allowedRoles.includes(user.role) || !allowedRoles.length)

  const ResultComponent = (props) => {
    if (!isAuth) return <Redirect to="/login" />
    if (!isAccess) return <Redirect to="/" />
    return <Component {...props} />
  }

  return <Route {...rest} render={ResultComponent} />
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
