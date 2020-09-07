import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import DefaultLayout from '../layouts/Default'

import Home from '../page/Home'
import Login from '../page/Login'
import NotFound from '../page/NotFound'

import TasksList from '../page/tasks/TasksList'
import TaskCreate from '../page/tasks/TaskCreate'
import TaskEdit from '../page/tasks/TaskEdit'
import CategoryCreate from '../page/categories/CategoryCreate'
import CategoryEdit from '../page/categories/CategoryEdit'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />

        <Route>
          <DefaultLayout>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />

              {/* Author */}
              <PrivateRoute
                path="/tasks/:taskId/categories/create"
                component={CategoryCreate}
                allowedRoles={['author']}
              />
              <PrivateRoute
                path="/tasks/:taskId/edit"
                component={TaskEdit}
                allowedRoles={['author']}
              />
              <PrivateRoute path="/tasks/create" component={TaskCreate} allowedRoles={['author']} />
              <PrivateRoute path="/tasks" component={TasksList} allowedRoles={['author']} />

              <PrivateRoute
                path="/categories/:categoryId/edit"
                component={CategoryEdit}
                allowedRoles={['author']}
              />

              <Route path="*" component={NotFound} />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRoutes
