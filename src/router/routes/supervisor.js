import RequestsList from '../../page/requests/RequestsList'
import TaskReview from '../../page/tasks/TaskReview'

import { supervisorRoutes as routes } from '.'

export default [
  {
    path: routes.requests,
    component: RequestsList,
    breadcrumb: 'Requests',
  },
  {
    path: routes.reviewRequest,
    component: TaskReview,
    breadcrumb: 'View Request',
  },
]
