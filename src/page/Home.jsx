import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { logout } from '../store/actions'

const Home = (props) => {
  const { isLoggedIn, user, dispatch } = props

  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-page">
      <h1>Home</h1>
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

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.instanceOf(Object).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Home)
