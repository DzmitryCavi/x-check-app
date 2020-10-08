import * as actions from './auth'
import * as types from '../types/auth'

describe('auth actions', () => {
  it('should create an action to login', () => {
    const code = 'secretCode'
    const role = 'superBestAwesomeAdmin'

    const expectedAction = {
      type: types.LOGIN,
      payload: { code, role },
    }
    expect(actions.login(code, role)).toEqual(expectedAction)
  })

  it('should create an action to requested login', () => {
    const expectedAction = {
      type: types.REQUESTED_LOGIN,
    }
    expect(actions.requestedLogin()).toEqual(expectedAction)
  })

  it('should create an action to requested login success', () => {
    const user = {
      id: 1,
      login: 'test',
      avatar_url: 'https://klike.net/uploads/posts/2019-03/1551514082_8.jpeg',
      email: 'test@test.com',
      role: 'superBestAwesomeAdmin',
    }

    const expectedAction = {
      type: types.REQUESTED_LOGIN_SUCCEEDED,
      payload: { user, isLoggedIn: true },
    }
    expect(actions.requestedLoginSuccess(user)).toEqual(expectedAction)
  })

  it('should create an action to requested login error', () => {
    const expectedAction = {
      type: types.REQUESTED_LOGIN_FAILED,
    }
    expect(actions.requestedLoginError()).toEqual(expectedAction)
  })

  it('should create an action to logout', () => {
    const expectedAction = {
      type: types.LOGOUT,
    }
    expect(actions.logout()).toEqual(expectedAction)
  })
})
