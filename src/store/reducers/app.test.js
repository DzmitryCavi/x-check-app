import reducer from './app'
import * as actions from '../actions/app'

const initialState = {
  isError: false,
  errorMessage: '',
  errorCode: -1,
}

describe('app reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should handle SET_ERROR', () => {
    const errorMessage = 'Very dangerous mistake'
    const errorCode = 500

    expect(reducer(undefined, actions.setError(errorMessage, errorCode))).toEqual({
      isError: true,
      errorMessage,
      errorCode,
    })
  })

  it('should handle CLEAR_ERROR', () => {
    expect(reducer(undefined, actions.clearError())).toEqual(initialState)
  })
})
