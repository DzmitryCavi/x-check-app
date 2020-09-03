import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { logout } from '../store/actions'

const Private = (props) => {
  const { user, dispatch } = props

  return (
    <div className="home-page">
      <h1>Private</h1>
      <p>
        <b>Login: </b>
        {user.login}
      </p>
      <p>
        <b>Role: </b>
        {user.role}
      </p>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        onClick={() => {
          dispatch(logout())
        }}
      >
        Logout
      </Button>
    </div>
  )
}

Private.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Private)
