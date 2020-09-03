import React from 'react'
import styled from 'styled-components'
import LoginForm from '../containers/LoginForm/LoginForm'

const Login = () => {
  return (
    <LoginPage className="login-page">
      <LoginForm />
    </LoginPage>
  )
}

const LoginPage = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Login
