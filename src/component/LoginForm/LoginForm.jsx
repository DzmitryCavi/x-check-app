import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Card, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import { login } from '../../store/actions'

import './LoginForm.scss'

class Login extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props

    const uri = window.location.href
    const hasCode = uri.includes('?code=')

    if (hasCode) {
      const [url, code] = uri.split('?code=')
      window.history.pushState({}, null, url)
      dispatch(login(code))
    }
  }

  render() {
    const { isLoggedIn, clientId, redirectURI, loading } = this.props

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <section className="login-form">
        <Card
          style={{ width: 320 }}
          title={<h1 className="login-form__name">X Check App</h1>}
          cover={<img className="login-form__logo" src="./github-logo.png" alt="GitHub" />}
          actions={[
            <Button
              type="primary"
              icon={<GithubOutlined />}
              loading={loading}
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectURI}`}
            >
              Sign up with GitHub
            </Button>,
          ]}
        >
          <Card.Meta
            title="Please login via GitHub"
            description="In order to access the RS School App, you need to login with your GitHub account"
          />
        </Card>
      </section>
    )
  }
}

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  clientId: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  // errors: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    clientId: state.auth.clientId,
    redirectURI: state.auth.redirectURI,
    loading: state.auth.loading,
    errors: state.auth.errors,
  }
}

export default connect(mapStateToProps, null)(Login)
