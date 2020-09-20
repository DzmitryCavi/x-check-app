/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Button } from 'antd'

const ButtonAntd = ({ linkTo, linkMode, match, location, history, staticContext, ...props }) =>
  linkTo ? (
    <Button
      {...props}
      onClick={() => {
        if (linkMode === 'replace') {
          history.replace(linkTo)
        } else {
          history.push(linkTo)
        }
      }}
    />
  ) : (
    <Button {...props} />
  )

ButtonAntd.propTypes = {
  linkTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  linkMode: PropTypes.oneOf(['replace']),
  location: PropTypes.instanceOf(Object).isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  staticContext: PropTypes.instanceOf(Object),
}

ButtonAntd.defaultProps = {
  linkTo: null,
  linkMode: null,
  staticContext: null,
}

export default withRouter(ButtonAntd)
