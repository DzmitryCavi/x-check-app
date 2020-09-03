import * as types from '../types/app'

export const setError = (errorMessage, errorCode) => ({
  type: types.SET_ERROR,
  payload: { errorMessage, errorCode },
})

export const clearError = () => ({
  type: types.CLEAR_ERROR,
})
