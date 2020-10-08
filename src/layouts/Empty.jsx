import React from 'react'
import PropTypes from 'prop-types'

const EmptyLayout = ({ children }) => {
  return <div className="empty-layout">{children}</div>
}

EmptyLayout.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
}

export default EmptyLayout
