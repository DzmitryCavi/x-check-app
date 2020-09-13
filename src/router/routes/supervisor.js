import RequestsList from '../../page/supervisor/requests/RequestsList'
import TaskReview from '../../page/supervisor/tasks/TaskReview'

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
