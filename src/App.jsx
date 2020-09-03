import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './component/PrivateRoute'

// import EmptyLayout from './layouts/Empty'
import DefaultLayout from './layouts/Default'

import Home from './page/Home'
import Login from './page/Login'
import Private from './page/Private'
import NotFound from './page/NotFound'

import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />

          <Route>
            <DefaultLayout>
              <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute
                  path="/private"
                  component={Private}
                  allowedRoles={['supervisor', 'course_manager']}
                />
                <Route path="*" component={NotFound} />
              </Switch>
            </DefaultLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
