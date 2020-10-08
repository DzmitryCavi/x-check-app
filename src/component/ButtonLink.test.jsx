import React from 'react'
import PropTypes from 'prop-types'
import { MemoryRouter, Route } from 'react-router-dom'
import { mount } from 'enzyme'
import ButtonLink from './ButtonLink'

import { authorRoutes } from '../router/routes'

describe('ButtonLink component', () => {
  const ButtonLinkComponent = <ButtonLink linkTo={authorRoutes.tasks.create} />

  const TaskCreatePage = () => <p>Create Task</p>

  const RouterWrapper = ({ children }) => (
    <MemoryRouter
      initialEntries={[authorRoutes.tasks.list, authorRoutes.tasks.create]}
      initialIndex={0}
    >
      <Route path="/author/tasks" render={() => children} />
      <Route path={authorRoutes.tasks.create} component={TaskCreatePage} />
    </MemoryRouter>
  )

  RouterWrapper.propTypes = {
    children: PropTypes.element.isRequired,
  }

  const component = mount(<RouterWrapper>{ButtonLinkComponent}</RouterWrapper>)

  it('Matches the snapshot', () => {
    expect(component.html()).toMatchSnapshot()
  })

  it('should have an button', () => {
    expect(component.find('button').length).toEqual(1)
  })

  it('should have proper props for button (with linkTo)', () => {
    expect(component.find('button').props()).toEqual({
      className: 'ant-btn',
      children: expect.any(Array),
      onClick: expect.any(Function),
      type: 'button',
    })
  })

  it('should go to create task page', () => {
    component.find('button').simulate('click')
    expect(component.find('p').text()).toEqual('Create Task')
  })
})
