import reducer from './auth'
import * as actions from '../actions/auth'

const initialState = {
  isLoggedIn: false,
  user: null,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectURI: process.env.REACT_APP_REDIRECT_URI,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  proxyURL: process.env.REACT_APP_PROXY_URL,
  loading: false,
  errors: false,
}

const user = {
  id: 1,
  login: 'test',
  avatar_url: 'https://klike.net/uploads/posts/2019-03/1551514082_8.jpeg',
  email: 'test@test.com',
  role: 'superBestAwesomeAdmin',
}

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle REQUESTED_LOGIN', () => {
    expect(reducer(undefined, actions.requestedLogin())).toEqual({
      ...initialState,
      loading: true,
    })
  })

  it('should handle REQUESTED_LOGIN_SUCCEEDED', () => {
    expect(reducer(undefined, actions.requestedLoginError(user))).toEqual({
      ...initialState,
      errors: true,
    })
  })

  it('should handle LOGOUT', () => {
    expect(reducer(undefined, actions.logout())).toEqual(initialState)
  })
})
