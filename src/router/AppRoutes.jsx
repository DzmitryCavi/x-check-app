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

import MarksList from '../page/marks/MarksList'
import MarkInfo from '../page/marks/MarkInfo'

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
                path="/tasks/edit/:taskId"
                component={TaskEdit}
                allowedRoles={['author']}
              />
              <PrivateRoute path="/tasks/create" component={TaskCreate} allowedRoles={['author']} />
              <PrivateRoute path="/tasks" component={TasksList} allowedRoles={['author']} />

              {/* Course manager */}
              <PrivateRoute
                path="/marks/:key"
                component={MarkInfo}
                allowedRoles={['course_manager']}
              />
              <PrivateRoute path="/marks" component={MarksList} allowedRoles={['course_manager']} />

              <Route path="*" component={NotFound} />
            </Switch>
          </DefaultLayout>
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRoutes
