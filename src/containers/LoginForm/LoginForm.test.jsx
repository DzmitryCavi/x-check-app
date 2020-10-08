import React from 'react'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import LoginForm from './LoginForm'

const mockStore = configureStore([])

const initialState = {
  auth: {
    isLoggedIn: false,
    user: null,
    clientId: 'CLIENT_ID',
    redirectURI: 'REDIRECT_URI',
    clientSecret: 'CLIENT_SECRET',
    proxyURL: 'PROXY_URL',
    loading: false,
    errors: false,
  },
}

const store = mockStore(initialState)

const LoginFormWrapper = (
  <Provider store={store}>
    <LoginForm />
  </Provider>
)

describe('LoginForm component', () => {
  const wrapper = mount(LoginFormWrapper)

  it('Matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should be default state', () => {
    const LoginFormComponent = wrapper.find('LoginForm')

    expect(LoginFormComponent.state()).toEqual({
      role: 'author',
    })
  })
})
