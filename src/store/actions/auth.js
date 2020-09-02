import * as types from '../types/auth'

export const login = (user) => ({
  type: types.LOGIN,
  payload: { user, isLoggedIn: true },
})

export const logout = () => ({
  type: types.LOGOUT,
})
