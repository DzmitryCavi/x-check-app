import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { Card, Button } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import { login } from '../../store/actions'

import './LoginForm.scss'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      errorMessage: '',
    }
  }

  async componentDidMount() {
    const { clientId, clientSecret, redirectURI, proxyURL, dispatch } = this.props

    const uri = window.location.href
    const hasCode = uri.includes('?code=')

    if (hasCode) {
      const [url, code] = uri.split('?code=')
      window.history.pushState({}, null, url)
      this.setState((prev) => ({ ...prev, isLoading: true }))

      const requestData = {
        clientId,
        redirectURI,
        clientSecret,
        code,
      }

      try {
        const { data: user } = await axios.post(proxyURL, requestData)
        dispatch(login(user))
      } catch (error) {
        this.setState({
          isLoading: false,
          errorMessage: 'Sorry! Login failed',
        })
      }
    }
  }

  handleLogin = () => {
    this.setState((prev) => ({ ...prev, errorMessage: '' }))
  }

  render() {
    const { isLoggedIn, clientId, redirectURI } = this.props
    const { isLoading } = this.state

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
              loading={isLoading}
              onClick={this.handleLogin}
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
  clientSecret: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  proxyURL: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    clientId: state.auth.clientId,
    clientSecret: state.auth.clientSecret,
    redirectURI: state.auth.redirectURI,
    proxyURL: state.auth.proxyURL,
  }
}

export default connect(mapStateToProps, null)(Login)
