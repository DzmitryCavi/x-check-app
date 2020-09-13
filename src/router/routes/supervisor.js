import RequestsList from '../../page/supervisor/requests/RequestsList'
import RequestReview from '../../page/supervisor/requests/RequestReview'

import { supervisorRoutes as routes } from '.'

export default [
  {
    path: routes.requests.review,
    component: RequestReview,
    breadcrumb: 'Request Review',
  },
  {
    path: routes.requests.list,
    component: RequestsList,
    breadcrumb: 'Requests',
  },
]
