import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

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
        const { data } = await axios.post(proxyURL, requestData)
        dispatch({
          type: 'LOGIN',
          payload: { user: data, isLoggedIn: true },
        })
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
    const { isLoading, errorMessage } = this.state

    if (isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <section className="container">
        <div>
          <h1>Login</h1>
          <span>Super amazing app</span>
          <span>{errorMessage}</span>
          <div className="login-container">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <a
                className="login-link"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectURI}`}
                onClick={this.handleLogin}
              >
                <span>Login with GitHub</span>
              </a>
            )}
          </div>
        </div>
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
