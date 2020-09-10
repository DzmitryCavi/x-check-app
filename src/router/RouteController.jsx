/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import PrivateRoute from './PrivateRoute'
import DefaultLayout from '../layouts/Default'

const RouteController = ({ component: Component, layout: Layout, allowedRoles, ...rest }) => {
  const ComponentWithLayout = (props) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )

  if (allowedRoles.length)
    return <PrivateRoute {...rest} component={ComponentWithLayout} allowedRoles={allowedRoles} />
  return <Route {...rest} component={ComponentWithLayout} />
}

RouteController.defaultProps = {
  layout: DefaultLayout,
  allowedRoles: [],
}

RouteController.propTypes = {
  component: PropTypes.instanceOf(Object).isRequired,
  layout: PropTypes.instanceOf(Object),
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
}

export default RouteController
