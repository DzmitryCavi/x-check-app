import * as actions from './app'
import * as types from '../types/app'

describe('app actions', () => {
  it('should create an action to set error', () => {
    const errorMessage = 'Very dangerous mistake'
    const errorCode = 500

    const expectedAction = {
      type: types.SET_ERROR,
      payload: { errorMessage, errorCode },
    }
    expect(actions.setError(errorMessage, errorCode)).toEqual(expectedAction)
  })

  it('should create an action to clear error', () => {
    const expectedAction = {
      type: types.CLEAR_ERROR,
    }
    expect(actions.clearError()).toEqual(expectedAction)
  })
})
