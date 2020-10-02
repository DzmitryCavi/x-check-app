import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Card, Button, Select, Alert } from 'antd'
import { GithubOutlined } from '@ant-design/icons'

import { login } from '../../store/actions'

import './LoginForm.scss'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    this.roles = [
      { slug: 'author', label: 'Author' },
      { slug: 'student', label: 'Student' },
      { slug: 'supervisor', label: 'Supervisor' },
      { slug: 'course_manager', label: 'Course Manager' },
      { slug: 'superadmin', label: 'Super Admin' },
    ]

    this.state = {
      role: localStorage.getItem('role') || 'author',
    }
  }

  async componentDidMount() {
    const { role } = this.state
    const { dispatch } = this.props

    localStorage.setItem('role', role)

    const uri = window.location.href
    const hasCode = uri.includes('?code=')

    if (hasCode) {
      const [url, code] = uri.split('?code=')
      window.history.pushState({}, null, url)
      dispatch(login(code, role))
    }
  }

  handleChangeRole = (role) => {
    localStorage.setItem('role', role)
    this.setState((prev) => ({ ...prev, role }))
  }

  render() {
    const { role } = this.state
    const { isLoggedIn, clientId, redirectURI, loading, errors } = this.props

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
            <>
              {!errors ? (
                <Button
                  type="primary"
                  icon={<GithubOutlined />}
                  loading={loading}
                  href={`https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}&redirect_uri=${redirectURI}`}
                >
                  Sign up with GitHub
                </Button>
              ) : (
                <Alert className="login-form__error" message="Auth wrong." type="error" showIcon />
              )}
            </>,
          ]}
        >
          <Card.Meta
            title="Please login via GitHub"
            description="In order to access the RS School App, you need to login with your GitHub account"
          />
          <div className="select-role">
            <span className="select-role__label">
              Role <span className="req">*</span>
            </span>
            <Select
              defaultValue={role}
              style={{ width: '100%' }}
              onChange={this.handleChangeRole}
              disabled={loading}
            >
              {this.roles.map(({ slug, label }) => (
                <Select.Option value={slug} key={slug}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </div>
        </Card>
      </section>
    )
  }
}

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  clientId: PropTypes.string.isRequired,
  redirectURI: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, null)(LoginForm)
