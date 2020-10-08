import { put, takeEvery, call, select } from 'redux-saga/effects'
import axios from 'axios'
import * as types from '../types/auth'
import * as actions from '../actions/auth'

const getAuth = (state) => state.auth

const asyncLogin = async ({ auth, code, role }) => {
  const { clientId, clientSecret, redirectURI, proxyURL } = auth

  const { data } = await axios.post(`${proxyURL}/authenticate`, {
    clientId,
    clientSecret,
    redirectURI,
    code,
    role,
  })

  return data
}

function* login(action) {
  const { code, role } = action.payload

  const auth = yield select(getAuth)

  try {
    yield put(actions.requestedLogin())
    const user = yield call(asyncLogin, { auth, code, role })
    yield put(actions.requestedLoginSuccess(user))
  } catch (error) {
    yield put(actions.requestedLoginError())
  }
}

export default function* watchLogin() {
  yield takeEvery(types.LOGIN, login)
}
