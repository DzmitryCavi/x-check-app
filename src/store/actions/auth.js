import * as types from '../types/auth'

export const login = (code, role) => ({
  type: types.LOGIN,
  payload: { code, role },
})

export const requestedLogin = () => ({
  type: types.REQUESTED_LOGIN,
})

export const requestedLoginSuccess = (user) => ({
  type: types.REQUESTED_LOGIN_SUCCEEDED,
  payload: { user, isLoggedIn: true },
})

export const requestedLoginError = () => ({
  type: types.REQUESTED_LOGIN_FAILED,
})

export const logout = () => ({
  type: types.LOGOUT,
})
