import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Login = (props) => {
  const [data, setData] = useState({ errorMessage: '', isLoading: false })

  const { isLoggedIn, clientId, clientSecret, redirectURI, proxyURL, dispatch } = props

  useEffect(() => {
    const url = window.location.href
    const hasCode = url.includes('?code=')

    if (hasCode) {
      const newUrl = url.split('?code=')
      window.history.pushState({}, null, newUrl[0])
      setData({ ...data, isLoading: true })

      const requestData = {
        clientId,
        redirectURI,
        clientSecret,
        code: newUrl[1],
      }

      fetch(proxyURL, {
        method: 'POST',
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        // eslint-disable-next-line no-shadow
        .then((data) => {
          dispatch({
            type: 'LOGIN',
            payload: { user: data, isLoggedIn: true },
          })
        })
        .catch(() => {
          setData({
            isLoading: false,
            errorMessage: 'Sorry! Login failed',
          })
        })
    }
  }, [clientId, clientSecret, data, dispatch, proxyURL, redirectURI])

  if (isLoggedIn) {
    return <Redirect to="/" />
  }

  return (
    <section className="container">
      <div>
        <h1>Login</h1>
        <span>Super amazing app</span>
        <span>{data.errorMessage}</span>
        <div className="login-container">
          {data.isLoading ? (
            <div>Loading...</div>
          ) : (
            <a
              className="login-link"
              href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectURI}`}
              onClick={() => {
                setData({ ...data, errorMessage: '' })
              }}
            >
              <span>Login with GitHub</span>
            </a>
          )}
        </div>
      </div>
    </section>
  )
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
