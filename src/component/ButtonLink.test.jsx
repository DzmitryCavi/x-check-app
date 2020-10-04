import React from 'react'
import PropTypes from 'prop-types'
import { MemoryRouter, Route } from 'react-router-dom'
import { mount } from 'enzyme'
import ButtonLink from './ButtonLink'

import { authorRoutes } from '../router/routes'

describe('ButtonLink component', () => {
  const ButtonLinkWithLink = <ButtonLink linkTo={authorRoutes.tasks.create} />
  const ButtonLinkWithoutLink = <ButtonLink />

  const TaskCreatePage = () => <p>Create Task</p>

  const Component = ({ children }) => (
    <MemoryRouter
      initialEntries={[authorRoutes.tasks.list, authorRoutes.tasks.create]}
      initialIndex={0}
    >
      <Route path="/author/tasks" render={() => children} />
      <Route path={authorRoutes.tasks.create} component={TaskCreatePage} />
    </MemoryRouter>
  )

  Component.propTypes = {
    children: PropTypes.element.isRequired,
  }

  const componentWithLink = mount(<Component>{ButtonLinkWithLink}</Component>)
  const componentWithoutLink = mount(<Component>{ButtonLinkWithoutLink}</Component>)

  it('Matches the snapshot', () => {
    expect(componentWithLink.html()).toMatchSnapshot()
  })

  it('should have an button', () => {
    expect(componentWithLink.find('button').length).toEqual(1)
  })

  it('should have proper props for button (with linkTo)', () => {
    expect(componentWithLink.find('button').props()).toEqual({
      className: 'ant-btn',
      children: expect.any(Array),
      onClick: expect.any(Function),
      type: 'button',
    })
  })

  it('should go to create task page', () => {
    componentWithLink.find('button').simulate('click')
    expect(componentWithLink.find('p').text()).toEqual('Create Task')
  })

  it('should have proper props for button (without linkTo)', () => {
    expect(componentWithoutLink.find('button').props()).toEqual({
      className: 'ant-btn',
      children: expect.any(Array),
      onClick: expect.any(Function),
      type: 'button',
    })
  })
})
