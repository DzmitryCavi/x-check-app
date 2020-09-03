import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Home = (props) => {
  const { user } = props

  return (
    <div className="home-page">
      <h1>Home</h1>
      <img
        style={{ width: 160, height: 160, borderRadius: '50%', marginBottom: '20px' }}
        src={user.avatar_url}
        alt="Logo"
      />
      <p>
        <b>Login: </b>
        {user.login}
      </p>
      <p>
        <b>Role: </b>
        {user.role}
      </p>
    </div>
  )
}

Home.defaultProps = {
  user: null,
}

Home.propTypes = {
  user: PropTypes.instanceOf(Object),
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(Home)
