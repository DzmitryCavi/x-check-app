import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './component/PrivateRoute'
import Home from './page/Home'
import Login from './page/Login'
import Private from './page/Private'

import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute
            path="/private"
            component={Private}
            allowedRoles={['supervisor', 'course_manager']}
          />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
