import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios'
import * as types from '../types/auth'
import * as actions from '../actions/auth'

const getAuth = (state) => state.auth

const asyncLogin = async ({ auth, code }) => {
  const { clientId, clientSecret, redirectURI, proxyURL } = auth

  const { data } = await axios.post(proxyURL, {
    clientId,
    clientSecret,
    redirectURI,
    code,
  })

  return data
}

function* login(action) {
  const code = action.payload

  const auth = yield select(getAuth)

  try {
    yield put(actions.requestedLogin())
    const data = yield call(asyncLogin, { auth, code })
    yield put(actions.requestedLoginSuccess(data))
  } catch (error) {
    yield put(actions.requestedLoginError())
  }
}

export default function* watchLogin() {
  yield takeEvery(types.LOGIN, login)
}
