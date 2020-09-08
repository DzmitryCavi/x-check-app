import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import DefaultLayout from '../layouts/Default'

import Home from '../page/Home'
import Login from '../page/Login'
import NotFound from '../page/NotFound'

import TasksList from '../page/author/tasks/TasksList'
import TaskCreate from '../page/author/tasks/TaskCreate'
import TaskEdit from '../page/author/tasks/TaskEdit'
import TaskView from '../page/author/tasks/TaskView'
import CategoryCreate from '../page/author/categories/CategoryCreate'
import CategoryEdit from '../page/author/categories/CategoryEdit'

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
                path="/author/tasks/:taskId/categories/create"
                component={CategoryCreate}
                allowedRoles={['author']}
              />
              <PrivateRoute
                path="/author/tasks/:taskId/edit"
                component={TaskEdit}
                allowedRoles={['author']}
              />
              <PrivateRoute
                path="/author/tasks/:taskId/view"
                component={TaskView}
                allowedRoles={['author']}
              />
              <PrivateRoute
                path="/author/tasks/create"
                component={TaskCreate}
                allowedRoles={['author']}
              />
              <PrivateRoute path="/author/tasks" component={TasksList} allowedRoles={['author']} />

              <PrivateRoute
                path="/author/categories/:categoryId/edit"
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
