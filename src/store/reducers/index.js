import { combineReducers } from 'redux'
import app from './app'
import auth from './auth'
import anchors from './anchors'

export default combineReducers({
  app,
  auth,
  anchors,
})
