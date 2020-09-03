import * as types from '../types/app'

const initialState = {
  isError: false,
  errorMessage: '',
  errorCode: -1,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ERROR: {
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.errorMessage,
        errorCode: action.payload.errorCode,
      }
    }
    case types.CLEAR_ERROR: {
      localStorage.clear()
      return {
        ...state,
        isError: false,
        errorMessage: '',
        errorCode: -1,
      }
    }
    default:
      return state
  }
}

export default reducer
