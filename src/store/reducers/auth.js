import * as types from '../types/auth'

const initialState = {
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  user: JSON.parse(localStorage.getItem('user')) || null,
  clientId: process.env.REACT_APP_CLIENT_ID,
  redirectURI: process.env.REACT_APP_REDIRECT_URI,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET,
  proxyURL: process.env.REACT_APP_PROXY_URL,
  loading: false,
  errors: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REQUESTED_LOGIN: {
      return {
        ...state,
        loading: true,
      }
    }
    case types.REQUESTED_LOGIN_SUCCEEDED: {
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.removeItem('role')
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        loading: false,
      }
    }
    case types.REQUESTED_LOGIN_FAILED: {
      return {
        ...state,
        errors: true,
      }
    }
    case types.LOGOUT: {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    }
    default:
      return state
  }
}

export default reducer
