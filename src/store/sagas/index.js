import { all } from 'redux-saga/effects'
import watchLogin from './authSagas'

export default function* watchSagas() {
  yield all([watchLogin()])
}
