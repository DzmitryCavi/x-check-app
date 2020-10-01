import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import { create } from 'react-test-renderer'
import ButtonLink from './ButtonLink'

import { authorRoutes } from '../router/routes'

describe('ButtonLink component', () => {
  it('Matches the snapshot', () => {
    const component = create(
      <MemoryRouter
        initialEntries={['/author', '/author/tasks', '/author/tasks/create']}
        initialIndex={1}
      >
        <Route path="/author/tasks">
          <ButtonLink linkTo={authorRoutes.tasks.create} />
        </Route>
      </MemoryRouter>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
