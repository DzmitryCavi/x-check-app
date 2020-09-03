import axios from 'axios'
import { notification } from 'antd'

import store from '../store'
import { setError, clearError } from '../store/actions/app'

axios.interceptors.request.use((request) => request)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { dispatch } = store
    dispatch(setError(error.message, error.response.status))
    notification.error({
      className: 'app-notification app-notification--error',
      message: 'Error',
      description: error.message,
      duration: null,
      onClose: () => dispatch(clearError()),
    })
    return Promise.reject(error)
  },
)
