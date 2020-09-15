import RequestCreate from '../../page/student/requests/RequestCreate'
import RequsetList from '../../page/student/requests/RequestsList'

import { studentRoutes as routes } from '.'

export default [
  {
    path: routes.requests.create,
    component: RequestCreate,
    breadcrumb: 'Request Create',
  },
  {
    path: routes.requests.list,
    component: RequsetList,
    breadcrumb: 'Requests',
  },
]
